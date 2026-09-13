import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
  qrNumber: { type: String, required: true, unique: true, index: true },
  sequenceNumber: { type: Number, required: true, unique: true, index: true },
  seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCodeSeries', required: true, index: true },
  status: { type: String, enum: ['unassigned', 'assigned', 'sold', 'activated', 'keeper', 'lost', 'archived'], default: 'unassigned', index: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  productCode: { type: String, trim: true, default: null },
  size: { type: String, trim: true, default: null },
  color: { type: String, trim: true, default: null },
  colorCode: { type: String, trim: true, default: null },
  releaseId: { type: mongoose.Schema.Types.ObjectId, default: null },
  releaseNumber: { type: String, trim: true, default: null },
  releaseProductNumber: { type: String, trim: true, default: null },
  serialNumber: { type: String, default: null },
  url: { type: String, required: true },
  assignedAt: { type: Date, default: null },
  assignedBy: { type: String, default: null },
}, { timestamps: true });

const qrCodeSeriesSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  startSequence: { type: Number, required: true },
  endSequence: { type: Number, required: true },
  startQrNumber: { type: String, required: true },
  endQrNumber: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  format: { type: String, enum: ['svg', 'png'], default: 'svg' },
  createdBy: { type: String, required: true, trim: true },
}, { timestamps: true });

qrCodeSeriesSchema.index({ createdAt: -1 });

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence: { type: Number, default: 0, min: 0 },
}, { versionKey: false });

const qrAssignmentHistorySchema = new mongoose.Schema({
  qrId: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode', required: true, index: true },
  previousProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  newProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  previousSize: { type: String, default: null },
  newSize: { type: String, default: null },
  previousColor: { type: String, default: null },
  newColor: { type: String, default: null },
  previousReleaseId: { type: mongoose.Schema.Types.ObjectId, default: null },
  newReleaseId: { type: mongoose.Schema.Types.ObjectId, default: null },
  action: { type: String, enum: ['assigned', 'updated'], required: true },
  changedBy: { type: String, required: true },
}, { timestamps: true });

qrCodeSchema.index(
  { serialNumber: 1 },
  { unique: true, partialFilterExpression: { serialNumber: { $type: 'string' } }, name: 'qr_serialNumber_unique' },
);

export const QRCode = mongoose.model('QRCode', qrCodeSchema);
export const QRCodeSeries = mongoose.model('QRCodeSeries', qrCodeSeriesSchema);
export const Counter = mongoose.model('Counter', counterSchema);
export const QRAssignmentHistory = mongoose.model('QRAssignmentHistory', qrAssignmentHistorySchema);
