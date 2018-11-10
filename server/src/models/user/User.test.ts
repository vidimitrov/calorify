import User, { UserType, verifyPassword, generatePassword, schema } from './User';

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

  it('exports a function for validating the "create" Meal schema', () => {
    const validUser = {
      password: 'pass123',
      name: 'John Doe',
      email: 'john@email.com',
    };
    const invalidUser = {
      daily_calories_limit: 2200,
    };

    expect(schema.isValid).toBeDefined();
    expect(schema.isValid('create', validUser)).toBeTruthy();
    expect(schema.isValid('create', invalidUser)).toBeFalsy();
  });

  it('exports a function for validating the "update" Meal schema', () => {
    const validUser = {
      daily_calories_limit: 2200,
    };
    const invalidUser = {};

    expect(schema.isValid).toBeDefined();
    expect(schema.isValid('update', validUser)).toBeTruthy();
    expect(schema.isValid('update', invalidUser)).toBeFalsy();
  });
});
