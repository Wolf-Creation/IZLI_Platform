import { Router } from 'express';
import { usersController } from './controller.js';

export const usersRouter = Router();

usersRouter.get('/', usersController.listUsers);
usersRouter.post('/', usersController.createUser);
