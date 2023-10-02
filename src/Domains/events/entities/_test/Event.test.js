const Event = require('../Event');

describe('Event entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      title: 'test',
      body: 'test',
    };

    // Action & Assert
    expect(() => new Event(payload)).toThrowError(
      'EVENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 123,
      title: 'test',
      body: 'test',
      created_at: '2000-02-02',
    };

    // Action & Assert
    expect(() => new Event(payload)).toThrowError(
      'EVENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create Event entities correctly', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      title: 'test',
      body: 'test',
      created_at: '2000-02-02',
    };

    // Action
    const place = new Event(payload);

    // Assert
    expect(place).toBeInstanceOf(Event);
    expect(place.id).toEqual(payload.id);
    expect(place.place_id).toEqual(payload.place_id);
    expect(place.thumbnail).toEqual(payload.thumbnail);
    expect(place.title).toEqual(payload.title);
    expect(place.body).toEqual(payload.body);
    expect(place.created_at).toEqual(payload.created_at);
  });
});
