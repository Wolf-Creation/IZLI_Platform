import type { ReactNode } from 'react'
import './TopBarPage.scss'

interface TopBarPageProps {
  label?: string
  descriptions?: string[]
  action?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  className?: string
}

export function TopBarPage({ label, descriptions = [], action, leading, trailing, className = '' }: TopBarPageProps) {
  return (
    <header className={`top-bar-page ${className}`.trim()}>
      <div className="top-bar-page__inner">
        {leading ?? <div className="top-bar-page__brand-block">
          <span className="top-bar-page__label">{label}</span>
          {descriptions.length > 0 && <div className="top-bar-page__descriptions">{descriptions.map(description => <small key={description}>{description}</small>)}</div>}
        </div>}
        {trailing ?? (action ? <div className="top-bar-page__action">{action}</div> : null)}
      </div>
    </header>
  )
}
