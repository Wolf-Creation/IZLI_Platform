import mongoose from 'mongoose';

// StyleGuide — visual guidelines and design tokens
const styleGuideSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  version: { type: String, required: true, default: '1.0.0' },
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
  tokens: { type: mongoose.Schema.Types.Mixed },
  components: [{
    name: { type: String },
    usage: { type: String },
    exampleUrl: { type: String },
  }],
  publishedAt: { type: Date },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const StyleGuide = mongoose.model('StyleGuide', styleGuideSchema);

// RecommendationHub — config for product/content recommendation logic
const recommendationHubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['product', 'story', 'challenge', 'event', 'heritage'],
    required: true,
  },
  algorithm: {
    type: String,
    enum: ['trending', 'personalized', 'similar', 'curated', 'seasonal'],
    default: 'curated',
  },
  sourceEntityType: { type: String },
  sourceEntityId: { type: mongoose.Schema.Types.ObjectId },
  maxItems: { type: Number, default: 12 },
  items: [{ type: mongoose.Schema.Types.ObjectId }],
  active: { type: Boolean, default: true },
  refreshedAt: { type: Date },
}, { timestamps: true });

recommendationHubSchema.index({ type: 1, active: 1 });

export const RecommendationHub = mongoose.model('RecommendationHub', recommendationHubSchema);

