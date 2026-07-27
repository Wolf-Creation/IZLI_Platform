/**
 * scripts/initCollections.js
 *
 * One-shot script: connects to MongoDB Atlas and creates every collection
 * explicitly so they appear in the Atlas UI even before any document is inserted.
 *
 * Usage (from src/apps/api/):
 *   node scripts/initCollections.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

// ── Import every model so Mongoose registers them ───────────────────────────
import '../src/modules/auth/model.js';
import '../src/modules/users/model.js';
import '../src/modules/customers/model.js';
import '../src/modules/products/model.js';
import '../src/modules/collections/model.js';
import '../src/modules/orders/model.js';
import '../src/modules/cart/model.js';
import '../src/modules/wishlist/model.js';
import '../src/modules/payments/model.js';
import '../src/modules/categories/model.js';
import '../src/modules/stories/model.js';
import '../src/modules/heritage/model.js';
import '../src/modules/community/model.js';
import '../src/modules/events/model.js';
import '../src/modules/keepers/model.js';
import '../src/modules/notifications/model.js';
import '../src/modules/uploads/model.js';
import '../src/modules/admin/model.js';
import '../src/modules/analytics/model.js';
import '../src/modules/search/model.js';

// ── Connect & create collections ─────────────────────────────────────────────
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌  MONGODB_URI is not set in .env');
  process.exit(1);
}

console.log('⏳  Connecting to MongoDB Atlas…');
await mongoose.connect(uri);
console.log('✅  Connected.');

const modelNames = mongoose.modelNames();
console.log(`\n📦  Creating ${modelNames.length} collections:\n`);

const results = await Promise.allSettled(
  modelNames.map(async (name) => {
    const Model = mongoose.model(name);
    await Model.createCollection();
    return name;
  })
);

for (const r of results) {
  if (r.status === 'fulfilled') {
    console.log(`  ✓  ${r.value}`);
  } else {
    console.error(`  ✗  Error: ${r.reason?.message}`);
  }
}

await mongoose.disconnect();
console.log('\n🎉  Done — all collections are ready in Atlas.');
