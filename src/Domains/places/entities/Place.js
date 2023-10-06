/* eslint-disable camelcase */
class Place {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.category_id = payload.category_id;
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.phone = payload.phone;
    this.email = payload.email;
    this.address = payload.address;
    this.social_media = payload.social_media;
  }

  #verifyPayload(payload) {
    const {
      id,
      category_id,
      name,
      thumbnail,
      phone,
      email,
      address,
      social_media,
    } = payload;

    if (
      !id
      || !category_id
      || !name
      || !thumbnail
      || !phone
      || !email
      || !address
      || !social_media
    ) {
      throw new Error('PLACE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof category_id !== 'string'
      || typeof name !== 'string'
      || typeof thumbnail !== 'string'
      || typeof phone !== 'string'
      || typeof email !== 'string'
      || typeof address !== 'string'
      || typeof social_media !== 'object'
    ) {
      throw new Error('PLACE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Place;
