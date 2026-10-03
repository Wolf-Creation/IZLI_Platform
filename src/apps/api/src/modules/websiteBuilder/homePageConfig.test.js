import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_HOME_PAGE_CONFIG, normalizeHomePageConfig } from './homePageConfig.js';

test('home page config exposes only the five implemented sections by default', () => {
  assert.deepEqual(DEFAULT_HOME_PAGE_CONFIG.sections.map(section => section.type), [
    'hero', 'new-releases', 'tops', 'bottoms', 'keeper-circle',
  ]);
  assert.ok(DEFAULT_HOME_PAGE_CONFIG.sections.every(section => section.enabled));
});

test('home page config filters unknown sections, normalizes content, and makes duplicate IDs unique', () => {
  const config = normalizeHomePageConfig({
    sections: [
      { id: 'tops', type: 'tops', title: 'Custom tops', description: 'Edited copy' },
      { id: 'tops', type: 'tops', enabled: false },
      { id: 'fake', type: 'unsupported' },
    ],
  });

  assert.equal(config.sections.length, 2);
  assert.deepEqual(config.sections.map(section => section.id), ['tops', 'tops-2']);
  assert.equal(config.sections[0].title, 'Custom tops');
  assert.equal(config.sections[1].enabled, false);
  assert.equal(config.sections[1].title, 'Tops');
});