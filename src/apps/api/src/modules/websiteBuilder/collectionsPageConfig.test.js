import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_COLLECTIONS_PAGE_CONFIG, normalizeCollectionsPageConfig } from './collectionsPageConfig.js';

test('collections page config defaults to the four official collection slugs', () => {
  assert.deepEqual(DEFAULT_COLLECTIONS_PAGE_CONFIG.collectionOrder, ['legacy', 'studio', 'essentials', 'community-lab']);
  assert.equal(DEFAULT_COLLECTIONS_PAGE_CONFIG.columns, 4);
  assert.equal(DEFAULT_COLLECTIONS_PAGE_CONFIG.showTagline, true);
});

test('collections page config removes repeated slugs and constrains display columns', () => {
  const config = normalizeCollectionsPageConfig({
    collectionOrder: ['studio', 'legacy', 'studio'],
    visibleCollectionSlugs: ['legacy', 'legacy'],
    columns: 4,
    showTagline: false,
  });
  assert.deepEqual(config.collectionOrder, ['studio', 'legacy']);
  assert.deepEqual(config.visibleCollectionSlugs, ['legacy']);
  assert.equal(config.columns, 4);
  assert.equal(config.showTagline, false);
});