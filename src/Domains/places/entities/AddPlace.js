const validateEmail = require('../../../Commons/utlis/validateEmail');
const validatePhone = require('../../../Commons/utlis/validatePhone');

class AddPlace {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.user_id = payload.user_id;
    this.category_id = payload.category_id;
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.phone = payload.phone;
    this.email = payload.email;
    this.alamat = payload.alamat;
    this.social_media = payload.social_media;
    this.location = payload.location;
  }

  #verifyPayload(payload) {
    const {
      user_id,
      category_id,
      thumbnail,
      name,
      phone,
      email,
      alamat,
      social_media,
      location,
    } = payload;

    if (
      !user_id
      || !category_id
      || !thumbnail
      || !name
      || !phone
      || !email
      || !alamat
      || !social_media
      || !location
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
      || typeof alamat !== 'string'
      || typeof social_media !== 'object'
      || typeof location !== 'object'
    ) {
      throw new Error('ADD_PLACE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!validatePhone(phone)) {
      throw new Error('ADD_PLACE.PHONE_IS_NOT_VALID');
    }

    if (!validateEmail(email)) {
      throw new Error('ADD_PLACE.EMAIL_IS_NOT_VALID');
    }

    if (location.length !== 2) {
      throw new Error('ADD_PLACE.LOCATION_IS_NOT_VALID');
    }
  }
}

module.exports = AddPlace;
