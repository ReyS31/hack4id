const AddPlace = require('../AddPlace');

describe('AddPlace entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      user_id: 'test',
      category_id: 'test',
      thumbnail: 'test',
      name: 'test',
      phone: '081223344556',
      email: 'test@test.test',
      address: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
    };

    // Action & Assert
    expect(() => new AddPlace(payload)).toThrowError(
      'ADD_PLACE.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      user_id: 'test',
      category_id: 'test',
      thumbnail: 123,
      name: 'test',
      phone: '081223344556',
      email: 'test@test.test',
      address: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
      longitude: 0,
      latitude: 1,
    };

    // Action & Assert
    expect(() => new AddPlace(payload)).toThrowError(
      'ADD_PLACE.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw error when phone is not valid', () => {
    // Arrange
    const payload = {
      user_id: 'test',
      category_id: 'test',
      thumbnail: '123',
      name: 'test',
      phone: '+6359895897885',
      email: 'test@test.test',
      address: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
      longitude: 0,
      latitude: 1,
    };

    // Action & Assert
    expect(() => new AddPlace(payload)).toThrowError(
      'ADD_PLACE.PHONE_IS_NOT_VALID',
    );
  });

  it('should throw error when email is not valid', () => {
    // Arrange
    const payload = {
      user_id: 'test',
      category_id: 'test',
      thumbnail: '123',
      name: 'test',
      phone: '081223344556',
      email: 'test.test',
      address: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
      longitude: 0,
      latitude: 1,
    };

    // Action & Assert
    expect(() => new AddPlace(payload)).toThrowError(
      'ADD_PLACE.EMAIL_IS_NOT_VALID',
    );
  });

  it('should create AddPlace entities correctly', () => {
    // Arrange
    const payload = {
      user_id: 'test',
      category_id: 'test',
      thumbnail: 'test',
      name: 'test',
      phone: '081223344556',
      email: 'test@test.test',
      address: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
      longitude: 0,
      latitude: 1,
    };

    // Action
    const place = new AddPlace(payload);

    // Assert
    expect(place).toBeInstanceOf(AddPlace);
    expect(place.user_id).toEqual(payload.user_id);
    expect(place.category_id).toEqual(payload.category_id);
    expect(place.thumbnail).toEqual(payload.thumbnail);
    expect(place.name).toEqual(payload.name);
    expect(place.phone).toEqual(payload.phone);
    expect(place.email).toEqual(payload.email);
    expect(place.address).toEqual(payload.address);
    expect(place.social_media).toEqual(payload.social_media);
  });
});
