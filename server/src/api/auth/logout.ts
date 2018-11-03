import Koa from 'koa';
import respondWith from '../../lib/respondWith';

const logout = async (ctx: Koa.Context) => {
  ctx.logout();
  return respondWith.success(ctx);
};

export default logout;
