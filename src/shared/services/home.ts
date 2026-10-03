import { api } from './api'

export type HomeSectionType = 'hero' | 'new-releases' | 'tops' | 'bottoms' | 'keeper-circle'

export interface HomePageSection {
  id: string
  type: HomeSectionType
  enabled: boolean
  title: string
  description: string
}

export interface HomePageConfig {
  sections: HomePageSection[]
}

export const DEFAULT_HOME_PAGE_CONFIG: HomePageConfig = {
  sections: [
    { id: 'hero', type: 'hero', enabled: true, title: '', description: '' },
    { id: 'new-releases', type: 'new-releases', enabled: true, title: 'New releases', description: '' },
    { id: 'tops', type: 'tops', enabled: true, title: 'Tops', description: 'Built for every day' },
    { id: 'bottoms', type: 'bottoms', enabled: true, title: 'Bottoms', description: 'Made to move with you' },
    { id: 'keeper-circle', type: 'keeper-circle', enabled: true, title: 'KEEPER CIRCLE', description: '' },
  ],
}

export function getHomePageConfig(): Promise<HomePageConfig> {
  return api.get<HomePageConfig>('/website-builder/home-page')
}

export function saveHomePageConfig(config: HomePageConfig): Promise<HomePageConfig> {
  return api.put<HomePageConfig>('/admin/website-builder/home-page', config as unknown as Record<string, unknown>)
}