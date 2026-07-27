import mongoose from 'mongoose';

// ─── Category ──────────────────────────────────────────────────────────────

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  label: { type: String, required: true, trim: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);

// ─── Tag ───────────────────────────────────────────────────────────────────

const tagSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  label: { type: String, required: true, trim: true },
  color: { type: String },
}, { timestamps: true });

export const Tag = mongoose.model('Tag', tagSchema);

// ─── Media ─────────────────────────────────────────────────────────────────

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video', 'document', 'audio'], required: true },
  url: { type: String, required: true },
  alt: { type: String },
  width: { type: Number },
  height: { type: Number },
  sizeBytes: { type: Number },
  mimeType: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

mediaSchema.index({ type: 1 });

export const Media = mongoose.model('Media', mediaSchema);

