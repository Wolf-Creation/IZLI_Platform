import { createElement, useState } from 'react'
import type { WebPage } from './types'
import './pages/Cart/Cart.scss'
import { TopBarPage } from './components/TopBarPage/TopBarPage'

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
  onNavigate: (page: WebPage) => void
  onUpdateQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
}

const formatPrice = (price: number | undefined, currency: string) => `${(price ?? 0).toFixed(2)} ${currency}`

export default function Cart({ items, onNavigate, onUpdateQuantity, onRemove }: CartProps) {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const total = items.reduce((sum, item) => sum + (item.price ?? 0) * item.qty, 0)
  const currency = items[0]?.currency ?? 'TND'
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)

  const h = createElement
  if (isConfirmed) return h('section', { className: 'cart-page' }, h(TopBarPage, { label: 'Cart', descriptions: ['IZLI / ORDER', 'Your request has been recorded.'] }), h('div', { className: 'cart-shell cart-confirmation' }, h('h1', { className: 'cart-title' }, 'Thank you for your order.'), h('p', { className: 'cart-confirmation__text' }, 'We will contact you shortly to confirm delivery details.'), h('button', { type: 'button', className: 'cart-btn cart-btn--compact', onClick: () => onNavigate('shop') }, 'Continue shopping')))

  const emptyCart = h('div', { className: 'cart-empty' }, h('p', { className: 'cart-empty__text' }, 'Your cart is currently empty.'), h('button', { type: 'button', className: 'cart-btn cart-btn--compact', onClick: () => onNavigate('shop') }, 'Discover the shop'))
  const cartItems = items.map(item => h('article', { className: 'cart-item', key: `${item.id}-${item.size}` },
    h('div', { className: 'cart-item__img' }, h('img', { src: item.img, alt: item.name })),
    h('div', { className: 'cart-item__content' },
      h('div', { className: 'cart-item__top' }, h('div', null, h('h2', { className: 'cart-item__name' }, item.name), h('p', { className: 'cart-item__meta' }, `${item.universe} / Size ${item.size}`)), h('strong', null, formatPrice((item.price ?? 0) * item.qty, item.currency))),
      h('div', { className: 'cart-item__actions' }, h('div', { className: 'cart-quantity', 'aria-label': `Quantity for ${item.name}` }, h('button', { type: 'button', onClick: () => onUpdateQuantity(item.id, -1), 'aria-label': `Decrease ${item.name} quantity` }, '-'), h('span', null, item.qty), h('button', { type: 'button', onClick: () => onUpdateQuantity(item.id, 1), 'aria-label': `Increase ${item.name} quantity` }, '+')), h('button', { type: 'button', className: 'cart-remove', onClick: () => onRemove(item.id) }, 'Remove')))))
  const summary = h('aside', { className: 'cart-summary' }, h('h2', { className: 'cart-summary__title' }, 'Order summary'), h('div', { className: 'cart-summary__line' }, h('span', null, 'Subtotal'), h('strong', null, formatPrice(total, currency))), h('div', { className: 'cart-summary__line' }, h('span', null, 'Delivery'), h('span', null, 'To be confirmed')), h('div', { className: 'cart-summary__total' }, h('span', null, 'Total'), h('strong', null, formatPrice(total, currency))), h('button', { type: 'button', className: 'cart-btn', onClick: () => setIsConfirmed(true) }, 'Confirm order'), h('button', { type: 'button', className: 'cart-btn--secondary', onClick: () => onNavigate('shop') }, 'Continue shopping'))
  const content = items.length === 0 ? emptyCart : h('div', { className: 'cart-layout' }, h('div', { className: 'cart-items' }, cartItems), summary)
  return h('section', { className: 'cart-page' }, h(TopBarPage, { label: 'Cart', descriptions: ['IZLI / YOUR SELECTION', `Your cart (${itemCount})`] }), h('div', { className: 'cart-shell' }, content))
}
