import { useMemo, useState } from 'react'
import type { Screen } from '../types'
import {
  BG, BORDER, CLAY, CREAM, FONT_MONO, FONT_SANS, FONT_SERIF, INDIGO, RADIUS, SAGE,
  SURFACE, SURFACE_2, TEXT, TEXT_SEC,
} from '../shared/theme/tokens'

type SectionId = 'overview' | 'foundations' | 'tokens' | 'typography' | 'colors' | 'ui' | 'business' | 'website' | 'admin' | 'legacy' | 'production' | 'graph' | 'patterns' | 'motion' | 'accessibility' | 'changelog'

interface Props { onNavigate: (screen: Screen) => void }
interface DocItem { name: string; description: string; tags: string[]; status?: string }
type RenderItem = DocItem & { id: SectionId; section?: string }

const sections: { id: SectionId; label: string; kicker: string; description: string; items: DocItem[] }[] = [
  { id: 'overview', label: 'Overview', kicker: 'IZLI / 01', description: 'The official, living reference for every reusable decision across the IZLI ecosystem.', items: [
    { name: 'One visual language', description: 'A shared editorial system for Website, Admin, Legacy, Community, Production, QR and future mobile surfaces.', tags: ['Principle', 'Foundation'] },
    { name: 'Relationship first', description: 'Entities, people, places, products and stories should reveal the connections that give them meaning.', tags: ['Principle', 'Content graph'] },
    { name: 'Calm utility', description: 'Premium warmth and clear information hierarchy make complex operational work feel considered.', tags: ['Principle', 'Admin'] },
  ] },
  { id: 'foundations', label: 'Foundations', kicker: 'Foundation / 01', description: 'Brand personality, visual language, responsive strategy and naming conventions.', items: [
    { name: 'Editorial warmth', description: 'Quiet museum-paper surfaces, measured indigo, and deliberate whitespace carry a premium editorial character.', tags: ['Visual language'] },
    { name: 'Responsive strategy', description: 'Start with a stable desktop working canvas; let documentation cards collapse from 3 → 2 → 1 columns below 1100px and 720px.', tags: ['Responsive'] },
    { name: 'Naming conventions', description: 'Use concise PascalCase component names and feature-prefixed variants: AdminTable, LegacyBadge, ProductionAssetCard.', tags: ['Developer notes'] },
  ] },
  { id: 'tokens', label: 'Design Tokens', kicker: 'Foundation / 02', description: 'Platform values used by components, layouts and interactions.', items: [
    { name: 'Spacing scale', description: '4px base rhythm from space-1 through space-24. Prefer token steps rather than custom gaps.', tags: ['Token', 'Layout'] },
    { name: 'Elevation & borders', description: 'Hairline sand borders define structure; shadow is reserved for raised, transient or interactive layers.', tags: ['Token', 'Surface'] },
    { name: 'Motion & layers', description: '100–300ms transitions, ease-out entrances, and purposeful z-index tiers keep operational UI composed.', tags: ['Token', 'Motion'] },
  ] },
  { id: 'typography', label: 'Typography', kicker: 'Foundation / 03', description: 'A three-voice hierarchy: literary display, neutral reading, and structural metadata.', items: [
    { name: 'Display & hero', description: 'Playfair Display, 40–56px, medium weight. Use for page identity and editorial moments—not dense controls.', tags: ['Playfair Display', 'Display'] },
    { name: 'Headings & body', description: 'Inter creates legible hierarchy from 28px section headings to 12px supporting metadata.', tags: ['Inter', 'Reading'] },
    { name: 'Labels & data', description: 'JetBrains Mono anchors tokens, status, timestamps and compact system labels.', tags: ['JetBrains Mono', 'Metadata'] },
  ] },
  { id: 'colors', label: 'Colors', kicker: 'Foundation / 04', description: 'Warm light surfaces paired with ink-like indigo, grounded neutrals and semantic feedback.', items: [
    { name: 'Core palette', description: 'Indigo drives primary actions; paper, cream and sand create quiet depth; clay introduces editorial emphasis.', tags: ['Color', 'Brand'] },
    { name: 'Semantic palette', description: 'Sage for success, clay for review, restrained red for destructive error, and indigo for information.', tags: ['Color', 'Status'] },
  ] },
  { id: 'ui', label: 'UI Components', kicker: 'Components / 01', description: 'Shared primitives that make workflows predictable across every IZLI surface.', items: [
    { name: 'Buttons & actions', description: 'Primary, secondary, quiet and destructive actions; always expose a clear focus treatment and 40px minimum target.', tags: ['Button', 'Interactive'] },
    { name: 'Inputs & selection', description: 'Input, text area, select, autocomplete, checkbox, radio, switch, date and color picker.', tags: ['Forms', 'Interactive'] },
    { name: 'Feedback & overlay', description: 'Tags, badges, tooltips, dialogs, drawers, modals, notifications, progress and loaders.', tags: ['Feedback', 'Overlay'] },
    { name: 'Data display', description: 'Cards, tables, charts, timeline, pagination, avatars, skeletons and rich-text editor.', tags: ['Data', 'Content'] },
  ] },
  { id: 'business', label: 'Business Components', kicker: 'Components / 02', description: 'Relationship-aware cards for IZLI’s distinctive entity model.', items: [
    { name: 'Commerce & editorial cards', description: 'Product, Collection, Story, Archive, Style Guide and Recommendation cards share metadata and relationship affordances.', tags: ['Business', 'Commerce'] },
    { name: 'Community & legacy cards', description: 'Keeper, Badge, Reward, Challenge and Community Project components make participation visible and legible.', tags: ['Business', 'Community'] },
    { name: 'Operational cards', description: 'QR Preview, Passport, Production Asset, Analytics and Relationship cards support production and governance.', tags: ['Business', 'Production'] },
  ] },
  { id: 'website', label: 'Website Components', kicker: 'Platform / 01', description: 'Public-facing blocks that bring the IZLI story, archive and commerce experience to life.', items: [
    { name: 'Editorial commerce', description: 'Hero, Navigation, Footer, Product Grid, Product Detail and Collection Hero.', tags: ['Website', 'Commerce'] },
    { name: 'Stories & belonging', description: 'Story Layout, Recommendation Section, Style Guide Section, Newsletter and Community Banner.', tags: ['Website', 'Content'] },
    { name: 'Living legacy', description: 'Archive Timeline and QR Landing connect product, provenance and participation.', tags: ['Website', 'Legacy'] },
  ] },
  { id: 'admin', label: 'Admin Components', kicker: 'Platform / 02', description: 'The consistent operational shell for clear, accountable editorial work.', items: [
    { name: 'Admin shell', description: 'Sidebar, Top Bar, Section Header and sticky publish panel establish a consistent working context.', tags: ['Admin', 'Navigation'] },
    { name: 'Listing toolkit', description: 'Filters, Search, Bulk Actions, Table Toolbar and Table Row support high-density review.', tags: ['Admin', 'Data'] },
    { name: 'Editor toolkit', description: 'Editor Layout, Inspector Panel and Entity Picker make complex records feel navigable.', tags: ['Admin', 'Editor'] },
  ] },
  { id: 'legacy', label: 'Legacy Components', kicker: 'Platform / 03', description: 'Participation mechanics that honor contribution and long-term cultural stewardship.', items: [
    { name: 'Progress & recognition', description: 'Archive Timeline, Keeper Progress, Keeper Level Badge, Legacy Card, Reward and Achievement Card.', tags: ['Legacy', 'Recognition'] },
    { name: 'Participation', description: 'Voting and Referral cards express contribution with clear status and transparent next steps.', tags: ['Legacy', 'Community'] },
  ] },
  { id: 'production', label: 'Production Components', kicker: 'Platform / 04', description: 'Production tools for assets, printing, QR experiences and repeatable delivery.', items: [
    { name: 'Production workspace', description: 'Production Dashboard, Template Card and Asset Card organize creative operations without visual noise.', tags: ['Production', 'Workflow'] },
    { name: 'Output & batch work', description: 'Print Preview, QR Preview, Batch Job Card and Export Card communicate status before action.', tags: ['Production', 'Output'] },
  ] },
  { id: 'graph', label: 'Content Graph', kicker: 'Platform / 05', description: 'Connection components that turn related records into useful editorial context.', items: [
    { name: 'Relationship Viewer', description: 'A concise view of related entities, relationship type, confidence and source context.', tags: ['Graph', 'Relationships'] },
    { name: 'Graph navigation', description: 'Entity Picker, Reference Card, Graph Viewer, Connection Timeline and Linked Resources.', tags: ['Graph', 'Navigation'] },
  ] },
  { id: 'patterns', label: 'Patterns & Templates', kicker: 'Patterns / 01', description: 'Repeatable arrangements that make new work immediately familiar.', items: [
    { name: 'Layout patterns', description: 'Dashboard, Listing, Editor, Details Page, Wizard, Analytics, Settings, Split Layout and Modal Workflow.', tags: ['Pattern', 'Layout'] },
    { name: 'Interaction patterns', description: 'Create, Edit, Delete, Publish, Archive, Duplicate, Bulk Edit, Review, Approve, Reject, Export, Import, QR and Batch.', tags: ['Pattern', 'Interaction'] },
    { name: 'Templates', description: 'Content, production and campaign templates should compose registered components rather than introduce one-off conventions.', tags: ['Template', 'System'] },
  ] },
  { id: 'motion', label: 'Motion', kicker: 'Practice / 01', description: 'Motion should provide orientation, feedback and continuity—not decoration.', items: [
    { name: 'Micro-interactions', description: 'Hover, focus and press states use 100–200ms transitions. Loading states retain geometry to reduce perceived jitter.', tags: ['Motion', 'Interaction'] },
    { name: 'Transitions', description: 'Use short opacity and transform transitions for drawers, dialogs and page-level context changes.', tags: ['Motion', 'Accessibility'] },
  ] },
  { id: 'accessibility', label: 'Accessibility', kicker: 'Practice / 02', description: 'Every reusable component is responsible for an accessible default.', items: [
    { name: 'Keyboard & focus', description: 'Visible indigo focus rings, logical tab order, escape behaviour for overlays and no hover-only information.', tags: ['A11y', 'Keyboard'] },
    { name: 'Contrast & touch', description: 'Maintain AA contrast for meaningful text; preserve 40px interactive targets and readable metadata at all widths.', tags: ['A11y', 'Responsive'] },
    { name: 'ARIA preparation', description: 'Name controls, connect labels and descriptions, and announce async status where context changes.', tags: ['A11y', 'ARIA'] },
  ] },
  { id: 'changelog', label: 'Changelog', kicker: 'System / 01', description: 'A compact record of system evolution and component coverage.', items: [
    { name: 'v1.4 · Design System', description: 'Components becomes the official IZLI Design System with foundations, platform coverage and live previews.', tags: ['Current', '2026'] },
    { name: 'v1.3 · Component Hub', description: 'Added production, legacy and content graph documentation to the shared library.', tags: ['History'] },
  ] },
]

const navGroups: { label: string; ids: SectionId[] }[] = [
  { label: 'Start here', ids: ['overview', 'foundations'] },
  { label: 'Foundations', ids: ['tokens', 'typography', 'colors'] },
  { label: 'Components', ids: ['ui', 'business', 'website', 'admin', 'legacy', 'production', 'graph'] },
  { label: 'Practice', ids: ['patterns', 'motion', 'accessibility', 'changelog'] },
]

function Pill({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return <span style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '.03em', color: active ? CREAM : TEXT_SEC, background: active ? INDIGO : SURFACE, border: `1px solid ${active ? INDIGO : BORDER}`, borderRadius: 99, padding: '4px 7px' }}>{children}</span>
}

function Preview({ kind }: { kind: SectionId }) {
  if (kind === 'tokens' || kind === 'colors') return <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{[INDIGO, CLAY, SAGE, '#D8D0C4', CREAM].map((color) => <span key={color} style={{ width: 30, height: 30, borderRadius: 8, background: color, border: `1px solid ${BORDER}` }} />)}</div>
  if (kind === 'typography') return <div><div style={{ fontFamily: FONT_SERIF, fontSize: 22, color: INDIGO, lineHeight: 1 }}>An editorial system</div><div style={{ fontSize: 10, color: TEXT_SEC, marginTop: 6 }}>Inter · supporting context · 14/20</div></div>
  if (kind === 'ui') return <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><button style={primaryButton}>Publish</button><button style={secondaryButton}>Preview</button><span style={{ padding: '5px 8px', fontSize: 10, borderRadius: 99, background: '#E6EDE8', color: '#4A7A5A' }}>Live</span></div>
  if (kind === 'graph') return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Node label="Product" /><span style={{ color: CLAY }}>⟷</span><Node label="Story" /><span style={{ color: CLAY }}>⟷</span><Node label="Archive" /></div>
  if (kind === 'accessibility') return <div style={{ display: 'flex', gap: 8 }}><button style={{ ...primaryButton, outline: '2px solid #8EA1BB', outlineOffset: 2 }}>Focus</button><span style={{ fontSize: 11, color: TEXT_SEC, alignSelf: 'center' }}>Keyboard ready</span></div>
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: INDIGO, color: CREAM, display: 'grid', placeItems: 'center', fontFamily: FONT_SERIF }}>I</div><div><div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>System component</div><div style={{ fontSize: 10, color: TEXT_SEC, marginTop: 3 }}>Shared across IZLI</div></div></div>
}
function Node({ label }: { label: string }) { return <span style={{ padding: '7px 8px', borderRadius: 7, background: SURFACE, border: `1px solid ${BORDER}`, color: INDIGO, fontSize: 9, fontFamily: FONT_MONO }}>{label}</span> }
const primaryButton: React.CSSProperties = { border: '1px solid #1E2F44', background: INDIGO, color: CREAM, padding: '8px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer' }
const secondaryButton: React.CSSProperties = { border: `1px solid ${BORDER}`, background: SURFACE, color: INDIGO, padding: '8px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer' }

export default function Components({ onNavigate: _onNavigate }: Props) {
  const [active, setActive] = useState<SectionId>('overview')
  const [query, setQuery] = useState('')
  const [showGuidance, setShowGuidance] = useState(true)
  const section = sections.find((item) => item.id === active) ?? sections[0]
  const q = query.trim().toLowerCase()
  const filteredItems = useMemo<RenderItem[]>(() => {
    const records: RenderItem[] = q
      ? sections.flatMap((s) => s.items.map((item) => ({ ...item, section: s.label, id: s.id })))
      : section.items.map((item) => ({ ...item, id: section.id }))
    return records.filter((item) => `${item.name} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes(q))
  }, [q, section])
  const isSearching = Boolean(q)

  return <div style={{ display: 'flex', minHeight: '100vh', background: BG, fontFamily: FONT_SANS, color: TEXT }}>
    <aside style={{ width: 244, flexShrink: 0, background: SURFACE, borderRight: `1px solid ${BORDER}`, padding: '22px 12px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
      <div style={{ padding: '0 10px 18px', borderBottom: `1px solid ${BORDER}` }}><div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '.12em', color: CLAY, textTransform: 'uppercase' }}>IZLI platform</div><div style={{ color: INDIGO, fontFamily: FONT_SERIF, fontSize: 22, marginTop: 5 }}>Design System</div><div style={{ color: TEXT_SEC, fontSize: 11, marginTop: 6, lineHeight: 1.5 }}>Official documentation · v1.4</div></div>
      <label style={{ display: 'block', padding: '18px 4px 10px' }}><span style={{ fontFamily: FONT_MONO, fontSize: 9, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '.1em' }}>Search system</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Component, token, pattern…" aria-label="Search design system" style={{ width: '100%', boxSizing: 'border-box', marginTop: 7, padding: '9px 10px', border: `1px solid ${BORDER}`, borderRadius: 8, background: BG, color: TEXT, fontSize: 11, outlineColor: INDIGO }} /></label>
      {navGroups.map((group) => <div key={group.label} style={{ marginTop: 10 }}><div style={{ padding: '8px 10px 4px', fontFamily: FONT_MONO, fontSize: 9, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '.1em' }}>{group.label}</div>{group.ids.map((id) => { const s = sections.find((item) => item.id === id)!; const selected = active === id && !isSearching; return <button key={id} onClick={() => { setActive(id); setQuery('') }} style={{ width: '100%', border: 0, textAlign: 'left', background: selected ? '#E8EDF3' : 'transparent', color: selected ? INDIGO : TEXT, padding: '7px 10px', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: selected ? 600 : 400 }}>{s.label}</button> })}</div>)}
    </aside>
    <main style={{ flex: 1, minWidth: 0, padding: '42px clamp(24px, 5vw, 72px) 80px' }}>
      <header style={{ maxWidth: 1240, margin: '0 auto 34px', borderBottom: `1px solid ${BORDER}`, paddingBottom: 25 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-start' }}><div><div style={{ color: CLAY, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '.11em', textTransform: 'uppercase' }}>{isSearching ? 'Search / all system records' : section.kicker}</div><h1 style={{ fontFamily: FONT_SERIF, color: INDIGO, fontSize: 36, fontWeight: 500, letterSpacing: '-.025em', margin: '8px 0 7px' }}>{isSearching ? `Results for “${query}”` : section.label}</h1><p style={{ maxWidth: 650, color: TEXT_SEC, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{isSearching ? `${filteredItems.length} documented records across the shared IZLI system.` : section.description}</p></div><Pill active>LIVE SYSTEM</Pill></div></header>
      {!isSearching && active === 'overview' && <section style={{ maxWidth: 1240, margin: '0 auto 28px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.65fr) minmax(240px, .85fr)', gap: 18 }}><div style={{ background: INDIGO, padding: 28, borderRadius: RADIUS.lg, color: CREAM, position: 'relative', overflow: 'hidden' }}><div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '.1em', color: '#B7AA91', textTransform: 'uppercase' }}>System charter</div><div style={{ fontFamily: FONT_SERIF, fontSize: 27, lineHeight: 1.15, maxWidth: 540, marginTop: 14 }}>A single, evolving language for the people who make IZLI and the people who experience it.</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 22 }}>{['Website', 'Admin', 'Legacy', 'Community', 'Production', 'QR'].map((label) => <Pill key={label}>{label}</Pill>)}</div><div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(231,223,210,.18)', right: -55, bottom: -80 }} /></div><div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: RADIUS.lg, padding: 22 }}><div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TEXT_SEC, letterSpacing: '.1em', textTransform: 'uppercase' }}>Coverage</div><div style={{ fontFamily: FONT_SERIF, color: INDIGO, fontSize: 38, marginTop: 8 }}>98<span style={{ fontSize: 16 }}>%</span></div><div style={{ color: TEXT_SEC, fontSize: 11, lineHeight: 1.55 }}>Reusable component documentation is kept aligned with platform domains.</div><div style={{ marginTop: 16, height: 5, background: '#E5DED3', borderRadius: 5 }}><div style={{ width: '98%', height: '100%', background: CLAY, borderRadius: 5 }} /></div></div></section>}
      <section style={{ maxWidth: 1240, margin: '0 auto' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}><div style={{ fontSize: 13, fontWeight: 600, color: INDIGO }}>{isSearching ? 'Matching documentation' : 'Documented building blocks'}</div><div style={{ fontFamily: FONT_MONO, color: TEXT_SEC, fontSize: 10 }}>{filteredItems.length} records</div></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>{filteredItems.map((item) => <article key={`${item.name}-${item.id}`} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: RADIUS.lg, overflow: 'hidden', minHeight: 270 }}><div style={{ background: SURFACE_2, padding: 20, minHeight: 90, display: 'flex', alignItems: 'center' }}><Preview kind={item.id} /></div><div style={{ padding: '18px 20px 20px' }}>{item.section && <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: CLAY, marginBottom: 6, textTransform: 'uppercase' }}>{item.section}</div>}<h2 style={{ margin: 0, color: INDIGO, fontSize: 14, fontWeight: 650 }}>{item.name}</h2><p style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.65, margin: '8px 0 15px' }}>{item.description}</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{item.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div></div></article>)}</div>{filteredItems.length === 0 && <div style={{ padding: 32, border: `1px dashed ${BORDER}`, borderRadius: RADIUS.lg, color: TEXT_SEC, fontSize: 13 }}>No matching documentation. Try a component, entity, pattern, token, typography or color term.</div>}</section>
      {!isSearching && showGuidance && <section style={{ maxWidth: 1240, margin: '32px auto 0', borderTop: `1px solid ${BORDER}`, paddingTop: 22 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}><div><div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TEXT_SEC, letterSpacing: '.1em', textTransform: 'uppercase' }}>Use it well</div><div style={{ color: INDIGO, fontFamily: FONT_SERIF, fontSize: 21, marginTop: 6 }}>Every component carries an accessible default.</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 12, maxWidth: 620, lineHeight: 1.65 }}>Use documented variants before creating a new one. New reusable parts should be registered here with variants, states, properties, responsive behaviour, accessibility notes, usage guidance and developer naming.</p></div><button onClick={() => setShowGuidance(false)} style={{ ...secondaryButton, whiteSpace: 'nowrap' }}>Dismiss</button></div></section>}
    </main>
  </div>
}
