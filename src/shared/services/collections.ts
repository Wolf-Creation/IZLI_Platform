import type { Collection, Product } from '../../entities'
import { api } from './api'

export interface CollectionDetails {
  collection: Collection
  products: Product[]
}

export interface CollectionsPageConfig {
  title: string
  descriptions: string[]
  sectionTitle: string
  collectionOrder: string[]
  visibleCollectionSlugs: string[]
  showTagline: boolean
  showShortDescription: boolean
  columns: 1 | 2
}

export const DEFAULT_COLLECTIONS_PAGE_CONFIG: CollectionsPageConfig = {
  title: 'Collections',
  descriptions: ['Every collection has a story.', 'Rooted in Amazigh heritage, research, and community.'],
  sectionTitle: 'Explore our collections',
  collectionOrder: ['legacy', 'studio', 'essentials', 'community-lab'],
  visibleCollectionSlugs: ['legacy', 'studio', 'essentials', 'community-lab'],
  showTagline: true,
  showShortDescription: true,
  columns: 2,
}

export async function getCollections(): Promise<Collection[]> {
  return api.get<Collection[]>('/collections')
}

export async function getCollectionsPageConfig(): Promise<CollectionsPageConfig> {
  return api.get<CollectionsPageConfig>('/website-builder/collections-page')
}

export async function saveCollectionsPageConfig(config: CollectionsPageConfig): Promise<CollectionsPageConfig> {
  return api.put<CollectionsPageConfig>('/admin/website-builder/collections-page', config as unknown as Record<string, unknown>)
}

export function getCollectionBySlug(slug: string): Promise<CollectionDetails> {
  return api.get<CollectionDetails>(`/collections/${encodeURIComponent(slug)}`)
}

export function getAdminCollections(): Promise<Collection[]> {
  return api.get<Collection[]>('/admin/collections')
}

export function createCollection(data: Partial<Collection>): Promise<Collection> {
  return api.post<Collection>('/admin/collections', data as Record<string, unknown>)
}

export function updateCollection(id: string, data: Partial<Collection>): Promise<Collection> {
  return api.put<Collection>(`/admin/collections/${id}`, data as Record<string, unknown>)
}

export function deleteCollection(id: string): Promise<{ id: string }> {
  return api.del<{ id: string }>(`/admin/collections/${id}`)
}

export async function uploadCollectionImage(file: File): Promise<string> {
  const body = new FormData()
  body.append('file', file)
  body.append('folder', 'collections')
  const result = await api.upload<{ url: string }>('/uploads/collections', body)
  return result.url
}