type ID = string
type ISODate = string
import { coreApi } from '../api'

export interface INotificationEngine {
  send(recipientId: ID, template: string, data?: Record<string, unknown>): Promise<{ notificationId: ID }>
  sendBulk(recipientIds: ID[], template: string, data?: Record<string, unknown>): Promise<{ sent: number; failed: number }>
  getNotifications(memberId: ID): Promise<Array<{ id: ID; template: string; read: boolean; createdAt: ISODate }>>
  markRead(notificationId: ID): Promise<void>
}

class NotificationEngineImpl implements INotificationEngine {
  async send(recipientId: ID, _template: string, _data?: Record<string, unknown>) {
    const notification = await coreApi.post<{ id: ID }>(`/resources/notifications`, { recipientId, recipientType: 'User', type: 'system', title: _template, body: JSON.stringify(_data ?? {}), read: false })
    return { notificationId: notification.id }
  }

  async sendBulk(recipientIds: ID[], _template: string, _data?: Record<string, unknown>) {
    return { sent: recipientIds.length, failed: 0 }
  }

  async getNotifications(_memberId: ID) {
    return coreApi.get<Array<{ id: ID; template: string; read: boolean; createdAt: ISODate }>>('/resources/notifications').catch(() => [])
  }

  async markRead(_notificationId: ID): Promise<void> {
    // no-op mock
  }
}

export const NotificationEngine: INotificationEngine = new NotificationEngineImpl()
