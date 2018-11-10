import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import GroupHeading from './GroupHeading';

it('Dashboard/GroupHeading component renders correctly', () => {
  const tree = renderer.create(<GroupHeading>Group 1</GroupHeading>).toJSON();
  expect(tree).toMatchSnapshot();
});
