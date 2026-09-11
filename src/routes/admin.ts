import type { Screen } from '../types'

export const ADMIN_ROUTES = {
  ROOT: '/admin',
  DASHBOARD: '/admin/dashboard',

  // Commerce
  PRODUCTS: '/admin/products',
  PRODUCT_NEW: '/admin/products/new',
  PRODUCT_EDIT: '/admin/products/:id',
  COLLECTIONS: '/admin/collections',
  COLLECTION_NEW: '/admin/collections/new',
  COLLECTION_EDIT: '/admin/collections/:id',
  ORDERS: '/admin/orders',
  ORDER_DETAIL: '/admin/orders/:id',
  CUSTOMERS: '/admin/customers',
  CUSTOMER_DETAIL: '/admin/customers/:id',

  // CMS
  HOME_BUILDER: '/admin/cms/home',
  PAGE_EDITOR: '/admin/cms/pages/:slug',
  MEDIA_LIBRARY: '/admin/media',
  STORIES: '/admin/stories',
  STORY_NEW: '/admin/stories/new',
  STORY_EDIT: '/admin/stories/:id',
  STORY_REVIEW: '/admin/stories/review',

  // Community
  MEMBERS: '/admin/community/members',
  MEMBER_DETAIL: '/admin/community/members/:id',
  CONTRIBUTIONS: '/admin/community/contributions',
  CONTRIBUTION_DETAIL: '/admin/community/contributions/:id',

  // Challenges
  CHALLENGES: '/admin/challenges',
  CHALLENGE_NEW: '/admin/challenges/new',
  CHALLENGE_EDIT: '/admin/challenges/:id',
  CHALLENGE_SUBMISSIONS: '/admin/challenges/:id/submissions',
  CHALLENGE_RESULTS: '/admin/challenges/:id/results',

  // Community Lab
  LAB_PROJECTS: '/admin/lab',
  LAB_PROJECT_NEW: '/admin/lab/new',
  LAB_PROJECT_EDIT: '/admin/lab/:id',
  OPEN_CALLS: '/admin/lab/open-calls',

  // Events
  EVENTS: '/admin/events',
  EVENT_NEW: '/admin/events/new',
  EVENT_EDIT: '/admin/events/:id',

  // Analytics
  COMMERCE_ANALYTICS: '/admin/analytics/commerce',
  COMMUNITY_ANALYTICS: '/admin/analytics/community',
  CONTENT_ANALYTICS: '/admin/analytics/content',
  LEGACY: '/admin/legacy',

  // System
  TEAM_ROLES: '/admin/system/team',
  GLOBAL_SETTINGS: '/admin/system/settings',
  AUDIT_LOG: '/admin/system/audit',

  // Components
  COMPONENTS: '/admin/components',
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
    case 'style-guides': return '/admin/commerce/style-guides'
    case 'style-guide-editor': return '/admin/commerce/style-guides/editor'
    case 'recommendation-hub': return '/admin/commerce/recommendation-hub'
    case 'recommendation-hub-editor': return '/admin/commerce/recommendation-hub/editor'
    case 'product-passports': return '/admin/commerce/product-passports'
    case 'product-passport-editor': return '/admin/commerce/product-passports/editor'
    case 'production-center': return '/admin/production'
    case 'production-templates': return '/admin/production/templates'
    case 'production-assets': return '/admin/production/assets'
    case 'print-presets': return '/admin/production/print-presets'
    case 'batch-generator': return '/admin/production/batch-jobs'
    case 'export-center': return '/admin/production/exports'
    case 'legacies': return ADMIN_ROUTES.LEGACY
    case 'legacy-archives': return '/admin/legacy/archives'
    case 'legacy-timeline': return '/admin/legacy/timeline'
    case 'legacy-keeper-circle': return '/admin/legacy/keeper-circle'
    case 'legacy-voting': return '/admin/legacy/voting'
    case 'legacy-rewards': return '/admin/legacy/rewards'
    case 'legacy-achievements': return '/admin/legacy/achievements'
    case 'legacy-invitations': return '/admin/legacy/invitations'
    case 'legacy-referral': return '/admin/legacy/referral'
    case 'legacy-analytics': return '/admin/legacy/analytics'
    case 'components': return ADMIN_ROUTES.COMPONENTS
    case 'heritage-library': return '/admin/content/heritage-library'
    case 'brand-assets': return '/admin/content/brand-assets'
    case 'qr-experiences': return '/admin/content/qr-experiences'
    case 'qr-code-generator': return '/admin/content/qr-code-generator'
    case 'legacy-keeper-levels': return '/admin/legacy/keeper-levels'
    case 'system-automation': return '/admin/system/automation'
    case 'production-analytics': return '/admin/analytics/production'
    case 'recommendation-analytics': return '/admin/analytics/recommendations'
    default: return ADMIN_ROUTES.DASHBOARD
  }
}

export function adminStateFromPath(pathname: string): { screen: Screen; productEditorId: string | null } {
  if (pathname === '/admin' || pathname === ADMIN_ROUTES.DASHBOARD) {
    return { screen: 'dashboard', productEditorId: null }
  }

  if (pathname === '/admin/commerce/style-guides') return { screen: 'style-guides', productEditorId: null }
  if (pathname === '/admin/commerce/style-guides/editor') return { screen: 'style-guide-editor', productEditorId: null }
  if (pathname === '/admin/commerce/recommendation-hub') return { screen: 'recommendation-hub', productEditorId: null }
  if (pathname === '/admin/commerce/recommendation-hub/editor') return { screen: 'recommendation-hub-editor', productEditorId: null }
  if (pathname === '/admin/commerce/product-passports') return { screen: 'product-passports', productEditorId: null }
  if (pathname === '/admin/commerce/product-passports/editor') return { screen: 'product-passport-editor', productEditorId: null }
  if (pathname === '/admin/content/qr-code-generator') return { screen: 'qr-code-generator', productEditorId: null }
  if (pathname === ADMIN_ROUTES.LEGACY) return { screen: 'legacies', productEditorId: null }
  if (pathname === `${ADMIN_ROUTES.LEGACY}/`) return { screen: 'legacies', productEditorId: null }

  if (pathname === ADMIN_ROUTES.PRODUCTS || pathname === `${ADMIN_ROUTES.PRODUCTS}/`) {
    return { screen: 'products', productEditorId: null }
  }

  if (pathname === ADMIN_ROUTES.PRODUCT_NEW) {
    return { screen: 'product-editor', productEditorId: null }
  }

  const productMatch = pathname.match(/^\/admin\/products\/([^/]+)$/)
  if (productMatch) {
    return { screen: 'product-editor', productEditorId: productMatch[1] }
  }

  if (pathname.startsWith('/admin/cms/pages/')) return { screen: 'site-page-editor', productEditorId: null }
  if (pathname.startsWith('/admin/stories/new') || (pathname.startsWith('/admin/stories/') && !pathname.startsWith('/admin/stories/review'))) return { screen: 'story-editor', productEditorId: null }
  if (pathname.startsWith('/admin/commerce/style-guides/editor')) return { screen: 'style-guide-editor', productEditorId: null }
  if (pathname.startsWith('/admin/commerce/recommendation-hub/editor')) return { screen: 'recommendation-hub-editor', productEditorId: null }
  if (pathname.startsWith('/admin/commerce/product-passports/editor')) return { screen: 'product-passport-editor', productEditorId: null }
  if (pathname.startsWith('/admin/collections/new') || pathname.startsWith('/admin/collections/')) return { screen: 'collection-editor', productEditorId: null }
  if (pathname.startsWith('/admin/challenges/new') || pathname.match(/^\/admin\/challenges\/[^/]+$/)) return { screen: 'challenge-editor', productEditorId: null }
  if (pathname.includes('/submissions')) return { screen: 'challenge-submissions', productEditorId: null }
  if (pathname.includes('/results')) return { screen: 'challenge-results', productEditorId: null }
  if (pathname.startsWith('/admin/lab/new') || pathname.match(/^\/admin\/lab\/[^/]+$/)) return { screen: 'lab-project-editor', productEditorId: null }
  if (pathname.startsWith('/admin/community/members/')) return { screen: 'member-profile', productEditorId: null }
  if (pathname.startsWith('/admin/community/contributions/')) return { screen: 'contribution-detail', productEditorId: null }
  if (pathname.startsWith('/admin/customers/')) return { screen: 'customer', productEditorId: null }

  const routeScreens: Array<[string, Screen]> = [
    ['/admin/dashboard', 'dashboard'],
    ['/admin/products', 'products'],
    ['/admin/collections', 'collections'],
    ['/admin/orders', 'orders'],
    ['/admin/customers', 'customer'],
    ['/admin/cms/home', 'home-builder'],
    ['/admin/media', 'media-library'],
    ['/admin/stories', 'stories'],
    ['/admin/stories/review', 'story-review'],
    ['/admin/community/members', 'members'],
    ['/admin/community/contributions', 'contributions'],
    ['/admin/challenges', 'challenges'],
    ['/admin/lab', 'lab-projects'],
    ['/admin/lab/open-calls', 'calls-for-contribution'],
    ['/admin/analytics/commerce', 'commerce-analytics'],
    ['/admin/analytics/community', 'community-analytics'],
    ['/admin/analytics/content', 'content-analytics'],
    ['/admin/system/team', 'team-roles'],
    ['/admin/system/settings', 'global-settings'],
    ['/admin/system/audit', 'audit-log'],
    ['/admin/components', 'components'],
    ['/admin/commerce/style-guides', 'style-guides'],
    ['/admin/commerce/recommendation-hub', 'recommendation-hub'],
    ['/admin/commerce/product-passports', 'product-passports'],
    ['/admin/content/qr-experiences', 'qr-experiences'],
    ['/admin/content/qr-code-generator', 'qr-code-generator'],
    ['/admin/production', 'production-center'],
    ['/admin/production/templates', 'production-templates'],
    ['/admin/production/assets', 'production-assets'],
    ['/admin/production/batch-jobs', 'batch-generator'],
    ['/admin/production/exports', 'export-center'],
    ['/admin/legacy', 'legacies'],
    ['/admin/legacy/archives', 'legacy-archives'],
    ['/admin/legacy/timeline', 'legacy-timeline'],
    ['/admin/legacy/keeper-circle', 'legacy-keeper-circle'],
    ['/admin/legacy/keeper-levels', 'legacy-keeper-levels'],
    ['/admin/legacy/voting', 'legacy-voting'],
    ['/admin/legacy/rewards', 'legacy-rewards'],
    ['/admin/legacy/achievements', 'legacy-achievements'],
    ['/admin/legacy/invitations', 'legacy-invitations'],
    ['/admin/legacy/referral', 'legacy-referral'],
    ['/admin/analytics/production', 'production-analytics'],
    ['/admin/analytics/recommendations', 'recommendation-analytics'],
    ['/admin/content/heritage-library', 'heritage-library'],
    ['/admin/content/brand-assets', 'brand-assets'],
    ['/admin/legacy/keeper-levels', 'legacy-keeper-levels'],
  ]

  const normalizedPath = pathname.replace(/\/$/, '') || '/'
  const matchedRoute = routeScreens.find(([route]) => route === normalizedPath)
  if (matchedRoute) {
    return { screen: matchedRoute[1], productEditorId: null }
  }

  return { screen: 'dashboard', productEditorId: null }
}

export function adminProductPath(id: string) {
  return `/admin/products/${id}`
}

export function adminCollectionPath(id: string) {
  return `/admin/collections/${id}`
}

export function adminOrderPath(id: string) {
  return `/admin/orders/${id}`
}

export function adminCustomerPath(id: string) {
  return `/admin/customers/${id}`
}

export function adminStoryPath(id: string) {
  return `/admin/stories/${id}`
}

export function adminChallengePath(id: string) {
  return `/admin/challenges/${id}`
}

export function adminChallengeSubmissionsPath(id: string) {
  return `/admin/challenges/${id}/submissions`
}

export function adminLabProjectPath(id: string) {
  return `/admin/lab/${id}`
}
