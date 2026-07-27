import mongoose from 'mongoose';

const orderLineItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  sku: { type: String, required: true },
  size: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  currency: { type: String, enum: ['EUR', 'USD', 'MAD', 'DZD'], required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partial'],
    default: 'pending',
  },
  lineItems: [orderLineItemSchema],
  subtotal: { type: Number, required: true, min: 0 },
  shippingCost: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 0 },
  currency: { type: String, enum: ['EUR', 'USD', 'MAD', 'DZD'], default: 'MAD' },
  shippingAddress: { type: String, required: true },
  trackingNumber: { type: String },
  notes: { type: String },
}, { timestamps: true });

orderSchema.index({ customerId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });

export const Order = mongoose.model('Order', orderSchema);

