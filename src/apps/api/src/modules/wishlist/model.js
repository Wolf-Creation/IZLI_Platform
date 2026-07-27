import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  name: { type: String, default: 'My Wishlist', trim: true },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

wishlistSchema.index({ customerId: 1 });

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);

