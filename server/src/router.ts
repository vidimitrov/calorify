import Router from 'koa-router';
import api from './api';

const router = new Router();

// Health check
router.get('/', api.status.get);

export default router;
