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

type Level = 'visitor' | 'customer' | 'keeper' | 'senior-keeper' | 'legacy-keeper' | 'guardian'

interface KeeperRow {
  id: string
  name: string
  initials: string
  level: Level
  archives: number
  products: number
  points: string
  votes: number
  referrals: number
}

const KEEPERS: KeeperRow[] = [
  { id: 'KPR-0041', name: 'Youcef Benali',      initials: 'YB', level: 'legacy-keeper',  archives: 3, products: 12, points: '8,420', votes: 14, referrals: 6 },
  { id: 'KPR-0027', name: 'Farida Oussama',     initials: 'FO', level: 'senior-keeper',  archives: 2, products: 8,  points: '4,210', votes: 9,  referrals: 3 },
  { id: 'KPR-0063', name: 'Ines Chaoui',        initials: 'IC', level: 'keeper',         archives: 1, products: 4,  points: '1,840', votes: 3,  referrals: 1 },
  { id: 'KPR-0018', name: 'Mehdi Aït Mansour',  initials: 'MA', level: 'senior-keeper',  archives: 2, products: 7,  points: '3,960', votes: 7,  referrals: 4 },
  { id: 'KPR-0082', name: 'Sonia Bendriss',     initials: 'SB', level: 'keeper',         archives: 1, products: 3,  points: '920',   votes: 2,  referrals: 0 },
  { id: 'KPR-0007', name: 'Karim Lounis',       initials: 'KL', level: 'guardian',       archives: 4, products: 18, points: '14,200',votes: 22, referrals: 11 },
  { id: 'KPR-0094', name: 'Amira Bekkar',       initials: 'AB', level: 'keeper',         archives: 1, products: 2,  points: '640',   votes: 1,  referrals: 1 },
  { id: 'KPR-0031', name: 'Riad Mansouri',      initials: 'RM', level: 'senior-keeper',  archives: 2, products: 9,  points: '5,100', votes: 8,  referrals: 5 },
]

const LEVEL_META: Record<Level, { label: string; bg: string; color: string }> = {
  visitor:       { label: 'Visitor',       bg: BG,        color: TEXT_SEC },
  customer:      { label: 'Customer',      bg: SURFACE_2, color: SAND },
  keeper:        { label: 'Keeper',        bg: '#F3EBE4', color: CLAY },
  'senior-keeper': { label: 'Senior Keeper', bg: '#E8EDF3', color: INDIGO },
  'legacy-keeper': { label: 'Legacy Keeper', bg: INDIGO,    color: CREAM },
  guardian:      { label: 'Guardian',     bg: '#8C7A00', color: '#FFF8E1' },
}

const LEVEL_STRIP = [
  { level: 'visitor' as Level,       count: '12,430', accent: TEXT_SEC },
  { level: 'customer' as Level,      count: '4,892',  accent: SAND },
  { level: 'keeper' as Level,        count: '2,104',  accent: CLAY },
  { level: 'senior-keeper' as Level, count: '847',    accent: INDIGO },
  { level: 'legacy-keeper' as Level, count: '243',    accent: '#1A2638' },
  { level: 'guardian' as Level,      count: '47',     accent: '#8C7A00' },
]

const FILTER_PILLS = ['All', 'Keeper+', 'Senior Keeper+', 'Legacy Keeper+', 'Guardian']

const badge = (bg: string, color: string, label: string) => (
  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: bg, color }}>{label}</span>
)

const LEVEL_FILTER_MAP: Record<string, Level[]> = {
  'All': ['visitor', 'customer', 'keeper', 'senior-keeper', 'legacy-keeper', 'guardian'],
  'Keeper+': ['keeper', 'senior-keeper', 'legacy-keeper', 'guardian'],
  'Senior Keeper+': ['senior-keeper', 'legacy-keeper', 'guardian'],
  'Legacy Keeper+': ['legacy-keeper', 'guardian'],
  'Guardian': ['guardian'],
}

export default function LegacyKeeperCircle({ onNavigate: _ }: Props) {
  const [pill, setPill] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = KEEPERS.filter(k => {
    const allowed = LEVEL_FILTER_MAP[pill] ?? LEVEL_FILTER_MAP['All']
    if (!allowed.includes(k.level)) return false
    if (search && !k.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>Keeper Circle</h1>
          <p style={{ margin: '6px 0 0', color: TEXT_SEC, fontSize: 13 }}>3,241 keepers across 6 levels · the core of the IZLI Legacy community</p>
        </div>
        <button style={{ background: 'transparent', color: INDIGO, border: `1.5px solid ${INDIGO}`, borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Export Keepers</button>
      </div>

      {/* Level Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 24 }}>
        {LEVEL_STRIP.map(({ level, count, accent }) => {
          const meta = LEVEL_META[level]
          return (
            <div key={level} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 8, fontWeight: 500, textTransform: 'capitalize' }}>{meta.label}</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: accent }}>{count}</div>
            </div>
          )
        })}
      </div>

      {/* Filter + Table */}
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
            placeholder="Search keepers…"
            style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 12px', fontSize: 13, color: TEXT, outline: 'none', width: 200 }}
          />
        </div>

        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '48px 2fr 120px 100px 90px 80px 80px 90px 80px', padding: '10px 20px', borderBottom: `1px solid ${BORDER}`, background: BG }}>
          {['', 'Keeper', 'Level', 'Archives', 'Products', 'Points', 'Votes', 'Referrals', 'Actions'].map(col => (
            <div key={col} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((k, i) => {
          const meta = LEVEL_META[k.level]
          return (
            <div key={k.id} style={{ display: 'grid', gridTemplateColumns: '48px 2fr 120px 100px 90px 80px 80px 90px 80px', padding: '12px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none', alignItems: 'center', background: i % 2 === 0 ? 'transparent' : BG + '44' }}>
              {/* Avatar */}
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: INDIGO, color: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>{k.initials}</div>
              {/* Name */}
              <div>
                <div style={{ fontWeight: 500, color: TEXT, fontSize: 13 }}>{k.name}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: SAND, marginTop: 2 }}>{k.id}</div>
              </div>
              {/* Level */}
              <div>{badge(meta.bg, meta.color, meta.label)}</div>
              {/* Archives */}
              <div style={{ color: TEXT_SEC }}>{k.archives} {k.archives === 1 ? 'archive' : 'archives'}</div>
              {/* Products */}
              <div style={{ color: TEXT_SEC }}>{k.products} {k.products === 1 ? 'product' : 'products'}</div>
              {/* Points */}
              <div style={{ fontWeight: 500, color: INDIGO, fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>{k.points}</div>
              {/* Votes */}
              <div style={{ color: TEXT_SEC }}>{k.votes} {k.votes === 1 ? 'vote' : 'votes'}</div>
              {/* Referrals */}
              <div style={{ color: TEXT_SEC }}>{k.referrals} {k.referrals === 1 ? 'ref' : 'refs'}</div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 10px', fontSize: 12, color: TEXT_SEC, cursor: 'pointer' }}>View</button>
                <button style={{ background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 8px', fontSize: 14, color: TEXT_SEC, cursor: 'pointer' }}>⋯</button>
              </div>
            </div>
          )
        })}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: `1px solid ${BORDER}` }}>
          <span style={{ fontSize: 12, color: TEXT_SEC }}>Showing {filtered.length} of 3,241 keepers</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3].map(n => (
              <button key={n} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${n === 1 ? INDIGO : BORDER}`, background: n === 1 ? INDIGO : 'transparent', color: n === 1 ? CREAM : TEXT_SEC, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{n}</button>
            ))}
            <span style={{ lineHeight: '32px', color: TEXT_SEC, fontSize: 13 }}>…</span>
            <button style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${BORDER}`, background: 'transparent', color: TEXT_SEC, fontSize: 13, cursor: 'pointer' }}>406</button>
          </div>
        </div>
      </div>
    </div>
  )
}
