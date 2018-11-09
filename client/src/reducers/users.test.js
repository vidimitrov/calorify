import reducer from './user';
import {
  STORE_USER_DATA,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../constants/actionTypes';

let initialState = {};

describe('Users reducers', () => {
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

  it('should handle STORE_USER_DATA action', () => {
    const user = {
      name: 'John Doe',
      email: 'john@email.com',
    };
    const action = {
      type: STORE_USER_DATA,
      payload: user,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      data: user,
    });
  });

  it('should handle UPDATE_USER_START action', () => {
    const updates = {
      name: 'John Doe Passos',
    };
    const action = {
      type: UPDATE_USER_START,
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

  it('should handle UPDATE_USER_SUCCESS action', () => {
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
      type: UPDATE_USER_SUCCESS,
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

  it('should handle UPDATE_USER_FAILURE action', () => {
    const error = {
      success: false,
      statusCode: 400,
      message: 'Bad request',
    };
    const action = {
      type: UPDATE_USER_FAILURE,
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
