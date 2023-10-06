const validatePhone = require('../validatePhone');

describe('validatePhone', () => {
  it('should return true if phone is valid', () => {
    const payloads = ['+62812 3562 1565', '08123 3562 1565'];
    payloads.forEach((payload) => {
      expect(validatePhone(payload.replace(' ', ''))).toEqual(true);
    });
  });

  it('should return false if email invalid', () => {
    const payloads = [
      '+64812 3562 1565',
      '8123 3562 1565',
      '+62812',
      '0812',
    ];

    payloads.forEach((payload) => {
      expect(validatePhone(payload.replace(' ', ''))).toEqual(false);
    });
  });
});
