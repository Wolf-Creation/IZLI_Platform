import test from 'node:test';
import assert from 'node:assert/strict';
import { validateShippingSettings } from './service.js';

test('shipping settings trim the carrier and round the configured fee', () => {
  assert.deepEqual(
    validateShippingSettings({ carrierName: '  IZLI Delivery  ', deliveryFee: 7.1256, currency: 'TND' }),
    { carrierName: 'IZLI Delivery', deliveryFee: 7.126, currency: 'TND', configured: true },
  );
});

test('shipping settings reject empty carriers, negative fees, and unsupported currencies', () => {
  assert.throws(() => validateShippingSettings({ carrierName: ' ', deliveryFee: 4, currency: 'TND' }), /company name/);
  assert.throws(() => validateShippingSettings({ carrierName: 'Carrier', deliveryFee: -1, currency: 'TND' }), /non-negative/);
  assert.throws(() => validateShippingSettings({ carrierName: 'Carrier', deliveryFee: '', currency: 'TND' }), /non-negative/);
  assert.throws(() => validateShippingSettings({ carrierName: 'Carrier', deliveryFee: 4, currency: 'GBP' }), /supported currency/);
});
