import type { CSSProperties, ReactNode } from 'react'
import { INDIGO, TEXT_SEC, BORDER, SURFACE, FONT_SERIF, FONT_SANS } from '../../theme/tokens'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  actions?: ReactNode
  style?: CSSProperties
}

export function PageHeader({ eyebrow, title, subtitle, actions, style }: PageHeaderProps) {
  return (
    <div
      style={{
        padding: '32px 40px 28px',
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 16,
        ...style,
      }}
    >
      <div>
        {eyebrow && (
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_SEC, marginBottom: 8, fontFamily: FONT_SANS }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ fontFamily: FONT_SERIF, fontSize: '28px', fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.15 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '13px', color: TEXT_SEC, margin: '6px 0 0', lineHeight: 1.6, fontFamily: FONT_SANS }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>{actions}</div>}
    </div>
  )
}

interface WebPageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  background?: string
  dark?: boolean
  style?: CSSProperties
}

export function WebPageHeader({ eyebrow, title, subtitle, background = SURFACE, dark = false, style }: WebPageHeaderProps) {
  const textColor = dark ? '#E7DFD2' : INDIGO
  const subColor = dark ? 'rgba(231,223,210,0.65)' : TEXT_SEC

  return (
    <div style={{ background, borderBottom: dark ? 'none' : `1px solid ${BORDER}`, padding: '56px 40px 40px', ...style }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {eyebrow && (
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? 'rgba(183,170,145,0.8)' : TEXT_SEC, marginBottom: 12, fontFamily: FONT_SANS }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ fontFamily: FONT_SERIF, fontSize: '48px', fontWeight: 500, color: textColor, margin: 0, lineHeight: 1.1 }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: '16px', color: subColor, margin: '12px 0 0', lineHeight: 1.7, maxWidth: 640, fontFamily: FONT_SANS }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
