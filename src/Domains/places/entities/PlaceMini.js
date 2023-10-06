/* eslint-disable camelcase */
class PlaceMini {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.category = payload.category;
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.alamat = payload.alamat;
    this.location = payload.location;
  }

  #verifyPayload(payload) {
    const {
      id,
      category,
      name,
      thumbnail,
      alamat,
    } = payload;

    if (
      !id
      || !category
      || !name
      || !thumbnail
      || !alamat
    ) {
      throw new Error('PLACE_MINI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof category !== 'string'
      || typeof name !== 'string'
      || typeof thumbnail !== 'string'
      || typeof alamat !== 'string'
    ) {
      throw new Error('PLACE_MINI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PlaceMini;
