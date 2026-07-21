import type { CSSProperties, ReactNode } from 'react'

interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4 | 5
  gap?: number
  colGap?: number
  rowGap?: number
  style?: CSSProperties
}

export function Grid({ children, cols = 3, gap, colGap = 24, rowGap = 24, style }: GridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        columnGap: gap ?? colGap,
        rowGap: gap ?? rowGap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

interface AutoGridProps {
  children: ReactNode
  minColWidth?: number
  gap?: number
  style?: CSSProperties
}

export function AutoGrid({ children, minColWidth = 280, gap = 24, style }: AutoGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}px, 1fr))`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
