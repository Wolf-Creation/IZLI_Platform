import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  displayName: { type: String, required: true, trim: true },
  avatarUrl: { type: String },
  role: {
    type: String,
    enum: ['owner', 'admin', 'editor', 'moderator', 'viewer'],
    default: 'viewer',
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'invited', 'deactivated'],
    default: 'invited',
  },
  lastActiveAt: { type: Date },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

export const User = mongoose.model('User', userSchema);
