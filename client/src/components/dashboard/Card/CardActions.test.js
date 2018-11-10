import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import CardActions from './CardActions';

it('Dashboard/Card/CardActions component renders correctly', () => {
  const tree = renderer.create(
    <CardActions onEditHandler={() => { }} onDeleteHandler={() => { }} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
