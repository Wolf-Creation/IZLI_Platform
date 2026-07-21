import type { Product, Story, CommunityMember } from '../../entities'
import { getProducts } from './products'
import { getStories } from './stories'
import { getMembers } from './community'

export interface SearchResult {
  type: 'product' | 'story' | 'member'
  id: string
  title: string
  subtitle?: string
  imageUrl?: string
  url: string
}

export interface SearchResults {
  products: Product[]
  stories: Story[]
  members: CommunityMember[]
  all: SearchResult[]
  total: number
}

export async function search(query: string, filters?: { types?: string[] }): Promise<SearchResults> {
  const types = filters?.types ?? ['product', 'story', 'member']
  const q = query.toLowerCase()

  const [products, stories, members] = await Promise.all([
    types.includes('product') ? getProducts({ search: q }) : Promise.resolve([]),
    types.includes('story') ? getStories() : Promise.resolve([]),
    types.includes('member') ? getMembers({ search: q }) : Promise.resolve([]),
  ])

  const filteredStories = types.includes('story')
    ? stories.filter(s => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q))
    : []

  const all: SearchResult[] = [
    ...products.map(p => ({
      type: 'product' as const,
      id: p.id,
      title: p.name,
      subtitle: p.universe,
      imageUrl: p.coverImageUrl,
      url: `/products/${p.id}`,
    })),
    ...filteredStories.map(s => ({
      type: 'story' as const,
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      imageUrl: s.coverImageUrl,
      url: `/stories/${s.slug}`,
    })),
    ...members.map(m => ({
      type: 'member' as const,
      id: m.id,
      title: m.displayName,
      subtitle: m.location,
      imageUrl: m.avatarUrl,
      url: `/community/members/${m.id}`,
    })),
  ]

  return Promise.resolve({
    products,
    stories: filteredStories,
    members,
    all,
    total: all.length,
  })
}

export async function searchProducts(query: string): Promise<Product[]> {
  return getProducts({ search: query })
}

export async function searchStories(query: string): Promise<Story[]> {
  const stories = await getStories()
  const q = query.toLowerCase()
  return stories.filter(s => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q))
}

export async function searchMembers(query: string): Promise<CommunityMember[]> {
  return getMembers({ search: query })
}
