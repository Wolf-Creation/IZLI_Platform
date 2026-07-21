import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAND = '#B7AA91'
const BG = '#EDE8DF'
void SAND
void BG
const SURFACE = '#F5F1EA'
const SURFACE_2 = '#EFE8DD'
const CREAM = '#E7DFD2'

const TABS = ['All', 'Logos', 'Patterns', 'Typography', 'Icons', 'Illustrations', 'Textures', 'Mockups', 'Guidelines']

const ASSETS = [
  { name: 'IZLI Wordmark', category: 'Logo', format: 'SVG + AI', size: '240KB', preview: <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#1E2F44', fontWeight: 600 }}>IZLI</span> },
  { name: 'IZLI Symbol', category: 'Logo', format: 'SVG', size: '18KB', preview: <div style={{ width: 36, height: 36, background: '#1E2F44', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: 18 }}>I</div> },
  { name: 'Tifinagh Pattern A', category: 'Pattern', format: 'SVG', size: '34KB', preview: <span style={{ fontSize: 22, color: '#B7AA91', letterSpacing: 2 }}>◈◈◈</span> },
  { name: 'Atlas Grid', category: 'Pattern', format: 'SVG', size: '28KB', preview: <span style={{ fontSize: 22, color: '#B7AA91', letterSpacing: 2 }}>⬡⬡⬡</span> },
  { name: 'IZLI Typography Pack', category: 'Typography', format: 'ZIP', size: '4.2MB', preview: <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#1E2F44', fontWeight: 500 }}>Aa</span> },
  { name: 'Archive Icon Set', category: 'Icons', format: 'SVG', size: '156KB', preview: <span style={{ fontSize: 16, color: '#B7AA91', letterSpacing: 4 }}>◈ ◉ ◫ ▦</span> },
  { name: 'Brand Guidelines 2026', category: 'Guidelines', format: 'PDF', size: '8.4MB', preview: <span style={{ fontSize: 28, color: '#506681' }}>📄</span> },
  { name: 'Product Mockup Pack', category: 'Mockups', format: 'ZIP', size: '84MB', preview: <span style={{ fontSize: 28, color: '#B7AA91' }}>□</span> },
]

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  Logo: { bg: '#F0E8E0', color: CLAY },
  Pattern: { bg: SURFACE_2, color: TEXT_SEC },
  Typography: { bg: CREAM, color: TEXT },
  Icons: { bg: '#E8EDF3', color: INDIGO },
  Guidelines: { bg: '#F0E8E0', color: CLAY },
  Mockups: { bg: SURFACE_2, color: TEXT_SEC },
}

export default function BrandAssets({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All' ? ASSETS : ASSETS.filter(a => a.category === activeTab || a.category + 's' === activeTab)

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>
          Brand Assets
        </h1>
        <p style={{ fontSize: 14, color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>
          Official IZLI brand resources — logos, patterns, typography, and guidelines
        </p>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 2, borderBottom: `1px solid ${BORDER}`, marginBottom: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '9px 16px',
              border: 'none',
              borderBottom: activeTab === tab ? `2px solid ${INDIGO}` : '2px solid transparent',
              background: 'transparent',
              color: activeTab === tab ? INDIGO : TEXT_SEC,
              fontSize: 13,
              fontWeight: activeTab === tab ? 600 : 400,
              cursor: 'pointer',
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 14, marginBottom: 24 }}>
        142 assets · 8 categories · Last updated 3 days ago
      </div>

      {/* Asset Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {filtered.map(asset => {
          const badge = CATEGORY_COLORS[asset.category] || { bg: SURFACE_2, color: TEXT_SEC }
          return (
            <div
              key={asset.name}
              style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}
            >
              {/* Preview */}
              <div
                style={{
                  height: 120,
                  background: SURFACE_2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {asset.preview}
              </div>

              {/* Body */}
              <div style={{ padding: 14 }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: badge.bg,
                    color: badge.color,
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '2px 8px',
                    borderRadius: 100,
                  }}
                >
                  {asset.category}
                </span>
                <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginTop: 6 }}>{asset.name}</div>
                <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>
                  {asset.format} · {asset.size}
                </div>
                <button
                  style={{
                    marginTop: 12,
                    padding: '5px 12px',
                    border: `1px solid ${INDIGO}`,
                    borderRadius: 8,
                    background: 'transparent',
                    color: INDIGO,
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: TEXT_SEC, fontSize: 14 }}>
          No assets in this category yet.
        </div>
      )}
    </div>
  )
}
