import passportJWT from 'passport-jwt';
import User from '../../../src/models/user/User';
import { API_SECRET } from '../../../config';

const jwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;
const strategy = new jwtStrategy(
  {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: API_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.find({ id: jwtPayload.id });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
);

export default strategy;
