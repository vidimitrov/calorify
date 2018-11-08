import Koa from 'koa';
import User, { UserType } from '../../models/user/User';
import { USER, READ_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const findById = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, READ_OWN, USER);
  const userId: string = ctx.params.id;
  let user: UserType;

  if (!allowed) {
    return respondWith.forbidden(ctx);
  }

  if (!userId) {
    return respondWith.badRequest(ctx);
  }

  try {
    user = await User.findById(userId);

    if (user.id !== ctx.state.user.id && ROLE === 'user') {
      return respondWith.forbidden(ctx);
    }
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  return respondWith.success(ctx, { user });
};

export default findById;
