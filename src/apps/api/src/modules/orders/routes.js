import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { createCheckoutOrder, listOrders } from './controller.js';

const ordersRoutes = Router();

ordersRoutes.post('/checkout', asyncHandler(createCheckoutOrder));
ordersRoutes.get('/', authMiddleware, roleMiddleware('owner', 'admin'), asyncHandler(listOrders));

export default ordersRoutes;
