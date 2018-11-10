import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Logo from './Logo';

it('Dashboard/Logo component renders correctly', () => {
  const tree = renderer.create(<Logo src="../../assets/img/logo.png" />).toJSON();
  expect(tree).toMatchSnapshot();
});
