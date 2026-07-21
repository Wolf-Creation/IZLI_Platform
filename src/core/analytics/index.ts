export type AnalyticsPeriod = '7d' | '30d' | '90d' | 'all'

export interface CommerceMetrics {
  period: AnalyticsPeriod
  revenue: number
  orders: number
  avgOrderValue: number
  topProducts: Array<{ id: string; name: string; revenue: number }>
  conversionRate: number
}

export interface LegacyMetrics {
  period: AnalyticsPeriod
  totalKeepers: number
  newKeepers: number
  activeKeepers: number
  votesSubmitted: number
  archiveEngagement: number
  keeperRetention: number
}

export interface CommunityMetrics {
  period: AnalyticsPeriod
  activeMembers: number
  challengeSubmissions: number
  referrals: number
  labProjects: number
  storiesRead: number
}

export interface QRMetrics {
  period: AnalyticsPeriod
  totalScans: number
  uniqueScanners: number
  conversionRate: number
  topProducts: Array<{ id: string; name: string; scans: number }>
}

export interface ProductionMetrics {
  period: AnalyticsPeriod
  assetsGenerated: number
  batchJobs: number
  exportCount: number
  topTemplates: Array<{ id: string; name: string; uses: number }>
}

export interface PlatformMetrics {
  commerce: CommerceMetrics
  legacy: LegacyMetrics
  community: CommunityMetrics
  qr: QRMetrics
  production: ProductionMetrics
  generatedAt: string
}

export interface IAnalyticsService {
  getCommerceMetrics(period: AnalyticsPeriod): Promise<CommerceMetrics>
  getLegacyMetrics(period: AnalyticsPeriod): Promise<LegacyMetrics>
  getCommunityMetrics(period: AnalyticsPeriod): Promise<CommunityMetrics>
  getQRMetrics(period: AnalyticsPeriod): Promise<QRMetrics>
  getProductionMetrics(period: AnalyticsPeriod): Promise<ProductionMetrics>
  getPlatformMetrics(period: AnalyticsPeriod): Promise<PlatformMetrics>
}

class AnalyticsServiceImpl implements IAnalyticsService {
  async getCommerceMetrics(period: AnalyticsPeriod): Promise<CommerceMetrics> {
    return { period, revenue: 0, orders: 0, avgOrderValue: 0, topProducts: [], conversionRate: 0 }
  }
  async getLegacyMetrics(period: AnalyticsPeriod): Promise<LegacyMetrics> {
    return { period, totalKeepers: 0, newKeepers: 0, activeKeepers: 0, votesSubmitted: 0, archiveEngagement: 0, keeperRetention: 0 }
  }
  async getCommunityMetrics(period: AnalyticsPeriod): Promise<CommunityMetrics> {
    return { period, activeMembers: 0, challengeSubmissions: 0, referrals: 0, labProjects: 0, storiesRead: 0 }
  }
  async getQRMetrics(period: AnalyticsPeriod): Promise<QRMetrics> {
    return { period, totalScans: 0, uniqueScanners: 0, conversionRate: 0, topProducts: [] }
  }
  async getProductionMetrics(period: AnalyticsPeriod): Promise<ProductionMetrics> {
    return { period, assetsGenerated: 0, batchJobs: 0, exportCount: 0, topTemplates: [] }
  }
  async getPlatformMetrics(period: AnalyticsPeriod): Promise<PlatformMetrics> {
    const [commerce, legacy, community, qr, production] = await Promise.all([
      this.getCommerceMetrics(period),
      this.getLegacyMetrics(period),
      this.getCommunityMetrics(period),
      this.getQRMetrics(period),
      this.getProductionMetrics(period),
    ])
    return { commerce, legacy, community, qr, production, generatedAt: new Date().toISOString() }
  }
}

export const AnalyticsService: IAnalyticsService = new AnalyticsServiceImpl()
