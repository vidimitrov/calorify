import { update } from '../api/users';
import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../constants/actionTypes';

/**
 *  Update user actions
 *  */
export const updateUserStart = () => ({
  type: UPDATE_USER_START,
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
export const updateUser = (userId, updates) => (dispatch) => {
  dispatch(updateUserStart());

  return update(userId, updates)
    .then(handleUpdateUserSuccess(dispatch))
    .catch(handleUpdateUserFailure(dispatch));
};
