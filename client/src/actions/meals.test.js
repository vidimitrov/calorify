import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import {
  createMealStart,
  createMealSuccess,
  createMealFailure,
  createMeal,
  fetchMealsStart,
  fetchMealsSuccess,
  fetchMealsFailure,
  fetchMeals,
  updateMealStart,
  updateMealSuccess,
  updateMealFailure,
  updateMeal,
  removeMealStart,
  removeMealSuccess,
  removeMealFailure,
  removeMeal,
  filterMeals,
} from './meals';
import {
  FETCH_MEALS_START,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_FAILURE,
  CREATE_MEAL_START,
  CREATE_MEAL_SUCCESS,
  CREATE_MEAL_FAILURE,
  UPDATE_MEAL_START,
  UPDATE_MEAL_SUCCESS,
  UPDATE_MEAL_FAILURE,
  REMOVE_MEAL_START,
  REMOVE_MEAL_SUCCESS,
  REMOVE_MEAL_FAILURE,
  FILTER_MEALS,
} from '../constants/actionTypes';
import cfg from '../../config';

const { API_URL } = cfg;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Meals actions', () => {
  describe('actions creators', () => {
    it('filterMeals action should return the right payload', () => {
      const data = {
        dateFrom: '2018-10-09',
        timeTo: '14:00:00',
      };
      expect(filterMeals(data)).toEqual({
        type: FILTER_MEALS,
        payload: {
          filters: data,
        },
      });
    });

    it('createMealStart action should return the right payload', () => {
      const meal = {
        name: 'Rice with chicken',
        calories: 200,
      };
      expect(createMealStart(meal)).toEqual({
        type: CREATE_MEAL_START,
        payload: { meal },
      });
    });

    it('createMealSuccess action should return the right payload', () => {
      const meal = {
        name: 'Rice with chicken',
        calories: 200,
      };
      expect(createMealSuccess(meal)).toEqual({
        type: CREATE_MEAL_SUCCESS,
        payload: { meal },
      });
    });

    it('createMealFailure action should return the right payload', () => {
      const error = {
        status: 400,
        message: 'Bad request',
      };
      expect(createMealFailure(error)).toEqual({
        type: CREATE_MEAL_FAILURE,
        payload: { error },
      });
    });

    it('fetchMealsStart action should return the right payload', () => {
      expect(fetchMealsStart()).toEqual({
        type: FETCH_MEALS_START,
      });
    });

    it('fetchMealsSuccess action should return the right payload', () => {
      const meals = [{
        name: 'Rice with chicken',
        calories: 200,
      }];
      expect(fetchMealsSuccess(meals)).toEqual({
        type: FETCH_MEALS_SUCCESS,
        payload: { meals },
      });
    });

    it('fetchMealsFailure action should return the right payload', () => {
      const error = {
        status: 400,
        message: 'Bad request',
      };
      expect(fetchMealsFailure(error)).toEqual({
        type: FETCH_MEALS_FAILURE,
        payload: { error },
      });
    });

    it('updateMealStart action should return the right payload', () => {
      const mealId = 'some-id-123';
      const updates = {
        calories: 2000,
      };
      expect(updateMealStart(mealId, updates)).toEqual({
        type: UPDATE_MEAL_START,
        payload: { mealId, updates },
      });
    });

    it('updateMealSuccess action should return the right payload', () => {
      const meal = {
        name: 'Rice with chicken',
        calories: 200,
      };
      expect(updateMealSuccess(meal)).toEqual({
        type: UPDATE_MEAL_SUCCESS,
        payload: { meal },
      });
    });

    it('updateMealError action should return the right payload', () => {
      const error = {
        status: 400,
        message: 'Bad request',
      };
      expect(updateMealFailure(error)).toEqual({
        type: UPDATE_MEAL_FAILURE,
        payload: { error },
      });
    });

    it('removeMealStart action should return the right payload', () => {
      const mealId = 1;
      expect(removeMealStart(mealId)).toEqual({
        type: REMOVE_MEAL_START,
        payload: { mealId },
      });
    });

    it('removeMealSuccess action should return the right payload', () => {
      const meal = {
        name: 'Rice with chicken',
        calories: 200,
        deleted: true,
      };
      expect(removeMealSuccess(meal)).toEqual({
        type: REMOVE_MEAL_SUCCESS,
        payload: { meal },
      });
    });

    it('removeMealFailure action should return the right payload', () => {
      const error = {
        status: 400,
        message: 'Bad request',
      };
      expect(removeMealFailure(error)).toEqual({
        type: REMOVE_MEAL_FAILURE,
        payload: { error },
      });
    });
  });

  describe('async action creators', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('createMeal action creator should create CREATE_MEAL_START and CREATE_MEAL_SUCCESS actions on successful API request', () => {
      const meal = {
        text: 'Rice',
        number_of_calories: 300,
      };

      fetchMock.post(`${API_URL}/api/meals`, {
        body: {
          success: true,
          meal,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: CREATE_MEAL_START, payload: { meal } },
        {
          type: CREATE_MEAL_SUCCESS,
          payload: {
            meal: {
              id: undefined,
              name: meal.text,
              calories: meal.number_of_calories,
              deleted: undefined,
              createdAt: undefined,
              updatedAt: undefined,
            },
          },
        },
      ];
      const store = mockStore({
        meals: {},
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(createMeal(meal))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('createMeal action creator should create CREATE_MEAL_START and CREATE_MEAL_FAILURE actions on failed API request', () => {
      const meal = {
        text: 'Rice',
        number_of_calories: 300,
      };
      const error = {
        success: false,
        statusCode: 400,
        message: 'Bad Request',
      };

      fetchMock.post(`${API_URL}/api/meals`, {
        body: error,
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: CREATE_MEAL_START, payload: { meal } },
        { type: CREATE_MEAL_FAILURE, payload: { error } },
      ];
      const store = mockStore({
        meals: [],
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(createMeal(meal))
        .then(() => { })
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fetchMeals action creator should create FETCH_MEALS_START and FETCH_MEALS_SUCCESS actions on successful API request', () => {
      const meals = [{
        id: 1,
        text: 'Rice',
        number_of_calories: 300,
        deleted: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      }];

      fetchMock.get(`${API_URL}/api/meals`, {
        body: {
          success: true,
          meals,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: FETCH_MEALS_START },
        {
          type: FETCH_MEALS_SUCCESS,
          payload: {
            meals: meals.map(meal => ({
              id: meal.id,
              name: meal.text,
              calories: meal.number_of_calories,
              deleted: meal.deleted,
              createdAt: meal.createdAt,
              updatedAt: meal.updatedAt,
            })),
          },
        },
      ];
      const store = mockStore({
        meals: {},
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(fetchMeals())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('fetchMeals action creator should create FETCH_MEALS_START and FETCH_MEALS_FAILURE actions on failed API request', () => {
      const error = {
        success: false,
        statusCode: 400,
        message: 'Bad Request',
      };

      fetchMock.get(`${API_URL}/api/meals`, {
        body: error,
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: FETCH_MEALS_START },
        { type: FETCH_MEALS_FAILURE, payload: { error } },
      ];
      const store = mockStore({
        meals: {},
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(fetchMeals())
        .then(() => { })
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('updateMeal action creator should create UPDATE_MEAL_START and UPDATE_MEAL_SUCCESS actions on successful API request', () => {
      const mealId = 'some-fake-id-123';
      const updates = {
        name: 'Rice with rice',
        calories: 300,
      };
      const meal = {
        id: mealId,
        text: 'Rice',
        number_of_calories: 300,
        deleted: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };

      fetchMock.patch(`${API_URL}/api/meals/${mealId}`, {
        body: {
          success: true,
          meal,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: UPDATE_MEAL_START, payload: { mealId, updates } },
        {
          type: UPDATE_MEAL_SUCCESS,
          payload: {
            meal: {
              id: meal.id,
              name: meal.text,
              calories: meal.number_of_calories,
              deleted: meal.deleted,
              createdAt: meal.createdAt,
              updatedAt: meal.updatedAt,
            },
          },
        },
      ];
      const store = mockStore({
        meals: {},
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(updateMeal(mealId, updates))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('updateMeal action creator should create UPDATE_MEAL_START and UPDATE_MEAL_FAILURE actions on failed API request', () => {
      const mealId = 'some-fake-id-123';
      const updates = {
        name: 'Rice with rice',
        calories: 300,
      };
      const error = {
        success: false,
        statusCode: 400,
        message: 'Bad Request',
      };

      fetchMock.patch(`${API_URL}/api/meals/${mealId}`, {
        body: error,
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: UPDATE_MEAL_START, payload: { mealId, updates } },
        { type: UPDATE_MEAL_FAILURE, payload: { error } },
      ];
      const store = mockStore({
        meals: [],
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(updateMeal(mealId, updates))
        .then(() => { })
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('removeMeal action creator should create REMOVE_MEAL_START and REMOVE_MEAL_SUCCESS actions on successful API request', () => {
      const mealId = 'some-fake-id-123';
      const meal = {
        id: mealId,
        text: 'Rice',
        number_of_calories: 300,
        deleted: true,
        createdAt: undefined,
        updatedAt: undefined,
      };

      fetchMock.delete(`${API_URL}/api/meals/${mealId}`, {
        body: {
          success: true,
          meal,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: REMOVE_MEAL_START, payload: { mealId } },
        {
          type: REMOVE_MEAL_SUCCESS,
          payload: {
            meal: {
              id: meal.id,
              name: meal.text,
              calories: meal.number_of_calories,
              deleted: meal.deleted,
              createdAt: meal.createdAt,
              updatedAt: meal.updatedAt,
            },
          },
        },
      ];
      const store = mockStore({
        meals: {},
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(removeMeal(mealId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('removeMeal action creator should create REMOVE_MEAL_START and REMOVE_MEAL_FAILURE actions on failed API request', () => {
      const mealId = 'some-fake-id-123';
      const error = {
        success: false,
        statusCode: 400,
        message: 'Bad Request',
      };

      fetchMock.delete(`${API_URL}/api/meals/${mealId}`, {
        body: error,
        headers: { 'Content-Type': 'application/json' },
      });

      const expectedActions = [
        { type: REMOVE_MEAL_START, payload: { mealId } },
        { type: REMOVE_MEAL_FAILURE, payload: { error } },
      ];
      const store = mockStore({
        meals: [],
        auth: {
          token: 'some-fake-token',
        },
      });

      return store.dispatch(removeMeal(mealId))
        .then(() => { })
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
