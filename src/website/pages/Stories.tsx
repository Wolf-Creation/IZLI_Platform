import { useState } from 'react'
import { INDIGO, TEXT_SEC, BORDER, CLAY, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF, FONT_SANS } from '../../tokens'
import type { WebPage } from '../types'

interface Props { onNavigate: (p: WebPage) => void }

const ALL_STORIES = [
  { title: 'Indigo as Memory', type: 'Editorial', author: 'Sara Berrada', reads: '4.8K', time: '5m', img: 'photo-1490481651871-ab68de25d43d', featured: true },
  { title: 'What Sahara Taught Our Weavers', type: 'Editorial', author: 'Amine Karimi', reads: '2.3K', time: '7m', img: 'photo-1469334031218-e382a71b716b', featured: false },
  { title: 'Atlas Pattern Remix — A New Archive', type: 'Community', author: 'Community Lab', reads: '2.8K', time: '4m', img: 'photo-1516762689617-e1cffcef479d', featured: false },
  { title: 'Symbol Archive — The First Year', type: 'Editorial', author: 'Sara Berrada', reads: '1.9K', time: '4m', img: 'photo-1523381210434-271e8be1f52b', featured: false },
  { title: 'From Mountain to Cloth', type: 'Community', author: 'Youcef Benali', reads: '1.4K', time: '3m', img: 'photo-1521572163474-6864f9cf17ab', featured: false },
  { title: 'The Weavers of the Draa Valley', type: 'Editorial', author: 'Amine Karimi', reads: '3.1K', time: '8m', img: 'photo-1618354691373-d851c5c3a990', featured: false },
  { title: 'Oral Memory to Garment', type: 'Community', author: 'Lina Meziane', reads: '980', time: '5m', img: 'photo-1617196034183-421b4040ed20', featured: false },
]

const FILTERS = ['All', 'Editorial', 'Community']

export default function Stories({ onNavigate: _ }: Props) {
  const [filter, setFilter] = useState('All')
  const featured = ALL_STORIES[0]
  const grid = ALL_STORIES.slice(1).filter(s => filter === 'All' || s.type === filter)

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>

      {/* ── Featured story hero ──────────────────────────────────────── */}
      <section style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minHeight: 480 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 64px 64px 0' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, background: SURFACE_2, color: CLAY }}>Editorial</span>
              <span style={{ fontSize: 11, color: TEXT_SEC }}>5m read · 4.8K reads</span>
            </div>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 48, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.1, marginBottom: 18 }}>
              Indigo as Memory
            </h1>
            <p style={{ fontSize: 15, color: TEXT_SEC, lineHeight: 1.75, margin: 0, marginBottom: 28, maxWidth: 400 }}>
              How a color became a carrier of culture — a deep dive into the history of indigo dyeing across North Africa and its presence in IZLI's work.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ padding: '11px 24px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>
                Read Story
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: CREAM }}>SB</div>
                <span style={{ fontSize: 13, color: TEXT_SEC }}>Sara Berrada</span>
              </div>
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop&auto=format" alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── Filter + grid ────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 40px 80px' }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 28, fontWeight: 500, color: INDIGO, margin: 0 }}>All Stories</h2>
          <div style={{ display: 'flex', gap: 4, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 4 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 16px', borderRadius: 9, border: 'none', background: filter === f ? INDIGO : 'transparent', color: filter === f ? CREAM : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {grid.map(s => (
            <button key={s.title} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 16, aspectRatio: '4/3' }}>
                <img src={`https://images.unsplash.com/${s.img}?w=640&h=480&fit=crop&auto=format`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999, background: s.type === 'Editorial' ? SURFACE_2 : '#E8EDF3', color: s.type === 'Editorial' ? CLAY : INDIGO }}>
                  {s.type}
                </span>
                <span style={{ fontSize: 11, color: SAND }}>{s.time} read · {s.reads}</span>
              </div>
              <h3 style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO, lineHeight: 1.3, margin: 0, marginBottom: 8 }}>{s.title}</h3>
              <div style={{ fontSize: 12, color: TEXT_SEC }}>{s.author}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
