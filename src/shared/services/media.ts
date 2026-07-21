import type { Media } from '../../entities'

const MEDIA_ITEMS: Media[] = [
  {
    id: 'media-001',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=800&fit=crop&auto=format',
    alt: 'Tifinagh Frame Tee — front view',
    width: 1200,
    height: 800,
    sizeBytes: 348000,
    mimeType: 'image/jpeg',
    createdAt: '2025-01-10T10:00:00Z',
    tags: [{ id: 'tag-001', slug: 'tifinagh', label: 'Tifinagh' }, { id: 'tag-023', slug: 'product-photo', label: 'Product Photo' }],
  },
  {
    id: 'media-002',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=800&fit=crop&auto=format',
    alt: 'Woven Sahara Overshirt — editorial shot',
    width: 1200,
    height: 800,
    sizeBytes: 412000,
    mimeType: 'image/jpeg',
    createdAt: '2025-01-15T10:00:00Z',
    tags: [{ id: 'tag-003', slug: 'woven', label: 'Woven' }, { id: 'tag-023', slug: 'product-photo', label: 'Product Photo' }],
  },
  {
    id: 'media-003',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=800&fit=crop&auto=format',
    alt: 'Atlas Symbol Boxy Tee — studio shot',
    width: 1200,
    height: 800,
    sizeBytes: 290000,
    mimeType: 'image/jpeg',
    createdAt: '2025-02-01T10:00:00Z',
    tags: [{ id: 'tag-004', slug: 'essentials', label: 'Essentials' }, { id: 'tag-023', slug: 'product-photo', label: 'Product Photo' }],
  },
  {
    id: 'media-004',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop&auto=format',
    alt: 'Berber Grid Track Jacket — campaign image',
    width: 1200,
    height: 800,
    sizeBytes: 375000,
    mimeType: 'image/jpeg',
    createdAt: '2025-03-01T10:00:00Z',
    tags: [{ id: 'tag-006', slug: 'studio', label: 'Studio' }, { id: 'tag-024', slug: 'campaign', label: 'Campaign' }],
  },
  {
    id: 'media-005',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=800&fit=crop&auto=format',
    alt: 'Community Pattern Tee Vol. 1 — flatlay',
    width: 1200,
    height: 800,
    sizeBytes: 320000,
    mimeType: 'image/jpeg',
    createdAt: '2025-04-01T10:00:00Z',
    tags: [{ id: 'tag-009', slug: 'community-lab', label: 'Community Lab' }, { id: 'tag-023', slug: 'product-photo', label: 'Product Photo' }],
  },
  {
    id: 'media-006',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&h=800&fit=crop&auto=format',
    alt: 'Zellij pattern — community submission',
    width: 1200,
    height: 800,
    sizeBytes: 280000,
    mimeType: 'image/jpeg',
    createdAt: '2025-03-15T10:00:00Z',
    tags: [{ id: 'tag-010', slug: 'zellij', label: 'Zellij' }, { id: 'tag-025', slug: 'community', label: 'Community' }],
  },
]

export async function getMedia(filters?: { type?: string; search?: string }): Promise<Media[]> {
  let results = [...MEDIA_ITEMS]
  if (filters?.type) results = results.filter(m => m.type === filters.type)
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(m => m.alt?.toLowerCase().includes(q))
  }
  return Promise.resolve(results)
}

export async function uploadMedia(_file: File): Promise<Media> {
  const media: Media = {
    id: `media-${Date.now()}`,
    type: 'image',
    url: `https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=800&fit=crop&auto=format`,
    alt: 'Uploaded media',
    createdAt: new Date().toISOString(),
    tags: [],
  }
  MEDIA_ITEMS.push(media)
  return Promise.resolve(media)
}

export async function deleteMedia(id: string): Promise<boolean> {
  const idx = MEDIA_ITEMS.findIndex(m => m.id === id)
  if (idx === -1) return Promise.resolve(false)
  MEDIA_ITEMS.splice(idx, 1)
  return Promise.resolve(true)
}

export async function updateMedia(id: string, data: Partial<Media>): Promise<Media | null> {
  const idx = MEDIA_ITEMS.findIndex(m => m.id === id)
  if (idx === -1) return Promise.resolve(null)
  MEDIA_ITEMS[idx] = { ...MEDIA_ITEMS[idx], ...data }
  return Promise.resolve(MEDIA_ITEMS[idx])
}
