import { useState, type ReactNode, type CSSProperties } from 'react'
import { INDIGO, CREAM, FONT_SANS, Z } from '../../theme/tokens'

interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  style?: CSSProperties
}

export function Tooltip({ content, children, position = 'top', style }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  const posStyle: CSSProperties =
    position === 'top' ? { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 6 } :
    position === 'bottom' ? { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 6 } :
    position === 'left' ? { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 6 } :
    { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 6 }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute',
          ...posStyle,
          background: INDIGO,
          color: CREAM,
          fontSize: '11px',
          padding: '5px 10px',
          borderRadius: 7,
          whiteSpace: 'nowrap',
          fontFamily: FONT_SANS,
          fontWeight: 500,
          zIndex: Z.tooltip,
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(30,47,68,0.2)',
        }}>
          {content}
        </div>
      )}
    </div>
  )
}
