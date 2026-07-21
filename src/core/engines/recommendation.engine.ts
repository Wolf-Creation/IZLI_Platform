type ID = string

export interface IRecommendationEngine {
  getRecommendations(context: { productId?: ID; memberId?: ID; location: string; limit?: number }): Promise<Array<{ productId: ID; score: number; reason: string }>>
  getHub(id: ID): Promise<{ id: ID; name: string; type: string; isActive: boolean } | null>
  listHubs(): Promise<Array<{ id: ID; name: string; type: string; isActive: boolean }>>
  updateHub(id: ID, config: Record<string, unknown>): Promise<{ success: boolean }>
  trackImpression(hubId: ID, productId: ID, memberId?: ID): Promise<void>
  trackClick(hubId: ID, productId: ID, memberId?: ID): Promise<void>
}

class RecommendationEngineImpl implements IRecommendationEngine {
  async getRecommendations(context: { productId?: ID; memberId?: ID; location: string; limit?: number }) {
    const limit = context.limit ?? 3
    const results: Array<{ productId: ID; score: number; reason: string }> = []
    for (let i = 0; i < limit; i++) {
      results.push({ productId: `prod-rec-${i + 1}`, score: 0.95 - i * 0.1, reason: 'Similar style profile' })
    }
    return results
  }

  async getHub(id: ID) {
    return { id, name: 'Mock Hub', type: 'editorial', isActive: true }
  }

  async listHubs() {
    return [
      { id: 'hub-1', name: 'New Arrivals Hub', type: 'automated', isActive: true },
      { id: 'hub-2', name: 'Editorial Picks', type: 'editorial', isActive: true },
    ]
  }

  async updateHub(_id: ID, _config: Record<string, unknown>) {
    return { success: true }
  }

  async trackImpression(_hubId: ID, _productId: ID, _memberId?: ID): Promise<void> {
    // no-op mock
  }

  async trackClick(_hubId: ID, _productId: ID, _memberId?: ID): Promise<void> {
    // no-op mock
  }
}

export const RecommendationEngine: IRecommendationEngine = new RecommendationEngineImpl()
