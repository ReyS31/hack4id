const PlaceQuery = require('../PlaceQuery');

describe('PlaceQuery entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'test',
      lat: '-123.9',
      long: '22.0',
    };

    // Action & Assert
    expect(() => new PlaceQuery(payload)).toThrowError(
      'PLACE_QUERY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 123,
      lat: -123.9,
      long: 22.0,
      page: 1,
    };

    // Action & Assert
    expect(() => new PlaceQuery(payload)).toThrowError(
      'PLACE_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 123,
      lat: '-123.9',
      long: '22.0',
      page: '1',
    };

    // Action & Assert
    expect(() => new PlaceQuery(payload)).toThrowError(
      'PLACE_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create PlaceQuery entities correctly', () => {
    // Arrange
    const payload = {
      name: 'test',
      lat: '-123.9',
      long: '22.0',
      page: '1',
    };

    // Action
    const placeQuery = new PlaceQuery(payload);

    // Assert
    expect(placeQuery).toBeInstanceOf(PlaceQuery);
    expect(placeQuery.name).toEqual(payload.name);
    expect(placeQuery.lat).toEqual(payload.lat);
    expect(placeQuery.long).toEqual(payload.long);
    expect(placeQuery.page).toEqual(payload.page);
  });
});
