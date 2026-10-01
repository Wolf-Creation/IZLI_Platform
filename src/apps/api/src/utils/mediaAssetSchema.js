import mongoose from 'mongoose';

export const mediaAssetSchema = new mongoose.Schema({
  field: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  resourceType: { type: String, enum: ['image', 'video'], default: 'image' },
  format: { type: String, default: '' },
  width: { type: Number, min: 0, default: 0 },
  height: { type: Number, min: 0, default: 0 },
  bytes: { type: Number, min: 0, default: 0 },
}, { _id: false });
