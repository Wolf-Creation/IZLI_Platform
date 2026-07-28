import mongoose from 'mongoose';

const referenceSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
  url: { type: String, default: '' },
}, { _id: false });

const designNoteSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  body: { type: String, required: true, trim: true },
}, { _id: false });

const legacySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  amazighName: { type: String, default: '', trim: true },
  tifinaghName: { type: String, default: '', trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  shortDescription: { type: String, default: '' },
  longDescription: { type: String, default: '' },
  legacyType: {
    type: String,
    enum: ['Nature', 'Architecture', 'Craftsmanship', 'Symbols', 'Music', 'History', 'Daily Life', 'Materials', 'Clothing', 'Community Heritage'],
    default: 'History',
  },
  coverImageUrl: { type: String, default: '' },
  heroImageUrl: { type: String, default: '' },
  symbol: { type: String, default: '' },
  icon: { type: String, default: '' },
  primaryColor: { type: String, default: '#1E2F44' },
  secondaryColor: { type: String, default: '#506681' },
  accentColor: { type: String, default: '#B7AA91' },
  typographyStyle: { type: String, default: '' },
  designPhilosophy: { type: String, default: '' },
  designRules: { type: String, default: '' },
  forbiddenElements: { type: String, default: '' },
  signatureMotifs: { type: String, default: '' },
  geometryRules: { type: String, default: '' },
  embroideryRules: { type: String, default: '' },
  printRules: { type: String, default: '' },
  originStory: { type: String, default: '' },
  culturalMeaning: { type: String, default: '' },
  historicalContext: { type: String, default: '' },
  emotionalMessage: { type: String, default: '' },
  values: [{ type: String }],
  images: [{ type: String }],
  books: [{ type: String }],
  articles: [{ type: String }],
  externalReferences: [referenceSchema],
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  keywords: [{ type: String }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  archiveIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Archive' }],
  collectionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  legacyReleaseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LegacyRelease' }],
  productPassportIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductPassport' }],
  qrExperienceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QRExperience' }],
  keeperIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keeper' }],
  communityChallengeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  votingSessionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VotingSession' }],
  analyticsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AnalyticEvent' }],
  relationNotes: [designNoteSchema],
}, { timestamps: true });

legacySchema.index({ status: 1 });
legacySchema.index({ legacyType: 1 });

export const Legacy = mongoose.model('Legacy', legacySchema);