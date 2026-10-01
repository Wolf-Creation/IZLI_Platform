import { useEffect, useState, type ChangeEvent } from 'react'
import type { Screen } from '../../../types'
import type { Collection, MediaAsset, OfficialCollectionType } from '../../../entities'
import { createCollection, getAdminCollections, updateCollection, uploadCollectionImage } from '../../../shared/services/collections'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const MUTED = '#506681'
const BORDER = '#D8D0C4'
const EMPTY_COLLECTION: Partial<Collection> = {
  name: '', slug: '', type: 'LEGACY', tagline: '', shortDescription: '', description: '',
  displayOrder: 1, isFeatured: true, isActive: true, status: 'active', coverImage: null, heroImage: null,
}
const TYPES: { value: OfficialCollectionType; label: string }[] = [
  { value: 'LEGACY', label: 'Legacy' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'ESSENTIALS', label: 'Essentials' },
  { value: 'COMMUNITY_LAB', label: 'Community Lab' },
]

interface Props { onNavigate: (screen: Screen) => void; collectionId: string | null; onDone: () => void }

function slugify(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

const fieldStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '11px 13px', border: `1px solid ${BORDER}`, background: '#FBF9F5', color: TEXT, font: '13px Inter, sans-serif' }

export default function CollectionEditor({ onNavigate, collectionId, onDone }: Props) {
  const [form, setForm] = useState<Partial<Collection>>(EMPTY_COLLECTION)
  const [slugEdited, setSlugEdited] = useState(false)
  const [loading, setLoading] = useState(Boolean(collectionId))
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<'coverImage' | 'heroImage' | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!collectionId) {
      setForm(EMPTY_COLLECTION)
      setSlugEdited(false)
      setLoading(false)
      return
    }
    setLoading(true)
    getAdminCollections()
      .then(collections => {
        const collection = collections.find(item => item.id === collectionId)
        if (!collection) throw new Error('Collection not found.')
        setForm({ ...EMPTY_COLLECTION, ...collection })
        setSlugEdited(true)
      })
      .catch(requestError => setError(requestError instanceof Error ? requestError.message : 'Collection could not be loaded.'))
      .finally(() => setLoading(false))
  }, [collectionId])

  const update = (field: keyof Collection, value: string | number | boolean | null) => {
    setForm(current => ({ ...current, [field]: value }))
  }

  const onImage = async (field: 'coverImage' | 'heroImage', event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return
    setUploading(field)
    setError('')
    try {
      const uploaded = await uploadCollectionImage(file)
      const asset: MediaAsset = {
        field,
        url: uploaded.url,
        publicId: uploaded.publicId,
        resourceType: uploaded.resourceType,
        format: uploaded.format,
        width: uploaded.width,
        height: uploaded.height,
        bytes: uploaded.bytes,
      }
      setForm(current => ({
        ...current,
        [field]: uploaded.url,
        mediaAssets: [...(current.mediaAssets ?? []).filter(existing => existing.field !== field), asset],
      }))
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Image upload failed.')
    } finally {
      setUploading(null)
    }
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const payload = { ...form, slug: slugify(form.slug || form.name || '') }
      if (collectionId) await updateCollection(collectionId, payload)
      else await createCollection(payload)
      onDone()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Collection could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ padding: 48, color: MUTED }}>Loading collection...</div>

  return <main style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 48px 80px', color: TEXT }}>
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 28 }}>
      <div><p style={{ margin: 0, color: '#8C6B52', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Collection management</p><h1 style={{ margin: '8px 0 0', color: INDIGO, font: "500 30px 'Playfair Display', serif" }}>{collectionId ? form.name || 'Edit collection' : 'New collection'}</h1></div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="button" onClick={() => onNavigate('collections')} style={{ padding: '10px 15px', border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer' }}>Cancel</button>
        <button type="button" onClick={() => void save()} disabled={saving || Boolean(uploading)} style={{ padding: '10px 18px', border: 0, background: INDIGO, color: '#F5F1EA', cursor: saving ? 'wait' : 'pointer' }}>{saving ? 'Saving...' : 'Save collection'}</button>
      </div>
    </header>
    {error && <p role="alert" style={{ padding: 12, background: '#F9EDEA', color: '#A63D2F', fontSize: 13 }}>{error}</p>}

    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, padding: 24, border: `1px solid ${BORDER}`, background: '#F7F3EC' }}>
      <label style={{ display: 'grid', gap: 7, color: MUTED, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Name<input required value={form.name ?? ''} onChange={event => { const name = event.target.value; setForm(current => ({ ...current, name, ...(!slugEdited ? { slug: slugify(name) } : {}) })) }} style={fieldStyle} /></label>
      <label style={{ display: 'grid', gap: 7, color: MUTED, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Slug<input required value={form.slug ?? ''} onChange={event => { setSlugEdited(true); update('slug', slugify(event.target.value)) }} style={fieldStyle} /></label>
      <label style={{ display: 'grid', gap: 7, color: MUTED, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Type<select value={form.type ?? 'LEGACY'} onChange={event => update('type', event.target.value)} style={fieldStyle}>{TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label>
      <label style={{ display: 'grid', gap: 7, color: MUTED, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Display order<input required type="number" min="1" value={form.displayOrder ?? 1} onChange={event => update('displayOrder', Number(event.target.value))} style={fieldStyle} /></label>
      <label style={{ display: 'grid', gap: 7, color: MUTED, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', gridColumn: '1 / -1' }}>Tagline<input required value={form.tagline ?? ''} onChange={event => update('tagline', event.target.value)} style={fieldStyle} /></label>
      <label style={{ display: 'grid', gap: 7, color: MUTED, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', gridColumn: '1 / -1' }}>Short description<textarea required value={form.shortDescription ?? ''} onChange={event => update('shortDescription', event.target.value)} rows={3} style={{ ...fieldStyle, resize: 'vertical' }} /></label>
      <label style={{ display: 'grid', gap: 7, color: MUTED, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', gridColumn: '1 / -1' }}>Description<textarea value={form.description ?? ''} onChange={event => update('description', event.target.value)} rows={6} style={{ ...fieldStyle, resize: 'vertical' }} /></label>
      {(['coverImage', 'heroImage'] as const).map(field => {
        const label = field === 'coverImage' ? 'Cover image' : 'Hero image'
        const image = form[field] || (field === 'coverImage' ? form.coverImageUrl : null)
        return <div key={field} style={{ display: 'grid', gap: 8, color: MUTED, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
          <span>{label}</span>
          <div style={{ display: 'grid', minHeight: 150, placeItems: 'center', overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#EDE8DF' }}>{image ? <img src={image} alt={label} style={{ width: '100%', height: '100%', maxHeight: 220, objectFit: 'cover' }} /> : <span>No image selected</span>}</div>
          <label style={{ display: 'inline-flex', width: 'fit-content', padding: '8px 12px', border: `1px solid ${BORDER}`, color: INDIGO, cursor: 'pointer', textTransform: 'none' }}>{uploading === field ? 'Uploading...' : `Upload ${label.toLowerCase()}`}<input type="file" accept="image/*" onChange={event => void onImage(field, event)} style={{ display: 'none' }} /></label>
        </div>
      })}
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: MUTED, fontSize: 12 }}><input type="checkbox" checked={Boolean(form.isFeatured)} onChange={event => update('isFeatured', event.target.checked)} />Featured collection</label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: MUTED, fontSize: 12 }}><input type="checkbox" checked={Boolean(form.isActive)} onChange={event => update('isActive', event.target.checked)} />Active on website</label>
    </section>
  </main>
}