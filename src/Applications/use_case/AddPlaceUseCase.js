const AddPlace = require('../../Domains/places/entities/AddPlace');

class AddPlaceUseCase {
  constructor({ categoryRepository, placeRepository }) {
    this._categoryRepository = categoryRepository;
    this._placeRepository = placeRepository;
  }

  async execute(useCasePayload) {
    const addPlace = new AddPlace(useCasePayload);
    await this._categoryRepository.verifyCategoryExists(addPlace.category_id);
    return this._placeRepository.addPlace(addPlace);
  }
}

module.exports = AddPlaceUseCase;
