const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const objectIdPattern = /^[a-f\d]{24}$/i;

export function validateCheckoutInput(input) {
  const customer = input?.customer ?? {};
  const requiredFields = [
    ['firstName', customer.firstName],
    ['lastName', customer.lastName],
    ['email', customer.email],
    ['phone', customer.phone],
    ['addressLine1', customer.addressLine1],
    ['city', customer.city],
    ['governorate', customer.governorate],
    ['postalCode', customer.postalCode],
    ['country', customer.country],
  ];
  const missing = requiredFields
    .filter(([, value]) => typeof value !== 'string' || !value.trim())
    .map(([field]) => field);

  if (missing.length) {
    const error = new Error(`Missing required checkout fields: ${missing.join(', ')}`);
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = customer.email.trim().toLowerCase();
  if (!emailPattern.test(normalizedEmail)) {
    const error = new Error('Enter a valid email address.');
    error.statusCode = 400;
    throw error;
  }

  if (input.paymentMethod && input.paymentMethod !== 'cash_on_delivery') {
    const error = new Error('Only cash on delivery is currently available.');
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(input.items) || input.items.length === 0 || input.items.length > 50) {
    const error = new Error('Your cart must contain between 1 and 50 items.');
    error.statusCode = 400;
    throw error;
  }

  const items = input.items.map((item) => {
    const productId = String(item?.productId ?? '');
    const quantity = Number(item?.quantity);
    const size = String(item?.size ?? '').trim();
    if (!objectIdPattern.test(productId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 100 || !size) {
      const error = new Error('One or more cart items are invalid.');
      error.statusCode = 400;
      throw error;
    }
    return { productId, quantity, size };
  });

  return {
    customer: {
      firstName: customer.firstName.trim(),
      lastName: customer.lastName.trim(),
      email: normalizedEmail,
      phone: customer.phone.trim(),
      addressLine1: customer.addressLine1.trim(),
      addressLine2: typeof customer.addressLine2 === 'string' ? customer.addressLine2.trim() : '',
      city: customer.city.trim(),
      governorate: customer.governorate.trim(),
      postalCode: customer.postalCode.trim(),
      country: customer.country.trim(),
    },
    items,
    paymentMethod: 'cash_on_delivery',
  };
}
