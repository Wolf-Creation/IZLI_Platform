export interface IAnalyticsEngine {
  track(event: string, data: Record<string, unknown>): void
  getCommerceMetrics(period: string): Promise<{ revenue: number; orders: number; avgOrderValue: number; topProducts: string[] }>
  getLegacyMetrics(period: string): Promise<{ activeKeepers: number; newKeepers: number; votesSubmitted: number; archiveEngagement: number }>
  getCommunityMetrics(period: string): Promise<{ activeMembers: number; challengeSubmissions: number; referrals: number }>
  getContentMetrics(period: string): Promise<{ storiesPublished: number; totalReads: number; avgReadTime: number }>
  getQRMetrics(period: string): Promise<{ totalScans: number; uniqueScanners: number; conversionRate: number }>
  getProductionMetrics(period: string): Promise<{ assetsGenerated: number; batchJobs: number; exportCount: number }>
}

class AnalyticsEngineImpl implements IAnalyticsEngine {
  track(_event: string, _data: Record<string, unknown>): void {
    // no-op mock
  }

  async getCommerceMetrics(_period: string) {
    return { revenue: 48500, orders: 132, avgOrderValue: 367.42, topProducts: ['prod-1', 'prod-2', 'prod-3'] }
  }

  async getLegacyMetrics(_period: string) {
    return { activeKeepers: 87, newKeepers: 12, votesSubmitted: 340, archiveEngagement: 0.68 }
  }

  async getCommunityMetrics(_period: string) {
    return { activeMembers: 1240, challengeSubmissions: 78, referrals: 34 }
  }

  async getContentMetrics(_period: string) {
    return { storiesPublished: 9, totalReads: 4200, avgReadTime: 4.7 }
  }

  async getQRMetrics(_period: string) {
    return { totalScans: 892, uniqueScanners: 714, conversionRate: 0.23 }
  }

  async getProductionMetrics(_period: string) {
    return { assetsGenerated: 245, batchJobs: 18, exportCount: 61 }
  }
}

export const AnalyticsEngine: IAnalyticsEngine = new AnalyticsEngineImpl()
