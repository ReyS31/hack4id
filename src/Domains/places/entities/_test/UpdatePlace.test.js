const UpdatePlace = require('../UpdatePlace');

describe('UpdatePlace entities', () => {
  it('should throw error when email does not valid', () => {
    // Arrange
    const payload = {
      category_id: 'test',
      thumbnail: 'test',
      name: 'test',
      phone: '081223344556',
      email: 'testtest.test',
      alamat: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
    };

    // Action & Assert
    expect(() => new UpdatePlace(payload)).toThrowError(
      'UPDATE_PLACE.EMAIL_IS_NOT_VALID',
    );
  });

  it('should throw error when phone does not valid', () => {
    // Arrange
    const payload = {
      user_id: 'test',
      category_id: 'test',
      thumbnail: 123,
      name: 'test',
      phone: '+961223344556',
      email: 'test@test.test',
      alamat: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
      location: [0, 1],
    };

    // Action & Assert
    expect(() => new UpdatePlace(payload)).toThrowError(
      'UPDATE_PLACE.PHONE_IS_NOT_VALID',
    );
  });

  it('should throw error when location is not valid', () => {
    // Arrange
    const payload = {
      user_id: 'test',
      category_id: 'test',
      thumbnail: '123',
      name: 'test',
      phone: '+6259895897885',
      email: 'test@test.test',
      alamat: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
      location: [0, 1, 2],
    };

    // Action & Assert
    expect(() => new UpdatePlace(payload)).toThrowError(
      'UPDATE_PLACE.LOCATION_IS_NOT_VALID',
    );
  });

  it('should throw error when social media is not valid', () => {
    // Arrange
    const payload = {
      user_id: 'test',
      category_id: 'test',
      thumbnail: '123',
      name: 'test',
      phone: '+6259895897885',
      email: 'test@test.test',
      alamat: 'test',
      social_media: '21323',
      location: [0, 1],
    };

    // Action & Assert
    expect(() => new UpdatePlace(payload)).toThrowError(
      'UPDATE_PLACE.SOCIAL_MEDIA_IS_NOT_VALID',
    );
  });

  it('should create UpdatePlace entities correctly', () => {
    // Arrange
    const payload = {
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
      location: [0, 1],
    };

    // Action
    const place = new UpdatePlace(payload);

    // Assert
    expect(place).toBeInstanceOf(UpdatePlace);
    expect(place.category_id).toEqual(payload.category_id);
    expect(place.thumbnail).toEqual(payload.thumbnail);
    expect(place.name).toEqual(payload.name);
    expect(place.phone).toEqual(payload.phone);
    expect(place.email).toEqual(payload.email);
    expect(place.alamat).toEqual(payload.alamat);
    expect(place.social_media).toEqual(
      `${JSON.stringify(payload.social_media)}::json`,
    );
    expect(place.location).toEqual(
      `POINT(${payload.location[0]} ${payload.location[1]})`,
    );
  });

  it('should create UpdatePlace entities correctly with only 2 data', () => {
    // Arrange
    const payload = {
      thumbnail: 'test',
      social_media: {
        fb: 'test',
        x: 'test',
        ig: 'test',
      },
    };

    // Action
    const place = new UpdatePlace(payload);

    // Assert
    expect(place).toBeInstanceOf(UpdatePlace);
    expect(place.thumbnail).toEqual(payload.thumbnail);
    expect(place.social_media).toEqual(`${JSON.stringify(payload.social_media)}::json`);
  });
});
