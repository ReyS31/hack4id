const InvariantError = require('../../Commons/exceptions/InvariantError');
const EventRepository = require('../../Domains/events/EventRepository');
const Event = require('../../Domains/events/entities/Event');

class EventRepositoryPostgres extends EventRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addEvent(addEvent) {
    const {
      user_id, thumbnail, preview, views, title, body,
    } = addEvent;
    const query = {
      text: 'INSERT INTO events(user_id, thumbnail, preview, views, title, body) VALUES( $1, $2, $3, $4, $5, $6)',
      values: [user_id, thumbnail, preview, views, title, body],
    };
    return this._pool.query(query);
  }

  async pagination(eventQuery) {
    const keys = Object.keys(eventQuery);
    let text = 'SELECT * FROM events';
    let count = 'SELECT COUNT(id) as count FROM events';
    const values = [];
    const countValues = [];
    const limit = 25;
    let page = 1;
    let i = 1;

    keys.forEach((key, index) => {
      if (key === 'title') {
        let builder = '';
        if (index === 0) {
          builder += ' WHERE';
        }
        builder += ` title LIKE $${i}`;
        text += builder;
        count += builder;
        const value = `'${eventQuery[key]}%'`;
        values.push(value);
        countValues.push(value);
        i = index + 1;
        return;
      }
      if (key === 'user_id') {
        let builder = '';
        if (index === 0) {
          builder += ' WHERE';
        } else {
          builder += ' AND';
        }
        builder += ` user_id = $${i}`;
        text += builder;
        count += builder;
        const value = eventQuery[key];
        values.push(value);
        countValues.push(value);
        i = index + 1;
        return;
      }
      if (key === 'page') {
        page = eventQuery[key];
      }
    });
    text += ` ORDER BY pinned DESC, created_at DESC LIMIT $${i} OFFSET $${
      i + 1
    }`;
    values.push(limit);
    values.push(limit * (page - 1));

    const query = {
      text,
      values,
    };

    const result = await this._pool.query(query);
    const countRes = await this._pool.query({
      text: count,
      values: countValues,
    });

    return { data: result.rows, ...countRes.rows[0] };
  }

  async getHomeHeadlines() {
    const text = 'SELECT * FROM events ORDER BY pinned DESC, created_at DESC LIMIT 3';

    const result = await this._pool.query({ text, values: [] });

    return result.rows;
  }

  async deleteEvent(id) {
    const query = {
      text: 'DELETE FROM events WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('query error');
    }
  }

  async getById(id) {
    const query = {
      text: 'SELECT * FROM events WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    return new Event(result.rows[0]);
  }

  async verifyEventExists(id) {
    const query = {
      text: 'SELECT id FROM events WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('event tidak ditemukan');
    }
  }

  async getViews(id) {
    const query = {
      text: 'SELECT views FROM events WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('event tidak ditemukan');
    }

    return result.rows[0].views;
  }

  async setViews(id, amount) {
    const query = {
      text: 'UPDATE events SET views = $2 WHERE id = $1',
      values: [id, amount],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('update gagal');
    }
  }

  async activatePin(id, date) {
    const query = {
      text: 'UPDATE events SET pinned = true, pinned_until = $1 WHERE id = $2',
      values: [date, id],
    };

    return this._pool.query(query);
  }

  async deactivatePin() {
    const now = new Date().toISOString();
    const query = {
      text: 'UPDATE events SET pinned = false, pinned_until = NULL WHERE pinned_until = $1',
      values: [now],
    };

    return this._pool.query(query);
  }
}

module.exports = EventRepositoryPostgres;
