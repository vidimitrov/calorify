import Koa from 'koa';
import Meal from '../../models/meal/Meal';
import { MEAL, DELETE_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const remove = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, DELETE_OWN, MEAL);

  if (!allowed) return respondWith.forbidden(ctx);

  const mealId: string = ctx.params.id;

  try {
    const criteria = { id: mealId };
    await Meal.update(criteria, { deleted: true });
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  const meal = await Meal.findById(mealId);
  return respondWith.success(ctx, { meal });
};

export default remove;
