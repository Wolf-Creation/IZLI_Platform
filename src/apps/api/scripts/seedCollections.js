import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { OFFICIAL_COLLECTIONS } from '../src/modules/collections/officialCollections.js';
import '../src/modules/products/model.js';
import '../src/modules/collections/model.js';
import '../src/modules/keepers/model.js';
import '../src/modules/legacy/model.js';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(scriptDirectory, '../.env') });

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not set');
  process.exitCode = 1;
} else {
  try {
    await mongoose.connect(mongoUri);
    const Collection = mongoose.model('Collection');
    await Collection.createIndexes();

    console.log('IZLI Collections Seed\n');
    for (const collection of OFFICIAL_COLLECTIONS) {
      const { coverImage, heroImage, ...seedFields } = collection;
      await Collection.findOneAndUpdate(
        { slug: collection.slug },
        { $set: seedFields, $setOnInsert: { coverImage, heroImage } },
        { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
      );
      console.log(`✓ ${collection.name}`);
    }

    const Product = mongoose.model('Product');
    const Keeper = mongoose.model('Keeper');
    const Legacy = mongoose.model('Legacy');
    const officialBySlug = new Map(await Collection.find({ slug: { $in: OFFICIAL_COLLECTIONS.map(item => item.slug) } }).lean().then(items => items.map(item => [item.slug, item])));
    const slugForUniverse = { Heritage: 'legacy', Essentials: 'essentials', Studio: 'studio', 'Community Lab': 'community-lab' };
    const legacyCollections = await Collection.find({ type: { $exists: false } }).lean();
    for (const legacyCollection of legacyCollections) {
      const fallbackSlug = slugForUniverse[legacyCollection.universe];
      const fallbackTarget = fallbackSlug ? officialBySlug.get(fallbackSlug) : null;
      const linkedProducts = await Product.find({
        $or: [
          { collectionId: legacyCollection._id },
          { collectionIds: legacyCollection._id },
          { _id: { $in: legacyCollection.productIds ?? [] } },
        ],
      }).select('_id universe').lean();

      for (const product of linkedProducts) {
        const productSlug = slugForUniverse[product.universe];
        const target = (productSlug && officialBySlug.get(productSlug)) || fallbackTarget;
        if (!target) continue;
        await Product.updateOne({ _id: product._id }, { $set: { collectionId: target._id, collectionIds: [] } });
        await Collection.updateOne({ _id: target._id }, { $addToSet: { productIds: product._id } });
      }

      for (const Model of [Keeper, Legacy]) {
        const linkedDocuments = await Model.find({ collectionIds: legacyCollection._id }).select('_id').lean();
        for (const linkedDocument of linkedDocuments) {
          if (fallbackTarget) await Model.updateOne({ _id: linkedDocument._id }, { $addToSet: { collectionIds: fallbackTarget._id } });
          await Model.updateOne({ _id: linkedDocument._id }, { $pull: { collectionIds: legacyCollection._id } });
        }
      }
    }
    if (legacyCollections.length) {
      await Collection.deleteMany({ _id: { $in: legacyCollections.map(collection => collection._id) } });
    }
    await Product.updateMany({ collectionId: { $exists: true, $ne: null } }, { $set: { collectionIds: [] } });
    console.log(`\n${OFFICIAL_COLLECTIONS.length} collections synchronized successfully.`);
  } catch (error) {
    console.error('Failed to seed collections:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}