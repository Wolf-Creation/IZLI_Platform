import type { CSSProperties, ReactNode } from 'react'
import { BORDER, SURFACE, BG, INDIGO, TEXT_SEC, FONT_SANS } from '../../theme/tokens'

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface FilterToolbarProps {
  filters?: FilterOption[]
  activeFilter?: string
  onFilterChange?: (value: string) => void
  searchSlot?: ReactNode
  actionSlot?: ReactNode
  sortSlot?: ReactNode
  style?: CSSProperties
}

export function FilterToolbar({ filters, activeFilter, onFilterChange, searchSlot, actionSlot, sortSlot, style }: FilterToolbarProps) {
  return (
    <div
      style={{
        padding: '12px 40px',
        background: SURFACE,
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {/* Filter pills */}
      {filters && (
        <div style={{ display: 'flex', gap: 6, flex: 1, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => onFilterChange?.(f.value)}
              style={{
                padding: '5px 13px',
                borderRadius: 999,
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: FONT_SANS,
                border: `1px solid ${activeFilter === f.value ? INDIGO : BORDER}`,
                background: activeFilter === f.value ? INDIGO : BG,
                color: activeFilter === f.value ? '#FFFFFF' : TEXT_SEC,
                cursor: 'pointer',
              }}
            >
              {f.label}{f.count !== undefined ? ` (${f.count})` : ''}
            </button>
          ))}
        </div>
      )}

      {/* Right side slots */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: filters ? 'auto' : 0 }}>
        {searchSlot}
        {sortSlot}
        {actionSlot}
      </div>
    </div>
  )
}

interface ActionBarProps {
  left?: ReactNode
  right?: ReactNode
  style?: CSSProperties
}

export function ActionBar({ left, right, style }: ActionBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        ...style,
      }}
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{left}</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{right}</div>
    </div>
  )
}
