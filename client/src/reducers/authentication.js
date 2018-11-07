import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RESET_AUTH_ERRORS,
} from '../constants/actionTypes';

function getInitialState() {
  const token = localStorage.getItem('token') || null;

  return {
    token,
  };
}

export default function auth(state = getInitialState(), action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
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
    case RESET_AUTH_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
