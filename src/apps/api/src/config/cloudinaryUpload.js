import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { isCloudinaryConfigured } from './cloudinary.js';

if (!isCloudinaryConfigured()) {
  console.warn('[Cloudinary] Missing credentials. Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.');
}

export { cloudinary };

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    callback(null, file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/'));
  },
});