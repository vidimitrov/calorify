import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CustomTextField from './CustomTextField';

it('Dashboard/CustomTextField component renders correctly', () => {
  const tree = renderer.create(<CustomTextField value="some-value" />).toJSON();
  expect(tree).toMatchSnapshot();
});
