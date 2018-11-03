import Koa from 'koa';
import { ENV } from '../../../config';

const get = (ctx: Koa.Context): void => {
  ctx.body = `Calorify API is up and running in ${ENV} environment...`;
  ctx.status = 200;
};

export default get;
