import { useState } from 'react'
import { INDIGO, TEXT, TEXT_SEC, BORDER, BG, SURFACE, CREAM, SAND, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../../tokens'
import type { WebPage } from '../../types'
import './Cart.scss'

interface Props { onNavigate: (p: WebPage) => void }
interface CartItem { id: string; name: string; universe: string; price: number; size: string; qty: number; img: string }

const INIT_ITEMS: CartItem[] = [
  { id: 'PRD-0014', name: 'Tifinagh Frame Tee', universe: 'Heritage', price: 95, size: 'M', qty: 1, img: 'photo-1523381210434-271e8be1f52b' },
  { id: 'PRD-0031', name: 'Woven Sahara Overshirt', universe: 'Studio', price: 195, size: 'L', qty: 1, img: 'photo-1617196034183-421b4040ed20' },
]

export default function Cart({ onNavigate }: Props) {
  const [items, setItems] = useState<CartItem[]>(INIT_ITEMS)

  const updateQty = (id: string, delta: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= 150 ? 0 : 12
  const total = subtotal + shipping

  return (
    <div className="cart-page" style={{ background: BG, minHeight: '100vh' }}>
      <div className="cart-shell">
        <h1 className="cart-title">
          Cart {items.length > 0 && <span className="cart-title__count">({items.length} items)</span>}
        </h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty__text">Your cart is empty.</div>
            <button onClick={() => onNavigate('shop')} style={{ padding: '12px 24px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>Continue Shopping →</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item, i) => (
                <div key={item.id} className="cart-item" style={{ borderBottom: i < items.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                  <div className="cart-item__img"><img src={`https://images.unsplash.com/${item.img}?w=200&h=240&fit=crop&auto=format`} alt={item.name} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="cart-item__top">
                      <div>
                        <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 3 }}>{item.universe}</div>
                        <div className="cart-item__name">{item.name}</div>
                        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: SAND, marginBottom: 12, letterSpacing: '0.04em' }}>{item.id}</div>
                      </div>
                      <div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: TEXT }}>€{item.price * item.qty}</div>
                    </div>
                    <div className="cart-item__actions">
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ padding: '5px 12px', background: BG, border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 12, color: TEXT, fontWeight: 500 }}>Size: {item.size}</div>
                        <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ width: 32, height: 32, background: 'transparent', border: 'none', fontSize: 16, color: TEXT_SEC, cursor: 'pointer' }}>−</button>
                          <span style={{ width: 24, textAlign: 'center', fontSize: 13, fontWeight: 500, color: TEXT }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} style={{ width: 32, height: 32, background: 'transparent', border: 'none', fontSize: 16, color: TEXT_SEC, cursor: 'pointer' }}>+</button>
                        </div>
                      </div>
                      <button onClick={() => remove(item.id)} style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: FONT_SANS }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="cart-summary">
                <div className="cart-summary__title">Order Summary</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    { l: 'Subtotal', v: `€${subtotal}` },
                    { l: `Shipping ${shipping === 0 ? '(free over €150)' : ''}`, v: shipping === 0 ? 'Free' : `€${shipping}` },
                    { l: 'Estimated taxes', v: 'Calculated at checkout' },
                  ].map((r, i) => (
                    <div key={i} className="cart-summary__line">
                      <span style={{ fontSize: 13, color: TEXT_SEC }}>{r.l}</span>
                      <span style={{ fontSize: 13, color: TEXT, fontWeight: i === 0 ? 500 : 400 }}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ height: 1, background: BORDER, marginBottom: 16 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>Total</span>
                  <span style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 500, color: INDIGO }}>€{total}</span>
                </div>
                <button className="cart-btn">Proceed to Checkout</button>
                <button onClick={() => onNavigate('shop')} className="cart-btn--secondary">Continue Shopping</button>
              </div>

              <div className="cart-promo">
                <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 10 }}>Promo Code</div>
                <div className="cart-promo__row">
                  <input placeholder="Enter code" style={{ flex: 1, padding: '9px 12px', background: BG, border: `1px solid ${BORDER}`, borderRight: 'none', borderRadius: '8px 0 0 8px', fontSize: 13, color: TEXT, fontFamily: FONT_SANS, outline: 'none' }} />
                  <button style={{ padding: '9px 14px', background: INDIGO, color: CREAM, border: 'none', borderRadius: '0 8px 8px 0', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>Apply</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}