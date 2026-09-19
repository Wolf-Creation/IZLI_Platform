import type { KeyboardEvent } from 'react'
import './ProductCard.scss'

interface ProductCardProps {
  name: string
  subtitle?: string
  price: string
  image: string
  badge?: string
  onClick?: () => void
  onAddToCart?: () => void
  className?: string
}

export function ProductCard({
  name,
  subtitle,
  price,
  image,
  badge,
  onClick,
  onAddToCart,
  className = '',
}: ProductCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.()
    }
  }

  return (
    <article
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`izli-product-card ${className}`.trim()}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className="izli-product-card__image">
        <img src={image} alt={name} />
        <button
          type="button"
          className="izli-product-card__cta"
          onClick={event => {
            event.stopPropagation()
            onAddToCart?.()
          }}
          aria-label={`Add ${name} to cart`}
        >
          <span>Add to cart</span>
          <span className="izli-product-card__cta-icon" aria-hidden="true">+</span>
        </button>
      </span>

      {badge ? <span className="izli-product-card__badge">{badge}</span> : null}

      <span className="izli-product-card__info">
        <span className="izli-product-card__title">{name}</span>
        {subtitle ? <small>{subtitle}</small> : null}
        <strong>{price}</strong>
      </span>
    </article>
  )
}
