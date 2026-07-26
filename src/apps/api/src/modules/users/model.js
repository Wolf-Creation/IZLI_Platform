import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'User', enum: ['User', 'Keeper', 'Moderator', 'Admin', 'SuperAdmin'] },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
