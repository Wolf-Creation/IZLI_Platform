import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

export const configureCloudinary = () => {
  if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
    return cloudinary;
  }

  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  });

  return cloudinary;
};
