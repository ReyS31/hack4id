const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CategoryRepository = require('../../Domains/categories/CategoryRepository');

class CategoryRepositoryPostgres extends CategoryRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async checkAvailabilityName(name) {
    const query = {
      text: 'SELECT id FROM categories WHERE name = $1',
      values: [name],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('nama tidak tersedia');
    }
  }

  async addCategory(addCategory) {
    const id = this._idGenerator();
    const created_at = new Date().toUTCString();
    const { name, icon } = addCategory;

    const query = {
      text: 'INSERT INTO categories VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, icon, created_at],
    };

    const result = await this._pool.query(query);

    return result.rows[0].id;
  }

  async updateCategory(id, updateCategory) {
    const { name, icon } = updateCategory;

    const query = {
      text: 'UPDATE categories SET name = $2, icon = $3 WHERE id = $1',
      value: [id, name, icon],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('query error');
    }
  }

  async deleteCategory(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('query error');
    }
  }

  async verifyCategoryExists(id) {
    const query = {
      text: 'SELECT id FROM categories WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('category tidak tersedia');
    }
  }
}

module.exports = CategoryRepositoryPostgres;
