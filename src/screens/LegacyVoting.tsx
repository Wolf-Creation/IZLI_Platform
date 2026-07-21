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

interface VotingOption {
  label: string
  pct: number
}

interface Session {
  id: number
  title: string
  status: 'OPEN' | 'COUNTING' | 'CLOSED'
  statusNote: string
  options: VotingOption[]
  eligible: string
  votes: string
  winner?: string
  actions: string[]
}

const sessions: Session[] = [
  {
    id: 1,
    title: 'Mountain Memory — Archive Vote',
    status: 'OPEN',
    statusNote: 'Closes in 12 days',
    options: [
      { label: 'Mountain Pass', pct: 48 },
      { label: 'Atlas Plateau', pct: 31 },
      { label: 'River Valley', pct: 21 },
    ],
    eligible: 'Keeper+',
    votes: '1,204 votes cast',
    actions: ['View Results', 'Close Session'],
  },
  {
    id: 2,
    title: 'Next Graphic Direction',
    status: 'OPEN',
    statusNote: 'Closes in 8 days',
    options: [
      { label: 'Tifinagh Script', pct: 62 },
      { label: 'Abstract Desert', pct: 38 },
    ],
    eligible: 'Senior Keeper+',
    votes: '892 votes cast',
    actions: ['View Results'],
  },
  {
    id: 3,
    title: 'Upcoming Community Story',
    status: 'COUNTING',
    statusNote: 'Ended 2 days ago',
    options: [
      { label: 'Mountain Journey', pct: 41 },
      { label: 'Desert Migration', pct: 59 },
    ],
    eligible: 'All Keepers',
    votes: '2,104 votes cast',
    actions: ['Publish Results'],
  },
  {
    id: 4,
    title: 'FW26 Color Direction',
    status: 'CLOSED',
    statusNote: 'Ended 15 days ago',
    options: [],
    winner: 'Sage & Stone (72%)',
    eligible: 'Legacy Keeper+',
    votes: '847 votes cast',
    actions: ['View Archive'],
  },
]

const statusStyle = (status: Session['status']): React.CSSProperties => {
  if (status === 'OPEN') return { background: '#E6EDE8', color: '#4A7A5A' }
  if (status === 'COUNTING') return { background: '#FEF3E2', color: '#A0622A' }
  return { background: SURFACE_2, color: TEXT_SEC }
}

export default function LegacyVoting({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [_placeholder] = useState(0)

  const kpis = [
    { label: 'Active Sessions', value: '3' },
    { label: 'Total Votes Cast', value: '14,892' },
    { label: 'Avg Participation', value: '67%' },
  ]

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT, background: BG, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>Voting</h1>
          <p style={{ color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>Active voting sessions across the IZLI Legacy ecosystem</p>
        </div>
        <button style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
          + New Voting Session
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: INDIGO }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Sessions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {sessions.map(s => (
          <div key={s.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20, position: 'relative' }}>
            {/* Status badge */}
            <div style={{ position: 'absolute', top: 16, right: 16, ...statusStyle(s.status), borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em' }}>
              {s.status}
            </div>

            {/* Title */}
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 500, color: INDIGO, margin: '0 0 4px', paddingRight: 80 }}>{s.title}</h3>
            <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 12 }}>{s.statusNote}</div>

            {/* Eligible badge */}
            <div style={{ display: 'inline-block', background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '2px 10px', fontSize: 11, color: CLAY, marginBottom: 14 }}>
              {s.eligible}
            </div>

            {/* Options / Winner */}
            {s.status === 'CLOSED' && s.winner ? (
              <div style={{ background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🏆</span>
                <div>
                  <div style={{ fontSize: 11, color: TEXT_SEC }}>Winner</div>
                  <div style={{ fontWeight: 600, color: INDIGO, fontSize: 13 }}>{s.winner}</div>
                </div>
              </div>
            ) : s.status === 'COUNTING' ? (
              <div style={{ marginBottom: 16 }}>
                {s.options.map(opt => (
                  <div key={opt.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: TEXT_SEC }}>{opt.label}</span>
                      <span style={{ fontSize: 12, color: TEXT_SEC }}>Tallying…</span>
                    </div>
                    <div style={{ background: BG, height: 8, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ background: SAND, width: `${opt.pct}%`, height: '100%', borderRadius: 4, opacity: 0.5 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginBottom: 16 }}>
                {s.options.map(opt => (
                  <div key={opt.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: TEXT }}>{opt.label}</span>
                      <span style={{ fontSize: 12, color: INDIGO, fontWeight: 500 }}>{opt.pct}%</span>
                    </div>
                    <div style={{ background: BG, height: 8, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ background: INDIGO, width: `${opt.pct}%`, height: '100%', borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vote count + actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: TEXT_SEC }}>{s.votes}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {s.actions.map(a => (
                  <button key={a} style={{ background: a === 'Close Session' ? BG : INDIGO, color: a === 'Close Session' ? TEXT : CREAM, border: `1px solid ${a === 'Close Session' ? BORDER : INDIGO}`, borderRadius: 6, padding: '6px 12px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
