import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FormHeader from './FormHeader';

it('Authentication/FormHeader component renders correctly', () => {
  const tree = renderer.create(<FormHeader>Some header</FormHeader>).toJSON();
  expect(tree).toMatchSnapshot();
});
