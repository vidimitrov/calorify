import React from 'react';
import renderer from 'react-test-renderer';
import { CreateMeal } from './CreateMeal';

it('CreateMeal container renders correctly', () => {
  const props = {
    createMeal: () => { },
    navigate: () => { },
    account: {
      id: 'some-fake-id',
      name: 'John',
      dailyCaloriesLimit: 2000,
      role: 'user',
      email: 'john@email.com',
    },
    initialDate: new Date('1995-12-17T03:24:00'),
  };
  const tree = renderer.create(
    <CreateMeal {...props} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
