import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import MealsList from './MealsList';

it('Dashboard/MealsList component renders correctly', () => {
  const tree = renderer.create(<MealsList />).toJSON();
  expect(tree).toMatchSnapshot();
});
