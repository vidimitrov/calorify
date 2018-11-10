import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import SecondaryAction from './SecondaryAction';

it('Authentication/SecondaryAction component renders correctly', () => {
  const tree = renderer.create(<SecondaryAction />).toJSON();
  expect(tree).toMatchSnapshot();
});
