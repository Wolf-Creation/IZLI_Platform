import type { ReactNode } from 'react'
import { MinimalistProductProgress } from '../MinimalistProductRail/MinimalistProductRail'

interface TopBarSectionProps {
  title: string
  action: ReactNode
  progress?: number
  progressLabel?: string
  className?: string
}

export function TopBarSection({ title, action, progress, progressLabel, className = '' }: TopBarSectionProps) {
  const displayedProgress = progress === undefined ? undefined : Math.max(10, progress)

  return (
    <header className={`home-tops-editorial__header ${className}`.trim()}>
      <div className="website-content-container home-tops-editorial__header-content">
        <h2>{title}</h2>
        {action}
      </div>
      {displayedProgress !== undefined && (
        <div className="home-section-progress website-content-container">
          <MinimalistProductProgress progress={displayedProgress} label={progressLabel} />
        </div>
      )}
    </header>
  )
}
