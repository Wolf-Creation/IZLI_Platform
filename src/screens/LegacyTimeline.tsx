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

interface TimelineEntry {
  id: string
  name: string
  date: string
  status: 'complete' | 'active' | 'upcoming'
  keepers: string
  products: number
  description: string
  voting: string
}

const ENTRIES: TimelineEntry[] = [
  { id: 'ARC-003', name: 'Roots SS25', date: 'Mar 2025', status: 'complete', keepers: '634 keepers', products: 15, description: 'The founding archive. Organic forms and natural dyes rooted in North African craft traditions.', voting: 'Closed' },
  { id: 'ARC-002', name: 'Atlas FW25', date: 'Oct 2025', status: 'complete', keepers: '892 keepers', products: 18, description: 'Mountain-inspired silhouettes. Heavy weaves and geometric motifs drawn from High Atlas villages.', voting: 'Closed' },
  { id: 'ARC-001', name: 'Echoes of Stone', date: 'Mar 2026', status: 'active', keepers: '1,204 keepers', products: 24, description: 'Current flagship archive. Exploring ancient stonework patterns translated into contemporary garments.', voting: 'Closed' },
  { id: 'ARC-006', name: 'Sahara Drift', date: 'Jun 2026', status: 'active', keepers: '87 keepers', products: 8, description: 'Desert wind and sand — flowing forms, sun-bleached palettes, and nomadic silhouettes.', voting: 'Counting' },
  { id: 'ARC-007', name: 'Coastal Indigo', date: 'Jul 2026', status: 'active', keepers: '64 keepers', products: 6, description: 'Mediterranean coastline meets Maghrebi craft. Indigo-dyed linens and sea-worn textures.', voting: 'Open' },
  { id: 'ARC-008', name: 'Stone & Thread', date: 'Aug 2026', status: 'active', keepers: '48 keepers', products: 4, description: 'Hand-loomed textiles and carved stone patterns. A study in permanence and handcraft.', voting: 'Open' },
  { id: 'ARC-004', name: 'Mountain Memory', date: 'Oct 2026', status: 'upcoming', keepers: '312 pre-keepers', products: 0, description: 'A return to the High Atlas. New collaborations with Amazigh weavers and artisan collectives.', voting: 'Open' },
  { id: 'ARC-005', name: 'Desert Sun', date: 'Mar 2027', status: 'upcoming', keepers: '0', products: 0, description: 'Coming soon. The golden hour archive — warm tones, vast horizons, timeless forms.', voting: 'Not Started' },
]

const STATUS_DOT: Record<TimelineEntry['status'], string> = {
  active:   INDIGO,
  upcoming: SAND,
  complete: TEXT_SEC,
}

const STATUS_BADGE: Record<TimelineEntry['status'], { bg: string; color: string; label: string }> = {
  active:   { bg: '#E6EDE8', color: '#4A7A5A', label: 'Active' },
  upcoming: { bg: SURFACE_2, color: CLAY, label: 'Upcoming' },
  complete: { bg: BG, color: TEXT_SEC, label: 'Complete' },
}

const VOTING_BADGE: Record<string, { bg: string; color: string }> = {
  'Open':       { bg: '#E6EDE8', color: '#4A7A5A' },
  'Closed':     { bg: SURFACE_2, color: TEXT_SEC },
  'Counting':   { bg: '#FFF4E5', color: '#8C6B00' },
  'Not Started':{ bg: BG, color: SAND },
}

const badge = (bg: string, color: string, label: string) => (
  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: bg, color }}>{label}</span>
)

const totalKeepers = 3241
const totalKeepersByArchive = [634, 892, 1204, 87, 64, 48, 312, 0]
const maxKeepers = Math.max(...totalKeepersByArchive)

export default function LegacyTimeline({ onNavigate: _ }: Props) {
  const [_tab, setTab] = useState('timeline')
  void setTab

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>Legacy Timeline</h1>
          <p style={{ margin: '6px 0 0', color: TEXT_SEC, fontSize: 13 }}>The complete history and future of the IZLI Archive system</p>
        </div>
        <button style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Add Archive</button>
      </div>

      {/* Timeline Card */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '32px 40px', marginBottom: 24, position: 'relative' }}>
        {ENTRIES.map((entry, i) => {
          const isLeft = i % 2 === 0
          const sb = STATUS_BADGE[entry.status]
          const vb = VOTING_BADGE[entry.voting] ?? { bg: BG, color: SAND }

          return (
            <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr', gap: 0, marginBottom: i < ENTRIES.length - 1 ? 0 : 0, alignItems: 'stretch' }}>
              {/* Left content */}
              <div style={{ padding: '24px 32px 24px 0', textAlign: 'right', visibility: isLeft ? 'visible' : 'hidden' }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 16, fontWeight: 500, color: INDIGO, marginBottom: 4 }}>{entry.name}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: SAND, marginBottom: 8 }}>{entry.id} · {entry.date}</div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginBottom: 8 }}>
                  {badge(sb.bg, sb.color, sb.label)}
                </div>
                <div style={{ fontSize: 12, color: TEXT_SEC }}>{entry.keepers} · {entry.products} products</div>
              </div>

              {/* Center line + dot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {/* Top segment */}
                <div style={{ width: 2, flex: 1, background: BORDER, minHeight: 20 }} />
                {/* Dot */}
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: STATUS_DOT[entry.status], border: `3px solid ${SURFACE}`, boxShadow: `0 0 0 2px ${STATUS_DOT[entry.status]}`, flexShrink: 0, zIndex: 1 }} />
                {/* Bottom segment */}
                {i < ENTRIES.length - 1 && <div style={{ width: 2, flex: 1, background: BORDER, minHeight: 20 }} />}
              </div>

              {/* Right content */}
              <div style={{ padding: '24px 0 24px 32px', visibility: isLeft ? 'hidden' : 'visible' }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 16, fontWeight: 500, color: INDIGO, marginBottom: 4 }}>{entry.name}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: SAND, marginBottom: 8 }}>{entry.id} · {entry.date}</div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  {badge(sb.bg, sb.color, sb.label)}
                  {badge(vb.bg, vb.color, entry.voting)}
                </div>
                <div style={{ fontSize: 12, color: TEXT_SEC }}>{entry.keepers} · {entry.products} products</div>
              </div>
            </div>
          )
        })}

        {/* Descriptions row — shown below as a detail section for alternating sides */}
        <div style={{ marginTop: 8, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Archive Descriptions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {ENTRIES.map(entry => (
              <div key={entry.id + '-desc'} style={{ background: BG, borderRadius: 10, padding: '12px 16px', border: `1px solid ${BORDER}` }}>
                <div style={{ fontWeight: 500, color: TEXT, marginBottom: 4, fontSize: 13 }}>{entry.name}</div>
                <div style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.5 }}>{entry.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legacy Progress */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 18, fontWeight: 500, color: INDIGO }}>Legacy Progress</div>
            <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 4 }}>Total keeper growth across all archives</div>
          </div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 500, color: INDIGO }}>{totalKeepers.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 400, color: TEXT_SEC }}>total keepers</span></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ENTRIES.map((entry, i) => {
            const count = totalKeepersByArchive[i]
            const pct = maxKeepers > 0 ? (count / maxKeepers) * 100 : 0
            const sb = STATUS_BADGE[entry.status]
            return (
              <div key={entry.id + '-bar'} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 80px 80px', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 12, color: TEXT, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.name}</div>
                <div style={{ background: CREAM, borderRadius: 999, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: STATUS_DOT[entry.status], borderRadius: 999, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ fontSize: 12, color: TEXT_SEC, textAlign: 'right' }}>{count > 0 ? count.toLocaleString() : '—'}</div>
                <div style={{ textAlign: 'right' }}>{badge(sb.bg, sb.color, sb.label)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
