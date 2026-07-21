import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const SAND = '#B7AA91'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const SURFACE_2 = '#EFE8DD'
const CREAM = '#E7DFD2'

interface Props { onNavigate: (s: Screen) => void }

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '18px 24px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 3 }}>{subtitle}</div>}
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  )
}

function Row({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${BORDER}` }}>
      <span style={{ fontSize: 12, color: TEXT_SEC }}>{label}</span>
      <span style={{ fontSize: 12, color: TEXT, fontFamily: mono ? "'JetBrains Mono', monospace" : 'Inter, sans-serif', fontWeight: mono ? 400 : 400 }}>{value}</span>
    </div>
  )
}

function ActionBtn({ label, icon }: { label: string; icon: string }) {
  return (
    <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: BG, fontSize: 12, color: TEXT, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
      <span>{icon}</span> {label}
    </button>
  )
}

// Full-size QR code SVG replica
function QRCode({ size = 200 }: { size?: number }) {
  const px = size / 25
  // 25×25 grid representation (simplified aesthetic QR-like pattern)
  const modules: [number, number][] = [
    // TL finder pattern
    ...Array.from({length: 7}, (_, r) => Array.from({length: 7}, (_, c) => [c, r] as [number, number])).flat()
      .filter(([c, r]) => r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)),
    // TR finder pattern
    ...Array.from({length: 7}, (_, r) => Array.from({length: 7}, (_, c) => [18 + c, r] as [number, number])).flat()
      .filter(([c, r]) => r === 0 || r === 6 || c === 18 || c === 24 || (r >= 2 && r <= 4 && c >= 20 && c <= 22)),
    // BL finder pattern
    ...Array.from({length: 7}, (_, r) => Array.from({length: 7}, (_, c) => [c, 18 + r] as [number, number])).flat()
      .filter(([c, r]) => r === 18 || r === 24 || c === 0 || c === 6 || (r >= 20 && r <= 22 && c >= 2 && c <= 4)),
    // data area modules (deterministic pattern for aesthetic)
    [8,0],[10,0],[12,0],[14,0],[16,0],[9,1],[11,1],[13,1],[15,1],[8,2],[10,2],[12,2],[16,2],
    [9,3],[11,3],[14,3],[15,3],[8,4],[10,4],[13,4],[9,5],[12,5],[14,5],[16,5],
    [8,7],[10,7],[12,7],[14,7],[16,7],[8,8],[11,8],[13,8],[15,8],[17,8],
    [8,9],[10,9],[12,9],[14,9],[17,9],[9,10],[11,10],[13,10],[16,10],[18,10],
    [8,11],[10,11],[12,11],[15,11],[17,11],[19,11],[21,11],[23,11],
    [8,12],[9,12],[11,12],[14,12],[16,12],[18,12],[20,12],[22,12],[24,12],
    [8,13],[10,13],[13,13],[15,13],[17,13],[19,13],[21,13],[23,13],
    [9,14],[12,14],[14,14],[16,14],[18,14],[20,14],[22,14],[24,14],
    [8,15],[11,15],[13,15],[15,15],[17,15],[19,15],[21,15],[23,15],
    [7,8],[7,10],[7,12],[7,14],[7,16],
    [18,7],[20,7],[22,7],[24,7],[19,8],[21,8],[23,8],
    [18,9],[20,9],[22,9],[24,9],[19,10],[21,10],[23,10],
    [18,11],[20,11],[22,11],[24,11],
    [18,16],[20,16],[22,16],[24,16],[19,17],[21,17],[23,17],
    [18,18],[20,18],[22,18],[24,18],[19,19],[21,19],[23,19],
    [18,20],[20,20],[22,20],[24,20],[19,21],[21,21],[23,21],
    [18,22],[20,22],[22,22],[24,22],[19,23],[21,23],[23,23],
    [18,24],[20,24],[22,24],[24,24],
  ]

  return (
    <div style={{ background: 'white', padding: 16, borderRadius: 12, display: 'inline-block', border: `1px solid ${BORDER}`, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <svg width={size} height={size} viewBox={`0 0 ${25 * px} ${25 * px}`} xmlns="http://www.w3.org/2000/svg">
        <rect width={25 * px} height={25 * px} fill="white" />
        {modules.map(([x, y], i) => (
          <rect key={i} x={x * px + 1} y={y * px + 1} width={px - 1} height={px - 1} fill="#1E2F44" rx={px * 0.15} />
        ))}
      </svg>
    </div>
  )
}

// QR Landing Page preview (phone mock)
function LandingPagePreview() {
  return (
    <div style={{ width: 260, background: '#F9F7F3', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
      {/* Phone chrome */}
      <div style={{ background: '#1A1A1A', padding: '8px 12px 6px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 56, height: 4, borderRadius: 999, background: '#444' }} />
      </div>
      {/* URL bar */}
      <div style={{ background: '#F0EDE8', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ fontSize: 9, color: '#4A7A5A', fontFamily: "'JetBrains Mono', monospace" }}>🔒 izli.co/p/hrt-001</div>
      </div>
      {/* Product hero */}
      <div style={{ height: 140, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=520&h=280&fit=crop&auto=format" alt="product" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ padding: '14px 14px 10px' }}>
        {/* Product name */}
        <div style={{ fontSize: 14, fontWeight: 600, color: INDIGO, fontFamily: "'Playfair Display', serif", marginBottom: 2 }}>Tifinagh Frame Tee</div>
        <div style={{ fontSize: 10, color: SAND, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>IZLI-2026-000125</div>
        {/* Style Guide */}
        <div style={{ fontSize: 9, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5 }}>Style Guide</div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
          {['#7D8470','#B7AA91','#EDE8DF','#2E2E2E'].map((c, i) => (
            <div key={i} style={{ width: 16, height: 16, borderRadius: 999, background: c, border: '1px solid rgba(0,0,0,0.08)' }} />
          ))}
          <span style={{ fontSize: 9, color: TEXT_SEC, marginLeft: 4, alignSelf: 'center' }}>Sage Collection</span>
        </div>
        {/* Recommendations row */}
        <div style={{ fontSize: 9, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5 }}>Complete Your Style</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {['photo-1617196034183-421b4040ed20','photo-1523381210434-271e8be1f52b'].map((img, i) => (
            <div key={i} style={{ width: 44, height: 56, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
              <img src={`https://images.unsplash.com/${img}?w=88&h=112&fit=crop&auto=format`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
          <div style={{ width: 44, height: 56, borderRadius: 8, background: BG, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: TEXT_SEC, flexShrink: 0 }}>+4</div>
        </div>
        {/* Story */}
        <div style={{ padding: '8px 10px', background: SURFACE_2, borderRadius: 8, marginBottom: 8 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>Related Story</div>
          <div style={{ fontSize: 10, color: TEXT, fontFamily: "'Playfair Display', serif" }}>The Geometry of Tifinagh</div>
        </div>
        {/* Care */}
        <div style={{ padding: '8px 10px', background: BG, borderRadius: 8 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>Care Guide</div>
          <div style={{ fontSize: 10, color: TEXT_SEC }}>30° · Do not bleach · Hang dry</div>
        </div>
      </div>
    </div>
  )
}

export default function ProductPassportEditor({ onNavigate }: Props) {
  const [selectedSize, setSelectedSize] = useState('3x3')

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Product Passport</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>IZLI-2026-000125</span>
            <span style={{ marginLeft: 12 }}>Tifinagh Frame Tee · HRT-001</span>
            <span style={{ marginLeft: 12, padding: '2px 8px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A', fontSize: 11 }}>Active</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('product-passports')} style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            ← Back
          </button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: CREAM, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Download All
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

        {/* ── Left ── */}
        <div>

          {/* General */}
          <SectionCard title="General" subtitle="Read-only — automatically generated on product publish">
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 80, height: 96, borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}`, flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=160&h=192&fit=crop&auto=format" alt="product" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: TEXT, marginBottom: 4 }}>Tifinagh Frame Tee</div>
                <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 12 }}>Heritage Collection · Size M · Stone Grey</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ padding: '6px 14px', fontSize: 12, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 8, background: BG, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Open Product ↗
                  </button>
                </div>
              </div>
            </div>
            <Row label="Passport ID" value="PP-001" mono />
            <Row label="Product ID" value="IZLI-2026-000125" mono />
            <Row label="SKU" value="HRT-001" mono />
            <Row label="Slug" value="tifinagh-frame-tee" mono />
            <Row label="Landing URL" value={<span style={{ color: INDIGO }}>izli.co/p/hrt-001</span>} mono />
            <Row label="Created At" value="15 Mar 2026 · 09:14" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: TEXT_SEC }}>Updated At</span>
              <span style={{ fontSize: 12, color: TEXT }}>10 Jul 2026 · 14:22</span>
            </div>
          </SectionCard>

          {/* QR Code */}
          <SectionCard title="QR Code" subtitle="Unique code generated for this product — scan to open the digital passport">
            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <QRCode size={180} />
                <div style={{ fontSize: 11, color: TEXT_SEC, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: SAND }}>izli.co/p/hrt-001</div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>Download</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  <ActionBtn icon="⬇" label="Download PNG (300 PPI)" />
                  <ActionBtn icon="⬇" label="Download SVG (Vector)" />
                  <ActionBtn icon="⬇" label="Download PDF (Print Ready)" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>Copy</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  <ActionBtn icon="⧉" label="Copy URL" />
                  <ActionBtn icon="⧉" label="Copy Product ID" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>Manage</div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', border: `1px solid #D4A0A0`, borderRadius: 10, background: '#FDF4F4', fontSize: 12, color: '#A63D2F', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  ↺ Regenerate QR Code
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Print */}
          <SectionCard title="Print" subtitle="Optimized for textile label printing — 300 PPI, high contrast, quiet zone preserved">
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              {[
                { id: '1.5x1.5', label: '1.5 × 1.5 cm', desc: 'Inner label' },
                { id: '3x3', label: '3 × 3 cm', desc: 'Hangtag' },
                { id: 'custom', label: 'Custom', desc: 'Coming soon' },
              ].map(opt => (
                <button key={opt.id} onClick={() => opt.id !== 'custom' && setSelectedSize(opt.id)}
                  style={{
                    flex: 1, padding: '12px 14px', borderRadius: 12,
                    border: `1px solid ${selectedSize === opt.id ? INDIGO : BORDER}`,
                    background: selectedSize === opt.id ? '#EBF0F5' : BG,
                    cursor: opt.id === 'custom' ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif', opacity: opt.id === 'custom' ? 0.5 : 1,
                  }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: selectedSize === opt.id ? INDIGO : TEXT, marginBottom: 3 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: TEXT_SEC }}>{opt.desc}</div>
                </button>
              ))}
            </div>

            {/* Print preview */}
            <div style={{ background: '#F0EDE8', borderRadius: 14, padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid ${BORDER}` }}>
              <div style={{ background: 'white', borderRadius: 8, padding: selectedSize === '1.5x1.5' ? 8 : 16, boxShadow: '0 4px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <QRCode size={selectedSize === '1.5x1.5' ? 80 : 120} />
                <div style={{ fontSize: selectedSize === '1.5x1.5' ? 7 : 9, color: '#333', fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>
                  IZLI-2026-000125
                </div>
                {selectedSize !== '1.5x1.5' && (
                  <div style={{ fontSize: 8, color: '#666', fontFamily: "'Playfair Display', serif" }}>IZLI</div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <ActionBtn icon="🖨" label={`Print ${selectedSize === '1.5x1.5' ? '1.5×1.5 cm' : '3×3 cm'}`} />
              <ActionBtn icon="⬇" label="Download Print PDF" />
            </div>
          </SectionCard>

          {/* Download */}
          <SectionCard title="Download" subtitle="Export files for print, production, and digital use">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                {
                  format: 'PNG', icon: '🖼', specs: ['300 PPI', 'Transparent BG', 'White BG'],
                  desc: 'Raster image for digital and print use'
                },
                {
                  format: 'SVG', icon: '◉', specs: ['Vector', 'Scalable', 'Any size'],
                  desc: 'Infinitely scalable vector format'
                },
                {
                  format: 'PDF', icon: '📄', specs: ['Print ready', '300 PPI', 'CMYK'],
                  desc: 'Production-ready for label printing'
                },
              ].map(f => (
                <div key={f.format} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 16px' }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{f.format}</div>
                  <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 12, lineHeight: 1.5 }}>{f.desc}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
                    {f.specs.map((s, i) => (
                      <span key={i} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: SURFACE_2, color: TEXT_SEC }}>{s}</span>
                    ))}
                  </div>
                  <button style={{ width: '100%', padding: '8px', fontSize: 12, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 8, background: SURFACE, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    ⬇ Download {f.format}
                  </button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* QR Landing Page */}
          <SectionCard title="QR Landing Page" subtitle="This is what customers see when they scan the product QR. Powered by Style Guide + Recommendation Hub.">
            <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
              <div>
                <LandingPagePreview />
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <button style={{ padding: '7px 14px', fontSize: 12, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 8, background: BG, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Open Live ↗
                  </button>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 14 }}>Content Graph</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { icon: '◈', label: 'Product', value: 'Tifinagh Frame Tee', color: INDIGO },
                    { icon: '↓', label: '', value: '', color: SAND },
                    { icon: '◎', label: 'Style Guide', value: 'Sage Collection', color: TEXT },
                    { icon: '↓', label: '', value: '', color: SAND },
                    { icon: '◈', label: 'Recommendation Hub', value: 'Complete Your Style', color: TEXT },
                    { icon: '↓', label: '', value: '', color: SAND },
                    { icon: '◫', label: 'Product Story', value: 'The Geometry of Tifinagh', color: TEXT },
                    { icon: '↓', label: '', value: '', color: SAND },
                    { icon: '▦', label: 'Heritage Story', value: 'Indigo as Memory', color: TEXT },
                    { icon: '↓', label: '', value: '', color: SAND },
                    { icon: '◻', label: 'Care Guide', value: 'Automatically from product', color: TEXT_SEC },
                  ].map((item, i) => item.label ? (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 9, background: i % 4 === 0 ? '#EBF0F5' : 'transparent', marginBottom: 2 }}>
                      <span style={{ fontSize: 13, color: item.color, width: 18 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 10, color: TEXT_SEC, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: item.color, fontWeight: 500 }}>{item.value}</div>
                      </div>
                    </div>
                  ) : (
                    <div key={i} style={{ paddingLeft: 21, fontSize: 16, color: SAND, lineHeight: 1 }}>↓</div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Authenticity */}
          <SectionCard title="Authenticity" subtitle="Future fields — placeholders for counterfeit protection and edition tracking">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { label: 'Serial Number', value: '—', placeholder: true },
                { label: 'Edition', value: '—', placeholder: true },
                { label: 'Authenticity Status', value: 'Pending', placeholder: true },
                { label: 'Counterfeit Protection', value: 'Not activated', placeholder: true },
              ].map((f, i) => (
                <div key={i} style={{ padding: '14px 16px', background: BG, border: `1px dashed ${BORDER}`, borderRadius: 12, opacity: 0.7 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 5 }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: TEXT_SEC }}>{f.value}</div>
                  <div style={{ fontSize: 10, color: SAND, marginTop: 3 }}>Coming soon</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Scan Analytics */}
          <SectionCard title="Scan Analytics" subtitle="Performance tracking — placeholder data. Live analytics connect at product activation.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
              {[
                { label: 'Total Scans', value: '1,204' },
                { label: 'Unique Visitors', value: '986' },
                { label: 'Top Country', value: 'France' },
                { label: 'Top Device', value: 'iPhone' },
                { label: 'Traffic Source', value: 'Direct scan' },
                { label: 'Last Scanned', value: '10 Jul 2026' },
              ].map((stat, i) => (
                <div key={i} style={{ padding: '14px 16px', background: BG, border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 5 }}>{stat.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 500, color: INDIGO, fontFamily: "'Playfair Display', serif" }}>{stat.value}</div>
                </div>
              ))}
            </div>
            {/* Scan timeline placeholder */}
            <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>Scan Timeline</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
                {[24, 38, 31, 56, 42, 78, 65, 90, 48, 72, 55, 44].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: INDIGO, borderRadius: '3px 3px 0 0', height: `${(h / 90) * 100}%`, opacity: 0.15 + (i / 12) * 0.85 }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 10, color: SAND }}>Jun 2026</span>
                <span style={{ fontSize: 10, color: SAND }}>Jul 2026</span>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ── Right sticky panel ── */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Quick actions */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Quick Actions</div>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{ width: '100%', padding: '10px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                ⬇ Download All Files
              </button>
              <button style={{ width: '100%', padding: '10px', background: BG, color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                🖨 Print QR Label
              </button>
              <button style={{ width: '100%', padding: '10px', background: BG, color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                ↗ Open Landing Page
              </button>
              <button style={{ width: '100%', padding: '10px', background: BG, color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                ⧉ Copy QR URL
              </button>
            </div>
          </div>

          {/* Passport status */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Passport Status</div>
            {[
              { label: 'Status', value: <span style={{ padding: '2px 8px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A', fontSize: 11, fontWeight: 500 }}>Active</span> },
              { label: 'QR Code', value: <span style={{ padding: '2px 8px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A', fontSize: 11, fontWeight: 500 }}>Generated</span> },
              { label: 'Scans', value: <span style={{ fontSize: 12, fontWeight: 500, color: INDIGO }}>1,204</span> },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.label}</span>
                {r.value}
              </div>
            ))}
          </div>

          {/* QR preview panel */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>QR Code</div>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <QRCode size={120} />
              <div style={{ fontSize: 10, color: SAND, fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>izli.co/p/hrt-001</div>
              <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                <button style={{ flex: 1, padding: '7px', fontSize: 11, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 8, background: BG, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>PNG</button>
                <button style={{ flex: 1, padding: '7px', fontSize: 11, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 8, background: BG, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>SVG</button>
                <button style={{ flex: 1, padding: '7px', fontSize: 11, color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 8, background: BG, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>PDF</button>
              </div>
            </div>
          </div>

          {/* Linked entities */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Linked Entities</div>
            {[
              { icon: '◎', label: 'Style Guide', value: 'Sage Collection' },
              { icon: '◈', label: 'Rec. Hub', value: 'Complete Your Style' },
              { icon: '◫', label: 'Story', value: 'The Geometry of Tifinagh' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC, width: 16 }}>{item.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: SAND }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: TEXT, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value}</div>
                </div>
                <button style={{ fontSize: 11, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>↗</button>
              </div>
            ))}
          </div>

          {/* Timestamps */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Timestamps</div>
            {[
              { label: 'Created', value: '15 Mar 2026' },
              { label: 'Updated', value: '10 Jul 2026' },
              { label: 'Last Scan', value: '10 Jul 2026' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{t.label}</span>
                <span style={{ fontSize: 12, color: TEXT }}>{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
