import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authMiddleware = (request, response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return response.status(401).json({ success: false, message: 'Unauthorized', errors: [] });
  }

  const token = authorization.slice(7);

  try {
    request.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch {
    return response.status(401).json({ success: false, message: 'Invalid token', errors: [] });
  }
};
