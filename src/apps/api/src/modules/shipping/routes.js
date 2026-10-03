import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { readShippingSettings, updateShippingSettings } from './controller.js';

const shippingRoutes = Router();

shippingRoutes.get('/settings', asyncHandler(readShippingSettings));
shippingRoutes.put('/settings', authMiddleware, roleMiddleware('owner', 'admin'), asyncHandler(updateShippingSettings));

export default shippingRoutes;
