/* eslint-disable camelcase */
class Place {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.category_id = payload.category_id;
    this.category = payload.category ?? '';
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.phone = payload.phone;
    this.pinned = payload.pinned ?? false;
    this.email = payload.email;
    this.address = payload.address;
    this.social_media = payload.social_media;
  }

  #verifyPayload(payload) {
    const {
      id, category_id, name, thumbnail, address,
    } = payload;

    if (!id || !category_id || !name || !thumbnail || !address) {
      throw new Error('PLACE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof category_id !== 'string'
      || typeof name !== 'string'
      || typeof thumbnail !== 'string'
      || typeof address !== 'string'
    ) {
      throw new Error('PLACE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Place;
