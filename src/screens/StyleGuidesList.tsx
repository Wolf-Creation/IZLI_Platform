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

interface StyleGuideRow {
  id: string
  name: string
  slug: string
  status: 'published' | 'draft' | 'archived'
  collection: string
  primaryColor: string
  paletteColors: string[]
  assignedProducts: number
  updatedAt: string
}

const GUIDES: StyleGuideRow[] = [
  {
    id: 'SG-001', name: 'Sage Collection Style Guide', slug: 'sage-collection',
    status: 'published', collection: 'Echoes of Stone',
    primaryColor: '#7D8470', paletteColors: ['#7D8470', '#B7AA91', '#EDE8DF', '#2E2E2E'],
    assignedProducts: 8, updatedAt: '8 Jul 2026',
  },
  {
    id: 'SG-002', name: 'Indigo Collection Style Guide', slug: 'indigo-collection',
    status: 'published', collection: 'Atlas FW25',
    primaryColor: '#1E2F44', paletteColors: ['#1E2F44', '#506681', '#E7DFD2', '#8C6B52'],
    assignedProducts: 12, updatedAt: '5 Jul 2026',
  },
  {
    id: 'SG-003', name: 'Linen Beige Style Guide', slug: 'linen-beige',
    status: 'published', collection: 'Essentials Permanent',
    primaryColor: '#D4C9B0', paletteColors: ['#D4C9B0', '#EDE8DF', '#8C6B52', '#2E2E2E'],
    assignedProducts: 6, updatedAt: '2 Jul 2026',
  },
  {
    id: 'SG-004', name: 'Mountain Collection Style Guide', slug: 'mountain-collection',
    status: 'draft', collection: 'Atlas FW26',
    primaryColor: '#5C6B5A', paletteColors: ['#5C6B5A', '#8B7355', '#C4B8A0', '#1A1A1A'],
    assignedProducts: 0, updatedAt: '28 Jun 2026',
  },
  {
    id: 'SG-005', name: 'Clay Autumn Style Guide', slug: 'clay-autumn',
    status: 'draft', collection: '—',
    primaryColor: '#8C6B52', paletteColors: ['#8C6B52', '#C4956A', '#EDE8DF', '#2E2E2E'],
    assignedProducts: 3, updatedAt: '20 Jun 2026',
  },
  {
    id: 'SG-006', name: 'Desert Sand Style Guide', slug: 'desert-sand',
    status: 'archived', collection: 'Roots SS25',
    primaryColor: '#C9B49A', paletteColors: ['#C9B49A', '#E8DECE', '#8C7460', '#3A2E24'],
    assignedProducts: 4, updatedAt: '15 Mar 2026',
  },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  published: { bg: '#E6EDE8', color: '#4A7A5A' },
  draft: { bg: SURFACE_2, color: CLAY },
  archived: { bg: BG, color: TEXT_SEC },
}

export default function StyleGuidesList({ onNavigate }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('updated')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = GUIDES
    .filter(g => {
      const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.slug.includes(search.toLowerCase())
      const matchFilter = filter === 'all' || g.status === filter
      return matchSearch && matchFilter
    })
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'products') return b.assignedProducts - a.assignedProducts
      return 0
    })

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const allSelected = filtered.length > 0 && filtered.every(g => selected.has(g.id))
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(filtered.map(g => g.id)))

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>

      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>Style Guides</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 5 }}>
            {GUIDES.length} guides · {GUIDES.filter(g => g.status === 'published').length} published
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Import
          </button>
          <button onClick={() => onNavigate('style-guide-editor')} style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: CREAM, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            + New Style Guide
          </button>
        </div>
      </div>

      {/* Filters + search bar */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Status filters */}
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            {[
              { value: 'all', label: 'All', count: GUIDES.length },
              { value: 'published', label: 'Published', count: GUIDES.filter(g => g.status === 'published').length },
              { value: 'draft', label: 'Draft', count: GUIDES.filter(g => g.status === 'draft').length },
              { value: 'archived', label: 'Archived', count: GUIDES.filter(g => g.status === 'archived').length },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                style={{
                  padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${filter === f.value ? INDIGO : BORDER}`,
                  background: filter === f.value ? INDIGO : 'transparent',
                  color: filter === f.value ? CREAM : TEXT_SEC,
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                {f.label}
                <span style={{ fontSize: 10, opacity: 0.75 }}>{f.count}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 10, fontSize: 13, color: SAND }}>⌕</span>
            <input
              placeholder="Search guides…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 28px', border: `1px solid ${BORDER}`, borderRadius: 9, background: BG, fontSize: 13, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none', width: 220 }}
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 9, background: BG, fontSize: 13, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer' }}
          >
            <option value="updated">Sort: Updated</option>
            <option value="name">Sort: Name</option>
            <option value="products">Sort: Products</option>
          </select>
        </div>

        {/* Bulk actions (shown when items selected) */}
        {selected.size > 0 && (
          <div style={{ padding: '8px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EBF0F5', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: INDIGO, fontWeight: 500 }}>{selected.size} selected</span>
            <div style={{ width: 1, height: 14, background: BORDER }} />
            {['Publish', 'Archive', 'Delete'].map((action, i) => (
              <button
                key={action}
                onClick={() => setSelected(new Set())}
                style={{ fontSize: 12, color: i === 2 ? '#A63D2F' : TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '36px 2fr 120px 140px 80px 80px 100px 72px', gap: 16, padding: '10px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
          <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ accentColor: INDIGO, cursor: 'pointer' }} />
          {['Name', 'Preview Palette', 'Collection', 'Status', 'Products', 'Updated', 'Actions'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: TEXT_SEC, fontSize: 14 }}>
            No style guides match your filter.
          </div>
        ) : filtered.map((guide, i) => {
          const ss = STATUS_STYLE[guide.status]
          const isSelected = selected.has(guide.id)
          return (
            <div
              key={guide.id}
              style={{
                display: 'grid', gridTemplateColumns: '36px 2fr 120px 140px 80px 80px 100px 72px', gap: 16,
                padding: '14px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none',
                background: isSelected ? '#EBF0F5' : 'transparent',
                alignItems: 'center', cursor: 'pointer',
              }}
              onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(30,47,68,0.03)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isSelected ? '#EBF0F5' : 'transparent' }}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelect(guide.id)}
                onClick={e => e.stopPropagation()}
                style={{ accentColor: INDIGO, cursor: 'pointer' }}
              />

              {/* Name */}
              <div onClick={() => onNavigate('style-guide-editor')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* Color swatch */}
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: guide.primaryColor, border: `1px solid ${BORDER}`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{guide.name}</div>
                    <div style={{ fontSize: 11, color: SAND, fontFamily: "'JetBrains Mono', monospace" }}>{guide.id}</div>
                  </div>
                </div>
              </div>

              {/* Palette preview */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {guide.paletteColors.map((c, ci) => (
                  <div
                    key={ci}
                    title={c}
                    style={{ width: ci === 0 ? 22 : 16, height: ci === 0 ? 22 : 16, borderRadius: 999, background: c, border: `1px solid ${BORDER}`, flexShrink: 0 }}
                  />
                ))}
              </div>

              {/* Collection */}
              <div style={{ fontSize: 12, color: TEXT_SEC }}>{guide.collection}</div>

              {/* Status */}
              <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: ss.bg, color: ss.color, display: 'inline-block' }}>
                {guide.status.charAt(0).toUpperCase() + guide.status.slice(1)}
              </span>

              {/* Products */}
              <div style={{ fontSize: 12, fontWeight: guide.assignedProducts > 0 ? 500 : 400, color: guide.assignedProducts > 0 ? INDIGO : TEXT_SEC }}>
                {guide.assignedProducts > 0 ? `${guide.assignedProducts} products` : '—'}
              </div>

              {/* Updated */}
              <div style={{ fontSize: 12, color: TEXT_SEC }}>{guide.updatedAt}</div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={e => { e.stopPropagation(); onNavigate('style-guide-editor') }}
                  style={{ padding: '5px 10px', fontSize: 11, color: INDIGO, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Edit
                </button>
                <button
                  onClick={e => e.stopPropagation()}
                  style={{ padding: '5px 8px', fontSize: 11, color: TEXT_SEC, background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  ⋯
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: TEXT_SEC }}>Showing {filtered.length} of {GUIDES.length} guides</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2].map(p => (
            <button key={p} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${p === 1 ? INDIGO : BORDER}`, background: p === 1 ? INDIGO : 'transparent', color: p === 1 ? CREAM : TEXT_SEC, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
