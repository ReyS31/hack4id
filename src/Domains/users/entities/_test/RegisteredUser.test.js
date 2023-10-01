const RegisteredUser = require('../RegisteredUser');

describe('a RegisteredUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'test',
      email: 'test@test.test',
      phone: '081223344556',
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      name: 'test',
      email: 'test@test.test',
      phone: 81223344556,
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      'REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create registeredUser object correctly', () => {
    // Arrange
    const payload = {
      id: 'user-123',
      name: 'test',
      email: 'test@test.test',
      phone: '081223344556',
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.name).toEqual(payload.name);
    expect(registeredUser.email).toEqual(payload.email);
    expect(registeredUser.phone).toEqual(payload.phone);
  });
});
