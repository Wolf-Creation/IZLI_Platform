import mongoose from 'mongoose';

const heritageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  region: { type: String, required: true },
  period: { type: String },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'draft',
  },
  coverImageUrl: { type: String, default: '' },
  body: { type: String, default: '' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  relatedStoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  relatedProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  publishedAt: { type: Date },
}, { timestamps: true });

heritageSchema.index({ status: 1 });
heritageSchema.index({ region: 1 });

export const Heritage = mongoose.model('Heritage', heritageSchema);

