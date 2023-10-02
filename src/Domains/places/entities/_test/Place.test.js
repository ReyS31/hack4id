const Place = require('../Place');

describe('Place entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'test',
      category_id: 'test',
      thumbnail: 'test',
      name: 'test',
      phone: '081223344556',
      email: 'test@test.test',
      alamat: 'test',
    };

    // Action & Assert
    expect(() => new Place(payload)).toThrowError(
      'PLACE.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'test',
      category_id: 'test',
      thumbnail: 123,
      name: 'test',
      phone: '081223344556',
      email: 'test@test.test',
      alamat: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
    };

    // Action & Assert
    expect(() => new Place(payload)).toThrowError(
      'PLACE.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create Place entities correctly', () => {
    // Arrange
    const payload = {
      id: 'test',
      category_id: 'test',
      thumbnail: 'test',
      name: 'test',
      phone: '081223344556',
      email: 'test@test.test',
      alamat: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
    };

    // Action
    const place = new Place(payload);

    // Assert
    expect(place).toBeInstanceOf(Place);
    expect(place.id).toEqual(payload.id);
    expect(place.category_id).toEqual(payload.category_id);
    expect(place.thumbnail).toEqual(payload.thumbnail);
    expect(place.name).toEqual(payload.name);
    expect(place.phone).toEqual(payload.phone);
    expect(place.email).toEqual(payload.email);
    expect(place.alamat).toEqual(payload.alamat);
    expect(place.social_media).toEqual(payload.social_media);
  });
});
