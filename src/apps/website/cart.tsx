import { useEffect, useState, type FormEvent } from 'react'
import type { WebPage } from './types'
import './pages/Cart/Cart.scss'
import { TopBarPage } from './components/TopBarPage/TopBarPage'
import { createCheckoutOrder, type CheckoutCustomer, type CheckoutOrder } from '../../shared/services/checkout'
import { getShippingSettings, type ShippingSettings } from '../../shared/services/shipping'

export interface CartItem {
  id: string
  name: string
  universe: string
  price?: number
  currency: string
  size: string
  qty: number
  img: string
}

export type CartItemInput = Omit<CartItem, 'qty'> & { qty?: number }

export interface WishlistItem {
  id: string
  name: string
  universe: string
  price?: number
  currency: string
  size: string
  img: string
}

interface CartProps {
  items: CartItem[]
  onNavigate: (page: WebPage, productId?: string) => void
  onUpdateQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
  onClearCart: () => void
}

const initialCustomer: CheckoutCustomer = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  governorate: '',
  postalCode: '',
  country: 'Tunisia',
}
const formatPrice = (price: number | undefined, currency: string) => `${(price ?? 0).toFixed(2)} ${currency}`
const isDatabaseProductId = (id: string) => /^[a-f\d]{24}$/i.test(id)

export default function Cart({ items, onNavigate, onUpdateQuantity, onRemove, onClearCart }: CartProps) {
  const [customer, setCustomer] = useState(initialCustomer)
  const [shipping, setShipping] = useState<ShippingSettings | null>(null)
  const [shippingError, setShippingError] = useState('')
  const [isLoadingShipping, setIsLoadingShipping] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<CheckoutOrder | null>(null)
  const localSubtotal = items.reduce((sum, item) => sum + (item.price ?? 0) * item.qty, 0)
  const currency = items[0]?.currency ?? shipping?.currency ?? 'TND'
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)
  const hasInvalidProductIds = items.some(item => !isDatabaseProductId(item.id))

  useEffect(() => {
    let active = true
    getShippingSettings()
      .then(value => {
        if (active) setShipping(value)
      })
      .catch(reason => {
        if (active) setShippingError(reason instanceof Error ? reason.message : 'Could not load delivery details.')
      })
      .finally(() => {
        if (active) setIsLoadingShipping(false)
      })
    return () => { active = false }
  }, [])

  function updateCustomer(field: keyof CheckoutCustomer, value: string) {
    setCustomer(current => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!shipping?.configured || !items.length) return
    if (hasInvalidProductIds) {
      setError('One or more items are no longer linked to a product in the catalogue. Remove them from your cart, then add them again from the Shop.')
      return
    }
    setError('')
    setIsSubmitting(true)
    try {
      const savedOrder = await createCheckoutOrder({
        customer,
        items: items.map(item => ({ productId: item.id, size: item.size, quantity: item.qty })),
        paymentMethod: 'cash_on_delivery',
      })
      setOrder(savedOrder)
      onClearCart()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Your order could not be submitted. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (order) {
    return (
      <section className="cart-page">
        <div className="cart-shell">
          <div className="cart-confirmation">
            <p className="cart-eyebrow">Order #{order.id.slice(-8).toUpperCase()}</p>
            <h1 className="cart-title">Thank you, {order.customerName}.</h1>
            <p className="cart-confirmation__text">Your order is registered. Our team will contact you to confirm delivery.</p>
          </div>
          <div className="cart-confirmation-layout">
            <section className="cart-confirmation-card">
              <h2>Order details</h2>
              {order.lineItems.map((item, index) => (
                <div className="cart-confirmation-line" key={`${item.productId}-${item.size}-${index}`}>
                  <span>{item.productName} / Size {item.size} × {item.qty}</span>
                  <strong>{formatPrice(item.unitPrice * item.qty, order.currency)}</strong>
                </div>
              ))}
              <div className="cart-confirmation-line"><span>Subtotal</span><strong>{formatPrice(order.subtotal, order.currency)}</strong></div>
              <div className="cart-confirmation-line"><span>Delivery · {order.shippingCarrier}</span><strong>{formatPrice(order.shippingCost, order.currency)}</strong></div>
              <div className="cart-confirmation-line cart-confirmation-line--total"><span>Total due on delivery</span><strong>{formatPrice(order.total, order.currency)}</strong></div>
              <p className="cart-confirmation__text">Payment method: Cash on delivery</p>
            </section>
            <section className="cart-confirmation-card">
              <h2>Delivery details</h2>
              <p><strong>{order.customerName}</strong></p>
              <p>{order.customerEmail}</p>
              <p>{order.customerPhone}</p>
              <p>{order.shippingAddress}</p>
              <button type="button" className="cart-btn cart-btn--compact" onClick={() => onNavigate('shop')}>Continue shopping</button>
            </section>
          </div>
        </div>
      </section>
    )
  }

  const emptyCart = (
    <div className="cart-empty">
      <p className="cart-empty__text">Your cart is currently empty.</p>
      <button type="button" className="cart-btn cart-btn--compact" onClick={() => onNavigate('shop')}>Discover the shop</button>
    </div>
  )
  const cartItems = items.map(item => (
    <article className="cart-item" key={`${item.id}-${item.size}`}>
      <button
        type="button"
        className="cart-item__img-link"
        onClick={() => onNavigate('product-detail', item.id)}
        aria-label={`View ${item.name}`}
      >
        <span className="cart-item__img"><img src={item.img} alt="" /></span>
      </button>
      <div className="cart-item__content">
        <div className="cart-item__top">
          <div>
            <h2 className="cart-item__name">
              <button type="button" onClick={() => onNavigate('product-detail', item.id)}>{item.name}</button>
            </h2>
            <p className="cart-item__meta">{item.universe} / Size {item.size}</p>
          </div>
          <strong>{formatPrice((item.price ?? 0) * item.qty, item.currency)}</strong>
        </div>
        <div className="cart-item__actions">
          <div className="cart-quantity" aria-label={`Quantity for ${item.name}`}>
            <button type="button" onClick={() => onUpdateQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>-</button>
            <span>{item.qty}</span>
            <button type="button" onClick={() => onUpdateQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
          </div>
          <button type="button" className="cart-remove" onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      </div>
    </article>
  ))

  const content = items.length === 0 ? emptyCart : (
    <div className="cart-layout">
      <div className="cart-checkout-column">
        <div className="cart-items">{cartItems}</div>
        <form className="cart-customer-form" onSubmit={handleSubmit}>
          <h2 className="cart-summary__title">Delivery information</h2>
          <div className="cart-form-grid">
            <label>First name<input autoComplete="given-name" required value={customer.firstName} onChange={event => updateCustomer('firstName', event.target.value)} /></label>
            <label>Last name<input autoComplete="family-name" required value={customer.lastName} onChange={event => updateCustomer('lastName', event.target.value)} /></label>
            <label>Email<input autoComplete="email" type="email" required value={customer.email} onChange={event => updateCustomer('email', event.target.value)} /></label>
            <label>Phone<input autoComplete="tel" type="tel" required value={customer.phone} onChange={event => updateCustomer('phone', event.target.value)} /></label>
            <label className="cart-form-grid__wide">Address<input autoComplete="address-line1" required value={customer.addressLine1} onChange={event => updateCustomer('addressLine1', event.target.value)} /></label>
            <label className="cart-form-grid__wide">Address complement <span className="cart-form-optional">(optional)</span><input autoComplete="address-line2" value={customer.addressLine2} onChange={event => updateCustomer('addressLine2', event.target.value)} /></label>
            <label>City<input autoComplete="address-level2" required value={customer.city} onChange={event => updateCustomer('city', event.target.value)} /></label>
            <label>Governorate<input autoComplete="address-level1" required value={customer.governorate} onChange={event => updateCustomer('governorate', event.target.value)} /></label>
            <label>Postal code<input autoComplete="postal-code" required value={customer.postalCode} onChange={event => updateCustomer('postalCode', event.target.value)} /></label>
            <label>Country<input autoComplete="country-name" required value={customer.country} onChange={event => updateCustomer('country', event.target.value)} /></label>
          </div>
          <fieldset className="cart-payment">
            <legend>Payment method</legend>
            <label><input type="radio" checked readOnly /> Cash on delivery</label>
            <p>Pay when your order is delivered.</p>
          </fieldset>
          {shippingError && <p className="cart-error" role="alert">{shippingError}</p>}
          {shipping && !shipping.configured && <p className="cart-error" role="alert">Delivery is not available yet. Please try again later.</p>}
          {hasInvalidProductIds && <p className="cart-error" role="alert">One or more items in your cart are no longer linked to the catalogue. Remove them and add products again from the Shop.</p>}
          {error && <p className="cart-error" role="alert">{error}</p>}
          <button className="cart-btn" type="submit" disabled={isSubmitting || isLoadingShipping || !shipping?.configured || hasInvalidProductIds}>
            {isSubmitting ? 'Submitting order…' : 'Confirm order'}
          </button>
        </form>
      </div>
      <aside className="cart-summary">
        <h2 className="cart-summary__title">Order summary</h2>
        <div className="cart-summary__line"><span>Items ({itemCount})</span><strong>{formatPrice(localSubtotal, currency)}</strong></div>
        <div className="cart-summary__line"><span>Delivery{shipping?.carrierName ? ` · ${shipping.carrierName}` : ''}</span><strong>{shipping ? formatPrice(shipping.deliveryFee, shipping.currency) : 'Loading…'}</strong></div>
        <div className="cart-summary__total"><span>Estimated total</span><strong>{formatPrice(localSubtotal + (shipping?.deliveryFee ?? 0), currency)}</strong></div>
        {shippingError && <p className="cart-error" role="alert">{shippingError}</p>}
        {!shippingError && !shipping?.configured && !isLoadingShipping && <p className="cart-summary__note">The delivery company is being configured.</p>}
        <p className="cart-summary__note">Payment is due in cash when your order is delivered.</p>
      </aside>
    </div>
  )

  return (
    <section className="cart-page">
      <TopBarPage label="Cart" descriptions={['IZLI / YOUR SELECTION', `Your cart (${itemCount})`]} />
      <div className="cart-shell">{content}</div>
    </section>
  )
}
