const PlaceMini = require('../PlaceMini');

describe('PlaceMini entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'test',
      category_id: 'test',
      thumbnail: 'test',
      name: 'test',
    };

    // Action & Assert
    expect(() => new PlaceMini(payload)).toThrowError(
      'PLACE_MINI.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'test',
      category_id: 'test',
      thumbnail: 123,
      name: 'test',
      alamat: 'test',
    };

    // Action & Assert
    expect(() => new PlaceMini(payload)).toThrowError(
      'PLACE_MINI.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create PlaceMini entities correctly', () => {
    // Arrange
    const payload = {
      id: 'test',
      category_id: 'test',
      thumbnail: 'test',
      name: 'test',
      alamat: 'test',
    };

    // Action
    const placeMini = new PlaceMini(payload);

    // Assert
    expect(placeMini).toBeInstanceOf(PlaceMini);
    expect(placeMini.id).toEqual(payload.id);
    expect(placeMini.category_id).toEqual(payload.category_id);
    expect(placeMini.thumbnail).toEqual(payload.thumbnail);
    expect(placeMini.name).toEqual(payload.name);
    expect(placeMini.alamat).toEqual(payload.alamat);
  });
});
