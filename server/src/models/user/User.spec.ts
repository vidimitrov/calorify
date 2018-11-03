import User, { UserType, verifyPassword, generatePassword } from './User';

describe('User model', () => {
  it('should exist', () => {
    expect(User).toBeDefined();
  });

  it('should be exported as a module', () => {
    expect(typeof User).toBe('object');
  });

  it('exports a find function', () => {
    expect(User.find).toBeDefined();
  });

  it('exports a findAll function', () => {
    expect(User.findAll).toBeDefined();
  });

  it('exports a findById function', () => {
    expect(User.findById).toBeDefined();
  });

  it('exports a create function', () => {
    expect(User.create).toBeDefined();
  });

  it('exports a update function', () => {
    expect(User.update).toBeDefined();
  });

  it('exports a remove function', () => {
    expect(User.remove).toBeDefined();
  });

  it('exports a verifyPassword function', () => {
    expect(verifyPassword).toBeDefined();
  });

  it('exports a generatePassword function', () => {
    expect(generatePassword).toBeDefined();
  });
});