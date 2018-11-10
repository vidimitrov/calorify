import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CardDate from './CardDate';

it('Dashboard/Card/CardDate component renders correctly', () => {
  const tree = renderer.create(<CardDate date="2018-11-10T13:22" />).toJSON();
  expect(tree).toMatchSnapshot();
});
