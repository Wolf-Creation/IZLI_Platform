import { Router } from 'express';
import { collectionsController } from './controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const collectionsRoutes = Router();
export const adminCollectionsRoutes = Router();
const requireCollectionAdmin = [authMiddleware, roleMiddleware('owner', 'admin', 'editor')];

collectionsRoutes.get('/', asyncHandler(collectionsController.listPublic));
collectionsRoutes.get('/:slug', asyncHandler(collectionsController.getPublic));

adminCollectionsRoutes.use(...requireCollectionAdmin);
adminCollectionsRoutes.get('/', asyncHandler(collectionsController.listAdmin));
adminCollectionsRoutes.post('/', asyncHandler(collectionsController.create));
adminCollectionsRoutes.put('/:id', asyncHandler(collectionsController.update));
adminCollectionsRoutes.delete('/:id', asyncHandler(collectionsController.remove));

