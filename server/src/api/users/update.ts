import Koa from 'koa';
import User, { UserType, schema } from '../../models/user/User';
import { USER, UPDATE_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const update = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard().checkPermissions(ROLE, UPDATE_OWN, USER);
  const userId: string = ctx.params.id;
  const attrs: UserType = (ctx.request.body as any).attrs;

  if (!allowed) {
    return respondWith.forbidden(ctx);
  }

  if (ctx.state.user.id !== userId && ROLE === 'user') {
    return respondWith.forbidden(ctx);
  }

  if (!userId) {
    return respondWith.badRequest(ctx);
  }

  if (!schema.isValid('update', attrs)) {
    return respondWith.badRequest(ctx);
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return respondWith.badRequest(ctx);
    }

    const criteria = { id: userId };
    attrs.updated_at = new Date();
    await User.update(criteria, attrs);
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  const user = await User.findById(userId);
  return respondWith.success(ctx, { user });
};

export default update;
