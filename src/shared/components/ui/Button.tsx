import type { CSSProperties, ReactNode } from 'react'
import { INDIGO, CREAM, TEXT_SEC, BORDER, BG, ERROR, FONT_SANS } from '../../theme/tokens'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  style?: CSSProperties
}

const VARIANT_STYLES: Record<ButtonVariant, CSSProperties> = {
  primary: { background: INDIGO, color: CREAM, border: 'none' },
  secondary: { background: BG, color: INDIGO, border: `1px solid ${BORDER}` },
  ghost: { background: 'transparent', color: TEXT_SEC, border: 'none' },
  danger: { background: ERROR, color: CREAM, border: 'none' },
}

const SIZE_STYLES: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '5px 12px', fontSize: '12px', borderRadius: 8, height: 30 },
  md: { padding: '8px 18px', fontSize: '13px', borderRadius: 10, height: 36 },
  lg: { padding: '12px 24px', fontSize: '14px', borderRadius: 12, height: 44 },
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button',
  icon,
  iconPosition = 'left',
  style,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        fontFamily: FONT_SANS,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        width: fullWidth ? '100%' : 'auto',
        whiteSpace: 'nowrap',
        transition: 'opacity 150ms ease',
        ...VARIANT_STYLES[variant],
        ...SIZE_STYLES[size],
        ...style,
      }}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}

export function IconButton({
  icon,
  label,
  onClick,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  style,
}: {
  icon: ReactNode
  label: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  style?: CSSProperties
}) {
  const sz = size === 'sm' ? 28 : size === 'lg' ? 40 : 34
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      style={{
        width: sz,
        height: sz,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: size === 'lg' ? 12 : 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        fontFamily: FONT_SANS,
        transition: 'opacity 150ms ease',
        ...VARIANT_STYLES[variant],
        padding: 0,
        ...style,
      }}
    >
      {icon}
    </button>
  )
}
