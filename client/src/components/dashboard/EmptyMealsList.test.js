import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import EmptyMealsList from './EmptyMealsList';

it('Dashboard/EmptyMealsList component renders correctly', () => {
  const tree = renderer.create(<EmptyMealsList />).toJSON();
  expect(tree).toMatchSnapshot();
});
