import { useState } from 'react'
import type { WebPage } from '../../types'
import './Archives.scss'

const INDIGO = '#1E2F44'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAND = '#B7AA91'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const CREAM = '#E7DFD2'
const FONT_SERIF = 'Canela, Georgia, serif'
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
  { id: 1, name: 'Echoes of Stone', status: 'active', date: 'Mar 2026', desc: 'Earth, rock, and the geometry of ancient script.', img: 'photo-1469334031218-e382a71b716b', products: 24, keepers: 1204, owned: 10 },
  { id: 2, name: 'Sahara Drift', status: 'active', date: 'Jun 2026', desc: 'Woven from the silence between dunes.', img: 'photo-1523381210434-271e8be1f52b', products: 8, keepers: 87, owned: 3 },
  { id: 3, name: 'Coastal Indigo', status: 'active', date: 'Jul 2026', desc: 'The deep blue of Atlantic horizons.', img: 'photo-1516762689617-e1cffcef479d', products: 6, keepers: 64, owned: 2 },
  { id: 4, name: 'Stone & Thread', status: 'active', date: 'Aug 2026', desc: 'Raw textures, refined into permanence.', img: 'photo-1617196034183-421b4040ed20', products: 4, keepers: 48, owned: 1 },
  { id: 5, name: 'Mountain Memory', status: 'upcoming', date: 'Oct 2026', desc: 'High altitude, ancient paths, future stories.', img: 'photo-1521572163474-6864f9cf17ab', products: 0, keepers: 312, keeperLabel: 'pre-keepers', votingOpen: true },
  { id: 6, name: 'Desert Sun', status: 'upcoming', date: 'Mar 2027', desc: 'Light through ancient stone.', img: null, products: 0, keepers: 0 },
  { id: 7, name: 'Atlas FW25', status: 'complete', date: 'Oct 2025', desc: 'Mountain heritage reinterpreted.', img: 'photo-1469334031218-e382a71b716b', products: 18, keepers: 892 },
  { id: 8, name: 'Roots SS25', status: 'complete', date: 'Mar 2025', desc: 'Back to origin.', img: 'photo-1523381210434-271e8be1f52b', products: 15, keepers: 634 },
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
    <div className="archives-page" style={{ background: BG, fontFamily: FONT_SANS }}>
      <section className="archives-hero">
        <div className="archives-hero__inner">
          <div className="archives-hero__kicker">Archives</div>
          <h1 className="archives-hero__title">The permanent record of IZLI</h1>
          <p className="archives-hero__sub">8 archives · 4 active · 3,241 keepers</p>
        </div>
      </section>

      <div className="archives-filters">
        <div className="archives-filters__inner">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setFilter(t.key)} className={`archives-filter ${filter === t.key ? 'is-active' : ''}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <section className="archives-grid">
        <div className="archives-grid__inner">
          {visible.map((a) => {
            const badge = statusBadge[a.status]
            return (
              <article key={a.id} className="archives-card">
                <div className="archives-card__cover">
                  {a.img ? (
                    <img src={`https://images.unsplash.com/${a.img}?w=600&h=400&fit=crop&auto=format`} alt={a.name} />
                  ) : (
                    <div className="archives-card__empty">Coming Soon</div>
                  )}
                  <div className="archives-badge" style={{ background: badge.bg, color: badge.color }}>{badge.label}</div>
                  {a.votingOpen && <div className="archives-vote" style={{ background: CLAY, color: CREAM }}>Voting Open</div>}
                </div>
                <div className="archives-card__body">
                  <div className="archives-card__date">{a.date}</div>
                  <div className="archives-card__title">{a.name}</div>
                  <div className="archives-card__desc">{a.desc}</div>
                  <div className="archives-card__meta">{a.products} products · {a.keepers.toLocaleString()} {a.keeperLabel ?? 'keepers'}</div>
                  {a.status === 'active' && a.owned !== undefined && (
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ height: 4, borderRadius: 2, background: BG, overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 2, background: INDIGO, width: `${Math.round((a.owned / a.products) * 100)}%` }} />
                      </div>
                      <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 4 }}>{a.owned} / {a.products} owned by keepers</div>
                    </div>
                  )}
                  <button className="archives-card__button">Explore Archive</button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}