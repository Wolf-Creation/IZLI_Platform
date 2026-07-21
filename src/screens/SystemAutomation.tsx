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

const TABS = ['Workflows', 'Triggers', 'Generators', 'Notifications', 'Scheduled Jobs']

const WORKFLOWS = [
  { name: 'Product Published Flow', trigger: 'product.published', steps: 8, runsToday: 12, success: '100%' },
  { name: 'Purchase Completed Flow', trigger: 'purchase.completed', steps: 5, runsToday: 34, success: '98%' },
  { name: 'Archive Released Flow', trigger: 'archive.released', steps: 4, runsToday: 2, success: '100%' },
  { name: 'Challenge Completed Flow', trigger: 'challenge.completed', steps: 3, runsToday: 18, success: '100%' },
  { name: 'Story Published Flow', trigger: 'story.published', steps: 3, runsToday: 14, success: '100%' },
  { name: 'QR Scanned Flow', trigger: 'qr.scanned', steps: 3, runsToday: 892, success: '99%' },
]

// suppress unused vars
void BG
void CLAY
void SAND
void CREAM

export default function SystemAutomation({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState('Workflows')

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>
          Automation
        </h1>
        <p style={{ fontSize: 14, color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>
          Platform workflows, triggers, generators, and scheduled jobs
        </p>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 2, borderBottom: `1px solid ${BORDER}`, marginBottom: 28 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '9px 18px',
              border: 'none',
              borderBottom: activeTab === tab ? `2px solid ${INDIGO}` : '2px solid transparent',
              background: 'transparent',
              color: activeTab === tab ? INDIGO : TEXT_SEC,
              fontSize: 13,
              fontWeight: activeTab === tab ? 600 : 400,
              cursor: 'pointer',
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Workflows' && (
        <>
          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Active Workflows', value: '6' },
              { label: 'Jobs Today', value: '84' },
              { label: 'Avg Steps', value: '6.2' },
              { label: 'Success Rate', value: '99.1%' },
            ].map(kpi => (
              <div key={kpi.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 28, fontWeight: 600, color: INDIGO }}>{kpi.value}</div>
                <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 140px 80px 80px 80px 80px',
                padding: '12px 20px',
                borderBottom: `1px solid ${BORDER}`,
                background: SURFACE_2,
              }}
            >
              {['Workflow', 'Trigger', 'Steps', 'Runs Today', 'Success', 'Status'].map(col => (
                <div key={col} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  {col}
                </div>
              ))}
            </div>

            {/* Rows */}
            {WORKFLOWS.map((row, i) => (
              <div
                key={row.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 140px 80px 80px 80px 80px',
                  padding: '14px 20px',
                  borderBottom: i < WORKFLOWS.length - 1 ? `1px solid ${BORDER}` : 'none',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{row.name}</div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: TEXT_SEC }}>{row.trigger}</div>
                <div style={{ fontSize: 13, color: TEXT }}>{row.steps}</div>
                <div style={{ fontSize: 13, color: TEXT }}>{row.runsToday.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: TEXT }}>{row.success}</div>
                <div>
                  <span style={{ display: 'inline-block', background: '#E6EDE8', color: '#4A7A5A', fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 100 }}>
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* New Workflow button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <button
              style={{
                padding: '10px 20px',
                background: INDIGO,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              + New Workflow
            </button>
          </div>
        </>
      )}

      {activeTab !== 'Workflows' && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: TEXT_SEC, fontSize: 14 }}>
          {activeTab} configuration coming soon.
        </div>
      )}
    </div>
  )
}
