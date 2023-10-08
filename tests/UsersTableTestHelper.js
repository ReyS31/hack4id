/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersTableTestHelper = {
  async addUser({
    id = '11111111-2222-3333-4444-555555555555',
    name = 'test',
    phone = '081223344556',
    email = 'test@test.test',
    password = 'secret',
    created_at = '2023-10-02 11:44:28.719882+00',
  }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, name, phone, email, password, created_at],
    };

    await pool.query(query);
  },

  async findUsersById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteUser(id) {
    const query = {
      text: 'DELETE FROM users WHERE id=$1',
      values: [id],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM users WHERE 1=1');
  },

  async addAdmin({
    id = '00000000-0000-0000-0000-000000000000',
    name = 'Admin',
    phone,
    email,
    password,
    created_at,
  }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) returning id',
      values: [id, name, phone, email, password, created_at],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  },
};

module.exports = UsersTableTestHelper;
