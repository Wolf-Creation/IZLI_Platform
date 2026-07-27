import mongoose from 'mongoose';

// Generic analytic event — typed by domain and entity
const analyticEventSchema = new mongoose.Schema({
  event: { type: String, required: true },
  domain: {
    type: String,
    enum: ['commerce', 'community', 'content', 'heritage', 'legacy', 'production'],
    required: true,
  },
  entityType: { type: String },
  entityId: { type: mongoose.Schema.Types.ObjectId },
  actorType: { type: String, enum: ['anonymous', 'Customer', 'CommunityMember', 'User'] },
  actorId: { type: mongoose.Schema.Types.ObjectId },
  meta: { type: mongoose.Schema.Types.Mixed },
  ip: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

analyticEventSchema.index({ domain: 1, event: 1 });
analyticEventSchema.index({ entityType: 1, entityId: 1 });
analyticEventSchema.index({ createdAt: 1 });

export const AnalyticEvent = mongoose.model('AnalyticEvent', analyticEventSchema);

