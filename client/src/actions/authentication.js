import jwt from 'jsonwebtoken';

import * as auth from '../api/authentication';
import { storeUserData } from './users';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RESET_AUTH_ERRORS,
} from '../constants/actionTypes';


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

export const resetErrors = () => ({
  type: RESET_AUTH_ERRORS,
});


/**
 *  Login action response handlers
 *  */
const handleLoginSuccess = dispatch => (response) => {
  const { token } = response;
  const user = jwt.decode(token);

  window.localStorage.setItem('token', token);
  dispatch(loginSuccess(token));
  dispatch(storeUserData(user));
  return Promise.resolve();
};
const handleLoginFailure = dispatch => (error) => {
  dispatch(loginFailure(error));
  return Promise.reject(error);
};

/**
 *  Login action creator
 *  */
export const login = (email, password) => dispatch => auth.login(email, password)
  .then(handleLoginSuccess(dispatch))
  .catch(handleLoginFailure(dispatch));


/**
 * Signup action response handlers
 *  */
const handleSignupSuccess = (dispatch, email, password) => () => {
  dispatch(signupSuccess());
  return auth.login(email, password);
};
const handleSignupFailure = dispatch => (error) => {
  dispatch(signupFailure(error));
  return Promise.reject(error);
};

/**
 * Signup action creator
 */
export const signup = userData => (dispatch) => {
  const { name, email, password } = userData;

  return auth.signup(name, email, password)
    .then(handleSignupSuccess(dispatch, email, password))
    .then(handleLoginSuccess(dispatch))
    .catch(handleSignupFailure(dispatch));
};

/**
 * Logout action response handlers
 */
const handleLogoutSuccess = dispatch => () => {
  window.localStorage.removeItem('token');
  dispatch(logoutSuccess());
  return Promise.resolve();
};
const handleLogoutFailure = dispatch => (error) => {
  dispatch(logoutFailure(error));
  return Promise.reject(error);
};

/**
 * Logout action creator
 */
export const logout = () => dispatch => auth.logout()
  .then(handleLogoutSuccess(dispatch))
  .catch(handleLogoutFailure(dispatch));
