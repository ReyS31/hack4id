const EventViewRepository = require('../../Domains/event-views/EventViewRepository');

class EventViewRepositoryPostgres extends EventViewRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addView(eventId, clientId) {
    const query = {
      text: 'INSERT INTO event_views(viewer_id, event_id) VALUES($1,$2)',
      values: [clientId, eventId],
    };

    return this._pool.query(query);
  }

  async isAlreadyExists(eventId, clientId) {
    const query = {
      text: 'SELECT * FROM event_views WHERE viewer_id = $1 AND event_id = $2',
      values: [clientId, eventId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      return true;
    }

    return false;
  }
}

module.exports = EventViewRepositoryPostgres;
