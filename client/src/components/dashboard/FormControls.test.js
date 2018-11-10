import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FormControls from './FormControls';

it('Dashboard/FormControls component renders correctly', () => {
  const tree = renderer.create(<FormControls />).toJSON();
  expect(tree).toMatchSnapshot();
});
