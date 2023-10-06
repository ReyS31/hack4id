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
      name, lat, long, page,
    } = placeQuery;
    let textQuery = `SELECT 
    pl.id, ctg.name as category, pl.name, pl.thumbnail, pl.address, ST_AsGeoJSON(pl.location)::json as location
    FROM places as pl 
    JOIN categories as ctg 
    ON
    pl.category_id = ctg.id
    WHERE 
    ST_Distance(
      ST_Transform(pl.location, 3857),
      ST_Transform('SRID=4326;POINT(${long} ${lat})'::geometry, 3857)
    ) < 2500
    `;
    const valueQuery = [lat, long];

    if (name) {
      textQuery += ' AND pl.name LIKE "$3%" ';
      valueQuery.push(name);
    }

    const offsetPosition = 25 * (Number(page) - 1);
    const limit = 25;
    textQuery += ` LIMIT ${limit} OFFSET ${offsetPosition}`;
    const query = {
      text: textQuery,
      values: [],
    };

    const result = await this._pool.query(query);

    return result.rows;
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

    const text = `INSERT INTO places${cols} VALUES${valuesQuery} returning created_at`;

    const query = {
      text,
      values,
    };

    await this._pool.query(query);
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
      text: 'SELECT * FROM places WHERE id = $1',
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
}

module.exports = PlaceRepositoryPostgres;
