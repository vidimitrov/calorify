import reducer from './authentication';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RESET_AUTH_ERRORS,
} from '../constants/actionTypes';

let initialState = {};

describe('Authentication reducers', () => {
  beforeEach(() => {
    initialState = {
      token: null,
      error: null,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_SUCCESS action', () => {
    const token = 'fb18d4ff-25ae-4bd1-9ec3-4c6a5e236ef4';
    const action = {
      type: LOGIN_SUCCESS,
      payload: {
        token,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      token,
    });
  });

  it('should handle LOGIN_FAILURE action', () => {
    const error = {
      success: false,
      statusCode: 400,
      message: 'Bad request',
    };
    const action = {
      type: LOGIN_FAILURE,
      payload: {
        error,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error,
    });
  });

  it('should handle SIGNUP_SUCCESS action', () => {
    const action = {
      type: SIGNUP_SUCCESS,
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it('should handle SIGNUP_FAILURE action', () => {
    const error = {
      success: false,
      statusCode: 400,
      message: 'Bad request',
    };
    const action = {
      type: SIGNUP_FAILURE,
      payload: {
        error,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error,
    });
  });

  it('should handle LOGOUT_SUCCESS action', () => {
    const token = 'fb18d4ff-25ae-4bd1-9ec3-4c6a5e236ef4';
    const state = {
      ...initialState,
      token,
    };
    const action = {
      type: LOGOUT_SUCCESS,
    };

    expect(reducer(state, action)).toEqual(initialState);
  });

  it('should handle LOGOUT_FAILURE action', () => {
    const error = {
      success: false,
      statusCode: 400,
      message: 'Bad request',
    };
    const action = {
      type: LOGOUT_FAILURE,
      payload: {
        error,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error,
    });
  });

  it('should handle RESET_AUTH_ERRORS action', () => {
    const token = 'fb18d4ff-25ae-4bd1-9ec3-4c6a5e236ef4';
    const error = {
      success: false,
      statusCode: 400,
      message: 'Bad request',
    };
    const state = {
      token,
      error,
    };
    const action = {
      type: RESET_AUTH_ERRORS,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      error: null,
    });
  });
});
