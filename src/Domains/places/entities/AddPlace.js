const validateEmail = require('../../../Commons/utils/validateEmail');
const validatePhone = require('../../../Commons/utils/validatePhone');

class AddPlace {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.user_id = payload.user_id;
    this.category_id = payload.category_id;
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.phone = payload.phone;
    this.email = payload.email;
    this.address = payload.address;
    this.social_media = payload.social_media;
    this.location = [payload.longitude, payload.latitude];

    Object.keys(this).forEach(
      (key) => this[key] === undefined && delete this[key],
    );
  }

  #verifyPayload(payload) {
    const {
      user_id,
      category_id,
      thumbnail,
      name,
      phone,
      email,
      address,
      latitude,
      longitude,
    } = payload;

    if (
      !user_id
      || !category_id
      || !thumbnail
      || !name
      || !phone
      || !email
      || !address
      || latitude === undefined
      || longitude === undefined
    ) {
      throw new Error('ADD_PLACE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof user_id !== 'string'
      || typeof category_id !== 'string'
      || typeof thumbnail !== 'string'
      || typeof name !== 'string'
      || typeof phone !== 'string'
      || typeof email !== 'string'
      || typeof address !== 'string'
      || typeof latitude !== 'number'
      || typeof longitude !== 'number'
    ) {
      throw new Error('ADD_PLACE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!validatePhone(phone)) {
      throw new Error('ADD_PLACE.PHONE_IS_NOT_VALID');
    }

    if (!validateEmail(email)) {
      throw new Error('ADD_PLACE.EMAIL_IS_NOT_VALID');
    }
  }
}

module.exports = AddPlace;
