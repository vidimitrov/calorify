import Koa from 'koa';
import passport from 'passport';

/**
 * A middleware to check for valid JWT when authentication is required
 * for a specific route
 *
 * @param {Koa.Context} ctx - the context object of Koa
 * @param {Koa.Middleware} next - the action being executed on the resource
 *
 * @returns {Koa.Middleware}
 */
const protect: Koa.Middleware = async (ctx: Koa.Context, next: any) => {
  return passport.authenticate('jwt', { session: false })(ctx, next);
};

export default protect;
