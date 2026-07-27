import mongoose from 'mongoose';

const authSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  refreshToken: { type: String, required: true, select: false },
  userAgent: { type: String },
  ip: { type: String },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

authSessionSchema.index({ userId: 1 });
authSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AuthSession = mongoose.model('AuthSession', authSessionSchema);
