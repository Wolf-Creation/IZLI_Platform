import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_HOME_PAGE_CONFIG, normalizeHomePageConfig } from './homePageConfig.js';

test('home page config exposes only the five implemented sections by default', () => {
  assert.deepEqual(DEFAULT_HOME_PAGE_CONFIG.sections.map(section => section.type), [
    'hero', 'new-releases', 'tops', 'bottoms', 'keeper-circle',
  ]);
  assert.ok(DEFAULT_HOME_PAGE_CONFIG.sections.every(section => section.enabled));
  assert.deepEqual(DEFAULT_HOME_PAGE_CONFIG.sections[0].productIds, []);
  assert.equal(DEFAULT_HOME_PAGE_CONFIG.sections[0].productCount, 3);
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

test('hero product selection preserves order and normalizes product count', () => {
  const config = normalizeHomePageConfig({
    sections: [
      { id: 'hero', type: 'hero', productIds: ['product-2', 'product-1', 'product-2', null, ''], productCount: 9 },
      { id: 'tops', type: 'tops', productIds: ['ignored'], productCount: 2 },
    ],
  });

  assert.deepEqual(config.sections[0].productIds, ['product-2', 'product-1']);
  assert.equal(config.sections[0].productCount, 3);
  assert.deepEqual(config.sections[1].productIds, ['ignored']);
  assert.equal('productCount' in config.sections[1], false);

  const minimumCount = normalizeHomePageConfig({
    sections: [{ id: 'hero', type: 'hero', productCount: 0 }],
  });
  assert.equal(minimumCount.sections[0].productCount, 1);
});

test('hero background image is normalized and retained in the saved configuration', () => {
  const config = normalizeHomePageConfig({
    sections: [{ id: 'hero', type: 'hero', backgroundImage: '  https://cdn.example.com/hero.jpg  ' }],
  });

  assert.equal(config.sections[0].backgroundImage, 'https://cdn.example.com/hero.jpg');
  assert.equal(normalizeHomePageConfig({ sections: [{ id: 'hero', type: 'hero' }] }).sections[0].backgroundImage, '');
});

test('hero overlay settings use supported positions and clamp opacity', () => {
  const config = normalizeHomePageConfig({
    sections: [
      { id: 'hero', type: 'hero', overlayPosition: 'center', overlayOpacity: 72 },
      { id: 'hero-invalid', type: 'hero', overlayPosition: 'diagonal', overlayOpacity: 140 },
      { id: 'hero-low', type: 'hero', overlayOpacity: -20 },
    ],
  });

  assert.equal(config.sections[0].overlayPosition, 'center');
  assert.equal(config.sections[0].overlayOpacity, 72);
  assert.equal(config.sections[1].overlayPosition, 'left');
  assert.equal(config.sections[1].overlayOpacity, 100);
  assert.equal(config.sections[2].overlayOpacity, 0);
});

test('tops and bottoms preserve explicit product selection and order', () => {
  const config = normalizeHomePageConfig({
    sections: [
      { id: 'tops', type: 'tops', productIds: ['top-2', 'top-1', 'top-2', null, ''] },
      { id: 'bottoms', type: 'bottoms', productIds: [] },
      { id: 'new-releases', type: 'new-releases', productIds: ['ignored'] },
    ],
  });

  assert.deepEqual(config.sections[0].productIds, ['top-2', 'top-1']);
  assert.deepEqual(config.sections[1].productIds, []);
  assert.equal('productIds' in config.sections[2], false);
});

test('keeper circle config keeps three editable benefits and defaults omitted details', () => {
  const config = normalizeHomePageConfig({
    sections: [{
      id: 'keeper-circle',
      type: 'keeper-circle',
      description: 'Custom Keeper Circle intro',
      benefits: [
        { eyebrow: 'EARLY ACCESS', titleLead: 'First in line.', titleHighlight: 'Every time.', description: 'Custom benefit copy', points: ['Point one'] },
      ],
    }],
  });

  assert.equal(config.sections[0].description, 'Custom Keeper Circle intro');
  assert.equal(config.sections[0].benefits.length, 3);
  assert.equal(config.sections[0].benefits[0].eyebrow, 'EARLY ACCESS');
  assert.equal(config.sections[0].benefits[0].points[0], 'Point one');
  assert.equal(config.sections[0].benefits[0].points.length, 3);
  assert.equal(config.sections[0].benefits[1].eyebrow, 'EXCLUSIVE EXPERIENCES');
});