// Reducers
import auth from './authentication';
import users from './users';
import meals from './meals';

// Combine them all and return them as a single reducer
export {
  auth,
  users,
  meals,
};
