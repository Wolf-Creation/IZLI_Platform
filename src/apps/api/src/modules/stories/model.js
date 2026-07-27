import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String },
  type: {
    type: String,
    enum: ['editorial', 'community', 'heritage', 'process', 'interview'],
    required: true,
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'review', 'archived', 'rejected'],
    default: 'draft',
  },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  coverImageUrl: { type: String, default: '' },
  body: { type: String, default: '' },
  readTimeMinutes: { type: Number, default: 1 },
  relatedProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  relatedChallengeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  publishedAt: { type: Date },
}, { timestamps: true });

storySchema.index({ status: 1 });
storySchema.index({ type: 1 });
storySchema.index({ authorId: 1 });

export const Story = mongoose.model('Story', storySchema);

