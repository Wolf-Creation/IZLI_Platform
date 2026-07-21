import type { CSSProperties } from 'react'
import { INDIGO, CREAM, TEXT_SEC, BORDER, BG, FONT_SANS } from '../../theme/tokens'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  showInfo?: boolean
  totalItems?: number
  pageSize?: number
  style?: CSSProperties
}

export function Pagination({ page, totalPages, onPageChange, showInfo = false, totalItems, pageSize, style }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1
    if (page <= 4) return i + 1
    if (page >= totalPages - 3) return totalPages - 6 + i
    return page - 3 + i
  })

  const btn = (_label: string | number, active: boolean, disabled: boolean, _onClick: () => void): CSSProperties => ({
    width: 34,
    height: 34,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    border: `1px solid ${active ? INDIGO : BORDER}`,
    background: active ? INDIGO : BG,
    color: active ? CREAM : disabled ? TEXT_SEC : INDIGO,
    fontSize: '13px',
    fontWeight: active ? 500 : 400,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    fontFamily: FONT_SANS,
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', ...style }}>
      {showInfo && totalItems !== undefined && pageSize !== undefined && (
        <span style={{ fontSize: '12px', color: TEXT_SEC, marginRight: 8, fontFamily: FONT_SANS }}>
          {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)} of {totalItems}
        </span>
      )}
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1} style={btn('‹', false, page === 1, () => {})}>‹</button>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} style={btn(p, p === page, false, () => {})}>{p}</button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} style={btn('›', false, page === totalPages, () => {})}>›</button>
    </div>
  )
}
