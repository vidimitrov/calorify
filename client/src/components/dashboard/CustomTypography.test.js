import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CustomTypography from './CustomTypography';

it('Dashboard/CustomTypography component renders correctly', () => {
  const tree = renderer.create(<CustomTypography />).toJSON();
  expect(tree).toMatchSnapshot();
});
