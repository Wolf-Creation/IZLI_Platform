import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './PrimaryButton.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function PrimaryButton({ children, className = '', type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      data-analytics-cta={typeof children === 'string' ? children : 'Primary button'}
      className={`primary-button${className ? ` ${className}` : ''}`}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </button>
  )
}
