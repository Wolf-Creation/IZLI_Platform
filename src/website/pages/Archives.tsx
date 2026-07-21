import { useState } from 'react'
import type { WebPage } from '../types'

const INDIGO = '#1E2F44'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAND = '#B7AA91'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const CREAM = '#E7DFD2'
const FONT_SERIF = "'Playfair Display', serif"
const FONT_SANS = "'Inter', sans-serif"

type ArchiveStatus = 'active' | 'upcoming' | 'complete'
type FilterTab = 'all' | ArchiveStatus

interface Archive {
  id: number
  name: string
  status: ArchiveStatus
  date: string
  desc: string
  img: string | null
  products: number
  keepers: number
  keeperLabel?: string
  votingOpen?: boolean
  owned?: number
}

const ARCHIVES: Archive[] = [
  {
    id: 1, name: 'Echoes of Stone', status: 'active', date: 'Mar 2026',
    desc: 'Earth, rock, and the geometry of ancient script.',
    img: 'photo-1469334031218-e382a71b716b', products: 24, keepers: 1204, owned: 10,
  },
  {
    id: 2, name: 'Sahara Drift', status: 'active', date: 'Jun 2026',
    desc: 'Woven from the silence between dunes.',
    img: 'photo-1523381210434-271e8be1f52b', products: 8, keepers: 87, owned: 3,
  },
  {
    id: 3, name: 'Coastal Indigo', status: 'active', date: 'Jul 2026',
    desc: 'The deep blue of Atlantic horizons.',
    img: 'photo-1516762689617-e1cffcef479d', products: 6, keepers: 64, owned: 2,
  },
  {
    id: 4, name: 'Stone & Thread', status: 'active', date: 'Aug 2026',
    desc: 'Raw textures, refined into permanence.',
    img: 'photo-1617196034183-421b4040ed20', products: 4, keepers: 48, owned: 1,
  },
  {
    id: 5, name: 'Mountain Memory', status: 'upcoming', date: 'Oct 2026',
    desc: 'High altitude, ancient paths, future stories.',
    img: 'photo-1521572163474-6864f9cf17ab', products: 0, keepers: 312,
    keeperLabel: 'pre-keepers', votingOpen: true,
  },
  {
    id: 6, name: 'Desert Sun', status: 'upcoming', date: 'Mar 2027',
    desc: 'Light through ancient stone.',
    img: null, products: 0, keepers: 0,
  },
  {
    id: 7, name: 'Atlas FW25', status: 'complete', date: 'Oct 2025',
    desc: 'Mountain heritage reinterpreted.',
    img: 'photo-1469334031218-e382a71b716b', products: 18, keepers: 892,
  },
  {
    id: 8, name: 'Roots SS25', status: 'complete', date: 'Mar 2025',
    desc: 'Back to origin.',
    img: 'photo-1523381210434-271e8be1f52b', products: 15, keepers: 634,
  },
]

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'complete', label: 'Complete' },
]

const statusBadge: Record<ArchiveStatus, { bg: string; color: string; label: string }> = {
  active: { bg: INDIGO, color: CREAM, label: 'Active' },
  upcoming: { bg: CLAY, color: CREAM, label: 'Upcoming' },
  complete: { bg: SURFACE, color: TEXT_SEC, label: 'Complete' },
}

interface Props { onNavigate: (p: WebPage) => void }

export default function Archives({ onNavigate: _onNavigate }: Props) {
  const [filter, setFilter] = useState<FilterTab>('all')

  const visible = filter === 'all' ? ARCHIVES : ARCHIVES.filter((a) => a.status === filter)

  return (
    <div style={{ background: BG, fontFamily: FONT_SANS }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{ background: INDIGO, padding: '64px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.15em', color: SAND, textTransform: 'uppercase', fontVariant: 'small-caps', marginBottom: 16 }}>
          Archives
        </div>
        <h1 style={{ fontFamily: FONT_SERIF, fontSize: 44, fontWeight: 400, color: CREAM, margin: '0 0 18px', lineHeight: 1.2 }}>
          The permanent record of IZLI
        </h1>
        <p style={{ fontSize: 15, color: SAND, margin: 0 }}>
          8 archives · 4 active · 3,241 keepers
        </p>
      </section>

      {/* ── Filter tabs ───────────────────────────────────────────────── */}
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              style={{
                padding: '14px 20px', border: 'none', background: 'transparent',
                color: filter === t.key ? INDIGO : TEXT_SEC,
                fontFamily: FONT_SANS, fontSize: 14, fontWeight: filter === t.key ? 700 : 400,
                cursor: 'pointer', whiteSpace: 'nowrap',
                borderBottom: filter === t.key ? `2px solid ${INDIGO}` : '2px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Archive grid ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', marginTop: 48, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {visible.map((a) => {
            const badge = statusBadge[a.status]
            return (
              <div key={a.id} style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
                {/* Cover */}
                <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden', background: BG }}>
                  {a.img ? (
                    <img
                      src={`https://images.unsplash.com/${a.img}?w=600&h=400&fit=crop&auto=format`}
                      alt={a.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', color: SAND, fontSize: 13 }}>
                      Coming Soon
                    </div>
                  )}
                  {/* Status badge */}
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: badge.bg, color: badge.color,
                    borderRadius: 999, padding: '4px 10px', fontSize: 11, fontWeight: 600,
                  }}>
                    {badge.label}
                  </div>
                  {/* Voting badge */}
                  {a.votingOpen && (
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      background: CLAY, color: CREAM,
                      borderRadius: 999, padding: '4px 10px', fontSize: 11, fontWeight: 600,
                    }}>
                      Voting Open
                    </div>
                  )}
                </div>
                {/* Body */}
                <div style={{ background: SURFACE, padding: 20 }}>
                  <div style={{ fontSize: 12, color: SAND, marginBottom: 6 }}>{a.date}</div>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO, marginBottom: 8 }}>
                    {a.name}
                  </div>
                  <div style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, marginBottom: 12,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {a.desc}
                  </div>
                  <div style={{ fontSize: 12, color: SAND, marginBottom: a.status === 'active' ? 10 : 0 }}>
                    {a.products} products · {a.keepers.toLocaleString()} {a.keeperLabel ?? 'keepers'}
                  </div>
                  {/* Progress bar for active archives */}
                  {a.status === 'active' && a.owned !== undefined && (
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ height: 4, borderRadius: 2, background: BG, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: 2, background: INDIGO,
                          width: `${Math.round((a.owned / a.products) * 100)}%`,
                        }} />
                      </div>
                      <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 4 }}>
                        {a.owned} / {a.products} owned by keepers
                      </div>
                    </div>
                  )}
                  <button
                    style={{
                      width: '100%', padding: 10, background: INDIGO, color: CREAM,
                      border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600,
                      cursor: 'pointer', fontFamily: FONT_SANS, marginTop: a.status === 'active' ? 0 : 14,
                    }}
                  >
                    Explore Archive
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
