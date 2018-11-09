import reducer from './meals';
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

const ERROR = {
  success: false,
  statusCode: 400,
  message: 'Bad request',
};

let initialState = {};

describe('Meals reducers', () => {
  beforeEach(() => {
    initialState = {
      data: [],
      filteredData: [],
      loading: false,
      error: null,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_MEALS_START action', () => {
    const action = {
      type: FETCH_MEALS_START,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle FETCH_MEALS_SUCCESS action', () => {
    const meals = [{
      id: 1,
      name: 'Chicken with rice',
    }, {
      id: 2,
      name: 'Pork with cabbage',
    }];
    const action = {
      type: FETCH_MEALS_SUCCESS,
      payload: { meals },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      data: meals,
      filteredData: meals,
    });
  });

  it('should handle FETCH_MEALS_FAILURE action', () => {
    const action = {
      type: FETCH_MEALS_FAILURE,
      payload: {
        error: ERROR,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: ERROR,
    });
  });

  it('should handle CREATE_MEAL_START action', () => {
    const action = {
      type: CREATE_MEAL_START,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle CREATE_MEAL_SUCCESS action', () => {
    const meal = {
      id: 1,
      name: 'Chicken with rice',
    };
    const action = {
      type: CREATE_MEAL_SUCCESS,
      payload: { meal },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      data: [meal],
    });
  });

  it('should handle CREATE_MEAL_FAILURE action', () => {
    const action = {
      type: CREATE_MEAL_FAILURE,
      payload: {
        error: ERROR,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: ERROR,
    });
  });

  it('should handle UPDATE_MEAL_START action', () => {
    const updates = {
      name: 'Rice with chicken',
    };
    const action = {
      type: UPDATE_MEAL_START,
      payload: {
        mealId: 'some-fake-id',
        updates,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle UPDATE_MEAL_SUCCESS action', () => {
    const meal = {
      id: 'some-fake-id',
      name: 'Chicken',
    };
    const updates = {
      name: 'Chicken with rice',
    };
    const state = {
      ...initialState,
      data: [meal],
    };
    const action = {
      type: UPDATE_MEAL_SUCCESS,
      payload: {
        meal: {
          ...meal,
          name: updates.name,
        },
      },
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      data: [{
        ...meal,
        name: updates.name,
      }],
    });
  });

  it('should handle UPDATE_MEAL_FAILURE action', () => {
    const action = {
      type: UPDATE_MEAL_FAILURE,
      payload: {
        error: ERROR,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: ERROR,
    });
  });

  it('should handle REMOVE_MEAL_START action', () => {
    const id = 'some-id';
    const action = {
      type: REMOVE_MEAL_START,
      payload: {
        mealId: id,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
      mealId: id,
    });
  });

  it('should handle REMOVE_MEAL_SUCCESS action', () => {
    const id = 1;
    const state = {
      ...initialState,
      data: [{
        id,
        name: 'Chicken with rice',
      }],
    };
    const action = {
      type: REMOVE_MEAL_SUCCESS,
      payload: {
        meal: { id },
      },
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      data: [],
    });
  });

  it('should handle REMOVE_MEAL_FAILURE action', () => {
    const action = {
      type: REMOVE_MEAL_FAILURE,
      payload: {
        error: ERROR,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: ERROR,
    });
  });

  it('should handle FILTER_MEALS action', () => {
    const state = {
      ...initialState,
      data: [{
        id: 1,
        date: '2018-11-09',
        time: '14:35:00',
      }, {
        id: 2,
        date: '2018-11-05',
        time: '13:35:00',
      }, {
        id: 3,
        date: '2018-11-10',
        time: '16:35:00',
      }, {
        id: 4,
        date: '2018-11-10',
        time: '16:00:00',
      }, {
        id: 5,
        date: '2018-11-12',
        time: '16:00:00',
      }],
    };
    const action = {
      type: FILTER_MEALS,
      payload: {
        filters: {
          dateFrom: '2018-11-09',
          dateTo: '2018-11-11',
          timeFrom: '14:00',
          timeTo: '16:30',
        },
      },
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      filteredData: [{
        id: 1,
        date: '2018-11-09',
        time: '14:35:00',
      }, {
        id: 4,
        date: '2018-11-10',
        time: '16:00:00',
      }],
    });
  });
});
