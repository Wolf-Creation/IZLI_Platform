import type { Order } from '../../entities'

const ORDERS: Order[] = [
  {
    id: 'ord-001',
    customerId: 'cust-001',
    status: 'delivered',
    paymentStatus: 'paid',
    lineItems: [
      { productId: 'prod-001', productName: 'Tifinagh Frame Tee', sku: 'IZL-HRT-TEE-001', size: 'M', qty: 1, unitPrice: 89, currency: 'EUR' },
      { productId: 'prod-005', productName: 'Medina Weave Trousers', sku: 'IZL-HRT-TRO-001', size: 'M', qty: 1, unitPrice: 165, currency: 'EUR' },
    ],
    subtotal: 254,
    shippingCost: 0,
    total: 254,
    currency: 'EUR',
    shippingAddress: '42 Avenue des Champs, Montréal, QC H3B 2Y7, Canada',
    trackingNumber: 'LY123456789FR',
    createdAt: '2025-02-10T14:30:00Z',
    updatedAt: '2025-02-18T09:00:00Z',
  },
  {
    id: 'ord-002',
    customerId: 'cust-002',
    status: 'shipped',
    paymentStatus: 'paid',
    lineItems: [
      { productId: 'prod-002', productName: 'Woven Sahara Overshirt', sku: 'IZL-HRT-OVR-001', size: 'L', qty: 1, unitPrice: 195, currency: 'EUR' },
    ],
    subtotal: 195,
    shippingCost: 8,
    total: 203,
    currency: 'EUR',
    shippingAddress: '17 Rue de Rivoli, Paris 75001, France',
    trackingNumber: 'MA987654321FR',
    createdAt: '2025-03-05T11:00:00Z',
    updatedAt: '2025-03-09T16:00:00Z',
  },
  {
    id: 'ord-003',
    customerId: 'cust-004',
    status: 'confirmed',
    paymentStatus: 'paid',
    lineItems: [
      { productId: 'prod-003', productName: 'Atlas Symbol Boxy Tee', sku: 'IZL-ESS-TEE-001', size: 'S', qty: 2, unitPrice: 65, currency: 'EUR' },
      { productId: 'prod-006', productName: 'Community Pattern Tee — Vol. 1', sku: 'IZL-LAB-TEE-001', size: 'S', qty: 1, unitPrice: 75, currency: 'EUR' },
    ],
    subtotal: 205,
    shippingCost: 12,
    total: 217,
    currency: 'EUR',
    shippingAddress: '8 Brick Lane, London E1 6RF, United Kingdom',
    createdAt: '2025-05-20T09:15:00Z',
    updatedAt: '2025-05-20T09:15:00Z',
  },
  {
    id: 'ord-004',
    customerId: 'cust-003',
    status: 'pending',
    paymentStatus: 'pending',
    lineItems: [
      { productId: 'prod-004', productName: 'Berber Grid Track Jacket', sku: 'IZL-STU-JKT-001', size: 'XL', qty: 1, unitPrice: 245, currency: 'EUR' },
    ],
    subtotal: 245,
    shippingCost: 0,
    total: 245,
    currency: 'EUR',
    shippingAddress: 'Herengracht 420, 1017 BZ Amsterdam, Netherlands',
    notes: 'Please gift wrap',
    createdAt: '2025-06-03T17:45:00Z',
    updatedAt: '2025-06-03T17:45:00Z',
  },
]

export async function getOrders(filters?: { status?: string; customerId?: string }): Promise<Order[]> {
  let results = [...ORDERS]
  if (filters?.status) results = results.filter(o => o.status === filters.status)
  if (filters?.customerId) results = results.filter(o => o.customerId === filters.customerId)
  return Promise.resolve(results)
}

export async function getOrder(id: string): Promise<Order | null> {
  return Promise.resolve(ORDERS.find(o => o.id === id) ?? null)
}

export async function updateOrderStatus(id: string, status: string): Promise<Order | null> {
  const idx = ORDERS.findIndex(o => o.id === id)
  if (idx === -1) return Promise.resolve(null)
  ORDERS[idx] = { ...ORDERS[idx], status: status as Order['status'], updatedAt: new Date().toISOString() }
  return Promise.resolve(ORDERS[idx])
}
