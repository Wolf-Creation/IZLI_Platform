import { useState, useEffect, useCallback } from 'react'
import type { Notification } from '../../entities'
import { getNotifications, markRead as serviceMarkRead, markAllRead as serviceMarkAllRead, getUnreadCount } from '../services/notifications'

interface UseNotificationsResult {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  markRead: (id: string) => Promise<void>
  markAllRead: () => Promise<void>
}

export function useNotifications(userId: string): UseNotificationsResult {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    Promise.all([
      getNotifications(userId),
      getUnreadCount(userId),
    ])
      .then(([notifs, count]) => {
        setNotifications(notifs)
        setUnreadCount(count)
      })
      .finally(() => setLoading(false))
  }, [userId])

  const markRead = useCallback(async (id: string): Promise<void> => {
    await serviceMarkRead(id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }, [])

  const markAllRead = useCallback(async (): Promise<void> => {
    await serviceMarkAllRead(userId)
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [userId])

  return { notifications, unreadCount, loading, markRead, markAllRead }
}
