import type { Screen } from '../types'

export const ADMIN_ROUTES = {
  ROOT: '/',
  DASHBOARD: '/dashboard',

  // Commerce
  PRODUCTS: '/products',
  PRODUCT_NEW: '/products/new',
  PRODUCT_EDIT: '/products/:id',
  COLLECTIONS: '/collections',
  COLLECTION_NEW: '/collections/new',
  COLLECTION_EDIT: '/collections/:id',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  CUSTOMERS: '/customers',
  CUSTOMER_DETAIL: '/customers/:id',

  // CMS
  HOME_BUILDER: '/cms/home',
  PAGE_EDITOR: '/cms/pages/:slug',
  MEDIA_LIBRARY: '/media',
  STORIES: '/stories',
  STORY_NEW: '/stories/new',
  STORY_EDIT: '/stories/:id',
  STORY_REVIEW: '/stories/review',

  // Community
  MEMBERS: '/community/members',
  MEMBER_DETAIL: '/community/members/:id',
  CONTRIBUTIONS: '/community/contributions',
  CONTRIBUTION_DETAIL: '/community/contributions/:id',

  // Challenges
  CHALLENGES: '/challenges',
  CHALLENGE_NEW: '/challenges/new',
  CHALLENGE_EDIT: '/challenges/:id',
  CHALLENGE_SUBMISSIONS: '/challenges/:id/submissions',
  CHALLENGE_RESULTS: '/challenges/:id/results',

  // Community Lab
  LAB_PROJECTS: '/lab',
  LAB_PROJECT_NEW: '/lab/new',
  LAB_PROJECT_EDIT: '/lab/:id',
  OPEN_CALLS: '/lab/open-calls',

  // Events
  EVENTS: '/events',
  EVENT_NEW: '/events/new',
  EVENT_EDIT: '/events/:id',

  // Analytics
  COMMERCE_ANALYTICS: '/analytics/commerce',
  COMMUNITY_ANALYTICS: '/analytics/community',
  CONTENT_ANALYTICS: '/analytics/content',
  LEGACY: '/legacy',

  // System
  TEAM_ROLES: '/system/team',
  GLOBAL_SETTINGS: '/system/settings',
  AUDIT_LOG: '/system/audit',

  // Components
  COMPONENTS: '/components',
} as const

export type AdminRoutePath = (typeof ADMIN_ROUTES)[keyof typeof ADMIN_ROUTES]

export function adminPathForScreen(screen: Screen, productId?: string | null) {
  switch (screen) {
    case 'dashboard': return ADMIN_ROUTES.DASHBOARD
    case 'products': return ADMIN_ROUTES.PRODUCTS
    case 'product-editor': return productId ? adminProductPath(productId) : ADMIN_ROUTES.PRODUCT_NEW
    case 'collections': return ADMIN_ROUTES.COLLECTIONS
    case 'collection-editor': return ADMIN_ROUTES.COLLECTION_NEW
    case 'orders': return ADMIN_ROUTES.ORDERS
    case 'customer': return ADMIN_ROUTES.CUSTOMERS
    case 'home-builder': return ADMIN_ROUTES.HOME_BUILDER
    case 'site-page-editor': return ADMIN_ROUTES.PAGE_EDITOR.replace(':slug', 'about')
    case 'media-library': return ADMIN_ROUTES.MEDIA_LIBRARY
    case 'stories': return ADMIN_ROUTES.STORIES
    case 'story-editor': return ADMIN_ROUTES.STORY_NEW
    case 'story-review': return ADMIN_ROUTES.STORY_REVIEW
    case 'members': return ADMIN_ROUTES.MEMBERS
    case 'member-profile': return ADMIN_ROUTES.MEMBER_DETAIL.replace(':id', 'member')
    case 'contributions': return ADMIN_ROUTES.CONTRIBUTIONS
    case 'contribution-detail': return ADMIN_ROUTES.CONTRIBUTION_DETAIL.replace(':id', 'contribution')
    case 'challenges': return ADMIN_ROUTES.CHALLENGES
    case 'challenge-editor': return ADMIN_ROUTES.CHALLENGE_NEW
    case 'challenge-submissions': return ADMIN_ROUTES.CHALLENGE_SUBMISSIONS.replace(':id', 'challenge')
    case 'challenge-results': return ADMIN_ROUTES.CHALLENGE_RESULTS.replace(':id', 'challenge')
    case 'lab-projects': return ADMIN_ROUTES.LAB_PROJECTS
    case 'lab-project-editor': return ADMIN_ROUTES.LAB_PROJECT_NEW
    case 'calls-for-contribution': return ADMIN_ROUTES.OPEN_CALLS
    case 'commerce-analytics': return ADMIN_ROUTES.COMMERCE_ANALYTICS
    case 'community-analytics': return ADMIN_ROUTES.COMMUNITY_ANALYTICS
    case 'content-analytics': return ADMIN_ROUTES.CONTENT_ANALYTICS
    case 'team-roles': return ADMIN_ROUTES.TEAM_ROLES
    case 'global-settings': return ADMIN_ROUTES.GLOBAL_SETTINGS
    case 'audit-log': return ADMIN_ROUTES.AUDIT_LOG
    case 'style-guides': return '/commerce/style-guides'
    case 'style-guide-editor': return '/commerce/style-guides/editor'
    case 'recommendation-hub': return '/commerce/recommendation-hub'
    case 'recommendation-hub-editor': return '/commerce/recommendation-hub/editor'
    case 'product-passports': return '/commerce/product-passports'
    case 'product-passport-editor': return '/commerce/product-passports/editor'
    case 'production-center': return '/production'
    case 'production-templates': return '/production/templates'
    case 'production-assets': return '/production/assets'
    case 'print-presets': return '/production/print-presets'
    case 'batch-generator': return '/production/batch-jobs'
    case 'export-center': return '/production/exports'
    case 'legacies': return ADMIN_ROUTES.LEGACY
    case 'legacy-archives': return '/legacy/archives'
    case 'legacy-timeline': return '/legacy/timeline'
    case 'legacy-keeper-circle': return '/legacy/keeper-circle'
    case 'legacy-voting': return '/legacy/voting'
    case 'legacy-rewards': return '/legacy/rewards'
    case 'legacy-achievements': return '/legacy/achievements'
    case 'legacy-invitations': return '/legacy/invitations'
    case 'legacy-referral': return '/legacy/referral'
    case 'legacy-analytics': return '/legacy/analytics'
    case 'components': return ADMIN_ROUTES.COMPONENTS
    case 'heritage-library': return '/content/heritage-library'
    case 'brand-assets': return '/content/brand-assets'
    case 'qr-experiences': return '/content/qr-experiences'
    case 'qr-code-generator': return '/content/qr-code-generator'
    case 'legacy-keeper-levels': return '/legacy/keeper-levels'
    case 'system-automation': return '/system/automation'
    case 'production-analytics': return '/analytics/production'
    case 'recommendation-analytics': return '/analytics/recommendations'
    default: return ADMIN_ROUTES.DASHBOARD
  }
}

export function adminStateFromPath(pathname: string): { screen: Screen; productEditorId: string | null } {
  if (pathname === '/' || pathname === ADMIN_ROUTES.DASHBOARD) {
    return { screen: 'dashboard', productEditorId: null }
  }

  if (pathname === '/commerce/style-guides') return { screen: 'style-guides', productEditorId: null }
  if (pathname === '/commerce/style-guides/editor') return { screen: 'style-guide-editor', productEditorId: null }
  if (pathname === '/commerce/recommendation-hub') return { screen: 'recommendation-hub', productEditorId: null }
  if (pathname === '/commerce/recommendation-hub/editor') return { screen: 'recommendation-hub-editor', productEditorId: null }
  if (pathname === '/commerce/product-passports') return { screen: 'product-passports', productEditorId: null }
  if (pathname === '/commerce/product-passports/editor') return { screen: 'product-passport-editor', productEditorId: null }
  if (pathname === '/content/qr-code-generator') return { screen: 'qr-code-generator', productEditorId: null }
  if (pathname === ADMIN_ROUTES.LEGACY) return { screen: 'legacies', productEditorId: null }
  if (pathname === `${ADMIN_ROUTES.LEGACY}/`) return { screen: 'legacies', productEditorId: null }

  if (pathname === ADMIN_ROUTES.PRODUCTS || pathname === `${ADMIN_ROUTES.PRODUCTS}/`) {
    return { screen: 'products', productEditorId: null }
  }

  if (pathname === ADMIN_ROUTES.PRODUCT_NEW) {
    return { screen: 'product-editor', productEditorId: null }
  }

  const productMatch = pathname.match(/^\/products\/([^/]+)$/)
  if (productMatch) {
    return { screen: 'product-editor', productEditorId: productMatch[1] }
  }

  if (pathname.startsWith('/cms/pages/')) return { screen: 'site-page-editor', productEditorId: null }
  if (pathname.startsWith('/stories/new') || (pathname.startsWith('/stories/') && !pathname.startsWith('/stories/review'))) return { screen: 'story-editor', productEditorId: null }
  if (pathname.startsWith('/commerce/style-guides/editor')) return { screen: 'style-guide-editor', productEditorId: null }
  if (pathname.startsWith('/commerce/recommendation-hub/editor')) return { screen: 'recommendation-hub-editor', productEditorId: null }
  if (pathname.startsWith('/commerce/product-passports/editor')) return { screen: 'product-passport-editor', productEditorId: null }
  if (pathname.startsWith('/collections/new') || pathname.startsWith('/collections/')) return { screen: 'collection-editor', productEditorId: null }
  if (pathname.startsWith('/challenges/new') || pathname.match(/^\/challenges\/[^/]+$/)) return { screen: 'challenge-editor', productEditorId: null }
  if (pathname.includes('/submissions')) return { screen: 'challenge-submissions', productEditorId: null }
  if (pathname.includes('/results')) return { screen: 'challenge-results', productEditorId: null }
  if (pathname.startsWith('/lab/new') || pathname.match(/^\/lab\/[^/]+$/)) return { screen: 'lab-project-editor', productEditorId: null }
  if (pathname.startsWith('/community/members/')) return { screen: 'member-profile', productEditorId: null }
  if (pathname.startsWith('/community/contributions/')) return { screen: 'contribution-detail', productEditorId: null }
  if (pathname.startsWith('/customers/')) return { screen: 'customer', productEditorId: null }

  const routeScreens: Array<[string, Screen]> = [
    ['/dashboard', 'dashboard'], ['/products', 'products'], ['/collections', 'collections'], ['/orders', 'orders'], ['/customers', 'customer'],
    ['/cms/home', 'home-builder'], ['/media', 'media-library'], ['/stories', 'stories'], ['/stories/review', 'story-review'],
    ['/community/members', 'members'], ['/community/contributions', 'contributions'], ['/challenges', 'challenges'], ['/lab', 'lab-projects'],
    ['/lab/open-calls', 'calls-for-contribution'], ['/analytics/commerce', 'commerce-analytics'], ['/analytics/community', 'community-analytics'],
    ['/analytics/content', 'content-analytics'], ['/system/team', 'team-roles'], ['/system/settings', 'global-settings'], ['/system/audit', 'audit-log'],
    ['/components', 'components'], ['/commerce/style-guides', 'style-guides'], ['/commerce/recommendation-hub', 'recommendation-hub'],
    ['/commerce/product-passports', 'product-passports'], ['/content/qr-experiences', 'qr-experiences'], ['/content/qr-code-generator', 'qr-code-generator'],
    ['/production', 'production-center'], ['/production/templates', 'production-templates'], ['/production/assets', 'production-assets'],
    ['/production/batch-jobs', 'batch-generator'], ['/production/exports', 'export-center'], ['/legacy', 'legacies'], ['/legacy/archives', 'legacy-archives'],
    ['/legacy/timeline', 'legacy-timeline'], ['/legacy/keeper-circle', 'legacy-keeper-circle'], ['/legacy/keeper-levels', 'legacy-keeper-levels'],
    ['/legacy/voting', 'legacy-voting'], ['/legacy/rewards', 'legacy-rewards'], ['/legacy/achievements', 'legacy-achievements'],
    ['/legacy/invitations', 'legacy-invitations'], ['/legacy/referral', 'legacy-referral'], ['/analytics/production', 'production-analytics'],
    ['/analytics/recommendations', 'recommendation-analytics'], ['/content/heritage-library', 'heritage-library'], ['/content/brand-assets', 'brand-assets'],
    ['/legacy/keeper-levels', 'legacy-keeper-levels'],
  ]

  const normalizedPath = pathname.replace(/\/$/, '') || '/'
  const matchedRoute = routeScreens.find(([route]) => route === normalizedPath)
  if (matchedRoute) {
    return { screen: matchedRoute[1], productEditorId: null }
  }

  return { screen: 'dashboard', productEditorId: null }
}

export function adminProductPath(id: string) {
  return `/products/${id}`
}

export function adminCollectionPath(id: string) {
  return `/collections/${id}`
}

export function adminOrderPath(id: string) {
  return `/orders/${id}`
}

export function adminCustomerPath(id: string) {
  return `/customers/${id}`
}

export function adminStoryPath(id: string) {
  return `/stories/${id}`
}

export function adminChallengePath(id: string) {
  return `/challenges/${id}`
}

export function adminChallengeSubmissionsPath(id: string) {
  return `/challenges/${id}/submissions`
}

export function adminLabProjectPath(id: string) {
  return `/lab/${id}`
}
