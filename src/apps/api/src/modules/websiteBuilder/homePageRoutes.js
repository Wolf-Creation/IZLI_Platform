import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { homePageController } from './homePageController.js';

export const homePageRoutes = Router();
export const adminHomePageRoutes = Router();

homePageRoutes.get('/', asyncHandler(homePageController.get));
adminHomePageRoutes.put('/', authMiddleware, roleMiddleware('owner', 'admin', 'editor'), asyncHandler(homePageController.save));