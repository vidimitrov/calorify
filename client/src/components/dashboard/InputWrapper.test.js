import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import InputWrapper from './InputWrapper';

it('Dashboard/InputWrapper component renders correctly', () => {
  const tree = renderer.create(<InputWrapper />).toJSON();
  expect(tree).toMatchSnapshot();
});
