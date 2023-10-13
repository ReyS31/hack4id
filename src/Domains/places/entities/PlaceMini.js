/* eslint-disable camelcase */
class PlaceMini {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.category = payload.category;
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.address = payload.address;
    this.distance = payload.distance;
    this.pinned = payload.pinned ?? false;
  }

  #verifyPayload(payload) {
    const {
      id,
      category,
      name,
      thumbnail,
      address,
    } = payload;

    if (
      !id
      || !category
      || !name
      || !thumbnail
      || !address
    ) {
      throw new Error('PLACE_MINI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof category !== 'string'
      || typeof name !== 'string'
      || typeof thumbnail !== 'string'
      || typeof address !== 'string'
    ) {
      throw new Error('PLACE_MINI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PlaceMini;
