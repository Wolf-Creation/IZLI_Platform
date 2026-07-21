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

type Product = {
  id: string
  name: string
  sku: string
  template: string
  imgId: string
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Tifinagh Frame Tee', sku: 'HRT-001', template: 'Oversized T-Shirt', imgId: 'photo-1521572163474-6864f9cf17ab' },
  { id: '2', name: 'Woven Sahara Overshirt', sku: 'HRT-002', template: 'Classic T-Shirt', imgId: 'photo-1617196034183-421b4040ed20' },
  { id: '3', name: 'Atlas Boxy Tee', sku: 'HRT-003', template: 'Oversized T-Shirt', imgId: 'photo-1523381210434-271e8be1f52b' },
  { id: '4', name: 'Sahara Cargo Trousers', sku: 'BTM-001', template: 'Pants', imgId: 'photo-1469334031218-e382a71b716b' },
  { id: '5', name: 'Mountain Pass Hoodie', sku: 'HRT-004', template: 'Hoodie', imgId: 'photo-1516762689617-e1cffcef479d' },
  { id: '6', name: 'Linen Wide-Leg Trousers', sku: 'BTM-002', template: 'Pants', imgId: 'photo-1469334031218-e382a71b716b' },
]

const ASSET_TYPES = [
  { label: 'Hang Tag', count: 6 },
  { label: 'QR Label', count: 6 },
  { label: 'Neck Print', count: 4 },
  { label: 'Care Label', count: 5 },
  { label: 'Side Label', count: 3 },
  { label: 'Waist Print', count: 2 },
]

type RecentBatch = {
  id: string
  products: number
  assets: number
  status: 'complete' | 'error'
  date: string
}

const RECENT_BATCHES: RecentBatch[] = [
  { id: '#012', products: 4, assets: 32, status: 'complete', date: '10 Jul 2026' },
  { id: '#011', products: 6, assets: 48, status: 'complete', date: '9 Jul 2026' },
  { id: '#010', products: 2, assets: 0, status: 'error', date: '8 Jul 2026' },
]

export default function BatchGenerator({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [format, setFormat] = useState('ZIP')
  const [includeQR, setIncludeQR] = useState(true)
  const [includeID, setIncludeID] = useState(true)
  const [includeSizes, setIncludeSizes] = useState(true)
  const [highRes, setHighRes] = useState(true)

  // suppress unused tokens
  void CLAY; void SAND; void CREAM

  const today = new Date().toISOString().split('T')[0].replace(/-/g, '')
  const outputName = `IZLI_Production_${today}.zip`
  const estAssets = selected.size * 6
  const estMb = Math.max(1, Math.round(estAssets * 0.4))

  function toggleAll() {
    if (selected.size === PRODUCTS.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(PRODUCTS.map(p => p.id)))
    }
  }

  function toggleProduct(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const filtered = PRODUCTS.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const cardStyle: React.CSSProperties = {
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: inter }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '40px 48px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: playfair, fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>Batch Generator</h1>
            <p style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, margin: '6px 0 0' }}>Select products and generate all production assets in one ZIP</p>
          </div>
          <button
            disabled={selected.size === 0}
            style={{
              fontFamily: inter, fontSize: 13, color: '#fff',
              background: selected.size === 0 ? '#A0ADB8' : INDIGO,
              border: 'none', borderRadius: 9, padding: '8px 20px', cursor: selected.size === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Start Batch
          </button>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            {/* Step 1 */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ fontFamily: inter, fontSize: 14, fontWeight: 600, color: INDIGO }}>1. Select Products</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC }}>{selected.size} selected</span>
                  <button
                    onClick={toggleAll}
                    style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 7, padding: '5px 12px', cursor: 'pointer' }}
                  >
                    {selected.size === PRODUCTS.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
              </div>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products…"
                style={{ fontFamily: inter, fontSize: 13, color: TEXT, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '7px 14px', outline: 'none', width: '100%', boxSizing: 'border-box', marginBottom: 14 }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filtered.map(product => (
                  <label
                    key={product.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 10px', borderRadius: 10, cursor: 'pointer', background: selected.has(product.id) ? CREAM : 'transparent' }}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(product.id)}
                      onChange={() => toggleProduct(product.id)}
                      style={{ accentColor: INDIGO, width: 15, height: 15, cursor: 'pointer' }}
                    />
                    <img
                      src={`https://images.unsplash.com/${product.imgId}?w=64&h=76&fit=crop&auto=format`}
                      alt={product.name}
                      style={{ width: 32, height: 38, objectFit: 'cover', borderRadius: 6 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: inter, fontSize: 13, fontWeight: 600, color: TEXT }}>{product.name}</div>
                      <div style={{ fontFamily: mono, fontSize: 11, color: TEXT_SEC }}>{product.sku} · {product.template}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div style={cardStyle}>
              <div style={{ fontFamily: inter, fontSize: 14, fontWeight: 600, color: INDIGO, marginBottom: 16 }}>2. Configure Export</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC, display: 'block', marginBottom: 6 }}>Export Format</label>
                  <select
                    value={format}
                    onChange={e => setFormat(e.target.value)}
                    style={{ fontFamily: inter, fontSize: 13, color: TEXT, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '7px 12px', outline: 'none', cursor: 'pointer' }}
                  >
                    {['PNG', 'SVG', 'PDF', 'ZIP'].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC, marginBottom: 10 }}>Include Options</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { label: 'Include QR Code', val: includeQR, set: setIncludeQR },
                      { label: 'Include Product ID', val: includeID, set: setIncludeID },
                      { label: 'Include Size Variants', val: includeSizes, set: setIncludeSizes },
                      { label: 'High Resolution (300 PPI)', val: highRes, set: setHighRes },
                    ].map(opt => (
                      <label key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                        <input type="checkbox" checked={opt.val} onChange={e => opt.set(e.target.checked)} style={{ accentColor: INDIGO, width: 15, height: 15 }} />
                        <span style={{ fontFamily: inter, fontSize: 13, color: TEXT }}>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC, display: 'block', marginBottom: 6 }}>Output Filename</label>
                  <input
                    readOnly
                    value={outputName}
                    style={{ fontFamily: mono, fontSize: 12, color: TEXT_SEC, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '7px 14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ ...cardStyle, marginBottom: 0 }}>
              <div style={{ fontFamily: inter, fontSize: 14, fontWeight: 600, color: INDIGO, marginBottom: 16 }}>3. Asset Preview</div>
              {selected.size === 0 ? (
                <div style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, textAlign: 'center', padding: '24px 0' }}>
                  Select products above to preview generated asset types
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ASSET_TYPES.map(at => (
                    <div key={at.label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '5px 12px' }}>
                      <span style={{ fontFamily: inter, fontSize: 12, color: TEXT }}>{at.label}</span>
                      <span style={{ fontFamily: mono, fontSize: 11, color: TEXT_SEC, background: CREAM, borderRadius: 10, padding: '1px 7px' }}>{at.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ position: 'sticky', top: 24 }}>
            {/* Summary card */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24, marginBottom: 16 }}>
              <div style={{ fontFamily: playfair, fontSize: 18, fontWeight: 500, color: INDIGO, marginBottom: 18 }}>Batch Summary</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
                {[
                  { label: 'Products selected', value: `${selected.size}` },
                  { label: 'Est. assets', value: `${estAssets} (${selected.size} × 6)` },
                  { label: 'Formats', value: format },
                  { label: 'Est. file size', value: `~${estMb} MB` },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC }}>{row.label}</span>
                    <span style={{ fontFamily: inter, fontSize: 13, fontWeight: 600, color: INDIGO }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <button
                disabled={selected.size === 0}
                style={{
                  fontFamily: inter, fontSize: 13, fontWeight: 600, color: '#fff',
                  background: selected.size === 0 ? '#A0ADB8' : INDIGO,
                  border: 'none', borderRadius: 10, padding: '11px 0', width: '100%', cursor: selected.size === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                Start Generation
              </button>
            </div>

            {/* Recent Batches */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
              <div style={{ fontFamily: inter, fontSize: 14, fontWeight: 600, color: INDIGO, marginBottom: 16 }}>Recent Batches</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {RECENT_BATCHES.map((batch, idx) => (
                  <div
                    key={batch.id}
                    style={{
                      padding: '12px 0',
                      borderBottom: idx < RECENT_BATCHES.length - 1 ? `1px solid ${BORDER}` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, color: INDIGO }}>Batch {batch.id}</span>
                      <span style={{
                        fontFamily: inter, fontSize: 10, fontWeight: 600,
                        color: batch.status === 'complete' ? '#4A7A5A' : '#A63D2F',
                        background: batch.status === 'complete' ? '#E6EDE8' : '#F9EDEA',
                        borderRadius: 20, padding: '2px 8px',
                      }}>
                        {batch.status === 'complete' ? 'Complete' : 'Error'}
                      </span>
                    </div>
                    <div style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC, marginBottom: 8 }}>
                      {batch.products} products · {batch.assets > 0 ? `${batch.assets} assets` : '—'} · {batch.date}
                    </div>
                    {batch.status === 'complete' ? (
                      <button style={{ fontFamily: inter, fontSize: 11, color: INDIGO, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 12px', cursor: 'pointer' }}>
                        Download ZIP
                      </button>
                    ) : (
                      <button style={{ fontFamily: inter, fontSize: 11, color: '#A63D2F', background: '#F9EDEA', border: '1px solid #EDCBC6', borderRadius: 7, padding: '4px 12px', cursor: 'pointer' }}>
                        Retry
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
