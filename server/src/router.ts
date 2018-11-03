import Router from 'koa-router';
import api from './api';

const router = new Router();

// Health check
router.get('/', api.status.get);

// Authentication
router.post('/api/auth/login', api.auth.login);
router.post('/api/auth/signup', api.auth.signup);
router.get('/api/auth/logout', api.auth.logout);

export default router;
