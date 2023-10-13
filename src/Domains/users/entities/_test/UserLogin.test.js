const UserLogin = require('../UserLogin');

describe('UserLogin entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      email: 'test@test.test',
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError(
      'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      email: 'test@test.test',
      password: 12345,
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError(
      'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw error when email is not valid', () => {
    // Arrange
    const payload = {
      email: 'testtest.test',
      password: '12345',
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError(
      'USER_LOGIN.EMAIL_IS_NOT_VALID',
    );
  });

  it('should create UserLogin entities correctly', () => {
    // Arrange
    const payload = {
      email: 'test@test.test',
      password: '12345',
    };

    // Action
    const userLogin = new UserLogin(payload);

    // Assert
    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.email).toEqual(payload.email);
    expect(userLogin.password).toEqual(payload.password);
  });
});
