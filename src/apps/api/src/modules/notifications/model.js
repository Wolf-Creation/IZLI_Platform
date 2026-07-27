import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  recipientType: { type: String, enum: ['User', 'CommunityMember', 'Customer'], required: true },
  type: {
    type: String,
    enum: [
      'contribution-approved', 'contribution-featured', 'contribution-rejected',
      'challenge-result', 'challenge-joined', 'challenge-reminder',
      'order-confirmed', 'order-shipped', 'order-delivered',
      'lab-project-update', 'new-collection', 'event-reminder',
      'level-up', 'reward-earned', 'mention', 'system',
    ],
    required: true,
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  read: { type: Boolean, default: false },
  entityType: { type: String },
  entityId: { type: mongoose.Schema.Types.ObjectId },
  actionUrl: { type: String },
}, { timestamps: true });

notificationSchema.index({ recipientId: 1, read: 1 });
notificationSchema.index({ createdAt: 1 });

export const Notification = mongoose.model('Notification', notificationSchema);

