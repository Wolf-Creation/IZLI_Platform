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

interface HubRow {
  id: string
  name: string
  type: string
  linkedCount: number
  trigger: string
  status: 'active' | 'draft' | 'archived'
  updatedAt: string
  locations: number
}

const HUBS: HubRow[] = [
  { id: 'RH-001', name: 'Complete Your Style', type: 'Style + Products', linkedCount: 12, trigger: 'Viewing Product', status: 'active', updatedAt: '10 Jul 2026', locations: 4 },
  { id: 'RH-002', name: 'Explore Echoes of Stone', type: 'Collection', linkedCount: 8, trigger: 'Viewing Collection', status: 'active', updatedAt: '7 Jul 2026', locations: 3 },
  { id: 'RH-003', name: 'Related Heritage Stories', type: 'Stories + Heritage', linkedCount: 5, trigger: 'Viewing Story', status: 'active', updatedAt: '4 Jul 2026', locations: 2 },
  { id: 'RH-004', name: 'New Arrivals FW26', type: 'New Arrivals', linkedCount: 16, trigger: 'Website Home', status: 'active', updatedAt: '2 Jul 2026', locations: 5 },
  { id: 'RH-005', name: 'Community Favorites', type: 'Community', linkedCount: 9, trigger: 'Viewing Community', status: 'draft', updatedAt: '28 Jun 2026', locations: 2 },
  { id: 'RH-006', name: 'QR: Sage Lookbook', type: 'Style Guide + Products', linkedCount: 7, trigger: 'Viewing QR Page', status: 'active', updatedAt: '20 Jun 2026', locations: 1 },
  { id: 'RH-007', name: 'Seasonal Picks — Summer', type: 'Seasonal Picks', linkedCount: 14, trigger: 'Viewing Category', status: 'draft', updatedAt: '12 Jun 2026', locations: 3 },
  { id: 'RH-008', name: 'Related Challenges', type: 'Challenges', linkedCount: 4, trigger: 'Viewing Challenge', status: 'archived', updatedAt: '1 Mar 2026', locations: 1 },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  active: { bg: '#E6EDE8', color: '#4A7A5A' },
  draft: { bg: SURFACE_2, color: CLAY },
  archived: { bg: BG, color: TEXT_SEC },
}

const TYPE_ICON: Record<string, string> = {
  'Style + Products': '◈',
  'Collection': '⬡',
  'Stories + Heritage': '◫',
  'New Arrivals': '✦',
  'Community': '◯',
  'Style Guide + Products': '◈',
  'Seasonal Picks': '◇',
  'Challenges': '△',
}

export default function RecommendationHubList({ onNavigate }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('updated')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = HUBS
    .filter(h => {
      const q = search.toLowerCase()
      return (h.name.toLowerCase().includes(q) || h.type.toLowerCase().includes(q)) &&
        (filter === 'all' || h.status === filter)
    })
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'links') return b.linkedCount - a.linkedCount
      return 0
    })

  const toggleSelect = (id: string) => setSelected(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next
  })
  const allSelected = filtered.length > 0 && filtered.every(h => selected.has(h.id))
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(filtered.map(h => h.id)))

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>Recommendation Hub</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 5 }}>
            {HUBS.length} hubs · {HUBS.filter(h => h.status === 'active').length} active
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Import
          </button>
          <button onClick={() => onNavigate('recommendation-hub-editor')} style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: CREAM, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            + New Hub
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Hubs', value: HUBS.length, sub: 'across all types' },
          { label: 'Active', value: HUBS.filter(h => h.status === 'active').length, sub: 'currently serving' },
          { label: 'Linked Resources', value: HUBS.reduce((s, h) => s + h.linkedCount, 0), sub: 'total connections' },
          { label: 'Display Locations', value: HUBS.reduce((s, h) => s + h.locations, 0), sub: 'placement slots' },
        ].map((s, i) => (
          <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: INDIGO, fontFamily: "'Playfair Display', serif", marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: SAND }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter + search toolbar */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            {[
              { value: 'all', label: 'All', count: HUBS.length },
              { value: 'active', label: 'Active', count: HUBS.filter(h => h.status === 'active').length },
              { value: 'draft', label: 'Draft', count: HUBS.filter(h => h.status === 'draft').length },
              { value: 'archived', label: 'Archived', count: HUBS.filter(h => h.status === 'archived').length },
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
              placeholder="Search hubs…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 28px', border: `1px solid ${BORDER}`, borderRadius: 9, background: BG, fontSize: 13, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none', width: 220 }}
            />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 9, background: BG, fontSize: 13, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer' }}>
            <option value="updated">Sort: Updated</option>
            <option value="name">Sort: Name</option>
            <option value="links">Sort: Links</option>
          </select>
        </div>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div style={{ padding: '8px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EBF0F5', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: INDIGO, fontWeight: 500 }}>{selected.size} selected</span>
            <div style={{ width: 1, height: 14, background: BORDER }} />
            {['Activate', 'Archive', 'Delete'].map((action, i) => (
              <button key={action} onClick={() => setSelected(new Set())} style={{ fontSize: 12, color: i === 2 ? '#A63D2F' : TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{action}</button>
            ))}
          </div>
        )}

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '36px 2fr 140px 120px 150px 90px 100px 80px', gap: 16, padding: '10px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
          <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ accentColor: INDIGO, cursor: 'pointer' }} />
          {['Name', 'Type', 'Resources', 'Trigger', 'Status', 'Locations', 'Updated', 'Actions'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: TEXT_SEC, fontSize: 14 }}>No hubs match your filter.</div>
        ) : filtered.map((hub, i) => {
          const ss = STATUS_STYLE[hub.status]
          const isSelected = selected.has(hub.id)
          return (
            <div
              key={hub.id}
              style={{
                display: 'grid', gridTemplateColumns: '36px 2fr 140px 120px 150px 90px 100px 80px', gap: 16,
                padding: '14px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none',
                background: isSelected ? '#EBF0F5' : 'transparent', alignItems: 'center', cursor: 'pointer',
              }}
              onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(30,47,68,0.03)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isSelected ? '#EBF0F5' : 'transparent' }}
            >
              <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(hub.id)} onClick={e => e.stopPropagation()} style={{ accentColor: INDIGO, cursor: 'pointer' }} />

              {/* Name */}
              <div onClick={() => onNavigate('recommendation-hub-editor')} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: '#E8EDF3', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: INDIGO, flexShrink: 0 }}>
                  {TYPE_ICON[hub.type] ?? '◈'}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{hub.name}</div>
                  <div style={{ fontSize: 11, color: SAND, fontFamily: "'JetBrains Mono', monospace" }}>{hub.id}</div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: TEXT_SEC }}>{hub.type}</div>

              <div style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>
                <span style={{ color: INDIGO }}>{hub.linkedCount}</span>
                <span style={{ color: TEXT_SEC }}> items</span>
              </div>

              <div style={{ fontSize: 12, color: TEXT_SEC }}>{hub.trigger}</div>

              <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: ss.bg, color: ss.color, display: 'inline-block' }}>
                {hub.status.charAt(0).toUpperCase() + hub.status.slice(1)}
              </span>

              <div style={{ fontSize: 12, color: TEXT_SEC }}>{hub.locations} pages</div>

              <div style={{ fontSize: 12, color: TEXT_SEC }}>{hub.updatedAt}</div>

              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={e => { e.stopPropagation(); onNavigate('recommendation-hub-editor') }}
                  style={{ padding: '5px 10px', fontSize: 11, color: INDIGO, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Edit
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
        <span style={{ fontSize: 12, color: TEXT_SEC }}>Showing {filtered.length} of {HUBS.length} hubs</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2].map(p => (
            <button key={p} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${p === 1 ? INDIGO : BORDER}`, background: p === 1 ? INDIGO : 'transparent', color: p === 1 ? CREAM : TEXT_SEC, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
