import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Image from './Image';

it('Authentication/Image component renders correctly', () => {
  const tree = renderer.create(<Image src="../../assets/img/logo.png" />).toJSON();
  expect(tree).toMatchSnapshot();
});
