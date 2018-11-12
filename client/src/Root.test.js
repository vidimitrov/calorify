import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

const mockState = {
  account: {
    data: {
      id: 'fake-id',
      name: '',
      email: '',
      role: 'user',
      dailyCaloriesLimit: 2250,
    },
  },
  meals: {
    data: [],
  },
  auth: {
    token: '',
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  const mockStore = {
    subscribe: () => { },
    dispatch: () => { },
    getState: () => (mockState),
  };
  ReactDOM.render(<Root store={mockStore} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
