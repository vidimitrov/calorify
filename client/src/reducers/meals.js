import moment from 'moment';
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
  RESET_MEALS_FILTERS,
} from '../constants/actionTypes';

const initialState = {
  data: [],
  filteredData: [],
  loading: false,
  error: null,
};

export default function meals(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEALS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MEALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.meals,
        filteredData: action.payload.meals,
      };
    case FETCH_MEALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
      };
    case CREATE_MEAL_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_MEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [
          ...state.data,
          action.payload.meal,
        ],
      };
    case CREATE_MEAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_MEAL_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_MEAL_SUCCESS: {
      const updatedMeal = action.payload.meal;
      const indexOfExistingMeal = state.data.findIndex(
        meal => meal.id === updatedMeal.id,
      );
      const dataWithUpdatedMeal = Object.assign([], state.data);
      dataWithUpdatedMeal.splice(indexOfExistingMeal, 1, updatedMeal);

      return {
        ...state,
        data: dataWithUpdatedMeal,
        loading: false,
      };
    }
    case UPDATE_MEAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case REMOVE_MEAL_START:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_MEAL_SUCCESS: {
      const indexOfExistingMeal = state.data.findIndex(
        meal => meal.id === action.payload.meal.id,
      );
      const dataWithRemovedMeal = Object.assign([], state.data);
      dataWithRemovedMeal.splice(
        indexOfExistingMeal,
        1,
      );

      return {
        ...state,
        data: dataWithRemovedMeal,
        loading: false,
      };
    }
    case REMOVE_MEAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case FILTER_MEALS: {
      const { filters } = action.payload;
      const filteredData = state.data
        .filter(meal => moment(meal.date).isSameOrAfter(moment(filters.dateFrom))
          && moment(meal.date).isSameOrBefore(moment(filters.dateTo))
          && moment(meal.time, 'h:mma').isSameOrAfter(moment(filters.timeFrom, 'h:mma'))
          && moment(meal.time, 'h:mma').isSameOrBefore(moment(filters.timeTo, 'h:mma')));

      return {
        ...state,
        filteredData,
      };
    }
    case RESET_MEALS_FILTERS:
      return {
        ...state,
        filteredData: state.data,
      };
    default:
      return state;
  }
}
