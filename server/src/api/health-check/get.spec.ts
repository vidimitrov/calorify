import request from 'supertest';
import app from '../../app';
import get from './get';
import { ENV } from '../../../config';

describe('Health check endpoint', () => {
  it('get middleware should attach status code 200 to ctx', async () => {
    const ctx: any = {};
    await get(ctx);
    expect(ctx.status).toBe(200);
  });

  it('get middleware should attach proper body to ctx', async () => {
    const ctx: any = {};
    await get(ctx);
    expect(ctx.body).toBe(`Calorify API is up and running in ${ENV} environment...`);
  });

  it('GET / should return healthy response', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.body).toEqual({});
    expect(response.type).toEqual('text/plain');
    expect(response.status).toBe(200);
    expect(response.text).toBe(`Calorify API is up and running in ${ENV} environment...`);
  });
});
