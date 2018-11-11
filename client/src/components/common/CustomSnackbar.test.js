import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CustomSnackbar from './CustomSnackbar';

it('Common/CustomSnackbar component renders correctly', () => {
  const tree = renderer.create(
    <CustomSnackbar
      onClose={() => { }}
      variant="success"
      message="Meal created successfully"
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
