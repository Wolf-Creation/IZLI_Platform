import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  universe: {
    type: String,
    enum: ['Heritage', 'Essentials', 'Studio', 'Community Lab'],
    required: true,
  },
  season: {
    type: String,
    enum: ['SS25', 'FW25', 'SS26', 'FW26', 'Permanent'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'draft',
  },
  coverImageUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  publishedAt: { type: Date },
}, { timestamps: true });

collectionSchema.index({ status: 1 });
collectionSchema.index({ season: 1 });

export const Collection = mongoose.model('Collection', collectionSchema);

