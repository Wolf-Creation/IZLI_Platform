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
