import Koa from 'koa';
import Meal, { MealType } from '../../models/meal/Meal';
import { MEAL, READ_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const findById = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard().checkPermissions(ROLE, READ_OWN, MEAL);
  const mealId: string = ctx.params.id;
  let meal: MealType;

  if (!allowed) {
    return respondWith.forbidden(ctx);
  }

  if (!mealId) {
    return respondWith.badRequest(ctx);
  }

  try {
    meal = await Meal.findById(mealId);

    if (meal.user_id !== ctx.state.user.id && ROLE !== 'admin') {
      return respondWith.forbidden(ctx);
    }
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  return respondWith.success(ctx, { meal });
};

export default findById;
