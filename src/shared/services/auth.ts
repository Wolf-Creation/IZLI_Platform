import type { User } from '../../entities'

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

let currentUser: User | null = MOCK_USER

export async function login(email: string, _password: string): Promise<User> {
  const user: User = {
    ...MOCK_USER,
    email,
    lastActiveAt: new Date().toISOString(),
  }
  currentUser = user
  return Promise.resolve(user)
}

export async function register(email: string, _password: string, name: string): Promise<User> {
  const user: User = {
    id: `user-${Date.now()}`,
    email,
    displayName: name,
    role: 'editor',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  }
  currentUser = user
  return Promise.resolve(user)
}

export async function logout(): Promise<void> {
  currentUser = null
  return Promise.resolve()
}

export async function getCurrentUser(): Promise<User | null> {
  return Promise.resolve(currentUser)
}

export async function updateProfile(data: Partial<User>): Promise<User | null> {
  if (!currentUser) return Promise.resolve(null)
  currentUser = { ...currentUser, ...data }
  return Promise.resolve(currentUser)
}
