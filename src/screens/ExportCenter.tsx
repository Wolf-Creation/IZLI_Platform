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
const CREAM = '#E7DFD2'

const playfair = 'Playfair Display, Georgia, serif'
const inter = 'Inter, system-ui, sans-serif'
const mono = 'JetBrains Mono, monospace'

type ExportFormat = 'PNG' | 'SVG' | 'PDF'
type AssetFilter = 'All' | 'Hang Tag' | 'QR Label' | 'Neck Print' | 'Care Label' | 'Packaging Card'
type ExportStatus = 'ready' | 'queued'
type BulkFormat = 'PNG 300PPI' | 'SVG Vector' | 'PDF Print Ready' | 'ZIP All Formats'

type ExportItem = {
  product: string
  assetType: string
  identifier: string
  format: string
  size: string
  status: ExportStatus
}

const EXPORT_ITEMS: ExportItem[] = [
  { product: 'Tifinagh Frame Tee', assetType: 'Hang Tag', identifier: 'IZLI-MTN-M-000125', format: 'PDF', size: '1.2 MB', status: 'ready' },
  { product: 'Tifinagh Frame Tee', assetType: 'QR Label', identifier: 'IZLI-MTN-M-000125', format: 'PDF', size: '0.4 MB', status: 'ready' },
  { product: 'Tifinagh Frame Tee', assetType: 'Neck Print', identifier: 'IZLI-MTN-M-000125', format: 'SVG', size: '0.1 MB', status: 'ready' },
  { product: 'Woven Sahara Overshirt', assetType: 'Hang Tag', identifier: 'IZLI-HER-L-000126', format: 'PDF', size: '1.1 MB', status: 'ready' },
  { product: 'Woven Sahara Overshirt', assetType: 'Care Label', identifier: 'IZLI-HER-L-000126', format: 'PDF', size: '0.3 MB', status: 'queued' },
  { product: 'Atlas Boxy Tee', assetType: 'Neck Print', identifier: 'IZLI-COM-XL-000127', format: 'SVG', size: '0.2 MB', status: 'queued' },
  { product: 'Sahara Cargo Trousers', assetType: 'Packaging Card', identifier: 'IZLI-MTN-L-000128', format: 'PDF', size: '2.1 MB', status: 'ready' },
  { product: 'Mountain Pass Hoodie', assetType: 'QR Label', identifier: 'IZLI-HER-M-000129', format: 'PNG', size: '0.8 MB', status: 'queued' },
]

const FORMAT_SPECS: Record<ExportFormat, { icon: string; specs: string[] }> = {
  PNG: { icon: '🖼', specs: ['Raster format', '300 PPI default', 'RGB / transparent', 'Best for web & preview'] },
  SVG: { icon: '⬡', specs: ['Vector format', 'Infinitely scalable', 'Editable paths', 'Best for print setup'] },
  PDF: { icon: '📄', specs: ['Print-ready format', 'Embedded fonts', 'CMYK support', 'Best for production'] },
}

export default function ExportCenter({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('PDF')
  const [assetFilter, setAssetFilter] = useState<AssetFilter>('All')
  const [search, setSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [bulkFormat, setBulkFormat] = useState<BulkFormat>('ZIP All Formats')
  const [transparentBg, setTransparentBg] = useState(false)

  // suppress unused tokens
  void CLAY; void SAND; void CREAM

  const assetFilters: AssetFilter[] = ['All', 'Hang Tag', 'QR Label', 'Neck Print', 'Care Label', 'Packaging Card']
  const bulkFormats: BulkFormat[] = ['PNG 300PPI', 'SVG Vector', 'PDF Print Ready', 'ZIP All Formats']

  const filtered = EXPORT_ITEMS.filter(item => {
    if (assetFilter !== 'All' && item.assetType !== assetFilter) return false
    if (search && !item.product.toLowerCase().includes(search.toLowerCase()) && !item.identifier.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function toggleRow(idx: number) {
    const next = new Set(selectedRows)
    if (next.has(idx)) next.delete(idx)
    else next.add(idx)
    setSelectedRows(next)
  }

  function toggleAll() {
    if (selectedRows.size === filtered.length) setSelectedRows(new Set())
    else setSelectedRows(new Set(filtered.map((_, i) => i)))
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: inter }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '40px 48px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: playfair, fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>Export Center</h1>
            <p style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, margin: '6px 0 0' }}>Download and export all production assets</p>
          </div>
          <button style={{ fontFamily: inter, fontSize: 13, color: '#fff', background: INDIGO, border: 'none', borderRadius: 9, padding: '8px 20px', cursor: 'pointer' }}>
            Export All
          </button>
        </div>

        {/* Format Selector Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
          {(Object.keys(FORMAT_SPECS) as ExportFormat[]).map(fmt => {
            const spec = FORMAT_SPECS[fmt]
            const active = selectedFormat === fmt
            return (
              <label
                key={fmt}
                style={{
                  background: active ? CREAM : SURFACE,
                  border: `1.5px solid ${active ? SAND : BORDER}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{spec.icon}</span>
                    <span style={{ fontFamily: playfair, fontSize: 18, fontWeight: 500, color: INDIGO }}>{fmt}</span>
                  </div>
                  <input
                    type="radio"
                    name="format"
                    checked={active}
                    onChange={() => setSelectedFormat(fmt)}
                    style={{ accentColor: INDIGO, width: 16, height: 16 }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {spec.specs.map(s => (
                    <div key={s} style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: SAND }}>·</span> {s}
                    </div>
                  ))}
                </div>
              </label>
            )
          })}
        </div>

        {/* Filter + Search toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {assetFilters.map(f => (
              <button
                key={f}
                onClick={() => setAssetFilter(f)}
                style={{
                  fontFamily: inter, fontSize: 12, fontWeight: assetFilter === f ? 600 : 400,
                  color: assetFilter === f ? INDIGO : TEXT_SEC,
                  background: assetFilter === f ? CREAM : 'transparent',
                  border: `1px solid ${assetFilter === f ? BORDER : 'transparent'}`,
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
        </div>

        {/* Export Queue Table */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
          {/* Header row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '32px 2fr 140px 120px 100px 80px 100px 80px',
            padding: '12px 20px',
            borderBottom: `1px solid ${BORDER}`,
            gap: 12,
            alignItems: 'center',
          }}>
            <input
              type="checkbox"
              checked={selectedRows.size === filtered.length && filtered.length > 0}
              onChange={toggleAll}
              style={{ accentColor: INDIGO, width: 14, height: 14, cursor: 'pointer' }}
            />
            {['Product', 'Asset Type', 'Identifier', 'Format', 'Size', 'Status', 'Actions'].map(col => (
              <div key={col} style={{ fontFamily: inter, fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {col}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {filtered.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '32px 2fr 140px 120px 100px 80px 100px 80px',
                padding: '13px 20px',
                borderBottom: idx < filtered.length - 1 ? `1px solid ${BORDER}` : 'none',
                alignItems: 'center',
                gap: 12,
                background: selectedRows.has(idx) ? CREAM : 'transparent',
              }}
            >
              <input
                type="checkbox"
                checked={selectedRows.has(idx)}
                onChange={() => toggleRow(idx)}
                style={{ accentColor: INDIGO, width: 14, height: 14, cursor: 'pointer' }}
              />
              <div style={{ fontFamily: inter, fontSize: 13, fontWeight: 600, color: TEXT }}>{item.product}</div>
              <div>
                <span style={{ fontFamily: inter, fontSize: 10, color: TEXT_SEC, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 5, padding: '2px 8px' }}>
                  {item.assetType}
                </span>
              </div>
              <div style={{ fontFamily: mono, fontSize: 10, color: TEXT_SEC }}>{item.identifier}</div>
              <div style={{ fontFamily: mono, fontSize: 12, color: TEXT }}>{item.format}</div>
              <div style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC }}>{item.size}</div>
              <div>
                {item.status === 'ready' ? (
                  <span style={{ fontFamily: inter, fontSize: 11, fontWeight: 600, color: '#4A7A5A', background: '#E6EDE8', borderRadius: 20, padding: '3px 9px' }}>
                    Ready to Export
                  </span>
                ) : (
                  <span style={{ fontFamily: inter, fontSize: 11, fontWeight: 600, color: '#8C6B00', background: '#FFF4E5', borderRadius: 20, padding: '3px 9px' }}>
                    Queued
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button style={{ fontFamily: inter, fontSize: 11, color: INDIGO, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 10px', cursor: 'pointer' }}>
                  Download
                </button>
                <button style={{ fontFamily: inter, fontSize: 15, color: TEXT_SEC, background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 1 }}>⋯</button>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Export Section */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: inter, fontSize: 14, fontWeight: 600, color: INDIGO, marginBottom: 4 }}>Bulk Export</div>
              <div style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, marginBottom: 18 }}>
                Download all selected assets as a ZIP archive
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                {bulkFormats.map(fmt => (
                  <label key={fmt} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="bulkFormat"
                      checked={bulkFormat === fmt}
                      onChange={() => setBulkFormat(fmt)}
                      style={{ accentColor: INDIGO, width: 15, height: 15 }}
                    />
                    <span style={{ fontFamily: inter, fontSize: 13, color: TEXT }}>{fmt}</span>
                  </label>
                ))}
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={transparentBg}
                  onChange={e => setTransparentBg(e.target.checked)}
                  style={{ accentColor: INDIGO, width: 15, height: 15 }}
                />
                <span style={{ fontFamily: inter, fontSize: 13, color: TEXT }}>Transparent background</span>
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                disabled={selectedRows.size === 0}
                style={{
                  fontFamily: inter, fontSize: 13, fontWeight: 600, color: '#fff',
                  background: selectedRows.size === 0 ? '#A0ADB8' : INDIGO,
                  border: 'none', borderRadius: 10, padding: '10px 22px', cursor: selectedRows.size === 0 ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Export {selectedRows.size > 0 ? selectedRows.size : ''} Selected
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
