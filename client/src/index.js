import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import Root from './Root';
import * as reducers from './reducers';
import * as serviceWorker from './serviceWorker';

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

export const store = createStore(
  combineReducers({
    ...reducers,
  }),
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension &&
      process.env.NODE_ENV === 'development' ?
      window.devToolsExtension() : (f) => f
  )
);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

serviceWorker.register();
