const EventRepository = require('../../Domains/events/EventRepository');

class EventRepositoryPostgress extends EventRepository {
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

    keys.forEach((key, index) => {
      if (key === 'name') {
        console.log(`got name: ${eventQuery[key]}`);
        return;
      }
      if (key === 'user_id') {
        console.log(`got user_id: ${eventQuery[key]}`);
        return;
      }
      if (key === 'page') {
        console.log(`got page: ${eventQuery[key]}`);
      }
    });
  }
}

module.exports = EventRepositoryPostgress;
