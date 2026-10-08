import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import type { Screen } from '../../../types'
import type { MediaUploadResult } from '../../../entities'
import { api } from '../../../shared/services/api'
import { getHeroOverlayGradient, type HeroOverlayPosition } from '../../../shared/services/home'
import {
  DEFAULT_HOME_PAGE_CONFIG,
  getHomePageConfig,
  saveHomePageConfig,
  type HomePageConfig,
  type HomePageSection,
  type KeeperBenefit,
  type HomeSectionType,
} from '../../../shared/services/home'
import { useProducts } from '../../../shared/hooks/useProducts'
import CollectionsPageBuilder from './CollectionsPageBuilder'

const INK = '#1E2F44'
const TEXT = '#2E2E2E'
const MUTED = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const FIELD: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: `1px solid ${BORDER}`, background: '#FBF9F5', color: TEXT, font: '13px Inter, sans-serif' }

const SECTION_META: Record<HomeSectionType, { label: string; icon: string; summary: string }> = {
  hero: { label: 'Hero slider', icon: '◈', summary: 'Featured product carousel and editable copy' },
  'new-releases': { label: 'New releases', icon: '▦', summary: 'Live Release 01 product carousel' },
  tops: { label: 'Tops', icon: '▤', summary: 'Tops editorial and featured products' },
  bottoms: { label: 'Bottoms', icon: '▤', summary: 'Bottoms editorial and featured products' },
  'keeper-circle': { label: 'Keeper Circle', icon: '◯', summary: 'Introduction and three benefit panels' },
}

const SECTION_TYPES = Object.keys(SECTION_META) as HomeSectionType[]

interface Props {
  onNavigate: (screen: Screen) => void
  onUploadProgress: (label: string, progress: number) => void
  onUploadComplete: (label: string) => void
  onUploadError: () => void
}

function newSectionId(type: HomeSectionType) {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function createSection(type: HomeSectionType): HomePageSection {
  const defaults = DEFAULT_HOME_PAGE_CONFIG.sections.find(section => section.type === type)!
  return { ...defaults, id: newSectionId(type) }
}

export default function HomePageBuilder({ onNavigate, onUploadProgress, onUploadComplete, onUploadError }: Props) {
  const { products: catalogueProducts, loading: productsLoading, error: productsError } = useProducts({ status: 'published' })
  const [activeWebsitePage, setActiveWebsitePage] = useState<'home' | 'collections'>('home')
  const [config, setConfig] = useState<HomePageConfig>(DEFAULT_HOME_PAGE_CONFIG)
  const [savedConfig, setSavedConfig] = useState<HomePageConfig>(DEFAULT_HOME_PAGE_CONFIG)
  const [selectedId, setSelectedId] = useState('hero')
  const [editingSection, setEditingSection] = useState<HomePageSection | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [showAddSections, setShowAddSections] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroUploadProgress, setHeroUploadProgress] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const addMenuRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const [draggedSectionProductId, setDraggedSectionProductId] = useState<string | null>(null)

  useEffect(() => {
    getHomePageConfig()
      .then(saved => {
        setConfig(saved)
        setSavedConfig(saved)
        setSelectedId(saved.sections[0]?.id ?? '')
      })
      .catch(requestError => setError(requestError instanceof Error ? requestError.message : 'Home builder settings could not be loaded.'))
      .finally(() => setLoading(false))
  }, [])

  const activeCount = config.sections.filter(section => section.enabled).length
  const hasUnsavedChanges = JSON.stringify(config) !== JSON.stringify(savedConfig)
  const availableHeroProducts = catalogueProducts
    .filter(product => product.status === 'published' && product.productType !== 'Bottoms' && !product.name.toLowerCase().includes(' copy'))
    .sort((first, second) => Number(second.name.toLowerCase().includes('sweatshirt')) - Number(first.name.toLowerCase().includes('sweatshirt')))
  const getProductsForSection = (type: HomeSectionType) => {
    if (type === 'bottoms') return catalogueProducts.filter(product => product.status === 'published' && product.productType === 'Bottoms')
    if (type === 'tops') return catalogueProducts.filter(product => product.status === 'published' && product.productType !== 'Bottoms')
    return availableHeroProducts
  }

  const updateSection = (id: string, patch: Partial<HomePageSection>) => {
    setConfig(current => ({ ...current, sections: current.sections.map(section => section.id === id ? { ...section, ...patch } : section) }))
    setMessage('Unsaved changes')
  }

  const openSectionEditor = (section: HomePageSection) => {
    setSelectedId(section.id)
    const availableProducts = getProductsForSection(section.type)
    const defaultHeroProductIds = availableHeroProducts.slice(0, 3).map(product => product.id)
    const productCount = section.productCount ?? 3
    const validProductIds = (section.productIds ?? []).filter(id => availableProducts.some(product => product.id === id))
    const selectedProductIds = [...new Set(validProductIds)]
    const initialProductIds = section.type === 'hero'
      ? [
          ...selectedProductIds,
          ...defaultHeroProductIds.filter(id => !selectedProductIds.includes(id)),
        ].slice(0, productCount)
      : section.productIds === undefined ? availableProducts.map(product => product.id) : selectedProductIds
    setEditingSection({
      ...section,
      ...(section.type === 'keeper-circle' ? {
        benefits: section.benefits ?? DEFAULT_HOME_PAGE_CONFIG.sections.find(item => item.type === 'keeper-circle')?.benefits,
      } : {}),
      ...(section.type === 'hero' ? {
        productIds: initialProductIds,
        productCount,
      } : section.type === 'tops' || section.type === 'bottoms' ? { productIds: initialProductIds } : {}),
    })
    setMenuId(null)
  }

  const updateKeeperBenefit = (index: number, patch: Partial<KeeperBenefit>) => {
    setEditingSection(current => {
      if (!current || current.type !== 'keeper-circle') return current
      const defaults = DEFAULT_HOME_PAGE_CONFIG.sections.find(section => section.type === 'keeper-circle')?.benefits ?? []
      const benefits = [...(current.benefits ?? defaults)]
      const benefit = benefits[index]
      if (!benefit) return current
      benefits[index] = { ...benefit, ...patch }
      return { ...current, benefits }
    })
  }

  const toggleSectionProduct = (productId: string) => {
    setEditingSection(current => {
      if (!current || !['hero', 'tops', 'bottoms'].includes(current.type)) return current
      const selected = current.productIds ?? []
      if (selected.includes(productId)) {
        return { ...current, productIds: selected.filter(id => id !== productId) }
      }
      if (current.type === 'hero' && selected.length >= (current.productCount ?? 3)) return current
      return { ...current, productIds: [...selected, productId] }
    })
  }

  const moveSectionProduct = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return
    setEditingSection(current => {
      if (!current || !['hero', 'tops', 'bottoms'].includes(current.type)) return current
      const productIds = [...(current.productIds ?? [])]
      const sourceIndex = productIds.indexOf(sourceId)
      const targetIndex = productIds.indexOf(targetId)
      if (sourceIndex < 0 || targetIndex < 0) return current
      const [movedId] = productIds.splice(sourceIndex, 1)
      productIds.splice(targetIndex, 0, movedId)
      return { ...current, productIds }
    })
  }

  const changeHeroProductCount = (productCount: number) => {
    setEditingSection(current => current?.type === 'hero'
      ? { ...current, productCount, productIds: (current.productIds ?? []).slice(0, productCount) }
      : current)
  }

  const uploadHeroBackground = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || editingSection?.type !== 'hero') return
    event.target.value = ''

    if (!file.type.startsWith('image/')) {
      setError('Choose a valid image file for the hero background.')
      return
    }

    setError('')
    setHeroUploadProgress(0)
    onUploadProgress('Hero background', 0)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'hero')
      const uploaded = await api.upload<MediaUploadResult>('/uploads/images', formData, onProgress => {
        setHeroUploadProgress(onProgress)
        onUploadProgress('Hero background', onProgress)
      })
      setEditingSection(current => current?.type === 'hero' ? { ...current, backgroundImage: uploaded.url } : current)
      setHeroUploadProgress(null)
      onUploadComplete('Hero background')
    } catch (uploadError) {
      setHeroUploadProgress(null)
      onUploadError()
      setError(uploadError instanceof Error ? uploadError.message : 'Hero background upload failed.')
    }
  }

  const applySectionEdits = () => {
    if (!editingSection) return
    setConfig(current => ({
      ...current,
      sections: current.sections.map(section => section.id === editingSection.id ? editingSection : section),
    }))
    setMessage('Unsaved changes')
    setEditingSection(null)
  }
  const isProductSelectionSection = editingSection && ['hero', 'tops', 'bottoms'].includes(editingSection.type)
  const sectionProducts = editingSection ? getProductsForSection(editingSection.type) : []

  useEffect(() => {
    if (!editingSection) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    titleInputRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditingSection(null)
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled)')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [editingSection?.id])

  const moveSection = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return
    setConfig(current => {
      const sourceIndex = current.sections.findIndex(section => section.id === sourceId)
      const targetIndex = current.sections.findIndex(section => section.id === targetId)
      if (sourceIndex < 0 || targetIndex < 0) return current
      const sections = [...current.sections]
      const [moved] = sections.splice(sourceIndex, 1)
      sections.splice(targetIndex, 0, moved)
      return { ...current, sections }
    })
    setMessage('Unsaved section order')
  }

  const duplicateSection = (section: HomePageSection) => {
    const duplicate = { ...section, id: newSectionId(section.type), title: section.title ? `${section.title} copy` : '' }
    setConfig(current => {
      const index = current.sections.findIndex(item => item.id === section.id)
      const sections = [...current.sections]
      sections.splice(index + 1, 0, duplicate)
      return { ...current, sections }
    })
    setSelectedId(duplicate.id)
    setMenuId(null)
    setMessage('Unsaved duplicated section')
  }

  const deleteSection = (section: HomePageSection) => {
    const label = section.title || SECTION_META[section.type].label
    if (!window.confirm(`Delete “${label}” from the Home page? Save the page to publish this change.`)) return
    const remaining = config.sections.filter(item => item.id !== section.id)
    setConfig(current => ({ ...current, sections: current.sections.filter(item => item.id !== section.id) }))
    if (selectedId === section.id) setSelectedId(remaining[0]?.id ?? '')
    setMenuId(null)
    setMessage('Unsaved section removal')
  }

  const addSection = (type: HomeSectionType) => {
    const section = createSection(type)
    setConfig(current => ({ ...current, sections: [...current.sections, section] }))
    setSelectedId(section.id)
    setShowAddSections(false)
    setMessage('Unsaved section addition')
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const saved = await saveHomePageConfig(config)
      setConfig(saved)
      setSavedConfig(saved)
      setSelectedId(current => saved.sections.some(section => section.id === current) ? current : saved.sections[0]?.id ?? '')
      setMessage('Home page published')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Home page could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  const discard = () => {
    setConfig(savedConfig)
    setSelectedId(current => savedConfig.sections.some(section => section.id === current) ? current : savedConfig.sections[0]?.id ?? '')
    setMessage('Changes discarded')
    setError('')
  }

  const handleDragStart = (event: DragEvent<HTMLDivElement>, sectionId: string) => {
    setDraggedId(sectionId)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', sectionId)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetId: string) => {
    event.preventDefault()
    const sourceId = event.dataTransfer.getData('text/plain') || draggedId
    if (sourceId) moveSection(sourceId, targetId)
    setDraggedId(null)
  }

  if (loading) return <div style={{ padding: 40, color: MUTED }}>Loading Home page settings...</div>

  return (
    <div style={{ padding: '36px 40px 72px', maxWidth: 1360, margin: '0 auto', color: TEXT }}>
      <nav aria-label="Website pages" style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: `1px solid ${BORDER}` }}>
        {([['home', 'Home'], ['collections', 'Collections']] as const).map(([page, label]) => <button key={page} type="button" onClick={() => setActiveWebsitePage(page)} style={{ padding: '11px 15px', border: 0, borderBottom: `2px solid ${activeWebsitePage === page ? CLAY : 'transparent'}`, background: 'transparent', color: activeWebsitePage === page ? INK : MUTED, fontSize: 12, fontWeight: activeWebsitePage === page ? 700 : 500, cursor: 'pointer' }}>{label}</button>)}
      </nav>
      {activeWebsitePage === 'collections' ? <CollectionsPageBuilder /> : <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, margin: '32px 0 24px' }}>
        <div>
          <p style={{ margin: 0, color: CLAY, fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Website Builder / Home</p>
          <h2 style={{ margin: '8px 0 0', color: INK, font: "500 28px 'Playfair Display', serif" }}>Home page</h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => window.open('/', '_blank', 'noopener,noreferrer')} style={{ padding: '10px 14px', border: `1px solid ${BORDER}`, background: '#F5F1EA', color: INK, cursor: 'pointer' }}>Preview</button>
          <button type="button" onClick={() => void save()} disabled={saving || !hasUnsavedChanges} style={{ padding: '10px 16px', border: 0, background: INK, color: '#F5F1EA', cursor: saving ? 'wait' : 'pointer', opacity: saving || !hasUnsavedChanges ? .55 : 1 }}>{saving ? 'Publishing...' : 'Publish Home'}</button>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', marginBottom: 20, border: `1px solid ${BORDER}`, background: '#F5F1EA' }}>
        <span style={{ color: MUTED, fontSize: 12 }}>Active sections: <strong style={{ color: TEXT }}>{activeCount} / {config.sections.length}</strong></span>
        <span style={{ width: 1, height: 16, background: BORDER }} />
        <span role="status" style={{ color: hasUnsavedChanges ? CLAY : MUTED, fontSize: 12 }}>{message || (hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved')}</span>
        {error && <span role="alert" style={{ color: '#A63D2F', fontSize: 12 }}>{error}</span>}
        <span style={{ flex: 1 }} />
        <button type="button" onClick={discard} disabled={!hasUnsavedChanges || saving} style={{ padding: '6px 10px', border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: hasUnsavedChanges ? 'pointer' : 'default' }}>Discard</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 20, alignItems: 'start' }}>
        <div>
          <div style={{ marginBottom: 12, color: MUTED, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>Home sections · drag to reorder</div>
          {config.sections.map((section, index) => {
            const meta = SECTION_META[section.type]
            return <article
              key={section.id}
              draggable
              onDragStart={event => handleDragStart(event, section.id)}
              onDragOver={event => event.preventDefault()}
              onDrop={event => handleDrop(event, section.id)}
              onDragEnd={() => setDraggedId(null)}
              onClick={() => setSelectedId(section.id)}
              style={{ display: 'grid', gridTemplateColumns: '28px 38px minmax(0, 1fr) auto', alignItems: 'center', gap: 12, padding: '14px 16px', marginBottom: 8, border: `1px solid ${selectedId === section.id ? INK : BORDER}`, background: selectedId === section.id ? '#E8EDF3' : '#F5F1EA', cursor: draggedId === section.id ? 'grabbing' : 'grab', opacity: draggedId === section.id ? .55 : 1 }}
            >
              <span aria-hidden="true" style={{ color: '#B7AA91', fontSize: 18, cursor: 'grab' }}>⠿</span>
              <span aria-hidden="true" style={{ display: 'grid', width: 36, height: 36, placeItems: 'center', background: '#EFE8DD', color: MUTED }}>{meta.icon}</span>
              <span style={{ minWidth: 0 }}>
                <strong style={{ display: 'block', color: TEXT, fontSize: 13, fontWeight: 600 }}>{section.title || meta.label}</strong>
                <small style={{ display: 'block', marginTop: 3, color: MUTED, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{meta.summary}{section.description ? ` · ${section.description}` : ''}</small>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button type="button" onClick={event => { event.stopPropagation(); updateSection(section.id, { enabled: !section.enabled }) }} aria-label={section.enabled ? `Hide ${meta.label}` : `Show ${meta.label}`} style={{ border: 0, background: 'transparent', color: section.enabled ? '#4A7A5A' : MUTED, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>{section.enabled ? 'Visible' : 'Hidden'}</button>
                <span style={{ position: 'relative' }}>
                  <button type="button" onClick={event => { event.stopPropagation(); setMenuId(current => current === section.id ? null : section.id) }} aria-label={`Actions for ${meta.label}`} aria-expanded={menuId === section.id} style={{ padding: '5px 8px', border: `1px solid ${BORDER}`, background: '#FBF9F5', color: MUTED, cursor: 'pointer' }}>···</button>
                  {menuId === section.id && <span role="menu" onClick={event => event.stopPropagation()} style={{ position: 'absolute', right: 0, top: 'calc(100% + 4px)', zIndex: 5, display: 'grid', minWidth: 130, padding: 4, border: `1px solid ${BORDER}`, background: '#FBF9F5', boxShadow: '0 8px 20px rgba(30, 47, 68, .12)' }}>
                    <button type="button" role="menuitem" onClick={() => openSectionEditor(section)} style={menuItemStyle}>Edit</button>
                    <button type="button" role="menuitem" onClick={() => duplicateSection(section)} style={menuItemStyle}>Duplicate</button>
                    <button type="button" role="menuitem" onClick={() => deleteSection(section)} style={{ ...menuItemStyle, color: '#A63D2F' }}>Delete</button>
                  </span>}
                </span>
              </span>
              <small style={{ gridColumn: '3 / -1', color: '#9A907F', fontSize: 10 }}>Section {index + 1} · {meta.label}</small>
            </article>
          })}
          <div ref={addMenuRef} style={{ position: 'relative' }}>
            <button type="button" onClick={() => setShowAddSections(value => !value)} aria-expanded={showAddSections} style={{ width: '100%', padding: 12, border: `1px dashed ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer' }}>+ Add available section</button>
            {showAddSections && <div style={{ position: 'absolute', inset: 'calc(100% + 6px) 0 auto', zIndex: 5, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 4, padding: 6, border: `1px solid ${BORDER}`, background: '#FBF9F5', boxShadow: '0 8px 20px rgba(30, 47, 68, .12)' }}>
              {SECTION_TYPES.map(type => <button type="button" key={type} onClick={() => addSection(type)} style={menuItemStyle}>{SECTION_META[type].label}</button>)}
            </div>}
          </div>
        </div>
      </div>
      {editingSection && (
        <div
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setEditingSection(null)
          }}
          style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'grid', placeItems: 'center', padding: 24, background: 'rgba(17, 24, 32, .52)' }}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-section-editor-title"
            onMouseDown={event => event.stopPropagation()}
            style={{ width: 'min(560px, 100%)', maxHeight: 'min(760px, 90vh)', overflowY: 'auto', border: `1px solid ${BORDER}`, background: '#F5F1EA', boxShadow: '0 24px 80px rgba(17, 24, 32, .28)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, padding: '20px 24px', borderBottom: `1px solid ${BORDER}` }}>
              <div>
                <p style={{ margin: 0, color: CLAY, fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Edit Home section</p>
                <h3 id="home-section-editor-title" style={{ margin: '7px 0 0', color: INK, font: "500 23px 'Playfair Display', serif" }}>{SECTION_META[editingSection.type].label}</h3>
              </div>
              <button type="button" onClick={() => setEditingSection(null)} aria-label="Close section editor" style={{ border: 0, background: 'transparent', color: MUTED, fontSize: 24, lineHeight: 1, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'grid', gap: 16, padding: 24 }}>
              {editingSection.type === 'hero' ? (
                <p style={{ margin: 0, color: MUTED, fontSize: 12, lineHeight: 1.6 }}>
                  The hero displays the active product collection&apos;s description and links directly to that collection. Edit the collection description in the Collections manager.
                </p>
              ) : (
                <>
                  <label style={fieldLabelStyle}>
                    TITLE
                    <input
                      ref={titleInputRef}
                      value={editingSection.title}
                      onChange={event => setEditingSection(current => current ? { ...current, title: event.target.value } : current)}
                      style={FIELD}
                      maxLength={140}
                    />
                  </label>
                  <label style={fieldLabelStyle}>
                    DESCRIPTION
                    <textarea
                      value={editingSection.description}
                      onChange={event => setEditingSection(current => current ? { ...current, description: event.target.value } : current)}
                      style={{ ...FIELD, minHeight: 120, resize: 'vertical' }}
                      maxLength={1000}
                    />
                  </label>
                </>
              )}
              {editingSection.type === 'hero' && (
                <div style={{ display: 'grid', gap: 12, paddingTop: 14, borderTop: `1px solid ${BORDER}` }}>
                  <div>
                    <p style={{ margin: '0 0 6px', color: MUTED, fontSize: 10, fontWeight: 700, letterSpacing: '.06em' }}>HERO BACKGROUND IMAGE</p>
                    <p style={{ margin: '0 0 10px', color: MUTED, fontSize: 11, lineHeight: 1.5 }}>
                      Upload one image to use as the hero background on desktop, tablet, and mobile.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <label style={{ display: 'inline-flex', alignItems: 'center', padding: '9px 12px', background: INK, color: '#F5F1EA', fontSize: 11, cursor: 'pointer' }}>
                        {editingSection.backgroundImage ? 'Replace image' : 'Upload image'}
                        <input type="file" accept="image/*" disabled={heroUploadProgress !== null} onChange={event => void uploadHeroBackground(event)} style={{ display: 'none' }} />
                      </label>
                      {editingSection.backgroundImage && (
                        <button
                          type="button"
                          disabled={heroUploadProgress !== null}
                          onClick={() => setEditingSection(current => current?.type === 'hero' ? { ...current, backgroundImage: '' } : current)}
                          style={{ padding: '8px 10px', border: `1px solid ${BORDER}`, background: 'transparent', color: '#A63D2F', fontSize: 11, cursor: heroUploadProgress === null ? 'pointer' : 'wait' }}
                        >
                          Remove image
                        </button>
                      )}
                      <span style={{ color: MUTED, fontSize: 10 }}>Image is published when you publish the Home page.</span>
                    </div>
                    {heroUploadProgress !== null && (
                      <div role="status" style={{ marginTop: 8, color: MUTED, fontSize: 11 }}>
                        Uploading hero background: {heroUploadProgress}%
                      </div>
                    )}
                    {error && <p role="alert" style={{ margin: '8px 0 0', color: '#A63D2F', fontSize: 11 }}>{error}</p>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 12 }}>
                    <label style={fieldLabelStyle}>
                      OVERLAY POSITION
                      <select
                        value={editingSection.overlayPosition ?? 'left'}
                        onChange={event => {
                          const overlayPosition = event.target.value
                          if (!isHeroOverlayPosition(overlayPosition)) return
                          setEditingSection(current => current?.type === 'hero' ? { ...current, overlayPosition } : current)
                        }}
                        style={FIELD}
                      >
                        <option value="center">Center · transparent center, dark edges</option>
                        <option value="bottom">Bottom</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </label>
                    <label style={fieldLabelStyle}>
                      OVERLAY OPACITY · {editingSection.overlayOpacity ?? 50}%
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={editingSection.overlayOpacity ?? 50}
                        onChange={event => setEditingSection(current => current?.type === 'hero'
                          ? { ...current, overlayOpacity: Number(event.target.value) }
                          : current)}
                        style={{ width: '100%', accentColor: INK }}
                      />
                    </label>
                  </div>
                  <HeroBackgroundPreviews
                    imageUrl={editingSection.backgroundImage ?? ''}
                    overlayPosition={editingSection.overlayPosition ?? 'left'}
                    overlayOpacity={editingSection.overlayOpacity ?? 50}
                  />
                </div>
              )}
              {editingSection.type === 'keeper-circle' && (
                <div style={{ display: 'grid', gap: 14, paddingTop: 4, borderTop: `1px solid ${BORDER}` }}>
                  <p style={{ margin: 0, color: MUTED, fontSize: 11, lineHeight: 1.5 }}>
                    Edit the three benefit cards shown in the Keeper Circle section.
                  </p>
                  {(editingSection.benefits ?? []).map((benefit, index) => (
                    <fieldset key={index} style={{ display: 'grid', gap: 10, margin: 0, padding: 14, border: `1px solid ${BORDER}`, background: '#FBF9F5' }}>
                      <legend style={{ padding: '0 6px', color: CLAY, fontSize: 10, fontWeight: 700, letterSpacing: '.08em' }}>BENEFIT {String(index + 1).padStart(2, '0')}</legend>
                      <label style={fieldLabelStyle}>
                        LABEL
                        <input value={benefit.eyebrow} onChange={event => updateKeeperBenefit(index, { eyebrow: event.target.value })} style={FIELD} maxLength={100} />
                      </label>
                      <label style={fieldLabelStyle}>
                        FIRST TITLE LINE
                        <input value={benefit.titleLead} onChange={event => updateKeeperBenefit(index, { titleLead: event.target.value })} style={FIELD} maxLength={120} />
                      </label>
                      <label style={fieldLabelStyle}>
                        SECOND TITLE LINE
                        <input value={benefit.titleHighlight} onChange={event => updateKeeperBenefit(index, { titleHighlight: event.target.value })} style={FIELD} maxLength={120} />
                      </label>
                      <label style={fieldLabelStyle}>
                        DESCRIPTION
                        <textarea value={benefit.description} onChange={event => updateKeeperBenefit(index, { description: event.target.value })} style={{ ...FIELD, minHeight: 76, resize: 'vertical' }} maxLength={1000} />
                      </label>
                      <div style={{ display: 'grid', gap: 8 }}>
                        <span style={{ color: MUTED, fontSize: 10, fontWeight: 700, letterSpacing: '.06em' }}>BENEFIT POINTS</span>
                        {benefit.points.map((point, pointIndex) => (
                          <label key={pointIndex} style={fieldLabelStyle}>
                            POINT {pointIndex + 1}
                            <input
                              value={point}
                              onChange={event => {
                                const points = [...benefit.points]
                                points[pointIndex] = event.target.value
                                updateKeeperBenefit(index, { points })
                              }}
                              style={FIELD}
                              maxLength={120}
                            />
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
              )}
              {isProductSelectionSection && (
                <div style={{ display: 'grid', gap: 14, paddingTop: 4, borderTop: `1px solid ${BORDER}` }}>
                  {editingSection.type === 'hero' && <>
                    <p style={{ margin: 0, color: MUTED, fontSize: 11, lineHeight: 1.5 }}>
                      Product name, description, and price are synced from the product catalogue when these overrides are empty.
                    </p>
                    <label style={fieldLabelStyle}>
                      NUMBER OF PRODUCTS TO DISPLAY
                      <select
                        value={editingSection.productCount ?? 3}
                        onChange={event => changeHeroProductCount(Number(event.target.value))}
                        style={FIELD}
                      >
                        {[1, 2, 3].map(count => <option key={count} value={count}>{count} {count === 1 ? 'product' : 'products'}</option>)}
                      </select>
                    </label>
                  </>}
                  <div>
                    <p style={{ margin: '0 0 8px', color: MUTED, fontSize: 10, fontWeight: 700, letterSpacing: '.06em' }}>
                      SELECTED PRODUCTS · DRAG TO REORDER{editingSection.type === 'hero' ? ` (${editingSection.productIds?.length ?? 0}/${editingSection.productCount ?? 3})` : ` (${editingSection.productIds?.length ?? 0})`}
                    </p>
                    <div style={{ display: 'grid', gap: 6, marginBottom: 14 }}>
                      {(editingSection.productIds ?? []).map((productId, index) => {
                        const product = sectionProducts.find(item => item.id === productId)
                        if (!product) return null
                        const image = product.coverImageUrl || product.images?.[0] || ''
                        return <div
                          key={product.id}
                          draggable
                          onDragStart={event => {
                            setDraggedSectionProductId(product.id)
                            event.dataTransfer.effectAllowed = 'move'
                            event.dataTransfer.setData('text/plain', product.id)
                          }}
                          onDragOver={event => event.preventDefault()}
                          onDrop={event => {
                            event.preventDefault()
                            const sourceId = event.dataTransfer.getData('text/plain') || draggedSectionProductId
                            if (sourceId) moveSectionProduct(sourceId, product.id)
                            setDraggedSectionProductId(null)
                          }}
                          onDragEnd={() => setDraggedSectionProductId(null)}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, border: `1px solid ${BORDER}`, background: '#FBF9F5', opacity: draggedSectionProductId === product.id ? .5 : 1, cursor: 'grab' }}
                        >
                          <span aria-hidden="true" style={{ color: CLAY, fontSize: 16 }}>⠿</span>
                          <span style={{ color: MUTED, fontSize: 11, fontWeight: 700 }}>{index + 1}</span>
                          {image && <img src={image} alt="" style={{ width: 38, height: 44, objectFit: 'cover', background: '#EFE8DD' }} />}
                          <span style={{ flex: 1, color: TEXT, fontSize: 12 }}>{product.name}</span>
                          <button type="button" onClick={() => toggleSectionProduct(product.id)} aria-label={`Remove ${product.name}`} style={{ border: 0, background: 'transparent', color: '#A63D2F', cursor: 'pointer' }}>×</button>
                        </div>
                      })}
                    </div>
                    <p style={{ margin: '0 0 8px', color: MUTED, fontSize: 10, fontWeight: 700, letterSpacing: '.06em' }}>{editingSection.type === 'bottoms' ? 'AVAILABLE BOTTOMS' : 'AVAILABLE TOPS'}</p>
                    {productsLoading ? <p role="status" style={{ color: MUTED, fontSize: 12 }}>Loading products…</p> : productsError ? (
                      <p role="alert" style={{ color: '#A63D2F', fontSize: 12 }}>Products could not be loaded: {productsError}</p>
                    ) : sectionProducts.length === 0 ? (
                      <p style={{ color: MUTED, fontSize: 12 }}>No published products are available for this section.</p>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 6, maxHeight: 190, overflowY: 'auto' }}>
                        {sectionProducts.map(product => {
                          const selected = editingSection.productIds?.includes(product.id) ?? false
                          const limitReached = editingSection.type === 'hero' && !selected && (editingSection.productIds?.length ?? 0) >= (editingSection.productCount ?? 3)
                          const image = product.coverImageUrl || product.images?.[0] || ''
                          return <label key={product.id} style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0, padding: 7, border: `1px solid ${selected ? INK : BORDER}`, background: selected ? '#E8EDF3' : '#FBF9F5', opacity: limitReached ? .55 : 1, cursor: limitReached ? 'not-allowed' : 'pointer' }}>
                            <input type="checkbox" checked={selected} disabled={limitReached} onChange={() => toggleSectionProduct(product.id)} />
                            {image && <img src={image} alt="" style={{ width: 30, height: 36, objectFit: 'cover', background: '#EFE8DD' }} />}
                            <span style={{ overflow: 'hidden', color: TEXT, fontSize: 11, textOverflow: 'ellipsis' }}>{product.name}</span>
                          </label>
                        })}
                      </div>
                    )}
                    {editingSection.type === 'hero' && (editingSection.productIds?.length ?? 0) !== (editingSection.productCount ?? 3) && !productsLoading && !productsError && (
                      <p role="status" style={{ margin: '8px 0 0', color: CLAY, fontSize: 11 }}>Select exactly {editingSection.productCount ?? 3} products to apply these settings.</p>
                    )}
                  </div>
                </div>
              )}
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: MUTED, fontSize: 12 }}>
                <input
                  type="checkbox"
                  checked={editingSection.enabled}
                  onChange={event => setEditingSection(current => current ? { ...current, enabled: event.target.checked } : current)}
                />
                Show this section on the website
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: 18, borderTop: `1px solid ${BORDER}` }}>
              <span style={{ color: MUTED, fontSize: 11 }}>Apply details, then publish Home to make them live.</span>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button type="button" onClick={() => setEditingSection(null)} style={{ padding: '10px 14px', border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer' }}>Cancel</button>
                <button
                  type="button"
                  onClick={applySectionEdits}
                  disabled={(isProductSelectionSection && (productsLoading || Boolean(productsError))) || (editingSection.type === 'hero' && (editingSection.productIds?.length ?? 0) !== (editingSection.productCount ?? 3))}
                  style={{ padding: '10px 14px', border: 0, background: INK, color: '#F5F1EA', cursor: (isProductSelectionSection && (productsLoading || Boolean(productsError))) || (editingSection.type === 'hero' && (editingSection.productIds?.length ?? 0) !== (editingSection.productCount ?? 3)) ? 'not-allowed' : 'pointer', opacity: (isProductSelectionSection && (productsLoading || Boolean(productsError))) || (editingSection.type === 'hero' && (editingSection.productIds?.length ?? 0) !== (editingSection.productCount ?? 3)) ? .5 : 1 }}
                >
                  Apply details
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
      </>}
    </div>
  )
}

function HeroBackgroundPreviews({
  imageUrl,
  overlayPosition,
  overlayOpacity,
}: {
  imageUrl: string
  overlayPosition: HeroOverlayPosition
  overlayOpacity: number
}) {
  const devices = [
    { label: 'DESKTOP', dimensions: '1440 × 900', ratio: '16 / 9', placement: 'desktop' },
    { label: 'TABLET', dimensions: '820 × 1180', ratio: '4 / 5', placement: 'tablet' },
    { label: 'MOBILE', dimensions: '390 × 844', ratio: '9 / 16', placement: 'mobile' },
  ] as const

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
      {devices.map(device => (
        <div key={device.label} style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4, marginBottom: 5, color: MUTED, fontSize: 9, fontWeight: 700, letterSpacing: '.04em' }}>
            <span>{device.label}</span>
            <span style={{ fontWeight: 500, letterSpacing: 0 }}>{device.dimensions}</span>
          </div>
          <div
            aria-label={`${device.label.toLowerCase()} hero background preview`}
            style={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: device.ratio,
              background: '#29251F',
              color: '#F5F1EA',
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            ) : (
              <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 8, color: '#D8D0C4', textAlign: 'center', fontSize: 10 }}>
                Upload an image to preview
              </span>
            )}
            <div style={{ position: 'absolute', inset: 0, background: getHeroOverlayGradient(overlayPosition, overlayOpacity) }} />
            {imageUrl && (
              <div style={{
                position: 'absolute',
                ...(device.placement === 'desktop'
                  ? { top: '50%', left: '9%', width: '43%', transform: 'translateY(-50%)', textAlign: 'left' as const }
                  : { right: '8%', bottom: '9%', left: '8%', textAlign: 'center' as const }),
              }}>
                <span style={{ display: 'block', marginBottom: 4, color: '#D1AD79', fontSize: 'clamp(5px, .8vw, 8px)', letterSpacing: '.14em' }}>ESSENTIALS</span>
                <strong style={{ display: 'block', font: "500 clamp(8px, 1.3vw, 14px) 'Playfair Display', Georgia, serif", lineHeight: 1.15 }}>Featured product</strong>
                <span style={{ display: 'block', marginTop: 4, fontSize: 'clamp(5px, .75vw, 8px)' }}>Discover product ↗</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const menuItemStyle: React.CSSProperties = { padding: '8px 10px', border: 0, background: 'transparent', color: TEXT, textAlign: 'left', font: '12px Inter, sans-serif', cursor: 'pointer' }
const fieldLabelStyle: React.CSSProperties = { display: 'grid', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700, letterSpacing: '.06em' }

function isHeroOverlayPosition(value: string): value is HeroOverlayPosition {
  return value === 'center' || value === 'bottom' || value === 'left' || value === 'right'
}
