import { useState, useEffect, useCallback } from 'react'
import type { User } from '../../entities'
import { getCurrentUser, login as serviceLogin, logout as serviceLogout, register as serviceRegister, updateProfile as serviceUpdateProfile } from '../services/auth'

interface UseAuthenticationResult {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<User>
  updateProfile: (data: Partial<User>) => Promise<User | null>
}

export function useAuthentication(): UseAuthenticationResult {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    const u = await serviceLogin(email, password)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    await serviceLogout()
    setUser(null)
  }, [])

  const register = useCallback(async (email: string, password: string, name: string): Promise<User> => {
    const u = await serviceRegister(email, password, name)
    setUser(u)
    return u
  }, [])

  const updateProfile = useCallback(async (data: Partial<User>): Promise<User | null> => {
    const u = await serviceUpdateProfile(data)
    if (u) setUser(u)
    return u
  }, [])

  return { user, loading, login, logout, register, updateProfile }
}
