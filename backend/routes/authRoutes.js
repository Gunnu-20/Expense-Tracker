import express from 'express';
import { signup, login, logout, refreshToken, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateSignup, validateLogin } from '../validators/authValidator.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/signup',  authLimiter, validateSignup, signup);
router.post('/login',   authLimiter, validateLogin,  login);
router.post('/logout',  logout);
router.post('/refresh', refreshToken);
router.get('/me',       protect, getProfile);

export default router;