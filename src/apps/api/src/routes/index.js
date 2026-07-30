import { Router } from 'express';
import { authRouter } from '../modules/auth/routes.js';
import { usersRouter } from '../modules/users/routes.js';
import { resourcesRouter } from './resources.routes.js';
import { uploadRouter } from './upload.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/resources', resourcesRouter);
apiRouter.use('/uploads', uploadRouter);
