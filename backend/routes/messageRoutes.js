import express from 'express';
import { requireAuth } from '@clerk/express';
import { getMessages, postMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/', requireAuth({ signInUrl: '/sign-in' }),  getMessages);
router.post('/', requireAuth({ signInUrl: '/sign-in' }), postMessage);

export default router;
