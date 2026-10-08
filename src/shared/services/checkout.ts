import { api } from './api'

export interface CheckoutCustomer {
  firstName: string
  lastName: string
  email?: string
  phone: string
  phone2?: string
  addressLine1: string
  addressLine2: string
  city: string
  governorate: string
  postalCode: string
  country: string
}

export interface CheckoutOrder {
  id: string
  customerName: string
  customerEmail?: string
  customerPhone: string
  customerPhone2?: string
  status: string
  paymentStatus: string
  paymentMethod: 'cash_on_delivery'
  lineItems: Array<{
    productId: string
    productName: string
    sku: string
    size: string
    qty: number
    unitPrice: number
    currency: string
  }>
  subtotal: number
  shippingCost: number
  shippingCarrier: string
  total: number
  currency: string
  shippingAddress: string
  createdAt: string
}

export function createCheckoutOrder(input: {
  customer: CheckoutCustomer
  items: Array<{ productId: string; size: string; quantity: number }>
  paymentMethod: 'cash_on_delivery'
}) {
  return api.post<CheckoutOrder>('/orders/checkout', input)
}
