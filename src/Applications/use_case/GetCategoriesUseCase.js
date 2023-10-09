const Category = require('../../Domains/categories/entities/Category');

class GetCategoriesUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute() {
    const raw = await this._categoryRepository.getCategories();
    return raw.map((r) => new Category(r));
  }
}

module.exports = GetCategoriesUseCase;
