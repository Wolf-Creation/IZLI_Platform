import { api } from './api'

export type HomeSectionType = 'hero' | 'new-releases' | 'tops' | 'bottoms' | 'keeper-circle'

export interface KeeperBenefit {
  eyebrow: string
  titleLead: string
  titleHighlight: string
  description: string
  points: string[]
}

export interface HomePageSection {
  id: string
  type: HomeSectionType
  enabled: boolean
  title: string
  description: string
  productIds?: string[]
  productCount?: number
  benefits?: KeeperBenefit[]
}

export interface HomePageConfig {
  sections: HomePageSection[]
}

export const DEFAULT_HOME_PAGE_CONFIG: HomePageConfig = {
  sections: [
    { id: 'hero', type: 'hero', enabled: true, title: '', description: '', productIds: [], productCount: 3 },
    { id: 'new-releases', type: 'new-releases', enabled: true, title: 'New releases', description: '' },
    { id: 'tops', type: 'tops', enabled: true, title: 'Tops', description: 'Built for every day' },
    { id: 'bottoms', type: 'bottoms', enabled: true, title: 'Bottoms', description: 'Made to move with you' },
    {
      id: 'keeper-circle',
      type: 'keeper-circle',
      enabled: true,
      title: 'KEEPER CIRCLE',
      description: 'Get First Access to what comes next, Unlock Exclusive Experiences, and Become part of the IZLI Community.',
      benefits: [
        {
          eyebrow: 'FIRST ACCESS',
          titleLead: 'Before the release.',
          titleHighlight: 'Before everyone else.',
          description: 'Discover new pieces earlier, access limited drops, and secure your size before the collection reaches everyone else.',
          points: ['Discover First', 'Secure Your Size', 'Priority Access'],
        },
        {
          eyebrow: 'EXCLUSIVE EXPERIENCES',
          titleLead: 'As you rise,',
          titleHighlight: 'New doors open.',
          description: 'The circle opens onto the moments behind the collection. Meet the people, places, and stories that give each release its meaning.',
          points: ['Private Events', 'Members-Only Experiences', 'Status-Based Access'],
        },
        {
          eyebrow: 'IZLI COMMUNITY',
          titleLead: 'Grow within,',
          titleHighlight: 'Go further.',
          description: 'Every piece you choose, every story you share, and every moment you take part in helps shape your journey within the IZLI community. As you grow, your Keeper Status evolves — opening the way to deeper access and new experiences.',
          points: ['Grow Your Status', 'Share the Story', 'Carry the Pieces'],
        },
      ],
    },
  ],
}

export function getHomePageConfig(): Promise<HomePageConfig> {
  return api.get<HomePageConfig>('/website-builder/home-page')
}

export function saveHomePageConfig(config: HomePageConfig): Promise<HomePageConfig> {
  return api.put<HomePageConfig>('/admin/website-builder/home-page', config as unknown as Record<string, unknown>)
}