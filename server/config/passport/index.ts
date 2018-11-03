import passport from 'koa-passport';
import local from './strategies/local';
import jwt from './strategies/jwt';
import User from '../../src/models/user/User';

interface UserType {
  id: string;
};

passport.serializeUser((user: UserType, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(local);
passport.use(jwt);
