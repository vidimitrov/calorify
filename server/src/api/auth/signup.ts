import Koa from 'koa';
import { omit, isEmpty } from 'lodash';
import User, { UserType, schema } from '../../models/user/User';
import respondWith from '../../lib/respondWith';
import { isValidEmail } from '../../lib/validations';

const signup = async (ctx: Koa.Context) => {
  const attrs: UserType = (ctx.request.body as any).attrs;
  let user;

  if (isEmpty(attrs) || !isValidEmail(attrs.email)) {
    return respondWith.badRequest(ctx);
  }

  try {
    user = await User.find({ email: attrs.email });
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  if (user) {
    return respondWith.forbidden(ctx, 'User already exist');
  }

  if (!schema.isValid('create', attrs)) {
    return respondWith.badRequest(ctx);
  }

  try {
    user = await User.create(attrs);
    return respondWith.success(ctx, { user: omit(user, ['password', 'provider']) });
  } catch (err) {
    return respondWith.error(ctx, err);
  }
};

export default signup;
