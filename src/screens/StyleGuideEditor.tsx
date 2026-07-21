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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '18px 24px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, letterSpacing: '0.01em' }}>{title}</div>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: SAND, marginTop: 4 }}>{hint}</div>}
    </div>
  )
}

const inp: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: `1px solid ${BORDER}`,
  borderRadius: 10,
  background: BG,
  fontSize: 13,
  color: TEXT,
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  boxSizing: 'border-box',
}

// ── Multi-select pill toggle ──────────────────────────────────────────────────
function PillSelect({ options, selected, onChange }: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (val: string) => onChange(
    selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]
  )
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
      {options.map(opt => {
        const active = selected.includes(opt)
        return (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            style={{
              padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              border: `1px solid ${active ? INDIGO : BORDER}`,
              background: active ? INDIGO : 'transparent',
              color: active ? CREAM : TEXT_SEC,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              transition: 'all 120ms ease',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ── Color swatch input ────────────────────────────────────────────────────────
function ColorSwatch({ color, label, onChange }: { color: string; label?: string; onChange?: (c: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative' }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: color, border: `1px solid ${BORDER}`, cursor: onChange ? 'pointer' : 'default', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
        {onChange && (
          <input
            type="color"
            value={color}
            onChange={e => onChange(e.target.value)}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
          />
        )}
      </div>
      {label && <div style={{ fontSize: 10, color: TEXT_SEC, textAlign: 'center', maxWidth: 60, lineHeight: 1.3 }}>{label}</div>}
      <div style={{ fontSize: 10, color: SAND, fontFamily: "'JetBrains Mono', monospace" }}>{color.toUpperCase()}</div>
    </div>
  )
}

// ── QR Preview panel ──────────────────────────────────────────────────────────
function QRPreview({
  palette, matchingColors, bottomTypes, footwear, designerNotes,
}: {
  palette: { primary: string; secondary: string[]; accent: string[]; neutral: string[] }
  matchingColors: string[]
  bottomTypes: string[]
  footwear: string[]
  designerNotes: string
}) {
  return (
    <div style={{ background: '#FAFAF8', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', width: 280, fontFamily: 'Inter, sans-serif' }}>
      {/* Phone chrome */}
      <div style={{ background: '#1A1A1A', padding: '8px 12px 6px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 60, height: 5, borderRadius: 999, background: '#444' }} />
      </div>

      {/* Product image placeholder */}
      <div style={{ aspectRatio: '3/2', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 24, opacity: 0.2 }}>◈</div>
        <div style={{ fontSize: 11, color: SAND }}>Product Image</div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Product name placeholder */}
        <div style={{ height: 12, background: BORDER, borderRadius: 4, marginBottom: 6, width: '70%' }} />
        <div style={{ height: 8, background: SURFACE_2, borderRadius: 4, marginBottom: 16, width: '40%' }} />

        {/* Palette strip */}
        <div style={{ fontSize: 10, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>Colour Palette</div>
        <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: palette.primary, border: `1px solid ${BORDER}` }} />
          {palette.secondary.map((c, i) => (
            <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: c, border: `1px solid ${BORDER}`, marginTop: 4 }} />
          ))}
        </div>

        {/* Matching colors */}
        {matchingColors.length > 0 && (
          <>
            <div style={{ fontSize: 10, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Works With</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
              {matchingColors.slice(0, 4).map((c, i) => (
                <span key={i} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: SURFACE_2, color: TEXT_SEC }}>{c}</span>
              ))}
            </div>
          </>
        )}

        {/* Bottom */}
        {bottomTypes.length > 0 && (
          <>
            <div style={{ fontSize: 10, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Pair With</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
              {bottomTypes.slice(0, 3).map((b, i) => (
                <span key={i} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>{b}</span>
              ))}
            </div>
          </>
        )}

        {/* Footwear */}
        {footwear.length > 0 && (
          <>
            <div style={{ fontSize: 10, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Footwear</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
              {footwear.slice(0, 3).map((f, i) => (
                <span key={i} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: SURFACE_2, color: TEXT_SEC }}>{f}</span>
              ))}
            </div>
          </>
        )}

        {/* Designer notes excerpt */}
        {designerNotes && (
          <>
            <div style={{ fontSize: 10, fontWeight: 700, color: TEXT_SEC, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>Designer Notes</div>
            <div style={{ fontSize: 11, color: TEXT_SEC, lineHeight: 1.5, fontStyle: 'italic' }}>
              {designerNotes.slice(0, 80)}{designerNotes.length > 80 ? '…' : ''}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function StyleGuideEditor({ onNavigate }: Props) {
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [primaryColor, setPrimaryColor] = useState('#7D8470')
  const [secondaryColors] = useState(['#B7AA91', '#EDE8DF'])
  const [accentColors] = useState(['#8C6B52'])
  const [neutralColors] = useState(['#2E2E2E', '#F5F1EA'])

  const [matchingColors, setMatchingColors] = useState<string[]>(['Linen Beige', 'Clay Brown'])
  const [bottomColors, setBottomColors] = useState<string[]>(['Stone Grey', 'Washed Indigo'])
  const [bottomTypes, setBottomTypes] = useState<string[]>(['Wide Leg', 'Linen Pants'])
  const [footwear, setFootwear] = useState<string[]>(['White Sneakers', 'Trail Shoes'])
  const [accessories, setAccessories] = useState<string[]>(['Cap', 'Tote Bag'])
  const [seasons, setSeasons] = useState<string[]>(['Spring', 'Summer'])
  const [occasions, setOccasions] = useState<string[]>(['Daily', 'Weekend', 'City'])
  const [designerNotes, setDesignerNotes] = useState(
    'This guide draws from the natural tones of the Saharan landscape. Layer earthy tones freely — the palette is built to work together. Ground the look with linen or cargo trousers for an editorial ease.'
  )

  const matchingColorOptions = ['Linen Beige', 'Clay Brown', 'Deep Charcoal', 'Stone Grey', 'Washed Indigo', 'Olive', 'Sand']
  const bottomColorOptions = ['Linen Beige', 'Stone Grey', 'Washed Indigo', 'Olive Green', 'Ecru', 'Black', 'Sand']
  const bottomTypeOptions = ['Cargo', 'Wide Leg', 'Straight', 'Linen Pants', 'Denim', 'Shorts']
  const footwearOptions = ['White Sneakers', 'Black Sneakers', 'Brown Boots', 'Canvas Shoes', 'Trail Shoes']
  const accessoryOptions = ['Cap', 'Tote Bag', 'Bracelet', 'Watch', 'Sunglasses']
  const seasonOptions = ['Spring', 'Summer', 'Autumn', 'Winter', 'All Seasons']
  const occasionOptions = ['Daily', 'Travel', 'Mountain', 'Outdoor', 'Weekend', 'City']

  const LOOKS = [
    { title: 'Atlas Morning', desc: 'Layered over linen trousers, worn loose', img: 'photo-1469334031218-e382a71b716b' },
    { title: 'City Ease', desc: 'Tucked into wide-leg trousers, trail shoes', img: 'photo-1516762689617-e1cffcef479d' },
    { title: 'Mountain Pass', desc: 'Cargo pants, canvas shoes, woven tote', img: 'photo-1523381210434-271e8be1f52b' },
  ]

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Sage Collection Style Guide</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>SG-001</span>
            <span style={{ marginLeft: 12 }}>sage-collection · Echoes of Stone</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('style-guides')} style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            ← Back
          </button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: CREAM, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Save Guide
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

        {/* ── Left: main content ─────────────────────────────────────── */}
        <div>

          {/* General */}
          <SectionCard title="General">
            <Field label="Guide Name">
              <input style={inp} defaultValue="Sage Collection Style Guide" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Slug" hint="Used in QR and API URLs">
                <input style={{ ...inp, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }} defaultValue="sage-collection" />
              </Field>
              <Field label="Collection">
                <select style={{ ...inp, cursor: 'pointer' }}>
                  <option>Echoes of Stone</option>
                  <option>Atlas FW25</option>
                  <option>Essentials Permanent</option>
                  <option>Community Lab Vol. 1</option>
                </select>
              </Field>
            </div>
            <Field label="Description">
              <textarea style={{ ...inp, height: 80, resize: 'vertical' }} defaultValue="A styling reference built around the sage and earth tones of the Saharan landscape. Designed for layering across seasons." />
            </Field>
          </SectionCard>

          {/* Color Palette */}
          <SectionCard title="Colour Palette">
            <Field label="Primary Colour" hint="The defining hero colour of this guide">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <ColorSwatch color={primaryColor} label="Primary" onChange={setPrimaryColor} />
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    style={{ ...inp, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
                  />
                  <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 6 }}>Click the swatch to open the colour picker</div>
                </div>
              </div>
            </Field>

            <Field label="Palette Preview">
              <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '20px 24px' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  <ColorSwatch color={primaryColor} label="Primary" />
                  {secondaryColors.map((c, i) => <ColorSwatch key={i} color={c} label={`Secondary ${i + 1}`} />)}
                  {accentColors.map((c, i) => <ColorSwatch key={i} color={c} label={`Accent ${i + 1}`} />)}
                  {neutralColors.map((c, i) => <ColorSwatch key={i} color={c} label={`Neutral ${i + 1}`} />)}
                  {/* Add colour button */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <button style={{ width: 56, height: 56, borderRadius: 14, border: `2px dashed ${BORDER}`, background: 'transparent', cursor: 'pointer', fontSize: 22, color: TEXT_SEC }}>+</button>
                    <div style={{ fontSize: 10, color: TEXT_SEC }}>Add</div>
                  </div>
                </div>
                {/* Colour bar preview */}
                <div style={{ height: 10, borderRadius: 999, overflow: 'hidden', display: 'flex' }}>
                  {[primaryColor, ...secondaryColors, ...accentColors, ...neutralColors].map((c, i) => (
                    <div key={i} style={{ flex: i === 0 ? 3 : 1, background: c }} />
                  ))}
                </div>
              </div>
            </Field>
          </SectionCard>

          {/* Matching Colors */}
          <SectionCard title="Matching Colours">
            <Field label="Recommended Colours" hint="Select all colours that work well with this palette">
              <PillSelect options={matchingColorOptions} selected={matchingColors} onChange={setMatchingColors} />
            </Field>
          </SectionCard>

          {/* Bottom Recommendations */}
          <SectionCard title="Bottom Recommendations">
            <Field label="Recommended Bottom Colours" hint="Trouser and bottom colours that complement this guide">
              <PillSelect options={bottomColorOptions} selected={bottomColors} onChange={setBottomColors} />
            </Field>
            <Field label="Recommended Bottom Types">
              <PillSelect options={bottomTypeOptions} selected={bottomTypes} onChange={setBottomTypes} />
            </Field>
          </SectionCard>

          {/* Footwear */}
          <SectionCard title="Footwear">
            <Field label="Recommended Footwear">
              <PillSelect options={footwearOptions} selected={footwear} onChange={setFootwear} />
            </Field>
          </SectionCard>

          {/* Accessories */}
          <SectionCard title="Accessories">
            <Field label="Recommended Accessories">
              <PillSelect options={accessoryOptions} selected={accessories} onChange={setAccessories} />
            </Field>
          </SectionCard>

          {/* Seasons */}
          <SectionCard title="Seasons">
            <PillSelect options={seasonOptions} selected={seasons} onChange={setSeasons} />
          </SectionCard>

          {/* Occasions */}
          <SectionCard title="Occasions">
            <PillSelect options={occasionOptions} selected={occasions} onChange={setOccasions} />
          </SectionCard>

          {/* Lookbook */}
          <SectionCard title="Lookbook">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {LOOKS.map((look, i) => (
                <div key={i} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden', background: BG }}>
                  <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                    <img
                      src={`https://images.unsplash.com/${look.img}?w=400&h=500&fit=crop&auto=format`}
                      alt={look.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <input
                      defaultValue={look.title}
                      style={{ ...inp, marginBottom: 6, padding: '7px 10px', fontSize: 12, fontWeight: 500 }}
                    />
                    <textarea
                      defaultValue={look.desc}
                      rows={2}
                      style={{ ...inp, resize: 'none', fontSize: 12, padding: '7px 10px' }}
                    />
                  </div>
                </div>
              ))}
              {/* Add look */}
              <div style={{ border: `2px dashed ${BORDER}`, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', color: TEXT_SEC, minHeight: 200, background: SURFACE_2 }}>
                <span style={{ fontSize: 28 }}>+</span>
                <span style={{ fontSize: 12 }}>Add a look</span>
              </div>
            </div>
          </SectionCard>

          {/* Designer Notes */}
          <SectionCard title="Designer Notes">
            <Field label="Styling Recommendations" hint="Free-form notes shown at the bottom of the QR experience">
              <textarea
                style={{ ...inp, height: 120, resize: 'vertical' }}
                value={designerNotes}
                onChange={e => setDesignerNotes(e.target.value)}
              />
            </Field>
          </SectionCard>

          {/* QR Experience Preview */}
          <SectionCard title="QR Experience Preview">
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 12, lineHeight: 1.6 }}>
                  This is a live preview of how this Style Guide will appear in the QR experience after a customer scans the product tag. The data updates as you edit.
                </div>
                <div style={{ padding: '12px 16px', background: '#EBF0F5', borderRadius: 10, border: `1px solid ${INDIGO}20` }}>
                  <div style={{ fontSize: 11, color: INDIGO, fontWeight: 600, marginBottom: 4 }}>Read-only preview</div>
                  <div style={{ fontSize: 11, color: TEXT_SEC }}>The QR page consumes the Style Guide entity directly. No styling data is stored in the product.</div>
                </div>
              </div>
              <QRPreview
                palette={{ primary: primaryColor, secondary: secondaryColors, accent: accentColors, neutral: neutralColors }}
                matchingColors={matchingColors}
                bottomTypes={bottomTypes}
                footwear={footwear}
                designerNotes={designerNotes}
              />
            </div>
          </SectionCard>
        </div>

        {/* ── Right: sticky panel ──────────────────────────────────────── */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Publish panel */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Publishing</div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Status</span>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as 'draft' | 'published')}
                  style={{ fontSize: 12, padding: '4px 10px', borderRadius: 8, border: `1px solid ${BORDER}`, background: BG, color: TEXT, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Visibility</span>
                <span style={{ fontSize: 12, color: TEXT }}>Public</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Assigned products</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: INDIGO }}>8 products</span>
              </div>
              <button style={{ width: '100%', padding: '10px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
                Save & Publish
              </button>
              <button style={{ width: '100%', padding: '10px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Preview QR →
              </button>
            </div>
          </div>

          {/* Assigned Products */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>Assigned Products</div>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>8</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: 'Tifinagh Frame Tee', sku: 'HRT-001', img: 'photo-1521572163474-6864f9cf17ab' },
                { name: 'Woven Sahara Overshirt', sku: 'HRT-002', img: 'photo-1617196034183-421b4040ed20' },
                { name: 'Atlas Symbol Boxy Tee', sku: 'HRT-003', img: 'photo-1523381210434-271e8be1f52b' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: BG, borderRadius: 9, border: `1px solid ${BORDER}` }}>
                  <div style={{ width: 32, height: 38, borderRadius: 7, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={`https://images.unsplash.com/${p.img}?w=64&h=80&fit=crop&auto=format`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: SAND, fontFamily: "'JetBrains Mono', monospace" }}>{p.sku}</div>
                  </div>
                  <button style={{ fontSize: 11, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>↗</button>
                </div>
              ))}
              <div style={{ fontSize: 11, color: TEXT_SEC, textAlign: 'center', paddingTop: 4 }}>+5 more products</div>
              <button style={{ width: '100%', padding: '8px', fontSize: 12, color: TEXT_SEC, border: `1px dashed ${BORDER}`, borderRadius: 8, background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                + Assign product
              </button>
            </div>
          </div>

          {/* Thumbnail */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>Thumbnail</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ aspectRatio: '4/3', borderRadius: 10, overflow: 'hidden', border: `1px solid ${BORDER}`, marginBottom: 10 }}>
                <img
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=280&h=210&fit=crop&auto=format"
                  alt="Guide thumbnail"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <button style={{ width: '100%', padding: '8px', fontSize: 12, color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 8, background: BG, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Change Thumbnail
              </button>
            </div>
          </div>

          {/* Timestamps */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Timestamps</div>
            {[
              { label: 'Created', value: '8 Jun 2026' },
              { label: 'Updated', value: '8 Jul 2026' },
              { label: 'Published', value: '10 Jun 2026' },
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
