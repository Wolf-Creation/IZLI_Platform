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

interface ArchiveRow {
  id: string
  name: string
  collection: string
  status: 'active' | 'upcoming' | 'complete'
  keepers: number
  products: number
  release: string
  voting: 'open' | 'closed' | 'counting' | 'not-started'
}

const ARCHIVES: ArchiveRow[] = [
  { id: 'ARC-001', name: 'Echoes of Stone', collection: 'Echoes of Stone', status: 'active', keepers: 1204, products: 24, release: 'Mar 2026', voting: 'closed' },
  { id: 'ARC-002', name: 'Atlas FW25', collection: 'Atlas FW25', status: 'complete', keepers: 892, products: 18, release: 'Oct 2025', voting: 'closed' },
  { id: 'ARC-003', name: 'Roots SS25', collection: 'Roots SS25', status: 'complete', keepers: 634, products: 15, release: 'Mar 2025', voting: 'closed' },
  { id: 'ARC-004', name: 'Mountain Memory', collection: 'Atlas FW26', status: 'upcoming', keepers: 312, products: 0, release: 'Oct 2026', voting: 'open' },
  { id: 'ARC-005', name: 'Desert Sun', collection: '—', status: 'upcoming', keepers: 0, products: 0, release: 'Mar 2027', voting: 'not-started' },
  { id: 'ARC-006', name: 'Sahara Drift', collection: '—', status: 'active', keepers: 87, products: 8, release: 'Jun 2026', voting: 'counting' },
  { id: 'ARC-007', name: 'Coastal Indigo', collection: '—', status: 'active', keepers: 64, products: 6, release: 'Jul 2026', voting: 'open' },
  { id: 'ARC-008', name: 'Stone & Thread', collection: '—', status: 'active', keepers: 48, products: 4, release: 'Aug 2026', voting: 'open' },
]

const STATUS_META: Record<ArchiveRow['status'], { label: string; bg: string; color: string }> = {
  active:   { label: 'Active',    bg: '#E6EDE8', color: '#4A7A5A' },
  upcoming: { label: 'Upcoming',  bg: SURFACE_2, color: CLAY },
  complete: { label: 'Complete',  bg: BG,        color: TEXT_SEC },
}

const VOTING_META: Record<ArchiveRow['voting'], { label: string; bg: string; color: string }> = {
  open:        { label: 'Open',        bg: '#E6EDE8', color: '#4A7A5A' },
  closed:      { label: 'Closed',      bg: SURFACE_2, color: TEXT_SEC },
  counting:    { label: 'Counting',    bg: '#FFF4E5', color: '#8C6B00' },
  'not-started': { label: 'Not Started', bg: BG,      color: SAND },
}

const FILTER_PILLS = ['All 8', 'Active 4', 'Upcoming 2', 'Complete 2']

const badge = (bg: string, color: string, label: string) => (
  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: bg, color }}>{label}</span>
)

export default function LegacyArchives({ onNavigate: _ }: Props) {
  const [pill, setPill] = useState('All 8')
  const [search, setSearch] = useState('')

  const filtered = ARCHIVES.filter(a => {
    if (pill === 'Active 4' && a.status !== 'active') return false
    if (pill === 'Upcoming 2' && a.status !== 'upcoming') return false
    if (pill === 'Complete 2' && a.status !== 'complete') return false
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>Archives</h1>
          <p style={{ margin: '6px 0 0', color: TEXT_SEC, fontSize: 13 }}>8 archives · 4 active · managing the complete IZLI Legacy timeline</p>
        </div>
        <button style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>+ New Archive</button>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Archives', value: '8', mono: false },
          { label: 'Active Keepers', value: '3,241', mono: false, big: true },
          { label: 'Products Archived', value: '284', mono: false },
          { label: 'Avg Keeper Count', value: '405', mono: false },
        ].map(k => (
          <div key={k.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontFamily: k.big ? '"Playfair Display", serif' : 'Inter, sans-serif', fontSize: k.big ? 28 : 22, fontWeight: k.big ? 500 : 600, color: INDIGO }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Filter Toolbar + Table */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {FILTER_PILLS.map(p => (
              <button key={p} onClick={() => setPill(p)} style={{ background: pill === p ? INDIGO : 'transparent', color: pill === p ? CREAM : TEXT_SEC, border: `1px solid ${pill === p ? INDIGO : BORDER}`, borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{p}</button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search archives…"
            style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 12px', fontSize: 13, color: TEXT, outline: 'none', width: 200 }}
          />
          <select style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 12px', fontSize: 13, color: TEXT_SEC, outline: 'none' }}>
            <option>Sort: Release ↓</option>
            <option>Sort: Keepers ↓</option>
            <option>Sort: Name A–Z</option>
          </select>
        </div>

        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '48px 2fr 140px 100px 90px 90px 90px 100px 80px', gap: 0, padding: '10px 20px', borderBottom: `1px solid ${BORDER}`, background: BG }}>
          {['', 'Name', 'Collection', 'Status', 'Keepers', 'Products', 'Release', 'Voting', 'Actions'].map(col => (
            <div key={col} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col}</div>
          ))}
        </div>

        {/* Table Rows */}
        {filtered.map((a, i) => {
          const sm = STATUS_META[a.status]
          const vm = VOTING_META[a.voting]
          return (
            <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '48px 2fr 140px 100px 90px 90px 90px 100px 80px', gap: 0, padding: '12px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none', alignItems: 'center', background: i % 2 === 0 ? 'transparent' : BG + '44' }}>
              {/* Image */}
              <div style={{ width: 40, height: 48, background: BG, border: `1px solid ${BORDER}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: SAND, fontSize: 16 }}>◈</div>
              {/* Name */}
              <div>
                <div style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>{a.name}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: SAND, marginTop: 2 }}>{a.id}</div>
              </div>
              {/* Collection */}
              <div style={{ fontSize: 12, color: TEXT_SEC }}>{a.collection}</div>
              {/* Status */}
              <div>{badge(sm.bg, sm.color, sm.label)}</div>
              {/* Keepers */}
              <div style={{ fontWeight: 500, color: INDIGO }}>{a.keepers.toLocaleString()}</div>
              {/* Products */}
              <div style={{ color: TEXT_SEC }}>{a.products}</div>
              {/* Release */}
              <div style={{ color: TEXT_SEC }}>{a.release}</div>
              {/* Voting */}
              <div>{badge(vm.bg, vm.color, vm.label)}</div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 10px', fontSize: 12, color: TEXT_SEC, cursor: 'pointer' }}>Edit</button>
                <button style={{ background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 8px', fontSize: 14, color: TEXT_SEC, cursor: 'pointer' }}>⋯</button>
              </div>
            </div>
          )
        })}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: `1px solid ${BORDER}` }}>
          <span style={{ fontSize: 12, color: TEXT_SEC }}>Showing {filtered.length} of 8 archives</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2].map(n => (
              <button key={n} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${n === 1 ? INDIGO : BORDER}`, background: n === 1 ? INDIGO : 'transparent', color: n === 1 ? CREAM : TEXT_SEC, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
