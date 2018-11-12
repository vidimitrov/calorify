import { update } from '../api/users';
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  REMOVE_USER_START,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
} from '../constants/actionTypes';
import {
  updateAccountStart,
  updateAccountSuccess,
  updateAccountFailure,
} from './account';

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
const handleUpdateUserSuccess = (dispatch, getState) => (response) => {
  const state = getState();
  const { account } = state;
  const { user } = response;

  dispatch(updateUserSuccess(user));

  if (account.id === user.id) {
    dispatch(updateAccountSuccess(user));
  }

  return Promise.resolve(user);
};
const handleUpdateUserFailure = (dispatch, getState) => (error, userId) => {
  const state = getState();
  const { account } = state;

  dispatch(updateUserFailure(error));

  if (account.id === userId) {
    dispatch(updateAccountFailure(error));
  }

  return Promise.reject(error);
};

/**
 *  Update user action creator
 *  */
export const updateUser = (userId, updates) => (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  const { account } = state.account;

  dispatch(updateUserStart(userId, updates));

  if (account.id === userId) {
    dispatch(updateAccountStart(userId, updates));
  }

  return update(token, userId, updates)
    .then(handleUpdateUserSuccess(dispatch))
    .catch(handleUpdateUserFailure(dispatch));
};
