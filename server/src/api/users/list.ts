import Koa from 'koa';
import User, { UserType } from '../../models/user/User';
import { USER, READ_ANY } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const list = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, READ_ANY, USER);

  if (!allowed) return respondWith.forbidden(ctx);

  let users: UserType[];

  try {
    users = await User.findAll({
      deleted: false,
    });
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  return respondWith.success(ctx, { users });
};

export default list;
