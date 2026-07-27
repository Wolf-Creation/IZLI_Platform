// Platform services — higher-level operations that orchestrate multiple engines

import { coreApi } from '../api'

export interface IProductService {
  publish(productId: string): Promise<{
    productId: string
    passportId: string
    qrCode: string
    landingUrl: string
    assetsQueued: number
  }>
  archive(productId: string): Promise<{ success: boolean }>
  getWithRelations(productId: string): Promise<{
    product: { id: string; name: string; status: string } | null
    passport: { id: string; qrCode: string } | null
    styleGuides: Array<{ id: string; name: string }>
    recommendations: Array<{ hubId: string; name: string }>
    productionTemplates: Array<{ id: string; name: string }>
  }>
}

export interface IKeeperService {
  onPurchaseCompleted(memberId: string, productIds: string[], archiveId?: string): Promise<{
    keeperCreated: boolean
    keeperId?: string
    level: string
    badgesGranted: string[]
    rewardsGranted: string[]
    votingEnabled: boolean
    pointsAwarded: number
  }>
  getKeeperDashboard(memberId: string): Promise<{
    keeper: { id: string; level: string; points: number } | null
    ownedProducts: Array<{ id: string; name: string; archiveId: string }>
    availableVotes: Array<{ sessionId: string; title: string; closesAt: string }>
    achievements: Array<{ id: string; name: string; unlockedAt: string }>
    rewards: Array<{ id: string; title: string; status: string }>
  }>
}

export interface IArchiveService {
  release(archiveId: string): Promise<{ success: boolean; notifiedKeepers: number }>
  seal(archiveId: string): Promise<{ success: boolean; finalKeeperCount: number }>
  getTimeline(): Promise<Array<{
    archiveId: string
    name: string
    status: string
    releaseDate: string
    keeperCount: number
  }>>
}

export interface ISearchService {
  globalSearch(query: string, filters?: { modules?: string[] }): Promise<{
    products: Array<{ id: string; name: string; imageUrl?: string }>
    collections: Array<{ id: string; name: string }>
    stories: Array<{ id: string; title: string }>
    archives: Array<{ id: string; name: string }>
    keepers: Array<{ id: string; name: string }>
  }>
}

// Mock implementations
class ProductServiceImpl implements IProductService {
  async publish(productId: string) {
    const product = await coreApi.get<{ id: string; name: string; status: string }>(`/resources/products/${productId}`)
    const passport = await coreApi.post<{ id: string; qrCode: string }>(`/resources/productPassports`, { productId, status: 'active', qrCode: `IZLI-QR-${productId.toUpperCase()}`, qrImageUrl: '', views: 0, scans: 0 })
    await coreApi.patch(`/resources/products/${productId}`, { status: 'published' })
    return { productId, passportId: passport.id, qrCode: passport.qrCode, landingUrl: `/p/${productId}`, assetsQueued: product ? 1 : 0 }
  }

  async archive(_productId: string) {
    await coreApi.patch(`/resources/products/${_productId}`, { status: 'archived' })
    return { success: true }
  }

  async getWithRelations(productId: string) {
    const product = await coreApi.get<{ id: string; name: string; status: string } | null>(`/resources/products/${productId}`).catch(() => null)
    const passports = await coreApi.get<Array<{ id: string; productId: string; qrCode: string }>>(`/resources/productPassports?productId=${encodeURIComponent(productId)}`).catch(() => [])
    return {
      product,
      passport: passports.find(passport => passport.productId === productId) ?? null,
      styleGuides: await coreApi.get<Array<{ id: string; name: string }>>('/resources/styleGuides').catch(() => []),
      recommendations: await coreApi.get<Array<{ hubId: string; name: string }>>('/resources/recommendationHubs').catch(() => []),
      productionTemplates: await coreApi.get<Array<{ id: string; name: string }>>('/resources/productionTemplates').catch(() => []),
    }
  }
}

class KeeperServiceImpl implements IKeeperService {
  async onPurchaseCompleted(memberId: string, _productIds: string[], _archiveId?: string) {
    const keeper = await coreApi.post<{ id: string; level: string }>(`/resources/keepers`, { memberId, level: 'keeper', points: 500, archiveIds: [] }).catch(() => null)
    return { keeperCreated: !!keeper, keeperId: keeper?.id, level: keeper?.level ?? 'keeper', badgesGranted: ['first-purchase'], rewardsGranted: [], votingEnabled: true, pointsAwarded: 500 }
  }

  async getKeeperDashboard(memberId: string) {
    const keeper = await coreApi.get<{ id: string; level: string; points: number }>(`/resources/keepers/${memberId}`).catch(() => null)
    return {
      keeper,
      ownedProducts: await coreApi.get<Array<{ id: string; name: string; archiveId: string }>>('/resources/products').catch(() => []),
      availableVotes: await coreApi.get<Array<{ sessionId: string; title: string; closesAt: string }>>('/resources/votingSessions').catch(() => []),
      achievements: [],
      rewards: await coreApi.get<Array<{ id: string; title: string; status: string }>>('/resources/legacyRewards').catch(() => []),
    }
  }
}

class ArchiveServiceImpl implements IArchiveService {
  async release(_archiveId: string) {
    return { success: true, notifiedKeepers: 0 }
  }

  async seal(_archiveId: string) {
    return { success: true, finalKeeperCount: 0 }
  }

  async getTimeline() {
    return []
  }
}

class SearchServiceImpl implements ISearchService {
  async globalSearch(_query: string, _filters?: { modules?: string[] }) {
    return { products: [], collections: [], stories: [], archives: [], keepers: [] }
  }
}

export const ProductService: IProductService = new ProductServiceImpl()
export const KeeperService: IKeeperService = new KeeperServiceImpl()
export const ArchiveService: IArchiveService = new ArchiveServiceImpl()
export const SearchService: ISearchService = new SearchServiceImpl()
