import Meal, { MealType } from './Meal';

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
});
