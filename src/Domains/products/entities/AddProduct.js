class AddProduct {
  constructor(payload) {
    this.#verifyPayload(payload);

    this.place_id = payload.place_id;
    this.thumbnail = payload.thumbnail;
    this.name = payload.name;
    this.price = payload.price;
  }

  #verifyPayload(payload) {
    const {
      place_id,
      thumbnail,
      name,
      price,
    } = payload;

    if (
      !place_id
      || !thumbnail
      || !name
      || !price
    ) {
      throw new Error('ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof place_id !== 'string'
      || typeof thumbnail !== 'string'
      || typeof name !== 'string'
      || typeof price !== 'number'
    ) {
      throw new Error('ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddProduct;
