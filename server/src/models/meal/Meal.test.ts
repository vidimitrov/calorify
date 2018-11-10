import Meal, { MealType, schema } from './Meal';

describe('Meal model', () => {
  it('should exist', () => {
    expect(Meal).toBeDefined();
  });

  it('should be exported as a module', () => {
    expect(typeof Meal).toBe('object');
  });

  it('exports a find function', () => {
    expect(Meal.find).toBeDefined();
  });

  it('exports a findAll function', () => {
    expect(Meal.findAll).toBeDefined();
  });

  it('exports a findById function', () => {
    expect(Meal.findById).toBeDefined();
  });

  it('exports a create function', () => {
    expect(Meal.create).toBeDefined();
  });

  it('exports a update function', () => {
    expect(Meal.update).toBeDefined();
  });

  it('exports a remove function', () => {
    expect(Meal.remove).toBeDefined();
  });

  it('exports a function for validating the "create" Meal schema', () => {
    const validMeal = {
      text: 'Chicken with rice',
      number_of_calories: 300,
      user_id: 1,
    };
    const invalidMeal = {
      text: 'Chicken with rice',
    };

    expect(schema.isValid).toBeDefined();
    expect(schema.isValid('create', validMeal)).toBeTruthy();
    expect(schema.isValid('create', invalidMeal)).toBeFalsy();
  });

  it('exports a function for validating the "update" Meal schema', () => {
    const validMeal = {
      text: 'Chicken with rice',
    };
    const invalidMeal = {};

    expect(schema.isValid).toBeDefined();
    expect(schema.isValid('update', validMeal)).toBeTruthy();
    expect(schema.isValid('update', invalidMeal)).toBeFalsy();
  });
});
