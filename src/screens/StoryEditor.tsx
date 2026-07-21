import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'

interface Props { onNavigate: (s: Screen) => void }

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{title}</div>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

const inp: React.CSSProperties = { width: '100%', padding: '9px 13px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif' }

const CONTENT_BLOCKS = [
  { icon: '¶', type: 'Text', content: 'The Tifinagh script is one of the world\'s oldest living writing systems. Each character carries a geometric precision that feels simultaneously ancient and modern — a tension that IZLI has always understood as the heart of Amazigh identity...' },
  { icon: '⬜', type: 'Image', content: 'atlas-workshop-01.jpg — Full width' },
  { icon: '❝', type: 'Quote', content: '"Culture is not a reference. It is a construction method." — IZLI Manifesto' },
  { icon: '⬜', type: 'Gallery', content: '3 images — tifinagh-study-01.jpg, tifinagh-study-02.jpg, tifinagh-study-03.jpg' },
  { icon: '⬡', type: 'Product Spotlight', content: 'Tifinagh Frame Tee — €45 — Heritage · Linked product card' },
  { icon: '◇', type: 'Related Challenge', content: 'Tifinagh Type Challenge — 142 entries · Active' },
]

export default function StoryEditor({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>Indigo as Memory</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>Editorial · Heritage · By Amine Kherrab</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('stories')} style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Back</button>
          <button style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Preview →</button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Publish</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <div>
          <SectionCard title="Basic Info">
            <Field label="Story Title">
              <input style={inp} defaultValue="Indigo as Memory" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <Field label="Type">
                <select style={{ ...inp, cursor: 'pointer' }}><option>Editorial</option><option>Community</option></select>
              </Field>
              <Field label="Universe">
                <select style={{ ...inp, cursor: 'pointer' }}><option>Heritage</option><option>Essentials</option><option>Studio</option><option>Community Lab</option></select>
              </Field>
              <Field label="Author">
                <select style={{ ...inp, cursor: 'pointer' }}><option>Amine Kherrab</option><option>Lina Meziane</option></select>
              </Field>
            </div>
            <Field label="Story Lede" >
              <textarea style={{ ...inp, height: 80, resize: 'vertical' }} defaultValue="Across North Africa, indigo has been a material of resistance, celebration, and memory. For IZLI, it is also a construction principle." />
            </Field>
          </SectionCard>

          <SectionCard title="Cover Image">
            <div style={{ height: 200, borderRadius: 14, overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#EDE8DF', position: 'relative', marginBottom: 12 }}>
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&h=250&fit=crop&auto=format" alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,47,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button style={{ background: 'rgba(245,241,234,0.92)', border: 'none', borderRadius: 10, padding: '7px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Replace Cover</button>
              </div>
            </div>
            <Field label="Cover Alt Text">
              <input style={inp} defaultValue="Deep indigo fabric folded in natural light, textured surface visible." />
            </Field>
          </SectionCard>

          {/* Content Builder */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Content Builder</div>
          </div>
          {CONTENT_BLOCKS.map((b, i) => (
            <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 18px', marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = INDIGO}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = BORDER}
            >
              <span style={{ fontSize: 14, cursor: 'grab', color: '#B7AA91', marginTop: 2 }}>⠿</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#EFE8DD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: TEXT_SEC, flexShrink: 0 }}>{b.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>{b.type}</div>
                <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.5, maxHeight: 48, overflow: 'hidden' }}>{b.content}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button style={{ fontSize: 11, color: TEXT_SEC, background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 9px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Edit</button>
                <button style={{ fontSize: 11, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
            {['+ Text', '+ Image', '+ Quote', '+ Gallery', '+ Product', '+ CTA', '+ Story', '+ Challenge'].map(label => (
              <button key={label} style={{ padding: '7px 13px', background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{label}</button>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <SectionCard title="Related Links">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { type: 'Collection', name: 'Indigo Memory', sub: '9 products · Published', icon: '⬡', bg: '#E8EDF3' },
                  { type: 'Product', name: 'Washed Indigo Heritage Tee', sub: 'Heritage · €45', icon: '◈', bg: '#EFE8DD' },
                  { type: 'Challenge', name: 'Indigo Dye Archive', sub: '88 entries · Active', icon: '◇', bg: '#F3EDE8' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{r.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: TEXT_SEC, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.type}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: TEXT_SEC }}>{r.sub}</div>
                    </div>
                    <button style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>↗</button>
                  </div>
                ))}
                <button style={{ alignSelf: 'flex-start', fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Link Content</button>
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Theme & Tags">
            <Field label="Themes">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['indigo', 'heritage', 'material', 'memory', 'craft'].map(t => (
                  <span key={t} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 999, background: '#E8EDF3', color: INDIGO, display: 'flex', alignItems: 'center', gap: 5 }}>
                    #{t} <span style={{ cursor: 'pointer', opacity: 0.5 }}>×</span>
                  </span>
                ))}
                <input placeholder="+ Add tag" style={{ border: 'none', background: '#EDE8DF', borderRadius: 999, padding: '4px 12px', fontSize: 12, outline: 'none', color: TEXT_SEC, fontFamily: 'Inter, sans-serif', width: 90 }} />
              </div>
            </Field>
          </SectionCard>

          <SectionCard title="SEO">
            <Field label="SEO Title">
              <input style={inp} defaultValue="Indigo as Memory — IZLI Journal" />
            </Field>
            <Field label="URL Slug">
              <input style={{ ...inp, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }} defaultValue="journal/indigo-as-memory" />
            </Field>
            <Field label="Meta Description">
              <textarea style={{ ...inp, height: 70, resize: 'none' }} defaultValue="Across North Africa, indigo has been a material of resistance and memory. For IZLI, it is also a construction principle." />
            </Field>
          </SectionCard>
        </div>

        {/* Sticky right panel */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Publishing</div>
            </div>
            <div style={{ padding: 20 }}>
              {[
                { l: 'Status', v: 'Published', chip: true },
                { l: 'Type', v: 'Editorial' },
                { l: 'Visibility', v: 'Public' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.l}</span>
                  {r.chip
                    ? <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 9px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>{r.v}</span>
                    : <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{r.v}</span>}
                </div>
              ))}
              <div style={{ marginTop: 4, marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 5 }}>Schedule</div>
                <input type="datetime-local" style={{ ...inp, fontSize: 12 }} />
              </div>
              <button style={{ width: '100%', padding: '9px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>Save & Publish</button>
              <button style={{ width: '100%', padding: '9px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Preview Story →</button>
            </div>
          </div>

          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Performance</div>
            {[{ l: 'Total reads', v: '3,120' }, { l: 'Avg. read time', v: '4 min 20 s' }, { l: 'Shares', v: '84' }].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{s.l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{s.v}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Source</div>
            <div style={{ padding: '10px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Derived from contribution</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginTop: 2 }}>Indigo textile study by Youcef Benali</div>
              <div style={{ fontSize: 11, color: CLAY, marginTop: 4 }}>↗ View original contribution</div>
            </div>
          </div>

          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Timestamps</div>
            {[{ l: 'Created', v: '18 Jun 2026' }, { l: 'Published', v: '18 Jun 2026' }, { l: 'Updated', v: '9 Jul 2026' }].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{t.l}</span>
                <span style={{ fontSize: 12, color: TEXT }}>{t.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
