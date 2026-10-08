import type { WebPage } from '../../types'
import type { CartItemInput, WishlistItem } from '../../cart'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { TopBarPage } from '../../components/TopBarPage/TopBarPage'
import './Wishlist.scss'

interface Props {
  items: WishlistItem[]
  onNavigate: (page: WebPage, productId?: string) => void
  onAddToCart: (item: CartItemInput) => void
  onRemove: (id: string) => void
}

const formatPrice = (price: number | undefined, currency: string) => price === undefined ? 'Price TBA' : `${price} ${currency}`

export default function Wishlist({ items, onNavigate, onAddToCart, onRemove }: Props) {
  return (
    <section className="wishlist-page">
      <TopBarPage
        label={`Wishlist (${items.length})`}
        descriptions={['IZLI / YOUR SELECTION', 'Keep the pieces that speak to you close.']}
      />
      <div className="wishlist-shell website-section-spacing">

        {items.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty__mark" aria-hidden="true">♡</div>
            <h2>Your wishlist is waiting.</h2>
            <p>Save pieces from the shop and return to them whenever the moment feels right.</p>
            <button type="button" className="wishlist-button" onClick={() => onNavigate('shop')}>Discover the shop</button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map(item => (
              <div className="wishlist-item" key={item.id}>
                <ProductCard
                  name={item.name}
                  price={formatPrice(item.price, item.currency)}
                  image={item.img}
                  onClick={() => onNavigate('product-detail', item.id)}
                  onAddToCart={() => onAddToCart(item)}
                  onToggleWishlist={() => onRemove(item.id)}
                  isWishlisted
                  wishlistIcon="bookmark"
                  className="wishlist-product-card"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
