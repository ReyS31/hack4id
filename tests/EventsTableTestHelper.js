/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const EventsTableTestHelper = {
  async addEvent({
    id = '11111111-2222-3333-4444-555555555555',
    place_id = '11111111-2222-3333-4444-555555555555',
    thumbnail = 'test',
    title = 'test',
    body = 'test',
    created_at = '2023-10-02 11:44:28.719882+00',
  }) {
    const query = {
      text: 'INSERT INTO events VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, place_id, thumbnail, title, body, created_at],
    };

    await pool.query(query);
  },

  async findEventsById(id) {
    const query = {
      text: 'SELECT * FROM events WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteEvent(id) {
    const query = {
      text: 'DELETE FROM events WHERE id=$1',
      values: [id],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM events WHERE 1=1');
  },
};

module.exports = EventsTableTestHelper;
