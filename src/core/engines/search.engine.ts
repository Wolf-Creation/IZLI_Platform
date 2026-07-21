type ID = string

export interface ISearchEngine {
  search(query: string, filters?: { types?: string[]; status?: string }): Promise<Array<{ id: ID; type: string; label: string; sublabel: string; imageUrl?: string; score: number }>>
  index(entityType: string, id: ID, data: Record<string, unknown>): Promise<void>
  remove(entityType: string, id: ID): Promise<void>
  suggest(query: string): Promise<string[]>
}

class SearchEngineImpl implements ISearchEngine {
  async search(_query: string, _filters?: { types?: string[]; status?: string }) {
    return [
      { id: 'prod-1', type: 'product', label: 'Heritage Jacket', sublabel: 'Active · €320', score: 0.98 },
      { id: 'member-1', type: 'member', label: 'Alice Durand', sublabel: 'Keeper · guardian', score: 0.87 },
      { id: 'story-1', type: 'story', label: 'The Weaver\'s Tale', sublabel: 'Published', score: 0.75 },
    ]
  }

  async index(_entityType: string, _id: ID, _data: Record<string, unknown>): Promise<void> {
    // no-op mock
  }

  async remove(_entityType: string, _id: ID): Promise<void> {
    // no-op mock
  }

  async suggest(query: string) {
    return [`${query} jacket`, `${query} collection`, `${query} archive`]
  }
}

export const SearchEngine: ISearchEngine = new SearchEngineImpl()
