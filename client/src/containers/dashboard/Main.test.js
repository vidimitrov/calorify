import React from 'react';
import renderer from 'react-test-renderer';
import { Main } from './Main';

it('Main container renders correctly', () => {
  const props = {
    logout: () => { },
    getAllMeals: () => { },
    removeMeal: () => { },
    filterMeals: () => { },
    navigate: () => { },
    user: {
      id: 'some-fake-id',
      name: 'John',
      dailyCaloriesLimit: 2000,
      role: 'user',
      email: 'john@email.com',
    },
    meals: [{
      id: 'some-fake-meal-id',
      name: 'some-name',
      date: '2018-11-10',
      time: '13:35',
      calories: 320,
    }],
  };
  const tree = renderer.create(
    <Main {...props} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
