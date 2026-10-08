import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCheckoutInput } from './validation.js';

const checkoutInput = {
  customer: {
    firstName: '  Lina ',
    lastName: 'Ben Ali ',
    email: ' LINA@example.com ',
    phone: '+216 20 000 000',
    phone2: ' +216 50 000 000 ',
    addressLine1: ' 10 Rue de Tunis ',
    addressLine2: '',
    city: 'Tunis',
    governorate: 'Tunis',
    postalCode: '1000',
    country: 'Tunisia',
  },
  items: [{ productId: '65a123456789012345678901', size: 'M', quantity: 2 }],
};

test('valid checkout details are trimmed and payment defaults to cash on delivery', () => {
  const result = validateCheckoutInput(checkoutInput);
  assert.equal(result.customer.firstName, 'Lina');
  assert.equal(result.customer.email, 'lina@example.com');
  assert.equal(result.customer.phone2, '+216 50 000 000');
  assert.equal(result.items[0].quantity, 2);
  assert.equal(result.paymentMethod, 'cash_on_delivery');
});

test('checkout accepts an optional second phone and postal code', () => {
  const customer = { ...checkoutInput.customer };
  delete customer.phone2;
  delete customer.postalCode;
  const result = validateCheckoutInput({ ...checkoutInput, customer });
  assert.equal(result.customer.phone2, '');
  assert.equal(result.customer.postalCode, '');
});

test('checkout accepts orders without a customer email', () => {
  const customer = { ...checkoutInput.customer };
  delete customer.email;
  const result = validateCheckoutInput({ ...checkoutInput, customer });
  assert.equal(result.customer.email, '');
});

test('checkout rejects an invalid email when one is provided', () => {
  assert.throws(() => validateCheckoutInput({
    ...checkoutInput,
    customer: { ...checkoutInput.customer, email: 'not-an-email' },
  }), {
    message: 'Enter a valid email address.',
  });
});

test('checkout rejects missing customer details', () => {
  assert.throws(() => validateCheckoutInput({ ...checkoutInput, customer: {} }), {
    message: /Missing required checkout fields/,
  });
});

test('checkout rejects unsupported payment methods and malformed cart items', () => {
  assert.throws(() => validateCheckoutInput({ ...checkoutInput, paymentMethod: 'card' }), {
    message: /Only cash on delivery/,
  });
  assert.throws(() => validateCheckoutInput({
    ...checkoutInput,
    items: [{ productId: 'not-an-object-id', size: 'M', quantity: 1 }],
  }), {
    message: /cart items are invalid/,
  });
});
