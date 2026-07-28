import mongoose from 'mongoose';

const productSizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  availability: { type: String, enum: ['available', 'low', 'sold-out'], default: 'available' },
  stock: { type: Number, default: 0, min: 0 },
}, { _id: false });

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  universe: {
    type: String,
    enum: ['Heritage', 'Essentials', 'Studio', 'Community Lab'],
    required: true,
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived', 'out-of-stock'],
    default: 'draft',
  },
  releaseNumber: { type: String, trim: true },
  quantity: { type: Number, min: 0 },
  launchDate: { type: Date },
  releaseStatus: {
    type: String,
    enum: ['draft', 'ready', 'production', 'upcoming', 'live', 'sold-out', 'archived'],
    default: 'draft',
  },
  qrExperienceUrl: { type: String },
  productPassportId: { type: String, trim: true },
  archiveTitle: { type: String, trim: true },
  storyTitle: { type: String, trim: true },
  productionNotes: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, enum: ['EUR', 'USD', 'MAD', 'DZD'], default: 'MAD' },
  description: { type: String, default: '' },
  coverImageUrl: { type: String, default: '' },
  images: [{ type: String }],
  sizes: [productSizeSchema],
  materials: [{ type: String }],
  careInstructions: [{ type: String }],
  relatedStoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
  relatedChallengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  collectionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  publishedAt: { type: Date },
}, { timestamps: true });

productSchema.index({ status: 1 });
productSchema.index({ universe: 1 });
productSchema.index({ collectionIds: 1 });

export const Product = mongoose.model('Product', productSchema);

