import type { CSSProperties, ReactNode } from 'react'
import { BG, LAYOUT } from '../../theme/tokens'

interface SidebarLayoutProps {
  sidebar: ReactNode
  sidebarWidth?: number
  children: ReactNode
  topbar?: ReactNode
  topbarHeight?: number
  style?: CSSProperties
}

export function SidebarLayout({ sidebar, sidebarWidth = LAYOUT.sidebarWidth, children, topbar, topbarHeight = LAYOUT.topbarHeight, style }: SidebarLayoutProps) {
  return (
    <div style={{ display: 'flex', height: '100vh', background: BG, ...style }}>
      {/* Sidebar */}
      <div style={{ width: sidebarWidth, flexShrink: 0, position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 200 }}>
        {sidebar}
      </div>
      {/* Main */}
      <div style={{ marginLeft: sidebarWidth, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {topbar && (
          <div style={{ height: topbarHeight, flexShrink: 0, position: 'sticky', top: 0, zIndex: 100 }}>
            {topbar}
          </div>
        )}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

interface ContentAreaProps {
  children: ReactNode
  padding?: string
  style?: CSSProperties
}

export function ContentArea({ children, padding = '32px 40px', style }: ContentAreaProps) {
  return (
    <div style={{ padding, ...style }}>
      {children}
    </div>
  )
}
