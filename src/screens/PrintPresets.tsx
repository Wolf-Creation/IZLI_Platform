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

type Preset = {
  size: string
  resolution: string
  margin: string
  safeArea: string
  quietZone: string
  usedIn: string[]
  custom?: boolean
}

const PRESETS: Preset[] = [
  { size: '15 × 15 mm', resolution: '300 PPI', margin: '1mm', safeArea: '1mm', quietZone: '2mm', usedIn: ['QR Label', 'Sticker'] },
  { size: '20 × 20 mm', resolution: '300 PPI', margin: '1.5mm', safeArea: '1.5mm', quietZone: '2mm', usedIn: ['QR Label', 'Hang Tag'] },
  { size: '30 × 30 mm', resolution: '300 PPI', margin: '2mm', safeArea: '2mm', quietZone: '3mm', usedIn: ['Hang Tag', 'Packaging Card'] },
  { size: '50 × 50 mm', resolution: '300 PPI', margin: '3mm', safeArea: '3mm', quietZone: '4mm', usedIn: ['Hang Tag', 'Brand Card', 'Packaging Card'] },
  { size: '70 × 70 mm', resolution: '300 PPI', margin: '4mm', safeArea: '4mm', quietZone: '5mm', usedIn: ['Packaging Card', 'Shipping Insert'] },
  { size: 'Custom', resolution: '-', margin: '-', safeArea: '-', quietZone: '-', usedIn: ['Custom size'], custom: true },
]

export default function PrintPresets({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [_hovered, setHovered] = useState<number | null>(null)

  // suppress unused variable warnings
  void CLAY; void SAND; void CREAM; void TEXT

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: inter }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '40px 48px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <h1 style={{ fontFamily: playfair, fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2 }}>Print Presets</h1>
            <p style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, margin: '6px 0 0' }}>
              6 presets · predefined print formats for production assets
            </p>
          </div>
          <button style={{ fontFamily: inter, fontSize: 13, color: '#fff', background: INDIGO, border: 'none', borderRadius: 9, padding: '8px 18px', cursor: 'pointer' }}>
            + New Preset
          </button>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {PRESETS.map((preset, idx) => {
            if (preset.custom) {
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: SURFACE,
                    border: `1.5px dashed ${BORDER}`,
                    borderRadius: 16,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                    opacity: 0.7,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontFamily: inter, fontSize: 28, color: BORDER, marginBottom: 12 }}>+</div>
                  <div style={{ fontFamily: inter, fontSize: 13, color: TEXT_SEC, fontWeight: 500 }}>Create Custom Preset</div>
                </div>
              )
            }

            return (
              <div
                key={idx}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  cursor: 'default',
                }}
              >
                {/* Size + Resolution row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ fontFamily: playfair, fontSize: 22, fontWeight: 500, color: INDIGO, lineHeight: 1.2 }}>{preset.size}</div>
                  <span style={{ fontFamily: inter, fontSize: 10, color: TEXT_SEC, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '3px 9px', marginTop: 4 }}>
                    {preset.resolution}
                  </span>
                </div>

                {/* Spec rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  {[
                    { label: 'Margins', value: preset.margin },
                    { label: 'Safe Area', value: preset.safeArea },
                    { label: 'Quiet Zone', value: preset.quietZone },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: inter, fontSize: 12, color: TEXT_SEC }}>{row.label}</span>
                      <span style={{ fontFamily: inter, fontSize: 12, color: INDIGO, fontWeight: 500 }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Used in */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: inter, fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Used in</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {preset.usedIn.map(tag => (
                      <span key={tag} style={{ fontFamily: inter, fontSize: 11, color: TEXT_SEC, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '3px 10px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <button style={{ fontFamily: inter, fontSize: 11, color: TEXT_SEC, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '6px 14px', cursor: 'pointer', flex: 1 }}>
                    Edit Preset
                  </button>
                  <button style={{ fontFamily: inter, fontSize: 11, color: TEXT_SEC, background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '6px 14px', cursor: 'pointer', flex: 1 }}>
                    Duplicate
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
