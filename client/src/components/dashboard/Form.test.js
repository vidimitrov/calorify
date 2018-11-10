import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Form from './Form';

it('Dashboard/Form component renders correctly', () => {
  const tree = renderer.create(<Form />).toJSON();
  expect(tree).toMatchSnapshot();
});
