import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  provider: {
    type: String,
    enum: ['stripe', 'paypal', 'konnect', 'cash-on-delivery', 'bank-transfer'],
    required: true,
  },
  method: {
    type: String,
    enum: ['card', 'wallet', 'cash', 'bank-transfer'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'authorized', 'captured', 'failed', 'refunded', 'cancelled'],
    default: 'pending',
  },
  amount: { type: Number, required: true },
  currency: { type: String, enum: ['EUR', 'USD', 'MAD', 'DZD'], required: true },
  providerReference: { type: String },
  providerStatus: { type: String },
  failureReason: { type: String },
  capturedAt: { type: Date },
  refundedAt: { type: Date },
  refundAmount: { type: Number },
}, { timestamps: true });

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ customerId: 1 });
paymentSchema.index({ status: 1 });

export const Payment = mongoose.model('Payment', paymentSchema);

