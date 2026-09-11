import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ─── Address sub-schema ──────────────────────────────────────────────────────
const addressSchema = new mongoose.Schema({
  label: { type: String, default: 'home' },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  line1: { type: String, required: true },
  line2: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String },
  isDefault: { type: Boolean, default: false },
}, { _id: true });

// ─── Customer ──────────────────────────────────────────────────────────────
const customerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['female', 'male', 'non-binary', 'prefer-not-to-say'] },
  phone: { type: String },
  governorate: { type: String, trim: true },
  age: { type: Number, min: 13, max: 120 },
  avatarUrl: { type: String },
  locale: { type: String, enum: ['fr', 'en', 'ar'], default: 'fr' },
  currency: { type: String, enum: ['EUR', 'USD', 'MAD', 'DZD'], default: 'EUR' },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'guest'],
    default: 'active',
  },
  authProvider: {
    type: String,
    enum: ['email', 'google', 'apple'],
    default: 'email',
  },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, select: false },
  emailVerificationCode: { type: String, select: false },
  emailVerificationExpires: { type: Date, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  addresses: [addressSchema],
  keeperCircleMemberId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityMember' },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastOrderAt: { type: Date },
  lastActiveAt: { type: Date },
  marketingConsent: { type: Boolean, default: false },
}, { timestamps: true });

customerSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

customerSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

customerSchema.index({ status: 1 });
customerSchema.index({ authProvider: 1 });

export const Customer = mongoose.model('Customer', customerSchema);
