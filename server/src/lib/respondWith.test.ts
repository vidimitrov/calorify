import respondWith from './respondWith';

describe('respondWith lib', () => {
  let ctx;

  beforeEach(() => {
    ctx = {};
  });

  it('should return proper payload on respondWith.success()', async () => {
    const body = {
      attrs: {
        someKey: 'someValue',
      },
    };
    await respondWith.success(ctx, body);

    expect(ctx).toEqual({
      status: 200,
      body: {
        success: true,
        statusCode: 200,
        ...body,
      },
    });
  });

  it('should return proper payload on respondWith.badRequest()', async () => {
    const message = 'Bad request';
    await respondWith.badRequest(ctx, message);

    expect(ctx).toEqual({
      status: 400,
      body: {
        message,
        success: false,
        statusCode: 400,
      },
    });
  });

  it('should return proper payload on respondWith.notAuthorized()', async () => {
    const message = 'Protected resource!';
    await respondWith.notAuthorized(ctx, message);

    expect(ctx).toEqual({
      status: 401,
      body: {
        message,
        success: false,
        statusCode: 401,
      },
    });
  });

  it('should return proper payload on respondWith.forbidden()', async () => {
    const message = 'Forbidden';
    await respondWith.forbidden(ctx, message);

    expect(ctx).toEqual({
      status: 403,
      body: {
        message,
        success: false,
        statusCode: 403,
      },
    });
  });

  it('should return proper payload on respondWith.error()', async () => {
    const body = { info: 'more error info' };
    await respondWith.error(ctx, body);

    expect(ctx).toEqual({
      status: 500,
      body: {
        ...body,
        success: false,
        statusCode: 500,
        message: 'Internal server error',
      },
    });
  });

  it('should return proper payload on respondWith.custom()', async () => {
    const body = { message: 'Not modified' };
    const status = 304;
    await respondWith.custom(ctx, status, body);

    expect(ctx).toEqual({
      status,
      body: {
        ...body,
      },
    });
  });
});
