import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Wrapper from './Wrapper';

it('Authentication/Wrapper component renders correctly', () => {
  const tree = renderer.create(<Wrapper><div /></Wrapper>).toJSON();
  expect(tree).toMatchSnapshot();
});
