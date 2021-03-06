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
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
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
  .use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
        connectSrc: ["'self'", 'ws://localhost:53972', 'http://localhost:3000'],
      },
    },
  }))
  .use(cors({
    credentials: true,
    methods: 'GET,POST,DELETE,PATCH',
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods());

// Configure Passport
import '../config/passport';

// Configure access control
import { init as initAccessControl } from '../config/access-control/ac';
initAccessControl();

export default app;
