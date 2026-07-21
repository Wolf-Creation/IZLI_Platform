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

type FilterType = 'All' | 'Active' | 'Expired' | 'Depleted'

interface Reward {
  id: number
  icon: string
  title: string
  type: string
  level: string
  status: 'Active' | 'Expired' | 'Depleted'
  available: number | '∞'
  claimed: number
}

const rewards: Reward[] = [
  { id: 1, icon: '🏅', title: 'First Archive Badge', type: 'Badge', level: 'All Levels', status: 'Active', available: '∞', claimed: 3241 },
  { id: 2, icon: '🎫', title: '10% Next Purchase', type: 'Discount', level: 'Keeper+', status: 'Active', available: 500, claimed: 312 },
  { id: 3, icon: '⚡', title: 'Early Access: Mountain Memory', type: 'Early Access', level: 'Senior Keeper+', status: 'Active', available: 200, claimed: 87 },
  { id: 4, icon: '🎁', title: 'Exclusive Woven Tote', type: 'Physical', level: 'Legacy Keeper+', status: 'Active', available: 50, claimed: 24 },
  { id: 5, icon: '🏅', title: 'Guardian Badge', type: 'Badge', level: 'Guardian', status: 'Active', available: 47, claimed: 47 },
  { id: 6, icon: '🎁', title: 'FW25 Archive Certificate', type: 'Physical', level: 'Keeper+', status: 'Expired', available: 100, claimed: 98 },
]

const statusBadgeStyle = (status: Reward['status']): React.CSSProperties => {
  if (status === 'Active') return { background: '#E6EDE8', color: '#4A7A5A' }
  if (status === 'Expired') return { background: BG, color: TEXT_SEC }
  return { background: SURFACE_2, color: CLAY }
}

const typeColor: Record<string, string> = {
  Badge: INDIGO,
  Discount: '#4A7A5A',
  'Early Access': CLAY,
  Physical: '#5A4A8A',
}

export default function LegacyRewards({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [search, setSearch] = useState('')

  const filters: FilterType[] = ['All', 'Active', 'Expired', 'Depleted']

  const filtered = rewards.filter(r => {
    const matchFilter = activeFilter === 'All' || r.status === activeFilter
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const claimedPct = (r: Reward) => {
    if (r.available === '∞') return Math.min((r.claimed / 4000) * 100, 100)
    return Math.min((r.claimed / (r.available as number)) * 100, 100)
  }

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT, background: BG, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>Rewards</h1>
          <p style={{ color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>12 rewards available across all Keeper levels</p>
        </div>
        <button style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
          + New Reward
        </button>
      </div>

      {/* Filters + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 6, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? INDIGO : 'transparent', color: activeFilter === f ? CREAM : TEXT_SEC, border: 'none', borderRadius: 6, padding: '5px 14px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
              {f}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search rewards…"
          style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: '8px 14px', fontSize: 13, fontFamily: 'Inter, sans-serif', background: SURFACE, color: TEXT, outline: 'none', width: 220 }}
        />
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map(r => (
          <div key={r.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
            {/* Icon + Title row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: SURFACE_2, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {r.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: TEXT, marginBottom: 4 }}>{r.title}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ background: typeColor[r.type] || CLAY, color: CREAM, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{r.type}</span>
                  <span style={{ background: SURFACE_2, border: `1px solid ${BORDER}`, color: CLAY, borderRadius: 20, padding: '2px 8px', fontSize: 10 }}>{r.level}</span>
                </div>
              </div>
            </div>

            {/* Status + availability */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ ...statusBadgeStyle(r.status), borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{r.status}</span>
              <span style={{ fontSize: 12, color: TEXT_SEC }}>
                {r.available === '∞' ? '∞' : r.available} available
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: TEXT_SEC }}>Claimed</span>
                <span style={{ fontSize: 11, color: TEXT_SEC, fontWeight: 500 }}>{r.claimed.toLocaleString()}</span>
              </div>
              <div style={{ background: BG, height: 5, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ background: SAND, width: `${claimedPct(r)}%`, height: '100%', borderRadius: 3 }} />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 6, padding: '6px 12px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>Edit</button>
              <button style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>View Claimants</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
