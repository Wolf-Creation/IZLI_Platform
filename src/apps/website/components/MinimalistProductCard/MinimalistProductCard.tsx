import type { MediaAsset } from '../../../entities'
import { Icon } from '@iconify/react'
import { OptimizedImage } from '../OptimizedImage/OptimizedImage'
import './MinimalistProductCard.scss'

export interface MinimalistProduct {
  id: string
  name: string
  price: string
  image: string
  hoverImage?: string
  mediaAssets?: readonly MediaAsset[]
}

interface Props {
  product: MinimalistProduct
  onClick: () => void
  isWishlisted?: boolean
  onToggleWishlist?: () => void
}

export function MinimalistProductCard({ product, onClick, isWishlisted = false, onToggleWishlist }: Props) {
  const dimensionsForImage = (url: string) => {
    const asset = product.mediaAssets?.find(mediaAsset => mediaAsset.url === url)
    return asset ? { width: asset.width, height: asset.height } : undefined
  }

  return (
    <article className="minimalist-product-card">
      <div className="minimalist-product-card__media">
        <button type="button" className="minimalist-product-card__image" onClick={onClick} aria-label={`View ${product.name}`}>
          <OptimizedImage
            src={product.image}
            preset="productCard"
            dimensions={dimensionsForImage(product.image)}
            alt={product.name}
          />
          {product.hoverImage && <OptimizedImage
            src={product.hoverImage}
            preset="productCard"
            dimensions={dimensionsForImage(product.hoverImage)}
            alt=""
            aria-hidden="true"
            className="minimalist-product-card__image-hover"
          />}
        </button>
        {onToggleWishlist && <button
          type="button"
          className={`minimalist-product-card__wishlist${isWishlisted ? ' is-active' : ''}`}
          onClick={event => {
            event.stopPropagation()
            onToggleWishlist()
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
        >
          <Icon icon={isWishlisted ? 'solar:bookmark-bold' : 'solar:bookmark-linear'} aria-hidden="true" />
        </button>}
      </div>
      <div className="minimalist-product-card__details">
        <button type="button" className="minimalist-product-card__name" onClick={onClick}>{product.name}</button>
        <span className="minimalist-product-card__price">{product.price}</span>
      </div>
    </article>
  )
}
