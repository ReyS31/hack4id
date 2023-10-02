const AddProduct = require('../AddProduct');

describe('AddProduct entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      place_id: 'test',
      thumbnail: 'test',
      name: 'test',
    };

    // Action & Assert
    expect(() => new AddProduct(payload)).toThrowError(
      'ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      place_id: 'test',
      thumbnail: 123,
      name: 'test',
      price: 1000,
    };

    // Action & Assert
    expect(() => new AddProduct(payload)).toThrowError(
      'ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create AddProduct entities correctly', () => {
    // Arrange
    const payload = {
      place_id: 'test',
      thumbnail: 'test',
      name: 'test',
      price: 1000,
    };

    // Action
    const place = new AddProduct(payload);

    // Assert
    expect(place).toBeInstanceOf(AddProduct);
    expect(place.place_id).toEqual(payload.place_id);
    expect(place.thumbnail).toEqual(payload.thumbnail);
    expect(place.name).toEqual(payload.name);
    expect(place.price).toEqual(payload.price);
  });
});
