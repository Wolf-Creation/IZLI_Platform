import { useState } from 'react'
import { INDIGO, CREAM, SUCCESS, SUCCESS_BG, ERROR, ERROR_BG, FONT_SANS, Z } from '../../theme/tokens'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning'

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

const VARIANT_STYLES: Record<ToastVariant, { bg: string; color: string; border: string }> = {
  default: { bg: INDIGO, color: CREAM, border: 'transparent' },
  success: { bg: SUCCESS_BG, color: SUCCESS, border: `${SUCCESS}40` },
  error: { bg: ERROR_BG, color: ERROR, border: `${ERROR}40` },
  warning: { bg: '#F5EDE3', color: '#8C6B52', border: '#8C6B5240' },
}

interface ToastContainerProps {
  toasts: ToastItem[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove: _onRemove }: ToastContainerProps) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: Z.toast, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
      {toasts.map(toast => {
        const s = VARIANT_STYLES[toast.variant]
        return (
          <div key={toast.id} style={{ padding: '10px 18px', borderRadius: 12, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: '13px', fontFamily: FONT_SANS, fontWeight: 500, boxShadow: '0 4px 16px rgba(30,47,68,0.18)', pointerEvents: 'auto', maxWidth: 400 }}>
            {toast.message}
          </div>
        )
      })}
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const show = (message: string, variant: ToastVariant = 'default', duration = 3000) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, variant }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }

  const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  return { toasts, show, remove }
}
