import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAND = '#B7AA91'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const SURFACE_2 = '#EFE8DD'
const CREAM = '#E7DFD2'

const playfair = 'Playfair Display, Georgia, serif'
const inter = 'Inter, system-ui, sans-serif'

const ALL_ASSET_TYPES = [
  'Internal Branding Print',
  'Hang Tag',
  'QR Label',
  'Care Label',
  'Neck Print',
  'Side Label',
  'Packaging Card',
  'Brand Card',
  'Woven Label',
  'Swing Tag',
  'Heat Transfer',
  'Embroidery Patch',
  'Sticker Label',
  'Tissue Wrap',
]

type Template = {
  name: string
  assets: number
  products: number
  status: 'active' | 'draft'
  assetTypes: string[]
}

const TEMPLATES: Template[] = [
  {
    name: 'Oversized T-Shirt',
    assets: 8,
    products: 124,
    status: 'active',
    assetTypes: ['Hang Tag', 'QR Label', 'Care Label', 'Neck Print', 'Internal Branding Print', 'Side Label', 'Packaging Card', 'Brand Card'],
  },
  {
    name: 'Classic T-Shirt',
    assets: 6,
    products: 0,
    status: 'draft',
    assetTypes: ['Hang Tag', 'QR Label', 'Care Label', 'Neck Print', 'Internal Branding Print', 'Side Label'],
  },
  {
    name: 'Hoodie',
    assets: 7,
    products: 31,
    status: 'active',
    assetTypes: ['Hang Tag', 'QR Label', 'Care Label', 'Neck Print', 'Internal Branding Print', 'Side Label', 'Brand Card'],
  },
  {
    name: 'Pants',
    assets: 5,
    products: 18,
    status: 'active',
    assetTypes: ['Hang Tag', 'QR Label', 'Care Label', 'Internal Branding Print', 'Packaging Card'],
  },
  {
    name: 'Shorts',
    assets: 4,
    products: 6,
    status: 'active',
    assetTypes: ['Hang Tag', 'QR Label', 'Care Label', 'Internal Branding Print'],
  },
  {
    name: 'Cap',
    assets: 3,
    products: 0,
    status: 'draft',
    assetTypes: ['Hang Tag', 'QR Label', 'Brand Card'],
  },
  {
    name: 'Tote Bag',
    assets: 4,
    products: 3,
    status: 'active',
    assetTypes: ['Hang Tag', 'QR Label', 'Sticker Label', 'Brand Card'],
  },
  {
    name: 'Accessory',
    assets: 3,
    products: 0,
    status: 'draft',
    assetTypes: ['Hang Tag', 'QR Label', 'Brand Card'],
  },
]

export default function ProductionTemplates({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [_activeCard, setActiveCard] = useState<string | null>(null)

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: inter }}>
      <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: playfair, fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>
              Production Templates
            </h1>
            <p style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, margin: '6px 0 0', lineHeight: 1.5 }}>
              8 templates · define which assets are generated per product category
            </p>
          </div>
          <button
            style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, padding: '9px 20px', fontSize: 13, fontFamily: inter, fontWeight: 500, cursor: 'pointer' }}
          >
            + New Template
          </button>
        </div>

        {/* Asset type key */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontFamily: inter, color: TEXT_SEC, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Available Asset Types
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ALL_ASSET_TYPES.map((type) => (
              <span key={type} style={{
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                color: TEXT_SEC,
                fontSize: 11,
                fontFamily: inter,
                padding: '4px 10px',
                borderRadius: 20,
              }}>
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Template grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {TEMPLATES.map((tpl) => {
            const isActive = tpl.status === 'active'
            const statusBg = isActive ? '#E6EDE8' : SURFACE_2
            const statusColor = isActive ? '#4A7A5A' : CLAY
            const displayAssets = tpl.assetTypes.slice(0, 5)

            return (
              <div
                key={tpl.name}
                onMouseEnter={() => setActiveCard(tpl.name)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                }}
              >
                {/* Card top: name + badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontFamily: playfair, fontSize: 16, fontWeight: 500, color: INDIGO, lineHeight: 1.3 }}>{tpl.name}</div>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontFamily: inter,
                    background: statusBg,
                    color: statusColor,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    marginLeft: 8,
                    flexShrink: 0,
                  }}>
                    {isActive ? 'Active' : 'Draft'}
                  </span>
                </div>

                {/* Product count */}
                <div style={{ fontSize: 13, fontFamily: inter, color: tpl.products > 0 ? TEXT_SEC : SAND, marginBottom: 14 }}>
                  {tpl.products > 0 ? `${tpl.products} products` : 'Not in use'}
                </div>

                {/* Asset pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                  {displayAssets.map((a) => (
                    <span key={a} style={{
                      background: SURFACE_2,
                      color: TEXT_SEC,
                      fontSize: 10,
                      fontFamily: inter,
                      padding: '3px 8px',
                      borderRadius: 20,
                    }}>
                      {a}
                    </span>
                  ))}
                  {tpl.assetTypes.length > 5 && (
                    <span style={{
                      background: SURFACE_2,
                      color: SAND,
                      fontSize: 10,
                      fontFamily: inter,
                      padding: '3px 8px',
                      borderRadius: 20,
                    }}>
                      +{tpl.assetTypes.length - 5} more
                    </span>
                  )}
                </div>

                {/* Asset count label */}
                <div style={{ fontSize: 11, fontFamily: inter, color: SAND, marginBottom: 18 }}>
                  {tpl.assets} assets enabled
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <button style={{
                    flex: 1,
                    background: SURFACE_2,
                    color: INDIGO,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 8,
                    padding: '7px 10px',
                    fontSize: 11,
                    fontFamily: inter,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}>
                    Edit Template
                  </button>
                  <button
                    style={{
                      flex: 1,
                      background: SURFACE_2,
                      color: INDIGO,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 8,
                      padding: '7px 10px',
                      fontSize: 11,
                      fontFamily: inter,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                    onClick={() => onNavigate('production-center')}
                  >
                    Generate Assets
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
