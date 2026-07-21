import type { CSSProperties } from 'react'
import { TEXT_SEC, INDIGO, FONT_SANS } from '../../theme/tokens'

interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  style?: CSSProperties
}

export function Breadcrumb({ items, style }: BreadcrumbProps) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', ...style }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span style={{ fontSize: '12px', color: TEXT_SEC, opacity: 0.5 }}>/</span>}
          <span
            onClick={item.onClick}
            style={{
              fontSize: '12px',
              fontFamily: FONT_SANS,
              color: item.onClick ? INDIGO : TEXT_SEC,
              cursor: item.onClick ? 'pointer' : 'default',
              fontWeight: i === items.length - 1 ? 500 : 400,
              textDecoration: item.onClick ? 'underline' : 'none',
              textUnderlineOffset: 2,
              opacity: i === items.length - 1 ? 1 : 0.7,
            }}
          >
            {item.label}
          </span>
        </span>
      ))}
    </nav>
  )
}
