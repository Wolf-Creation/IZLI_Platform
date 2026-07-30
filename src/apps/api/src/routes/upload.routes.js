import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import multer from 'multer';
import { successResponse } from '../utils/apiResponse.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: async (_req, _file, cb) => {
      const baseDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets');
      await mkdir(baseDir, { recursive: true });
      cb(null, baseDir);
    },
    filename: (_req, file, cb) => {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-');
      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/legacy', upload.single('file'), asyncHandler(async (request, response) => {
  if (!request.file) {
    throw new AppError('No file uploaded', 400);
  }

  const fileName = request.file.filename;
  const publicUrl = `/api/uploads/${fileName}`;

  return response.status(201).json(successResponse('Image uploaded successfully', { url: publicUrl, name: fileName }));
}));

export const uploadRouter = router;
