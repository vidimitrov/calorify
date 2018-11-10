import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Input from './Input';

it('Authentication/Input component renders correctly', () => {
  const tree = renderer.create(
    <Input value="some-value" placeholder="Add some value here" />,
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
