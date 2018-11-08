import Koa from 'koa';
import Meal, { MealType } from '../../models/meal/Meal';
import { MEAL, READ_OWN } from '../../constants/ac';
import respondWith from '../../lib/respondWith';
import guard from '../../lib/guard';

const list = async (ctx: Koa.Context) => {
  const ROLE = ctx.state && ctx.state.user ? ctx.state.user.role : null;
  const allowed = await guard.checkPermissions(ROLE, READ_OWN, MEAL);

  if (!allowed) return respondWith.forbidden(ctx);

  const userId = ctx.state.user.id;
  let meals: MealType[];

  try {
    meals = await Meal.findAll({
      user_id: userId,
      deleted: false,
    });
  } catch (err) {
    return respondWith.error(ctx, err);
  }

  return respondWith.success(ctx, { meals });
};

export default list;
