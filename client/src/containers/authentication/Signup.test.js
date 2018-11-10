import React from 'react';
import renderer from 'react-test-renderer';
import { Signup } from './Signup';

it('Signup container renders correctly', () => {
  const props = {
    signup: () => { },
    resetErrors: () => { },
    navigate: () => { },
  };
  const tree = renderer.create(
    <Signup {...props} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
