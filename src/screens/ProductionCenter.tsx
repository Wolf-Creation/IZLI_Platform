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

const playfair = 'Playfair Display, Georgia, serif'
const inter = 'Inter, system-ui, sans-serif'
const mono = 'JetBrains Mono, monospace'

type Job = {
  name: string
  sku: string
  template: string
  assets: number
  status: 'ready' | 'generating' | 'error' | 'pending'
  format: string
  created: string
  progress?: number
}

const JOBS: Job[] = [
  { name: 'Tifinagh Frame Tee', sku: 'HRT-001', template: 'Oversized T-Shirt', assets: 8, status: 'ready', format: 'PDF', created: '10 Jul 2026' },
  { name: 'Woven Sahara Overshirt', sku: 'HRT-002', template: 'Classic T-Shirt', assets: 6, status: 'ready', format: 'ZIP', created: '9 Jul 2026' },
  { name: 'Atlas Boxy Tee', sku: 'HRT-003', template: 'Oversized T-Shirt', assets: 8, status: 'generating', format: 'PDF', created: '8 Jul 2026', progress: 65 },
  { name: 'Sahara Cargo Trousers', sku: 'BTM-001', template: 'Pants', assets: 5, status: 'ready', format: 'SVG', created: '7 Jul 2026' },
  { name: 'Mountain Pass Hoodie', sku: 'HRT-004', template: 'Hoodie', assets: 7, status: 'error', format: '-', created: '5 Jul 2026' },
  { name: 'Linen Wide-Leg Trousers', sku: 'BTM-002', template: 'Pants', assets: 5, status: 'pending', format: 'PDF', created: '28 Jun 2026' },
]

const assetTypes = [
  { label: 'Internal Branding Print', count: 124 },
  { label: 'Hang Tag', count: 124 },
  { label: 'QR Label', count: 124 },
  { label: 'Care Label', count: 98 },
  { label: 'Neck Print', count: 89 },
  { label: 'Side Label', count: 76 },
  { label: 'Packaging Card', count: 63 },
  { label: 'Brand Card', count: 47 },
]

const MAX_COUNT = 124

function statusBadge(status: Job['status']) {
  const map = {
    ready: { bg: '#E6EDE8', color: '#4A7A5A', label: 'Ready' },
    generating: { bg: '#FFF4E5', color: '#8C6B00', label: 'Generating' },
    error: { bg: '#F9EDEA', color: '#A63D2F', label: 'Error' },
    pending: { bg: SURFACE_2, color: CLAY, label: 'Pending' },
  }
  const s = map[status]
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontFamily: inter,
      background: s.bg,
      color: s.color,
      fontWeight: 500,
    }}>{s.label}</span>
  )
}

export default function ProductionCenter({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [_hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: inter }}>
      <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: playfair, fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>
              Brand Production Center
            </h1>
            <p style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, margin: '6px 0 0', lineHeight: 1.5 }}>
              Automated production asset generation · powered by Product Passport
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, padding: '9px 20px', fontSize: 13, fontFamily: inter, fontWeight: 500, cursor: 'pointer' }}
              onClick={() => onNavigate('batch-generator')}
            >
              Generate Batch
            </button>
            <button
              style={{ background: 'transparent', color: INDIGO, border: `1.5px solid ${BORDER}`, borderRadius: 9, padding: '9px 20px', fontSize: 13, fontFamily: inter, fontWeight: 500, cursor: 'pointer' }}
              onClick={() => onNavigate('export-center')}
            >
              Export Center
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Assets Generated', value: '2,847', color: INDIGO },
            { label: 'Products Ready', value: '124', color: INDIGO },
            { label: 'Missing Files', value: '8', color: CLAY },
            { label: 'QR Codes Generated', value: '124', color: INDIGO },
          ].map((kpi) => (
            <div key={kpi.label} style={{
              background: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 14,
              padding: '18px 20px',
            }}>
              <div style={{ fontSize: 11, fontFamily: inter, color: TEXT_SEC, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{kpi.label}</div>
              <div style={{ fontSize: 28, fontWeight: 600, fontFamily: playfair, color: kpi.color }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Latest Production Jobs */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0' }}>
            <span style={{ fontFamily: playfair, fontSize: 18, fontWeight: 500, color: INDIGO }}>Latest Production Jobs</span>
            <button
              style={{ background: 'none', border: 'none', color: CLAY, fontSize: 13, fontFamily: inter, cursor: 'pointer', fontWeight: 500 }}
              onClick={() => onNavigate('production-assets')}
            >
              View All →
            </button>
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 140px 120px 100px 100px 80px 90px',
            gap: 0,
            padding: '14px 24px',
            borderBottom: `1px solid ${BORDER}`,
            marginTop: 16,
          }}>
            {['Product', 'Template', 'Assets', 'Status', 'Format', 'Created', 'Actions'].map((col) => (
              <div key={col} style={{ fontSize: 11, fontFamily: inter, color: TEXT_SEC, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{col}</div>
            ))}
          </div>

          {/* Rows */}
          {JOBS.map((job, i) => (
            <div
              key={job.sku}
              onMouseEnter={() => setHovered(job.sku)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 140px 120px 100px 100px 80px 90px',
                gap: 0,
                padding: '14px 24px',
                borderBottom: i < JOBS.length - 1 ? `1px solid ${BORDER}` : 'none',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontFamily: inter, fontWeight: 500, color: TEXT }}>{job.name}</div>
                <div style={{ fontSize: 11, fontFamily: mono, color: SAND, marginTop: 2 }}>{job.sku}</div>
              </div>
              <div style={{ fontSize: 12, fontFamily: inter, color: TEXT_SEC }}>{job.template}</div>
              <div style={{ fontSize: 13, fontFamily: inter, color: TEXT }}>{job.assets} assets</div>
              <div>
                {statusBadge(job.status)}
                {job.status === 'generating' && job.progress !== undefined && (
                  <div style={{ marginTop: 6, height: 4, background: BORDER, borderRadius: 2, width: 80 }}>
                    <div style={{ height: 4, borderRadius: 2, background: '#8C6B00', width: `${job.progress}%` }} />
                  </div>
                )}
              </div>
              <div style={{ fontSize: 12, fontFamily: mono, color: TEXT_SEC }}>{job.format}</div>
              <div style={{ fontSize: 12, fontFamily: inter, color: TEXT_SEC }}>{job.created}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{
                  background: SURFACE_2, border: `1px solid ${BORDER}`, color: INDIGO,
                  borderRadius: 7, padding: '4px 10px', fontSize: 11, fontFamily: inter, cursor: 'pointer', fontWeight: 500,
                }}>Open</button>
                <button style={{
                  background: SURFACE_2, border: `1px solid ${BORDER}`, color: TEXT_SEC,
                  borderRadius: 7, padding: '4px 8px', fontSize: 13, fontFamily: inter, cursor: 'pointer',
                }}>⋯</button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom two-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Asset Type Breakdown */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ fontFamily: playfair, fontSize: 16, fontWeight: 500, color: INDIGO, marginBottom: 18 }}>Asset Type Breakdown</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {assetTypes.map((at) => (
                <div key={at.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontFamily: inter, color: TEXT }}>{at.label}</span>
                    <span style={{ fontSize: 12, fontFamily: mono, color: TEXT_SEC }}>{at.count}</span>
                  </div>
                  <div style={{ height: 6, background: BORDER, borderRadius: 3 }}>
                    <div style={{ height: 6, borderRadius: 3, background: INDIGO, width: `${(at.count / MAX_COUNT) * 100}%`, opacity: 0.7 + (at.count / MAX_COUNT) * 0.3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ fontFamily: playfair, fontSize: 16, fontWeight: 500, color: INDIGO, marginBottom: 18 }}>Quick Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, padding: '11px 18px', fontSize: 13, fontFamily: inter, fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}
                onClick={() => onNavigate('batch-generator')}
              >
                Generate All Missing
              </button>
              <button
                style={{ background: SURFACE_2, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '11px 18px', fontSize: 13, fontFamily: inter, fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}
                onClick={() => onNavigate('export-center')}
              >
                Batch Export ZIP
              </button>
              <button
                style={{ background: SURFACE_2, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '11px 18px', fontSize: 13, fontFamily: inter, fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}
              >
                Download All QR Labels
              </button>
              <button
                style={{ background: 'transparent', color: CLAY, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '11px 18px', fontSize: 13, fontFamily: inter, fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}
              >
                View Missing Files
              </button>
              <button
                style={{ background: SURFACE_2, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 9, padding: '11px 18px', fontSize: 13, fontFamily: inter, fontWeight: 500, cursor: 'pointer', textAlign: 'left' }}
                onClick={() => onNavigate('production-templates')}
              >
                Open Production Templates
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
