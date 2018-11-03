import Koa from 'koa';

const respondWith = (() => {
  return {
    success: async (ctx: Koa.Context, body?: any) => {
      ctx.status = 200;
      ctx.body = {
        success: true,
        ...body,
      };
    },
    badRequest: async (ctx: Koa.Context, message?: string) => {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: message || 'Bad request data',
      };
    },
    notAuthorized: async (ctx: Koa.Context, message?: string) => {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: message || 'Protected resource! Authenticate to access it',
      };
    },
    forbidden: (ctx: Koa.Context, message?: string) => {
      ctx.status = 403;
      ctx.body = {
        success: false,
        message: message || 'Permission required',
      };
    },

    error: async (ctx: Koa.Context, body?: any) => {
      console.error(body);
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Internal server error',
        ...body,
      };
    },
    custom: async (ctx: Koa.Context, status: number, body: any) => {
      ctx.status = status;
      ctx.body = {
        ...body,
      };
    },
  };
})();

export default respondWith;
