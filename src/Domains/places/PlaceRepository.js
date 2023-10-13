/* eslint-disable no-unused-vars */
class PlaceRepository {
  async pagination(placeQuery) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getById(id) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addPlace(addPlace) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updatePlace(id, updatePlace) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deletePlace(id) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyPlaceExists(id) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async isPhoneAvailable(phone) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async isEmailAvailable(email) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async activatePin(id, date) {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deactivatePin() {
    throw new Error('PLACE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PlaceRepository;
