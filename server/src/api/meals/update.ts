import Koa from 'koa';
import Meal, { MealType, schema } from '../../models/meal/Meal';
import { MEAL, UPDATE_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const update = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, UPDATE_OWN, MEAL);
  const mealId: string = ctx.params.id;
  const attrs: MealType = (ctx.request.body as any).attrs;

  if (!allowed) {
    return respondWith.forbidden(ctx);
  }

  if (!mealId) {
    return respondWith.badRequest(ctx);
  }

  if (!schema.isValid('update', attrs)) {
    return respondWith.badRequest(ctx);
  }

  try {
    const meal = await Meal.findById(mealId);

    if (meal.user_id !== ctx.state.user.id && ROLE === 'user') {
      return respondWith.forbidden(ctx);
    }

    const criteria = { id: mealId };
    await Meal.update(criteria, attrs);
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  const meal = await Meal.findById(mealId);
  return respondWith.success(ctx, { meal });
};

export default update;
