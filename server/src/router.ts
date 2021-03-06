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
router.post('/api/users', protect, api.users.create);
router.get('/api/users', protect, api.users.list);
router.get('/api/users/:id', protect, api.users.findById);
router.patch('/api/users/:id', protect, api.users.update);
router.delete('/api/users/:id', protect, api.users.remove);

// Meals
router.post('/api/meals', protect, api.meals.create);
router.get('/api/meals', protect, api.meals.list);
router.get('/api/meals/:id', protect, api.meals.findById);
router.patch('/api/meals/:id', protect, api.meals.update);
router.delete('/api/meals/:id', protect, api.meals.remove);

export default router;
