import { Strategy as LocalStrategy } from 'passport-local';
import User, { verifyPassword } from '../../../src/models/user/User';

const opts = { usernameField: 'email' };
const strategy = new LocalStrategy(
  opts,
  async (email: string, password: string, done: any) => {
    const query = { email, provider: 'local' };
    const queryOpts = { omit: false };

    try {
      const user = await User.find(query, queryOpts);
      if (!user) {
        return done(null, false);
      }

      const verified = await verifyPassword(user, password);
      if (!verified) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });

export default strategy;
