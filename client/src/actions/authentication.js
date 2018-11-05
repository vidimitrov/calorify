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

export const storeUserDataAction = (name, email, password) => {
  return {
    type: STORE_USER_DATA,
    name,
    email,
    password,
  };
};

export const loginSuccess = (token, user) => {
  return {
    type: LOGIN_SUCCESS,
    token,
    user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signupFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    error,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutFailure = (error) => {
  return {
    type: LOGOUT_FAILURE,
    error,
  };
};

const handleSuccessfulLogin = (dispatch) => {
  return (response) => {
    if (response.body && response.body.token) {
      const token = response.body.token;
      const user = jwt.decode(token);

      window.localStorage.setItem('token', token);
      dispatch(loginSuccess(token, user));
      return Promise.resolve(token);
    }
  };
};
const handleFailedLogin = (dispatch) => {
  return (error) => {
    dispatch(loginFailure(error));
  };
};

export const login = (email, password) => () => {
  return auth.login(email, password)
    .then(handleSuccessfulLogin)
    .catch(handleFailedLogin);
};

const handleSuccessfulSignup = (dispatch, email, password) => {
  return () => {
    dispatch(signupSuccess());
    return auth.login(email, password);
  };
};
const handleFailedSignup = (dispatch) => {
  return (error) => {
    dispatch(signupFailure(error));
  };
};

export const signup = (userData) => () => {
  const { name, email, password } = userData;
  return auth.signup(name, email, password)
    .then(handleSuccessfulSignup(dispatch, email, password))
    .then(handleSuccessfulLogin)
    .catch(handleFailedSignup);
};

const handleSuccessfulLogout = (dispatch) => {
  return () => {
    window.localStorage.removeItem('token');
    dispatch(logoutSuccess());
    return Promise.resolve();
  };
};
const handleFailedLogout = (dispatch) => {
  return (error) => {
    dispatch(logoutFailure(error));
  };
};

export const logout = () => (dispatch) => {
  return auth.logout()
    .then(handleSuccessfulLogout(dispatch))
    .catch(handleFailedLogout(dispatch));
};

