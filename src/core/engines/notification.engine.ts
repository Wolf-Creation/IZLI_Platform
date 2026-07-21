type ID = string
type ISODate = string

export interface INotificationEngine {
  send(recipientId: ID, template: string, data?: Record<string, unknown>): Promise<{ notificationId: ID }>
  sendBulk(recipientIds: ID[], template: string, data?: Record<string, unknown>): Promise<{ sent: number; failed: number }>
  getNotifications(memberId: ID): Promise<Array<{ id: ID; template: string; read: boolean; createdAt: ISODate }>>
  markRead(notificationId: ID): Promise<void>
}

class NotificationEngineImpl implements INotificationEngine {
  async send(recipientId: ID, _template: string, _data?: Record<string, unknown>) {
    return { notificationId: `notif-${recipientId}-${Date.now()}` }
  }

  async sendBulk(recipientIds: ID[], _template: string, _data?: Record<string, unknown>) {
    return { sent: recipientIds.length, failed: 0 }
  }

  async getNotifications(_memberId: ID) {
    return [
      { id: 'notif-1', template: 'product-published', read: false, createdAt: '2024-06-01T10:00:00Z' },
      { id: 'notif-2', template: 'keeper-leveled-up', read: true, createdAt: '2024-05-28T14:30:00Z' },
    ]
  }

  async markRead(_notificationId: ID): Promise<void> {
    // no-op mock
  }
}

export const NotificationEngine: INotificationEngine = new NotificationEngineImpl()
