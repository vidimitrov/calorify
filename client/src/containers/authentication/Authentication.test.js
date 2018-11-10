import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Authentication from './Authentication';

it('Authentication container renders correctly', () => {
  const tree = renderer.create(
    <Authentication><div /></Authentication>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
