import { useEffect, useMemo, useState } from 'react'
import type { Screen } from '../types'
import { api } from '../shared/services/api'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const CREAM = '#E7DFD2'
const SAND = '#B7AA91'

type LegacyStatus = 'draft' | 'published' | 'archived'
type LegacyType = 'Nature' | 'Architecture' | 'Craftsmanship' | 'Symbols' | 'Music' | 'History' | 'Daily Life' | 'Materials' | 'Clothing' | 'Community Heritage'

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
  primaryColor: string
  secondaryColor: string
  accentColor: string
  designPhilosophy: string
  culturalMeaning: string
  historicalContext: string
  status: LegacyStatus
  archiveCount: number
  collectionCount: number
  productCount: number
  keeperCount: number
  releaseCount: number
  qrScans: number
  votes: number
  communityContributions: number
  versionHistory: Array<{ version: string; date: string; note: string }>
}

interface Props { onNavigate: (s: Screen) => void }

interface LegacyFormState {
  name: string
  amazighName: string
  tifinaghName: string
  slug: string
  legacyType: LegacyType
  coverImageUrl: string
  shortDescription: string
}

const LEGACY_TYPES: LegacyType[] = ['Nature', 'Architecture', 'Craftsmanship', 'Symbols', 'Music', 'History', 'Daily Life', 'Materials', 'Clothing', 'Community Heritage']

const FALLBACK_LEGACIES: LegacyRecord[] = [
  {
    id: 'legacy-echoes-stone',
    name: 'Echoes of Stone',
    amazighName: 'Tiziri n Uẓru',
    tifinaghName: 'ⵜⵉⵣⵉⵔⵉ ⵏ ⵓⵣⵔⵓ',
    slug: 'echoes-of-stone',
    shortDescription: 'A stone-rooted legacy translating architectural memory into contemporary objects.',
    longDescription: 'Echoes of Stone is the current reference legacy for IZLI. It connects architecture, memory, craft, and products into one cultural system.',
    legacyType: 'Architecture',
    coverImageUrl: 'https://images.unsplash.com/photo-1465311440653-ba9b1d9b0f5d?w=1200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1508931133506-80d3bb2b9d84?w=1200&auto=format&fit=crop',
    symbol: '◉',
    primaryColor: '#1E2F44',
    secondaryColor: '#506681',
    accentColor: '#B7AA91',
    designPhilosophy: 'Editorial, restrained, and museum-like.',
    culturalMeaning: 'Endurance, transmission, and dignity of craft.',
    historicalContext: 'Inspired by High Atlas architecture and Amazigh visual systems.',
    status: 'published',
    archiveCount: 8,
    collectionCount: 4,
    productCount: 24,
    keeperCount: 3241,
    releaseCount: 6,
    qrScans: 4820,
    votes: 14892,
    communityContributions: 418,
    versionHistory: [{ version: 'v1.3', date: '2026-07-18', note: 'Unified archive and release taxonomy.' }],
  },
  {
    id: 'legacy-atlas-memory',
    name: 'Atlas Memory',
    amazighName: 'Akal n Tazrigt',
    tifinaghName: 'ⴰⴽⴰⵍ ⵏ ⵜⴰⵣⵔⵉⴳⵜ',
    slug: 'atlas-memory',
    shortDescription: 'A mountain legacy focused on textiles, routes, and regional craft.',
    longDescription: 'Atlas Memory translates mountain routes and weaving traditions into a structured legacy for future archive and release planning.',
    legacyType: 'Craftsmanship',
    coverImageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&auto=format&fit=crop',
    symbol: '◌',
    primaryColor: '#22364D',
    secondaryColor: '#5E6F76',
    accentColor: '#C09B73',
    designPhilosophy: 'Observational, tactile, and grounded.',
    culturalMeaning: 'Resilience, movement, and intergenerational craft.',
    historicalContext: 'Based on regional textile systems and mountain memory.',
    status: 'draft',
    archiveCount: 4,
    collectionCount: 2,
    productCount: 11,
    keeperCount: 894,
    releaseCount: 2,
    qrScans: 820,
    votes: 4120,
    communityContributions: 128,
    versionHistory: [{ version: 'v0.9', date: '2026-06-28', note: 'Added textile references and release planning.' }],
  },
]

const emptyForm = (): LegacyFormState => ({ name: '', amazighName: '', tifinaghName: '', slug: '', legacyType: 'History', coverImageUrl: '', shortDescription: '' })

const emptyLegacy = (): LegacyRecord => ({
  id: `legacy-${Date.now()}`,
  name: '', amazighName: '', tifinaghName: '', slug: '', shortDescription: '', longDescription: '', legacyType: 'History',
  coverImageUrl: '', heroImageUrl: '', symbol: '◉', primaryColor: INDIGO, secondaryColor: TEXT_SEC, accentColor: SAND,
  designPhilosophy: '', culturalMeaning: '', historicalContext: '', status: 'draft',
  archiveCount: 0, collectionCount: 0, productCount: 0, keeperCount: 0, releaseCount: 0, qrScans: 0, votes: 0, communityContributions: 0, versionHistory: [],
})

function Dialog({ children, onClose, width = 1100 }: { children: React.ReactNode; onClose: () => void; width?: number }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(30,47,68,0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: width, maxHeight: '90vh', overflowY: 'auto', borderRadius: 24, background: BG, border: `1px solid ${BORDER}`, boxShadow: '0 30px 80px rgba(0,0,0,0.25)' }} onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16 }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: INDIGO, lineHeight: 1 }}>{value.toLocaleString()}</div>
      <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 6 }}>{label}</div>
    </div>
  )
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
      <input value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none', fontSize: 13 }} />
    </label>
  )
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16 }}>
      <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.75, whiteSpace: 'pre-line' }}>{text}</div>
    </div>
  )
}

export default function Legacies({ onNavigate }: Props) {
  const [legacies, setLegacies] = useState<LegacyRecord[]>(FALLBACK_LEGACIES)
  const [selectedId, setSelectedId] = useState<string | null>(FALLBACK_LEGACIES[0]?.id ?? null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [form, setForm] = useState<LegacyFormState>(emptyForm())
  const [message, setMessage] = useState('Loading legacy cards...')

  const selected = useMemo(() => legacies.find(legacy => legacy.id === selectedId) ?? null, [legacies, selectedId])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const records = await api.get<Array<Record<string, unknown>>>('/resources/legacies')
        if (cancelled) return
        if (!records.length) {
          setMessage('No legacies found yet. Showing curated preview cards.')
          return
        }

        const normalized = records.map((record, index) => ({
          ...emptyLegacy(),
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
          primaryColor: String(record.primaryColor ?? INDIGO),
          secondaryColor: String(record.secondaryColor ?? TEXT_SEC),
          accentColor: String(record.accentColor ?? SAND),
          designPhilosophy: String(record.designPhilosophy ?? ''),
          culturalMeaning: String(record.culturalMeaning ?? ''),
          historicalContext: String(record.historicalContext ?? ''),
          status: (record.status as LegacyStatus) ?? 'draft',
          archiveCount: Number(record.archiveCount ?? 0),
          collectionCount: Number(record.collectionCount ?? 0),
          productCount: Number(record.productCount ?? 0),
          keeperCount: Number(record.keeperCount ?? 0),
          releaseCount: Number(record.releaseCount ?? 0),
          qrScans: Number(record.qrScans ?? 0),
          votes: Number(record.votes ?? 0),
          communityContributions: Number(record.communityContributions ?? 0),
          versionHistory: Array.isArray(record.versionHistory) ? record.versionHistory as LegacyRecord['versionHistory'] : [],
        })) as LegacyRecord[]

        setLegacies(normalized)
        setSelectedId(normalized[0]?.id ?? null)
        setMessage(`Loaded ${normalized.length} legacies from MongoDB.`)
      } catch {
        setMessage('MongoDB is unavailable. Showing local preview cards.')
      }
    }

    void load()
    return () => { cancelled = true }
  }, [])

  const createLegacy = async () => {
    const payload = {
      ...emptyLegacy(),
      name: form.name,
      amazighName: form.amazighName,
      tifinaghName: form.tifinaghName,
      slug: form.slug,
      legacyType: form.legacyType,
      coverImageUrl: form.coverImageUrl,
      heroImageUrl: form.coverImageUrl,
      shortDescription: form.shortDescription,
      longDescription: form.shortDescription,
    }

    try {
      const created = await api.post<LegacyRecord>('/resources/legacies', payload)
      setLegacies(current => [created, ...current])
      setSelectedId(created.id)
      setCreateOpen(false)
      setDetailOpen(true)
      setMessage('Legacy created successfully.')
    } catch {
      const created = { ...payload, id: `legacy-${Date.now()}` } as LegacyRecord
      setLegacies(current => [created, ...current])
      setSelectedId(created.id)
      setCreateOpen(false)
      setDetailOpen(true)
      setMessage('Legacy created locally. Connect the API to persist it.')
    }
  }

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 1520, margin: '0 auto', background: BG, minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 22 }}>
        <div style={{ maxWidth: 780 }}>
          <div style={{ fontSize: 11, color: TEXT_SEC, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Legacy Module</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.05 }}>Legacies</h1>
          <p style={{ margin: '12px 0 0', color: TEXT_SEC, fontSize: 14, lineHeight: 1.7 }}>Cards only. Each legacy is shown as a visual card with a cover image and core metadata. Click a card to open its detailed modal.</p>
        </div>
        <button onClick={() => { setForm(emptyForm()); setCreateOpen(true) }} style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 14, padding: '11px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(30,47,68,0.12)' }}>+ Create</button>
      </div>

      <div style={{ marginBottom: 18, fontSize: 12, color: TEXT_SEC }}>{message}</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 18 }}>
        {legacies.map(legacy => (
          <button key={legacy.id} onClick={() => { setSelectedId(legacy.id); setDetailOpen(true) }} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 22, overflow: 'hidden', cursor: 'pointer', padding: 0, textAlign: 'left', boxShadow: '0 4px 18px rgba(30,47,68,0.05)' }}>
            <div style={{ height: 220, position: 'relative', background: `url(${legacy.coverImageUrl}) center/cover no-repeat` }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,47,68,0.72), rgba(30,47,68,0.04))' }} />
              <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'rgba(231,223,210,0.14)', color: CREAM }}>{legacy.legacyType}</span>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'rgba(231,223,210,0.14)', color: CREAM, textTransform: 'uppercase' }}>{legacy.status}</span>
              </div>
              <div style={{ position: 'absolute', right: 16, bottom: 16, width: 56, height: 56, borderRadius: 18, background: 'rgba(231,223,210,0.14)', border: `1px solid rgba(231,223,210,0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CREAM, fontSize: 24 }}>{legacy.symbol || '◉'}</div>
              <div style={{ position: 'absolute', left: 16, bottom: 16, right: 84 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: CREAM, fontWeight: 500, lineHeight: 1.1 }}>{legacy.name || 'Untitled Legacy'}</div>
                <div style={{ fontSize: 12, color: 'rgba(231,223,210,0.82)', marginTop: 6 }}>{legacy.amazighName || 'Amazigh name missing'}</div>
              </div>
            </div>

            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.65, minHeight: 52 }}>{legacy.shortDescription || 'No short description yet.'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginTop: 18 }}>
                <Stat value={legacy.archiveCount} label="Archives" />
                <Stat value={legacy.productCount} label="Products" />
                <Stat value={legacy.keeperCount} label="Keepers" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {detailOpen && selected && (
        <Dialog onClose={() => setDetailOpen(false)} width={1160}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.12fr) minmax(320px, 0.88fr)' }}>
            <div style={{ minHeight: 360, position: 'relative', background: `url(${selected.heroImageUrl || selected.coverImageUrl}) center/cover no-repeat` }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(30,47,68,0.84), rgba(30,47,68,0.24))' }} />
              <button onClick={() => setDetailOpen(false)} style={{ position: 'absolute', top: 18, right: 18, width: 38, height: 38, borderRadius: 999, background: 'rgba(231,223,210,0.14)', border: `1px solid rgba(231,223,210,0.18)`, color: CREAM, cursor: 'pointer', fontSize: 18 }}>×</button>
              <div style={{ position: 'relative', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 360 }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'rgba(231,223,210,0.14)', color: CREAM }}>{selected.legacyType}</span>
                    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'rgba(231,223,210,0.14)', color: CREAM, textTransform: 'uppercase' }}>{selected.status}</span>
                  </div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 500, color: CREAM, margin: 0, lineHeight: 1.05 }}>{selected.name}</h2>
                  <div style={{ marginTop: 10, color: 'rgba(231,223,210,0.85)', fontSize: 14 }}>{selected.amazighName} · {selected.tifinaghName}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(231,223,210,0.14)', border: `1px solid rgba(231,223,210,0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CREAM, fontSize: 28 }}>{selected.symbol}</div>
                  <div style={{ color: 'rgba(231,223,210,0.82)', fontSize: 13, lineHeight: 1.6, maxWidth: 520 }}>{selected.shortDescription}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: 24, background: BG }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Detailed Information</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: INDIGO, marginTop: 6 }}>Legacy profile</div>
                </div>
                <button onClick={() => setDetailOpen(false)} style={{ border: `1px solid ${BORDER}`, background: SURFACE, color: TEXT, borderRadius: 12, padding: '10px 14px', cursor: 'pointer' }}>Close</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, marginBottom: 18 }}>
                <Stat value={selected.archiveCount} label="Archives" />
                <Stat value={selected.collectionCount} label="Collections" />
                <Stat value={selected.productCount} label="Products" />
                <Stat value={selected.releaseCount} label="Releases" />
                <Stat value={selected.qrScans} label="QR Scans" />
                <Stat value={selected.votes} label="Votes" />
              </div>

              <div style={{ display: 'grid', gap: 14 }}>
                <Block title="Long Description" text={selected.longDescription} />
                <Block title="Design Language" text={selected.designPhilosophy} />
                <Block title="Cultural Identity" text={`${selected.culturalMeaning}\n\n${selected.historicalContext}`} />

                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Relations</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
                    <Relation label="Archives" count={selected.archiveCount} onClick={() => onNavigate('legacy-archives')} />
                    <Relation label="Collections" count={selected.collectionCount} onClick={() => onNavigate('collections')} />
                    <Relation label="Products" count={selected.productCount} onClick={() => onNavigate('products')} />
                    <Relation label="Keeper Circle" count={selected.keeperCount} onClick={() => onNavigate('legacy-keeper-circle')} />
                    <Relation label="Legacy Releases" count={selected.releaseCount} onClick={() => onNavigate('legacy-timeline')} />
                    <Relation label="Voting" count={selected.votes} onClick={() => onNavigate('legacy-voting')} />
                  </div>
                </div>

                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Version History</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {selected.versionHistory.map(version => (
                      <div key={`${version.version}-${version.date}`} style={{ background: '#FAF7F1', border: `1px solid ${BORDER}`, borderRadius: 12, padding: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: INDIGO }}>{version.version}</div>
                          <div style={{ fontSize: 11, color: TEXT_SEC }}>{version.date}</div>
                        </div>
                        <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 6, lineHeight: 1.6 }}>{version.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginTop: 18 }}>
                <button onClick={() => setDetailOpen(false)} style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 12, padding: '11px 14px', cursor: 'pointer', fontWeight: 600 }}>Done</button>
                <button onClick={() => { setDetailOpen(false); setCreateOpen(true); setForm(emptyForm()) }} style={{ background: 'transparent', color: INDIGO, border: `1px solid ${INDIGO}`, borderRadius: 12, padding: '11px 14px', cursor: 'pointer', fontWeight: 600 }}>Create Legacy</button>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {createOpen && (
        <Dialog onClose={() => setCreateOpen(false)} width={760}>
          <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Create Legacy</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, color: INDIGO, marginTop: 6 }}>New legacy card</div>
              </div>
              <button onClick={() => setCreateOpen(false)} style={{ border: `1px solid ${BORDER}`, background: SURFACE, color: TEXT, borderRadius: 12, padding: '10px 14px', cursor: 'pointer' }}>Close</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
              <TextField label="Legacy Name" value={form.name} onChange={value => setForm(current => ({ ...current, name: value }))} />
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Legacy Type</span>
                <select value={form.legacyType} onChange={event => setForm(current => ({ ...current, legacyType: event.target.value as LegacyType }))} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '10px 12px', background: '#FAF7F1', color: TEXT, outline: 'none', fontSize: 13 }}>
                  {LEGACY_TYPES.map(type => <option key={type}>{type}</option>)}
                </select>
              </label>
              <TextField label="Amazigh Name" value={form.amazighName} onChange={value => setForm(current => ({ ...current, amazighName: value }))} />
              <TextField label="Tifinagh Name" value={form.tifinaghName} onChange={value => setForm(current => ({ ...current, tifinaghName: value }))} />
              <TextField label="Slug" value={form.slug} onChange={value => setForm(current => ({ ...current, slug: value }))} />
              <TextField label="Cover Image" value={form.coverImageUrl} onChange={value => setForm(current => ({ ...current, coverImageUrl: value }))} placeholder="https://" />
              <div style={{ gridColumn: '1 / -1' }}>
                <TextField label="Short Description" value={form.shortDescription} onChange={value => setForm(current => ({ ...current, shortDescription: value }))} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
              <button onClick={() => setCreateOpen(false)} style={{ border: `1px solid ${BORDER}`, background: SURFACE, color: TEXT, borderRadius: 12, padding: '11px 14px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={createLegacy} style={{ background: INDIGO, color: CREAM, border: 'none', borderRadius: 12, padding: '11px 14px', cursor: 'pointer', fontWeight: 600 }}>Create Legacy</button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  )
}

function Relation({ label, count, onClick }: { label: string; count: number; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ textAlign: 'left', background: '#FAF7F1', border: `1px solid ${BORDER}`, borderRadius: 12, padding: 10, cursor: 'pointer' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: INDIGO }}>{label}</div>
      <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 4 }}>{count.toLocaleString()} connected</div>
    </button>
  )
}
