import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sku: { type: String, required: true },
  size: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  currency: { type: String, enum: ['EUR', 'USD', 'MAD', 'DZD'], default: 'MAD' },
}, { _id: false });

const cartSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  sessionId: { type: String },
  items: [cartItemSchema],
  expiresAt: { type: Date },
}, { timestamps: true });

cartSchema.index({ customerId: 1 });
cartSchema.index({ sessionId: 1 });
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Cart = mongoose.model('Cart', cartSchema);

