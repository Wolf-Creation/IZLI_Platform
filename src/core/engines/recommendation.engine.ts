type ID = string
import { coreApi } from '../api'

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
    const hubs = await coreApi.get<Array<{ id: ID; name: string; type: string; isActive: boolean }>>('/resources/recommendationHubs').catch(() => [])
    return hubs.slice(0, context.limit ?? 3).map((hub, index) => ({ productId: hub.id, score: 0.95 - index * 0.1, reason: hub.name }))
  }

  async getHub(id: ID) {
    return coreApi.get<{ id: ID; name: string; type: string; isActive: boolean } | null>(`/resources/recommendationHubs/${id}`)
  }

  async listHubs() {
    return coreApi.get<Array<{ id: ID; name: string; type: string; isActive: boolean }>>('/resources/recommendationHubs').catch(() => [])
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
