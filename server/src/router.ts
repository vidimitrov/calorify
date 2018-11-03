import Router from 'koa-router';
import api from './api';
import protect from './middlewares/protect';

const router = new Router();

// Health check
router.get('/', api.status.get);

// Authentication
router.post('/api/auth/login', api.auth.login);
router.post('/api/auth/signup', api.auth.signup);
router.get('/api/auth/logout', api.auth.logout);

// Users
router.get('/api/users', protect, api.users.list);
router.get('/api/users/:userId', protect, api.users.findById);
router.post('/api/users', protect, api.users.create);
router.patch('/api/users/:userId', protect, api.users.update);
router.delete('/api/users/:userId', protect, api.users.remove);

export default router;
