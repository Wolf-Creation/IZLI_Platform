import { GlobalSetting } from '../admin/model.js';

export const SHIPPING_SETTINGS_KEY = 'shipping-settings';
export const DEFAULT_SHIPPING_SETTINGS = {
  carrierName: '',
  deliveryFee: 0,
  currency: 'TND',
  configured: false,
};
const currencies = new Set(['TND', 'EUR', 'USD', 'MAD', 'DZD']);

export function validateShippingSettings(input) {
  const carrierName = typeof input?.carrierName === 'string' ? input.carrierName.trim() : '';
  const rawDeliveryFee = input?.deliveryFee;
  const deliveryFee = Number(input?.deliveryFee);
  const currency = typeof input?.currency === 'string' ? input.currency : '';
  if (!carrierName || carrierName.length > 100) {
    const error = new Error('Enter a delivery company name (maximum 100 characters).');
    error.statusCode = 400;
    throw error;
  }
  if ((typeof rawDeliveryFee === 'string' && !rawDeliveryFee.trim()) || !Number.isFinite(deliveryFee) || deliveryFee < 0 || deliveryFee > 100000) {
    const error = new Error('Enter a valid non-negative delivery fee.');
    error.statusCode = 400;
    throw error;
  }
  if (!currencies.has(currency)) {
    const error = new Error('Select a supported currency.');
    error.statusCode = 400;
    throw error;
  }
  return { carrierName, deliveryFee: Math.round(deliveryFee * 1000) / 1000, currency, configured: true };
}

export async function getShippingSettings() {
  const setting = await GlobalSetting.findOne({ key: SHIPPING_SETTINGS_KEY }).lean();
  if (!setting?.value || typeof setting.value !== 'object') return DEFAULT_SHIPPING_SETTINGS;
  const carrierName = typeof setting.value.carrierName === 'string' ? setting.value.carrierName.trim() : '';
  const deliveryFee = Number(setting.value.deliveryFee);
  const currency = currencies.has(setting.value.currency) ? setting.value.currency : 'TND';
  return {
    carrierName,
    deliveryFee: Number.isFinite(deliveryFee) && deliveryFee >= 0 ? deliveryFee : 0,
    currency,
    configured: Boolean(carrierName),
  };
}

export async function saveShippingSettings(input, updatedBy) {
  const value = validateShippingSettings(input);
  await GlobalSetting.findOneAndUpdate(
    { key: SHIPPING_SETTINGS_KEY },
    {
      $set: {
        value,
        group: 'commerce',
        description: 'Default delivery carrier and fee used for checkout orders.',
        updatedBy,
      },
    },
    { upsert: true, new: true, runValidators: true },
  );
  return value;
}
