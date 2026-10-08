import { useEffect, useRef, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import type { CartItem } from '../../cart'
import './CartDrawer.scss'

interface Props {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onCheckout: () => void
  onViewProduct: (productId: string) => void
  onUpdateQuantity: (id: string, size: string, delta: number, colorId?: string) => void
  onRemove: (id: string, size: string, colorId?: string) => void
  onClearCart: () => void
}

const formatPrice = (price: number | undefined, currency: string) => `${(price ?? 0).toFixed(2)} ${currency}`

export function CartDrawer({ isOpen, items, onClose, onCheckout, onViewProduct, onUpdateQuantity, onRemove, onClearCart }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const itemCount = items.reduce((total, item) => total + item.qty, 0)
  const subtotal = items.reduce((total, item) => total + (item.price ?? 0) * item.qty, 0)
  const currency = items[0]?.currency ?? 'TND'

  const keepFocusInDrawer = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return

    const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="cart-drawer-layer">
      <button className="cart-drawer-backdrop" type="button" tabIndex={-1} onClick={onClose} aria-label="Close cart" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title" onKeyDown={keepFocusInDrawer}>
        <header className="cart-drawer__header">
          <h2 id="cart-drawer-title">{itemCount} {itemCount === 1 ? 'item' : 'items'} in cart</h2>
          <button ref={closeButtonRef} className="cart-drawer__close" type="button" onClick={onClose} aria-label="Close cart">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </header>

        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your cart is currently empty.</p>
              <button type="button" onClick={onClose}>Continue shopping</button>
            </div>
          ) : items.map(item => (
            <article className="cart-drawer-item" key={`${item.id}-${item.size}-${item.colorId ?? ''}`}>
              <button
                className="cart-drawer-item__image"
                type="button"
                onClick={() => onViewProduct(item.id)}
                aria-label={item.name}
              >
                <img src={item.img || undefined} alt="" />
              </button>
              <div className="cart-drawer-item__details">
                <div className="cart-drawer-item__heading">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.universe} / Size {item.size}</p>
                  </div>
                  <button type="button" onClick={() => onRemove(item.id, item.size, item.colorId)} aria-label={`Remove ${item.name} from cart`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" /></svg>
                  </button>
                </div>
                <div className="cart-drawer-item__footer">
                  <div className="cart-drawer-item__quantity" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" onClick={() => onUpdateQuantity(item.id, item.size, -1, item.colorId)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => onUpdateQuantity(item.id, item.size, 1, item.colorId)} aria-label={`Increase ${item.name} quantity`}>+</button>
                  </div>
                  <strong>{formatPrice((item.price ?? 0) * item.qty, item.currency)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        {items.length > 0 && (
          <footer className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal, currency)}</strong>
            </div>
            <button className="cart-drawer__checkout" type="button" onClick={onCheckout}>Checkout</button>
            <button className="cart-drawer__clear" type="button" onClick={onClearCart}>Clear cart</button>
          </footer>
        )}
      </aside>
    </div>,
    document.body,
  )
}
