import Koa from 'koa';
import Meal from '../../models/meal/Meal';
import { MEAL, DELETE_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const remove = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard().checkPermissions(ROLE, DELETE_OWN, MEAL);
  const mealId: string = ctx.params.id;

  if (!allowed) {
    return respondWith.forbidden(ctx);
  }

  if (!mealId) {
    return respondWith.badRequest(ctx);
  }

  try {
    const meal = await Meal.findById(mealId);

    if (meal.user_id !== ctx.state.user.id && ROLE !== 'admin') {
      return respondWith.forbidden(ctx);
    }

    const criteria = { id: mealId };
    await Meal.update(criteria, { deleted: true });
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  const meal = await Meal.findById(mealId);
  return respondWith.success(ctx, { meal });
};

export default remove;
