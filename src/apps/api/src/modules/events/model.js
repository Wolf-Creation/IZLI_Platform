import mongoose from 'mongoose';

// ─── Challenge ────────────────────────────────────────────────────────────

const challengeSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  tagline: { type: String, default: '' },
  status: {
    type: String,
    enum: ['active', 'upcoming', 'closed', 'results', 'draft'],
    default: 'draft',
  },
  level: {
    type: String,
    enum: ['open', 'member', 'advanced', 'invitation'],
    default: 'open',
  },
  coverImageUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  guidelines: { type: String, default: '' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  submissionsCount: { type: Number, default: 0 },
  participantsCount: { type: Number, default: 0 },
  maxParticipants: { type: Number },
  winnersCount: { type: Number, default: 1 },
  relatedProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
}, { timestamps: true });

challengeSchema.index({ status: 1 });

export const Challenge = mongoose.model('Challenge', challengeSchema);

// ─── Submission ──────────────────────────────────────────────────────────

const submissionSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityMember', required: true },
  memberName: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  mediaUrls: [{ type: String }],
  coverImageUrl: { type: String, default: '' },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'shortlisted', 'winner', 'rejected'],
    default: 'draft',
  },
  votes: { type: Number, default: 0 },
  judgeScore: { type: Number },
  judgeNotes: { type: String },
  rank: { type: Number },
  submittedAt: { type: Date },
  reviewedAt: { type: Date },
}, { timestamps: true });

submissionSchema.index({ challengeId: 1 });
submissionSchema.index({ memberId: 1 });
submissionSchema.index({ status: 1 });

export const Submission = mongoose.model('Submission', submissionSchema);

// ─── Event ─────────────────────────────────────────────────────────────────

const eventSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ['launch', 'workshop', 'community', 'exhibition', 'online', 'pop-up'],
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'past', 'cancelled'],
    default: 'upcoming',
  },
  format: {
    type: String,
    enum: ['in-person', 'online', 'hybrid'],
    default: 'in-person',
  },
  coverImageUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  date: { type: Date, required: true },
  timeStart: { type: String },
  timeEnd: { type: String },
  location: { type: String, default: '' },
  capacity: { type: Number, default: 0 },
  registeredCount: { type: Number, default: 0 },
  relatedProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  relatedChallengeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
}, { timestamps: true });

eventSchema.index({ status: 1 });
eventSchema.index({ date: 1 });

export const Event = mongoose.model('Event', eventSchema);

// ─── LabProject ──────────────────────────────────────────────────────────

const labProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  tagline: { type: String, default: '' },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived', 'draft', 'paused'],
    default: 'draft',
  },
  category: {
    type: String,
    enum: ['archive', 'research', 'design', 'craft', 'education'],
    required: true,
  },
  coverImageUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityMember', required: true },
  leadName: { type: String, required: true },
  membersCount: { type: Number, default: 0 },
  maxMembers: { type: Number, default: 20 },
  contributionsCount: { type: Number, default: 0 },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  relatedChallengeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
}, { timestamps: true });

labProjectSchema.index({ status: 1 });
labProjectSchema.index({ leadId: 1 });

export const LabProject = mongoose.model('LabProject', labProjectSchema);

// ─── OpenCall ───────────────────────────────────────────────────────────────

const openCallSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  tagline: { type: String, default: '' },
  status: { type: String, enum: ['active', 'closed', 'draft'], default: 'draft' },
  labProjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabProject', required: true },
  coverImageUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  requirements: [{ type: String }],
  deadline: { type: Date, required: true },
  submissionsCount: { type: Number, default: 0 },
  maxSubmissions: { type: Number },
}, { timestamps: true });

openCallSchema.index({ labProjectId: 1 });
openCallSchema.index({ status: 1 });

export const OpenCall = mongoose.model('OpenCall', openCallSchema);

