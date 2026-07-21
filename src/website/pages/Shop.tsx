import { useState } from 'react'
import { INDIGO, TEXT, TEXT_SEC, BORDER, CLAY, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../tokens'
import type { WebPage } from '../types'

interface Props { onNavigate: (p: WebPage) => void }

const PRODUCTS = [
  { id: 'PRD-0014', name: 'Tifinagh Frame Tee', universe: 'Heritage', price: 95, sizes: ['S','M','L','XL'], img: 'photo-1523381210434-271e8be1f52b', status: 'In Stock', isNew: true },
  { id: 'PRD-0021', name: 'Washed Indigo Heritage Tee', universe: 'Heritage', price: 95, sizes: ['M','L'], img: 'photo-1490481651871-ab68de25d43d', status: 'Low Stock', isNew: false },
  { id: 'PRD-0008', name: 'Atlas Symbol Boxy Tee', universe: 'Essentials', price: 75, sizes: ['S','M','L','XL','XXL'], img: 'photo-1618354691373-d851c5c3a990', status: 'In Stock', isNew: false },
  { id: 'PRD-0031', name: 'Woven Sahara Overshirt', universe: 'Studio', price: 195, sizes: ['S','M','L'], img: 'photo-1617196034183-421b4040ed20', status: 'In Stock', isNew: true },
  { id: 'PRD-0039', name: 'Community Lab Archive Jersey', universe: 'Community Lab', price: 120, sizes: ['M','L','XL'], img: 'photo-1521572163474-6864f9cf17ab', status: 'Limited', isNew: true },
  { id: 'PRD-0016', name: 'Mountain Mark Crewneck', universe: 'Heritage', price: 145, sizes: ['S','M','L','XL'], img: 'photo-1469334031218-e382a71b716b', status: 'In Stock', isNew: false },
  { id: 'PRD-0022', name: 'Loom Stripe Shirt', universe: 'Studio', price: 165, sizes: ['S','M'], img: 'photo-1516762689617-e1cffcef479d', status: 'Low Stock', isNew: false },
  { id: 'PRD-0044', name: 'Essentials Straight Trouser', universe: 'Essentials', price: 135, sizes: ['30','32','34','36'], img: 'photo-1611312449408-fcece27cdbb7', status: 'In Stock', isNew: false },
  { id: 'PRD-0051', name: 'Sahara Work Jacket', universe: 'Studio', price: 320, sizes: ['S','M','L'], img: 'photo-1620799140408-edc6dcb6d633', status: 'In Stock', isNew: false },
]

const UNIVERSE_FILTERS = ['All', 'Heritage', 'Essentials', 'Studio', 'Community Lab']
const SORT_OPTIONS = ['Newest first', 'Price: low to high', 'Price: high to low', 'Most popular']

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'In Stock': { bg: '#E6EDE8', color: '#4A7A5A' },
  'Low Stock': { bg: '#FDF8EC', color: '#A07820' },
  'Limited': { bg: SURFACE_2, color: CLAY },
}

export default function Shop({ onNavigate }: Props) {
  const [universe, setUniverse] = useState('All')
  const [sort, setSort] = useState('Newest first')

  const visible = universe === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.universe === universe)

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: '48px 40px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: 44, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 24 }}>Shop</h1>
          {/* Tab filters */}
          <div style={{ display: 'flex', gap: 0 }}>
            {UNIVERSE_FILTERS.map(f => (
              <button key={f} onClick={() => setUniverse(f)} style={{ padding: '12px 20px', fontSize: 13, fontWeight: universe === f ? 500 : 400, color: universe === f ? INDIGO : TEXT_SEC, background: 'transparent', border: 'none', borderBottom: universe === f ? `2px solid ${INDIGO}` : '2px solid transparent', cursor: 'pointer', fontFamily: FONT_SANS, marginBottom: -1 }}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 40px 64px' }}>
        {/* Sort + count row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: TEXT_SEC }}>{visible.length} products</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: TEXT_SEC }}>Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{ padding: '7px 12px', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT, fontFamily: FONT_SANS, appearance: 'none', cursor: 'pointer', outline: 'none' }}
            >
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {visible.map(p => {
            const s = STATUS_STYLE[p.status]
            return (
              <div
                key={p.id}
                onClick={() => onNavigate('product-detail')}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
              >
                {/* Image */}
                <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 16, position: 'relative', aspectRatio: '3/4', background: SURFACE }}>
                  <img
                    src={`https://images.unsplash.com/${p.img}?w=600&h=800&fit=crop&auto=format`}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {p.isNew && (
                    <div style={{ position: 'absolute', top: 12, left: 12 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, background: INDIGO, color: CREAM }}>New</span>
                    </div>
                  )}
                  {/* Quick add overlay */}
                  <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, opacity: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <button style={{ width: '100%', padding: '10px', background: 'rgba(245,241,234,0.95)', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 500, color: INDIGO, cursor: 'pointer', fontFamily: FONT_SANS }}>
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 3, letterSpacing: '0.01em' }}>{p.universe}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 6 }}>{p.name}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: INDIGO }}>€{p.price}</span>
                      {p.status !== 'In Stock' && (
                        <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: s.bg, color: s.color }}>{p.status}</span>
                      )}
                    </div>
                  </div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: SAND, marginTop: 2 }}>{p.id}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
