/* eslint-disable camelcase */
class Place {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.category_id = payload.category_id;
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.alamat = payload.alamat;
  }

  #verifyPayload(payload) {
    const {
      id,
      category_id,
      name,
      thumbnail,
      alamat,
    } = payload;

    if (
      !id
      || !category_id
      || !name
      || !thumbnail
      || !alamat
    ) {
      throw new Error('PLACE_MINI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof category_id !== 'string'
      || typeof name !== 'string'
      || typeof thumbnail !== 'string'
      || typeof alamat !== 'string'
    ) {
      throw new Error('PLACE_MINI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Place;
