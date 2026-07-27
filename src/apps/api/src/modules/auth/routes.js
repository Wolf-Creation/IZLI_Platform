import { Router } from 'express';
import { authController } from './controller.js';

export const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
