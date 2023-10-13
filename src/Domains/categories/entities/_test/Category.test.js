const Category = require('../Category');

describe('Category entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      icon: 'test',
      name: 'test',
    };

    // Action & Assert
    expect(() => new Category(payload)).toThrowError(
      'CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      icon: 'test',
      name: 12345,
    };

    // Action & Assert
    expect(() => new Category(payload)).toThrowError(
      'CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create Category entities correctly', () => {
    // Arrange
    const payload = {
      id: '123',
      icon: 'test',
      name: 'test',
    };

    // Action
    const category = new Category(payload);

    // Assert
    expect(category).toBeInstanceOf(Category);
    expect(category.id).toEqual(payload.id);
    expect(category.icon).toEqual(payload.icon);
    expect(category.name).toEqual(payload.name);
  });
});
