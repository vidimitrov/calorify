import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Dashboard from './Dashboard';

it('Dashboard container renders correctly', () => {
  const tree = renderer.create(
    <Dashboard><div /></Dashboard>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
