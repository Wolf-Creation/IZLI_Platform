type ID = string
type ISODate = string

export interface IProductionEngine {
  getTemplate(id: ID): Promise<{ id: ID; name: string; type: string; status: string } | null>
  listTemplates(filters?: { type?: string }): Promise<Array<{ id: ID; name: string; type: string }>>
  generateAsset(templateId: ID, productId: ID, config?: Record<string, unknown>): Promise<{ assetId: ID; status: string; estimatedTime: number }>
  getBatchJob(id: ID): Promise<{ id: ID; status: string; progress: number; totalAssets: number } | null>
  startBatchJob(productIds: ID[], templateIds: ID[]): Promise<{ jobId: ID }>
  exportAssets(assetIds: ID[], format: string): Promise<{ downloadUrl: string; expiresAt: ISODate }>
}

class ProductionEngineImpl implements IProductionEngine {
  async getTemplate(id: ID) {
    return { id, name: 'Mock Template', type: 'lookbook', status: 'active' }
  }

  async listTemplates(filters?: { type?: string }) {
    return [
      { id: 'template-1', name: 'Lookbook A4', type: filters?.type ?? 'lookbook' },
      { id: 'template-2', name: 'Product Card', type: filters?.type ?? 'card' },
    ]
  }

  async generateAsset(templateId: ID, productId: ID, _config?: Record<string, unknown>) {
    return { assetId: `asset-${templateId}-${productId}`, status: 'queued', estimatedTime: 30 }
  }

  async getBatchJob(id: ID) {
    return { id, status: 'running', progress: 65, totalAssets: 20 }
  }

  async startBatchJob(_productIds: ID[], _templateIds: ID[]) {
    return { jobId: `batch-${Date.now()}` }
  }

  async exportAssets(_assetIds: ID[], format: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    return { downloadUrl: `https://cdn.example.com/exports/bundle.${format}`, expiresAt }
  }
}

export const ProductionEngine: IProductionEngine = new ProductionEngineImpl()
