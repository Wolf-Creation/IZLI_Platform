import test from 'node:test';
import assert from 'node:assert/strict';
import { OFFICIAL_COLLECTIONS } from './officialCollections.js';
import { normalizeSlug, validateCollectionInput } from './validator.js';

test('official collection seed contains the four fixed, image-free slugs in display order', () => {
  assert.deepEqual(OFFICIAL_COLLECTIONS.map(collection => collection.slug), ['legacy', 'studio', 'essentials', 'community-lab']);
  assert.deepEqual(OFFICIAL_COLLECTIONS.map(collection => collection.displayOrder), [1, 2, 3, 4]);
  for (const collection of OFFICIAL_COLLECTIONS) {
    assert.equal(collection.coverImage, null);
    assert.equal(collection.heroImage, null);
    assert.equal(collection.isActive, true);
    assert.equal(collection.isFeatured, true);
  }
});

test('slugs are normalized from collection names', () => {
  assert.equal(normalizeSlug('Community Lab'), 'community-lab');
  assert.equal(validateCollectionInput({ name: 'Community Lab', type: 'COMMUNITY_LAB', tagline: 'Together', shortDescription: 'Short', displayOrder: '4' }).slug, 'community-lab');
});

test('collection validation rejects arbitrary types and invalid orders', () => {
  assert.throws(() => validateCollectionInput({ name: 'Invalid', slug: 'invalid', type: 'OTHER', tagline: 'Tagline', shortDescription: 'Short', displayOrder: 1 }));
  assert.throws(() => validateCollectionInput({ name: 'Invalid', type: 'LEGACY', tagline: 'Tagline', shortDescription: 'Short', displayOrder: 'not-a-number' }));
  assert.throws(() => validateCollectionInput({ name: 'Missing order', type: 'LEGACY', tagline: 'Tagline', shortDescription: 'Short' }));
});

test('partial collection updates accept real booleans and reject string booleans', () => {
  assert.equal(validateCollectionInput({ isActive: false }, { partial: true }).isActive, false);
  assert.throws(() => validateCollectionInput({ isActive: 'false' }, { partial: true }));
});

test('partial updates cannot clear required text fields', () => {
  assert.throws(() => validateCollectionInput({ tagline: '   ' }, { partial: true }));
});

test('collection updates preserve valid Cloudinary asset metadata beside legacy image URLs', () => {
  const mediaAsset = {
    field: 'coverImage',
    url: 'https://res.cloudinary.com/demo/image/upload/v123/izli/collection.jpg',
    publicId: 'izli/collection',
    resourceType: 'image',
    format: 'jpg',
    width: 1600,
    height: 1200,
    bytes: 245000,
  };

  const result = validateCollectionInput({ coverImage: mediaAsset.url, mediaAssets: [mediaAsset] }, { partial: true });

  assert.equal(result.coverImage, mediaAsset.url);
  assert.deepEqual(result.mediaAssets, [mediaAsset]);
  assert.throws(() => validateCollectionInput({ mediaAssets: [{ ...mediaAsset, field: 'unknown' }] }, { partial: true }));
});