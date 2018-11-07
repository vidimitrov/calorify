import Koa from 'koa';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import { omit } from 'lodash';
import { API_SECRET } from '../../../config';
import respondWith from '../../lib/respondWith';

const login = (ctx: Koa.Context, next): void => {
  const done = async (err, user) => {
    if (err) {
      return respondWith.error(ctx, err);
    }

    if (!user) {
      return respondWith.badRequest(ctx, 'Wrong credentials');
    }

    await ctx.login(user, { session: false });
    const responseUser = omit(user, 'password');
    const token = jwt.sign(responseUser, API_SECRET);

    return respondWith.success(ctx, {
      token,
      user: responseUser,
    });
  };

  return passport.authenticate('local', { session: false }, done)(ctx, null);
};

export default login;
