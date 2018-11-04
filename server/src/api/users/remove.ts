import Koa from 'koa';
import User from '../../models/user/User';
import { USER, DELETE_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const remove = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, DELETE_OWN, USER);

  if (!allowed) return respondWith.forbidden(ctx);

  const userId: string = ctx.params.userId;

  try {
    const criteria = { id: userId };
    await User.update(criteria, { deleted: true });
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  const user = await User.findById(userId);
  return respondWith.success(ctx, { user });
};

export default remove;
