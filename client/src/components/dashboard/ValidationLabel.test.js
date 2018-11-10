import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import ValidationLabel from './ValidationLabel';

it('Dashboard/ValidationLabel component renders correctly', () => {
  const tree = renderer.create(
    <ValidationLabel invalid>Validation in not correct</ValidationLabel>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
