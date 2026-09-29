import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { collectionsPageController } from './collectionsPageController.js';

export const collectionsPageRoutes = Router();
export const adminCollectionsPageRoutes = Router();

collectionsPageRoutes.get('/', asyncHandler(collectionsPageController.get));
adminCollectionsPageRoutes.put('/', authMiddleware, roleMiddleware('owner', 'admin', 'editor'), asyncHandler(collectionsPageController.save));