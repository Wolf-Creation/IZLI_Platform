export type EntityType =
  | 'product'
  | 'collection'
  | 'archive'
  | 'legacy'
  | 'story'
  | 'heritage'
  | 'style-guide'
  | 'recommendation-hub'
  | 'product-passport'
  | 'production-template'
  | 'production-asset'
  | 'keeper'
  | 'member'
  | 'vote'
  | 'achievement'
  | 'badge'
  | 'reward'
  | 'community-project'
  | 'challenge'
  | 'event'
  | 'notification'
  | 'media'
  | 'order'
  | 'referral'

export interface EntityMeta {
  type: EntityType
  label: string
  plural: string
  icon: string
  searchable: boolean
  hasPassport: boolean
  hasAnalytics: boolean
  module: 'commerce' | 'legacy' | 'community' | 'content' | 'production' | 'system'
}

export const ENTITY_REGISTRY: Record<EntityType, EntityMeta> = {
  'product': { type: 'product', label: 'Product', plural: 'Products', icon: '⬡', searchable: true, hasPassport: true, hasAnalytics: true, module: 'commerce' },
  'collection': { type: 'collection', label: 'Collection', plural: 'Collections', icon: '◈', searchable: true, hasPassport: false, hasAnalytics: true, module: 'commerce' },
  'archive': { type: 'archive', label: 'Archive', plural: 'Archives', icon: '◉', searchable: true, hasPassport: false, hasAnalytics: true, module: 'legacy' },
  'legacy': { type: 'legacy', label: 'Legacy', plural: 'Legacy', icon: '◉', searchable: false, hasPassport: false, hasAnalytics: true, module: 'legacy' },
  'story': { type: 'story', label: 'Story', plural: 'Stories', icon: '◫', searchable: true, hasPassport: false, hasAnalytics: true, module: 'content' },
  'heritage': { type: 'heritage', label: 'Heritage', plural: 'Heritage', icon: '△', searchable: true, hasPassport: false, hasAnalytics: false, module: 'content' },
  'style-guide': { type: 'style-guide', label: 'Style Guide', plural: 'Style Guides', icon: '◻', searchable: true, hasPassport: false, hasAnalytics: false, module: 'commerce' },
  'recommendation-hub': { type: 'recommendation-hub', label: 'Recommendation Hub', plural: 'Recommendation Hubs', icon: '▦', searchable: false, hasPassport: false, hasAnalytics: true, module: 'commerce' },
  'product-passport': { type: 'product-passport', label: 'Product Passport', plural: 'Product Passports', icon: '▣', searchable: false, hasPassport: false, hasAnalytics: true, module: 'commerce' },
  'production-template': { type: 'production-template', label: 'Production Template', plural: 'Production Templates', icon: '⬢', searchable: false, hasPassport: false, hasAnalytics: false, module: 'production' },
  'production-asset': { type: 'production-asset', label: 'Production Asset', plural: 'Production Assets', icon: '⬢', searchable: false, hasPassport: false, hasAnalytics: false, module: 'production' },
  'keeper': { type: 'keeper', label: 'Keeper', plural: 'Keepers', icon: '◯', searchable: true, hasPassport: false, hasAnalytics: true, module: 'legacy' },
  'member': { type: 'member', label: 'Member', plural: 'Members', icon: '◯', searchable: true, hasPassport: false, hasAnalytics: true, module: 'community' },
  'vote': { type: 'vote', label: 'Vote', plural: 'Votes', icon: '◇', searchable: false, hasPassport: false, hasAnalytics: true, module: 'legacy' },
  'achievement': { type: 'achievement', label: 'Achievement', plural: 'Achievements', icon: '✦', searchable: false, hasPassport: false, hasAnalytics: false, module: 'legacy' },
  'badge': { type: 'badge', label: 'Badge', plural: 'Badges', icon: '🏅', searchable: false, hasPassport: false, hasAnalytics: false, module: 'legacy' },
  'reward': { type: 'reward', label: 'Reward', plural: 'Rewards', icon: '🎁', searchable: false, hasPassport: false, hasAnalytics: false, module: 'legacy' },
  'community-project': { type: 'community-project', label: 'Community Project', plural: 'Community Projects', icon: '⬠', searchable: true, hasPassport: false, hasAnalytics: true, module: 'community' },
  'challenge': { type: 'challenge', label: 'Challenge', plural: 'Challenges', icon: '◇', searchable: true, hasPassport: false, hasAnalytics: true, module: 'community' },
  'event': { type: 'event', label: 'Event', plural: 'Events', icon: '◈', searchable: true, hasPassport: false, hasAnalytics: true, module: 'community' },
  'notification': { type: 'notification', label: 'Notification', plural: 'Notifications', icon: '🔔', searchable: false, hasPassport: false, hasAnalytics: false, module: 'system' },
  'media': { type: 'media', label: 'Media', plural: 'Media', icon: '◻', searchable: false, hasPassport: false, hasAnalytics: false, module: 'system' },
  'order': { type: 'order', label: 'Order', plural: 'Orders', icon: '⬡', searchable: true, hasPassport: false, hasAnalytics: true, module: 'commerce' },
  'referral': { type: 'referral', label: 'Referral', plural: 'Referrals', icon: '◉', searchable: false, hasPassport: false, hasAnalytics: true, module: 'legacy' },
}

export function getEntity(type: EntityType): EntityMeta {
  return ENTITY_REGISTRY[type]
}

export function getEntitiesByModule(module: EntityMeta['module']): EntityMeta[] {
  return Object.values(ENTITY_REGISTRY).filter(e => e.module === module)
}

export function getSearchableEntities(): EntityMeta[] {
  return Object.values(ENTITY_REGISTRY).filter(e => e.searchable)
}
