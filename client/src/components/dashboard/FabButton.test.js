import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FabButton from './FabButton';

it('Dashboard/FabButton component renders correctly', () => {
  const tree = renderer.create(<FabButton>Click me</FabButton>).toJSON();
  expect(tree).toMatchSnapshot();
});
