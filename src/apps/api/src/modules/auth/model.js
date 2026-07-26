import mongoose from 'mongoose';

const authSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AuthSession = mongoose.model('AuthSession', authSessionSchema);
