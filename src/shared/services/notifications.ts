import type { Notification } from '../../entities'
import { api } from './api'

const NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    recipientId: 'user-001',
    type: 'contribution-featured',
    title: 'Contribution Featured',
    body: 'Amayas Berber\'s "Ancestral Zellij Grid" has been featured on the community page.',
    read: false,
    entityType: 'contribution',
    entityId: 'contrib-001',
    actionUrl: '/community/contributions/contrib-001',
    createdAt: '2025-03-20T14:00:00Z',
  },
  {
    id: 'notif-002',
    recipientId: 'user-001',
    type: 'order-shipped',
    title: 'Order Shipped',
    body: 'Order #ORD-002 has been shipped. Tracking number: MA987654321FR',
    read: false,
    entityType: 'order',
    entityId: 'ord-002',
    actionUrl: '/orders/ord-002',
    createdAt: '2025-03-09T16:00:00Z',
  },
  {
    id: 'notif-003',
    recipientId: 'user-001',
    type: 'challenge-result',
    title: 'Challenge Results Published',
    body: 'The results for the Zellij Reimagined challenge are now live. Check out the winners!',
    read: true,
    entityType: 'challenge',
    entityId: 'chal-001',
    actionUrl: '/challenges/zellij-reimagined',
    createdAt: '2025-04-10T10:00:00Z',
  },
  {
    id: 'notif-004',
    recipientId: 'user-001',
    type: 'new-collection',
    title: 'New Collection: Atlas FW25',
    body: 'The Atlas FW25 collection has just been published. Be the first to explore it.',
    read: true,
    entityType: 'collection',
    entityId: 'col-002',
    actionUrl: '/collections/atlas-fw25',
    createdAt: '2025-08-01T09:00:00Z',
  },
]

export async function getNotifications(recipientId: string): Promise<Notification[]> {
  try {
    const notifications = await api.get<Notification[]>('/resources/notifications')
    return notifications.filter(n => n.recipientId === recipientId)
  } catch {
    return Promise.resolve(NOTIFICATIONS.filter(n => n.recipientId === recipientId))
  }
}

export async function markRead(id: string): Promise<Notification | null> {
  try {
    return await api.patch<Notification>(`/resources/notifications/${id}`, { read: true })
  } catch {
    const idx = NOTIFICATIONS.findIndex(n => n.id === id)
    if (idx === -1) return Promise.resolve(null)
    NOTIFICATIONS[idx] = { ...NOTIFICATIONS[idx], read: true }
    return Promise.resolve(NOTIFICATIONS[idx])
  }
}

export async function markAllRead(recipientId: string): Promise<void> {
  try {
    const notifications = await api.get<Notification[]>('/resources/notifications')
    await Promise.all(
      notifications.filter(n => n.recipientId === recipientId && !n.read).map(n => api.patch(`/resources/notifications/${n.id}`, { read: true })),
    )
  } catch {
    NOTIFICATIONS.forEach((n, idx) => {
      if (n.recipientId === recipientId) {
        NOTIFICATIONS[idx] = { ...n, read: true }
      }
    })
  }
  return Promise.resolve()
}

export async function getUnreadCount(recipientId: string): Promise<number> {
  try {
    const notifications = await getNotifications(recipientId)
    return notifications.filter(n => !n.read).length
  } catch {
    return Promise.resolve(NOTIFICATIONS.filter(n => n.recipientId === recipientId && !n.read).length)
  }
}
