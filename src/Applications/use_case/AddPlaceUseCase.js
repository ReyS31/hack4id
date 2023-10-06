class AddPlaceUseCase {
  constructor({ categoryRepository, placeRepository }) {
    this._categoryRepository = categoryRepository;
    this._placeRepository = placeRepository;
  }

  async execute(useCasePayload) {
    const addCategory = new AddCategory(useCasePayload);
    await this._categoryRepository.checkAvailabilityName(addCategory.name);
    return this._categoryRepository.addCategory(addCategory);
  }
}

module.exports = AddPlaceUseCase;
