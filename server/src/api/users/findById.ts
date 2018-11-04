import Koa from 'koa';
import User, { UserType } from '../../models/user/User';
import { USER, READ_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const findById = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, READ_OWN, USER);

  if (!allowed) return respondWith.forbidden(ctx);

  const userId: string = ctx.params.userId;
  let user: UserType;

  try {
    user = await User.findById(userId);
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  return respondWith.success(ctx, { user });
};

export default findById;
