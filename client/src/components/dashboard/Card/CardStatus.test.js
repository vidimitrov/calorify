import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CardStatus from './CardStatus';

it('Dashboard/Card/CardStatus component renders correctly', () => {
  const tree = renderer.create(<CardStatus inRange />).toJSON();
  expect(tree).toMatchSnapshot();
});
