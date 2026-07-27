import type { Collection } from '../../entities'
import { api } from './api'

const COLLECTIONS: Collection[] = [
  {
    id: 'col-001',
    slug: 'roots-ss25',
    name: 'Roots — SS25',
    universe: 'Heritage',
    season: 'SS25',
    status: 'active',
    coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=800&fit=crop&auto=format',
    description: 'A celebration of Amazigh heritage through considered garments rooted in tradition and crafted for the contemporary wardrobe.',
    productIds: ['prod-001', 'prod-002', 'prod-005'],
    tags: [{ id: 'tag-002', slug: 'heritage', label: 'Heritage' }, { id: 'tag-011', slug: 'ss25', label: 'SS25' }],
    createdAt: '2024-11-01T10:00:00Z',
    publishedAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'col-002',
    slug: 'atlas-fw25',
    name: 'Atlas — FW25',
    universe: 'Studio',
    season: 'FW25',
    status: 'active',
    coverImageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop&auto=format',
    description: 'Technical menswear inspired by the Atlas mountain range — structured silhouettes designed for endurance and style.',
    productIds: ['prod-002', 'prod-004'],
    tags: [{ id: 'tag-006', slug: 'studio', label: 'Studio' }, { id: 'tag-012', slug: 'fw25', label: 'FW25' }],
    createdAt: '2025-04-01T10:00:00Z',
    publishedAt: '2025-08-01T09:00:00Z',
  },
  {
    id: 'col-003',
    slug: 'essentials-permanent',
    name: 'Essentials',
    universe: 'Essentials',
    season: 'Permanent',
    status: 'active',
    coverImageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=800&fit=crop&auto=format',
    description: 'The IZLI wardrobe foundation — versatile, minimal pieces with subtle nods to Amazigh design language.',
    productIds: ['prod-003'],
    tags: [{ id: 'tag-004', slug: 'essentials', label: 'Essentials' }],
    createdAt: '2024-08-01T10:00:00Z',
    publishedAt: '2024-09-01T09:00:00Z',
  },
  {
    id: 'col-004',
    slug: 'community-lab-vol-1',
    name: 'Community Lab — Vol. 1',
    universe: 'Community Lab',
    season: 'SS25',
    status: 'active',
    coverImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=800&fit=crop&auto=format',
    description: 'The inaugural community-designed collection, co-created with IZLI members from around the world.',
    productIds: ['prod-006'],
    tags: [{ id: 'tag-009', slug: 'community-lab', label: 'Community Lab' }],
    createdAt: '2025-03-01T10:00:00Z',
    publishedAt: '2025-04-15T09:00:00Z',
  },
]

export async function getCollections(): Promise<Collection[]> {
  try {
    return await api.get<Collection[]>('/resources/collections')
  } catch {
    return Promise.resolve([...COLLECTIONS])
  }
}

export async function getCollection(id: string): Promise<Collection | null> {
  try {
    return await api.get<Collection>(`/resources/collections/${id}`)
  } catch {
    return Promise.resolve(COLLECTIONS.find(c => c.id === id) ?? null)
  }
}

export async function createCollection(data: Partial<Collection>): Promise<Collection> {
  try {
    return await api.post<Collection>('/resources/collections', data as Record<string, unknown>)
  } catch {
    const collection: Collection = {
    id: `col-${Date.now()}`,
    slug: data.slug ?? `collection-${Date.now()}`,
    name: data.name ?? 'New Collection',
    universe: data.universe ?? 'Essentials',
    season: data.season ?? 'SS26',
    status: data.status ?? 'draft',
    coverImageUrl: data.coverImageUrl ?? '',
    description: data.description ?? '',
    productIds: data.productIds ?? [],
    tags: data.tags ?? [],
    createdAt: new Date().toISOString(),
    ...data,
  }
    COLLECTIONS.push(collection)
    return Promise.resolve(collection)
  }
}

export async function updateCollection(id: string, data: Partial<Collection>): Promise<Collection | null> {
  try {
    return await api.patch<Collection>(`/resources/collections/${id}`, data as Record<string, unknown>)
  } catch {
    const idx = COLLECTIONS.findIndex(c => c.id === id)
    if (idx === -1) return Promise.resolve(null)
    COLLECTIONS[idx] = { ...COLLECTIONS[idx], ...data }
    return Promise.resolve(COLLECTIONS[idx])
  }
}
