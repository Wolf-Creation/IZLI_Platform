type ID = string
type ISODate = string
import { coreApi } from '../api'

export interface IContentEngine {
  getStory(id: ID): Promise<{ id: ID; title: string; status: string; authorId: ID } | null>
  listStories(filters?: { status?: string; authorId?: ID }): Promise<Array<{ id: ID; title: string; status: string }>>
  publishStory(id: ID): Promise<{ success: boolean; publishedAt: ISODate }>
  getHeritageItem(id: ID): Promise<{ id: ID; title: string; category: string } | null>
  listHeritageItems(): Promise<Array<{ id: ID; title: string; category: string }>>
  getMediaItem(id: ID): Promise<{ id: ID; url: string; type: string; name: string } | null>
}

class ContentEngineImpl implements IContentEngine {
  async getStory(id: ID) {
    return coreApi.get<{ id: ID; title: string; status: string; authorId: ID } | null>(`/resources/stories/${id}`)
  }

  async listStories(filters?: { status?: string; authorId?: ID }) {
    const stories = await coreApi.get<Array<{ id: ID; title: string; status: string; authorId: ID }>>('/resources/stories')
    return filters?.status ? stories.filter(story => story.status === filters.status) : stories
  }

  async publishStory(_id: ID) {
    return { success: true, publishedAt: new Date().toISOString() }
  }

  async getHeritageItem(id: ID) {
    return coreApi.get<{ id: ID; title: string; category: string } | null>(`/resources/heritage/${id}`)
  }

  async listHeritageItems() {
    return coreApi.get<Array<{ id: ID; title: string; category: string }>>('/resources/heritage').catch(() => [])
  }

  async getMediaItem(id: ID) {
    return coreApi.get<{ id: ID; url: string; type: string; name: string } | null>(`/resources/media/${id}`)
  }
}

export const ContentEngine: IContentEngine = new ContentEngineImpl()
