export type AdminRole =
  | 'super-admin'
  | 'admin'
  | 'editor'
  | 'content-manager'
  | 'community-manager'
  | 'production-manager'
  | 'legacy-manager'

export type MemberRole = 'keeper' | 'member' | 'visitor'

export type PlatformRole = AdminRole | MemberRole

export type Permission =
  | 'products.read' | 'products.create' | 'products.edit' | 'products.delete' | 'products.publish'
  | 'collections.read' | 'collections.create' | 'collections.edit' | 'collections.publish'
  | 'orders.read' | 'orders.manage'
  | 'stories.read' | 'stories.create' | 'stories.edit' | 'stories.publish' | 'stories.review'
  | 'challenges.read' | 'challenges.create' | 'challenges.edit' | 'challenges.review'
  | 'community.read' | 'community.manage'
  | 'legacy.read' | 'legacy.manage' | 'legacy.vote' | 'legacy.archive'
  | 'production.read' | 'production.generate' | 'production.export'
  | 'analytics.read' | 'analytics.export'
  | 'settings.read' | 'settings.manage'
  | 'team.read' | 'team.manage'

const ROLE_PERMISSIONS: Record<PlatformRole, Permission[]> = {
  'super-admin': [
    'products.read', 'products.create', 'products.edit', 'products.delete', 'products.publish',
    'collections.read', 'collections.create', 'collections.edit', 'collections.publish',
    'orders.read', 'orders.manage',
    'stories.read', 'stories.create', 'stories.edit', 'stories.publish', 'stories.review',
    'challenges.read', 'challenges.create', 'challenges.edit', 'challenges.review',
    'community.read', 'community.manage',
    'legacy.read', 'legacy.manage', 'legacy.vote', 'legacy.archive',
    'production.read', 'production.generate', 'production.export',
    'analytics.read', 'analytics.export',
    'settings.read', 'settings.manage',
    'team.read', 'team.manage',
  ],
  'admin': [
    'products.read', 'products.create', 'products.edit', 'products.publish',
    'collections.read', 'collections.create', 'collections.edit', 'collections.publish',
    'orders.read', 'orders.manage',
    'stories.read', 'stories.create', 'stories.edit', 'stories.publish', 'stories.review',
    'challenges.read', 'challenges.create', 'challenges.edit', 'challenges.review',
    'community.read', 'community.manage',
    'legacy.read', 'legacy.manage', 'legacy.archive',
    'production.read', 'production.generate', 'production.export',
    'analytics.read', 'analytics.export',
    'settings.read',
    'team.read',
  ],
  'editor': [
    'products.read', 'products.create', 'products.edit',
    'collections.read', 'collections.create', 'collections.edit',
    'stories.read', 'stories.create', 'stories.edit',
    'challenges.read', 'challenges.create',
    'community.read',
    'legacy.read',
    'production.read',
    'analytics.read',
    'settings.read',
  ],
  'content-manager': [
    'products.read',
    'collections.read',
    'stories.read', 'stories.create', 'stories.edit', 'stories.publish', 'stories.review',
    'challenges.read', 'challenges.create', 'challenges.review',
    'community.read',
    'legacy.read',
    'analytics.read',
  ],
  'community-manager': [
    'products.read', 'collections.read',
    'stories.read',
    'challenges.read', 'challenges.create', 'challenges.edit', 'challenges.review',
    'community.read', 'community.manage',
    'legacy.read',
    'analytics.read',
  ],
  'production-manager': [
    'products.read', 'collections.read',
    'production.read', 'production.generate', 'production.export',
    'analytics.read',
  ],
  'legacy-manager': [
    'products.read', 'collections.read',
    'legacy.read', 'legacy.manage', 'legacy.archive',
    'analytics.read',
  ],
  'keeper': ['legacy.read', 'legacy.vote', 'community.read', 'stories.read', 'challenges.read'],
  'member': ['community.read', 'stories.read', 'challenges.read'],
  'visitor': ['stories.read'],
}

export function hasPermission(role: PlatformRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function getPermissions(role: PlatformRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? []
}

export function canAccess(role: PlatformRole, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p))
}

export const PermissionEngine = { hasPermission, getPermissions, canAccess, ROLE_PERMISSIONS }
