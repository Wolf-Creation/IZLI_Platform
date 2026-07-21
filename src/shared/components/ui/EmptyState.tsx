import type { CSSProperties, ReactNode } from 'react'
import { TEXT_SEC, FONT_SERIF, FONT_SANS } from '../../theme/tokens'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  style?: CSSProperties
}

export function EmptyState({ icon, title, description, action, style }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 32px',
        textAlign: 'center',
        gap: 12,
        ...style,
      }}
    >
      {icon && (
        <div style={{ fontSize: 32, color: TEXT_SEC, opacity: 0.4, marginBottom: 4 }}>
          {icon}
        </div>
      )}
      <div style={{ fontFamily: FONT_SERIF, fontSize: '20px', color: TEXT_SEC, fontWeight: 500 }}>
        {title}
      </div>
      {description && (
        <div style={{ fontSize: '13px', color: TEXT_SEC, opacity: 0.7, maxWidth: 360, lineHeight: 1.6, fontFamily: FONT_SANS }}>
          {description}
        </div>
      )}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  )
}
