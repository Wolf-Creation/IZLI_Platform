import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '5000',
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
  clientUrl: process.env.CLIENT_URL || '',
};
