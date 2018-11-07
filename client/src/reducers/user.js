import jwt from 'jsonwebtoken';
import {
  STORE_USER_DATA,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../constants/actionTypes';

function getInitialState() {
  const token = localStorage.getItem('token') || null;
  let data = null;

  if (token) {
    data = jwt.decode(token);
  }

  return {
    data,
    loading: false,
    error: null,
  };
}

export default function user(state = getInitialState(), action) {
  switch (action.type) {
    case STORE_USER_DATA:
      return {
        ...state,
        data: Object.assign(state.data, action.data),
      };
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS: {
      const updatedUser = action.payload.user;

      return {
        ...state,
        loading: false,
        data: Object.assign(state.data, updatedUser),
      };
    }
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
