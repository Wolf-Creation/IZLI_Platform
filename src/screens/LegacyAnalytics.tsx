import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const CREAM = '#E7DFD2'

type Period = 'Last 7 days' | '30 days' | '90 days' | 'All time'

const archives = [
  { name: 'Echoes of Stone', keepers: 1204 },
  { name: 'Mountain Memory', keepers: 987 },
  { name: 'Desert Migration', keepers: 843 },
  { name: 'Atlas Plateau', keepers: 721 },
  { name: 'River Valley', keepers: 612 },
  { name: 'Tifinagh Script', keepers: 534 },
  { name: 'FW26 Color', keepers: 412 },
  { name: 'Sage & Stone', keepers: 298 },
]

const funnelLevels = [
  { label: 'Visitor', count: '12,430', widthPct: 100, colorStart: '#1E2F44', colorEnd: '#2E4A6A' },
  { label: 'Customer', count: '4,892', widthPct: 80, colorStart: '#2E4A6A', colorEnd: '#3D6080' },
  { label: 'Keeper', count: '2,104', widthPct: 55, colorStart: '#3D6080', colorEnd: '#506681' },
  { label: 'Senior Keeper', count: '847', widthPct: 30, colorStart: '#506681', colorEnd: '#7A9BB5' },
  { label: 'Legacy Keeper', count: '243', widthPct: 15, colorStart: '#7A9BB5', colorEnd: '#B7AA91' },
  { label: 'Guardian', count: '47', widthPct: 8, colorStart: '#B7AA91', colorEnd: '#C9A227' },
]

const monthlyData = [
  { month: 'Jun 25', value: 48 },
  { month: 'Jul 25', value: 55 },
  { month: 'Aug 25', value: 62 },
  { month: 'Sep 25', value: 58 },
  { month: 'Oct 25', value: 71 },
  { month: 'Nov 25', value: 85 },
  { month: 'Dec 25', value: 92 },
  { month: 'Jan 26', value: 78 },
  { month: 'Feb 26', value: 84 },
  { month: 'Mar 26', value: 96 },
  { month: 'Apr 26', value: 88 },
  { month: 'May 26', value: 100 },
]

const maxArchive = Math.max(...archives.map(a => a.keepers))
const maxBar = Math.max(...monthlyData.map(d => d.value))

export default function LegacyAnalytics({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [period, setPeriod] = useState<Period>('30 days')

  const periods: Period[] = ['Last 7 days', '30 days', '90 days', 'All time']

  const kpis = [
    { label: 'Active Keepers', value: '3,241' },
    { label: 'Archive Growth', value: '+18%', note: 'this month' },
    { label: 'Products per Archive', value: '14.2', note: 'avg' },
    { label: 'Referral Performance', value: '42%', note: 'conversion' },
    { label: 'Total Votes', value: '14,892' },
    { label: 'Keeper Retention', value: '89%' },
  ]

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT, background: BG, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>Legacy Analytics</h1>
          <p style={{ color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>Performance across the complete IZLI Legacy ecosystem</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Period selector */}
          <div style={{ display: 'flex', gap: 4, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 4 }}>
            {periods.map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{ background: period === p ? INDIGO : 'transparent', color: period === p ? CREAM : TEXT_SEC, border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}>
                {p}
              </button>
            ))}
          </div>
          <button style={{ background: 'transparent', color: INDIGO, border: `1.5px solid ${INDIGO}`, borderRadius: 8, padding: '9px 18px', fontSize: 13, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
            Export Report
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: INDIGO }}>{k.value}</div>
            {k.note && <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 4 }}>{k.note}</div>}
          </div>
        ))}
      </div>

      {/* Bottom two cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Archive Performance */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: INDIGO, marginBottom: 20 }}>Archive Performance</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {archives.map(a => (
              <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 130, fontSize: 12, color: TEXT, flexShrink: 0 }}>{a.name}</div>
                <div style={{ flex: 1, background: BG, height: 10, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ background: INDIGO, width: `${(a.keepers / maxArchive) * 100}%`, height: '100%', borderRadius: 4 }} />
                </div>
                <div style={{ width: 40, fontSize: 12, color: TEXT_SEC, textAlign: 'right', flexShrink: 0 }}>{a.keepers.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Keeper Level Funnel */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: INDIGO, marginBottom: 20 }}>Keeper Level Funnel</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            {funnelLevels.map(level => (
              <div key={level.label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 100, fontSize: 11, color: TEXT_SEC, textAlign: 'right', flexShrink: 0 }}>{level.label}</div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: `${level.widthPct}%`, height: 28, borderRadius: 4, background: `linear-gradient(90deg, ${level.colorStart}, ${level.colorEnd})`, transition: 'width 0.3s' }} />
                </div>
                <div style={{ width: 50, fontSize: 12, color: TEXT_SEC, flexShrink: 0 }}>{level.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Growth */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: INDIGO, marginBottom: 24 }}>Monthly Keeper Growth</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120 }}>
          {monthlyData.map(d => (
            <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', background: INDIGO, borderRadius: '3px 3px 0 0', height: `${(d.value / maxBar) * 100}px`, minHeight: 4 }} />
              <div style={{ fontSize: 10, color: TEXT_SEC, whiteSpace: 'nowrap' }}>{d.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
