import {
  create,
  list,
  update,
  remove,
} from '../api/meals';
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
} from '../constants/actionTypes';

/**
 *  Create meal actions
 *  */
export const createMealStart = () => ({
  type: CREATE_MEAL_START,
});

export const createMealSuccess = meal => ({
  type: CREATE_MEAL_SUCCESS,
  payload: { meal },
});

export const createMealFailure = error => ({
  type: CREATE_MEAL_FAILURE,
  payload: { error },
});

/**
 * Create meal action response handlers
 *  */
const handleCreateMealSuccess = dispatch => (response) => {
  const { meal } = response;
  dispatch(createMealSuccess(meal));
  return Promise.resolve(meal);
};
const handleCreateMealFailure = dispatch => (error) => {
  dispatch(createMealFailure(error));
  return Promise.reject(error);
};

/**
 *  Create meal action creator
 *  */
export const createMeal = meal => (dispatch) => {
  dispatch(createMealStart());

  return create(meal)
    .then(handleCreateMealSuccess(dispatch))
    .catch(handleCreateMealFailure(dispatch));
};

/**
 *  Fetch meals actions
 *  */
export const fetchMealsStart = () => ({
  type: FETCH_MEALS_START,
});

export const fetchMealsSuccess = meals => ({
  type: FETCH_MEALS_SUCCESS,
  payload: { meals },
});

export const fetchMealsFailure = error => ({
  type: FETCH_MEALS_FAILURE,
  payload: { error },
});

/**
 * Fetch meals action response handlers
 *  */
const handleFetchMealsSuccess = dispatch => (response) => {
  const { meals } = response;
  dispatch(fetchMealsSuccess(meals));
  return Promise.resolve(meals);
};
const handleFetchMealsFailure = dispatch => (error) => {
  dispatch(fetchMealsFailure(error));
  return Promise.reject(error);
};

/**
 *  Fetch meals action creator
 *  */
export const fetchMeals = () => (dispatch) => {
  dispatch(fetchMealsStart());

  return list()
    .then(handleFetchMealsSuccess(dispatch))
    .catch(handleFetchMealsFailure(dispatch));
};

/**
 *  Update meal actions
 *  */
export const updateMealStart = mealId => ({
  type: UPDATE_MEAL_START,
  payload: { mealId },
});

export const updateMealSuccess = meal => ({
  type: UPDATE_MEAL_SUCCESS,
  payload: { meal },
});

export const updateMealFailure = error => ({
  type: UPDATE_MEAL_FAILURE,
  payload: { error },
});

/**
 * Update meal action response handlers
 *  */
const handleUpdateMealSuccess = dispatch => (response) => {
  const { meal } = response;
  dispatch(updateMealSuccess(meal));
  return Promise.resolve(meal);
};
const handleUpdateMealFailure = dispatch => (error) => {
  dispatch(updateMealFailure(error));
  return Promise.reject(error);
};

/**
 *  Update meal action creator
 *  */
export const updateMeal = (mealId, updates) => (dispatch) => {
  dispatch(updateMealStart());

  return update(mealId, updates)
    .then(handleUpdateMealSuccess(dispatch))
    .catch(handleUpdateMealFailure(dispatch));
};

/**
 *  Remove meal actions
 *  */
export const removeMealStart = mealId => ({
  type: REMOVE_MEAL_START,
  payload: { mealId },
});

export const removeMealSuccess = meal => ({
  type: REMOVE_MEAL_SUCCESS,
  payload: { meal },
});

export const removeMealFailure = error => ({
  type: REMOVE_MEAL_FAILURE,
  payload: { error },
});

/**
 * Remove meal action response handlers
 *  */
const handleRemoveMealSuccess = dispatch => (response) => {
  const { meal } = response;
  dispatch(removeMealSuccess(meal));
  return Promise.resolve(meal);
};
const handleRemoveMealFailure = dispatch => (error) => {
  dispatch(removeMealFailure(error));
  return Promise.reject(error);
};

/**
 *  Remove meal action creator
 *  */
export const removeMeal = mealId => (dispatch) => {
  dispatch(removeMealStart());

  return remove(mealId)
    .then(handleRemoveMealSuccess(dispatch))
    .catch(handleRemoveMealFailure(dispatch));
};
