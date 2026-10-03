import { Customer } from '../customers/model.js';
import { Product } from '../products/model.js';
import { Order } from './model.js';
import { successResponse } from '../../utils/apiResponse.js';
import { getShippingSettings } from '../shipping/service.js';
import { validateCheckoutInput } from './validation.js';

function fail(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

function roundAmount(amount) {
  return Math.round((amount + Number.EPSILON) * 1000) / 1000;
}

async function saveCustomer(customerInput, currency) {
  let customer = await Customer.findOne({ email: customerInput.email });
  if (customer) return customer;

  const address = {
    label: 'Checkout',
    firstName: customerInput.firstName,
    lastName: customerInput.lastName,
    phone: customerInput.phone,
    line1: customerInput.addressLine1,
    line2: customerInput.addressLine2,
    city: customerInput.city,
    state: customerInput.governorate,
    postalCode: customerInput.postalCode,
    country: customerInput.country,
    isDefault: true,
  };

  if (!customer) {
    try {
      customer = await Customer.create({
        firstName: customerInput.firstName,
        lastName: customerInput.lastName,
        email: customerInput.email,
        phone: customerInput.phone,
        governorate: customerInput.governorate,
        status: 'guest',
        authProvider: 'email',
        currency,
        addresses: [address],
      });
    } catch (error) {
      if (error.code !== 11000) throw error;
      customer = await Customer.findOne({ email: customerInput.email });
      if (!customer) throw error;
      return customer;
    }
  }
  return customer;
}

export async function createCheckoutOrder(request, response) {
  const checkout = validateCheckoutInput(request.body);
  const shipping = await getShippingSettings();
  if (!shipping.carrierName || !shipping.configured) {
    fail('Shipping has not been configured yet. Please try again later.', 503);
  }

  const requestedIds = [...new Set(checkout.items.map((item) => item.productId))];
  const products = await Product.find({
    _id: { $in: requestedIds },
    status: 'published',
  }).select('name sku price currency sizes');
  const productsById = new Map(products.map((product) => [product._id.toString(), product]));
  if (productsById.size !== requestedIds.length) {
    fail('One or more products are no longer available.');
  }

  const currency = products[0]?.currency ?? shipping.currency;
  if (currency !== shipping.currency || products.some((product) => product.currency !== currency)) {
    fail('The currency of the cart does not match the configured shipping currency.');
  }

  const lineItems = checkout.items.map(({ productId, size, quantity }) => {
    const product = productsById.get(productId);
    if (!product) fail('One or more products are no longer available.');
    if (Array.isArray(product.sizes) && product.sizes.length && !product.sizes.some((item) => item.size === size)) {
      fail(`${product.name} is not available in size ${size}.`);
    }
    const price = Number(product.price);
    if (!Number.isFinite(price) || price < 0) {
      fail(`The price for ${product.name} is unavailable.`, 409);
    }
    return {
      productId: product._id,
      productName: product.name,
      sku: product.sku,
      size,
      qty: quantity,
      unitPrice: price,
      currency,
    };
  });

  const subtotal = roundAmount(lineItems.reduce((total, item) => total + item.unitPrice * item.qty, 0));
  const shippingCost = roundAmount(shipping.deliveryFee);
  const total = roundAmount(subtotal + shippingCost);
  const customer = await saveCustomer(checkout.customer, currency);
  const address = [
    checkout.customer.addressLine1,
    checkout.customer.addressLine2,
    checkout.customer.city,
    checkout.customer.governorate,
    checkout.customer.postalCode,
    checkout.customer.country,
  ].filter(Boolean).join(', ');

  const order = await Order.create({
    customerId: customer._id,
    customerName: `${checkout.customer.firstName} ${checkout.customer.lastName}`,
    customerEmail: checkout.customer.email,
    customerPhone: checkout.customer.phone,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: checkout.paymentMethod,
    lineItems,
    subtotal,
    shippingCost,
    total,
    currency,
    shippingAddress: address,
    shippingCarrier: shipping.carrierName,
  });

  return response.status(201).json(successResponse('Order created successfully.', {
    ...order.toObject(),
    id: order._id.toString(),
  }));
}

export async function listOrders(_request, response) {
  const orders = await Order.find().sort({ createdAt: -1 }).limit(250).lean();
  return response.json(successResponse('Orders retrieved successfully.', {
    items: orders.map((order) => ({ ...order, id: order._id.toString() })),
    total: orders.length,
  }));
}
