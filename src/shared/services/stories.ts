import type { Story } from '../../entities'

const STORIES: Story[] = [
  {
    id: 'story-001',
    slug: 'the-language-of-tifinagh',
    title: 'The Language of Tifinagh',
    subtitle: 'How an ancient script became IZLI\'s visual foundation',
    type: 'heritage',
    status: 'published',
    authorId: 'user-001',
    authorName: 'Yidir Ait Ouali',
    coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=700&fit=crop&auto=format',
    body: 'Tifinagh is one of the world\'s oldest writing systems, used by Amazigh peoples across North Africa for thousands of years. At IZLI, we study each character as a design element — understanding its origin before translating it into fabric and thread...',
    readTimeMinutes: 7,
    relatedProductIds: ['prod-001'],
    relatedChallengeIds: [],
    tags: [{ id: 'tag-001', slug: 'tifinagh', label: 'Tifinagh' }, { id: 'tag-002', slug: 'heritage', label: 'Heritage' }],
    publishedAt: '2025-01-20T09:00:00Z',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'story-002',
    slug: 'weavers-of-the-draa-valley',
    title: 'Weavers of the Draa Valley',
    subtitle: 'Meeting the artisans behind the Sahara Overshirt',
    type: 'process',
    status: 'published',
    authorId: 'user-001',
    authorName: 'Yidir Ait Ouali',
    coverImageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=700&fit=crop&auto=format',
    body: 'Nestled between the Anti-Atlas mountains and the Sahara, the Draa Valley has been a center of Moroccan weaving for centuries. We traveled there to meet the families who still work on traditional horizontal looms...',
    readTimeMinutes: 10,
    relatedProductIds: ['prod-002'],
    relatedChallengeIds: [],
    tags: [{ id: 'tag-003', slug: 'woven', label: 'Woven' }, { id: 'tag-013', slug: 'artisans', label: 'Artisans' }],
    publishedAt: '2025-02-10T09:00:00Z',
    createdAt: '2025-01-25T10:00:00Z',
  },
  {
    id: 'story-003',
    slug: 'community-patterns-vol1-behind-the-design',
    title: 'Community Patterns Vol. 1 — Behind the Design',
    subtitle: 'How 200+ members helped shape our first co-designed tee',
    type: 'community',
    status: 'published',
    authorId: 'user-002',
    authorName: 'Tafat Meziane',
    coverImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=700&fit=crop&auto=format',
    body: 'When we launched the Zellij Pattern Open Call, we had no idea how much creativity lived in our community. Over six weeks, 214 members submitted interpretations of traditional Zellij tile geometry, reimagined for garment print...',
    readTimeMinutes: 6,
    relatedProductIds: ['prod-006'],
    relatedChallengeIds: ['chal-001'],
    tags: [{ id: 'tag-009', slug: 'community-lab', label: 'Community Lab' }, { id: 'tag-010', slug: 'zellij', label: 'Zellij' }],
    publishedAt: '2025-04-20T09:00:00Z',
    createdAt: '2025-04-01T10:00:00Z',
  },
  {
    id: 'story-004',
    slug: 'amazigh-symbols-a-designers-field-guide',
    title: 'Amazigh Symbols — A Designer\'s Field Guide',
    subtitle: 'Documenting the visual grammar of North African ornamentation',
    type: 'editorial',
    status: 'draft',
    authorId: 'user-003',
    authorName: 'Lounes Hamadouche',
    coverImageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=700&fit=crop&auto=format',
    body: 'From the protective eye of the Hand of Fatima to the geometric lattice of Berber carpet borders, Amazigh visual culture is one of the richest design traditions in the world. This guide is our attempt to document it systematically...',
    readTimeMinutes: 15,
    relatedProductIds: ['prod-001', 'prod-003'],
    relatedChallengeIds: [],
    tags: [{ id: 'tag-002', slug: 'heritage', label: 'Heritage' }, { id: 'tag-014', slug: 'design', label: 'Design' }],
    createdAt: '2025-05-01T10:00:00Z',
  },
]

export async function getStories(filters?: { type?: string; status?: string }): Promise<Story[]> {
  let results = [...STORIES]
  if (filters?.type) results = results.filter(s => s.type === filters.type)
  if (filters?.status) results = results.filter(s => s.status === filters.status)
  return Promise.resolve(results)
}

export async function getStory(id: string): Promise<Story | null> {
  return Promise.resolve(STORIES.find(s => s.id === id) ?? null)
}

export async function createStory(data: Partial<Story>): Promise<Story> {
  const story: Story = {
    id: `story-${Date.now()}`,
    slug: data.slug ?? `story-${Date.now()}`,
    title: data.title ?? 'Untitled Story',
    type: data.type ?? 'editorial',
    status: data.status ?? 'draft',
    authorId: data.authorId ?? 'user-001',
    authorName: data.authorName ?? 'IZLI Team',
    coverImageUrl: data.coverImageUrl ?? '',
    body: data.body ?? '',
    readTimeMinutes: data.readTimeMinutes ?? 5,
    relatedProductIds: data.relatedProductIds ?? [],
    relatedChallengeIds: data.relatedChallengeIds ?? [],
    tags: data.tags ?? [],
    createdAt: new Date().toISOString(),
    ...data,
  }
  STORIES.push(story)
  return Promise.resolve(story)
}

export async function updateStory(id: string, data: Partial<Story>): Promise<Story | null> {
  const idx = STORIES.findIndex(s => s.id === id)
  if (idx === -1) return Promise.resolve(null)
  STORIES[idx] = { ...STORIES[idx], ...data }
  return Promise.resolve(STORIES[idx])
}

export async function publishStory(id: string): Promise<Story | null> {
  return updateStory(id, { status: 'published', publishedAt: new Date().toISOString() })
}
