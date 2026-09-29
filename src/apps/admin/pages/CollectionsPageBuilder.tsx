import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import type { Collection, OfficialCollectionType } from '../../../entities'
import {
  DEFAULT_COLLECTIONS_PAGE_CONFIG,
  createCollection,
  getAdminCollections,
  getCollectionsPageConfig,
  saveCollectionsPageConfig,
  updateCollection,
  uploadCollectionImage,
  type CollectionsPageConfig,
} from '../../../shared/services/collections'

const INK = '#1E2F44'
const MUTED = '#506681'
const BORDER = '#D8D0C4'
const FIELD: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: `1px solid ${BORDER}`, background: '#FBF9F5', color: '#2E2E2E', font: '13px Inter, sans-serif' }
const NEW_COLLECTION = { name: '', type: 'LEGACY' as OfficialCollectionType, tagline: '', shortDescription: '' }

function slugify(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function orderedSlugs(config: CollectionsPageConfig, collections: Collection[]) {
  const rank = new Map(config.collectionOrder.map((slug, index) => [slug, index]))
  return [...collections]
    .sort((left, right) => (rank.get(left.slug) ?? Number.MAX_SAFE_INTEGER) - (rank.get(right.slug) ?? Number.MAX_SAFE_INTEGER) || (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
    .map(collection => collection.slug)
}

export default function CollectionsPageBuilder() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [config, setConfig] = useState<CollectionsPageConfig>(DEFAULT_COLLECTIONS_PAGE_CONFIG)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savingCollection, setSavingCollection] = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false)
  const [newCollection, setNewCollection] = useState(NEW_COLLECTION)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getAdminCollections(), getCollectionsPageConfig()])
      .then(([items, pageConfig]) => {
        setCollections(items)
        setConfig({
          ...DEFAULT_COLLECTIONS_PAGE_CONFIG,
          ...pageConfig,
          collectionOrder: orderedSlugs(pageConfig, items),
          visibleCollectionSlugs: items.filter(item => pageConfig.visibleCollectionSlugs.includes(item.slug)).map(item => item.slug),
        })
      })
      .catch(requestError => setError(requestError instanceof Error ? requestError.message : 'Collections builder could not be loaded.'))
      .finally(() => setLoading(false))
  }, [])

  const collectionBySlug = useMemo(() => new Map(collections.map(collection => [collection.slug, collection])), [collections])
  const updateConfig = <K extends keyof CollectionsPageConfig>(key: K, value: CollectionsPageConfig[K]) => {
    setConfig(current => ({ ...current, [key]: value }))
    setMessage('Unsaved changes')
  }

  const moveCollection = (slug: string, direction: -1 | 1) => {
    const currentOrder = orderedSlugs(config, collections)
    const from = currentOrder.indexOf(slug)
    const to = from + direction
    if (from < 0 || to < 0 || to >= currentOrder.length) return
    const nextOrder = [...currentOrder]
    ;[nextOrder[from], nextOrder[to]] = [nextOrder[to], nextOrder[from]]
    updateConfig('collectionOrder', nextOrder)
  }

  const toggleVisible = (slug: string, visible: boolean) => {
    const next = new Set(config.visibleCollectionSlugs)
    if (visible) next.add(slug)
    else next.delete(slug)
    updateConfig('visibleCollectionSlugs', orderedSlugs(config, collections).filter(item => next.has(item)))
  }

  const onImage = async (collection: Collection, field: 'coverImage' | 'heroImage', event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return
    setUploading(`${collection.id}:${field}`)
    setError('')
    setMessage('Uploading image to Cloudinary...')
    try {
      const imageUrl = await uploadCollectionImage(file)
      const updated = await updateCollection(collection.id, { [field]: imageUrl })
      setCollections(items => items.map(item => item.id === updated.id
        ? { ...updated, name: item.name, tagline: item.tagline, shortDescription: item.shortDescription }
        : item))
      setMessage(`${field === 'coverImage' ? 'Card image' : 'Hero image'} saved for ${collection.name}`)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Image upload failed.')
      setMessage('')
    } finally {
      setUploading(null)
    }
  }

  const updateCollectionDraft = (id: string, field: 'name' | 'tagline' | 'shortDescription', value: string) => {
    setCollections(items => items.map(item => item.id === id ? { ...item, [field]: value } : item))
    setMessage('Unsaved collection changes')
  }

  const saveCollection = async (collection: Collection) => {
    setSavingCollection(collection.id)
    setError('')
    try {
      const saved = await updateCollection(collection.id, {
        name: collection.name,
        slug: collection.slug,
        tagline: collection.tagline,
        shortDescription: collection.shortDescription,
      })
      setCollections(items => items.map(item => item.id === saved.id ? { ...item, ...saved } : item))
      setMessage(`${collection.name} content saved`)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Collection content could not be saved.')
    } finally {
      setSavingCollection(null)
    }
  }

  const addCollection = async () => {
    setSavingCollection('new')
    setError('')
    try {
      const created = await createCollection({
        ...newCollection,
        slug: slugify(newCollection.name),
        displayOrder: collections.length + 1,
        description: newCollection.shortDescription,
        status: 'active',
        isActive: true,
        isFeatured: false,
      })
      setCollections(items => [...items, created])
      setConfig(current => ({
        ...current,
        collectionOrder: [...current.collectionOrder, created.slug],
        visibleCollectionSlugs: [...current.visibleCollectionSlugs, created.slug],
      }))
      setNewCollection(NEW_COLLECTION)
      setShowNewCollectionForm(false)
      setMessage(`${created.name} created. Save page to publish it.`)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Collection could not be created.')
    } finally {
      setSavingCollection(null)
    }
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const saved = await saveCollectionsPageConfig({ ...config, collectionOrder: orderedSlugs(config, collections) })
      setConfig(saved)
      setMessage('Collections page saved')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Page configuration could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ padding: 40, color: MUTED }}>Loading Collections page settings...</div>

  return <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 40px 72px', color: '#2E2E2E' }}>
    <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 24 }}>
      <div><p style={{ margin: 0, color: '#8C6B52', fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Website Builder / Collections</p><h2 style={{ margin: '8px 0 0', color: INK, font: "500 28px 'Playfair Display', serif" }}>Collections page</h2></div>
      <button type="button" onClick={() => void save()} disabled={saving || Boolean(uploading)} style={{ padding: '10px 18px', border: 0, background: INK, color: '#F5F1EA', cursor: saving ? 'wait' : 'pointer' }}>{saving ? 'Saving...' : 'Save page'}</button>
    </header>
    {message && <p role="status" style={{ color: MUTED, fontSize: 12 }}>{message}</p>}
    {error && <p role="alert" style={{ color: '#A63D2F', fontSize: 12 }}>{error}</p>}

    <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 24, alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: 18 }}>
        <div style={{ display: 'grid', gap: 16, padding: 22, border: `1px solid ${BORDER}`, background: '#F5F1EA' }}>
          <h3 style={{ margin: 0, color: INK, fontSize: 14 }}>Page introduction</h3>
          <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 11, fontWeight: 700 }}>PAGE TITLE<input value={config.title} onChange={event => updateConfig('title', event.target.value)} style={FIELD} /></label>
          <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 11, fontWeight: 700 }}>INTRODUCTION LINE 1<input value={config.descriptions[0] ?? ''} onChange={event => updateConfig('descriptions', [event.target.value, config.descriptions[1] ?? ''])} style={FIELD} /></label>
          <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 11, fontWeight: 700 }}>INTRODUCTION LINE 2<input value={config.descriptions[1] ?? ''} onChange={event => updateConfig('descriptions', [config.descriptions[0] ?? '', event.target.value])} style={FIELD} /></label>
          <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 11, fontWeight: 700 }}>SECTION HEADING<input value={config.sectionTitle} onChange={event => updateConfig('sectionTitle', event.target.value)} style={FIELD} /></label>
        </div>

        <div style={{ display: 'grid', gap: 14, padding: 22, border: `1px solid ${BORDER}`, background: '#F5F1EA' }}>
          <h3 style={{ margin: 0, color: INK, fontSize: 14 }}>Collection cards and media</h3>
          <p style={{ margin: 0, color: MUTED, fontSize: 12 }}>Card and hero images are stored on Cloudinary and linked to each collection record.</p>
          <button type="button" onClick={() => setShowNewCollectionForm(value => !value)} style={{ justifySelf: 'start', padding: '8px 12px', border: `1px solid ${BORDER}`, background: '#FBF9F5', color: INK, cursor: 'pointer' }}>{showNewCollectionForm ? 'Cancel new collection' : '+ Add collection'}</button>
          {showNewCollectionForm && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16, border: `1px solid ${BORDER}`, background: '#FBF9F5' }}>
            <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700 }}>COLLECTION NAME<input autoFocus value={newCollection.name} onChange={event => setNewCollection(current => ({ ...current, name: event.target.value }))} style={FIELD} /></label>
            <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700 }}>TYPE<select value={newCollection.type} onChange={event => setNewCollection(current => ({ ...current, type: event.target.value as OfficialCollectionType }))} style={FIELD}><option value="LEGACY">Legacy</option><option value="STUDIO">Studio</option><option value="ESSENTIALS">Essentials</option><option value="COMMUNITY_LAB">Community Lab</option></select></label>
            <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700 }}>TAGLINE<input value={newCollection.tagline} onChange={event => setNewCollection(current => ({ ...current, tagline: event.target.value }))} style={FIELD} /></label>
            <label style={{ display: 'grid', gridColumn: '1 / -1', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700 }}>SHORT DESCRIPTION<textarea value={newCollection.shortDescription} onChange={event => setNewCollection(current => ({ ...current, shortDescription: event.target.value }))} rows={2} style={{ ...FIELD, resize: 'vertical' }} /></label>
            <button type="button" onClick={() => void addCollection()} disabled={savingCollection === 'new' || !newCollection.name.trim() || !newCollection.tagline.trim() || !newCollection.shortDescription.trim()} style={{ gridColumn: '1 / -1', justifySelf: 'end', padding: '9px 14px', border: 0, background: INK, color: '#F5F1EA', cursor: 'pointer' }}>{savingCollection === 'new' ? 'Adding...' : 'Create collection'}</button>
          </div>}
          {orderedSlugs(config, collections).map((slug, index) => {
            const collection = collectionBySlug.get(slug)
            if (!collection) return null
            const cover = collection.coverImage || collection.coverImageUrl
            const hero = collection.heroImage
            return <article key={collection.id} style={{ display: 'grid', gap: 14, padding: 16, border: `1px solid ${BORDER}`, background: '#FBF9F5' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 14, alignItems: 'start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <button type="button" disabled={index === 0} onClick={() => moveCollection(slug, -1)} aria-label={`Move ${collection.name} up`} style={{ border: `1px solid ${BORDER}`, background: '#F5F1EA', color: INK, cursor: index === 0 ? 'default' : 'pointer' }}>↑</button>
                  <button type="button" disabled={index === collections.length - 1} onClick={() => moveCollection(slug, 1)} aria-label={`Move ${collection.name} down`} style={{ border: `1px solid ${BORDER}`, background: '#F5F1EA', color: INK, cursor: index === collections.length - 1 ? 'default' : 'pointer' }}>↓</button>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[{ field: 'coverImage' as const, label: 'Card', src: cover }, { field: 'heroImage' as const, label: 'Hero', src: hero }].map(media => <label key={media.field} title={`Upload ${media.label} image for ${collection.name}`} style={{ position: 'relative', display: 'grid', width: 64, height: 72, overflow: 'hidden', placeItems: 'center', border: `1px solid ${BORDER}`, background: '#EDE8DF', color: MUTED, fontSize: 9, cursor: 'pointer' }}>
                    {media.src ? <img src={media.src} alt={`${collection.name} ${media.label}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>{media.label} image</span>}
                    <input type="file" accept="image/*" disabled={Boolean(uploading)} onChange={event => void onImage(collection, media.field, event)} style={{ display: 'none' }} />
                  </label>)}
                </div>
                <div style={{ minWidth: 0 }}><strong style={{ display: 'block', color: INK, fontSize: 13 }}>{String(index + 1).padStart(2, '0')} · {collection.name}</strong><span style={{ color: MUTED, fontSize: 11 }}>{collection.tagline}</span></div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, color: MUTED, fontSize: 11, whiteSpace: 'nowrap' }}><input type="checkbox" checked={config.visibleCollectionSlugs.includes(slug)} onChange={event => toggleVisible(slug, event.target.checked)} />On page</label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700 }}>COLLECTION NAME<input value={collection.name} onChange={event => updateCollectionDraft(collection.id, 'name', event.target.value)} style={FIELD} /></label>
                <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700 }}>TAGLINE<input value={collection.tagline ?? ''} onChange={event => updateCollectionDraft(collection.id, 'tagline', event.target.value)} style={FIELD} /></label>
                <label style={{ display: 'grid', gridColumn: '1 / -1', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700 }}>SHORT DESCRIPTION<textarea value={collection.shortDescription ?? ''} onChange={event => updateCollectionDraft(collection.id, 'shortDescription', event.target.value)} rows={2} style={{ ...FIELD, resize: 'vertical' }} /></label>
              </div>
              <button type="button" onClick={() => void saveCollection(collection)} disabled={savingCollection === collection.id || Boolean(uploading)} style={{ justifySelf: 'end', padding: '8px 12px', border: `1px solid ${BORDER}`, background: '#F5F1EA', color: INK, cursor: savingCollection === collection.id ? 'wait' : 'pointer' }}>{savingCollection === collection.id ? 'Saving...' : 'Save collection content'}</button>
            </article>
          })}
        </div>
      </div>

      <aside style={{ position: 'sticky', top: 24, display: 'grid', gap: 12, padding: 18, border: `1px solid ${BORDER}`, background: '#F5F1EA' }}>
        <h3 style={{ margin: 0, color: INK, fontSize: 14 }}>Section display</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: 9, color: MUTED, fontSize: 12 }}><input type="checkbox" checked={config.showTagline} onChange={event => updateConfig('showTagline', event.target.checked)} />Show collection tagline</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 9, color: MUTED, fontSize: 12 }}><input type="checkbox" checked={config.showShortDescription} onChange={event => updateConfig('showShortDescription', event.target.checked)} />Show short description</label>
        <label style={{ display: 'grid', gap: 6, color: MUTED, fontSize: 11, fontWeight: 700 }}>CARD COLUMNS<select value={config.columns} onChange={event => updateConfig('columns', Number(event.target.value) as 1 | 2)} style={FIELD}><option value={2}>2 columns</option><option value={1}>1 column</option></select></label>
        <button type="button" onClick={() => void save()} disabled={saving || Boolean(uploading)} style={{ marginTop: 6, padding: '10px 14px', border: 0, background: INK, color: '#F5F1EA', cursor: saving ? 'wait' : 'pointer' }}>{saving ? 'Saving...' : 'Save page settings'}</button>
      </aside>
    </section>
  </div>
}
