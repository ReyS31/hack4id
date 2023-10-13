const Product = require('../Product');

describe('Product entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      name: 'test',
      price: 1_000_000,
      discounted_price: 900_000,
      discount: false,
      pinned: false,
    };

    // Action & Assert
    expect(() => new Product(payload)).toThrowError(
      'PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      name: 'test',
      price: '1_000_000',
      discount: false,
      pinned: false,
      available: false,
    };

    // Action & Assert
    expect(() => new Product(payload)).toThrowError(
      'PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      name: 'test',
      price: 1_000_000,
      discounted_price: '900_000',
      discount: false,
      pinned: false,
      available: false,
    };

    // Action & Assert
    expect(() => new Product(payload)).toThrowError(
      'PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create Product entities correctly', () => {
    // Arrange
    const payloadOne = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      name: 'test',
      price: 1_000_000,
      discount: false,
      pinned: false,
      available: false,
    };

    const payloadTwo = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      name: 'test',
      price: 1_000_000,
      discounted_price: 900_000,
      discount: false,
      pinned: false,
      available: false,
    };

    // Action
    const productOne = new Product(payloadOne);
    const productTwo = new Product(payloadTwo);

    // Assert
    expect(productOne).toBeInstanceOf(Product);
    expect(productOne.id).toEqual(payloadOne.id);
    expect(productOne.place_id).toEqual(payloadOne.place_id);
    expect(productOne.thumbnail).toEqual(payloadOne.thumbnail);
    expect(productOne.name).toEqual(payloadOne.name);
    expect(productOne.price).toEqual(payloadOne.price);
    expect(productOne.discounted_price).toEqual(undefined);
    expect(productOne.discount).toEqual(payloadOne.discount);
    expect(productOne.pinned).toEqual(payloadOne.pinned);
    expect(productOne.available).toEqual(payloadOne.available);

    expect(productTwo).toBeInstanceOf(Product);
    expect(productTwo.id).toEqual(payloadTwo.id);
    expect(productTwo.place_id).toEqual(payloadTwo.place_id);
    expect(productTwo.thumbnail).toEqual(payloadTwo.thumbnail);
    expect(productTwo.name).toEqual(payloadTwo.name);
    expect(productTwo.price).toEqual(payloadTwo.price);
    expect(productTwo.discounted_price).toEqual(payloadTwo.discounted_price);
    expect(productTwo.discount).toEqual(payloadTwo.discount);
    expect(productTwo.pinned).toEqual(payloadTwo.pinned);
    expect(productTwo.available).toEqual(payloadTwo.available);
  });
});
