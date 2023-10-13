const validateEmail = require('../../../Commons/utils/validateEmail');
const validatePhone = require('../../../Commons/utils/validatePhone');

class RegisterUser {
  constructor(payload) {
    const {
      name, password, email, phone,
    } = this.#verifyPayload(payload);

    this.name = name;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

  #verifyPayload({
    name, password, email, phone,
  }) {
    if (!name || !password || !email || !phone) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof name !== 'string'
      || typeof password !== 'string'
      || typeof email !== 'string'
      || typeof phone !== 'string'
    ) {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!validatePhone(phone)) {
      throw new Error('REGISTER_USER.PHONE_IS_NOT_VALID');
    }

    if (!validateEmail(email)) {
      throw new Error('REGISTER_USER.EMAIL_IS_NOT_VALID');
    }

    if (!name.match(/^[a-zA-Z ]*$/)) {
      throw new Error('REGISTER_USER.NAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    return {
      name,
      password,
      email,
      phone,
    };
  }
}

module.exports = RegisterUser;
