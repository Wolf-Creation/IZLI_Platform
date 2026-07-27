import mongoose from 'mongoose';

// AuditLog — tracks sensitive admin actions
const auditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  actorEmail: { type: String, required: true },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  diff: { type: mongoose.Schema.Types.Mixed },
  ip: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

auditLogSchema.index({ actorId: 1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);

// GlobalSettings — key-value store for site-wide configuration
const globalSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  value: { type: mongoose.Schema.Types.Mixed },
  group: { type: String },
  description: { type: String },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

globalSettingSchema.index({ group: 1 });

export const GlobalSetting = mongoose.model('GlobalSetting', globalSettingSchema);

