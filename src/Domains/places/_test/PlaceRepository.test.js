const PlaceRepository = require('../PlaceRepository');

describe('PlaceRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const placeRepository = new PlaceRepository();

    // Action & Assert
    await expect(placeRepository.pagination({})).rejects.toThrowError(
      'PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(placeRepository.getById('')).rejects.toThrowError(
      'PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(placeRepository.addPlace({})).rejects.toThrowError(
      'PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(placeRepository.updatePlace('', {})).rejects.toThrowError(
      'PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(placeRepository.deletePlace('')).rejects.toThrowError(
      'PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(placeRepository.verifyPlaceExists('')).rejects.toThrowError(
      'PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
