import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const SURFACE_2 = '#EFE8DD'
const CREAM = '#E7DFD2'

interface Achievement {
  glyph: string
  name: string
  id: string
  points: number
  criteria: string
  earnedBy: string
  badge: string
}

const achievements: Achievement[] = [
  { glyph: '◈', name: 'First Purchase', id: 'ACH-001', points: 100, criteria: 'Purchase first product', earnedBy: '8,241', badge: 'First Keeper Badge' },
  { glyph: '⬡', name: 'Archive Collector', id: 'ACH-002', points: 500, criteria: 'Own products from 2+ archives', earnedBy: '1,892', badge: 'Archive Badge' },
  { glyph: '◎', name: 'Community Voice', id: 'ACH-003', points: 250, criteria: 'Cast 5 votes', earnedBy: '634', badge: 'Voter Badge' },
  { glyph: '▦', name: 'Referral Pioneer', id: 'ACH-004', points: 300, criteria: 'Refer 1 new keeper', earnedBy: '412', badge: 'Pioneer Badge' },
  { glyph: '◉', name: 'Legacy Holder', id: 'ACH-005', points: 1000, criteria: 'Own products from 3+ archives', earnedBy: '243', badge: 'Legacy Badge' },
  { glyph: '△', name: 'Guardian of Stone', id: 'ACH-006', points: 2500, criteria: 'Reach Guardian level', earnedBy: '47', badge: 'Guardian Badge' },
  { glyph: '◫', name: 'Story Keeper', id: 'ACH-007', points: 150, criteria: 'Read 10 stories', earnedBy: '2,104', badge: 'Reader Badge' },
  { glyph: '✦', name: 'Complete Echoes', id: 'ACH-008', points: 750, criteria: 'Own all Echoes of Stone products', earnedBy: '89', badge: 'Completionist' },
]

const colTemplate = '44px 2fr 120px 140px 80px 80px 90px'

export default function LegacyAchievements({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [_placeholder] = useState(0)

  const headerCells = ['', 'Achievement', 'Points', 'Criteria', 'Earned By', 'Badge', 'Actions']

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT, background: BG, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>Achievements</h1>
          <p style={{ color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>16 achievements · earned by keepers across all levels</p>
        </div>
        <button style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
          + New Achievement
        </button>
      </div>

      {/* Table card */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: colTemplate, padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
          {headerCells.map((h, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {achievements.map((a, idx) => (
          <div key={a.id} style={{ display: 'grid', gridTemplateColumns: colTemplate, padding: '14px 20px', borderBottom: idx < achievements.length - 1 ? `1px solid ${BORDER}` : 'none', alignItems: 'center' }}>
            {/* Icon */}
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: SURFACE_2, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: INDIGO }}>
              {a.glyph}
            </div>

            {/* Achievement name + ID */}
            <div>
              <div style={{ fontWeight: 500, fontSize: 13, color: TEXT }}>{a.name}</div>
              <div style={{ fontSize: 11, color: TEXT_SEC, fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>{a.id}</div>
            </div>

            {/* Points */}
            <div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: INDIGO, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '3px 10px' }}>
                {a.points.toLocaleString()} pts
              </span>
            </div>

            {/* Criteria */}
            <div style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.4 }}>{a.criteria}</div>

            {/* Earned by */}
            <div style={{ fontWeight: 500, color: INDIGO, fontSize: 13 }}>{a.earnedBy}</div>

            {/* Badge */}
            <div style={{ fontSize: 11, color: CLAY }}>{a.badge}</div>

            {/* Edit */}
            <div>
              <button style={{ background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 6, padding: '5px 12px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
