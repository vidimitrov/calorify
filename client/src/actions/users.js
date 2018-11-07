import { update } from '../api/users';
import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  STORE_USER_DATA,
} from '../constants/actionTypes';

/**
 * Store user data
 */
export const storeUserData = data => ({
  type: STORE_USER_DATA,
  data,
});

/**
 *  Update user actions
 *  */
export const updateUserStart = (userId, updates) => ({
  type: UPDATE_USER_START,
  payload: { userId, updates },
});

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user },
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: { error },
});

/**
 * Update user action response handlers
 *  */
const handleUpdateUserSuccess = dispatch => (response) => {
  const { user } = response;
  dispatch(updateUserSuccess(user));
  return Promise.resolve(user);
};
const handleUpdateUserFailure = dispatch => (error) => {
  dispatch(updateUserFailure(error));
  return Promise.reject(error);
};

/**
 *  Update user action creator
 *  */
export const updateUser = (userId, updates) => (dispatch, getState) => {
  dispatch(updateUserStart(userId, updates));
  const state = getState();
  const { token } = state.auth;

  return update(token, userId, updates)
    .then(handleUpdateUserSuccess(dispatch))
    .catch(handleUpdateUserFailure(dispatch));
};
