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

const ASSET_TYPES = [
  { label: 'Hero Images', count: 284 },
  { label: 'Packshots', count: 241 },
  { label: 'Product Cards', count: 198 },
  { label: 'QR Codes', count: 284 },
  { label: 'Print Sheets', count: 84 },
  { label: 'Social Media', count: 124 },
  { label: 'Email Banners', count: 69 },
  { label: 'Archive Covers', count: 48 },
]

const MAX_ASSET = Math.max(...ASSET_TYPES.map(a => a.count))

const TEMPLATES = [
  { name: 'Heritage Tee Hero', assets: 284, batches: 12, avgTime: '1.8 min' },
  { name: 'Passport Print Sheet', assets: 214, batches: 9, avgTime: '3.2 min' },
  { name: 'Archive Cover Master', assets: 108, batches: 4, avgTime: '4.1 min' },
  { name: 'Social Story Card', assets: 124, batches: 14, avgTime: '0.9 min' },
  { name: 'Email Collection Banner', assets: 69, batches: 8, avgTime: '1.4 min' },
]

// suppress unused vars
void CLAY
void SAND
void BG
void CREAM

export default function ProductionAnalytics({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [period, setPeriod] = useState('30 days')

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>
            Production Analytics
          </h1>
          <p style={{ fontSize: 14, color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>
            Asset generation, batch jobs, and export performance
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Assets Generated', value: '1,284' },
          { label: 'Batch Jobs Run', value: '48' },
          { label: 'Exports Completed', value: '214' },
          { label: 'Avg Generation Time', value: '2.4 min' },
          { label: 'Storage Used', value: '84 GB' },
          { label: 'Templates Active', value: '14' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: INDIGO }}>{kpi.value}</div>
            <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Asset Type Breakdown */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 20 }}>Assets by Type</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ASSET_TYPES.map(at => {
            const pct = (at.count / MAX_ASSET) * 100
            return (
              <div key={at.label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 48px', gap: 12, alignItems: 'center' }}>
                <div style={{ fontSize: 12, color: TEXT_SEC }}>{at.label}</div>
                <div style={{ height: 8, background: BG, borderRadius: 100, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: INDIGO, borderRadius: 100 }} />
                </div>
                <div style={{ fontSize: 12, color: TEXT, textAlign: 'right' as const }}>{at.count}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Templates */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 16 }}>Top Templates</div>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 100px 80px 80px',
            padding: '10px 0',
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          {['Template', 'Assets', 'Batches', 'Avg Time'].map(col => (
            <div key={col} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
              {col}
            </div>
          ))}
        </div>
        {TEMPLATES.map((t, i) => (
          <div
            key={t.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 100px 80px 80px',
              padding: '12px 0',
              borderBottom: i < TEMPLATES.length - 1 ? `1px solid ${BORDER}` : 'none',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{t.name}</div>
            <div style={{ fontSize: 13, color: TEXT }}>{t.assets}</div>
            <div style={{ fontSize: 13, color: TEXT }}>{t.batches}</div>
            <div style={{ fontSize: 13, color: TEXT_SEC }}>{t.avgTime}</div>
          </div>
        ))}
      </div>

      {/* suppress unused */}
      <span style={{ display: 'none' }}>{SURFACE_2}{CREAM}</span>
    </div>
  )
}
