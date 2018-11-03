import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import session from 'koa-session';
import bodyparser from 'koa-bodyparser';
import passport from 'koa-passport';
import router from './router';

import {
  API_SECRET,
} from '../config';

const SESSION_CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

const app = new Koa();

// Trust proxy
app.proxy = true;
// Sessions
app.keys = [API_SECRET];

// Configure the Koa application
app
  .use(session(SESSION_CONFIG, app))
  .use(bodyparser())
  .use(cors({ credentials: true, methods: 'GET,HEAD,PUT,POST,DELETE,PATCH' }))
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(helmet());

// Configure Passport
console.log('Configuring Passport authentication strategies...');
import '../config/passport';

export default app;