import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
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

const inp = { width: '100%', padding: '10px 14px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif' }

const PRODUCTS_IN = [
  { name: 'Tifinagh Frame Tee', universe: 'Heritage', price: '€45', image: 'photo-1521572163474-6864f9cf17ab' },
  { name: 'Washed Indigo Heritage Tee', universe: 'Heritage', price: '€45', image: 'photo-1618354691373-d851c5c3a990' },
  { name: 'Amazigh Grid Sweatshirt', universe: 'Heritage', price: '€85', image: 'photo-1503341504253-dff4815485f1' },
]

export default function CollectionEditor({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Echoes of Stone</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>Heritage · 14 products · Published</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('collections')} style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Back</button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save Collection</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <div>
          <SectionCard title="Overview">
            <Field label="Collection Name">
              <input style={inp} defaultValue="Echoes of Stone" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Universe">
                <select style={{ ...inp, cursor: 'pointer' }}><option>Heritage</option><option>Essentials</option><option>Studio</option></select>
              </Field>
              <Field label="Season">
                <input style={inp} defaultValue="SS 2026" />
              </Field>
            </div>
            <Field label="Short Description">
              <textarea style={{ ...inp, height: 80, resize: 'vertical' }} defaultValue="A collection drawn from stone surface memory — weathered Atlas mountains, inscribed rock, mineral bleach." />
            </Field>
          </SectionCard>

          <SectionCard title="Hero & Intro">
            <div style={{ height: 180, background: '#EDE8DF', borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=220&fit=crop&auto=format" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,47,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button style={{ background: 'rgba(245,241,234,0.9)', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Replace Hero Image</button>
              </div>
            </div>
            <Field label="Hero Headline">
              <input style={inp} defaultValue="Echoes of Stone" />
            </Field>
            <Field label="Hero Subtext">
              <textarea style={{ ...inp, height: 72 }} defaultValue="From the weathered face of the Atlas. A collection about permanence, mark-making, and the memory embedded in stone." />
            </Field>
          </SectionCard>

          <SectionCard title="Products in Collection">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {PRODUCTS_IN.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                  <div style={{ width: 40, height: 48, borderRadius: 8, overflow: 'hidden', background: '#D8D0C4', flexShrink: 0 }}>
                    <img src={`https://images.unsplash.com/${p.image}?w=80&h=96&fit=crop&auto=format`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: TEXT_SEC }}>{p.universe} · {p.price}</div>
                  </div>
                  <span style={{ fontSize: 14, cursor: 'grab', color: TEXT_SEC }}>⠿</span>
                  <button style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                </div>
              ))}
            </div>
            <button style={{ fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add Products</button>
          </SectionCard>

          <SectionCard title="Story Links">
            <div style={{ padding: '12px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Story</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>The Geometry of Tifinagh</div>
              <div style={{ fontSize: 11, color: TEXT_SEC }}>Published · 4.2K reads</div>
            </div>
            <button style={{ fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Link Story</button>
          </SectionCard>

          <SectionCard title="Visual Direction">
            <Field label="Color Palette Notes">
              <textarea style={{ ...inp, height: 72 }} defaultValue="Stone grey, mineral white, faded indigo. No saturated colors. Sand and ash only." />
            </Field>
            <Field label="Photography Direction">
              <textarea style={{ ...inp, height: 72 }} defaultValue="Flat lay on concrete. Close-up texture shots. Outdoor Atlas backgrounds. Natural light only." />
            </Field>
          </SectionCard>

          <SectionCard title="SEO">
            <Field label="SEO Title">
              <input style={inp} defaultValue="Echoes of Stone — IZLI Heritage Collection" />
            </Field>
            <Field label="URL Slug">
              <input style={{ ...inp, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }} defaultValue="collections/echoes-of-stone" />
            </Field>
          </SectionCard>
        </div>

        {/* Sticky right */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Publishing</div>
            </div>
            <div style={{ padding: 20 }}>
              {[{ l: 'Status', v: 'Published', chip: true }, { l: 'Visibility', v: 'Public' }, { l: 'Products', v: '14 linked' }].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.l}</span>
                  {r.chip ? <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 9px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>{r.v}</span>
                    : <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{r.v}</span>}
                </div>
              ))}
              <button style={{ width: '100%', padding: '10px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: 4 }}>Save & Publish</button>
            </div>
          </div>

          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Collection Stats</div>
            {[{ l: 'Products', v: '14' }, { l: 'Total inventory', v: '342 units' }, { l: 'Revenue MTD', v: '€18,240' }, { l: 'Avg. sell-through', v: '62%' }].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{s.l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
