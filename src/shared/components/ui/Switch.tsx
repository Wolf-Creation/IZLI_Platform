import type { CSSProperties, ReactNode } from 'react'
import { INDIGO, BORDER, CREAM, TEXT_SEC, FONT_SANS } from '../../theme/tokens'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  hint?: string
  disabled?: boolean
  size?: 'sm' | 'md'
  style?: CSSProperties
}

export function Switch({ checked, onChange, label, hint, disabled = false, size = 'md', style }: SwitchProps) {
  const w = size === 'sm' ? 32 : 40
  const h = size === 'sm' ? 18 : 22
  const dot = size === 'sm' ? 12 : 16
  const offset = size === 'sm' ? 3 : 3

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}
      onClick={() => !disabled && onChange(!checked)}>
      <div
        style={{
          width: w, height: h, borderRadius: 999, flexShrink: 0, marginTop: 1,
          background: checked ? INDIGO : BORDER,
          transition: 'background 200ms ease',
          position: 'relative',
        }}
      >
        <div style={{
          width: dot, height: dot, borderRadius: 999, background: CREAM,
          position: 'absolute', top: offset, left: checked ? w - dot - offset : offset,
          transition: 'left 200ms ease',
          boxShadow: '0 1px 3px rgba(30,47,68,0.25)',
        }} />
      </div>
      {(label || hint) && (
        <div>
          {label && <div style={{ fontSize: '13px', fontFamily: FONT_SANS, color: '#2E2E2E', fontWeight: 400 }}>{label}</div>}
          {hint && <div style={{ fontSize: '11px', color: TEXT_SEC, fontFamily: FONT_SANS, marginTop: 2 }}>{hint}</div>}
        </div>
      )}
    </div>
  )
}

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  hint?: string
  disabled?: boolean
  indeterminate?: boolean
  style?: CSSProperties
}

export function Checkbox({ checked, onChange, label, hint, disabled = false, indeterminate = false, style }: CheckboxProps) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div style={{
        width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1,
        border: `2px solid ${checked || indeterminate ? INDIGO : BORDER}`,
        background: checked || indeterminate ? INDIGO : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 150ms ease',
      }}>
        {(checked || indeterminate) && (
          <span style={{ color: CREAM, fontSize: '10px', fontWeight: 700, lineHeight: 1 }}>
            {indeterminate ? '−' : '✓'}
          </span>
        )}
      </div>
      {(label || hint) && (
        <div>
          {label && <div style={{ fontSize: '13px', fontFamily: FONT_SANS, color: '#2E2E2E' }}>{label}</div>}
          {hint && <div style={{ fontSize: '11px', color: TEXT_SEC, fontFamily: FONT_SANS, marginTop: 2 }}>{hint}</div>}
        </div>
      )}
    </div>
  )
}
