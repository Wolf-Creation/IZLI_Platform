import type { Product } from '../../entities'
import { api } from './api'

const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    sku: 'IZL-HRT-TEE-001',
    name: 'Tifinagh Frame Tee',
    universe: 'Heritage',
    status: 'published',
    price: 89,
    currency: 'EUR',
    description: 'A heavyweight organic cotton tee featuring a bold Tifinagh script frame screen-printed across the chest. Each character is drawn from traditional Amazigh inscriptions found across North Africa.',
    coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop&auto=format',
    ],
    sizes: [
      { size: 'XS', availability: 'available', stock: 12 },
      { size: 'S', availability: 'available', stock: 20 },
      { size: 'M', availability: 'low', stock: 4 },
      { size: 'L', availability: 'available', stock: 15 },
      { size: 'XL', availability: 'sold-out', stock: 0 },
    ],
    materials: ['100% Organic Cotton (220gsm)'],
    careInstructions: ['Machine wash cold', 'Do not tumble dry', 'Iron inside out'],
    relatedStoryId: 'story-001',
    collectionIds: ['col-001'],
    tags: [{ id: 'tag-001', slug: 'tifinagh', label: 'Tifinagh' }, { id: 'tag-002', slug: 'heritage', label: 'Heritage' }],
    createdAt: '2025-01-10T10:00:00Z',
    publishedAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'prod-002',
    sku: 'IZL-HRT-OVR-001',
    name: 'Woven Sahara Overshirt',
    universe: 'Heritage',
    status: 'published',
    price: 195,
    currency: 'EUR',
    description: 'Crafted from hand-loomed Saharan wool by artisan weavers in the Draa Valley, this overshirt blends traditional desert weaving techniques with a modern silhouette.',
    coverImageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&auto=format',
    ],
    sizes: [
      { size: 'S', availability: 'available', stock: 8 },
      { size: 'M', availability: 'available', stock: 10 },
      { size: 'L', availability: 'low', stock: 3 },
      { size: 'XL', availability: 'available', stock: 7 },
    ],
    materials: ['85% Saharan Wool', '15% Organic Cotton'],
    careInstructions: ['Dry clean only', 'Store folded, not hung'],
    collectionIds: ['col-001', 'col-002'],
    tags: [{ id: 'tag-003', slug: 'woven', label: 'Woven' }, { id: 'tag-002', slug: 'heritage', label: 'Heritage' }],
    createdAt: '2025-01-15T10:00:00Z',
    publishedAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'prod-003',
    sku: 'IZL-ESS-TEE-001',
    name: 'Atlas Symbol Boxy Tee',
    universe: 'Essentials',
    status: 'published',
    price: 65,
    currency: 'EUR',
    description: 'An oversized boxy-cut tee in garment-dyed cotton, embroidered with a single Atlas mountain symbol at the left chest. Minimal and wearable every day.',
    coverImageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop&auto=format',
    ],
    sizes: [
      { size: 'XS', availability: 'available', stock: 18 },
      { size: 'S', availability: 'available', stock: 25 },
      { size: 'M', availability: 'available', stock: 30 },
      { size: 'L', availability: 'available', stock: 20 },
      { size: 'XL', availability: 'low', stock: 5 },
    ],
    materials: ['100% Garment-dyed Cotton (200gsm)'],
    careInstructions: ['Machine wash cold', 'Tumble dry low'],
    collectionIds: ['col-003'],
    tags: [{ id: 'tag-004', slug: 'essentials', label: 'Essentials' }, { id: 'tag-005', slug: 'boxy', label: 'Boxy Fit' }],
    createdAt: '2025-02-01T10:00:00Z',
    publishedAt: '2025-02-15T09:00:00Z',
  },
  {
    id: 'prod-004',
    sku: 'IZL-STU-JKT-001',
    name: 'Berber Grid Track Jacket',
    universe: 'Studio',
    status: 'published',
    price: 245,
    currency: 'EUR',
    description: 'A structured track jacket with geometric Berber grid embroidery across the back panel, rendered in recycled polyester twill with a matte finish.',
    coverImageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=1000&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=1000&fit=crop&auto=format',
    ],
    sizes: [
      { size: 'S', availability: 'available', stock: 6 },
      { size: 'M', availability: 'available', stock: 9 },
      { size: 'L', availability: 'available', stock: 8 },
      { size: 'XL', availability: 'available', stock: 5 },
    ],
    materials: ['100% Recycled Polyester Twill'],
    careInstructions: ['Machine wash cold', 'Do not iron embroidery', 'Hang to dry'],
    collectionIds: ['col-002'],
    tags: [{ id: 'tag-006', slug: 'studio', label: 'Studio' }, { id: 'tag-007', slug: 'berber', label: 'Berber' }],
    createdAt: '2025-03-01T10:00:00Z',
    publishedAt: '2025-03-15T09:00:00Z',
  },
  {
    id: 'prod-005',
    sku: 'IZL-HRT-TRO-001',
    name: 'Medina Weave Trousers',
    universe: 'Heritage',
    status: 'published',
    price: 165,
    currency: 'EUR',
    description: 'Wide-leg trousers woven on traditional handlooms in the medinas of Fez. The distinctive diagonal weave reflects centuries-old Moroccan craft traditions.',
    coverImageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop&auto=format',
    ],
    sizes: [
      { size: 'S', availability: 'available', stock: 10 },
      { size: 'M', availability: 'available', stock: 12 },
      { size: 'L', availability: 'low', stock: 4 },
      { size: 'XL', availability: 'available', stock: 8 },
    ],
    materials: ['60% Linen', '40% Cotton (hand-loomed)'],
    careInstructions: ['Hand wash cold', 'Lay flat to dry', 'Iron on medium heat'],
    collectionIds: ['col-001'],
    tags: [{ id: 'tag-002', slug: 'heritage', label: 'Heritage' }, { id: 'tag-008', slug: 'linen', label: 'Linen' }],
    createdAt: '2025-01-20T10:00:00Z',
    publishedAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'prod-006',
    sku: 'IZL-LAB-TEE-001',
    name: 'Community Pattern Tee — Vol. 1',
    universe: 'Community Lab',
    status: 'published',
    price: 75,
    currency: 'EUR',
    description: 'The first edition of our Community Lab series, featuring a Zellij-inspired pattern co-designed with community members from our Open Call. A portion of proceeds funds future community projects.',
    coverImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop&auto=format',
    ],
    sizes: [
      { size: 'XS', availability: 'available', stock: 20 },
      { size: 'S', availability: 'available', stock: 30 },
      { size: 'M', availability: 'available', stock: 35 },
      { size: 'L', availability: 'available', stock: 25 },
      { size: 'XL', availability: 'available', stock: 15 },
    ],
    materials: ['100% Organic Ring-spun Cotton'],
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    relatedChallengeId: 'chal-001',
    collectionIds: ['col-004'],
    tags: [{ id: 'tag-009', slug: 'community-lab', label: 'Community Lab' }, { id: 'tag-010', slug: 'zellij', label: 'Zellij' }],
    createdAt: '2025-04-01T10:00:00Z',
    publishedAt: '2025-04-15T09:00:00Z',
  },
]

export async function getProducts(filters?: { universe?: string; status?: string; search?: string }): Promise<Product[]> {
  try {
    const remote = await api.get<Product[]>('/resources/products')
    let results = [...remote]
    if (filters?.universe) {
      results = results.filter(p => p.universe === filters.universe)
    }
    if (filters?.status) {
      results = results.filter(p => p.status === filters.status)
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      results = results.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    return results
  } catch {
    let results = [...PRODUCTS]
  if (filters?.universe) {
    results = results.filter(p => p.universe === filters.universe)
  }
  if (filters?.status) {
    results = results.filter(p => p.status === filters.status)
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  return Promise.resolve(results)
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    return await api.get<Product>(`/resources/products/${id}`)
  } catch {
    return Promise.resolve(PRODUCTS.find(p => p.id === id) ?? null)
  }
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  try {
    return await api.post<Product>('/resources/products', data as Record<string, unknown>)
  } catch {
    const product: Product = {
    id: `prod-${Date.now()}`,
    sku: data.sku ?? `IZL-NEW-${Date.now()}`,
    name: data.name ?? 'New Product',
    universe: data.universe ?? 'Essentials',
    status: data.status ?? 'draft',
    price: data.price ?? 0,
    currency: data.currency ?? 'EUR',
    description: data.description ?? '',
    coverImageUrl: data.coverImageUrl ?? '',
    images: data.images ?? [],
    sizes: data.sizes ?? [],
    materials: data.materials ?? [],
    careInstructions: data.careInstructions ?? [],
    collectionIds: data.collectionIds ?? [],
    tags: data.tags ?? [],
    createdAt: new Date().toISOString(),
    ...data,
  }
    PRODUCTS.push(product)
    return Promise.resolve(product)
  }
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  try {
    return await api.patch<Product>(`/resources/products/${id}`, data as Record<string, unknown>)
  } catch {
    const idx = PRODUCTS.findIndex(p => p.id === id)
    if (idx === -1) return Promise.resolve(null)
    PRODUCTS[idx] = { ...PRODUCTS[idx], ...data }
    return Promise.resolve(PRODUCTS[idx])
  }
}

export async function archiveProduct(id: string): Promise<boolean> {
  try {
    await api.patch(`/resources/products/${id}`, { status: 'archived' })
    return true
  } catch {
    const idx = PRODUCTS.findIndex(p => p.id === id)
    if (idx === -1) return Promise.resolve(false)
    PRODUCTS[idx] = { ...PRODUCTS[idx], status: 'archived' }
    return Promise.resolve(true)
  }
}
