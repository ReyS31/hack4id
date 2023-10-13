class Category {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.icon = payload.icon;
    this.name = payload.name;
  }

  #verifyPayload(payload) {
    const { id, icon, name } = payload;

    if (!id || !icon || !name) {
      throw new Error('CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof icon !== 'string'
      || typeof name !== 'string'
    ) {
      throw new Error('CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Category;
