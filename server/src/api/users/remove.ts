import Koa from 'koa';
import User from '../../models/user/User';
import { USER, DELETE_ANY } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const remove = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard().checkPermissions(ROLE, DELETE_ANY, USER);
  const userId: string = ctx.params.id;

  if (!allowed) {
    return respondWith.forbidden(ctx);
  }

  if (!userId) {
    return respondWith.badRequest(ctx);
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return respondWith.badRequest(ctx);
    }

    const criteria = { id: userId };
    await User.update(criteria, { deleted: true });
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  const user = await User.findById(userId);
  return respondWith.success(ctx, { user });
};

export default remove;
