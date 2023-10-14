const InvariantError = require('../../Commons/exceptions/InvariantError');
const PlaceRepository = require('../../Domains/places/PlaceRepository');
const Place = require('../../Domains/places/entities/Place');

class PlaceRepositoryPostgres extends PlaceRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async pagination(placeQuery) {
    const {
      name, lat, long, page, category,
    } = placeQuery;

    let countQuery = `SELECT COUNT(pl.id) FROM places as pl 
    JOIN categories as ctg 
    ON
    pl.category_id = ctg.id`;
    let textQuery = `SELECT 
    pl.id, ctg.name as category, pl.name, pl.thumbnail, pl.address,
    ST_AsGeoJSON(pl.location)::json as location,
    ST_Distance(
      pl.location,
      ST_SetSRID(ST_MakePoint($1, $2),4326)::geography 
    ) as distance,
    pl.pinned
    FROM places as pl 
    JOIN categories as ctg 
    ON
    pl.category_id = ctg.id
    `;
    const countValue = [];
    const valueQuery = [long, lat];
    let i = 2;
    let j = 0;
    if (name) {
      i++;
      j++;
      const nameValue = `${name}%`;
      textQuery += ` WHERE AND pl.name LIKE $${i} `;
      countQuery += ` WHERE AND pl.name LIKE $${j} `;
      valueQuery.push(nameValue);
      countValue.push(nameValue);
    }

    if (category) {
      i++;
      j++;
      let categoryQuery = '';
      if (i === 3) {
        categoryQuery += ' WHERE';
      } else {
        categoryQuery += ' AND';
      }
      textQuery += `${categoryQuery} ctg.icon = $${i}`;
      countQuery += `${categoryQuery} ctg.icon = $${j}`;
      valueQuery.push(category);
      countValue.push(category);
    }

    const limit = 25;
    const offsetPosition = limit * (Number(page) - 1);
    textQuery += ` ORDER BY ST_Distance(
      pl.location,
      ST_SetSRID(ST_MakePoint($1, $2),4326)::geography 
    ) ASC LIMIT ${limit} OFFSET ${offsetPosition}`;
    const query = {
      text: textQuery,
      values: valueQuery,
    };

    const result = await this._pool.query(query);
    const countRes = await this._pool.query({
      text: countQuery,
      values: countValue,
    });

    const pinnedQuery = `SELECT 
    pl.id, ctg.name as category, pl.name, pl.thumbnail, pl.address,
    ST_AsGeoJSON(pl.location)::json as location,
    ST_Distance(
      pl.location,
      ST_SetSRID(ST_MakePoint($1, $2),4326)::geography 
    ) as distance,
    pl.pinned
    FROM places as pl 
    JOIN categories as ctg 
    ON
    pl.category_id = ctg.id WHERE pl.pinned = true`;

    const pinned = await this._pool.query({
      text: pinnedQuery,
      values: [long, lat],
    });

    return { places: [...pinned.rows, ...result.rows], ...countRes.rows[0] };
  }

  async addPlace(addPlace) {
    let cols = '(id';
    let valuesQuery = '($1';
    const id = this._idGenerator();
    const keys = Object.keys(addPlace);

    const values = [id];
    for (let index = 0; index < keys.length; index++) {
      const params = index + 2;

      const colName = keys[index];
      cols += `, ${colName}`;
      valuesQuery += `, $${params}`;
      if (colName === 'location') {
        const location = addPlace[colName];
        values.push(`SRID=4326;POINT(${location.join(' ')})`);
      } else {
        values.push(addPlace[colName]);
      }
    }
    cols += ')';
    valuesQuery += ')';

    const text = `INSERT INTO places${cols} VALUES${valuesQuery}`;
    const query = {
      text,
      values,
    };
    return this._pool.query(query);
  }

  async updatePlace(id, updatePlace) {
    let params = 1;
    let text = 'UPDATE places SET';
    const values = [];
    const entries = Object.entries(updatePlace);
    for (params; params <= entries.length; params++) {
      const [key, value] = entries[params - 1];
      if (params > 1) {
        text += ',';
      }
      text += ` ${key} = $${params}`;
      values.push(value);
    }
    text += ` WHERE id = $${params}`;
    values.push(id);

    const query = {
      text,
      values,
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('query error');
    }
  }

  async deletePlace(id) {
    const query = {
      text: 'DELETE FROM places WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('query error');
    }
  }

  async getById(id) {
    const query = {
      text: 'SELECT pl.*, ctg.name as category, ST_AsGeoJSON(pl.location) as json_location FROM places as pl JOIN categories as ctg ON pl.category_id = ctg.id WHERE pl.id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('tempat tidak ditemukan');
    }

    return new Place(result.rows[0]);
  }

  async verifyPlaceExists(id) {
    const query = {
      text: 'SELECT id FROM places WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }
  }

  async isEmailAvailable(email) {
    const query = {
      text: 'SELECT id FROM places WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('email tidak tersedia');
    }
  }

  async isPhoneAvailable(phone) {
    const query = {
      text: 'SELECT id FROM places WHERE phone = $1',
      values: [phone],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('nomor tidak tersedia');
    }
  }

  async activatePin(id, date) {
    const query = {
      text: 'UPDATE places SET pinned = true, pinned_until = $1 WHERE id = $2',
      values: [date, id],
    };

    return this._pool.query(query);
  }

  async deactivatePin() {
    const now = new Date().toISOString();
    const query = {
      text: 'UPDATE places SET pinned = false, pinned_until = NULL WHERE pinned_until = $1',
      values: [now],
    };

    return this._pool.query(query);
  }
}

module.exports = PlaceRepositoryPostgres;
