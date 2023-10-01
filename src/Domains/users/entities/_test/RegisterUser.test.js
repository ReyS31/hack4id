const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'abc',
      email: 'test@test.test',
      password: 'abc',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 123,
      email: true,
      password: 'abc',
      phone: ['0', 1],
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw error when phone contains more than 25 character', () => {
    // Arrange
    const payload = {
      name: 'abc',
      email: 'test@test.test',
      password: 'abc',
      phone: '0812312812532163512474231',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.PHONE_IS_NOT_VALID',
    );
  });

  it('should throw error when phone contains less than 8 character', () => {
    // Arrange
    const payload = {
      name: 'abc',
      email: 'test@test.test',
      password: 'abc',
      phone: '08123',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.PHONE_IS_NOT_VALID',
    );
  });

  it('should throw error when email is not valid', () => {
    // Arrange
    const payload = {
      name: 'abc',
      email: 'test.test',
      password: 'abc',
      phone: '081231281225',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.EMAIL_IS_NOT_VALID',
    );
  });

  it('should throw error when name contains restricted character', () => {
    // Arrange
    const payload = {
      name: 'jinx*Pro test',
      email: 'test@test.test',
      password: 'abc',
      phone: '081231281225',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.NAME_CONTAIN_RESTRICTED_CHARACTER',
    );
  });

  it('should create registerUser object correctly', () => {
    // Arrange
    const payload = {
      name: 'test',
      email: 'test@test.test',
      password: 'abc',
      phone: '081231281225',
    };

    // Action
    const {
      name, email, password, phone,
    } = new RegisterUser(payload);

    // Assert
    expect(name).toEqual(payload.name);
    expect(phone).toEqual(payload.phone);
    expect(email).toEqual(payload.email);
    expect(password).toEqual(payload.password);
  });
});
