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

const PERIODS = ['7 days', '30 days', '90 days']

const HUBS = [
  { name: 'Complete Your Style', impressions: 84241, clicks: 14820, ctr: 17.6, conversions: 2841 },
  { name: 'Echoes of Stone — Product', impressions: 42120, clicks: 8420, ctr: 20.0, conversions: 1892 },
  { name: 'Heritage Essentials', impressions: 28400, clicks: 3840, ctr: 13.5, conversions: 641 },
  { name: 'New Arrivals', impressions: 24100, clicks: 2810, ctr: 11.7, conversions: 412 },
  { name: 'Archive Collection', impressions: 18920, clicks: 1940, ctr: 10.3, conversions: 284 },
  { name: 'Studio Selection', impressions: 12140, clicks: 1010, ctr: 8.3, conversions: 184 },
]

const MAX_CTR = 20.0
const MAX_CONV = 2841

// suppress unused vars
void CLAY
void SAND
void CREAM

export default function RecommendationAnalytics({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [period, setPeriod] = useState('30 days')

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>
            Recommendation Analytics
          </h1>
          <p style={{ fontSize: 14, color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>
            Hub performance, impression data, and conversion tracking
          </p>
        </div>
        {/* Period Selector */}
        <div style={{ display: 'flex', gap: 6 }}>
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '7px 16px',
                borderRadius: 100,
                border: `1px solid ${period === p ? INDIGO : BORDER}`,
                background: period === p ? INDIGO : SURFACE,
                color: period === p ? '#fff' : TEXT_SEC,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Impressions', value: '284,921' },
          { label: 'Total Clicks', value: '42,840' },
          { label: 'Click-Through Rate', value: '15.0%' },
          { label: 'Conversions', value: '8,420' },
          { label: 'Revenue Attributed', value: '€124,800' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: INDIGO }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 4 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Hub Performance Table */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 120px 100px 80px 120px 80px',
            padding: '12px 20px',
            borderBottom: `1px solid ${BORDER}`,
            background: SURFACE_2,
          }}
        >
          {['Hub', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Status'].map(col => (
            <div key={col} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {HUBS.map((hub, i) => {
          const ctrPct = (hub.ctr / MAX_CTR) * 100
          const convPct = (hub.conversions / MAX_CONV) * 100
          return (
            <div
              key={hub.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 120px 100px 80px 120px 80px',
                padding: '14px 20px',
                borderBottom: i < HUBS.length - 1 ? `1px solid ${BORDER}` : 'none',
                alignItems: 'center',
              }}
            >
              {/* Hub name */}
              <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, paddingRight: 12 }}>{hub.name}</div>

              {/* Impressions */}
              <div style={{ fontSize: 13, color: TEXT }}>{hub.impressions.toLocaleString()}</div>

              {/* Clicks */}
              <div style={{ fontSize: 13, color: TEXT }}>{hub.clicks.toLocaleString()}</div>

              {/* CTR + mini bar */}
              <div>
                <div style={{ fontSize: 13, color: TEXT }}>{hub.ctr}%</div>
                <div style={{ height: 4, background: BG, borderRadius: 100, marginTop: 4, overflow: 'hidden', width: 60 }}>
                  <div style={{ height: '100%', width: `${ctrPct}%`, background: INDIGO, borderRadius: 100 }} />
                </div>
              </div>

              {/* Conversions + mini bar */}
              <div>
                <div style={{ fontSize: 13, color: TEXT }}>{hub.conversions.toLocaleString()}</div>
                <div style={{ height: 4, background: BG, borderRadius: 100, marginTop: 4, overflow: 'hidden', width: 80 }}>
                  <div style={{ height: '100%', width: `${convPct}%`, background: INDIGO, borderRadius: 100 }} />
                </div>
              </div>

              {/* Status */}
              <div>
                <span style={{ display: 'inline-block', background: '#E6EDE8', color: '#4A7A5A', fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 100 }}>
                  Active
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
