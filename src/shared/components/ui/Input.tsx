import { type CSSProperties, type ReactNode, forwardRef } from 'react'
import { TEXT, TEXT_SEC, BORDER, BG, INDIGO, FONT_SANS, FONT_MONO } from '../../theme/tokens'

interface InputProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (v: string) => void
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel'
  disabled?: boolean
  mono?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  style?: CSSProperties
  id?: string
}

const baseInput: CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  background: BG,
  border: `1px solid ${BORDER}`,
  borderRadius: 9,
  fontSize: '13px',
  color: TEXT,
  outline: 'none',
  boxSizing: 'border-box',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, placeholder, value, defaultValue, onChange, type = 'text', disabled, mono, prefix, suffix, style, id },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const fontFamily = mono ? FONT_MONO : FONT_SANS

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: '11px', fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.03em', fontFamily: FONT_SANS }}
        >
          {label}{required && <span style={{ color: INDIGO, marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <div style={{ position: 'absolute', left: 10, color: TEXT_SEC, display: 'flex', alignItems: 'center' }}>
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={e => onChange?.(e.target.value)}
          disabled={disabled}
          style={{
            ...baseInput,
            fontFamily,
            paddingLeft: prefix ? 32 : 12,
            paddingRight: suffix ? 32 : 12,
            opacity: disabled ? 0.55 : 1,
            borderColor: error ? '#A63D2F' : BORDER,
            ...style,
          }}
        />
        {suffix && (
          <div style={{ position: 'absolute', right: 10, color: TEXT_SEC, display: 'flex', alignItems: 'center' }}>
            {suffix}
          </div>
        )}
      </div>
      {(hint || error) && (
        <span style={{ fontSize: '11px', color: error ? '#A63D2F' : TEXT_SEC, fontFamily: FONT_SANS }}>
          {error ?? hint}
        </span>
      )}
    </div>
  )
})

interface TextareaProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (v: string) => void
  rows?: number
  disabled?: boolean
  style?: CSSProperties
  id?: string
}

export function Textarea({ label, hint, error, required, placeholder, value, defaultValue, onChange, rows = 4, disabled, style, id }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label
          htmlFor={textareaId}
          style={{ fontSize: '11px', fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.03em', fontFamily: FONT_SANS }}
        >
          {label}{required && <span style={{ color: INDIGO, marginLeft: 2 }}>*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={e => onChange?.(e.target.value)}
        rows={rows}
        disabled={disabled}
        style={{
          ...baseInput,
          fontFamily: FONT_SANS,
          resize: 'vertical',
          opacity: disabled ? 0.55 : 1,
          borderColor: error ? '#A63D2F' : BORDER,
          ...style,
        }}
      />
      {(hint || error) && (
        <span style={{ fontSize: '11px', color: error ? '#A63D2F' : TEXT_SEC, fontFamily: FONT_SANS }}>
          {error ?? hint}
        </span>
      )}
    </div>
  )
}

interface SelectProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  value?: string
  defaultValue?: string
  onChange?: (v: string) => void
  disabled?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
  style?: CSSProperties
  id?: string
}

export function Select({ label, hint, error, required, value, defaultValue, onChange, disabled, options, placeholder, style, id }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{ fontSize: '11px', fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.03em', fontFamily: FONT_SANS }}
        >
          {label}{required && <span style={{ color: INDIGO, marginLeft: 2 }}>*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        defaultValue={defaultValue}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        style={{
          ...baseInput,
          fontFamily: FONT_SANS,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.55 : 1,
          borderColor: error ? '#A63D2F' : BORDER,
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23506681' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center',
          paddingRight: 28,
          ...style,
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {(hint || error) && (
        <span style={{ fontSize: '11px', color: error ? '#A63D2F' : TEXT_SEC, fontFamily: FONT_SANS }}>
          {error ?? hint}
        </span>
      )}
    </div>
  )
}
