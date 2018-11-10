import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FormFooter from './FormFooter';

it('Authentication/FormFooter component renders correctly', () => {
  const tree = renderer.create(<FormFooter>Some footer</FormFooter>).toJSON();
  expect(tree).toMatchSnapshot();
});
