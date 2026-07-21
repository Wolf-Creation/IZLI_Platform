import type { CSSProperties } from 'react'
import { INDIGO, TEXT_SEC, FONT_SANS } from '../../theme/tokens'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  center?: boolean
  style?: CSSProperties
}

export function Loader({ size = 'md', label, center = false, style }: LoaderProps) {
  const px = size === 'sm' ? 16 : size === 'lg' ? 40 : 24
  const border = size === 'sm' ? 2 : 3

  const spinner = (
    <div style={{
      width: px,
      height: px,
      borderRadius: 999,
      border: `${border}px solid ${INDIGO}20`,
      borderTopColor: INDIGO,
      animation: 'spin 0.7s linear infinite',
      flexShrink: 0,
    }} />
  )

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          ...(center ? { minHeight: 200 } : {}),
          ...style,
        }}
      >
        {spinner}
        {label && <span style={{ fontSize: '13px', color: TEXT_SEC, fontFamily: FONT_SANS }}>{label}</span>}
      </div>
    </>
  )
}

export function SkeletonBlock({ width, height, borderRadius = 8, style }: { width?: string | number; height?: string | number; borderRadius?: number; style?: CSSProperties }) {
  return (
    <div style={{
      width: width ?? '100%',
      height: height ?? 16,
      borderRadius,
      background: 'linear-gradient(90deg, #EDE8DF 25%, #F5F1EA 50%, #EDE8DF 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s ease-in-out infinite',
      ...style,
    }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
    </div>
  )
}
