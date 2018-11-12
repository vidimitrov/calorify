import jwt from 'jsonwebtoken';
import {
  STORE_ACCOUNT_DATA,
  UPDATE_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_SUCCESS,
} from '../constants/actionTypes';
import { parseUser } from '../api/users';

function getInitialState() {
  const token = localStorage.getItem('token') || null;
  const data = token ? parseUser(jwt.decode(token)) : null;

  return {
    data: data || {},
    loading: false,
    error: null,
  };
}

export default function account(state = getInitialState(), action) {
  switch (action.type) {
    case STORE_ACCOUNT_DATA:
      return {
        ...state,
        data: Object.assign(state.data, action.payload),
      };
    case UPDATE_ACCOUNT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: Object.assign(state.data, action.payload.user),
      };
    }
    case UPDATE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
