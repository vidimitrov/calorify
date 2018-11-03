import get from './get';
import { ENV } from '../../../config';

describe('Health check endpoint', () => {
  it('GET / should return status code 200', async () => {
    const ctx: any = {};
    await get(ctx);
    expect(ctx.status).toBe(200);
  });

  it('GET / should return proper body', async () => {
    const ctx: any = {};
    await get(ctx);
    expect(ctx.body).toBe(`Calorify API is up and running in ${ENV} environment...`);
  });
});