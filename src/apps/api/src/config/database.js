import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async () => {
  if (!env.mongoUri) {
    throw new Error('MONGODB_URI is required');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(env.mongoUri, {
    autoIndex: env.nodeEnv !== 'production',
  });

  return mongoose.connection;
};
