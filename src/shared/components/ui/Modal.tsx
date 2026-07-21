import type { CSSProperties, ReactNode } from 'react'
import { SURFACE, BORDER, SURFACE_2, INDIGO, TEXT_SEC, Z, FONT_SERIF, FONT_SANS } from '../../theme/tokens'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  width?: number | string
  style?: CSSProperties
}

export function Modal({ open, onClose, title, subtitle, children, footer, width = 560, style }: ModalProps) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(30,47,68,0.45)',
        zIndex: Z.modal,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          width,
          maxWidth: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 16px 48px rgba(30,47,68,0.22)',
          ...style,
        }}
      >
        {title && (
          <div style={{ padding: '20px 24px 16px', background: SURFACE_2, borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: '20px', fontWeight: 500, color: INDIGO }}>{title}</div>
              {subtitle && <div style={{ fontSize: '12px', color: TEXT_SEC, marginTop: 2, fontFamily: FONT_SANS }}>{subtitle}</div>}
            </div>
            <button
              onClick={onClose}
              style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${BORDER}`, background: 'transparent', cursor: 'pointer', fontSize: 16, color: TEXT_SEC, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_SANS }}
            >
              ×
            </button>
          </div>
        )}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {children}
        </div>
        {footer && (
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${BORDER}`, flexShrink: 0, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
