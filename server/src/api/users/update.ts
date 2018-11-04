import Koa from 'koa';
import User, { UserType } from '../../models/user/User';
import { USER, UPDATE_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const update = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, UPDATE_OWN, USER);

  if (!allowed) return respondWith.forbidden(ctx);

  const userId: string = ctx.params.userId;
  const attrs: UserType = (ctx.request.body as any).attrs;

  try {
    const criteria = { id: userId };
    await User.update(criteria, attrs);
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  const user = await User.findById(userId);
  return respondWith.success(ctx, { user });
};

export default update;
