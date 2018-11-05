import jwt from 'jsonwebtoken';

import {
  STORE_USER_DATA,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/actionTypes';

function getInitialState() {
  const token = localStorage.getItem('token') || null;
  let user = null;

  if (token) {
    user = jwt.decode(token);
  }

  return {
    data: {},
    token,
    user,
  };
}

export default function auth(state = getInitialState(), action) {
  switch (action.type) {
    case STORE_USER_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          name: action.name,
          email: action.email,
          password: action.password,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        data: {},
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
