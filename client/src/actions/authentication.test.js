import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  logoutSuccess,
  logoutFailure,
  resetErrors,
  login,
  signup,
  logout,
} from './authentication';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RESET_AUTH_ERRORS,
  STORE_USER_DATA,
} from '../constants/actionTypes';
import cfg from '../../config';

const { API_URL } = cfg;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication actions', () => {
  const ERROR = {
    success: false,
    statusCode: 400,
    message: 'Bad request',
  };

  describe('actions creators', () => {
    it('loginSuccess action should return the right payload', () => {
      const data = {
        token: 'some-token',
      };
      expect(loginSuccess(data.token)).toEqual({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    });

    it('loginFailure action should return the right payload', () => {
      expect(loginFailure(ERROR)).toEqual({
        type: LOGIN_FAILURE,
        payload: {
          error: ERROR,
        },
      });
    });

    it('signupSuccess action should return the right payload', () => {
      expect(signupSuccess()).toEqual({
        type: SIGNUP_SUCCESS,
      });
    });

    it('signupFailure action should return the right payload', () => {
      expect(signupFailure(ERROR)).toEqual({
        type: SIGNUP_FAILURE,
        payload: {
          error: ERROR,
        },
      });
    });

    it('logoutSuccess action should return the right payload', () => {
      expect(logoutSuccess()).toEqual({
        type: LOGOUT_SUCCESS,
      });
    });

    it('logoutFailure action should return the right payload', () => {
      expect(logoutFailure(ERROR)).toEqual({
        type: LOGOUT_FAILURE,
        payload: {
          error: ERROR,
        },
      });
    });

    it('resetErrors action should return the right payload', () => {
      expect(resetErrors()).toEqual({
        type: RESET_AUTH_ERRORS,
      });
    });
  });

  describe('async action creators', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('login action creator should create LOGIN_SUCCESS and STORE_USER_DATA actions on successful API request', () => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john@email.com',
        daily_calories_limit: 2200,
      };
      const token = jwt.sign(user, 'some-secret');

      fetchMock.post(`${API_URL}/api/auth/login`, {
        body: {
          success: true,
          token,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: LOGIN_SUCCESS, payload: { token } },
        {
          type: STORE_USER_DATA,
          payload: {
            id: user.id,
            dailyCaloriesLimit: user.daily_calories_limit,
            email: user.email,
            name: user.name,
            role: undefined,
            deleted: undefined,
            createdAt: undefined,
            updatedAt: undefined,
          },
        },
      ];
      const store = mockStore({
        user: {},
        auth: {},
      });

      return store.dispatch(login('john@email.com', 'secret123'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('login action creator should create LOGIN_FAILURE action on failed API request', () => {
      fetchMock.post(`${API_URL}/api/auth/login`, {
        body: ERROR,
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        {
          type: LOGIN_FAILURE,
          payload: {
            error: ERROR,
          },
        },
      ];

      const store = mockStore({
        user: {},
        auth: {},
      });


      return store.dispatch(login('john@email.com', 'secret123'))
        .then(() => { })
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('signup action creator should create SIGNUP_SUCCESS, LOGIN_SUCCESS and STORE_USER_DATA actions on successful API request', () => {
      const user = {
        id: '8e99bfec-8131-44ab-b7e1-2b2c87206e8d',
        name: 'John Doe',
        email: 'john@email.com',
        role: 'user',
        deleted: false,
        daily_calories_limit: 0,
        created_at: '2018-11-09T22:15:13.272Z',
        updated_at: '2018-11-09T22:15:13.272Z',
      };
      const token = jwt.sign(user, 'some-secret');

      fetchMock.post(`${API_URL}/api/auth/signup`, {
        body: {
          success: true,
          user,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      fetchMock.post(`${API_URL}/api/auth/login`, {
        body: {
          success: true,
          token,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: SIGNUP_SUCCESS },
        { type: LOGIN_SUCCESS, payload: { token } },
        {
          type: STORE_USER_DATA,
          payload: {
            id: user.id,
            dailyCaloriesLimit: user.daily_calories_limit,
            email: user.email,
            name: user.name,
            role: user.role,
            deleted: user.deleted,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
          },
        },
      ];
      const store = mockStore({
        user: {},
        auth: {},
      });

      return store.dispatch(signup({
        name: 'John Doe',
        email: 'john@email.com',
        password: 'secret123',
      }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('signup action creator should create LOGIN_FAILURE action on failed API request', () => {
      fetchMock.post(`${API_URL}/api/auth/signup`, {
        body: ERROR,
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        {
          type: SIGNUP_FAILURE,
          payload: {
            error: ERROR,
          },
        },
      ];

      const store = mockStore({
        user: {},
        auth: {},
      });


      return store.dispatch(signup('john@email.com', 'secret123'))
        .then(() => { })
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('logout action creator should create LOGOUT_SUCCESS action on successful API request', () => {
      fetchMock.get(`${API_URL}/api/auth/logout`, {
        body: {
          success: true,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: LOGOUT_SUCCESS },
      ];
      const store = mockStore({
        user: {},
        auth: {},
      });

      return store.dispatch(logout())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('logout action creator should create LOGIN_FAILURE action on failed API request', () => {
      fetchMock.get(`${API_URL}/api/auth/logout`, {
        body: ERROR,
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        {
          type: LOGOUT_FAILURE,
          payload: {
            error: ERROR,
          },
        },
      ];

      const store = mockStore({
        user: {},
        auth: {},
      });

      return store.dispatch(logout('john@email.com', 'secret123'))
        .then(() => { })
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
