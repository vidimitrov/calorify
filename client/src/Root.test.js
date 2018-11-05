import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const mockStore = {
    subscribe: () => { },
    dispatch: () => { },
    getState: () => { }
  };
  ReactDOM.render(<Root store={mockStore} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
