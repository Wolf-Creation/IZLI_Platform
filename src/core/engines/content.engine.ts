type ID = string
type ISODate = string

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
    return { id, title: 'Mock Story', status: 'draft', authorId: 'member-1' }
  }

  async listStories(filters?: { status?: string; authorId?: ID }) {
    return [
      { id: 'story-1', title: 'The Weaver\'s Tale', status: filters?.status ?? 'published' },
      { id: 'story-2', title: 'Threads of Time', status: filters?.status ?? 'draft' },
    ]
  }

  async publishStory(_id: ID) {
    return { success: true, publishedAt: new Date().toISOString() }
  }

  async getHeritageItem(id: ID) {
    return { id, title: 'Mock Heritage Item', category: 'textile' }
  }

  async listHeritageItems() {
    return [
      { id: 'heritage-1', title: 'Ancestral Loom', category: 'tool' },
      { id: 'heritage-2', title: 'Indigo Dyeing Technique', category: 'technique' },
    ]
  }

  async getMediaItem(id: ID) {
    return { id, url: `https://cdn.example.com/media/${id}`, type: 'image', name: 'mock-media.jpg' }
  }
}

export const ContentEngine: IContentEngine = new ContentEngineImpl()
