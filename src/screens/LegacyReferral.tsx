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

interface Referrer {
  rank: number
  initials: string
  name: string
  code: string
  referrals: number
  converted: number
  revenue: string
}

const referrers: Referrer[] = [
  { rank: 1, initials: 'KL', name: 'Karim Lounis', code: 'IZLI-KAR-X91', referrals: 11, converted: 9, revenue: '€2,840' },
  { rank: 2, initials: 'RM', name: 'Riad Mansouri', code: 'IZLI-RIA-F55', referrals: 5, converted: 4, revenue: '€1,240' },
  { rank: 3, initials: 'YB', name: 'Youcef Benali', code: 'IZLI-YOU-B42', referrals: 6, converted: 4, revenue: '€980' },
  { rank: 4, initials: 'MA', name: 'Mehdi Aït Mansour', code: 'IZLI-MEH-D13', referrals: 4, converted: 3, revenue: '€720' },
  { rank: 5, initials: 'FO', name: 'Farida Oussama', code: 'IZLI-FAR-C77', referrals: 3, converted: 2, revenue: '€480' },
  { rank: 6, initials: 'IC', name: 'Ines Chaoui', code: 'IZLI-INE-G88', referrals: 1, converted: 1, revenue: '€240' },
  { rank: 7, initials: 'AB', name: 'Amira Bekkar', code: 'IZLI-AMI-K22', referrals: 1, converted: 1, revenue: '€240' },
  { rank: 8, initials: 'SB', name: 'Sonia Bendriss', code: 'IZLI-SON-P04', referrals: 0, converted: 0, revenue: '€0' },
]

const colTemplate = '36px 48px 2fr 120px 100px 100px 100px 80px'

export default function LegacyReferral({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [_placeholder] = useState(0)

  const kpis = [
    { label: 'Total Referrers', value: '412' },
    { label: 'Total Referred', value: '1,892' },
    { label: 'Converted to Keeper', value: '892' },
    { label: 'Referral Revenue', value: '€28,400' },
  ]

  const headerCells = ['', '', 'Keeper', 'Referral Code', 'Referrals', 'Converted', 'Revenue', 'Actions']

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT, background: BG, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>Referral Program</h1>
          <p style={{ color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>Personal referral links driving Legacy growth</p>
        </div>
        <button style={{ background: 'transparent', color: INDIGO, border: `1.5px solid ${INDIGO}`, borderRadius: 8, padding: '9px 18px', fontSize: 13, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
          Program Settings
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: INDIGO }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        {/* Table title */}
        <div style={{ padding: '18px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: INDIGO }}>Top Referrers</div>
          <div style={{ fontSize: 12, color: TEXT_SEC }}>Last 30 days</div>
        </div>

        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: colTemplate, padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
          {headerCells.map((h, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {referrers.map((r, idx) => (
          <div key={r.rank} style={{ display: 'grid', gridTemplateColumns: colTemplate, padding: '13px 20px', borderBottom: idx < referrers.length - 1 ? `1px solid ${BORDER}` : 'none', alignItems: 'center', borderLeft: r.rank === 1 ? '3px solid #C9A227' : '3px solid transparent' }}>
            {/* Rank */}
            <div style={{ fontSize: 12, fontWeight: 600, color: r.rank === 1 ? '#C9A227' : TEXT_SEC }}>#{r.rank}</div>

            {/* Avatar */}
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: INDIGO, color: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
              {r.initials}
            </div>

            {/* Name */}
            <div style={{ fontWeight: 500, color: TEXT }}>{r.name}</div>

            {/* Code */}
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: CLAY }}>{r.code}</div>

            {/* Referrals */}
            <div style={{ fontSize: 13, color: TEXT }}>{r.referrals} {r.referrals === 1 ? 'referral' : 'referrals'}</div>

            {/* Converted */}
            <div style={{ fontSize: 13, color: TEXT }}>{r.converted} converted</div>

            {/* Revenue */}
            <div style={{ fontSize: 13, fontWeight: 500, color: INDIGO }}>{r.revenue}</div>

            {/* Action */}
            <div>
              <button style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
