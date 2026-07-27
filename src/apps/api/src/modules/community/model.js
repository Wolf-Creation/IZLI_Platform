import mongoose from 'mongoose';

// ─── CommunityMember ────────────────────────────────────────────────

const communityMemberSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  displayName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  avatarUrl: { type: String },
  location: { type: String },
  level: { type: Number, enum: [1, 2, 3, 4, 5], default: 1 },
  status: {
    type: String,
    enum: ['active', 'suspended', 'pending', 'banned'],
    default: 'pending',
  },
  contributionsCount: { type: Number, default: 0 },
  featuredContributions: { type: Number, default: 0 },
  challengesParticipated: { type: Number, default: 0 },
  labProjectsJoined: { type: Number, default: 0 },
  badges: [{ type: String }],
  lastActiveAt: { type: Date },
}, { timestamps: { createdAt: 'joinedAt', updatedAt: 'updatedAt' } });

communityMemberSchema.index({ status: 1 });
communityMemberSchema.index({ level: 1 });

export const CommunityMember = mongoose.model('CommunityMember', communityMemberSchema);

// ─── Contribution ──────────────────────────────────────────────────

const contributionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ['archive', 'pattern', 'craft', 'textile', 'symbol', 'photography'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'featured', 'rejected', 'under-review'],
    default: 'pending',
  },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityMember', required: true },
  memberName: { type: String, required: true },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  challengeName: { type: String },
  description: { type: String, default: '' },
  mediaUrls: [{ type: String }],
  coverImageUrl: { type: String, default: '' },
  votes: { type: Number, default: 0 },
  reviewNotes: { type: String },
  reviewedAt: { type: Date },
}, { timestamps: true });

contributionSchema.index({ memberId: 1 });
contributionSchema.index({ status: 1 });
contributionSchema.index({ challengeId: 1 });

export const Contribution = mongoose.model('Contribution', contributionSchema);

