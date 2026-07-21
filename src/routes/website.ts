export const WEBSITE_ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT: '/product/:id',
  COLLECTIONS: '/collections',
  COLLECTION: '/collections/:slug',
  STORIES: '/stories',
  STORY: '/stories/:slug',
  HERITAGE: '/heritage',
  COMMUNITY: '/community',
  COMMUNITY_LAB: '/community-lab',
  EVENTS: '/events',
  EVENT: '/events/:slug',
  ABOUT: '/about',
  CART: '/cart',
  LOGIN: '/login',
  PROFILE: '/profile',
} as const

export type WebsiteRoutePath = (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES]

export function productPath(id: string) {
  return `/product/${id}`
}

export function collectionPath(slug: string) {
  return `/collections/${slug}`
}

export function storyPath(slug: string) {
  return `/stories/${slug}`
}

export function eventPath(slug: string) {
  return `/events/${slug}`
}
