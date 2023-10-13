const validateEmail = require('../../../Commons/utils/validateEmail');
const validatePhone = require('../../../Commons/utils/validatePhone');

class UpdatePlace {
  constructor(payload) {
    const {
      category_id,
      thumbnail,
      name,
      phone,
      email,
      alamat,
      social_media,
      location,
    } = this.#verifyPayload(payload);

    this.category_id = category_id;
    this.thumbnail = thumbnail;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.alamat = alamat;
    this.social_media = social_media;
    this.location = location;

    Object.keys(this).forEach(
      (key) => this[key] === undefined && delete this[key],
    );
  }

  #verifyPayload(payload) {
    const {
      category_id = undefined,
      thumbnail = undefined,
      name = undefined,
      phone = undefined,
      email = undefined,
      alamat = undefined,
      social_media = undefined,
      longitude = undefined,
      latitude = undefined,
    } = payload;
    let locationToPoint;
    let socialToJson;

    if (phone !== undefined && !validatePhone(phone)) {
      throw new Error('UPDATE_PLACE.PHONE_IS_NOT_VALID');
    }

    if (email !== undefined && !validateEmail(email)) {
      throw new Error('UPDATE_PLACE.EMAIL_IS_NOT_VALID');
    }

    if (longitude !== undefined && latitude !== undefined) {
      locationToPoint = `POINT(${longitude} ${latitude})`;
    }

    if (social_media !== undefined) {
      if (typeof social_media !== 'object') {
        throw new Error('UPDATE_PLACE.SOCIAL_MEDIA_IS_NOT_VALID');
      }

      socialToJson = `${JSON.stringify(social_media)}::json`;
    }

    return {
      category_id,
      thumbnail,
      name,
      phone,
      email,
      alamat,
      social_media: socialToJson,
      location: locationToPoint,
    };
  }
}

module.exports = UpdatePlace;
