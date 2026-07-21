import { useState } from 'react'
import { INDIGO, TEXT, TEXT_SEC, BORDER, CLAY, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../tokens'
import type { WebPage } from '../types'

interface Props { onNavigate: (p: WebPage) => void }

const IMAGES = [
  'photo-1523381210434-271e8be1f52b',
  'photo-1490481651871-ab68de25d43d',
  'photo-1516762689617-e1cffcef479d',
  'photo-1469334031218-e382a71b716b',
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const SIZE_AVAIL: Record<string, boolean> = { XS: true, S: true, M: true, L: false, XL: true, XXL: false }

export default function ProductDetail({ onNavigate }: Props) {
  const [selectedImg, setSelectedImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [qty, setQty] = useState(1)

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: '14px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          {['Shop', 'Heritage', 'Tifinagh Frame Tee'].map((c, i) => (
            <span key={c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {i > 0 && <span style={{ color: SAND, fontSize: 12 }}>›</span>}
              <button onClick={() => i < 2 && onNavigate('shop')} style={{ fontSize: 13, color: i === 2 ? TEXT : TEXT_SEC, fontWeight: i === 2 ? 500 : 400, background: 'none', border: 'none', cursor: i < 2 ? 'pointer' : 'default', fontFamily: FONT_SANS, padding: 0 }}>{c}</button>
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

          {/* Left — Image gallery */}
          <div>
            {/* Main image */}
            <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 12, aspectRatio: '4/5', background: SURFACE }}>
              <img
                src={`https://images.unsplash.com/${IMAGES[selectedImg]}?w=900&h=1125&fit=crop&auto=format`}
                alt="Product"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {IMAGES.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImg(i)}
                  style={{ border: `2px solid ${selectedImg === i ? INDIGO : 'transparent'}`, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', padding: 0, aspectRatio: '1', background: 'none' }}
                >
                  <img src={`https://images.unsplash.com/${img}?w=200&h=200&fit=crop&auto=format`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Product info */}
          <div style={{ position: 'sticky', top: 88 }}>
            {/* Universe + new */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: '#E8EDF3', color: INDIGO, fontWeight: 500 }}>Heritage</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: SURFACE_2, color: CLAY, fontWeight: 500 }}>New</span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 38, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.15, marginBottom: 8 }}>Tifinagh Frame Tee</h1>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: SAND, marginBottom: 20, letterSpacing: '0.04em' }}>PRD-0014</div>

            {/* Price */}
            <div style={{ fontFamily: FONT_SERIF, fontSize: 28, fontWeight: 500, color: TEXT, marginBottom: 24 }}>€95</div>

            {/* Description */}
            <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.75, margin: 0, marginBottom: 28 }}>
              A precision-cut tee in heavyweight 220gsm organic cotton. The Tifinagh frame embroidery at the chest is hand-stitched in our atelier in Casablanca. Designed to be worn for a decade.
            </p>

            {/* Size selector */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Size</span>
                <button style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: FONT_SANS }}>Size guide</button>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => SIZE_AVAIL[size] && setSelectedSize(size)}
                    style={{
                      width: 44, height: 44, borderRadius: 9,
                      border: `1.5px solid ${selectedSize === size ? INDIGO : BORDER}`,
                      background: selectedSize === size ? INDIGO : SIZE_AVAIL[size] ? 'transparent' : SURFACE_2,
                      color: selectedSize === size ? CREAM : SIZE_AVAIL[size] ? TEXT : SAND,
                      fontSize: 12, fontWeight: selectedSize === size ? 600 : 400,
                      cursor: SIZE_AVAIL[size] ? 'pointer' : 'not-allowed',
                      fontFamily: FONT_SANS,
                      textDecoration: !SIZE_AVAIL[size] ? 'line-through' : 'none',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 48, background: 'transparent', border: 'none', fontSize: 18, color: TEXT_SEC, cursor: 'pointer' }}>−</button>
                <span style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 500, color: TEXT }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 48, background: 'transparent', border: 'none', fontSize: 18, color: TEXT_SEC, cursor: 'pointer' }}>+</button>
              </div>
              <button
                onClick={() => onNavigate('cart')}
                style={{ flex: 1, padding: '0 24px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: FONT_SANS }}
              >
                Add to Cart — €{95 * qty}
              </button>
            </div>

            {/* Wishlist */}
            <button style={{ width: '100%', padding: '12px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: FONT_SANS, marginBottom: 28 }}>
              ♡ Save to Wishlist
            </button>

            {/* Product details accordion */}
            <div style={{ borderTop: `1px solid ${BORDER}` }}>
              {[
                { label: 'Material', val: '100% Organic Cotton, 220gsm. GOTS certified. Woven in Portugal.' },
                { label: 'Fit', val: 'Relaxed, boxy fit. Model is 187cm wearing size M.' },
                { label: 'Care', val: 'Cold wash, lay flat to dry. Do not tumble dry.' },
                { label: 'Shipping', val: 'Free shipping on orders over €150. Delivered in 3–5 days.' },
              ].map((d, _i) => (
                <div key={d.label} style={{ borderBottom: `1px solid ${BORDER}`, padding: '14px 0' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 4, letterSpacing: '0.02em' }}>{d.label}</div>
                  <div style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6 }}>{d.val}</div>
                </div>
              ))}
            </div>

            {/* Connected to */}
            <div style={{ marginTop: 28, padding: 16, background: SURFACE, borderRadius: 12, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_SEC, marginBottom: 12 }}>Also connected to</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => onNavigate('stories')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: SURFACE_2, borderRadius: 8, border: `1px solid ${BORDER}`, cursor: 'pointer', textAlign: 'left', fontFamily: FONT_SANS }}>
                  <span style={{ fontSize: 16, color: CLAY }}>◫</span>
                  <div><div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>Indigo as Memory</div><div style={{ fontSize: 11, color: TEXT_SEC }}>Editorial story</div></div>
                </button>
                <button onClick={() => onNavigate('community')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#E8EDF3', borderRadius: 8, border: `1px solid ${BORDER}`, cursor: 'pointer', textAlign: 'left', fontFamily: FONT_SANS }}>
                  <span style={{ fontSize: 16, color: INDIGO }}>◇</span>
                  <div><div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>Atlas Pattern Remix</div><div style={{ fontSize: 11, color: TEXT_SEC }}>Community challenge</div></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
