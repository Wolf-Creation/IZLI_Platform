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
  PROFILE: '/keeper-circle/profile',
} as const

export type WebsiteRoutePath = (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES]

const WEBSITE_ROUTE_BY_PAGE: Record<string, string> = {
  home: WEBSITE_ROUTES.HOME,
  shop: WEBSITE_ROUTES.SHOP,
  collections: WEBSITE_ROUTES.COLLECTIONS,
  heritage: WEBSITE_ROUTES.HERITAGE,
  stories: WEBSITE_ROUTES.STORIES,
  community: WEBSITE_ROUTES.COMMUNITY,
  'community-lab': WEBSITE_ROUTES.COMMUNITY_LAB,
  events: WEBSITE_ROUTES.EVENTS,
  about: WEBSITE_ROUTES.ABOUT,
  cart: WEBSITE_ROUTES.CART,
  login: WEBSITE_ROUTES.LOGIN,
  profile: WEBSITE_ROUTES.PROFILE,
  legacy: '/legacy',
  archives: '/archives',
  'keeper-circle': '/keeper-circle',
  'product-detail': '/product/demo',
}

export function websitePathForPage(page: string) {
  return WEBSITE_ROUTE_BY_PAGE[page] ?? WEBSITE_ROUTES.HOME
}

export function websitePageFromPath(pathname: string) {
  const normalizedPath = pathname.replace(/\/$/, '') || '/'

  if (normalizedPath === WEBSITE_ROUTES.HOME) return 'home'
  if (normalizedPath === WEBSITE_ROUTES.SHOP) return 'shop'
  if (normalizedPath === WEBSITE_ROUTES.COLLECTIONS || normalizedPath.startsWith('/collections/')) return 'collections'
  if (normalizedPath === WEBSITE_ROUTES.STORIES || normalizedPath.startsWith('/stories/')) return 'stories'
  if (normalizedPath === WEBSITE_ROUTES.HERITAGE) return 'heritage'
  if (normalizedPath === WEBSITE_ROUTES.COMMUNITY) return 'community'
  if (normalizedPath === WEBSITE_ROUTES.COMMUNITY_LAB) return 'community-lab'
  if (normalizedPath === WEBSITE_ROUTES.EVENTS || normalizedPath.startsWith('/events/')) return 'events'
  if (normalizedPath === WEBSITE_ROUTES.ABOUT) return 'about'
  if (normalizedPath === WEBSITE_ROUTES.CART) return 'cart'
  if (normalizedPath === WEBSITE_ROUTES.LOGIN) return 'login'
  if (normalizedPath === WEBSITE_ROUTES.PROFILE || normalizedPath === '/profile') return 'profile'
  if (normalizedPath === '/legacy') return 'legacy'
  if (normalizedPath === '/archives') return 'archives'
  if (normalizedPath === '/keeper-circle') return 'keeper-circle'
  if (normalizedPath.startsWith('/product/')) return 'product-detail'

  return 'home'
}

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
