class GetPlaceUseCase {
  constructor({ placeRepository }) {
    this._placeRepository = placeRepository;
  }

  async execute(useCasePayload) {
    await this._placeRepository.verifyPlaceExists(useCasePayload);
    return this._placeRepository.getById(useCasePayload);
  }
}

module.exports = GetPlaceUseCase;
