// Providers abstract where data comes from.
// This implementation uses the backend API as the source of truth.

type ID = string
import { coreApi } from '../api'

export interface IDataProvider {
  get<T>(collection: string, id: ID): Promise<T | null>
  list<T>(collection: string, filters?: Record<string, unknown>): Promise<T[]>
  create<T>(collection: string, data: Omit<T, 'id'>): Promise<T>
  update<T>(collection: string, id: ID, data: Partial<T>): Promise<T>
  delete(collection: string, id: ID): Promise<void>
}

export interface IMediaProvider {
  upload(file: File, folder?: string): Promise<{ id: ID; url: string; name: string; size: number }>
  getUrl(id: ID): Promise<string | null>
  delete(id: ID): Promise<void>
}

export interface ICacheProvider {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>
  del(key: string): Promise<void>
  flush(): Promise<void>
}

class ApiDataProvider implements IDataProvider {
  async get<T>(collection: string, id: ID): Promise<T | null> {
    try {
      return await coreApi.get<T>(`/resources/${collection}/${id}`)
    } catch {
      return null
    }
  }

  async list<T>(collection: string, filters?: Record<string, unknown>): Promise<T[]> {
    try {
      const query = new URLSearchParams()
      Object.entries(filters ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') query.set(key, String(value))
      })
      const suffix = query.toString() ? `?${query.toString()}` : ''
      return await coreApi.get<T[]>(`/resources/${collection}${suffix}`)
    } catch {
      return []
    }
  }

  async create<T>(collection: string, data: Omit<T, 'id'>): Promise<T> {
    return coreApi.post<T>(`/resources/${collection}`, data as Record<string, unknown>)
  }

  async update<T>(collection: string, id: ID, data: Partial<T>): Promise<T> {
    return coreApi.patch<T>(`/resources/${collection}/${id}`, data as Record<string, unknown>)
  }

  async delete(collection: string, id: ID): Promise<void> {
    await coreApi.del(`/resources/${collection}/${id}`)
  }
}

class MemoryCacheProvider implements ICacheProvider {
  private store = new Map<string, { value: unknown; expiresAt?: number }>()

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key)
    if (!entry) return null
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }
    return entry.value as T
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    this.store.set(key, { value, expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined })
  }

  async del(key: string): Promise<void> {
    this.store.delete(key)
  }

  async flush(): Promise<void> {
    this.store.clear()
  }
}

export const DataProvider: IDataProvider = new ApiDataProvider()
export const CacheProvider: ICacheProvider = new MemoryCacheProvider()
