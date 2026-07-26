import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'Health check passed',
    data: { status: 'ok' },
  });
});
