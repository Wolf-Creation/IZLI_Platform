import type { CSSProperties, ReactNode } from 'react'
import { SURFACE, BORDER, SURFACE_2, INDIGO, FONT_SERIF, FONT_SANS } from '../../theme/tokens'

interface CardProps {
  children: ReactNode
  style?: CSSProperties
  onClick?: () => void
  hoverable?: boolean
}

export function Card({ children, style, onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: (hoverable || onClick) ? 'pointer' : 'default',
        transition: 'box-shadow 150ms ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
  style?: CSSProperties
}

export function CardHeader({ title, subtitle, action, style }: CardHeaderProps) {
  return (
    <div
      style={{
        padding: '16px 20px 14px',
        background: SURFACE_2,
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        ...style,
      }}
    >
      <div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: '16px', fontWeight: 500, color: INDIGO }}>{title}</div>
        {subtitle && <div style={{ fontSize: '12px', color: '#506681', marginTop: 2, fontFamily: FONT_SANS }}>{subtitle}</div>}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}

interface CardBodyProps {
  children: ReactNode
  padding?: string | number
  style?: CSSProperties
}

export function CardBody({ children, padding = '20px', style }: CardBodyProps) {
  return (
    <div style={{ padding, ...style }}>
      {children}
    </div>
  )
}
