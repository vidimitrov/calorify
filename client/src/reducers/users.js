import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
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
        u => u.id === updatedUser.id,
      );
      state.data.splice(indexOfExistingUser, 1, updatedUser);

      return {
        ...state,
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
