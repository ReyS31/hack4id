class AddCategory {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.icon = payload.icon;
    this.name = payload.name;
  }

  #verifyPayload(payload) {
    const { icon, name } = payload;

    if (!icon || !name) {
      throw new Error('ADD_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof icon !== 'string' || typeof name !== 'string') {
      throw new Error('ADD_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddCategory;
