// Reducers
import auth from './authentication';
import user from './user';
import meals from './meals';

// Combine them all and return them as a single reducer
export {
  auth,
  user,
  meals,
};
