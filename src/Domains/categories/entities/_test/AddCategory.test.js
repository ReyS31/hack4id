const AddCategory = require('../AddCategory');

describe('AddCategory entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      icon: 'test',
    };

    // Action & Assert
    expect(() => new AddCategory(payload)).toThrowError(
      'ADD_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      icon: 'test',
      name: 12345,
    };

    // Action & Assert
    expect(() => new AddCategory(payload)).toThrowError(
      'ADD_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create AddCategory entities correctly', () => {
    // Arrange
    const payload = {
      icon: 'test',
      name: 'test',
    };

    // Action
    const addCategory = new AddCategory(payload);

    // Assert
    expect(addCategory).toBeInstanceOf(AddCategory);
    expect(addCategory.icon).toEqual(payload.icon);
    expect(addCategory.name).toEqual(payload.name);
  });
});
