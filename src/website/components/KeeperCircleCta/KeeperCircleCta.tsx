import type { ButtonHTMLAttributes, ReactNode } from 'react'

type KeeperCircleCtaVariant = 'primary' | 'secondary'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: KeeperCircleCtaVariant
  children: ReactNode
}

const CTA_ICONS: Record<KeeperCircleCtaVariant, string> = {
  primary: '→',
  secondary: '↗',
}

export function KeeperCircleCta({ variant = 'primary', children, className = '', ...props }: Props) {
  const variantClass = variant === 'secondary' ? ' keeper-benefit-panel__cta--secondary' : ''

  return (
    <button
      type="button"
      className={`keeper-benefit-panel__cta${variantClass}${className ? ` ${className}` : ''}`}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden="true">{CTA_ICONS[variant]}</span>
    </button>
  )
}