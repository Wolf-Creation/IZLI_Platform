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
  width: '100%', padding: '10px 14px', border: `1px solid ${BORDER}`, borderRadius: 10,
  background: BG, fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
}

function PillSelect({ options, selected, onChange }: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (val: string) => onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val])
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
      {options.map(opt => {
        const active = selected.includes(opt)
        return (
          <button key={opt} onClick={() => toggle(opt)} style={{
            padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
            border: `1px solid ${active ? INDIGO : BORDER}`,
            background: active ? INDIGO : 'transparent',
            color: active ? CREAM : TEXT_SEC,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 120ms ease',
          }}>{opt}</button>
        )
      })}
    </div>
  )
}

function CheckboxGrid({ options, selected, onChange }: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (val: string) => onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val])
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
      {options.map(opt => {
        const checked = selected.includes(opt)
        return (
          <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px', borderRadius: 10, border: `1px solid ${checked ? INDIGO : BORDER}`, background: checked ? '#EBF0F5' : BG, cursor: 'pointer' }}>
            <input type="checkbox" checked={checked} onChange={() => toggle(opt)} style={{ accentColor: INDIGO, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: checked ? INDIGO : TEXT, fontWeight: checked ? 500 : 400 }}>{opt}</span>
          </label>
        )
      })}
    </div>
  )
}

function EntityPickerRow({ icon, name, sub, onRemove }: { icon: string; name: string; sub: string; onRemove: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: BG, borderRadius: 9, border: `1px solid ${BORDER}`, marginBottom: 8 }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: SURFACE_2, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: TEXT_SEC, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: 11, color: SAND, fontFamily: "'JetBrains Mono', monospace" }}>{sub}</div>
      </div>
      <button onClick={onRemove} style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}>✕</button>
    </div>
  )
}

function SearchAddBar({ placeholder }: { placeholder: string }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: SAND }}>⌕</span>
      <input placeholder={placeholder} style={{ ...inp, padding: '8px 10px 8px 28px', fontSize: 12 }} />
    </div>
  )
}

// ── Preview card ─────────────────────────────────────────────────────────────
function PreviewCard({ label, products }: { label: string; products: { name: string; img: string }[] }) {
  return (
    <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {products.map((p, i) => (
            <div key={i} style={{ flexShrink: 0, width: 100 }}>
              <div style={{ width: 100, height: 130, borderRadius: 10, overflow: 'hidden', marginBottom: 6, background: SURFACE }}>
                <img src={`https://images.unsplash.com/${p.img}?w=200&h=260&fit=crop&auto=format`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: 11, color: TEXT, fontWeight: 500, lineHeight: 1.3 }}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SAMPLE_PRODUCTS = [
  { name: 'Tifinagh Frame Tee', img: 'photo-1521572163474-6864f9cf17ab' },
  { name: 'Woven Overshirt', img: 'photo-1617196034183-421b4040ed20' },
  { name: 'Atlas Boxy Tee', img: 'photo-1523381210434-271e8be1f52b' },
  { name: 'Sahara Cargo', img: 'photo-1469334031218-e382a71b716b' },
]

export default function RecommendationHubEditor({ onNavigate }: Props) {
  const [status, setStatus] = useState<'active' | 'draft'>('draft')
  const [recTypes, setRecTypes] = useState(['complete-your-style', 'explore-collection'])
  const [locations, setLocations] = useState(['Product Detail', 'Collection Page', 'QR Experience'])
  const [triggers, setTriggers] = useState(['Viewing Product', 'Viewing Collection'])
  const [rules, setRules] = useState(['manual', 'same-style-guide'])
  const [layout, setLayout] = useState('carousel')
  const [linkedProducts, setLinkedProducts] = useState([
    { name: 'Tifinagh Frame Tee', sub: 'PRD-001', icon: '◈' },
    { name: 'Woven Sahara Overshirt', sub: 'PRD-002', icon: '◈' },
    { name: 'Atlas Symbol Boxy Tee', sub: 'PRD-003', icon: '◈' },
  ])
  const [linkedCollections] = useState([{ name: 'Echoes of Stone', sub: 'COL-001', icon: '⬡' }])
  const [linkedStories] = useState([{ name: 'The Geometry of Tifinagh', sub: 'STR-001', icon: '◫' }])
  const [linkedStyleGuides] = useState([{ name: 'Sage Collection Style Guide', sub: 'SG-001', icon: '◎' }])

  const recTypeOptions = ['Complete Your Style', 'Explore Collection', 'Discover Story', 'Heritage Journey', 'Recommended Products', 'New Arrivals', 'Community Favorites', 'Seasonal Picks', "Editor's Selection", 'Best Sellers', 'You May Also Like', 'Related Heritage', 'Related Stories', 'Related Challenges']
  const locationOptions = ['Website Home', 'Product Detail', 'Collection Page', 'Story Page', 'Heritage Page', 'Community Page', 'Community Lab', 'QR Experience', 'Search Results', 'Future Mobile App']
  const triggerOptions = ['Viewing Product', 'Viewing Collection', 'Viewing Story', 'Viewing Heritage', 'Viewing Challenge', 'Viewing Community Project', 'Viewing QR Page', 'Viewing Category', 'Viewing Search Results']
  const ruleOptions = ['Manual Selection', 'Same Collection', 'Same Style Guide', 'Same Heritage Theme', 'Same Color Palette', 'Same Category', 'Same Tags', 'Newest Products', 'Most Popular', "Editor's Choice", 'Community Favorites', 'Best Sellers', 'AI Recommendations (soon)']

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Complete Your Style</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>RH-001</span>
            <span style={{ marginLeft: 12 }}>complete-your-style · Style + Products</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('recommendation-hub')} style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            ← Back
          </button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: CREAM, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Save Hub
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

        {/* ── Left ── */}
        <div>

          {/* General */}
          <SectionCard title="General">
            <Field label="Hub Name">
              <input style={inp} defaultValue="Complete Your Style" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Slug" hint="Used in API and URL references">
                <input style={{ ...inp, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }} defaultValue="complete-your-style" />
              </Field>
              <Field label="Visibility">
                <select style={{ ...inp, cursor: 'pointer' }}>
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </Field>
            </div>
            <Field label="Description">
              <textarea style={{ ...inp, height: 80, resize: 'vertical' }} defaultValue="A curated recommendation set that helps customers complete their look after viewing a hero product. Combines style guide, matching bottoms, and editorial story." />
            </Field>
          </SectionCard>

          {/* Recommendation Types */}
          <SectionCard title="Recommendation Type" subtitle="Select all content categories this hub serves">
            <PillSelect options={recTypeOptions} selected={recTypes} onChange={setRecTypes} />
          </SectionCard>

          {/* Display Locations */}
          <SectionCard title="Display Locations" subtitle="Choose where this hub can appear across the platform">
            <CheckboxGrid options={locationOptions} selected={locations} onChange={setLocations} />
          </SectionCard>

          {/* Trigger Rules */}
          <SectionCard title="Trigger Rules" subtitle="Define when this recommendation becomes active">
            <PillSelect options={triggerOptions} selected={triggers} onChange={setTriggers} />
          </SectionCard>

          {/* Resource Relationships */}
          <SectionCard title="Resource Relationships" subtitle="Link any resources across the IZLI Content Graph">

            {/* Products */}
            <Field label="Products">
              {linkedProducts.map((p, i) => (
                <EntityPickerRow key={i} {...p} onRemove={() => setLinkedProducts(prev => prev.filter((_, j) => j !== i))} />
              ))}
              <SearchAddBar placeholder="Search products to link…" />
            </Field>

            {/* Collections */}
            <Field label="Collections">
              {linkedCollections.map((c, i) => (
                <EntityPickerRow key={i} {...c} onRemove={() => {}} />
              ))}
              <SearchAddBar placeholder="Search collections to link…" />
            </Field>

            {/* Stories */}
            <Field label="Stories">
              {linkedStories.map((s, i) => (
                <EntityPickerRow key={i} {...s} onRemove={() => {}} />
              ))}
              <SearchAddBar placeholder="Search stories to link…" />
            </Field>

            {/* Style Guides */}
            <Field label="Style Guides">
              {linkedStyleGuides.map((sg, i) => (
                <EntityPickerRow key={i} {...sg} onRemove={() => {}} />
              ))}
              <SearchAddBar placeholder="Search style guides to link…" />
            </Field>

            {/* Other entity pickers */}
            {[
              { label: 'Heritage Articles', placeholder: 'Search heritage articles…' },
              { label: 'Community Challenges', placeholder: 'Search challenges…' },
              { label: 'Community Lab Projects', placeholder: 'Search lab projects…' },
              { label: 'Events', placeholder: 'Search events…' },
            ].map(({ label, placeholder }) => (
              <Field key={label} label={label}>
                <SearchAddBar placeholder={placeholder} />
              </Field>
            ))}
          </SectionCard>

          {/* Recommendation Rules */}
          <SectionCard title="Recommendation Rules" subtitle="Define how content is selected and ranked">
            <PillSelect options={ruleOptions} selected={rules} onChange={setRules} />
          </SectionCard>

          {/* Display Settings */}
          <SectionCard title="Display Settings">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Layout">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { value: 'carousel', label: 'Carousel', desc: 'Horizontal scrolling cards' },
                    { value: 'grid', label: 'Grid', desc: 'Even 2–4 column grid' },
                    { value: 'editorial-cards', label: 'Editorial Cards', desc: 'Large featured layout' },
                    { value: 'compact-list', label: 'Compact List', desc: 'Dense text-heavy rows' },
                  ].map(opt => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 10, border: `1px solid ${layout === opt.value ? INDIGO : BORDER}`, background: layout === opt.value ? '#EBF0F5' : BG, cursor: 'pointer' }}>
                      <input type="radio" name="layout" value={opt.value} checked={layout === opt.value} onChange={() => setLayout(opt.value)} style={{ accentColor: INDIGO, marginTop: 2 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: layout === opt.value ? INDIGO : TEXT }}>{opt.label}</div>
                        <div style={{ fontSize: 11, color: TEXT_SEC }}>{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </Field>
              <div>
                <Field label="Number of Items">
                  <input type="number" defaultValue={6} min={1} max={24} style={inp} />
                </Field>
                <Field label="Card Size">
                  <select style={{ ...inp, cursor: 'pointer' }}>
                    <option>Small</option>
                    <option selected>Medium</option>
                    <option>Large</option>
                  </select>
                </Field>
                <Field label="Sorting">
                  <select style={{ ...inp, cursor: 'pointer' }}>
                    <option>Manual</option>
                    <option>Newest</option>
                    <option>Popularity</option>
                    <option>Random</option>
                    <option>Custom Order</option>
                  </select>
                </Field>
              </div>
            </div>
          </SectionCard>

          {/* Preview */}
          <SectionCard title="Preview" subtitle="Live preview of how this hub renders in each placement. Uses placeholder data.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <PreviewCard label="Product Detail Preview" products={SAMPLE_PRODUCTS} />
              <PreviewCard label="Collection Page Preview" products={SAMPLE_PRODUCTS.slice(0, 3)} />
              <PreviewCard label="QR Experience Preview" products={SAMPLE_PRODUCTS.slice(0, 2)} />
            </div>
          </SectionCard>

          {/* Analytics */}
          <SectionCard title="Analytics" subtitle="Performance metrics — placeholder values. Live data connects at publish.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'Impressions', value: '24,810', note: 'Total views' },
                { label: 'Clicks', value: '3,204', note: 'Total interactions' },
                { label: 'CTR', value: '12.9%', note: 'Click-through rate' },
                { label: 'Conversion', value: '4.2%', note: 'Add-to-cart rate' },
                { label: 'Purchases', value: '138', note: 'Orders attributed' },
                { label: 'QR Visits', value: '892', note: 'Scans → hub views' },
              ].map((stat, i) => (
                <div key={i} style={{ padding: '16px 18px', background: BG, border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>{stat.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 500, color: INDIGO, fontFamily: "'Playfair Display', serif", marginBottom: 2 }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: SAND }}>{stat.note}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* ── Right sticky panel ── */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Publishing */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Publishing</div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Status</span>
                <select value={status} onChange={e => setStatus(e.target.value as 'active' | 'draft')} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 8, border: `1px solid ${BORDER}`, background: BG, color: TEXT, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Visibility</span>
                <span style={{ fontSize: 12, color: TEXT }}>Public</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Placements</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: INDIGO }}>{locations.length} locations</span>
              </div>
              <button style={{ width: '100%', padding: '10px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
                Save & Activate
              </button>
              <button style={{ width: '100%', padding: '10px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Preview Placements
              </button>
            </div>
          </div>

          {/* Linked Entities Summary */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>Content Graph</div>
            </div>
            <div style={{ padding: '12px 16px' }}>
              {[
                { icon: '◈', label: 'Products', count: linkedProducts.length },
                { icon: '⬡', label: 'Collections', count: 1 },
                { icon: '◫', label: 'Stories', count: 1 },
                { icon: '◎', label: 'Style Guides', count: 1 },
                { icon: '◯', label: 'Challenges', count: 0 },
                { icon: '▦', label: 'Display Locations', count: locations.length },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 10, borderBottom: i < 5 ? `1px solid ${BORDER}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: TEXT_SEC }}>{row.icon}</span>
                    <span style={{ fontSize: 12, color: TEXT_SEC }}>{row.label}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: row.count > 0 ? INDIGO : SAND }}>{row.count > 0 ? row.count : '—'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timestamps */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Timestamps</div>
            {[
              { label: 'Created', value: '10 Jun 2026' },
              { label: 'Updated', value: '10 Jul 2026' },
              { label: 'Activated', value: '12 Jun 2026' },
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
