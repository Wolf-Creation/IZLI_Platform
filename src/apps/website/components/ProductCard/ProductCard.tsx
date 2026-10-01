import type { KeyboardEvent } from 'react'
import type { MediaAsset } from '../../../entities'
import { OptimizedImage } from '../OptimizedImage/OptimizedImage'
import './ProductCard.scss'

interface ProductCardProps {
  name: string
  price: string
  image: string
  images?: readonly string[]
  mediaAssets?: readonly MediaAsset[]
  badge?: string
  onClick?: () => void
  onAddToCart?: () => void
  onToggleWishlist?: () => void
  isWishlisted?: boolean
  wishlistIcon?: 'heart' | 'trash'
  isInteractive?: boolean
  className?: string
}

export function ProductCard({
  name,
  price,
  image,
  images = [],
  mediaAssets = [],
  badge,
  onClick,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  wishlistIcon = 'heart',
  isInteractive = true,
  className = '',
}: ProductCardProps) {
  const productImages = [...new Set([image, ...images].filter(Boolean))]
  const secondaryImage = productImages.find(productImage => productImage !== image)
  const dimensionsForImage = (url: string) => {
    const asset = mediaAssets.find(mediaAsset => mediaAsset.url === url)
    return asset ? { width: asset.width, height: asset.height } : undefined
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return
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
      data-analytics-cta={`Product: ${name}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className="izli-product-card__image">
        <OptimizedImage src={image} preset="productCard" dimensions={dimensionsForImage(image)} alt={name} />
        {secondaryImage && <OptimizedImage src={secondaryImage} preset="productCard" dimensions={dimensionsForImage(secondaryImage)} alt="" aria-hidden="true" loading="lazy" className="izli-product-card__image-hover" />}
        {onToggleWishlist && <button
          type="button"
          className={`izli-product-card__wishlist${isWishlisted ? ' is-active' : ''}`}
          onClick={event => {
            event.stopPropagation()
            onToggleWishlist()
          }}
          aria-label={wishlistIcon === 'trash' ? `Remove ${name} from wishlist` : isWishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={isWishlisted}
        >
          {wishlistIcon === 'trash' ? <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg> : <svg viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} aria-hidden="true"><path d="M7.25 3.75h9.5A1.75 1.75 0 0 1 18.5 5.5v14.75L12 16.4l-6.5 3.85V5.5a1.75 1.75 0 0 1 1.75-1.75Z" /></svg>}
        </button>}
        <button
          type="button"
          className="izli-product-card__cta"
          tabIndex={isInteractive ? undefined : -1}
          data-analytics-cta={`Add to cart: ${name}`}
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
        <strong>{price}</strong>
      </span>
    </article>
  )
}
