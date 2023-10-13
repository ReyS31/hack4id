const validateEmail = require('../../../Commons/utils/validateEmail');

class UserLogin {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.email = payload.email;
    this.password = payload.password;
  }

  #verifyPayload(payload) {
    const { email, password } = payload;

    if (!email || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!validateEmail(email)) {
      throw new Error('USER_LOGIN.EMAIL_IS_NOT_VALID');
    }
  }
}

module.exports = UserLogin;
