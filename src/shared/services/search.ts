import type { Product, Story, CommunityMember } from '../../entities'
import { getProducts } from './products'
import { getStories } from './stories'
import { getMembers } from './community'
import { api } from './api'

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

  try {
    const [products, stories, members] = await Promise.all([
      types.includes('product') ? api.get<Product[]>('/resources/products') : Promise.resolve([]),
      types.includes('story') ? api.get<Story[]>('/resources/stories') : Promise.resolve([]),
      types.includes('member') ? api.get<CommunityMember[]>('/resources/community') : Promise.resolve([]),
    ])

    const filteredProducts = types.includes('product') ? products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : []
    const filteredStories = types.includes('story') ? stories.filter(s => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q)) : []
    const filteredMembers = types.includes('member') ? members.filter(m => m.displayName.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)) : []

    const all: SearchResult[] = [
      ...filteredProducts.map(p => ({ type: 'product' as const, id: p.id, title: p.name, subtitle: p.universe, imageUrl: p.coverImageUrl, url: `/products/${p.id}` })),
      ...filteredStories.map(s => ({ type: 'story' as const, id: s.id, title: s.title, subtitle: s.subtitle, imageUrl: s.coverImageUrl, url: `/stories/${s.slug}` })),
      ...filteredMembers.map(m => ({ type: 'member' as const, id: m.id, title: m.displayName, subtitle: m.location, imageUrl: m.avatarUrl, url: `/community/members/${m.id}` })),
    ]

    return Promise.resolve({ products: filteredProducts, stories: filteredStories, members: filteredMembers, all, total: all.length })
  } catch {
    const [products, stories, members] = await Promise.all([
      types.includes('product') ? getProducts({ search: q }) : Promise.resolve([]),
      types.includes('story') ? getStories() : Promise.resolve([]),
      types.includes('member') ? getMembers({ search: q }) : Promise.resolve([]),
    ])

    const filteredStories = types.includes('story')
      ? stories.filter(s => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q))
      : []

    const all: SearchResult[] = [
      ...products.map(p => ({ type: 'product' as const, id: p.id, title: p.name, subtitle: p.universe, imageUrl: p.coverImageUrl, url: `/products/${p.id}` })),
      ...filteredStories.map(s => ({ type: 'story' as const, id: s.id, title: s.title, subtitle: s.subtitle, imageUrl: s.coverImageUrl, url: `/stories/${s.slug}` })),
      ...members.map(m => ({ type: 'member' as const, id: m.id, title: m.displayName, subtitle: m.location, imageUrl: m.avatarUrl, url: `/community/members/${m.id}` })),
    ]

    return Promise.resolve({ products, stories: filteredStories, members, all, total: all.length })
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  return search(query, { types: ['product'] }).then(r => r.products)
}

export async function searchStories(query: string): Promise<Story[]> {
  return search(query, { types: ['story'] }).then(r => r.stories)
}

export async function searchMembers(query: string): Promise<CommunityMember[]> {
  return search(query, { types: ['member'] }).then(r => r.members)
}
