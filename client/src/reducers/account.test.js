import reducer from './account';
import {
  STORE_ACCOUNT_DATA,
  UPDATE_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_SUCCESS,
} from '../constants/actionTypes';

let initialState = {};

describe('Account reducers', () => {
  beforeEach(() => {
    initialState = {
      data: {},
      loading: false,
      error: null,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle STORE_ACCOUNT_DATA action', () => {
    const user = {
      name: 'John Doe',
      email: 'john@email.com',
    };
    const action = {
      type: STORE_ACCOUNT_DATA,
      payload: user,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      data: user,
    });
  });

  it('should handle UPDATE_ACCOUNT_START action', () => {
    const updates = {
      name: 'John Doe Passos',
    };
    const action = {
      type: UPDATE_ACCOUNT_START,
      payload: {
        userId: 'some-fake-id',
        updates,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle UPDATE_ACCOUNT_SUCCESS action', () => {
    const state = {
      ...initialState,
      data: {
        name: 'John Doe',
      },
    };
    const updatedUser = {
      name: 'John Doe Passos',
    };
    const action = {
      type: UPDATE_ACCOUNT_SUCCESS,
      payload: {
        user: updatedUser,
      },
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      data: {
        name: updatedUser.name,
      },
    });
  });

  it('should handle UPDATE_ACCOUNT_FAILURE action', () => {
    const error = {
      success: false,
      statusCode: 400,
      message: 'Bad request',
    };
    const action = {
      type: UPDATE_ACCOUNT_FAILURE,
      payload: {
        error,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error,
    });
  });
});
