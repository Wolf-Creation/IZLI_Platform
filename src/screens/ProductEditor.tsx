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
      <div style={{ padding: '18px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
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
      {hint && <div style={{ fontSize: 11, color: '#B7AA91', marginTop: 4 }}>{hint}</div>}
    </div>
  )
}

const input = {
  width: '100%',
  padding: '10px 14px',
  border: `1px solid ${BORDER}`,
  borderRadius: 10,
  background: '#EDE8DF',
  fontSize: 13,
  color: TEXT,
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
}

function RelationCard({ type, title, subtitle, accent }: { type: string; title: string; subtitle: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
        {type === 'story' ? '◫' : type === 'collection' ? '⬡' : '◇'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC }}>{type}</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{title}</div>
        <div style={{ fontSize: 11, color: TEXT_SEC }}>{subtitle}</div>
      </div>
      <button style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>↗</button>
    </div>
  )
}

export default function ProductEditor({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>Tifinagh Frame Tee</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>SKU-2024-HRT-001</span>
            <span style={{ marginLeft: 12 }}>Heritage · Echoes of Stone</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('products')} style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            ← Back
          </button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Publish
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        {/* Main */}
        <div>
          <SectionCard title="Basic Info">
            <Field label="Product Name">
              <input style={input} defaultValue="Tifinagh Frame Tee" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <Field label="Universe">
                <select style={{ ...input, cursor: 'pointer' }}>
                  <option>Heritage</option><option>Essentials</option><option>Studio</option><option>Community Lab</option>
                </select>
              </Field>
              <Field label="Price">
                <input style={input} defaultValue="€45.00" />
              </Field>
              <Field label="Compare At">
                <input style={input} defaultValue="€55.00" />
              </Field>
            </div>
            <Field label="Short Description" hint="Shown in product cards and collection grids">
              <textarea style={{ ...input, height: 72, resize: 'vertical' }} defaultValue="A structured tee featuring archival Tifinagh geometry, screen-printed in faded indigo on washed natural cotton." />
            </Field>
          </SectionCard>

          <SectionCard title="Variants">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { size: 'XS', stock: 4 }, { size: 'S', stock: 12 }, { size: 'M', stock: 18 },
                { size: 'L', stock: 8 }, { size: 'XL', stock: 4 }, { size: 'XXL', stock: 2 },
              ].map(v => (
                <div key={v.size} style={{ border: `1px solid ${BORDER}`, borderRadius: 10, padding: '12px 16px', background: '#EDE8DF' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 6 }}>{v.size}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: TEXT_SEC }}>Stock</span>
                    <input defaultValue={v.stock} style={{ width: 50, padding: '4px 8px', border: `1px solid ${BORDER}`, borderRadius: 6, background: '#F5F1EA', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", outline: 'none', color: TEXT }} />
                  </div>
                </div>
              ))}
            </div>
            <button style={{ marginTop: 14, fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add Color Variant</button>
          </SectionCard>

          <SectionCard title="Media">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
              {[
                'photo-1521572163474-6864f9cf17ab',
                'photo-1618354691373-d851c5c3a990',
                'photo-1503341504253-dff4815485f1',
              ].map((id, i) => (
                <div key={i} style={{ aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}`, position: 'relative', background: '#EDE8DF' }}>
                  <img src={`https://images.unsplash.com/${id}?w=200&h=267&fit=crop&auto=format`} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {i === 0 && <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 10, fontWeight: 600, background: INDIGO, color: '#E7DFD2', padding: '2px 7px', borderRadius: 6 }}>Cover</span>}
                </div>
              ))}
              <div style={{ aspectRatio: '3/4', borderRadius: 12, border: `2px dashed ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', color: TEXT_SEC, background: '#EDE8DF' }}>
                <span style={{ fontSize: 22 }}>+</span>
                <span style={{ fontSize: 11 }}>Add media</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Description & Storytelling">
            <Field label="Long Story" hint="Narrative description — shown on the product page editorial section">
              <textarea style={{ ...input, height: 140, resize: 'vertical' }} defaultValue="The Tifinagh Frame Tee draws from archival plates of traditional Amazigh script found across the Atlas mountains. Each letterform has been isolated, enlarged, and centered — creating a graphic study of a living script." />
            </Field>
          </SectionCard>

          <SectionCard title="Material / Fit / Construction">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Material">
                <input style={input} defaultValue="100% Washed Organic Cotton" />
              </Field>
              <Field label="Fit">
                <select style={{ ...input, cursor: 'pointer' }}>
                  <option>Regular</option><option>Boxy</option><option>Oversized</option><option>Slim</option>
                </select>
              </Field>
              <Field label="Finish">
                <input style={input} defaultValue="Enzyme-washed, pre-shrunk" />
              </Field>
              <Field label="Weight">
                <input style={input} defaultValue="210 gsm" />
              </Field>
            </div>
            <Field label="Construction Notes">
              <textarea style={{ ...input, height: 80, resize: 'vertical' }} defaultValue="Reinforced side seams. Cover-stitched hem and sleeves. Screen-printed with water-based inks in Portugal." />
            </Field>
            <Field label="Garment Details">
              <textarea style={{ ...input, height: 72 }} defaultValue="Crew neck · Short sleeve · Dropped shoulder · Unisex sizing" />
            </Field>
          </SectionCard>

          <SectionCard title="Related Content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <RelationCard type="story" title="The Geometry of Tifinagh" subtitle="Published · 4.2K reads" accent="#EFE8DD" />
              <RelationCard type="collection" title="Echoes of Stone" subtitle="14 products · Published" accent="#E8EDF3" />
              <RelationCard type="challenge" title="Tifinagh Type Challenge" subtitle="142 entries · Active" accent="#F3EDE8" />
              <button style={{ alignSelf: 'flex-start', marginTop: 4, fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Link Content</button>
            </div>
          </SectionCard>

          <SectionCard title="SEO">
            <Field label="SEO Title">
              <input style={input} defaultValue="Tifinagh Frame Tee — IZLI Heritage Collection" />
            </Field>
            <Field label="Meta Description">
              <textarea style={{ ...input, height: 72 }} defaultValue="Premium washed cotton tee featuring archival Tifinagh geometry. Part of the IZLI Heritage collection." />
            </Field>
            <Field label="URL Slug">
              <input style={{ ...input, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }} defaultValue="tifinagh-frame-tee" />
            </Field>
          </SectionCard>
        </div>

        {/* Sticky right panel */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Publish panel */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Publishing</div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Status</span>
                <span style={{ fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>Published</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Visibility</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>Public</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Channel</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>Online Store</span>
              </div>
              <button style={{ width: '100%', padding: '10px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>Save & Publish</button>
              <button style={{ width: '100%', padding: '10px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Preview →</button>
            </div>
          </div>

          {/* Product Passport — read-only */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>Product Passport</div>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>Active</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              {/* Mini QR */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
                <div style={{ background: 'white', padding: 5, borderRadius: 6, border: `1px solid ${BORDER}` }}>
                  <svg width={36} height={36} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="7" height="7" fill="#1E2F44" rx="1"/><rect x="1" y="1" width="5" height="5" fill="white" rx="0.5"/><rect x="2" y="2" width="3" height="3" fill="#1E2F44" rx="0.3"/>
                    <rect x="14" y="0" width="7" height="7" fill="#1E2F44" rx="1"/><rect x="15" y="1" width="5" height="5" fill="white" rx="0.5"/><rect x="16" y="2" width="3" height="3" fill="#1E2F44" rx="0.3"/>
                    <rect x="0" y="14" width="7" height="7" fill="#1E2F44" rx="1"/><rect x="1" y="15" width="5" height="5" fill="white" rx="0.5"/><rect x="2" y="16" width="3" height="3" fill="#1E2F44" rx="0.3"/>
                    <rect x="9" y="0" width="1" height="1" fill="#1E2F44"/><rect x="11" y="0" width="1" height="1" fill="#1E2F44"/><rect x="13" y="0" width="1" height="1" fill="#1E2F44"/>
                    <rect x="9" y="2" width="1" height="1" fill="#1E2F44"/><rect x="11" y="2" width="1" height="1" fill="#1E2F44"/>
                    <rect x="9" y="4" width="1" height="1" fill="#1E2F44"/><rect x="12" y="4" width="1" height="1" fill="#1E2F44"/>
                    <rect x="9" y="9" width="1" height="1" fill="#1E2F44"/><rect x="11" y="9" width="1" height="1" fill="#1E2F44"/><rect x="13" y="9" width="1" height="1" fill="#1E2F44"/>
                    <rect x="9" y="11" width="1" height="1" fill="#1E2F44"/><rect x="11" y="11" width="1" height="1" fill="#1E2F44"/>
                    <rect x="9" y="13" width="1" height="1" fill="#1E2F44"/><rect x="12" y="13" width="1" height="1" fill="#1E2F44"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: TEXT, fontFamily: "'JetBrains Mono', monospace" }}>IZLI-2026-000125</div>
                  <div style={{ fontSize: 10, color: '#506681', fontFamily: "'JetBrains Mono', monospace' " }}>izli.co/p/hrt-001</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ flex: 1, padding: '7px', fontSize: 11, color: '#1E2F44', border: `1px solid ${BORDER}`, borderRadius: 8, background: '#EDE8DF', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Open ↗
                </button>
                <button style={{ flex: 1, padding: '7px', fontSize: 11, color: '#506681', border: `1px solid ${BORDER}`, borderRadius: 8, background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  ⬇ QR
                </button>
                <button style={{ flex: 1, padding: '7px', fontSize: 11, color: '#506681', border: `1px solid ${BORDER}`, borderRadius: 8, background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  🖨 Print
                </button>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Timestamps</div>
            {[
              { label: 'Created', value: '12 Mar 2026' },
              { label: 'Updated', value: '8 Jul 2026' },
              { label: 'Published', value: '15 Mar 2026' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{t.label}</span>
                <span style={{ fontSize: 12, color: TEXT }}>{t.value}</span>
              </div>
            ))}
          </div>

          {/* Style Guide picker */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>Style Guide</div>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>Linked</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ padding: '10px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: '#7D8470', border: `1px solid ${BORDER}`, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>Sage Collection</div>
                </div>
                <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
                  {['#7D8470','#B7AA91','#EDE8DF','#2E2E2E'].map((c, i) => (
                    <div key={i} style={{ width: 14, height: 14, borderRadius: 999, background: c, border: `1px solid rgba(0,0,0,0.08)` }} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ fontSize: 11, color: '#1E2F44', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0, fontWeight: 500 }}>
                    Edit guide ↗
                  </button>
                  <span style={{ color: '#D8D0C4' }}>·</span>
                  <button style={{ fontSize: 11, color: '#506681', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0 }}>
                    Unlink
                  </button>
                </div>
              </div>
              <div style={{ position: 'relative', marginBottom: 8 }}>
                <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#B7AA91' }}>⌕</span>
                <input
                  placeholder="Search style guides…"
                  style={{ width: '100%', padding: '7px 10px 7px 26px', border: `1px solid ${BORDER}`, borderRadius: 8, background: '#EDE8DF', fontSize: 12, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' as const }}
                />
              </div>
              <button style={{ width: '100%', padding: '7px', fontSize: 12, color: '#506681', border: `1px dashed ${BORDER}`, borderRadius: 8, background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                + Create new style guide
              </button>
            </div>
          </div>

          {/* Recommendation Hub picker */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>Recommendation Hub</div>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>Linked</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ padding: '10px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: '#E8EDF3', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#1E2F44', flexShrink: 0 }}>◈</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>Complete Your Style</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                  {['Products', 'Style Guide', 'Story'].map((tag, i) => (
                    <span key={i} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#EFE8DD', color: '#506681' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ fontSize: 11, color: '#1E2F44', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0, fontWeight: 500 }}>
                    Edit hub ↗
                  </button>
                  <span style={{ color: '#D8D0C4' }}>·</span>
                  <button style={{ fontSize: 11, color: '#506681', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0 }}>
                    Unlink
                  </button>
                </div>
              </div>
              <div style={{ position: 'relative', marginBottom: 8 }}>
                <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#B7AA91' }}>⌕</span>
                <input
                  placeholder="Search recommendation hubs…"
                  style={{ width: '100%', padding: '7px 10px 7px 26px', border: `1px solid ${BORDER}`, borderRadius: 8, background: '#EDE8DF', fontSize: 12, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' as const }}
                />
              </div>
              <button style={{ width: '100%', padding: '7px', fontSize: 12, color: '#506681', border: `1px dashed ${BORDER}`, borderRadius: 8, background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                + Create new hub
              </button>
            </div>
          </div>

          {/* Production Template picker */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>Production Template</div>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>Linked</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ padding: '10px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: TEXT, marginBottom: 4 }}>Oversized T-Shirt</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                  {['Hang Tag', 'QR Label', 'Neck Print', 'Care Label'].map((tag, i) => (
                    <span key={i} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#EFE8DD', color: '#506681' }}>{tag}</span>
                  ))}
                  <span style={{ fontSize: 10, color: '#B7AA91' }}>+4 more</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ fontSize: 11, color: '#1E2F44', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0, fontWeight: 500 }}>
                    Edit template ↗
                  </button>
                  <span style={{ color: '#D8D0C4' }}>·</span>
                  <button style={{ fontSize: 11, color: '#4A7A5A', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0, fontWeight: 500 }}>
                    Generate Assets
                  </button>
                </div>
              </div>
              <div style={{ position: 'relative', marginBottom: 8 }}>
                <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#B7AA91' }}>⌕</span>
                <input
                  placeholder="Search templates…"
                  style={{ width: '100%', padding: '7px 10px 7px 26px', border: `1px solid ${BORDER}`, borderRadius: 8, background: '#EDE8DF', fontSize: 12, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' as const }}
                />
              </div>
              <button style={{ width: '100%', padding: '7px', fontSize: 12, color: '#506681', border: `1px dashed ${BORDER}`, borderRadius: 8, background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Open Production Center ↗
              </button>
            </div>
          </div>

          {/* Linked collection */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Linked Collection</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#E8EDF3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⬡</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>Echoes of Stone</div>
                <div style={{ fontSize: 11, color: TEXT_SEC }}>14 products</div>
              </div>
            </div>
          </div>

          {/* Linked story */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Linked Story</div>
            <div style={{ padding: '10px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>The Geometry of Tifinagh</div>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>Published · 4.2K reads</div>
              <div style={{ fontSize: 11, color: CLAY, marginTop: 4 }}>↗ Open story</div>
            </div>
          </div>

          {/* Challenge */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Linked Challenge</div>
            <div style={{ padding: '10px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>Tifinagh Type Challenge</div>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>Active · 142 entries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
