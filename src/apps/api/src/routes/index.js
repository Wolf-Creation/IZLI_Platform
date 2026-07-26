import { Router } from 'express';
import { authRouter } from '../modules/auth/routes.js';
import { usersRouter } from '../modules/users/routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
