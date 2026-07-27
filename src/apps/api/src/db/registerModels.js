/**
 * registerModels.js
 * Called explicitly after MongoDB connects so every Mongoose model is
 * registered before any query runs and all indexes are known to the driver.
 */

// Auth & Users
import '../modules/auth/model.js';
import '../modules/users/model.js';

// Customers
import '../modules/customers/model.js';

// Commerce
import '../modules/products/model.js';
import '../modules/collections/model.js';
import '../modules/orders/model.js';
import '../modules/cart/model.js';
import '../modules/wishlist/model.js';
import '../modules/payments/model.js';

// Content
import '../modules/categories/model.js';
import '../modules/stories/model.js';
import '../modules/heritage/model.js';

// Community
import '../modules/community/model.js';
import '../modules/events/model.js';

// Legacy
import '../modules/keepers/model.js';
import '../modules/notifications/model.js';

// Production & Assets
import '../modules/uploads/model.js';

// Admin & Cross-cutting
import '../modules/admin/model.js';
import '../modules/analytics/model.js';
import '../modules/search/model.js';

import mongoose from 'mongoose';

export function registerModels() {
  const count = mongoose.modelNames().length;
  console.log(`[DB] ${count} Mongoose models registered.`);
}
