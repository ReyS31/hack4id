class ProductQuery {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.status = payload.status;
    this.date = payload.date;
    this.page = payload.page;
  }

  #verifyPayload(payload) {
    const { date, page, status } = payload;

    if (!page) {
      throw new Error('PRODUCT_QUERY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof page !== 'string') {
      throw new Error('PRODUCT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (date && typeof date !== 'string') {
      throw new Error('PRODUCT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (status && typeof status !== 'string') {
      throw new Error('PRODUCT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = ProductQuery;
