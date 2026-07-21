import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAND = '#B7AA91'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const SURFACE_2 = '#EFE8DD'

const FILTERS = ['All', 'Berber Symbols', 'Mountain Culture', 'Textile Traditions', 'Color Heritage', 'Desert Landscapes']

const ITEMS = [
  {
    title: 'Tifinagh Alphabet',
    category: 'Berber Symbols',
    description: 'The ancient Amazigh writing system that inspired IZLI\'s graphic language',
    tags: ['script', 'identity', 'ancient'],
  },
  {
    title: 'Atlas Mountain Weaves',
    category: 'Textile Traditions',
    description: 'Traditional Berber carpet patterns from the High Atlas',
    tags: ['pattern', 'texture', 'handcraft'],
  },
  {
    title: 'Saharan Indigo Dyeing',
    category: 'Color Heritage',
    description: 'Natural indigo techniques passed down through generations',
    tags: ['color', 'natural', 'craft'],
  },
  {
    title: 'Mountain Topography',
    category: 'Mountain Culture',
    description: 'The geological language of the Moroccan Atlas range',
    tags: ['landscape', 'geometry', 'stone'],
  },
  {
    title: 'Desert Light Studies',
    category: 'Desert Landscapes',
    description: 'The quality of light across the Saharan dunes at dawn and dusk',
    tags: ['light', 'color', 'mood'],
  },
  {
    title: 'Nomadic Architecture',
    category: 'Mountain Culture',
    description: 'Ksour and kasbahs — the geometry of traditional Amazigh construction',
    tags: ['form', 'earth', 'structure'],
  },
]

export default function HeritageLibrary({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? ITEMS : ITEMS.filter(i => i.category === activeFilter)

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>
          Heritage Library
        </h1>
        <p style={{ fontSize: 14, color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>
          Brand heritage, cultural references, and inspirational archives
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Heritage Items', value: '84' },
          { label: 'Stories Referenced', value: '34' },
          { label: 'Media Linked', value: '218' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: INDIGO }}>{kpi.value}</div>
            <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '7px 16px',
              borderRadius: 100,
              border: `1px solid ${activeFilter === f ? INDIGO : BORDER}`,
              background: activeFilter === f ? INDIGO : SURFACE,
              color: activeFilter === f ? '#fff' : TEXT_SEC,
              fontSize: 13,
              fontWeight: activeFilter === f ? 500 : 400,
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 32 }}>
        {filtered.map(item => (
          <div
            key={item.title}
            style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}
          >
            {/* Image Area */}
            <div
              style={{
                width: '100%',
                height: 140,
                background: BG,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: SAND,
              }}
            >
              ◈
            </div>

            {/* Body */}
            <div style={{ padding: 16 }}>
              {/* Category Badge */}
              <span
                style={{
                  display: 'inline-block',
                  background: '#F0E8E0',
                  color: CLAY,
                  fontSize: 10,
                  fontWeight: 500,
                  padding: '3px 8px',
                  borderRadius: 100,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.04em',
                }}
              >
                {item.category}
              </span>

              {/* Title */}
              <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginTop: 6 }}>{item.title}</div>

              {/* Description */}
              <div
                style={{
                  fontSize: 12,
                  color: TEXT_SEC,
                  marginTop: 4,
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }}
              >
                {item.description}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      background: SURFACE_2,
                      color: TEXT_SEC,
                      fontSize: 10,
                      padding: '2px 8px',
                      borderRadius: 100,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
