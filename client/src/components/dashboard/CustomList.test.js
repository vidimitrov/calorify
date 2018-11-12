import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CustomList from './CustomList';

it('Dashboard/CustomList component renders correctly', () => {
  const tree = renderer.create(<CustomList />).toJSON();
  expect(tree).toMatchSnapshot();
});
