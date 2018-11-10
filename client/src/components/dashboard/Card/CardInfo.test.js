import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CardInfo from './CardInfo';

it('Dashboard/Card/CardInfo component renders correctly', () => {
  const tree = renderer.create(<CardInfo name="Chicken with rice" calories={320} />).toJSON();
  expect(tree).toMatchSnapshot();
});
