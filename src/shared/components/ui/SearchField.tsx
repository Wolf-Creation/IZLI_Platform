import { useState, type CSSProperties } from 'react'
import { TEXT, TEXT_SEC, BORDER, SURFACE, FONT_SANS } from '../../theme/tokens'

interface SearchFieldProps {
  value?: string
  placeholder?: string
  onChange: (value: string) => void
  onClear?: () => void
  width?: string | number
  style?: CSSProperties
}

export function SearchField({ value, placeholder = 'Search…', onChange, onClear, width = 260, style }: SearchFieldProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        width,
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <span style={{ position: 'absolute', left: 10, fontSize: 14, color: TEXT_SEC, pointerEvents: 'none' }}>⌕</span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '8px 32px 8px 30px',
          background: SURFACE,
          border: `1px solid ${focused ? '#1E2F44' : BORDER}`,
          borderRadius: 9,
          fontSize: '13px',
          color: TEXT,
          fontFamily: FONT_SANS,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 150ms ease',
        }}
      />
      {value && (
        <button
          onClick={() => { onChange(''); onClear?.() }}
          style={{ position: 'absolute', right: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: TEXT_SEC, display: 'flex', alignItems: 'center', padding: 2 }}
        >
          ×
        </button>
      )}
    </div>
  )
}
