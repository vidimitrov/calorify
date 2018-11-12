import {
  create,
  list,
  update,
  remove,
} from '../api/users';
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
 *  Create user actions
 *  */
export const createUserStart = user => ({
  type: CREATE_USER_START,
  payload: { user },
});

export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  payload: { user },
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: { error },
});

/**
 * Create user action response handlers
 *  */
const handleCreateUserSuccess = dispatch => (response) => {
  const { user } = response;
  dispatch(createUserSuccess(user));
  return Promise.resolve(user);
};
const handleCreateUserFailure = dispatch => (error) => {
  dispatch(createUserFailure(error));
  return Promise.reject(error);
};

/**
 *  Create user action creator
 *  */
export const createUser = user => (dispatch, getState) => {
  dispatch(createUserStart(user));
  const state = getState();
  const { token } = state.auth;

  return create(token, user)
    .then(handleCreateUserSuccess(dispatch))
    .catch(handleCreateUserFailure(dispatch));
};

/**
 *  Fetch users actions
 *  */
export const fetchUsersStart = () => ({
  type: FETCH_USERS_START,
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users },
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error },
});

/**
 * Fetch users action response handlers
 *  */
const handleFetchUsersSuccess = dispatch => (response) => {
  const { users } = response;
  dispatch(fetchUsersSuccess(users));
  return Promise.resolve(users);
};
const handleFetchUsersFailure = dispatch => (error) => {
  dispatch(fetchUsersFailure(error));
  return Promise.reject(error);
};

/**
 *  Fetch users action creator
 *  */
export const fetchUsers = () => (dispatch, getState) => {
  dispatch(fetchUsersStart());
  const state = getState();
  const { token } = state.auth;

  return list(token)
    .then(handleFetchUsersSuccess(dispatch))
    .catch(handleFetchUsersFailure(dispatch));
};

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
const handleUpdateUserSuccess = (dispatch, state) => (response) => {
  const { account } = state;
  const { user } = response;

  dispatch(updateUserSuccess(user));

  if (account.data.id === user.id) {
    dispatch(updateAccountSuccess(user));
  }

  return Promise.resolve(user);
};
const handleUpdateUserFailure = (dispatch, state) => (error, userId) => {
  const { account } = state;

  dispatch(updateUserFailure(error));

  if (account.data && userId && account.data.id === userId) {
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
  const { account } = state;

  dispatch(updateUserStart(userId, updates));

  if (account.data.id === userId) {
    dispatch(updateAccountStart(userId, updates));
  }

  return update(token, userId, updates)
    .then(handleUpdateUserSuccess(dispatch, state))
    .catch(handleUpdateUserFailure(dispatch, state));
};

/**
 *  Remove user actions
 *  */
export const removeUserStart = userId => ({
  type: REMOVE_USER_START,
  payload: { userId },
});

export const removeUserSuccess = user => ({
  type: REMOVE_USER_SUCCESS,
  payload: { user },
});

export const removeUserFailure = error => ({
  type: REMOVE_USER_FAILURE,
  payload: { error },
});

/**
 * Remove user action response handlers
 *  */
const handleRemoveUserSuccess = dispatch => (response) => {
  const { user } = response;
  dispatch(removeUserSuccess(user));
  return Promise.resolve(user);
};
const handleRemoveUserFailure = dispatch => (error) => {
  dispatch(removeUserFailure(error));
  return Promise.reject(error);
};

/**
 *  Remove user action creator
 *  */
export const removeUser = userId => (dispatch, getState) => {
  dispatch(removeUserStart(userId));
  const state = getState();
  const { token } = state.auth;

  return remove(token, userId)
    .then(handleRemoveUserSuccess(dispatch))
    .catch(handleRemoveUserFailure(dispatch));
};
