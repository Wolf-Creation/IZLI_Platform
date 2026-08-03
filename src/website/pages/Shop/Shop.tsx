import { useState } from 'react'
import { INDIGO, TEXT, TEXT_SEC, BORDER, CLAY, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../../tokens'
import type { WebPage } from '../../types'
import './Shop.scss'

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
    <div className="shop-page" style={{ background: BG, minHeight: '100vh' }}>
      <header className="shop-header">
        <div className="shop-shell">
          <h1 className="shop-title">Shop</h1>
          <div className="shop-filters">
            {UNIVERSE_FILTERS.map(f => (
              <button key={f} onClick={() => setUniverse(f)} className={`shop-filter ${universe === f ? 'is-active' : ''}`}>{f}</button>
            ))}
          </div>
        </div>
      </header>

      <section className="shop-grid">
        <div className="shop-grid__top">
          <div className="shop-grid__count">{visible.length} products</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: TEXT_SEC }}>Sort:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '7px 12px', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: TEXT, fontFamily: FONT_SANS, appearance: 'none', cursor: 'pointer', outline: 'none' }}>
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="shop-grid__inner">
          {visible.map(p => {
            const s = STATUS_STYLE[p.status]
            return (
              <article key={p.id} className="shop-card" onClick={() => onNavigate('product-detail')}>
                <div className="shop-card__image">
                  <img src={`https://images.unsplash.com/${p.img}?w=600&h=800&fit=crop&auto=format`} alt={p.name} />
                  {p.isNew && <div className="shop-card__tag"><span className="shop-card__pill">New</span></div>}
                  <div className="shop-card__quick"><button style={{ width: '100%', padding: '10px', background: 'rgba(245,241,234,0.95)', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 500, color: INDIGO, cursor: 'pointer', fontFamily: FONT_SANS }}>Quick Add</button></div>
                </div>
                <div className="shop-card__info">
                  <div>
                    <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 3, letterSpacing: '0.01em' }}>{p.universe}</div>
                    <div className="shop-card__name">{p.name}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: INDIGO }}>€{p.price}</span>
                      {p.status !== 'In Stock' && <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: s.bg, color: s.color }}>{p.status}</span>}
                    </div>
                  </div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: SAND, marginTop: 2 }}>{p.id}</div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}