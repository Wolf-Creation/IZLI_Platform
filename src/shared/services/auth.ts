import type { User } from '../../entities'
import { api } from './api'

const CURRENT_USER_KEY = 'izli.currentUser'
const ACCESS_TOKEN_KEY = 'izli.accessToken'

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
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
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
  currentUser = readStoredUser() ?? MOCK_USER
  return currentUser
}

export async function updateProfile(data: Partial<User>): Promise<User | null> {
  const user = await getCurrentUser()
  if (!user) return null
  const updated = { ...user, ...data }
  persistSession(updated)
  return updated
}
