import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{title}</div>
        <button style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>···</button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

const inp: React.CSSProperties = { width: '100%', padding: '9px 13px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif' }

const CONTENT_BLOCKS = [
  { type: 'text', icon: '¶', label: 'Rich Text', preview: 'IZLI was born from a simple conviction: that Amazigh heritage is not a reference to be quoted, but a living construction method...' },
  { type: 'image', icon: '⬜', label: 'Image', preview: 'heritage-workshop-01.jpg · Full width' },
  { type: 'quote', icon: '❝', label: 'Pull Quote', preview: '"Culture is not a reference — it is a construction method."' },
  { type: 'story', icon: '◫', label: 'Story Spotlight', preview: 'Linked: The Geometry of Tifinagh' },
  { type: 'products', icon: '⬡', label: 'Product Grid', preview: '4 products · Heritage universe' },
  { type: 'cta', icon: '→', label: 'CTA Block', preview: '"Join the Community" — Button: Become a Member' },
]

const PAGES = ['About', 'Heritage', 'Community', 'Community Lab', 'Shop', 'Collections']

export default function SitePageEditor({ onNavigate: _ }: Props) {
  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>About</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>Site Page · Public · Last updated 5 Jul 2026</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Preview →</button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Publish</button>
        </div>
      </div>

      {/* Page tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: 6, width: 'fit-content' }}>
        {PAGES.map((p, i) => (
          <button key={p} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.12s' }}>{p}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <div>
          <SectionCard title="Hero Section">
            <Field label="Page Title">
              <input style={inp} defaultValue="About IZLI" />
            </Field>
            <Field label="Hero Subtitle">
              <textarea style={{ ...inp, height: 72, resize: 'vertical' }} defaultValue="A menswear brand built at the intersection of Amazigh heritage, cultural craft, and contemporary construction." />
            </Field>
            <Field label="Hero Image">
              <div style={{ height: 140, borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#EDE8DF', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&h=180&fit=crop&auto=format" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,47,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button style={{ background: 'rgba(245,241,234,0.92)', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Replace</button>
                </div>
              </div>
            </Field>
          </SectionCard>

          {/* Content blocks */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Content Blocks</div>
          </div>
          {CONTENT_BLOCKS.map((b, i) => (
            <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 18px', marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = INDIGO}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = BORDER}
            >
              <span style={{ fontSize: 14, cursor: 'grab', color: '#B7AA91', marginTop: 2 }}>⠿</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#EFE8DD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: TEXT_SEC, flexShrink: 0 }}>{b.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>{b.label}</div>
                <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.preview}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button style={{ fontSize: 11, color: TEXT_SEC, background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 9px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Edit</button>
                <button style={{ fontSize: 11, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>✕</button>
              </div>
            </div>
          ))}
          <button style={{ width: '100%', padding: '12px', background: 'transparent', border: `2px dashed ${BORDER}`, borderRadius: 14, fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: 4 }}>
            + Add Block
          </button>
        </div>

        {/* Right panel */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Publishing</div>
            </div>
            <div style={{ padding: 20 }}>
              {[{ l: 'Status', v: 'Published', chip: true }, { l: 'Visibility', v: 'Public' }, { l: 'URL', v: '/about' }].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.l}</span>
                  {r.chip
                    ? <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 9px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>{r.v}</span>
                    : <span style={{ fontSize: 12, fontWeight: 500, color: TEXT, fontFamily: r.l === 'URL' ? "'JetBrains Mono', monospace" : 'inherit' }}>{r.v}</span>}
                </div>
              ))}
              <button style={{ width: '100%', padding: '9px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Publish Changes</button>
            </div>
          </div>

          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>SEO</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 5 }}>SEO Title</div>
              <input style={{ ...inp, fontSize: 12 }} defaultValue="About IZLI — Contemporary Amazigh Menswear" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 5 }}>URL Slug</div>
              <input style={{ ...inp, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} defaultValue="/about" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 5 }}>Meta Description</div>
              <textarea style={{ ...inp, height: 72, fontSize: 12, resize: 'none' }} defaultValue="IZLI is a contemporary menswear brand rooted in Amazigh heritage — fashion, community, and cultural archive." />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
