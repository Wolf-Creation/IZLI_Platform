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

const MAX_PTS = 15000

const LEVELS = [
  {
    num: 1,
    name: 'Visitor',
    pts: 0,
    members: 12430,
    criteria: 'Browse the website. Discover the IZLI universe.',
    perks: ['Browse shop', 'Read stories', 'Follow collections'],
    badgeBg: SAND,
    badgeColor: '#fff',
  },
  {
    num: 2,
    name: 'Customer',
    pts: 100,
    members: 4892,
    criteria: 'Complete your first purchase.',
    perks: ['Purchase products', 'Track orders', 'Access account'],
    badgeBg: SURFACE_2,
    badgeColor: TEXT,
  },
  {
    num: 3,
    name: 'Keeper',
    pts: 500,
    members: 2104,
    criteria: 'Purchase a product from an active Archive.',
    perks: ['Keeper Circle access', 'Vote on archives', 'Exclusive stories', 'Referral code'],
    badgeBg: '#F0E8E0',
    badgeColor: CLAY,
  },
  {
    num: 4,
    name: 'Senior Keeper',
    pts: 2000,
    members: 847,
    criteria: 'Own products from 2+ Archives.',
    perks: ['Early access drops', 'Senior rewards', 'Priority support', 'Legacy badge'],
    badgeBg: '#E8EDF3',
    badgeColor: INDIGO,
  },
  {
    num: 5,
    name: 'Legacy Keeper',
    pts: 5000,
    members: 243,
    criteria: 'Own products from 3+ Archives and cast 10+ votes.',
    perks: ['Legacy Circle', 'Exclusive events', 'Custom referral tier', 'Co-creation invitations'],
    badgeBg: INDIGO,
    badgeColor: CREAM,
  },
  {
    num: 6,
    name: 'Guardian',
    pts: 15000,
    members: 47,
    criteria: 'Own products from 4+ Archives and refer 5+ Keepers.',
    perks: ['Guardian badge', 'Archive co-naming rights', 'Production consultations', 'Lifetime keeper status'],
    badgeBg: '#8C7A00',
    badgeColor: '#FFF8E1',
  },
]

// useState is used for edit state per level
export default function LegacyKeeperLevels({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [editingLevel, setEditingLevel] = useState<number | null>(null)

  // suppress unused warning
  void BG

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>
          Keeper Levels
        </h1>
        <p style={{ fontSize: 14, color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>
          Define and manage the progression system for the Keeper Circle
        </p>
      </div>

      {/* Level Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {LEVELS.map(level => {
          const pct = Math.min((level.pts / MAX_PTS) * 100, 100)
          const isEditing = editingLevel === level.num
          return (
            <div
              key={level.num}
              style={{
                background: SURFACE,
                border: `1px solid ${isEditing ? INDIGO : BORDER}`,
                borderRadius: 16,
                padding: 24,
                display: 'grid',
                gridTemplateColumns: '1fr 200px 1fr auto',
                gap: 32,
                alignItems: 'center',
              }}
            >
              {/* Left: badge + info */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: level.badgeBg,
                    color: level.badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {level.num}
                </div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 500, color: INDIGO }}>
                    {level.name}
                  </div>
                  <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 2 }}>
                    {level.members.toLocaleString()} members
                  </div>
                  <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 6, maxWidth: 260 }}>{level.criteria}</div>
                </div>
              </div>

              {/* Center: points progress */}
              <div>
                <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 8 }}>
                  {level.pts === 0 ? 'Starting level' : `${level.pts.toLocaleString()} pts threshold`}
                </div>
                <div style={{ height: 6, background: BORDER, borderRadius: 100, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${pct === 0 ? 3 : pct}%`,
                      background: level.pts === 0 ? SAND : level.pts >= 15000 ? '#8C7A00' : level.pts >= 5000 ? INDIGO : CLAY,
                      borderRadius: 100,
                    }}
                  />
                </div>
                <div style={{ fontSize: 10, color: TEXT_SEC, marginTop: 4 }}>of {MAX_PTS.toLocaleString()} max pts</div>
              </div>

              {/* Right: perks */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 8 }}>
                  Perks
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {level.perks.map(perk => (
                    <li key={perk} style={{ fontSize: 12, color: TEXT, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: CLAY, fontSize: 10 }}>◈</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Edit button */}
              <button
                onClick={() => setEditingLevel(isEditing ? null : level.num)}
                style={{
                  padding: '7px 16px',
                  border: `1px solid ${isEditing ? INDIGO : BORDER}`,
                  borderRadius: 10,
                  background: isEditing ? INDIGO : 'transparent',
                  color: isEditing ? '#fff' : TEXT_SEC,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {isEditing ? 'Done' : 'Edit'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
