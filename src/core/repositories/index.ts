type ID = string
import { coreApi } from '../api'

export interface Repository<T> {
  findById(id: ID): Promise<T | null>
  findAll(filters?: Record<string, unknown>): Promise<T[]>
  save(entity: T): Promise<T>
  delete(id: ID): Promise<void>
  count(filters?: Record<string, unknown>): Promise<number>
}

export interface IProductRepository extends Repository<{ id: ID; name: string; status: string; collectionId?: ID; price: number }> {
  findByCollection(collectionId: ID): Promise<Array<{ id: ID; name: string; status: string }>>
  findByStatus(status: string): Promise<Array<{ id: ID; name: string }>>
}

export interface IArchiveRepository extends Repository<{ id: ID; name: string; status: string; keeperCount: number; releaseDate: string }> {
  findActive(): Promise<Array<{ id: ID; name: string; keeperCount: number }>>
  findByStatus(status: string): Promise<Array<{ id: ID; name: string; status: string }>>
}

export interface IKeeperRepository extends Repository<{ id: ID; memberId: ID; level: string; points: number; archiveIds: ID[] }> {
  findByMember(memberId: ID): Promise<{ id: ID; memberId: ID; level: string; points: number; archiveIds: ID[] } | null>
  findByLevel(level: string): Promise<Array<{ id: ID; memberId: ID; level: string }>>
  findByArchive(archiveId: ID): Promise<Array<{ id: ID; memberId: ID; level: string }>>
}

export interface IStoryRepository extends Repository<{ id: ID; title: string; status: string; authorId: ID }> {
  findPublished(): Promise<Array<{ id: ID; title: string; authorId: ID }>>
  findByAuthor(authorId: ID): Promise<Array<{ id: ID; title: string; status: string }>>
}

// Stub implementations
function createRepo<T>(collection: string): Repository<T> {
  return {
    async findById(id: ID) { return coreApi.get<T>(`/resources/${collection}/${id}`).catch(() => null) },
    async findAll(filters?: Record<string, unknown>) { return coreApi.get<T[]>(`/resources/${collection}`).catch(() => []) },
    async save(entity: T) { return coreApi.post<T>(`/resources/${collection}`, entity as Record<string, unknown>) },
    async delete(id: ID) { await coreApi.del(`/resources/${collection}/${id}`) },
    async count(_filters?: Record<string, unknown>) {
      const items = await coreApi.get<T[]>(`/resources/${collection}`).catch(() => [])
      return items.length
    },
  }
}

export const ProductRepository: IProductRepository = {
  ...createRepo<{ id: ID; name: string; status: string; collectionId?: ID; price: number }>('products'),
  async findByCollection(_collectionId: ID) { return [] },
  async findByStatus(_status: string) { return [] },
}

export const ArchiveRepository: IArchiveRepository = {
  ...createRepo<{ id: ID; name: string; status: string; keeperCount: number; releaseDate: string }>('archives'),
  async findActive() { return [] },
  async findByStatus(_status: string) { return [] },
}

export const KeeperRepository: IKeeperRepository = {
  ...createRepo<{ id: ID; memberId: ID; level: string; points: number; archiveIds: ID[] }>('keepers'),
  async findByMember(_memberId: ID) { return null },
  async findByLevel(_level: string) { return [] },
  async findByArchive(_archiveId: ID) { return [] },
}

export const StoryRepository: IStoryRepository = {
  ...createRepo<{ id: ID; title: string; status: string; authorId: ID }>('stories'),
  async findPublished() { return [] },
  async findByAuthor(_authorId: ID) { return [] },
}
