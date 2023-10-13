const validateEmail = require('../validateEmail');

describe('validateEmail', () => {
  it('should return true if email valid', () => {
    const payload = 'rey.pratama123@gmail.com';
    expect(validateEmail(payload)).toEqual(true);
  });

  it('should return false if email invalid', () => {
    const payloads = [
      'rey.pratama123@gmail',
      'rey@pratama123@gmail.com',
      'rey.pratama123gmail.com',
      'rey.pratama123@gmail. com',
    ];

    payloads.forEach((payload) => {
      expect(validateEmail(payload)).toEqual(false);
    });
  });
});
