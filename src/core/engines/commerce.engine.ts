type ID = string

export interface ICommerceEngine {
  getProduct(id: ID): Promise<{ id: ID; name: string; price: number; status: string } | null>
  listProducts(filters?: { status?: string; collectionId?: ID }): Promise<Array<{ id: ID; name: string; price: number; status: string }>>
  publishProduct(id: ID): Promise<{ success: boolean; passportId?: ID }>
  getCollection(id: ID): Promise<{ id: ID; name: string; productCount: number } | null>
  listOrders(filters?: { status?: string; memberId?: ID }): Promise<Array<{ id: ID; total: number; status: string; memberId: ID }>>
}

class CommerceEngineImpl implements ICommerceEngine {
  async getProduct(id: ID) {
    return { id, name: 'Mock Product', price: 120.0, status: 'active' }
  }

  async listProducts(filters?: { status?: string; collectionId?: ID }) {
    return [
      { id: 'prod-1', name: 'Heritage Jacket', price: 320.0, status: filters?.status ?? 'active' },
      { id: 'prod-2', name: 'Artisan Bag', price: 185.0, status: filters?.status ?? 'active' },
    ]
  }

  async publishProduct(id: ID) {
    return { success: true, passportId: `passport-${id}` }
  }

  async getCollection(id: ID) {
    return { id, name: 'Mock Collection', productCount: 12 }
  }

  async listOrders(filters?: { status?: string; memberId?: ID }) {
    return [
      { id: 'order-1', total: 320.0, status: filters?.status ?? 'completed', memberId: filters?.memberId ?? 'member-1' },
      { id: 'order-2', total: 185.0, status: filters?.status ?? 'completed', memberId: filters?.memberId ?? 'member-2' },
    ]
  }
}

export const CommerceEngine: ICommerceEngine = new CommerceEngineImpl()
