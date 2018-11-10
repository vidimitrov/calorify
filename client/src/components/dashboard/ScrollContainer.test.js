import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import ScrollContainer from './ScrollContainer';

it('Dashboard/ScrollContainer component renders correctly', () => {
  const tree = renderer.create(<ScrollContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
