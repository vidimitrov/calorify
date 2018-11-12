import {
  STORE_ACCOUNT_DATA,
  UPDATE_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_SUCCESS,
} from '../constants/actionTypes';

/**
 * Store account data
 */
export const storeAccountData = data => ({
  type: STORE_ACCOUNT_DATA,
  payload: data,
});

/**
 *  Update account actions
 *  */
export const updateAccountStart = (userId, updates) => ({
  type: UPDATE_ACCOUNT_START,
  payload: { userId, updates },
});

export const updateAccountSuccess = user => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  payload: { user },
});

export const updateAccountFailure = error => ({
  type: UPDATE_ACCOUNT_FAILURE,
  payload: { error },
});
