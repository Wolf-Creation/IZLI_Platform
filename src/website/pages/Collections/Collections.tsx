import { useState } from 'react'
import { INDIGO, TEXT_SEC, BORDER, CLAY, SAGE, BG, SURFACE, SURFACE_2, CREAM, FONT_SERIF, FONT_SANS } from '../../../tokens'
import type { WebPage } from '../../types'
import './Collections.scss'

interface Props { onNavigate: (p: WebPage) => void }

const COLLECTIONS = [
  { name: 'Echoes of Stone', universe: 'Heritage', season: 'SS 2026', products: 8, status: 'New', desc: 'Atlas stone marks translated into contemporary garments. The marks that predate script.', img: 'photo-1469334031218-e382a71b716b', accent: INDIGO },
  { name: 'Indigo Memory', universe: 'Heritage', season: 'SS 2026', products: 5, status: 'Available', desc: 'A capsule on the cultural history of indigo dyeing in North Africa.', img: 'photo-1490481651871-ab68de25d43d', accent: '#2a4a6e' },
  { name: 'Atlas Marks', universe: 'Studio', season: 'AW 2025', products: 6, status: 'Available', desc: 'Contemporary reinterpretations of geometric marks found across the Atlas range.', img: 'photo-1516762689617-e1cffcef479d', accent: CLAY },
  { name: 'Heritage Essentials 01', universe: 'Essentials', season: 'Permanent', products: 12, status: 'Available', desc: 'The foundation of the IZLI wardrobe. Built for daily wear, made to last decades.', img: 'photo-1523381210434-271e8be1f52b', accent: SAGE },
  { name: 'Mountain Memory', universe: 'Community Lab', season: 'Limited', products: 3, status: 'Limited', desc: 'A community-led research capsule. Garments co-designed with contributors from the Atlas communities.', img: 'photo-1521572163474-6864f9cf17ab', accent: '#4A7A5A' },
  { name: 'Sahara Craft', universe: 'Studio', season: 'AW 2025', products: 4, status: 'Available', desc: 'Structured desert forms. Utilitarian shapes distilled from nomadic garment traditions.', img: 'photo-1618354691373-d851c5c3a990', accent: '#7A6050' },
]

const FILTERS = ['All', 'Heritage', 'Essentials', 'Studio', 'Community Lab']

export default function Collections({ onNavigate }: Props) {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? COLLECTIONS : COLLECTIONS.filter(c => c.universe === filter)

  return (
    <div className="collections-page" style={{ background: BG, minHeight: '100vh' }}>
      <header className="collections-header">
        <div className="collections-shell">
          <div className="collections-kicker">Collections</div>
          <h1 className="collections-title">Every collection<br />has a story.</h1>
          <p className="collections-sub">Rooted in Amazigh heritage, each collection is built around research, community contributions, and a commitment to craft.</p>
        </div>
      </header>

      <div className="collections-filters">
        <div className="collections-shell collections-filters__row">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`collections-filter ${filter === f ? 'is-active' : ''}`}>{f}</button>
          ))}
        </div>
      </div>

      <section className="collections-grid">
        <div className="collections-grid__inner">
          {visible.map(c => (
            <button key={c.name} onClick={() => onNavigate('product-detail')} className="collection-card">
              <div className="collection-card__image">
                <img src={`https://images.unsplash.com/${c.img}?w=700&h=875&fit=crop&auto=format`} alt={c.name} />
                <div className="collection-card__overlay" />
                <div className="collection-card__badge">
                  {c.status === 'New' && <span className="collection-card__pill" style={{ background: CREAM, color: INDIGO }}>New</span>}
                  {c.status === 'Limited' && <span className="collection-card__pill" style={{ background: CLAY, color: CREAM }}>Limited</span>}
                </div>
                <div className="collection-card__name">
                  {c.name}
                  <div className="collection-card__meta">{c.season} · {c.products} pieces</div>
                </div>
              </div>
              <span className="collection-card__pill" style={{ background: SURFACE_2, color: TEXT_SEC, border: `1px solid ${BORDER}`, display: 'inline-block', marginBottom: 10 }}>{c.universe}</span>
              <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
            </button>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48, fontSize: 12, color: TEXT_SEC }}>Showing {visible.length} of {COLLECTIONS.length} collections</div>
      </section>
    </div>
  )
}