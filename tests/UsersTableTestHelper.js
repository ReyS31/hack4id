/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersTableTestHelper = {
  async addUser({
    id = '11111111-2222-3333-4444-555555555555',
    name = 'dicoding',
    phone = '081223344556',
    email = 'Dicoding Indonesia',
    password = 'secret',
  }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5)',
      values: [id, name, phone, email, password],
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
};

module.exports = UsersTableTestHelper;
