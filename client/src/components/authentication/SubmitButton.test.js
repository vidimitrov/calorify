import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import SubmitButton from './SubmitButton';

it('Authentication/SubmitButton component renders correctly', () => {
  const tree = renderer.create(
    <SubmitButton
      disabled={false}
      onClick={() => { }}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
