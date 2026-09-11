import { Router } from 'express';
import { authController } from './controller.js';

export const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/keeper/register', authController.registerKeeper);
authRouter.post('/keeper/login', authController.loginKeeper);
authRouter.post('/keeper/verify', authController.verifyKeeperEmail);
