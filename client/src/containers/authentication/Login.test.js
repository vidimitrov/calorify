import React from 'react';
import renderer from 'react-test-renderer';
import { Login } from './Login';

it('Login container renders correctly', () => {
  const props = {
    login: () => { },
    resetErrors: () => { },
    navigate: () => { },
  };
  const tree = renderer.create(
    <Login {...props} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
