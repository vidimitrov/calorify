import React from 'react';
import renderer from 'react-test-renderer';
import { UserSettings } from './UserSettings';

it('UserSettings container renders correctly', () => {
  const props = {
    updateUser: () => { },
    navigate: () => { },
    user: {
      id: 'some-fake-id',
      name: 'John',
      dailyCaloriesLimit: 2000,
      role: 'user',
      email: 'john@email.com',
    },
  };
  const tree = renderer.create(
    <UserSettings {...props} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
