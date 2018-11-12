import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Authentication from './containers/authentication/Authentication';
import Login from './containers/authentication/Login';
import Signup from './containers/authentication/Signup';
import Dashboard from './containers/dashboard/Dashboard';
import Main from './containers/dashboard/Main';
import UserSettings from './containers/dashboard/UserSettings';
import Users from './containers/dashboard/manager/Users';
import CreateUser from './containers/dashboard/manager/CreateUser';
import UpdateUser from './containers/dashboard/manager/UpdateUser';
import Meals from './containers/dashboard/admin/Meals';
import CreateMeal from './containers/dashboard/CreateMeal';
import UpdateMeal from './containers/dashboard/UpdateMeal';

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
            <Users path="users" />
            <CreateUser path="create-user" />
            <UpdateUser path="users/:userId" />
            <UserSettings path="settings" />
            <Meals path="users/:userId/meals" />
            <CreateMeal path="create-meal" />
            <UpdateMeal path="meals/:mealId" />
          </Dashboard>
          <Authentication path="auth">
            <Login path="login" />
            <Signup path="signup" />
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
