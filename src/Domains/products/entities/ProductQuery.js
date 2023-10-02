class ProductQuery {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.name = payload.name;
    this.page = payload.page;
  }

  #verifyPayload(payload) {
    const { name, page } = payload;

    if (!page) {
      throw new Error('PRODUCT_QUERY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof page !== 'string') {
      throw new Error('PRODUCT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (name && typeof name !== 'string') {
      throw new Error('PRODUCT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = ProductQuery;
