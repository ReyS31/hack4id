class Product {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.id = payload.id;
    this.place_id = payload.place_id;
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.price = payload.price;
    this.discounted_price = payload.discounted_price;
    this.discount = payload.discount;
    this.pinned = payload.pinned;
    this.available = payload.available;
  }

  #verifyPayload(payload) {
    const {
      id,
      place_id,
      name,
      thumbnail,
      price,
      discounted_price,
      discount,
      pinned,
      available,
    } = payload;

    if (
      !id
      || !place_id
      || !name
      || !thumbnail
      || !price
      || discount === undefined
      || pinned === undefined
      || available === undefined
    ) {
      throw new Error('PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof place_id !== 'string'
      || typeof name !== 'string'
      || typeof thumbnail !== 'string'
      || typeof price !== 'number'
      || typeof discount !== 'boolean'
      || typeof pinned !== 'boolean'
      || typeof available !== 'boolean'
    ) {
      throw new Error('PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (discounted_price && typeof discounted_price !== 'number') {
      throw new Error('PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Product;
