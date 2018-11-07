import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Authentication from './containers/authentication/Authentication';
import Login from './containers/authentication/Login';
import Signup from './containers/authentication/Signup';
import ForgotPassword from './containers/authentication/ForgotPassword';
import Dashboard from './containers/dashboard/Dashboard';
import Main from './containers/dashboard/Main';
import UserSettings from './containers/dashboard/UserSettings';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#f0cd61',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: '#ff387b',
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'white',
      },
    },
  },
});

function Root({ store }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Dashboard path="/">
            <Main path="/" />
            <UserSettings path="settings" />
          </Dashboard>
          <Authentication path="auth">
            <Login path="login" />
            <Signup path="signup" />
            <ForgotPassword path="forgot-password" />
          </Authentication>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
