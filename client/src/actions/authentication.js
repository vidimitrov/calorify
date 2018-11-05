import jwt from 'jsonwebtoken';

import * as auth from '../api/authentication';

import {
  STORE_USER_DATA,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/actionTypes';

export const storeUserDataAction = (name, email, password) => ({
  type: STORE_USER_DATA,
  name,
  email,
  password,
});

export const loginSuccess = (token, user) => ({
  type: LOGIN_SUCCESS,
  token,
  user,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  error,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  error,
});

const handleSuccessfulLogin = dispatch => (response) => {
  if (response.body && response.body.token) {
    const { body } = response;
    const { token } = body;
    const user = jwt.decode(token);

    window.localStorage.setItem('token', token);
    dispatch(loginSuccess(token, user));
    return Promise.resolve(token);
  }
  return Promise.resolve();
};
const handleFailedLogin = dispatch => (error) => {
  dispatch(loginFailure(error));
};

export const login = (email, password) => () => auth.login(email, password)
  .then(handleSuccessfulLogin)
  .catch(handleFailedLogin);

const handleSuccessfulSignup = (dispatch, email, password) => () => {
  dispatch(signupSuccess());
  return auth.login(email, password);
};
const handleFailedSignup = dispatch => (error) => {
  dispatch(signupFailure(error));
};

export const signup = userData => () => {
  const { name, email, password } = userData;
  return auth.signup(name, email, password)
    .then(handleSuccessfulSignup(dispatch, email, password))
    .then(handleSuccessfulLogin)
    .catch(handleFailedSignup);
};

const handleSuccessfulLogout = dispatch => () => {
  window.localStorage.removeItem('token');
  dispatch(logoutSuccess());
  return Promise.resolve();
};
const handleFailedLogout = dispatch => (error) => {
  dispatch(logoutFailure(error));
};

export const logout = () => dispatch => auth.logout()
  .then(handleSuccessfulLogout(dispatch))
  .catch(handleFailedLogout(dispatch));
