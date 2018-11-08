import Koa from 'koa';
import Meal, { MealType, schema } from '../../models/meal/Meal';
import { MEAL, CREATE_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const create = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, CREATE_OWN, MEAL);

  if (!allowed) return respondWith.forbidden(ctx);

  const userId: string = ctx.state.user.id;
  const attrs: MealType = (ctx.request.body as any).attrs;
  let meal: MealType;

  attrs.user_id = userId;

  if (!schema.isValid('create', attrs)) {
    return respondWith.badRequest(ctx);
  }

  try {
    meal = await Meal.create(attrs);
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  return respondWith.success(ctx, { meal });
};

export default create;
