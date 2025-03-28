import express from 'express';
import { requireAuth } from '@clerk/express';
import { getProtectedData } from '../controllers/authController.js';

const router = express.Router();

router.get('/protected', requireAuth({ signInUrl: '/sign-in' }), getProtectedData);

export default router;
