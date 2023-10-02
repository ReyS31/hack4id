/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ProductsTableTestHelper = {
  async addProduct({
    id = '11111111-2222-3333-4444-555555555555',
    place_id = '11111111-2222-3333-4444-555555555555',
    thumbnail = 'test',
    name = 'test',
    price = 100_000,
    discounted_price = 80_000,
    discount = false,
    pinned = false,
    available = false,
    created_at = '2023-10-02 11:44:28.719882+00',
  }) {
    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      values: [
        id,
        place_id,
        thumbnail,
        name,
        price,
        discounted_price,
        discount,
        pinned,
        available,
        created_at,
      ],
    };

    await pool.query(query);
  },

  async findProductsById(id) {
    const query = {
      text: 'SELECT * FROM products WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteProduct(id) {
    const query = {
      text: 'DELETE FROM products WHERE id=$1',
      values: [id],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM products WHERE 1=1');
  },
};

module.exports = ProductsTableTestHelper;
