import { useState } from 'react'
import { INDIGO, TEXT_SEC, BORDER, CLAY, SAGE, BG, SURFACE, SURFACE_2, CREAM, FONT_SERIF, FONT_SANS } from '../../tokens'
import type { WebPage } from '../types'

interface Props { onNavigate: (p: WebPage) => void }

const COLLECTIONS = [
  {
    name: 'Echoes of Stone', universe: 'Heritage', season: 'SS 2026', products: 8, status: 'New',
    desc: 'Atlas stone marks translated into contemporary garments. The marks that predate script.',
    img: 'photo-1469334031218-e382a71b716b', accent: INDIGO,
  },
  {
    name: 'Indigo Memory', universe: 'Heritage', season: 'SS 2026', products: 5, status: 'Available',
    desc: 'A capsule on the cultural history of indigo dyeing in North Africa.',
    img: 'photo-1490481651871-ab68de25d43d', accent: '#2a4a6e',
  },
  {
    name: 'Atlas Marks', universe: 'Studio', season: 'AW 2025', products: 6, status: 'Available',
    desc: 'Contemporary reinterpretations of geometric marks found across the Atlas range.',
    img: 'photo-1516762689617-e1cffcef479d', accent: CLAY,
  },
  {
    name: 'Heritage Essentials 01', universe: 'Essentials', season: 'Permanent', products: 12, status: 'Available',
    desc: 'The foundation of the IZLI wardrobe. Built for daily wear, made to last decades.',
    img: 'photo-1523381210434-271e8be1f52b', accent: SAGE,
  },
  {
    name: 'Mountain Memory', universe: 'Community Lab', season: 'Limited', products: 3, status: 'Limited',
    desc: 'A community-led research capsule. Garments co-designed with contributors from the Atlas communities.',
    img: 'photo-1521572163474-6864f9cf17ab', accent: '#4A7A5A',
  },
  {
    name: 'Sahara Craft', universe: 'Studio', season: 'AW 2025', products: 4, status: 'Available',
    desc: 'Structured desert forms. Utilitarian shapes distilled from nomadic garment traditions.',
    img: 'photo-1618354691373-d851c5c3a990', accent: '#7A6050',
  },
]

const FILTERS = ['All', 'Heritage', 'Essentials', 'Studio', 'Community Lab']

export default function Collections({ onNavigate }: Props) {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? COLLECTIONS : COLLECTIONS.filter(c => c.universe === filter)

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: '56px 40px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEXT_SEC, marginBottom: 12 }}>Collections</div>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: 52, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 16 }}>
            Every collection<br />has a story.
          </h1>
          <p style={{ fontSize: 15, color: TEXT_SEC, lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
            Rooted in Amazigh heritage, each collection is built around research, community contributions, and a commitment to craft.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: SURFACE }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', gap: 0 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '14px 20px',
                fontSize: 13,
                fontWeight: filter === f ? 500 : 400,
                color: filter === f ? INDIGO : TEXT_SEC,
                background: 'transparent', border: 'none',
                borderBottom: filter === f ? `2px solid ${INDIGO}` : '2px solid transparent',
                cursor: 'pointer', fontFamily: FONT_SANS, marginBottom: -1,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {visible.map(c => (
            <button
              key={c.name}
              onClick={() => onNavigate('product-detail')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
            >
              {/* Image */}
              <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 20, position: 'relative', aspectRatio: '4/5' }}>
                <img
                  src={`https://images.unsplash.com/${c.img}?w=700&h=875&fit=crop&auto=format`}
                  alt={c.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,47,68,0.55) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
                  {c.status === 'New' && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: CREAM, color: INDIGO }}>New</span>
                  )}
                  {c.status === 'Limited' && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: CLAY, color: CREAM }}>Limited</span>
                  )}
                </div>
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 24, fontWeight: 500, color: CREAM, lineHeight: 1.2 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(231,223,210,0.7)', marginTop: 4 }}>{c.season} · {c.products} pieces</div>
                </div>
              </div>
              {/* Info */}
              <div>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: SURFACE_2, color: TEXT_SEC, border: `1px solid ${BORDER}`, fontWeight: 500, marginBottom: 10, display: 'inline-block' }}>{c.universe}</span>
                <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Count */}
        <div style={{ textAlign: 'center', marginTop: 48, fontSize: 12, color: TEXT_SEC }}>
          Showing {visible.length} of {COLLECTIONS.length} collections
        </div>
      </div>
    </div>
  )
}
