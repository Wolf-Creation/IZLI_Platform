import cors from 'cors';
import { env } from './env.js';

export const corsMiddleware = cors({
  origin: env.clientUrls.length > 0 ? env.clientUrls : true,
  credentials: true,
});
