import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FiltersControls from './FiltersControls';

it('Dashboard/FiltersControls component renders correctly', () => {
  const tree = renderer.create(<FiltersControls />).toJSON();
  expect(tree).toMatchSnapshot();
});
