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
