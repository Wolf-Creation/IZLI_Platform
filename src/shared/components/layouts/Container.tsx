import type { CSSProperties, ReactNode } from 'react'
import { LAYOUT } from '../../theme/tokens'

interface ContainerProps {
  children: ReactNode
  maxWidth?: number | string
  padding?: string | number
  center?: boolean
  style?: CSSProperties
}

export function Container({ children, maxWidth = LAYOUT.maxContentWidth, padding = `0 ${LAYOUT.gutter}px`, center = true, style }: ContainerProps) {
  return (
    <div
      style={{
        maxWidth,
        margin: center ? '0 auto' : undefined,
        padding,
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

interface SectionProps {
  children: ReactNode
  background?: string
  padding?: string
  style?: CSSProperties
}

export function Section({ children, background, padding = '72px 0', style }: SectionProps) {
  return (
    <section style={{ background, padding, ...style }}>
      <Container>{children}</Container>
    </section>
  )
}
