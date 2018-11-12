import Koa from 'koa';
import { isEmpty, omit } from 'lodash';
import User, { UserType, schema } from '../../models/user/User';
import { USER, CREATE_ANY } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const create = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard().checkPermissions(ROLE, CREATE_ANY, USER);
  const attrs: UserType = (ctx.request.body as any).attrs;
  let user: UserType;

  if (!allowed) {
    return respondWith.forbidden(ctx);
  }

  if (!schema.isValid('create', attrs)) {
    return respondWith.badRequest(ctx);
  }

  try {
    user = await User.find(omit(attrs, ['password']));
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  if (user && !isEmpty(user)) {
    return respondWith.forbidden(ctx, 'User already exist');
  }

  try {
    user = await User.create(attrs);
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  return respondWith.success(ctx, { user }, 201);
};

export default create;
