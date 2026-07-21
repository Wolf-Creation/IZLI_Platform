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

interface Props { onNavigate: (s: Screen) => void }

interface PassportRow {
  id: string
  productId: string
  productName: string
  productSku: string
  img: string
  status: 'active' | 'draft' | 'revoked'
  qrStatus: 'generated' | 'pending' | 'error'
  landingUrl: string
  scanCount: number
  createdAt: string
}

const PASSPORTS: PassportRow[] = [
  { id: 'PP-001', productId: 'IZLI-2026-000125', productName: 'Tifinagh Frame Tee', productSku: 'HRT-001', img: 'photo-1521572163474-6864f9cf17ab', status: 'active', qrStatus: 'generated', landingUrl: 'izli.co/p/hrt-001', scanCount: 1204, createdAt: '15 Mar 2026' },
  { id: 'PP-002', productId: 'IZLI-2026-000126', productName: 'Woven Sahara Overshirt', productSku: 'HRT-002', img: 'photo-1617196034183-421b4040ed20', status: 'active', qrStatus: 'generated', landingUrl: 'izli.co/p/hrt-002', scanCount: 892, createdAt: '16 Mar 2026' },
  { id: 'PP-003', productId: 'IZLI-2026-000127', productName: 'Atlas Symbol Boxy Tee', productSku: 'HRT-003', img: 'photo-1523381210434-271e8be1f52b', status: 'active', qrStatus: 'generated', landingUrl: 'izli.co/p/hrt-003', scanCount: 634, createdAt: '17 Mar 2026' },
  { id: 'PP-004', productId: 'IZLI-2026-000128', productName: 'Sahara Cargo Trousers', productSku: 'BTM-001', img: 'photo-1469334031218-e382a71b716b', status: 'active', qrStatus: 'generated', landingUrl: 'izli.co/p/btm-001', scanCount: 441, createdAt: '18 Mar 2026' },
  { id: 'PP-005', productId: 'IZLI-2026-000129', productName: 'Mountain Pass Hoodie', productSku: 'HRT-004', img: 'photo-1516762689617-e1cffcef479d', status: 'draft', qrStatus: 'pending', landingUrl: 'izli.co/p/hrt-004', scanCount: 0, createdAt: '20 Jun 2026' },
  { id: 'PP-006', productId: 'IZLI-2026-000130', productName: 'Linen Wide-Leg Trousers', productSku: 'BTM-002', img: 'photo-1516762689617-e1cffcef479d', status: 'draft', qrStatus: 'pending', landingUrl: 'izli.co/p/btm-002', scanCount: 0, createdAt: '28 Jun 2026' },
  { id: 'PP-007', productId: 'IZLI-2025-000087', productName: 'Heritage Kufiya Wrap', productSku: 'ACC-001', img: 'photo-1523381210434-271e8be1f52b', status: 'revoked', qrStatus: 'error', landingUrl: 'izli.co/p/acc-001', scanCount: 312, createdAt: '10 Oct 2025' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  active: { bg: '#E6EDE8', color: '#4A7A5A' },
  draft: { bg: SURFACE_2, color: CLAY },
  revoked: { bg: '#F9EDEA', color: '#A63D2F' },
}

const QR_STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  generated: { bg: '#E6EDE8', color: '#4A7A5A', label: 'Generated' },
  pending: { bg: '#FFF4E5', color: '#8C6B00', label: 'Pending' },
  error: { bg: '#F9EDEA', color: '#A63D2F', label: 'Error' },
}

// Tiny visual QR placeholder
function MiniQR({ size = 28 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, background: 'white', border: `1px solid ${BORDER}`, borderRadius: 4, padding: 3, boxSizing: 'border-box' }}>
      <svg width={size - 8} height={size - 8} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        {/* TL finder */}
        <rect x="0" y="0" width="7" height="7" fill="#1E2F44" rx="1"/>
        <rect x="1" y="1" width="5" height="5" fill="white" rx="0.5"/>
        <rect x="2" y="2" width="3" height="3" fill="#1E2F44" rx="0.3"/>
        {/* TR finder */}
        <rect x="14" y="0" width="7" height="7" fill="#1E2F44" rx="1"/>
        <rect x="15" y="1" width="5" height="5" fill="white" rx="0.5"/>
        <rect x="16" y="2" width="3" height="3" fill="#1E2F44" rx="0.3"/>
        {/* BL finder */}
        <rect x="0" y="14" width="7" height="7" fill="#1E2F44" rx="1"/>
        <rect x="1" y="15" width="5" height="5" fill="white" rx="0.5"/>
        <rect x="2" y="16" width="3" height="3" fill="#1E2F44" rx="0.3"/>
        {/* data modules */}
        {[
          [9,0],[11,0],[13,0],[9,2],[12,2],[10,3],[13,3],[9,4],[11,4],
          [9,6],[10,6],[12,6],[0,9],[2,9],[4,9],[6,9],[9,9],[11,9],[13,9],[15,9],[17,9],[19,9],[20,9],
          [1,10],[3,10],[5,10],[7,10],[10,10],[12,10],[14,10],[16,10],[18,10],[20,10],
          [0,11],[2,11],[4,11],[8,11],[11,11],[13,11],[15,11],[17,11],[19,11],
          [9,12],[11,12],[14,12],[16,12],[18,12],[20,12],
          [8,13],[10,13],[12,13],[15,13],[17,13],[19,13],
          [9,14],[11,14],[14,14],[16,14],[20,14],
          [8,16],[10,16],[12,16],[15,16],[17,16],[19,16],
          [9,17],[11,17],[14,17],[16,17],[18,17],[20,17],
          [8,18],[10,18],[12,18],[15,18],[17,18],[20,18],
          [9,19],[11,19],[14,19],[16,19],[19,19],
          [8,20],[10,20],[12,20],[15,20],[17,20],[19,20],
        ].map(([x, y], i) => <rect key={i} x={x} y={y} width="1" height="1" fill="#1E2F44"/>)}
      </svg>
    </div>
  )
}

export default function ProductPassportList({ onNavigate }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = PASSPORTS.filter(p => {
    const q = search.toLowerCase()
    return (p.productName.toLowerCase().includes(q) || p.productId.toLowerCase().includes(q) || p.productSku.toLowerCase().includes(q)) &&
      (filter === 'all' || p.status === filter)
  })

  const toggleSelect = (id: string) => setSelected(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next
  })
  const allSelected = filtered.length > 0 && filtered.every(p => selected.has(p.id))
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(filtered.map(p => p.id)))

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1400, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>Product Passports</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 5 }}>
            {PASSPORTS.length} passports · {PASSPORTS.filter(p => p.status === 'active').length} active · automatically generated on publish
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Export CSV
          </button>
          <button style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Bulk Download QR
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Passports', value: PASSPORTS.length, sub: 'across all products' },
          { label: 'QR Generated', value: PASSPORTS.filter(p => p.qrStatus === 'generated').length, sub: 'active codes' },
          { label: 'Total Scans', value: PASSPORTS.reduce((s, p) => s + p.scanCount, 0).toLocaleString(), sub: 'all-time scans' },
          { label: 'Avg Scans / Product', value: Math.round(PASSPORTS.filter(p => p.scanCount > 0).reduce((s, p) => s + p.scanCount, 0) / PASSPORTS.filter(p => p.scanCount > 0).length), sub: 'per active passport' },
        ].map((s, i) => (
          <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: INDIGO, fontFamily: "'Playfair Display', serif", marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: SAND }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            {[
              { value: 'all', label: 'All', count: PASSPORTS.length },
              { value: 'active', label: 'Active', count: PASSPORTS.filter(p => p.status === 'active').length },
              { value: 'draft', label: 'Draft', count: PASSPORTS.filter(p => p.status === 'draft').length },
              { value: 'revoked', label: 'Revoked', count: PASSPORTS.filter(p => p.status === 'revoked').length },
            ].map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)} style={{
                padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                border: `1px solid ${filter === f.value ? INDIGO : BORDER}`,
                background: filter === f.value ? INDIGO : 'transparent',
                color: filter === f.value ? CREAM : TEXT_SEC,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 5,
              }}>
                {f.label} <span style={{ fontSize: 10, opacity: 0.75 }}>{f.count}</span>
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 10, fontSize: 13, color: SAND }}>⌕</span>
            <input
              placeholder="Search by name, ID, SKU…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 28px', border: `1px solid ${BORDER}`, borderRadius: 9, background: BG, fontSize: 13, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none', width: 240 }}
            />
          </div>
        </div>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div style={{ padding: '8px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EBF0F5', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: INDIGO, fontWeight: 500 }}>{selected.size} selected</span>
            <div style={{ width: 1, height: 14, background: BORDER }} />
            {['Download QR', 'Print', 'Revoke'].map((action, i) => (
              <button key={action} onClick={() => setSelected(new Set())} style={{ fontSize: 12, color: i === 2 ? '#A63D2F' : TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{action}</button>
            ))}
          </div>
        )}

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '36px 52px 2fr 160px 80px 110px 180px 80px 90px 80px', gap: 14, padding: '10px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
          <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ accentColor: INDIGO, cursor: 'pointer' }} />
          <div />
          {['Product', 'Product ID', 'QR', 'QR Status', 'Landing URL', 'Created', 'Scans', 'Status', 'Actions'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: TEXT_SEC, fontSize: 14 }}>No passports match your search.</div>
        ) : filtered.map((pp, i) => {
          const ss = STATUS_STYLE[pp.status]
          const qs = QR_STATUS_STYLE[pp.qrStatus]
          const isSelected = selected.has(pp.id)
          return (
            <div key={pp.id} style={{
              display: 'grid', gridTemplateColumns: '36px 52px 2fr 160px 80px 110px 180px 80px 90px 80px', gap: 14,
              padding: '12px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none',
              background: isSelected ? '#EBF0F5' : 'transparent', alignItems: 'center', cursor: 'pointer',
            }}
              onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(30,47,68,0.03)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isSelected ? '#EBF0F5' : 'transparent' }}
            >
              <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(pp.id)} onClick={e => e.stopPropagation()} style={{ accentColor: INDIGO, cursor: 'pointer' }} />

              {/* Product thumbnail */}
              <div style={{ width: 38, height: 46, borderRadius: 7, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
                <img src={`https://images.unsplash.com/${pp.img}?w=76&h=92&fit=crop&auto=format`} alt={pp.productName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              {/* Product name */}
              <div onClick={() => onNavigate('product-passport-editor')}>
                <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{pp.productName}</div>
                <div style={{ fontSize: 11, color: SAND, fontFamily: "'JetBrains Mono', monospace" }}>{pp.productSku} · {pp.id}</div>
              </div>

              {/* Product ID */}
              <div style={{ fontSize: 11, color: INDIGO, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{pp.productId}</div>

              {/* QR preview */}
              <div onClick={() => onNavigate('product-passport-editor')}>
                <MiniQR size={32} />
              </div>

              {/* QR status */}
              <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: qs.bg, color: qs.color, display: 'inline-block' }}>{qs.label}</span>

              {/* Landing URL */}
              <div style={{ fontSize: 11, color: TEXT_SEC, fontFamily: "'JetBrains Mono', monospace", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pp.landingUrl}</div>

              {/* Created */}
              <div style={{ fontSize: 12, color: TEXT_SEC }}>{pp.createdAt}</div>

              {/* Scan count */}
              <div style={{ fontSize: 13, fontWeight: pp.scanCount > 0 ? 500 : 400, color: pp.scanCount > 0 ? INDIGO : TEXT_SEC }}>
                {pp.scanCount > 0 ? pp.scanCount.toLocaleString() : '—'}
              </div>

              {/* Status */}
              <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: ss.bg, color: ss.color, display: 'inline-block' }}>
                {pp.status.charAt(0).toUpperCase() + pp.status.slice(1)}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={e => { e.stopPropagation(); onNavigate('product-passport-editor') }}
                  style={{ padding: '5px 10px', fontSize: 11, color: INDIGO, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Open
                </button>
                <button onClick={e => e.stopPropagation()}
                  style={{ padding: '5px 8px', fontSize: 11, color: TEXT_SEC, background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  ⋯
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: TEXT_SEC }}>Showing {filtered.length} of {PASSPORTS.length} passports</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2].map(p => (
            <button key={p} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${p === 1 ? INDIGO : BORDER}`, background: p === 1 ? INDIGO : 'transparent', color: p === 1 ? CREAM : TEXT_SEC, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
