import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from 'react'
import type { Screen } from '../types'
import { api } from '../shared/services/api'

const INDIGO = '#1E2F44'
const CREME = '#E7DFD2'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const SAND = '#B7AA91'

const LEGACY_TYPES = ['Nature', 'Architecture', 'Craftsmanship', 'Symbols', 'Music', 'History', 'Daily Life', 'Materials', 'Clothing', 'Community Heritage'] as const
const LEGACY_STATUSES = ['draft', 'published', 'archived'] as const

type LegacyStatus = (typeof LEGACY_STATUSES)[number]
type LegacyType = (typeof LEGACY_TYPES)[number]
type SectionKey = 'identity' | 'story' | 'design' | 'references' | 'related' | 'analytics'

interface VisualReference {
  id: string
  title: string
  url: string
  caption: string
  category: string
}

interface RelatedContentItem {
  id: string
  kind: string
  label: string
  module: string
}

interface AnalyticsSnapshot {
  archives: number
  stories: number
  collections: number
  products: number
  releases: number
  keepers: number
  qrScans: number
  storyViews: number
  recommendationClicks: number
  engagement: number
  labContributions: number
  topProduct: string
  topArchive: string
  topStory: string
}

interface LegacyRecord {
  id: string
  name: string
  amazighName: string
  tifinaghName: string
  slug: string
  shortDescription: string
  longDescription: string
  legacyType: LegacyType
  coverImageUrl: string
  heroImageUrl: string
  symbol: string
  icon: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  designPhilosophy: string
  visualDna: string
  primaryMotifs: string
  secondaryMotifs: string
  geometryRules: string
  compositionRules: string
  negativeSpaceRules: string
  embroideryRules: string
  printRules: string
  typographyRules: string
  colorPalette: string
  materials: string
  forbiddenElements: string
  exampleApplications: string
  meaning: string
  originStory: string
  historicalContext: string
  culturalImportance: string
  values: string
  keywords: string
  story: string
  references: string
  visualReferences: VisualReference[]
  relatedContent: RelatedContentItem[]
  analytics: AnalyticsSnapshot
  status: LegacyStatus
}

interface LegacyFormState {
  name: string
  amazighName: string
  tifinaghName: string
  slug: string
  shortDescription: string
  longDescription: string
  legacyType: LegacyType
  coverImageUrl: string
  heroImageUrl: string
  symbol: string
  icon: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  designPhilosophy: string
  visualDna: string
  primaryMotifs: string
  secondaryMotifs: string
  geometryRules: string
  compositionRules: string
  negativeSpaceRules: string
  embroideryRules: string
  printRules: string
  typographyRules: string
  colorPalette: string
  materials: string
  forbiddenElements: string
  exampleApplications: string
  meaning: string
  originStory: string
  historicalContext: string
  culturalImportance: string
  values: string
  keywords: string
  story: string
  references: string
  visualReferences: VisualReference[]
  relatedContent: RelatedContentItem[]
  analytics: AnalyticsSnapshot
  status: LegacyStatus
}

interface Props {
  onNavigate: (s: Screen) => void
}

const createRef = (title = 'Reference', category = 'Objects') => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title,
  url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&auto=format&fit=crop',
  caption: 'Editorial reference image',
  category,
})

const createRelation = (kind: string, label: string, module: string) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  kind,
  label,
  module,
})

const FALLBACK_LEGACIES: LegacyRecord[] = [
  {
    id: 'legacy-echoes-stone',
    name: 'Echoes of Stone',
    amazighName: 'Tiziri n Uẓru',
    tifinaghName: 'ⵜⵉⵣⵉⵔⵉ ⵏ ⵓⵣⵔⵓ',
    slug: 'echoes-of-stone',
    shortDescription: 'A museum-like legacy built around architectural memory, calm geometry and the continuity of craft in contemporary form.',
    longDescription: 'Echoes of Stone frames the heritage system as a living cultural archive. It connects architecture, design, ritual and editorial storytelling into a discipline that can shape products, collections and releases without losing its sacred rhythm.',
    legacyType: 'Architecture',
    coverImageUrl: 'https://images.unsplash.com/photo-1465311440653-ba9b1d9b0f5d?w=1200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1508931133506-80d3bb2b9d84?w=1200&auto=format&fit=crop',
    symbol: '◉',
    icon: '◉',
    primaryColor: '#1E2F44',
    secondaryColor: '#506681',
    accentColor: '#B7AA91',
    designPhilosophy: 'Museum editorial, architectural and intentionally restrained.',
    visualDna: 'Stone seams, terraces, carved steps and measured asymmetry.',
    primaryMotifs: 'Stone edge, archive border, terrace line',
    secondaryMotifs: 'Tifinagh rhythm, courtyard frame, shadow seam',
    geometryRules: 'Use modular proportion, vertical rhythm and calm spatial hierarchy.',
    compositionRules: 'Anchor composition with one dominant structuring form and generous negative space.',
    negativeSpaceRules: 'Treat empty space as a cultural pause rather than an absence.',
    embroideryRules: 'Keep stitch direction sparse and architectural, never decorative for its own sake.',
    printRules: 'Prefer low-contrast, high-legibility, and tactile compositions.',
    typographyRules: 'Pair an editorial serif with a precise modern sans-serif to preserve authority.',
    colorPalette: '#1E2F44 / #506681 / #B7AA91 / #E7DFD2',
    materials: 'Stone, linen, ceramic, brushed metal',
    forbiddenElements: 'No generic luxury cues, loud gradients or decorative tribal stereotypes.',
    exampleApplications: 'Editorial covers, product architecture, print layouts, object identity systems.',
    meaning: 'Endurance, transmission, and respect for memory.',
    originStory: 'The legacy emerged from mountain settlements and the visual logic of carved stone forms shared across generations.',
    historicalContext: 'Inspired by the continuity of vernacular architecture and the role of communal memory in shaping durable cultural objects.',
    culturalImportance: 'It repositions cultural memory as a design foundation instead of a decorative reference.',
    values: 'Memory, continuity, dignity, craft',
    keywords: 'architecture, heritage, memory, craft',
    story: 'A long-form narrative that connects the built environment to contemporary identity and cultural stewardship.',
    references: 'Atlas Museum, High Atlas studies, vernacular architecture archive',
    visualReferences: [createRef('Stone Detail', 'Architecture'), createRef('Pattern Study', 'Patterns'), createRef('Object Prototype', 'Objects')],
    relatedContent: [createRelation('Archive', 'Atlas Archive', 'Legacy Archives'), createRelation('Collection', 'Stone Forms', 'Collections'), createRelation('Product', 'Tifinagh Frame Tee', 'Products')],
    analytics: {
      archives: 8,
      stories: 12,
      collections: 4,
      products: 24,
      releases: 6,
      keepers: 3241,
      qrScans: 4820,
      storyViews: 18420,
      recommendationClicks: 730,
      engagement: 92,
      labContributions: 18,
      topProduct: 'Tifinagh Frame Tee',
      topArchive: 'Atlas Archive',
      topStory: 'Memory in Stone',
    },
    status: 'published',
  },
  {
    id: 'legacy-atlas-memory',
    name: 'Atlas Memory',
    amazighName: 'Akal n Tazrigt',
    tifinaghName: 'ⴰⴽⴰⵍ ⵏ ⵜⴰⵣⵔⵉⴳⵜ',
    slug: 'atlas-memory',
    shortDescription: 'A tactile legacy for route memory, weaving knowledge and the warmth of regional craft systems.',
    longDescription: 'Atlas Memory translates mountain routes and weaving traditions into a cultural framework that supports collections, style systems and community moments. It is defined by softness, movement and the quiet force of continuity.',
    legacyType: 'Craftsmanship',
    coverImageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&auto=format&fit=crop',
    symbol: '◌',
    icon: '◌',
    primaryColor: '#22364D',
    secondaryColor: '#5E6F76',
    accentColor: '#C09B73',
    designPhilosophy: 'Observational, tactile and grounded in lived material memory.',
    visualDna: 'Weave bands, contour lines, route paths and warm earth textures.',
    primaryMotifs: 'Weave band, route contour, textile grain',
    secondaryMotifs: 'Mountain fold, hand stitch, village edge',
    geometryRules: 'Layer bands with soft vertical rhythm and close visual density.',
    compositionRules: 'Use a calm drift of shapes rather than a rigid container.',
    negativeSpaceRules: 'Allow edges to breathe without losing a sense of direction.',
    embroideryRules: 'Let tactile stitch references remain visible and human.',
    printRules: 'Layer patterns with soft contrast and gentle saturation.',
    typographyRules: 'Use a tactile serif with a quiet and understated body text.',
    colorPalette: '#22364D / #5E6F76 / #C09B73 / #F1E9DA',
    materials: 'Wool, cotton, dyed felt, terracotta',
    forbiddenElements: 'Avoid polished chrome, over-saturated brightness and generic minimalism.',
    exampleApplications: 'Textile direction, packaging, publication systems, object storytelling.',
    meaning: 'Resilience, journey and intergenerational craft.',
    originStory: 'It grew from the movement of mountain routes and the feeling of woven memory carried from one generation to the next.',
    historicalContext: 'Rooted in regional textile systems, seasonal migration and the intimate language of everyday making.',
    culturalImportance: 'A reminder that memory can be carried in cloth, shape and gesture as much as in text.',
    values: 'Resilience, movement, continuity, care',
    keywords: 'atlas, craft, textiles, routes',
    story: 'A story of migration, handwork and the emotional durability of regional forms.',
    references: 'Regional weaving archives, mountain cultural study, route memory collections',
    visualReferences: [createRef('Textile Study', 'Jewelry'), createRef('Route Sketch', 'Architecture')],
    relatedContent: [createRelation('Archive', 'Mountain Routes', 'Legacy Archives'), createRelation('Story', 'Craft as Memory', 'Stories')],
    analytics: {
      archives: 5,
      stories: 7,
      collections: 3,
      products: 11,
      releases: 2,
      keepers: 1820,
      qrScans: 1200,
      storyViews: 8600,
      recommendationClicks: 280,
      engagement: 81,
      labContributions: 9,
      topProduct: 'Woven Route Tote',
      topArchive: 'Mountain Routes',
      topStory: 'Craft as Memory',
    },
    status: 'draft',
  },
]

const baseSections: Array<{ key: SectionKey; title: string; subtitle: string }> = [
  { key: 'identity', title: 'Identity', subtitle: 'Names, status and cultural framing.' },
  { key: 'story', title: 'Story', subtitle: 'Meaning, origin and the narrative backbone.' },
  { key: 'design', title: 'Design Language', subtitle: 'The editorial system designers use to shape future collections and products.' },
  { key: 'references', title: 'Visual References', subtitle: 'Gallery of architecture, objects, patterns and inspiration.' },
  { key: 'related', title: 'Related Content', subtitle: 'Linked archives, stories, releases, products and hubs.' },
  { key: 'analytics', title: 'Analytics', subtitle: 'Automatically generated insights and community signals.' },
]

const emptyForm = (): LegacyFormState => ({
  name: '',
  amazighName: '',
  tifinaghName: '',
  slug: '',
  shortDescription: '',
  longDescription: '',
  legacyType: 'History',
  coverImageUrl: '',
  heroImageUrl: '',
  symbol: '◉',
  icon: '◉',
  primaryColor: INDIGO,
  secondaryColor: TEXT_SEC,
  accentColor: SAND,
  designPhilosophy: '',
  visualDna: '',
  primaryMotifs: '',
  secondaryMotifs: '',
  geometryRules: '',
  compositionRules: '',
  negativeSpaceRules: '',
  embroideryRules: '',
  printRules: '',
  typographyRules: '',
  colorPalette: '',
  materials: '',
  forbiddenElements: '',
  exampleApplications: '',
  meaning: '',
  originStory: '',
  historicalContext: '',
  culturalImportance: '',
  values: '',
  keywords: '',
  story: '',
  references: '',
  visualReferences: [],
  relatedContent: [],
  analytics: {
    archives: 0,
    stories: 0,
    collections: 0,
    products: 0,
    releases: 0,
    keepers: 0,
    qrScans: 0,
    storyViews: 0,
    recommendationClicks: 0,
    engagement: 0,
    labContributions: 0,
    topProduct: '—',
    topArchive: '—',
    topStory: '—',
  },
  status: 'draft',
})

const emptyLegacy = (): LegacyRecord => ({
  ...emptyForm(),
  id: `legacy-${Date.now()}`,
  visualReferences: [],
  relatedContent: [],
})

function normalizeLegacy(record: Record<string, unknown>, index: number): LegacyRecord {
  const fallback = emptyLegacy()
  const analytics = (record.analytics as Partial<AnalyticsSnapshot> | undefined) ?? {}
  return {
    ...fallback,
    id: String(record.id ?? record._id ?? `legacy-${index}`),
    name: String(record.name ?? ''),
    amazighName: String(record.amazighName ?? ''),
    tifinaghName: String(record.tifinaghName ?? ''),
    slug: String(record.slug ?? ''),
    shortDescription: String(record.shortDescription ?? ''),
    longDescription: String(record.longDescription ?? ''),
    legacyType: (record.legacyType as LegacyType) ?? 'History',
    coverImageUrl: String(record.coverImageUrl ?? ''),
    heroImageUrl: String(record.heroImageUrl ?? ''),
    symbol: String(record.symbol ?? '◉'),
    icon: String(record.icon ?? '◉'),
    primaryColor: String(record.primaryColor ?? INDIGO),
    secondaryColor: String(record.secondaryColor ?? TEXT_SEC),
    accentColor: String(record.accentColor ?? SAND),
    designPhilosophy: String(record.designPhilosophy ?? ''),
    visualDna: String(record.visualDna ?? ''),
    primaryMotifs: String(record.primaryMotifs ?? ''),
    secondaryMotifs: String(record.secondaryMotifs ?? ''),
    geometryRules: String(record.geometryRules ?? ''),
    compositionRules: String(record.compositionRules ?? ''),
    negativeSpaceRules: String(record.negativeSpaceRules ?? ''),
    embroideryRules: String(record.embroideryRules ?? ''),
    printRules: String(record.printRules ?? ''),
    typographyRules: String(record.typographyRules ?? ''),
    colorPalette: String(record.colorPalette ?? ''),
    materials: String(record.materials ?? ''),
    forbiddenElements: String(record.forbiddenElements ?? ''),
    exampleApplications: String(record.exampleApplications ?? ''),
    meaning: String(record.meaning ?? ''),
    originStory: String(record.originStory ?? ''),
    historicalContext: String(record.historicalContext ?? ''),
    culturalImportance: String(record.culturalImportance ?? ''),
    values: String(record.values ?? ''),
    keywords: String(record.keywords ?? ''),
    story: String(record.story ?? ''),
    references: String(record.references ?? ''),
    visualReferences: Array.isArray(record.visualReferences)
      ? record.visualReferences.map((item, itemIndex) => ({
          id: String((item as { id?: unknown }).id ?? `${index}-${itemIndex}`),
          title: String((item as { title?: unknown }).title ?? ''),
          url: String((item as { url?: unknown }).url ?? ''),
          caption: String((item as { caption?: unknown }).caption ?? ''),
          category: String((item as { category?: unknown }).category ?? 'Objects'),
        }))
      : [],
    relatedContent: Array.isArray(record.relatedContent)
      ? record.relatedContent.map((item, itemIndex) => ({
          id: String((item as { id?: unknown }).id ?? `${index}-${itemIndex}`),
          kind: String((item as { kind?: unknown }).kind ?? ''),
          label: String((item as { label?: unknown }).label ?? ''),
          module: String((item as { module?: unknown }).module ?? ''),
        }))
      : [],
    analytics: {
      archives: Number(analytics.archives ?? 0),
      stories: Number(analytics.stories ?? 0),
      collections: Number(analytics.collections ?? 0),
      products: Number(analytics.products ?? 0),
      releases: Number(analytics.releases ?? 0),
      keepers: Number(analytics.keepers ?? 0),
      qrScans: Number(analytics.qrScans ?? 0),
      storyViews: Number(analytics.storyViews ?? 0),
      recommendationClicks: Number(analytics.recommendationClicks ?? 0),
      engagement: Number(analytics.engagement ?? 0),
      labContributions: Number(analytics.labContributions ?? 0),
      topProduct: String(analytics.topProduct ?? '—'),
      topArchive: String(analytics.topArchive ?? '—'),
      topStory: String(analytics.topStory ?? '—'),
    },
    status: (record.status as LegacyStatus) ?? 'draft',
  }
}

function legacyToForm(legacy: LegacyRecord): LegacyFormState {
  return { ...legacy }
}

function formToLegacy(form: LegacyFormState, base: LegacyRecord): LegacyRecord {
  return { ...base, ...form, id: base.id || `legacy-${Date.now()}` }
}

function Field({ label, value, onChange, placeholder, multiline = false, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; multiline?: boolean; rows?: number }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} rows={rows} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', minHeight: 90, background: '#FAF7F1', color: TEXT, outline: 'none', fontSize: 13, resize: 'vertical', lineHeight: 1.6 }} />
      ) : (
        <input value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none', fontSize: 13 }} />
      )}
    </label>
  )
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      <select value={value} onChange={event => onChange(event.target.value)} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none', fontSize: 13 }}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 14 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: INDIGO, lineHeight: 1 }}>{String(value)}</div>
      <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  )
}

function ImageUploadField({ label, previewUrl, uploading, onUpload, editing }: { label: string; previewUrl: string; uploading: boolean; onUpload: (event: ChangeEvent<HTMLInputElement>) => void; editing: boolean }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      {editing ? (
        <>
          <input type="file" accept="image/*" onChange={onUpload} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none', fontSize: 13 }} />
          <div style={{ minHeight: 90, border: `1px dashed ${BORDER}`, borderRadius: 12, background: '#F7F2E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_SEC, fontSize: 12, padding: 10, textAlign: 'center' }}>
            {uploading ? 'Uploading image…' : 'PNG, JPG or WebP up to 10MB.'}
          </div>
        </>
      ) : (
        <div style={{ minHeight: 110, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', background: '#F7F2E8' }}>
          {previewUrl ? (
            <img src={previewUrl} alt={label} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
          ) : (
            <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_SEC, fontSize: 12 }}>No image yet</div>
          )}
        </div>
      )}
    </label>
  )
}

export default function Legacies({ onNavigate }: Props) {
  const [legacies, setLegacies] = useState<LegacyRecord[]>(FALLBACK_LEGACIES)
  const [selectedId, setSelectedId] = useState<string | null>(FALLBACK_LEGACIES[0]?.id ?? null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState('Curated legacy records loaded. Connect the API to persist edits.')
  const [saving, setSaving] = useState(false)
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortMode, setSortMode] = useState<'newest' | 'oldest' | 'alpha' | 'products'>('newest')
  const [sectionOpen, setSectionOpen] = useState<Record<SectionKey, boolean>>({ identity: true, story: true, design: true, references: false, related: false, analytics: true })
  const [draft, setDraft] = useState<LegacyFormState>(emptyForm())
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const selected = useMemo(() => legacies.find(item => item.id === selectedId) ?? null, [legacies, selectedId])

  const filteredLegacies = useMemo(() => {
    const next = legacies.filter(item => {
      const haystack = `${item.name} ${item.shortDescription} ${item.amazighName}`.toLowerCase()
      const matchesQuery = haystack.includes(query.toLowerCase())
      const matchesCategory = categoryFilter === 'All' || item.legacyType === categoryFilter
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter
      return matchesQuery && matchesCategory && matchesStatus
    })

    return next.sort((a, b) => {
      if (sortMode === 'alpha') return a.name.localeCompare(b.name)
      if (sortMode === 'products') return b.analytics.products - a.analytics.products
      if (sortMode === 'oldest') return a.name.length - b.name.length
      return b.analytics.releases - a.analytics.releases
    })
  }, [categoryFilter, legacies, query, sortMode, statusFilter])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const records = await api.get<Array<Record<string, unknown>>>('/resources/legacies')
        if (cancelled) return
        if (!records.length) {
          setMessage('No legacies found yet. Showing curated preview cards.')
          setLoading(false)
          return
        }

        const normalized = records.map(normalizeLegacy)
        setLegacies(normalized)
        setSelectedId(normalized[0]?.id ?? null)
        setMessage(`Loaded ${normalized.length} legacies from MongoDB.`)
      } catch {
        setMessage('MongoDB is unavailable. Showing local premium preview cards.')
      } finally {
        setLoading(false)
      }
    }

    void load()
    return () => { cancelled = true }
  }, [])

  const openLegacy = (legacy: LegacyRecord) => {
    setSelectedId(legacy.id)
    setDraft(legacyToForm(legacy))
    setEditing(false)
    setDetailOpen(true)
  }

  const openCreate = () => {
    setSelectedId(null)
    setDraft(emptyForm())
    setEditing(true)
    setDetailOpen(true)
  }

  const startEdit = (legacy: LegacyRecord) => {
    setSelectedId(legacy.id)
    setDraft(legacyToForm(legacy))
    setEditing(true)
    setDetailOpen(true)
  }

  const duplicateLegacy = (legacy: LegacyRecord) => {
    const copy = { ...legacy, id: `legacy-${Date.now()}`, name: `${legacy.name} Copy`, slug: `${legacy.slug}-copy`, status: 'draft' as LegacyStatus }
    setLegacies(current => [copy, ...current])
    setSelectedId(copy.id)
    setDraft(legacyToForm(copy))
    setEditing(true)
    setDetailOpen(true)
    setMessage('Legacy duplicated locally. Save to persist it.')
  }

  const archiveLegacy = async (legacy: LegacyRecord) => {
    const next = { ...legacy, status: 'archived' as LegacyStatus }
    try {
      const saved = await api.patch<LegacyRecord>(`/resources/legacies/${legacy.id}`, { status: 'archived' })
      const normalized = saved ? normalizeLegacy(saved as unknown as Record<string, unknown>, Date.now()) : next
      setLegacies(current => current.map(item => item.id === legacy.id ? normalized : item))
      setSelectedId(normalized.id)
      setMessage('Legacy archived successfully.')
    } catch {
      setLegacies(current => current.map(item => item.id === legacy.id ? next : item))
      setSelectedId(next.id)
      setMessage('Legacy archived locally. Connect the API to persist it.')
    }
  }

  const deleteLegacy = async (legacy: LegacyRecord) => {
    const confirmDelete = window.confirm(`Delete legacy “${legacy.name}”? This cannot be undone.`)
    if (!confirmDelete) return

    try {
      await api.del(`/resources/legacies/${legacy.id}`)
      setLegacies(current => current.filter(item => item.id !== legacy.id))
      setSelectedId(prev => prev === legacy.id ? null : prev)
      setDetailOpen(false)
      setMessage('Legacy deleted successfully.')
    } catch {
      setLegacies(current => current.filter(item => item.id !== legacy.id))
      setSelectedId(prev => prev === legacy.id ? null : prev)
      setDetailOpen(false)
      setMessage('Legacy deleted locally. Connect the API to persist it.')
    }
  }

  const saveLegacy = async (mode: 'draft' | 'publish', explicitStatus?: LegacyStatus) => {
    setSaving(true)
    const base = selected ?? emptyLegacy()
    const status = explicitStatus ?? (mode === 'publish' ? 'published' : draft.status)
    const payload = formToLegacy({ ...draft, status }, base)

    try {
      const saved = selected
        ? await api.patch<LegacyRecord>(`/resources/legacies/${selected.id}`, payload)
        : await api.post<LegacyRecord>('/resources/legacies', payload)

      const normalized = saved ? normalizeLegacy(saved as unknown as Record<string, unknown>, Date.now()) : payload
      setLegacies(current => selected ? current.map(item => item.id === normalized.id ? normalized : item) : [normalized, ...current])
      setSelectedId(normalized.id)
      setDraft(legacyToForm(normalized))
      setEditing(false)
      setDetailOpen(true)
      setMessage(mode === 'publish' ? 'Legacy published successfully.' : 'Legacy saved as draft.')
    } catch {
      const fallback = payload
      setLegacies(current => selected ? current.map(item => item.id === fallback.id ? fallback : item) : [fallback, ...current])
      setSelectedId(fallback.id)
      setDraft(legacyToForm(fallback))
      setEditing(false)
      setDetailOpen(true)
      setMessage(mode === 'publish' ? 'Legacy published locally. Connect the API to persist it.' : 'Legacy saved locally. Connect the API to persist it.')
    } finally {
      setSaving(false)
    }
  }

  const handleHeaderAction = async (action: 'draft' | 'publish' | 'archive' | 'delete') => {
    setMenuOpen(false)

    if (action === 'archive' && selected) {
      await archiveLegacy(selected)
      return
    }

    if (action === 'delete' && selected) {
      await deleteLegacy(selected)
      return
    }

    const status = action === 'draft' ? 'draft' : 'published'
    await saveLegacy(action, status)
  }

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage('Please choose a valid image file.')
      event.target.value = ''
      return
    }

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const result = await api.upload<{ url: string; name: string }>('/uploads/legacy', formData)
      const imageUrl = result.url
      updateDraft('coverImageUrl', imageUrl)
      updateDraft('heroImageUrl', imageUrl)
      setMessage('Image uploaded and attached to the legacy.')
    } catch {
      setMessage('Image upload failed. Please try another file.')
    } finally {
      setUploadingImage(false)
      event.target.value = ''
    }
  }

  const updateDraft = <K extends keyof LegacyFormState>(key: K, value: LegacyFormState[K]) => {
    setDraft(current => ({ ...current, [key]: value }))
  }

  const updateReference = (index: number, key: keyof VisualReference, value: string) => {
    setDraft(current => ({
      ...current,
      visualReferences: current.visualReferences.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item),
    }))
  }

  const addReference = () => {
    setDraft(current => ({ ...current, visualReferences: [...current.visualReferences, createRef('New reference', 'Objects')] }))
  }

  const updateRelation = (index: number, key: keyof RelatedContentItem, value: string) => {
    setDraft(current => ({
      ...current,
      relatedContent: current.relatedContent.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item),
    }))
  }

  const addRelation = () => {
    setDraft(current => ({ ...current, relatedContent: [...current.relatedContent, createRelation('Archive', 'New link', 'Legacy Archives')] }))
  }

  const activeLegacy = editing ? draft : selected

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 1580, margin: '0 auto', background: BG, minHeight: '100%' }}>
      <style>{`
        .legacy-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
        @media (max-width: 1200px) { .legacy-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 780px) { .legacy-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ maxWidth: 880 }}>
          <div style={{ fontSize: 11, color: TEXT_SEC, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>Legacy Management</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 600, color: INDIGO, margin: 0, lineHeight: 1.05 }}>Legacy Explorer</h1>
          <p style={{ margin: '10px 0 0', color: TEXT_SEC, fontSize: 14, lineHeight: 1.7 }}>A premium editorial layer for the highest cultural entity in the IZLI Platform. Every archive, story, collection and product begins here.</p>
        </div>
        <button onClick={openCreate} style={{ background: INDIGO, color: CREME, border: 'none', borderRadius: 14, padding: '11px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(30,47,68,0.12)' }}>+ Create New Legacy</button>
      </div>

      <div style={{ marginBottom: 18, fontSize: 12, color: TEXT_SEC }}>{loading ? 'Preparing the editorial explorer…' : message}</div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
        <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search legacy..." style={{ minWidth: 240, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none' }} />
        <select value={categoryFilter} onChange={event => setCategoryFilter(event.target.value)} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none' }}>
          <option value="All">All categories</option>
          {LEGACY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none' }}>
          <option value="All">All statuses</option>
          {LEGACY_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        <select value={sortMode} onChange={event => setSortMode(event.target.value as 'newest' | 'oldest' | 'alpha' | 'products')} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none' }}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alpha">Alphabetical</option>
          <option value="products">Most products</option>
        </select>
      </div>

      <div className="legacy-grid">
        {filteredLegacies.map(legacy => (
          <div key={legacy.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 10px 30px rgba(30,47,68,0.05)' }}>
            <div style={{ position: 'relative', height: 220, background: `url(${legacy.coverImageUrl || legacy.heroImageUrl}) center/cover no-repeat` }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(30,47,68,0.08), rgba(30,47,68,0.72))' }} />
              <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, padding: '5px 10px', borderRadius: 999, background: 'rgba(231,223,210,0.2)', color: CREME, fontWeight: 600 }}>{legacy.legacyType}</span>
                <span style={{ fontSize: 11, padding: '5px 10px', borderRadius: 999, background: 'rgba(231,223,210,0.2)', color: CREME, fontWeight: 600, textTransform: 'uppercase' }}>{legacy.status}</span>
              </div>
              <div style={{ position: 'absolute', left: 16, bottom: 16, right: 16 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: CREME, lineHeight: 1.1 }}>{legacy.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(231,223,210,0.86)', marginTop: 6 }}>{legacy.amazighName}</div>
              </div>
            </div>

            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{legacy.tifinaghName || 'Tifinagh Name'}</div>
              <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.65, minHeight: 54 }}>{legacy.shortDescription}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginTop: 14 }}>
                <StatTile label="Archives" value={legacy.analytics.archives} />
                <StatTile label="Stories" value={legacy.analytics.stories} />
                <StatTile label="Collections" value={legacy.analytics.collections} />
                <StatTile label="Products" value={legacy.analytics.products} />
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                <button onClick={() => openLegacy(legacy)} style={{ background: INDIGO, color: CREME, border: 'none', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Open</button>
                <button onClick={() => startEdit(legacy)} style={{ background: 'transparent', color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontSize: 12 }}>Edit</button>
                <button onClick={() => duplicateLegacy(legacy)} style={{ background: 'transparent', color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontSize: 12 }}>Duplicate</button>
                <button onClick={() => archiveLegacy(legacy)} style={{ background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontSize: 12 }}>Archive</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {detailOpen && activeLegacy && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(30,47,68,0.78)', zIndex: 200, overflowY: 'auto', padding: 18 }} onClick={() => setDetailOpen(false)}>
          <div style={{ maxWidth: 1380, margin: '0 auto', background: BG, borderRadius: 28, overflow: 'hidden', border: `1px solid ${BORDER}`, boxShadow: '0 30px 90px rgba(0,0,0,0.25)' }} onClick={event => event.stopPropagation()}>
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
              <div style={{ position: 'relative', minHeight: 360, background: `url(${activeLegacy.heroImageUrl || activeLegacy.coverImageUrl}) center/cover no-repeat` }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(30,47,68,0.84), rgba(30,47,68,0.24))' }} />
                <div style={{ position: 'relative', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 360 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 999, background: 'rgba(231,223,210,0.16)', color: CREME }}>{activeLegacy.legacyType}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 999, background: 'rgba(231,223,210,0.16)', color: CREME, textTransform: 'uppercase' }}>{activeLegacy.status}</span>
                    </div>
                    <button onClick={() => setDetailOpen(false)} style={{ border: 'none', background: 'rgba(231,223,210,0.16)', color: CREME, borderRadius: 999, width: 38, height: 38, cursor: 'pointer', fontSize: 18 }}>×</button>
                  </div>

                  <div style={{ maxWidth: 760 }}>
                    <div style={{ fontSize: 11, color: 'rgba(231,223,210,0.9)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>Editorial Legacy</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 600, color: CREME, margin: 0, lineHeight: 1.05 }}>{activeLegacy.name || 'Untitled Legacy'}</h2>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <button onClick={() => setEditing(!editing)} title="Edit" style={{ border: 'none', background: 'rgba(231,223,210,0.16)', color: CREME, borderRadius: 999, width: 34, height: 34, cursor: 'pointer', fontSize: 15 }}>✎</button>
                        {editing && (
                          <>
                            <button onClick={() => handleHeaderAction('draft')} title="Move to draft" style={{ border: 'none', background: 'rgba(231,223,210,0.16)', color: CREME, borderRadius: 999, width: 34, height: 34, cursor: 'pointer', fontSize: 15 }}>◌</button>
                            <button onClick={() => handleHeaderAction('publish')} title="Publish" style={{ border: 'none', background: 'rgba(231,223,210,0.16)', color: CREME, borderRadius: 999, width: 34, height: 34, cursor: 'pointer', fontSize: 15 }}>⬆</button>
                          </>
                        )}
                        <div style={{ position: 'relative' }}>
                          <button onClick={() => setMenuOpen(current => !current)} title="More actions" style={{ border: 'none', background: 'rgba(231,223,210,0.16)', color: CREME, borderRadius: 999, width: 34, height: 34, cursor: 'pointer', fontSize: 18 }}>⋯</button>
                          {menuOpen && (
                            <div style={{ position: 'absolute', right: 0, top: 44, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 8, minWidth: 180, boxShadow: '0 12px 30px rgba(30,47,68,0.12)', zIndex: 3 }}>
                              <button onClick={() => handleHeaderAction('draft')} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '8px 10px', cursor: 'pointer', color: TEXT, fontSize: 13 }}>Move to draft</button>
                              <button onClick={() => handleHeaderAction('publish')} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '8px 10px', cursor: 'pointer', color: TEXT, fontSize: 13 }}>Publish</button>
                              <button onClick={() => handleHeaderAction('archive')} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '8px 10px', cursor: 'pointer', color: TEXT, fontSize: 13 }}>Archive legacy</button>
                              <button onClick={() => handleHeaderAction('delete')} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '8px 10px', cursor: 'pointer', color: '#7D4A3E', fontSize: 13 }}>Delete legacy</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 10, color: 'rgba(231,223,210,0.88)', fontSize: 15 }}>{activeLegacy.amazighName} · {activeLegacy.tifinaghName}</div>
                    <div style={{ marginTop: 14, color: 'rgba(231,223,210,0.82)', fontSize: 14, lineHeight: 1.7 }}>{activeLegacy.shortDescription}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'minmax(0, 1.08fr) minmax(300px, 0.62fr)', gap: 20 }}>
              <div style={{ display: 'grid', gap: 14 }}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                  {editing && (
                    <>
                      <button onClick={() => saveLegacy('draft')} disabled={saving} style={{ background: 'transparent', color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 14px', cursor: 'pointer', fontWeight: 600 }}>{saving ? 'Saving…' : 'Save Draft'}</button>
                      <button onClick={() => saveLegacy('publish')} disabled={saving} style={{ background: 'transparent', color: INDIGO, border: `1px solid ${INDIGO}`, borderRadius: 12, padding: '10px 14px', cursor: 'pointer', fontWeight: 600 }}>{saving ? 'Publishing…' : 'Publish'}</button>
                    </>
                  )}
                  <button onClick={() => setEditing(false)} style={{ background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 14px', cursor: 'pointer', fontWeight: 600 }}>Close</button>
                </div>

                {baseSections.map(section => {
                  const isOpen = sectionOpen[section.key]
                  return (
                    <div key={section.key} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 16 }}>
                      <button onClick={() => setSectionOpen(current => ({ ...current, [section.key]: !current[section.key] }))} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 12, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{section.title}</div>
                            <div style={{ fontSize: 13, color: TEXT, marginTop: 4, lineHeight: 1.6 }}>{section.subtitle}</div>
                          </div>
                          <span style={{ fontSize: 20, color: INDIGO }}>{isOpen ? '−' : '+'}</span>
                        </div>
                      </button>
                      {isOpen && (
                        <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
                          {renderSectionContent(section.key, editing, draft, updateDraft, updateReference, addReference, updateRelation, addRelation, handleImageUpload, uploadingImage)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 16 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Quick Analytics</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                    <StatTile label="Archives" value={draft.analytics.archives} />
                    <StatTile label="Stories" value={draft.analytics.stories} />
                    <StatTile label="Collections" value={draft.analytics.collections} />
                    <StatTile label="Products" value={draft.analytics.products} />
                    <StatTile label="Keepers" value={draft.analytics.keepers} />
                    <StatTile label="QR Scans" value={draft.analytics.qrScans} />
                  </div>
                </div>

                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 16 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Signals</div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: 12 }}>
                      <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 4 }}>Most Popular Product</div>
                      <div style={{ fontSize: 13, color: INDIGO }}>{draft.analytics.topProduct}</div>
                    </div>
                    <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: 12 }}>
                      <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 4 }}>Most Popular Archive</div>
                      <div style={{ fontSize: 13, color: INDIGO }}>{draft.analytics.topArchive}</div>
                    </div>
                    <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: 12 }}>
                      <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 4 }}>Most Viewed Story</div>
                      <div style={{ fontSize: 13, color: INDIGO }}>{draft.analytics.topStory}</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 16 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Editorial Timeline</div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    <div style={{ height: 10, borderRadius: 999, background: `linear-gradient(90deg, ${INDIGO}, ${SAND})` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: TEXT_SEC }}>
                      <span>Release cadence</span>
                      <span>{draft.analytics.releases} launches</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: TEXT_SEC }}>
                      <span>Lab contributions</span>
                      <span>{draft.analytics.labContributions}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: TEXT_SEC }}>
                      <span>Community engagement</span>
                      <span>{draft.analytics.engagement}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function renderSectionContent(
  key: SectionKey,
  editing: boolean,
  draft: LegacyFormState,
  updateDraft: <K extends keyof LegacyFormState>(key: K, value: LegacyFormState[K]) => void,
  updateReference: (index: number, key: keyof VisualReference, value: string) => void,
  addReference: () => void,
  updateRelation: (index: number, key: keyof RelatedContentItem, value: string) => void,
  addRelation: () => void,
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void,
  uploadingImage: boolean,
): ReactNode {
  if (key === 'identity') {
    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
          <Field label="Legacy Name" value={draft.name} onChange={value => updateDraft('name', value)} />
          <Field label="Slug" value={draft.slug} onChange={value => updateDraft('slug', value)} />
          <Field label="Amazigh Name" value={draft.amazighName} onChange={value => updateDraft('amazighName', value)} />
          <Field label="Tifinagh Name" value={draft.tifinaghName} onChange={value => updateDraft('tifinaghName', value)} />
          <SelectField label="Category" value={draft.legacyType} onChange={value => updateDraft('legacyType', value as LegacyType)} options={LEGACY_TYPES} />
          <SelectField label="Status" value={draft.status} onChange={value => updateDraft('status', value as LegacyStatus)} options={LEGACY_STATUSES} />
          <ImageUploadField label="Cover Image" previewUrl={draft.coverImageUrl || draft.heroImageUrl} uploading={uploadingImage} onUpload={onImageUpload} editing={editing} />
          <Field label="Icon" value={draft.icon} onChange={value => updateDraft('icon', value)} />
          <Field label="Symbol" value={draft.symbol} onChange={value => updateDraft('symbol', value)} />
        </div>
        <Field label="Short Description" multiline value={draft.shortDescription} onChange={value => updateDraft('shortDescription', value)} rows={3} />
        <Field label="Long Description" multiline value={draft.longDescription} onChange={value => updateDraft('longDescription', value)} rows={5} />
      </>
    )
  }

  if (key === 'story') {
    return (
      <>
        <Field label="Meaning" multiline value={draft.meaning} onChange={value => updateDraft('meaning', value)} rows={3} />
        <Field label="Origin" multiline value={draft.originStory} onChange={value => updateDraft('originStory', value)} rows={4} />
        <Field label="Historical Context" multiline value={draft.historicalContext} onChange={value => updateDraft('historicalContext', value)} rows={4} />
        <Field label="Values" multiline value={draft.values} onChange={value => updateDraft('values', value)} rows={3} />
        <Field label="Keywords" multiline value={draft.keywords} onChange={value => updateDraft('keywords', value)} rows={2} />
        <Field label="Story" multiline value={draft.story} onChange={value => updateDraft('story', value)} rows={4} />
        <Field label="References" multiline value={draft.references} onChange={value => updateDraft('references', value)} rows={3} />
      </>
    )
  }

  if (key === 'design') {
    return (
      <>
        <Field label="Design Philosophy" multiline value={draft.designPhilosophy} onChange={value => updateDraft('designPhilosophy', value)} rows={3} />
        <Field label="Visual DNA" multiline value={draft.visualDna} onChange={value => updateDraft('visualDna', value)} rows={3} />
        <Field label="Primary Motifs" multiline value={draft.primaryMotifs} onChange={value => updateDraft('primaryMotifs', value)} rows={2} />
        <Field label="Secondary Motifs" multiline value={draft.secondaryMotifs} onChange={value => updateDraft('secondaryMotifs', value)} rows={2} />
        <Field label="Geometry Rules" multiline value={draft.geometryRules} onChange={value => updateDraft('geometryRules', value)} rows={3} />
        <Field label="Composition Rules" multiline value={draft.compositionRules} onChange={value => updateDraft('compositionRules', value)} rows={3} />
        <Field label="Negative Space Rules" multiline value={draft.negativeSpaceRules} onChange={value => updateDraft('negativeSpaceRules', value)} rows={3} />
        <Field label="Embroidery Rules" multiline value={draft.embroideryRules} onChange={value => updateDraft('embroideryRules', value)} rows={3} />
        <Field label="Print Rules" multiline value={draft.printRules} onChange={value => updateDraft('printRules', value)} rows={3} />
        <Field label="Typography Rules" multiline value={draft.typographyRules} onChange={value => updateDraft('typographyRules', value)} rows={3} />
        <Field label="Color Palette" multiline value={draft.colorPalette} onChange={value => updateDraft('colorPalette', value)} rows={2} />
        <Field label="Materials" multiline value={draft.materials} onChange={value => updateDraft('materials', value)} rows={2} />
        <Field label="Forbidden Elements" multiline value={draft.forbiddenElements} onChange={value => updateDraft('forbiddenElements', value)} rows={3} />
        <Field label="Example Applications" multiline value={draft.exampleApplications} onChange={value => updateDraft('exampleApplications', value)} rows={3} />
      </>
    )
  }

  if (key === 'references') {
    return (
      <>
        <button onClick={addReference} style={{ justifySelf: 'start', background: INDIGO, color: CREME, border: 'none', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>+ Add Visual Reference</button>
        <div style={{ display: 'grid', gap: 10 }}>
          {draft.visualReferences.map((item, index) => (
            <div key={item.id} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: 12, display: 'grid', gap: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                <Field label="Title" value={item.title} onChange={value => updateReference(index, 'title', value)} />
                <Field label="Category" value={item.category} onChange={value => updateReference(index, 'category', value)} />
              </div>
              <Field label="URL" value={item.url} onChange={value => updateReference(index, 'url', value)} />
              <Field label="Caption" value={item.caption} onChange={value => updateReference(index, 'caption', value)} />
            </div>
          ))}
        </div>
      </>
    )
  }

  if (key === 'related') {
    return (
      <>
        <button onClick={addRelation} style={{ justifySelf: 'start', background: INDIGO, color: CREME, border: 'none', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>+ Add Linked Content</button>
        <div style={{ display: 'grid', gap: 10 }}>
          {draft.relatedContent.map((item, index) => (
            <div key={item.id} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: 12, display: 'grid', gap: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                <Field label="Kind" value={item.kind} onChange={value => updateRelation(index, 'kind', value)} />
                <Field label="Module" value={item.module} onChange={value => updateRelation(index, 'module', value)} />
              </div>
              <Field label="Label" value={item.label} onChange={value => updateRelation(index, 'label', value)} />
            </div>
          ))}
        </div>
      </>
    )
  }

  if (key === 'analytics') {
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
          <StatTile label="Archives" value={draft.analytics.archives} />
          <StatTile label="Stories" value={draft.analytics.stories} />
          <StatTile label="Collections" value={draft.analytics.collections} />
          <StatTile label="Products" value={draft.analytics.products} />
          <StatTile label="Legacy Releases" value={draft.analytics.releases} />
          <StatTile label="Keepers" value={draft.analytics.keepers} />
          <StatTile label="QR Scans" value={draft.analytics.qrScans} />
          <StatTile label="Story Views" value={draft.analytics.storyViews} />
          <StatTile label="Recommendation Clicks" value={draft.analytics.recommendationClicks} />
          <StatTile label="Community Engagement" value={`${draft.analytics.engagement}%`} />
          <StatTile label="Lab Contributions" value={draft.analytics.labContributions} />
          <StatTile label="Top Product" value={draft.analytics.topProduct} />
        </div>
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, padding: 12, color: TEXT_SEC, lineHeight: 1.7 }}>
          Analytics remain read-only and are generated from linked archives, stories, collections, products and releases. The module updates as the content graph grows.
        </div>
      </div>
    )
  }

  return null
}
