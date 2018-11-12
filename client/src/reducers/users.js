import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  REMOVE_USER_START,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS: {
      const updatedUser = action.payload.user;
      const indexOfExistingUser = state.data.findIndex(
        user => user.id === updatedUser.id,
      );
      const dataWithUpdatedUser = Object.assign([], state.data);
      dataWithUpdatedUser.splice(indexOfExistingUser, 1, updatedUser);

      return {
        ...state,
        data: dataWithUpdatedUser,
        loading: false,
      };
    }
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
