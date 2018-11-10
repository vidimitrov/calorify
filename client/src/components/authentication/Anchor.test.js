import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Anchor from './Anchor';

it('Authentication/Anchor component renders correctly', () => {
  const tree = renderer.create(<Anchor to="/auth/login">Login</Anchor>).toJSON();
  expect(tree).toMatchSnapshot();
});
