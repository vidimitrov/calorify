import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FormContent from './FormContent';

it('Authentication/FormContent component renders correctly', () => {
  const tree = renderer.create(<FormContent>Some content</FormContent>).toJSON();
  expect(tree).toMatchSnapshot();
});
