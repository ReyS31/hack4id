/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const PlacesTableTestHelper = {
  async addPlace({
    id = '11111111-2222-3333-4444-555555555555',
    user_id = '11111111-2222-3333-4444-555555555555',
    category_id = '11111111-2222-3333-4444-555555555555',
    thumbnail = 'thumbnail',
    name = 'test',
    phone = '081223344556',
    email = 'test@test.test',
    address = 'test',
    social_media = {
      fb: 'test',
      ig: 'test',
    },
    location = [117.1445472, -0.4628685],
    created_at = '2023-10-02 11:44:28.719882+00',
  }) {
    const query = {
      text: `INSERT INTO places VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
      )`,
      values: [
        id,
        user_id,
        category_id,
        name,
        thumbnail,
        phone,
        email,
        address,
        social_media,
        `SRID=4326;POINT(${location.join(' ')})`,
        created_at,
      ],
    };

    await pool.query(query);
  },

  async findPlacesById(id) {
    const query = {
      text: 'SELECT * FROM places WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async count() {
    const query = {
      text: 'SELECT count(id) as count FROM places',
    };

    const result = await pool.query(query);
    return result.rows[0].count;
  },

  async deletePlace(id) {
    const query = {
      text: 'DELETE FROM places WHERE id=$1',
      values: [id],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM places WHERE 1=1');
  },
};

module.exports = PlacesTableTestHelper;
