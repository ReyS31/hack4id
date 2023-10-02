const EventMini = require('../EventMini');

describe('EventMini entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      title: 'test',
    };

    // Action & Assert
    expect(() => new EventMini(payload)).toThrowError(
      'EVENT_MINI.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 123,
      title: 'test',
      created_at: 'test',
    };

    // Action & Assert
    expect(() => new EventMini(payload)).toThrowError(
      'EVENT_MINI.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create EventMini entities correctly', () => {
    // Arrange
    const payload = {
      id: 'test',
      place_id: 'test',
      thumbnail: 'test',
      title: 'test',
      created_at: 'test',
    };

    // Action
    const placeMini = new EventMini(payload);

    // Assert
    expect(placeMini).toBeInstanceOf(EventMini);
    expect(placeMini.id).toEqual(payload.id);
    expect(placeMini.place_id).toEqual(payload.place_id);
    expect(placeMini.thumbnail).toEqual(payload.thumbnail);
    expect(placeMini.title).toEqual(payload.title);
    expect(placeMini.created_at).toEqual(payload.created_at);
  });
});
