import Koa from 'koa';
import Meal, { MealType, schema } from '../../models/meal/Meal';
import { MEAL, CREATE_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const create = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard().checkPermissions(ROLE, CREATE_OWN, MEAL);
  const userId: string = ctx.state.user.id;
  const attrs: MealType = (ctx.request.body as any).attrs;
  let meal: MealType;

  if (!allowed) {
    return respondWith.forbidden(ctx);
  }

  if (attrs.user_id) {
    if (ROLE !== 'admin') {
      return respondWith.forbidden(ctx);
    }
  } else {
    attrs.user_id = userId;
  }

  if (!schema.isValid('create', attrs)) {
    return respondWith.badRequest(ctx);
  }

  if (!attrs.date) {
    const date = new Date();
    attrs.date = date.toISOString().split('T')[0];
  }

  try {
    meal = await Meal.create(attrs);
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  return respondWith.success(ctx, { meal }, 201);
};

export default create;
