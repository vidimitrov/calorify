import { isValidEmail } from './validations';

describe('validations lib', () => {
  describe('isValidEmail', () => {
    it('should return true if email is valid', () => {
      expect(isValidEmail('john@email.com')).toBe(true);
    });

    it('should return false if email is invalid', () => {
      expect(isValidEmail('john@email')).toBe(false);
    });
  });
});
