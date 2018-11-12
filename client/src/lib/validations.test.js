import { isValidEmail, isNumber } from './validations';

describe('validations lib', () => {
  describe('isValidEmail', () => {
    it('should return true if email is valid', () => {
      expect(isValidEmail('john@email.com')).toBe(true);
    });

    it('should return false if email is invalid', () => {
      expect(isValidEmail('john@email')).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should return false if value is not a valid number', () => {
      expect(isNumber('123#')).toBe(false);
    });

    it('should return true if value is a valid number', () => {
      expect(isNumber('123')).toBe(true);
    });
  });
});
