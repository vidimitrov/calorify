import React from 'react';
import renderer from 'react-test-renderer';
import { UpdateMeal } from './UpdateMeal';

it('UpdateMeal container renders correctly', () => {
  const props = {
    updateMeal: () => { },
    getAllMeals: () => { },
    navigate: () => { },
    account: {
      id: 'some-fake-id',
      name: 'John',
      dailyCaloriesLimit: 2000,
      role: 'user',
      email: 'john@email.com',
    },
    mealId: 'some-fake-meal-id',
    meals: [{
      id: 'some-fake-meal-id',
      name: 'some-name',
      date: '2018-11-10',
      time: '13:35',
      calories: 320,
    }],
  };
  const tree = renderer.create(
    <UpdateMeal {...props} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
