import mongoose from 'mongoose';

// ─── Keeper ──────────────────────────────────────────────────────────────────
const keeperSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityMember', required: true },
  level: {
    type: String,
    enum: ['visitor', 'customer', 'keeper', 'senior-keeper', 'legacy-keeper', 'guardian'],
    default: 'visitor',
  },
  archiveIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Archive' }],
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LegacyReward' }],
  achievements: [{ type: String }],
  referralCode: { type: String, unique: true, sparse: true },
  referredByKeeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Keeper' },
  referralCount: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0 },
  acceptedAt: { type: Date },
}, { timestamps: true });

keeperSchema.index({ memberId: 1 });
keeperSchema.index({ level: 1 });

export const Keeper = mongoose.model('Keeper', keeperSchema);

// ─── Archive ───────────────────────────────────────────────────────────────
const archiveSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  coverImageUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'complete', 'legendary'],
    default: 'upcoming',
  },
  collectionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  keeperIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keeper' }],
  legacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Legacy' },
  relatedHeritageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Heritage' }],
  launchDate: { type: Date },
}, { timestamps: true });

archiveSchema.index({ status: 1 });

export const Archive = mongoose.model('Archive', archiveSchema);

// ─── VotingSession ────────────────────────────────────────────────────────
const votingSessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  archiveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Archive' },
  status: { type: String, enum: ['open', 'closed', 'counting'], default: 'open' },
  openAt: { type: Date, required: true },
  closeAt: { type: Date, required: true },
  eligibleRoles: [{ type: String }],
}, { timestamps: true });

export const VotingSession = mongoose.model('VotingSession', votingSessionSchema);

const voteSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'VotingSession', required: true },
  keeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Keeper', required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  targetType: { type: String, required: true },
}, { timestamps: true });

voteSchema.index({ sessionId: 1, keeperId: 1 }, { unique: true });

export const Vote = mongoose.model('Vote', voteSchema);

// ─── LegacyReward ─────────────────────────────────────────────────────────
const legacyRewardSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityMember', required: true },
  type: {
    type: String,
    enum: ['discount', 'early-access', 'free-shipping', 'gift', 'badge'],
    required: true,
  },
  status: { type: String, enum: ['active', 'redeemed', 'expired'], default: 'active' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  value: { type: Number },
  currency: { type: String, enum: ['EUR', 'USD', 'MAD', 'DZD'] },
  code: { type: String, sparse: true },
  expiresAt: { type: Date },
  redeemedAt: { type: Date },
  earnedAt: { type: Date, default: Date.now },
}, { timestamps: true });

legacyRewardSchema.index({ memberId: 1 });
legacyRewardSchema.index({ status: 1 });

export const LegacyReward = mongoose.model('LegacyReward', legacyRewardSchema);

// ─── KeeperInvitation ─────────────────────────────────────────────────────
const keeperInvitationSchema = new mongoose.Schema({
  keeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Keeper', required: true },
  inviteeEmail: { type: String, required: true, lowercase: true, trim: true },
  status: { type: String, enum: ['pending', 'accepted', 'expired', 'declined'], default: 'pending' },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  acceptedAt: { type: Date },
}, { timestamps: true });

keeperInvitationSchema.index({ keeperId: 1 });
keeperInvitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const KeeperInvitation = mongoose.model('KeeperInvitation', keeperInvitationSchema);

