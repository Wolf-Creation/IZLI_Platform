import type { Customer } from '../../entities'
import { api } from './api'

const CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    email: 'amayas.berber@example.com',
    firstName: 'Amayas',
    lastName: 'Berber',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&auto=format',
    phone: '+1 514 555 0101',
    location: 'Montréal, QC, Canada',
    segment: 'vip',
    ordersCount: 7,
    totalSpend: 1243,
    currency: 'EUR',
    createdAt: '2024-03-15T10:00:00Z',
    lastOrderAt: '2025-02-10T14:30:00Z',
    wishlistIds: ['prod-002', 'prod-004'],
    tags: [
      { id: 'tag-022', slug: 'vip', label: 'VIP' },
      { id: 'tag-002', slug: 'heritage', label: 'Heritage' },
    ],
  },
  {
    id: 'cust-002',
    email: 'kader.tamazight@example.com',
    firstName: 'Kader',
    lastName: 'Tamazight',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    segment: 'returning',
    ordersCount: 3,
    totalSpend: 487,
    currency: 'EUR',
    createdAt: '2024-06-01T10:00:00Z',
    lastOrderAt: '2025-03-05T11:00:00Z',
    wishlistIds: ['prod-001'],
    tags: [{ id: 'tag-006', slug: 'studio', label: 'Studio' }],
  },
  {
    id: 'cust-003',
    email: 'syphax.bellal@example.com',
    firstName: 'Syphax',
    lastName: 'Bellal',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&auto=format',
    phone: '+31 20 555 0102',
    location: 'Amsterdam, Netherlands',
    segment: 'vip',
    ordersCount: 12,
    totalSpend: 2890,
    currency: 'EUR',
    createdAt: '2023-12-01T10:00:00Z',
    lastOrderAt: '2025-06-03T17:45:00Z',
    wishlistIds: ['prod-003', 'prod-005', 'prod-006'],
    tags: [
      { id: 'tag-022', slug: 'vip', label: 'VIP' },
      { id: 'tag-009', slug: 'community-lab', label: 'Community Lab' },
    ],
  },
  {
    id: 'cust-004',
    email: 'nadia.oulhadj@example.com',
    firstName: 'Nadia',
    lastName: 'Oulhadj',
    location: 'London, United Kingdom',
    segment: 'new',
    ordersCount: 1,
    totalSpend: 217,
    currency: 'EUR',
    createdAt: '2025-05-15T10:00:00Z',
    lastOrderAt: '2025-05-20T09:15:00Z',
    wishlistIds: [],
    tags: [{ id: 'tag-004', slug: 'essentials', label: 'Essentials' }],
  },
]

export async function getCustomers(filters?: { segment?: string; search?: string }): Promise<Customer[]> {
  try {
    let results = await api.get<Customer[]>('/resources/customers')
    if (filters?.segment) results = results.filter(c => c.segment === filters.segment)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      results = results.filter(c =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      )
    }
    return results
  } catch {
    let results = [...CUSTOMERS]
    if (filters?.segment) results = results.filter(c => c.segment === filters.segment)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      results = results.filter(c =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      )
    }
    return Promise.resolve(results)
  }
}

export async function getCustomer(id: string): Promise<Customer | null> {
  try {
    return await api.get<Customer>(`/resources/customers/${id}`)
  } catch {
    return Promise.resolve(CUSTOMERS.find(c => c.id === id) ?? null)
  }
}

export async function updateCustomer(id: string, data: Partial<Customer>): Promise<Customer | null> {
  try {
    return await api.patch<Customer>(`/resources/customers/${id}`, data as Record<string, unknown>)
  } catch {
    const idx = CUSTOMERS.findIndex(c => c.id === id)
    if (idx === -1) return Promise.resolve(null)
    CUSTOMERS[idx] = { ...CUSTOMERS[idx], ...data }
    return Promise.resolve(CUSTOMERS[idx])
  }
}
