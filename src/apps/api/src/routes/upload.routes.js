import { Router } from 'express';
import { cloudinary, uploadMiddleware } from '../config/cloudinaryUpload.js';
import { successResponse } from '../utils/apiResponse.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

const CLOUDINARY_FOLDERS = {
  products: 'IZLI_TN/Products',
  product: 'IZLI_TN/Products',
  sliders: 'IZLI_TN/Sliders',
  slider: 'IZLI_TN/Sliders',
  banners: 'IZLI_TN/Banners',
  banner: 'IZLI_TN/Banners',
  legacy: 'IZLI_TN/Banners',
  collections: 'IZLI_TN/Collections',
};

const uploadMedia = asyncHandler(async (request, response) => {
  if (!request.file) {
    throw new AppError('No file uploaded', 400);
  }

  const folder = CLOUDINARY_FOLDERS[String(request.body.folder || 'banners').toLowerCase()];
  if (!folder) {
    throw new AppError('Invalid image folder. Use products, sliders or banners.', 400);
  }
  if (String(request.body.folder || '').toLowerCase() === 'collections' && !['owner', 'admin', 'editor'].includes(request.user?.role)) {
    throw new AppError('Collection image uploads require staff access', 403);
  }

  let result;
  try {
    result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        folder,
        resource_type: request.file.mimetype.startsWith('video/') ? 'video' : 'image',
        use_filename: true,
        unique_filename: true,
      }, (error, uploadResult) => error ? reject(error) : resolve(uploadResult));
      stream.end(request.file.buffer);
    });
  } catch (error) {
    const providerMessage = error?.error?.message || error?.message;
    if (providerMessage === 'cloud_name mismatch') {
      throw new AppError('Cloudinary credentials do not match the configured cloud. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.', 502);
    }
    throw new AppError('Cloudinary image upload failed. Verify the API credentials and try again.', 502);
  }

  return response.status(201).json(successResponse('Media uploaded to Cloudinary', {
    url: result.secure_url,
    publicId: result.public_id,
    folder,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
    resourceType: result.resource_type,
  }));
});

router.post('/images', uploadMiddleware.single('file'), uploadMedia);
router.post('/collections', authMiddleware, roleMiddleware('owner', 'admin', 'editor'), uploadMiddleware.single('file'), uploadMedia);
// Keep the previous path working for existing clients during the transition.
router.post('/legacy', uploadMiddleware.single('file'), uploadMedia);

export const uploadRouter = router;
