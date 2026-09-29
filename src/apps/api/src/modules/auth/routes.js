import { Router } from 'express';
import { authController } from './controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

export const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/login/verify', authController.verifyKeeperLogin);
authRouter.get('/admin/profile', authMiddleware, authController.getAdminProfile);
authRouter.patch('/admin/profile', authMiddleware, authController.updateAdminProfile);
authRouter.get('/keeper/profile', authMiddleware, authController.getKeeperProfile);
authRouter.patch('/keeper/profile', authMiddleware, authController.updateKeeperProfile);
authRouter.patch('/keeper/security', authMiddleware, authController.updateKeeperSecurity);
authRouter.post('/register', authController.register);
authRouter.post('/keeper/register', authController.registerKeeper);
authRouter.post('/keeper/login', authController.loginKeeper);
authRouter.post('/keeper/login/verify', authController.verifyKeeperLogin);
authRouter.post('/keeper/verify', authController.verifyKeeperEmail);
authRouter.post('/keeper/forgot-password', authController.requestKeeperPasswordReset);
authRouter.post('/keeper/reset-password', authController.resetKeeperPassword);
