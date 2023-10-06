const AddCategory = require('../../Domains/categories/entities/AddCategory');

class AddCategoryUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute(useCasePayload) {
    const addCategory = new AddCategory(useCasePayload);
    await this._categoryRepository.checkAvailabilityName(addCategory.name);
    return this._categoryRepository.addCategory(addCategory);
  }
}

module.exports = AddCategoryUseCase;
