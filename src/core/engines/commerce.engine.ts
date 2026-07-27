type ID = string
import { coreApi } from '../api'

export interface ICommerceEngine {
  getProduct(id: ID): Promise<{ id: ID; name: string; price: number; status: string } | null>
  listProducts(filters?: { status?: string; collectionId?: ID }): Promise<Array<{ id: ID; name: string; price: number; status: string }>>
  publishProduct(id: ID): Promise<{ success: boolean; passportId?: ID }>
  getCollection(id: ID): Promise<{ id: ID; name: string; productCount: number } | null>
  listOrders(filters?: { status?: string; memberId?: ID }): Promise<Array<{ id: ID; total: number; status: string; memberId: ID }>>
}

class CommerceEngineImpl implements ICommerceEngine {
  async getProduct(id: ID) {
    return coreApi.get<{ id: ID; name: string; price: number; status: string } | null>(`/resources/products/${id}`)
  }

  async listProducts(filters?: { status?: string; collectionId?: ID }) {
    const products = await coreApi.get<Array<{ id: ID; name: string; price: number; status: string }>>('/resources/products')
    return filters?.status ? products.filter(product => product.status === filters.status) : products
  }

  async publishProduct(id: ID) {
    return { success: true, passportId: `passport-${id}` }
  }

  async getCollection(id: ID) {
    const collection = await coreApi.get<{ id: ID; name: string; productIds?: ID[] } | null>(`/resources/collections/${id}`)
    return collection ? { id: collection.id, name: collection.name, productCount: collection.productIds?.length ?? 0 } : null
  }

  async listOrders(filters?: { status?: string; memberId?: ID }) {
    const orders = await coreApi.get<Array<{ id: ID; total: number; status: string; customerId: ID }>>('/resources/orders')
    return orders.map(order => ({ id: order.id, total: order.total, status: order.status, memberId: order.customerId }))
  }
}

export const CommerceEngine: ICommerceEngine = new CommerceEngineImpl()
