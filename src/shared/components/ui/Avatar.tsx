import type { CSSProperties } from 'react'
import { INDIGO, CREAM, CLAY, SAGE, SAND, FONT_SERIF } from '../../theme/tokens'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarVariant = 'indigo' | 'clay' | 'sage' | 'sand'

const SIZE_PX: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 }
const FONT_PX: Record<AvatarSize, number> = { xs: 9, sm: 11, md: 14, lg: 20, xl: 26 }
const BORDER_RADIUS: Record<AvatarSize, number> = { xs: 6, sm: 8, md: 10, lg: 14, xl: 16 }

const BG_MAP: Record<AvatarVariant, { bg: string; color: string }> = {
  indigo: { bg: INDIGO, color: CREAM },
  clay: { bg: CLAY, color: CREAM },
  sage: { bg: SAGE, color: CREAM },
  sand: { bg: SAND, color: CREAM },
}

interface AvatarProps {
  name?: string
  imageUrl?: string
  size?: AvatarSize
  variant?: AvatarVariant
  round?: boolean
  style?: CSSProperties
}

function initials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function Avatar({ name, imageUrl, size = 'md', variant = 'indigo', round = false, style }: AvatarProps) {
  const px = SIZE_PX[size]
  const fontSize = FONT_PX[size]
  const borderRadius = round ? 999 : BORDER_RADIUS[size]
  const { bg, color } = BG_MAP[variant]

  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius,
        overflow: 'hidden',
        flexShrink: 0,
        background: imageUrl ? 'transparent' : bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <span style={{ fontSize, fontWeight: 700, color, fontFamily: FONT_SERIF, lineHeight: 1 }}>
          {name ? initials(name) : '?'}
        </span>
      )}
    </div>
  )
}
