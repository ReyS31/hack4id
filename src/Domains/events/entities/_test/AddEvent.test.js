const AddEvent = require('../AddEvent');

describe('AddEvent entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      place_id: 'test',
      thumbnail: 'test',
      title: 'test',
    };

    // Action & Assert
    expect(() => new AddEvent(payload)).toThrowError(
      'ADD_EVENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      place_id: 'test',
      thumbnail: 123,
      title: 'test',
      body: 'test',
    };

    // Action & Assert
    expect(() => new AddEvent(payload)).toThrowError(
      'ADD_EVENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create AddEvent entities correctly', () => {
    // Arrange
    const payload = {
      place_id: 'test',
      thumbnail: 'test',
      title: 'test',
      body: 'test',
    };

    // Action
    const place = new AddEvent(payload);

    // Assert
    expect(place).toBeInstanceOf(AddEvent);
    expect(place.place_id).toEqual(payload.place_id);
    expect(place.thumbnail).toEqual(payload.thumbnail);
    expect(place.title).toEqual(payload.title);
    expect(place.body).toEqual(payload.body);
  });
});
