class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, name, email, phone,
    } = payload;

    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({
    id, name, email, phone,
  }) {
    if (!id || !name || !email || !phone) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof name !== 'string'
      || typeof email !== 'string'
      || typeof phone !== 'string'
    ) {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;
