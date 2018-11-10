import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Filters from './Filters';

it('Dashboard/Filters component renders correctly', () => {
  const tree = renderer.create(<Filters />).toJSON();
  expect(tree).toMatchSnapshot();
});
