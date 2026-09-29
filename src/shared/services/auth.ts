import type { User } from '../../entities'
import { api } from './api'

const CURRENT_USER_KEY = 'izli.currentUser'
const ACCESS_TOKEN_KEY = 'izli.accessToken'
const ADMIN_SESSION_EXPIRES_AT_KEY = 'izli.adminSessionExpiresAt'
const ADMIN_SESSION_DURATION_MS = 60 * 60 * 1000

export interface KeeperProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  gender?: string
  phone?: string
  governorate?: string
  age?: number
  twoFactorEnabled?: boolean
  avatarUrl?: string
  createdAt: string
}

const MOCK_USER: User = {
  id: 'user-001',
  email: 'yidir@izli.com',
  displayName: 'Yidir Ait Ouali',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&auto=format',
  role: 'owner',
  status: 'active',
  createdAt: '2023-06-01T10:00:00Z',
  lastActiveAt: new Date().toISOString(),
}

let currentUser: User | null = null

const persistSession = (user: User | null, accessToken?: string) => {
  currentUser = user
  if (typeof localStorage !== 'undefined') {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    } else if (!user) {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
    if (!user) {
      localStorage.removeItem(ADMIN_SESSION_EXPIRES_AT_KEY)
    } else if (['admin', 'owner'].includes(user.role)) {
      if (accessToken) {
        localStorage.setItem(ADMIN_SESSION_EXPIRES_AT_KEY, String(getTokenExpiration(accessToken) ?? Date.now() + ADMIN_SESSION_DURATION_MS))
      }
    } else if (accessToken) {
      localStorage.removeItem(ADMIN_SESSION_EXPIRES_AT_KEY)
    }
  }
}

function getTokenExpiration(token: string): number | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(atob(normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '='))) as { exp?: number }
    return typeof decoded.exp === 'number' ? decoded.exp * 1000 : null
  } catch {
    return null
  }
}

const readStoredUser = (): User | null => {
  if (typeof localStorage === 'undefined') return null
  const raw = localStorage.getItem(CURRENT_USER_KEY)
  return raw ? JSON.parse(raw) as User : null
}

const inferRoleFromEmail = (email: string): User['role'] => {
  const normalized = email.toLowerCase()
  if (normalized.includes('admin')) return 'admin'
  if (normalized.includes('owner')) return 'owner'
  if (normalized.includes('moderator')) return 'moderator'
  if (normalized.includes('viewer')) return 'viewer'
  return 'editor'
}

export async function login(email: string, password: string): Promise<User> {
  try {
    const result = await api.post<{ user: User; accessToken: string }>('/auth/login', { email, password })
    persistSession(result.user, result.accessToken)
    return result.user
  } catch {
    const user: User = {
      ...MOCK_USER,
      email,
      displayName: email.split('@')[0] || MOCK_USER.displayName,
      role: inferRoleFromEmail(email),
      lastActiveAt: new Date().toISOString(),
    }
    persistSession(user)
    return user
  }
}

export async function loginAdmin(email: string, password: string): Promise<User> {
  const result = await api.post<{ user: User; accessToken: string }>('/auth/login', { email, password })
  if (!['admin', 'owner'].includes(result.user.role)) throw new Error('This account does not have admin access.')
  persistSession(result.user, result.accessToken)
  return result.user
}

export function getStoredUser(): User | null {
  return readStoredUser()
}

export function getAdminSessionExpiresAt(): number | null {
  if (typeof localStorage === 'undefined') return null
  const user = readStoredUser()
  if (!user || !['admin', 'owner'].includes(user.role)) return null
  const storedExpiry = Number(localStorage.getItem(ADMIN_SESSION_EXPIRES_AT_KEY))
  if (Number.isFinite(storedExpiry) && storedExpiry > 0) return storedExpiry

  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  const tokenExpiry = token ? getTokenExpiration(token) : null
  const expiresAt = tokenExpiry ?? Date.now() + ADMIN_SESSION_DURATION_MS
  localStorage.setItem(ADMIN_SESSION_EXPIRES_AT_KEY, String(expiresAt))
  return expiresAt
}

export function hasStoredSession() {
  if (typeof localStorage === 'undefined') return false
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  const user = readStoredUser()
  if (!token || !user) return false
  if (['admin', 'owner'].includes(user.role)) {
    const expiresAt = getAdminSessionExpiresAt()
    if (!expiresAt || expiresAt <= Date.now()) {
      persistSession(null)
      return false
    }
  }
  return true
}

export function getAdminProfile(): Promise<Pick<User, 'id' | 'email' | 'displayName' | 'role' | 'status'>> {
  return api.get('/auth/admin/profile')
}

export function updateAdminProfile(data: { email: string; displayName: string; password?: string }) {
  return api.patch<Pick<User, 'id' | 'email' | 'displayName' | 'role' | 'status'>>('/auth/admin/profile', data).then(profile => {
    const current = readStoredUser()
    if (current) persistSession({ ...current, ...profile })
    return profile
  })
}

export function getKeeperProfile() {
  return api.get<KeeperProfile>('/auth/keeper/profile')
}

export function updateKeeperProfile(data: Pick<KeeperProfile, 'firstName' | 'lastName' | 'gender' | 'phone' | 'governorate' | 'age'>) {
  return api.patch<KeeperProfile>('/auth/keeper/profile', data)
}

export function updateKeeperSecurity(data: { twoFactorEnabled?: boolean; currentPassword?: string; newPassword?: string }) {
  return api.patch<KeeperProfile>('/auth/keeper/security', data)
}

export async function loginWithChallenge(email: string, password: string) {
  const result = await api.post<{ user?: User; accessToken?: string; twoFactorRequired?: boolean; devCode?: string }>('/auth/login', { email, password })
  if (result.user && result.accessToken) persistSession(result.user, result.accessToken)
  return result
}

export async function verifyLogin(email: string, code: string) {
  const result = await api.post<{ user: User; accessToken: string }>('/auth/login/verify', { email, code })
  persistSession(result.user, result.accessToken)
  return result.user
}

export async function register(email: string, password: string, name: string): Promise<User> {
  try {
    const result = await api.post<{ user: User; accessToken: string }>('/auth/register', { email, password, name })
    persistSession(result.user, result.accessToken)
    return result.user
  } catch {
    const user: User = {
      id: `user-${Date.now()}`,
      email,
      displayName: name,
      role: 'editor',
      status: 'active',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    }
    persistSession(user)
    return user
  }
}

export async function logout(): Promise<void> {
  persistSession(null)
}

export async function getCurrentUser(): Promise<User | null> {
  if (currentUser) return currentUser
  currentUser = hasStoredSession() ? readStoredUser() : null
  return currentUser
}

export async function updateProfile(data: Partial<User>): Promise<User | null> {
  const user = await getCurrentUser()
  if (!user) return null
  const updated = { ...user, ...data }
  persistSession(updated)
  return updated
}
