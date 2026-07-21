import type { CSSProperties, ReactNode } from 'react'
import {
  INDIGO, CREAM, SAGE, TEXT_SEC,
  ERROR, ERROR_BG, SUCCESS, SUCCESS_BG, WARNING, WARNING_BG, INFO, INFO_BG,
  SURFACE_2, FONT_SANS,
} from '../../theme/tokens'

export type BadgeVariant =
  | 'indigo' | 'clay' | 'sage' | 'sand'
  | 'success' | 'warning' | 'error' | 'info'
  | 'neutral' | 'dark'

export type BadgeSize = 'xs' | 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  pill?: boolean
  style?: CSSProperties
}

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; color: string }> = {
  indigo: { bg: INFO_BG, color: INFO },
  clay: { bg: WARNING_BG, color: WARNING },
  sage: { bg: '#E8EDE6', color: SAGE },
  sand: { bg: SURFACE_2, color: '#7A6E59' },
  success: { bg: SUCCESS_BG, color: SUCCESS },
  warning: { bg: WARNING_BG, color: WARNING },
  error: { bg: ERROR_BG, color: ERROR },
  info: { bg: INFO_BG, color: INFO },
  neutral: { bg: SURFACE_2, color: TEXT_SEC },
  dark: { bg: INDIGO, color: CREAM },
}

const SIZE_STYLES: Record<BadgeSize, CSSProperties> = {
  xs: { fontSize: '10px', padding: '2px 7px', borderRadius: 999 },
  sm: { fontSize: '11px', padding: '3px 9px', borderRadius: 999 },
  md: { fontSize: '12px', padding: '4px 11px', borderRadius: 999 },
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  pill = true,
  style,
}: BadgeProps) {
  const { bg, color } = VARIANT_COLORS[variant]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: FONT_SANS,
        fontWeight: 500,
        letterSpacing: '0.01em',
        background: bg,
        color,
        borderRadius: pill ? 999 : 6,
        ...SIZE_STYLES[size],
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: size === 'xs' ? 4 : 5,
            height: size === 'xs' ? 4 : 5,
            borderRadius: 999,
            background: color,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  )
}

export function StatusChip({ status, style }: { status: string; style?: CSSProperties }) {
  const map: Record<string, BadgeVariant> = {
    published: 'success', active: 'success', approved: 'info', featured: 'clay',
    delivered: 'success', confirmed: 'info', shipped: 'sage',
    draft: 'neutral', pending: 'neutral', upcoming: 'neutral',
    archived: 'neutral', closed: 'neutral', paused: 'neutral',
    rejected: 'error', cancelled: 'error', banned: 'error', suspended: 'error',
    review: 'warning', 'under-review': 'warning', shortlisted: 'clay',
    winner: 'clay', results: 'sand',
  }
  const v: BadgeVariant = map[status?.toLowerCase()] ?? 'neutral'
  return <Badge variant={v} size="sm" style={style}>{status}</Badge>
}
