// Reducers
import auth from './authentication';
import account from './account';
import meals from './meals';
import users from './users';

// Combine them all and return them as a single reducer
export {
  auth,
  account,
  meals,
  users,
};
