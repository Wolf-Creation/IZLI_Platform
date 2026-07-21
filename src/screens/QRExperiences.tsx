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

const QR_ROWS = [
  { product: 'Tifinagh Frame Tee', qrCode: 'IZLI-QR-2026-000014', passport: 'PASS-2026-000014', scans: 428, lastScan: '2 days ago' },
  { product: 'Washed Indigo Heritage Tee', qrCode: 'IZLI-QR-2026-000021', passport: 'PASS-2026-000021', scans: 312, lastScan: '4 days ago' },
  { product: 'Atlas Symbol Boxy Tee', qrCode: 'IZLI-QR-2026-000008', passport: 'PASS-2026-000008', scans: 284, lastScan: '1 day ago' },
  { product: 'Woven Sahara Overshirt', qrCode: 'IZLI-QR-2026-000031', passport: 'PASS-2026-000031', scans: 201, lastScan: '3 days ago' },
  { product: 'Community Lab Archive Jersey', qrCode: 'IZLI-QR-2026-000039', passport: 'PASS-2026-000039', scans: 156, lastScan: 'Today' },
  { product: 'Mountain Mark Crewneck', qrCode: 'IZLI-QR-2026-000016', passport: 'PASS-2026-000016', scans: 89, lastScan: '7 days ago' },
]

export default function QRExperiences({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = QR_ROWS.filter(r =>
    search === '' || r.product.toLowerCase().includes(search.toLowerCase()) || r.qrCode.includes(search)
  )

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>
          QR Experiences
        </h1>
        <p style={{ fontSize: 14, color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>
          All active QR codes, landing pages, and scan experiences
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Active QR Codes', value: '284' },
          { label: 'Total Scans', value: '14,892' },
          { label: 'Avg Scans / Product', value: '52' },
          { label: 'Conversion Rate', value: '18%' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: INDIGO }}>{kpi.value}</div>
            <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products or QR codes…"
          style={{
            flex: 1,
            maxWidth: 320,
            padding: '8px 14px',
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            background: SURFACE,
            fontSize: 13,
            color: TEXT,
            outline: 'none',
          }}
        />
        {['All', 'Active', 'Draft', 'Archived'].map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '7px 14px',
              borderRadius: 100,
              border: `1px solid ${activeFilter === f ? INDIGO : BORDER}`,
              background: activeFilter === f ? INDIGO : SURFACE,
              color: activeFilter === f ? '#fff' : TEXT_SEC,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '48px 2fr 160px 100px 80px 90px 80px 80px',
            gap: 0,
            padding: '12px 20px',
            borderBottom: `1px solid ${BORDER}`,
            background: SURFACE_2,
          }}
        >
          {['', 'Product', 'QR Code', 'Passport', 'Scans', 'Last Scan', 'Status', 'Actions'].map(col => (
            <div key={col} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((row, i) => (
          <div
            key={row.qrCode}
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 2fr 160px 100px 80px 90px 80px 80px',
              gap: 0,
              padding: '14px 20px',
              borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none',
              alignItems: 'center',
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: 40,
                height: 40,
                background: BG,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                color: SAND,
              }}
            >
              ◈
            </div>

            {/* Product */}
            <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, paddingRight: 12 }}>{row.product}</div>

            {/* QR Code */}
            <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: CLAY }}>{row.qrCode}</div>

            {/* Passport */}
            <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: TEXT_SEC }}>{row.passport}</div>

            {/* Scans */}
            <div style={{ fontSize: 13, color: TEXT }}>{row.scans.toLocaleString()}</div>

            {/* Last Scan */}
            <div style={{ fontSize: 12, color: TEXT_SEC }}>{row.lastScan}</div>

            {/* Status */}
            <div>
              <span
                style={{
                  display: 'inline-block',
                  background: '#E6EDE8',
                  color: '#4A7A5A',
                  fontSize: 11,
                  fontWeight: 500,
                  padding: '3px 10px',
                  borderRadius: 100,
                }}
              >
                Active
              </span>
            </div>

            {/* Actions */}
            <button
              style={{
                padding: '5px 12px',
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                background: 'transparent',
                color: INDIGO,
                fontSize: 11,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* suppress unused var warnings */}
      <span style={{ display: 'none' }}>{CREAM}</span>
    </div>
  )
}
