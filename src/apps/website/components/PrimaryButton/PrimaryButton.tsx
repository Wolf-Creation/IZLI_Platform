import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './PrimaryButton.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: 'arrow' | 'plus'
}

export function PrimaryButton({ children, className = '', type = 'button', icon = 'arrow', ...props }: Props) {
  return (
    <button
      type={type}
      data-analytics-cta={typeof children === 'string' ? children : 'Primary button'}
      className={`primary-button${icon === 'plus' ? ' primary-button--plus' : ''}${className ? ` ${className}` : ''}`}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden="true">{icon === 'plus' ? '+' : '↗'}</span>
    </button>
  )
}
