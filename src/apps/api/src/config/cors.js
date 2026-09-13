import cors from 'cors';
import { env } from './env.js';

const localOrigins = ['http://localhost:8443', 'http://localhost:8444'];
const allowedOrigins = [...new Set([...env.clientUrls, ...(env.nodeEnv === 'production' ? [] : localOrigins)])];

export const corsMiddleware = cors({
  origin: (requestOrigin, callback) => {
    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
});
