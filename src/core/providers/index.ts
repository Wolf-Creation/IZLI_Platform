// Providers abstract where data comes from.
// In production these would call an API. Here they are typed stubs.

type ID = string

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

class MemoryDataProvider implements IDataProvider {
  private store = new Map<string, Map<string, unknown>>()

  private collection(name: string) {
    if (!this.store.has(name)) this.store.set(name, new Map())
    return this.store.get(name)!
  }

  async get<T>(collection: string, id: ID): Promise<T | null> {
    return (this.collection(collection).get(id) as T) ?? null
  }

  async list<T>(collection: string, _filters?: Record<string, unknown>): Promise<T[]> {
    return [...this.collection(collection).values()] as T[]
  }

  async create<T>(collection: string, data: Omit<T, 'id'>): Promise<T> {
    const id = `${collection}-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const record = { ...data, id } as T
    this.collection(collection).set(id, record)
    return record
  }

  async update<T>(collection: string, id: ID, data: Partial<T>): Promise<T> {
    const existing = this.collection(collection).get(id) as T
    const updated = { ...existing, ...data }
    this.collection(collection).set(id, updated)
    return updated
  }

  async delete(collection: string, id: ID): Promise<void> {
    this.collection(collection).delete(id)
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

export const DataProvider: IDataProvider = new MemoryDataProvider()
export const CacheProvider: ICacheProvider = new MemoryCacheProvider()
