import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import {
  storeUserData,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updateUser,
} from './users';
import {
  STORE_USER_DATA,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../constants/actionTypes';
import cfg from '../../config';

const { API_URL } = cfg;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Users actions', () => {
  describe('actions creators', () => {
    it('storeUserData action should return the right payload', () => {
      const data = {
        name: 'John Doe',
        email: 'john@email.com',
      };
      expect(storeUserData(data)).toEqual({
        type: STORE_USER_DATA,
        payload: data,
      });
    });

    it('updateUserStart action should return the right payload', () => {
      const userId = 'some-id-123';
      const updates = {
        dailyCalories: 2000,
      };
      expect(updateUserStart(userId, updates)).toEqual({
        type: UPDATE_USER_START,
        payload: { userId, updates },
      });
    });

    it('updateUserSuccess action should return the right payload', () => {
      const user = {
        name: 'John Doe',
        dailyCalories: 2000,
      };
      expect(updateUserSuccess(user)).toEqual({
        type: UPDATE_USER_SUCCESS,
        payload: { user },
      });
    });

    it('updateUserError action should return the right payload', () => {
      const error = {
        status: 400,
        message: 'Bad request',
      };
      expect(updateUserFailure(error)).toEqual({
        type: UPDATE_USER_FAILURE,
        payload: { error },
      });
    });
  });

  describe('async action creators', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('updateUser action creator should create UPDATE_USER_START and UPDATE_USER_SUCCESS actions on successful API request', () => {
      const userId = 'some-fake-id-123';
      const updates = {
        email: 'john@email.com',
        dailyCaloriesLimit: 2500,
      };
      const user = {
        id: userId,
        role: undefined,
        name: undefined,
        email: 'john@email.com',
        daily_calories_limit: 2500,
        deleted: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };

      fetchMock.patch(`${API_URL}/api/users/${userId}`, {
        body: {
          success: true,
          user,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: UPDATE_USER_START, payload: { userId, updates } },
        {
          type: UPDATE_USER_SUCCESS,
          payload: {
            user: {
              id: user.id,
              role: user.role,
              name: user.name,
              email: user.email,
              dailyCaloriesLimit: user.daily_calories_limit,
              deleted: user.deleted,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
          },
        },
      ];
      const store = mockStore({
        user: {},
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(updateUser(userId, updates))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('updateUser action creator should create UPDATE_USER_START and UPDATE_USER_FAILURE actions on failed API request', () => {
      const userId = 'some-fake-id-123';
      const updates = {
        email: 'john@email.com',
        dailyCaloriesLimit: 2500,
      };
      const error = {
        success: false,
        statusCode: 400,
        message: 'Bad Request',
      };

      fetchMock.patch(`${API_URL}/api/users/${userId}`, {
        body: error,
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: UPDATE_USER_START, payload: { userId, updates } },
        { type: UPDATE_USER_FAILURE, payload: { error } },
      ];
      const store = mockStore({
        user: {},
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(updateUser(userId, updates))
        .then(() => { })
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
