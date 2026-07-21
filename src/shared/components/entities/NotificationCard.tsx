import type { CSSProperties } from 'react'
import type { Notification } from '../../../entities'
import { TEXT, TEXT_SEC, BORDER, SURFACE, INDIGO, FONT_SANS } from '../../theme/tokens'

interface NotificationCardProps {
  notification: Pick<Notification, 'id' | 'type' | 'title' | 'body' | 'read' | 'createdAt'>
  onClick?: () => void
  style?: CSSProperties
}

const TYPE_ICON: Record<string, string> = {
  'contribution-approved': '◫',
  'contribution-featured': '◈',
  'contribution-rejected': '◫',
  'challenge-result': '◇',
  'challenge-joined': '◇',
  'challenge-reminder': '◇',
  'order-confirmed': '⬡',
  'order-shipped': '⬡',
  'order-delivered': '⬡',
  'lab-project-update': '⬠',
  'new-collection': '▣',
  'event-reminder': '◷',
  'level-up': '▲',
  'reward-earned': '◈',
  'mention': '◉',
  'system': '◌',
}

export function NotificationCard({ notification, onClick, style }: NotificationCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: notification.read ? SURFACE : '#EBF0F5',
        border: `1px solid ${notification.read ? BORDER : `${INDIGO}30`}`,
        borderRadius: 12,
        padding: '12px 16px',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        ...style,
      }}
    >
      <div style={{ fontSize: 18, color: INDIGO, flexShrink: 0, marginTop: 1 }}>
        {TYPE_ICON[notification.type] ?? '◌'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: notification.read ? 400 : 600, color: TEXT, marginBottom: 3, fontFamily: FONT_SANS }}>
          {notification.title}
        </div>
        <div style={{ fontSize: '12px', color: TEXT_SEC, lineHeight: 1.5, fontFamily: FONT_SANS }}>
          {notification.body}
        </div>
        <div style={{ fontSize: '11px', color: TEXT_SEC, marginTop: 5, fontFamily: FONT_SANS, opacity: 0.65 }}>
          {notification.createdAt.slice(0, 10)}
        </div>
      </div>
      {!notification.read && (
        <div style={{ width: 7, height: 7, borderRadius: 999, background: INDIGO, flexShrink: 0, marginTop: 5 }} />
      )}
    </div>
  )
}
