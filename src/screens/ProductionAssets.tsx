import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const SURFACE_2 = '#EFE8DD'
const CREAM = '#E7DFD2'

const playfair = 'Playfair Display, Georgia, serif'
const inter = 'Inter, system-ui, sans-serif'
const mono = 'JetBrains Mono, monospace'

type AssetStatus = 'ready' | 'generating' | 'error' | 'pending'
type FilterType = 'All' | 'Ready' | 'Generating' | 'Error' | 'Pending'

type Asset = {
  productName: string
  sku: string
  template: string
  assetType: string
  identifier: string
  format: string
  status: AssetStatus
  created: string
  imgId: string
}

const ASSETS: Asset[] = [
  { productName: 'Tifinagh Frame Tee', sku: 'HRT-001', template: 'Oversized T-Shirt', assetType: 'Hang Tag', identifier: 'IZLI-MTN-M-000125', format: 'PDF', status: 'ready', created: '10 Jul', imgId: 'photo-1521572163474-6864f9cf17ab' },
  { productName: 'Tifinagh Frame Tee', sku: 'HRT-001', template: 'Oversized T-Shirt', assetType: 'QR Label', identifier: 'IZLI-MTN-M-000125', format: 'PDF', status: 'ready', created: '10 Jul', imgId: 'photo-1521572163474-6864f9cf17ab' },
  { productName: 'Tifinagh Frame Tee', sku: 'HRT-001', template: 'Oversized T-Shirt', assetType: 'Neck Print', identifier: 'IZLI-MTN-M-000125', format: 'SVG', status: 'ready', created: '10 Jul', imgId: 'photo-1521572163474-6864f9cf17ab' },
  { productName: 'Tifinagh Frame Tee', sku: 'HRT-001', template: 'Oversized T-Shirt', assetType: 'Care Label', identifier: 'IZLI-MTN-M-000125', format: 'PDF', status: 'ready', created: '10 Jul', imgId: 'photo-1521572163474-6864f9cf17ab' },
  { productName: 'Woven Sahara Overshirt', sku: 'HRT-002', template: 'Classic T-Shirt', assetType: 'Hang Tag', identifier: 'IZLI-HER-L-000126', format: 'ZIP', status: 'ready', created: '9 Jul', imgId: 'photo-1617196034183-421b4040ed20' },
  { productName: 'Woven Sahara Overshirt', sku: 'HRT-002', template: 'Classic T-Shirt', assetType: 'Side Label', identifier: 'IZLI-HER-L-000126', format: 'SVG', status: 'ready', created: '9 Jul', imgId: 'photo-1617196034183-421b4040ed20' },
  { productName: 'Atlas Boxy Tee', sku: 'HRT-003', template: 'Oversized T-Shirt', assetType: 'Hang Tag', identifier: 'IZLI-COM-XL-000127', format: 'PDF', status: 'generating', created: '8 Jul', imgId: 'photo-1523381210434-271e8be1f52b' },
  { productName: 'Atlas Boxy Tee', sku: 'HRT-003', template: 'Oversized T-Shirt', assetType: 'Neck Print', identifier: 'IZLI-COM-XL-000127', format: 'PDF', status: 'generating', created: '8 Jul', imgId: 'photo-1523381210434-271e8be1f52b' },
  { productName: 'Sahara Cargo Trousers', sku: 'BTM-001', template: 'Pants', assetType: 'Waist Print', identifier: 'IZLI-MTN-L-000128', format: 'SVG', status: 'ready', created: '7 Jul', imgId: 'photo-1469334031218-e382a71b716b' },
  { productName: 'Mountain Pass Hoodie', sku: 'HRT-004', template: 'Hoodie', assetType: 'Neck Print', identifier: 'IZLI-HER-M-000129', format: '-', status: 'error', created: '5 Jul', imgId: 'photo-1516762689617-e1cffcef479d' },
]

const STATUS_MAP: Record<AssetStatus, { bg: string; color: string; label: string }> = {
  ready: { bg: '#E6EDE8', color: '#4A7A5A', label: 'Ready' },
  generating: { bg: '#FFF4E5', color: '#8C6B00', label: 'Generating' },
  error: { bg: '#F9EDEA', color: '#A63D2F', label: 'Error' },
  pending: { bg: SURFACE_2, color: CLAY, label: 'Pending' },
}

function StatusBadge({ status }: { status: AssetStatus }) {
  const s = STATUS_MAP[status]
  return (
    <span style={{ background: s.bg, color: s.color, fontFamily: inter, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  )
}

export default function ProductionAssets({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [filter, setFilter] = useState<FilterType>('All')
  const [search, setSearch] = useState('')
  const [formatFilter, setFormatFilter] = useState('All Formats')
  const [page, setPage] = useState(1)

  const filters: FilterType[] = ['All', 'Ready', 'Generating', 'Error', 'Pending']

  const filtered = ASSETS.filter(a => {
    if (filter !== 'All' && a.status !== filter.toLowerCase()) return false
    if (formatFilter !== 'All Formats' && a.format !== formatFilter) return false
    if (search && !a.productName.toLowerCase().includes(search.toLowerCase()) && !a.identifier.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: inter }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '40px 48px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: playfair, fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>Generated Assets</h1>
            <p style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, margin: '6px 0 0' }}>2,847 assets across 124 products</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ fontFamily: inter, fontSize: 13, color: INDIGO, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '8px 18px', cursor: 'pointer' }}>
              Export All
            </button>
            <button style={{ fontFamily: inter, fontSize: 13, color: '#fff', background: INDIGO, border: 'none', borderRadius: 9, padding: '8px 18px', cursor: 'pointer' }}>
              Batch Export ZIP
            </button>
          </div>
        </div>

        {/* Filter Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: inter, fontSize: 12, fontWeight: filter === f ? 600 : 400,
                  color: filter === f ? INDIGO : TEXT_SEC,
                  background: filter === f ? CREAM : 'transparent',
                  border: `1px solid ${filter === f ? BORDER : 'transparent'}`,
                  borderRadius: 20, padding: '5px 14px', cursor: 'pointer',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products or IDs…"
            style={{ fontFamily: inter, fontSize: 13, color: TEXT, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '7px 14px', outline: 'none', minWidth: 220, marginLeft: 'auto' }}
          />
          <select
            value={formatFilter}
            onChange={e => setFormatFilter(e.target.value)}
            style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '7px 12px', outline: 'none', cursor: 'pointer' }}
          >
            {['All Formats', 'PNG', 'SVG', 'PDF'].map(f => <option key={f}>{f}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '52px 2fr 160px 120px 100px 80px 80px 90px 80px',
            padding: '12px 20px',
            borderBottom: `1px solid ${BORDER}`,
            gap: 12,
          }}>
            {['', 'Product', 'Template', 'Asset Type', 'Identifier', 'Format', 'Status', 'Created', 'Actions'].map((col, i) => (
              <div key={i} style={{ fontFamily: inter, fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((asset, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '52px 2fr 160px 120px 100px 80px 80px 90px 80px',
                padding: '14px 20px',
                borderBottom: idx < filtered.length - 1 ? `1px solid ${BORDER}` : 'none',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {/* Thumbnail */}
              <img
                src={`https://images.unsplash.com/${asset.imgId}?w=80&h=96&fit=crop&auto=format`}
                alt={asset.productName}
                style={{ width: 38, height: 46, objectFit: 'cover', borderRadius: 7, display: 'block' }}
              />
              {/* Product */}
              <div>
                <div style={{ fontFamily: inter, fontSize: 13, fontWeight: 600, color: TEXT }}>{asset.productName}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>{asset.sku}</div>
              </div>
              {/* Template */}
              <div style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC }}>{asset.template}</div>
              {/* Asset Type */}
              <div>
                <span style={{ fontFamily: inter, fontSize: 10, color: TEXT_SEC, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 5, padding: '2px 8px' }}>
                  {asset.assetType}
                </span>
              </div>
              {/* Identifier */}
              <div style={{ fontFamily: mono, fontSize: 10, color: TEXT_SEC }}>{asset.identifier}</div>
              {/* Format */}
              <div style={{ fontFamily: mono, fontSize: 12, color: TEXT }}>{asset.format}</div>
              {/* Status */}
              <div><StatusBadge status={asset.status} /></div>
              {/* Created */}
              <div style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC }}>{asset.created}</div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button style={{ fontFamily: inter, fontSize: 11, color: INDIGO, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 10px', cursor: 'pointer' }}>
                  Download
                </button>
                <button style={{ fontFamily: inter, fontSize: 15, color: TEXT_SEC, background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 1 }}>⋯</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <div style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC }}>
            Showing {filtered.length} of 2,847 assets
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, '…', 48].map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === 'number' && setPage(p)}
                style={{
                  fontFamily: inter, fontSize: 12,
                  color: page === p ? '#fff' : TEXT_SEC,
                  background: page === p ? INDIGO : SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 7, padding: '5px 11px', cursor: 'pointer',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
