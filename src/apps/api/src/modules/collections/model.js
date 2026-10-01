import mongoose from 'mongoose';
import { mediaAssetSchema } from '../../utils/mediaAssetSchema.js';

const collectionSchema = new mongoose.Schema({
  slug: { type: String, required: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  tagline: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ['LEGACY', 'STUDIO', 'ESSENTIALS', 'COMMUNITY_LAB'],
    required: true,
  },
  coverImage: { type: String, default: null },
  heroImage: { type: String, default: null },
  displayOrder: { type: Number, required: true, min: 1 },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true, required: true },
  universe: { type: String, enum: ['Heritage', 'Essentials', 'Studio', 'Community Lab'] },
  season: {
    type: String,
    enum: ['SS25', 'FW25', 'SS26', 'FW26', 'Permanent'],
  },
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'draft',
  },
  coverImageUrl: { type: String, default: '' },
  mediaAssets: { type: [mediaAssetSchema], default: [] },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  publishedAt: { type: Date },
}, { timestamps: true });

collectionSchema.index({ slug: 1 }, { unique: true });
collectionSchema.index({ isActive: 1, displayOrder: 1 });
collectionSchema.index({ status: 1 });
collectionSchema.index({ season: 1 });

export const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema, 'collections');

