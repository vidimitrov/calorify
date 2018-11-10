import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CustomIconButton from './CustomIconButton';

it('Dashboard/CustomIconButton component renders correctly', () => {
  const tree = renderer.create(<CustomIconButton>Click me</CustomIconButton>).toJSON();
  expect(tree).toMatchSnapshot();
});
