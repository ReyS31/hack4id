const EventQuery = require('../EventQuery');

describe('EventQuery entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      place_id: '123',
      name: 'test',
    };

    // Action & Assert
    expect(() => new EventQuery(payload)).toThrowError(
      'EVENT_QUERY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      place_id: 123,
      name: 123,
      page: 1,
    };

    // Action & Assert
    expect(() => new EventQuery(payload)).toThrowError(
      'EVENT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      place_id: '123',
      name: 123,
      page: '1',
    };

    // Action & Assert
    expect(() => new EventQuery(payload)).toThrowError(
      'EVENT_QUERY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create EventQuery entities correctly', () => {
    // Arrange
    const payloadOne = {
      place_id: 'test',
      name: 'test',
      page: '1',
    };

    const payloadTwo = {
      place_id: 'test',
      page: '1',
    };

    // Action
    const eventQueryOne = new EventQuery(payloadOne);

    const eventQueryTwo = new EventQuery(payloadTwo);

    // Assert
    expect(eventQueryOne).toBeInstanceOf(EventQuery);
    expect(eventQueryOne.place_id).toEqual(payloadOne.place_id);
    expect(eventQueryOne.name).toEqual(payloadOne.name);
    expect(eventQueryOne.page).toEqual(payloadOne.page);

    expect(eventQueryTwo).toBeInstanceOf(EventQuery);
    expect(eventQueryTwo.place_id).toEqual(payloadTwo.place_id);
    expect(eventQueryTwo.name).toEqual(undefined);
    expect(eventQueryTwo.page).toEqual(payloadTwo.page);
  });
});
