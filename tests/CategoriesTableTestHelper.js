/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CategoriesTableTestHelper = {
  async addCategory({
    id = '11111111-2222-3333-4444-555555555555',
    name = 'test',
    icon = 'icon',
    created_at = '2023-10-02 11:44:28.719882+00',
  }) {
    const query = {
      text: 'INSERT INTO categories VALUES($1, $2, $3, $4)',
      values: [id, name, icon, created_at],
    };

    await pool.query(query);
  },

  async findCategoriesById(id) {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteCategory(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id=$1',
      values: [id],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM categories WHERE 1=1');
  },
};

module.exports = CategoriesTableTestHelper;
