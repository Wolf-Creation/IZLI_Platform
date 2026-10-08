import { useEffect, useState, type FormEvent } from 'react'
import { Icon } from '@iconify/react'
import type { WebPage } from './types'
import './pages/Cart/Cart.scss'
import { createCheckoutOrder, type CheckoutCustomer, type CheckoutOrder } from '../../shared/services/checkout'
import { getShippingSettings, type ShippingSettings } from '../../shared/services/shipping'
import { TUNISIAN_GOVERNORATES } from './tunisianLocations'

export interface CartItem {
  id: string
  name: string
  universe: string
  price?: number
  currency: string
  size: string
  qty: number
  img: string
  colorId?: string
  colorName?: string
  colorHex?: string
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
  onUpdateQuantity: (id: string, size: string, delta: number, colorId?: string) => void
  onRemove: (id: string, size: string, colorId?: string) => void
  onClearCart: () => void
}

const initialCustomer: CheckoutCustomer = {
  firstName: '',
  lastName: '',
  phone: '',
  phone2: '',
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
  const [isMobileCheckout, setIsMobileCheckout] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  const [isSummaryOpen, setIsSummaryOpen] = useState(() => !window.matchMedia('(max-width: 760px)').matches)
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
  const checkoutHeader = (
    <header className="checkout-header">
      <div className="checkout-header__inner website-content-container">
        <button type="button" className="checkout-header__brand" onClick={() => onNavigate('home')} aria-label="IZLI home">IZLI</button>
        <button type="button" className="checkout-header__shop" onClick={() => onNavigate('shop')} aria-label="Continue shopping">
          <Icon icon="solar:bag-3-linear" width={22} height={22} aria-hidden="true" />
        </button>
      </div>
    </header>
  )

  useEffect(() => {
    const mobileCheckout = window.matchMedia('(max-width: 760px)')
    const updateCheckoutLayout = () => {
      const isMobile = mobileCheckout.matches
      setIsMobileCheckout(isMobile)
      setIsSummaryOpen(!isMobile)
    }

    mobileCheckout.addEventListener('change', updateCheckoutLayout)
    window.addEventListener('resize', updateCheckoutLayout)
    return () => {
      mobileCheckout.removeEventListener('change', updateCheckoutLayout)
      window.removeEventListener('resize', updateCheckoutLayout)
    }
  }, [])

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

  function updateGovernorate(governorate: string) {
    setCustomer(current => ({ ...current, governorate, city: '' }))
  }

  function renderCustomerField(
    field: keyof CheckoutCustomer,
    label: string,
    autoComplete: string,
    type: 'email' | 'tel' | 'text' = 'text',
    wide = false,
  ) {
    const value = customer[field]
    const isFloating = Boolean(value)

    return (
      <label className={`checkout-field${wide ? ' cart-form-grid__wide' : ''}${isFloating ? ' checkout-field--floating' : ''}`}>
        <input
          autoComplete={autoComplete}
          type={type}
          placeholder=" "
          required={field !== 'addressLine2' && field !== 'phone2'}
          value={value}
          onChange={event => updateCustomer(field, event.target.value)}
        />
        <span className="checkout-field__label">{label}</span>
      </label>
    )
  }

  function renderLocationSelect(field: 'governorate' | 'city', label: string, options: string[], disabled = false) {
    const value = customer[field]

    return (
      <label className={`checkout-field${value ? ' checkout-field--floating' : ''}`}>
        <select
          autoComplete={field === 'city' ? 'address-level2' : 'address-level1'}
          required
          value={value}
          disabled={disabled}
          onChange={event => field === 'governorate' ? updateGovernorate(event.target.value) : updateCustomer('city', event.target.value)}
        >
          <option value="" disabled />
          {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        <span className="checkout-field__label">{label}</span>
      </label>
    )
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
      <section className="cart-page checkout-page">
        {checkoutHeader}
        <div className="checkout-confirmation website-content-container">
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
              {order.customerEmail && <p>{order.customerEmail}</p>}
              <p>{order.customerPhone}</p>
              {order.customerPhone2 && <p>{order.customerPhone2}</p>}
              <p>{order.shippingAddress}</p>
              <button type="button" className="cart-btn cart-btn--compact" onClick={() => onNavigate('shop')}>Continue shopping</button>
            </section>
          </div>
        </div>
      </section>
    )
  }

  const emptyCart = (
    <div className="cart-empty checkout-empty-state website-content-container">
      <h1 className="checkout-empty__title">Checkout</h1>
      <p className="cart-empty__text">Your cart is currently empty.</p>
      <button type="button" className="cart-btn cart-btn--compact" onClick={() => onNavigate('shop')}>Discover the shop</button>
    </div>
  )

  const content = items.length === 0 ? emptyCart : (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-form__inner">
          <section className="checkout-form-section">
            <h2>Delivery Address</h2>
            <div className="cart-form-grid">
              {renderCustomerField('firstName', 'First name', 'given-name')}
              {renderCustomerField('lastName', 'Last name', 'family-name')}
              {renderCustomerField('phone', 'Phone', 'tel', 'tel')}
              {renderCustomerField('phone2', 'Second phone (optional)', 'tel', 'tel')}
              {renderCustomerField('addressLine1', 'Address', 'address-line1', 'text', true)}
              {renderCustomerField('addressLine2', 'Address complement (optional)', 'address-line2', 'text', true)}
              {renderLocationSelect('governorate', 'Governorate', Object.keys(TUNISIAN_GOVERNORATES))}
              {renderLocationSelect('city', 'City', TUNISIAN_GOVERNORATES[customer.governorate] ?? [], !customer.governorate)}
            </div>
          </section>
          <section className="checkout-form-section">
            <h2>Payment</h2>
            <fieldset className="cart-payment">
              <legend className="checkout-visually-hidden">Payment method</legend>
              <label><input type="radio" checked readOnly /> Cash on delivery</label>
              <p>Pay when your order is delivered.</p>
            </fieldset>
          </section>
          {shippingError && <p className="cart-error" role="alert">{shippingError}</p>}
          {shipping && !shipping.configured && <p className="cart-error" role="alert">Delivery is not available yet. Please try again later.</p>}
          {hasInvalidProductIds && <p className="cart-error" role="alert">One or more items in your cart are no longer linked to the catalogue. Remove them and add products again from the Shop.</p>}
          {error && <p className="cart-error" role="alert">{error}</p>}
          <button className="cart-btn" type="submit" disabled={isSubmitting || isLoadingShipping || !shipping?.configured || hasInvalidProductIds}>
            {isSubmitting ? 'Submitting order…' : 'Confirm order'}
          </button>
        </div>
      </form>
      <aside className="cart-summary">
        <div className="checkout-summary__inner">
          <button
            className="cart-summary__title checkout-summary__toggle"
            type="button"
            aria-expanded={isMobileCheckout ? isSummaryOpen : true}
            aria-controls="checkout-summary-content"
            disabled={!isMobileCheckout}
            onClick={() => setIsSummaryOpen(open => !open)}
          >
            <span className="checkout-summary__label">Order summary</span>
            <svg className={`checkout-summary__chevron${isSummaryOpen ? ' is-open' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
              <path d="m4 6 4 4 4-4" />
            </svg>
            <strong className="checkout-summary__header-total">{formatPrice(localSubtotal + (shipping?.deliveryFee ?? 0), currency)}</strong>
          </button>
          <div id="checkout-summary-content" className={`checkout-summary__content${isSummaryOpen ? ' is-open' : ''}`}>
            <div className="checkout-summary__items">
              {items.map(item => (
                <article className="checkout-item" key={`${item.id}-${item.size}-${item.colorId ?? ''}`}>
                  <button type="button" className="checkout-item__image" onClick={() => onNavigate('product-detail', item.id)} aria-label={`View ${item.name}`}>
                    <img src={item.img || undefined} alt="" />
                    <span>{item.qty}</span>
                  </button>
                  <div className="checkout-item__details">
                    <div className="checkout-item__description">
                      <button type="button" className="checkout-item__name" onClick={() => onNavigate('product-detail', item.id)}>{item.name}</button>
                      <p>Size: {item.size}</p>
                      {item.colorName && <p className="checkout-item__color"><span className="checkout-item__color-swatch" style={{ backgroundColor: item.colorHex || 'transparent' }} aria-hidden="true" />Color: {item.colorName}</p>}
                    </div>
                    <div className="cart-quantity" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" onClick={() => onUpdateQuantity(item.id, item.size, -1, item.colorId)} aria-label={`Decrease ${item.name} quantity`}>-</button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => onUpdateQuantity(item.id, item.size, 1, item.colorId)} aria-label={`Increase ${item.name} quantity`}>+</button>
                    </div>
                  </div>
                  <div className="checkout-item__purchase">
                    <strong className="checkout-item__price">{formatPrice((item.price ?? 0) * item.qty, item.currency)}</strong>
                    <button type="button" className="cart-remove" onClick={() => onRemove(item.id, item.size, item.colorId)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
            <div className="checkout-summary__totals">
              <div className="cart-summary__line"><span>Subtotal</span><strong>{formatPrice(localSubtotal, currency)}</strong></div>
              <div className="cart-summary__line"><span>Shipping{shipping?.carrierName ? ` · ${shipping.carrierName}` : ''}</span><strong>{shipping ? formatPrice(shipping.deliveryFee, shipping.currency) : 'Loading…'}</strong></div>
              <div className="cart-summary__total"><span>Total</span><strong>{formatPrice(localSubtotal + (shipping?.deliveryFee ?? 0), currency)}</strong></div>
              {shippingError && <p className="cart-error" role="alert">{shippingError}</p>}
              {!shippingError && !shipping?.configured && !isLoadingShipping && <p className="cart-summary__note">The delivery company is being configured.</p>}
              <p className="cart-summary__note">Payment is due in cash when your order is delivered.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )

  return (
    <section className="cart-page checkout-page">
      {checkoutHeader}
      <h1 className="checkout-visually-hidden">Checkout</h1>
      {content}
    </section>
  )
}
