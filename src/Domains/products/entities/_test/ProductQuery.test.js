const ProductQuery = require('../ProductQuery');

describe('ProductQuery entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'test',
    };

    // Action & Assert
    expect(() => new ProductQuery(payload)).toThrowError(
      'PRODUCT_QUERY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      page: 1,
    };

    // Action & Assert
    expect(() => new ProductQuery(payload)).toThrowError(
      'PRODUCT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 123,
      page: '1',
    };

    // Action & Assert
    expect(() => new ProductQuery(payload)).toThrowError(
      'PRODUCT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create ProductQuery entities correctly', () => {
    // Arrange
    const payload = {
      name: 'test',
      page: '1',
    };

    // Action
    const productQuery = new ProductQuery(payload);

    // Assert
    expect(productQuery).toBeInstanceOf(ProductQuery);
    expect(productQuery.name).toEqual(payload.name);
    expect(productQuery.page).toEqual(payload.page);
  });
});
