import mongoose from 'mongoose';

// ─── ProductPassport ─────────────────────────────────────────────────
const productPassportSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qrCode: { type: String, required: true, unique: true },
  qrImageUrl: { type: String, required: true },
  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'draft' },
  sections: [{
    type: { type: String, enum: ['heritage', 'craft', 'material', 'care', 'story', 'ar'] },
    title: { type: String },
    content: { type: String },
    imageUrl: { type: String },
    videoUrl: { type: String },
  }],
  views: { type: Number, default: 0 },
  scans: { type: Number, default: 0 },
  publishedAt: { type: Date },
}, { timestamps: true });

productPassportSchema.index({ productId: 1 });
productPassportSchema.index({ status: 1 });

export const ProductPassport = mongoose.model('ProductPassport', productPassportSchema);

// ─── ProductionTemplate ──────────────────────────────────────────────
const productionTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ['label', 'certificate', 'invoice', 'passport', 'brochure', 'tag'],
    required: true,
  },
  format: { type: String, enum: ['A4', 'A5', 'A6', 'custom'], default: 'A4' },
  width: { type: Number },
  height: { type: Number },
  dpi: { type: Number, default: 300 },
  status: { type: String, enum: ['active', 'archived', 'draft'], default: 'draft' },
  templateUrl: { type: String },
  previewImageUrl: { type: String },
  variables: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

productionTemplateSchema.index({ type: 1 });
productionTemplateSchema.index({ status: 1 });

export const ProductionTemplate = mongoose.model('ProductionTemplate', productionTemplateSchema);

// ─── GeneratedAsset ──────────────────────────────────────────────────
const generatedAssetSchema = new mongoose.Schema({
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductionTemplate', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  batchJobId: { type: mongoose.Schema.Types.ObjectId, ref: 'BatchJob' },
  status: { type: String, enum: ['pending', 'processing', 'ready', 'failed'], default: 'pending' },
  fileUrl: { type: String },
  format: { type: String, enum: ['pdf', 'png', 'svg', 'jpg'] },
  sizeBytes: { type: Number },
  generatedAt: { type: Date },
  expiresAt: { type: Date },
}, { timestamps: true });

generatedAssetSchema.index({ templateId: 1 });
generatedAssetSchema.index({ productId: 1 });
generatedAssetSchema.index({ batchJobId: 1 });
generatedAssetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const GeneratedAsset = mongoose.model('GeneratedAsset', generatedAssetSchema);

// ─── BatchJob ───────────────────────────────────────────────────────────────
const batchJobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['label-generation', 'passport-generation', 'export', 'import', 'asset-generation'],
    required: true,
  },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'], default: 'pending' },
  total: { type: Number, default: 0 },
  processed: { type: Number, default: 0 },
  failed: { type: Number, default: 0 },
  errorLog: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startedAt: { type: Date },
  completedAt: { type: Date },
}, { timestamps: true });

batchJobSchema.index({ status: 1 });
batchJobSchema.index({ createdBy: 1 });

export const BatchJob = mongoose.model('BatchJob', batchJobSchema);

// ─── QR Code Batch ──────────────────────────────────────────────────────────
const qrCodeItemSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  url: { type: String, required: true },
  sequence: { type: Number, required: true },
  status: { type: String, enum: ['generated', 'assigned', 'revoked'], default: 'generated' },
  assignedProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  assignedProductName: { type: String, trim: true },
  assignedAt: { type: Date },
}, { _id: false });

const qrCodeBatchSchema = new mongoose.Schema({
  seriesName: { type: String, required: true, trim: true },
  seriesNumber: { type: Number, min: 1 },
  createdBy: { type: String, required: true, trim: true },
  product: {
    pieceName: { type: String, required: true, trim: true },
    productName: { type: String, required: true, trim: true },
    collection: { type: String, required: true, trim: true },
    reference: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    materials: [{ type: String, trim: true }],
    weightGsm: { type: Number, min: 0 },
    originStatement: { type: String, enum: ['MADE IN TUNISIA', 'DESIGNED IN TUNISIA'], required: true },
  },
  quantity: { type: Number, required: true, min: 1 },
  codes: { type: [qrCodeItemSchema], required: true },
  exportFormats: [{ type: String, enum: ['svg', 'png'] }],
}, { timestamps: true });

qrCodeBatchSchema.index({ 'product.reference': 1 });
qrCodeBatchSchema.index({ createdBy: 1, createdAt: -1 });

export const QRCodeBatch = mongoose.model('QRCodeBatch', qrCodeBatchSchema);

// ─── PrintPreset ───────────────────────────────────────────────────────────
const printPresetSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  format: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  dpi: { type: Number, default: 300 },
  bleed: { type: Number, default: 3 },
  colorProfile: { type: String, enum: ['CMYK', 'RGB'], default: 'CMYK' },
  fileTypes: [{ type: String, enum: ['pdf', 'png', 'svg', 'eps'] }],
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

export const PrintPreset = mongoose.model('PrintPreset', printPresetSchema);

