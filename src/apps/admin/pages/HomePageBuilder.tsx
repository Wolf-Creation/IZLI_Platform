import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import type { Screen } from '../../../types'
import {
  DEFAULT_HOME_PAGE_CONFIG,
  getHomePageConfig,
  saveHomePageConfig,
  type HomePageConfig,
  type HomePageSection,
  type HomeSectionType,
} from '../../../shared/services/home'
import CollectionsPageBuilder from './CollectionsPageBuilder'

const INK = '#1E2F44'
const TEXT = '#2E2E2E'
const MUTED = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const FIELD: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: `1px solid ${BORDER}`, background: '#FBF9F5', color: TEXT, font: '13px Inter, sans-serif' }

const SECTION_META: Record<HomeSectionType, { label: string; icon: string; summary: string }> = {
  hero: { label: 'Hero slider', icon: '◈', summary: 'Four autoplaying universe slides' },
  'new-releases': { label: 'New releases', icon: '▦', summary: 'Live Release 01 product carousel' },
  tops: { label: 'Tops', icon: '▤', summary: 'Tops editorial and featured products' },
  bottoms: { label: 'Bottoms', icon: '▤', summary: 'Bottoms editorial and featured products' },
  'keeper-circle': { label: 'Keeper Circle', icon: '◯', summary: 'Introduction and three benefit panels' },
}

const SECTION_TYPES = Object.keys(SECTION_META) as HomeSectionType[]

interface Props { onNavigate: (screen: Screen) => void }

function newSectionId(type: HomeSectionType) {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function createSection(type: HomeSectionType): HomePageSection {
  const defaults = DEFAULT_HOME_PAGE_CONFIG.sections.find(section => section.type === type)!
  return { ...defaults, id: newSectionId(type) }
}

export default function HomePageBuilder({ onNavigate }: Props) {
  const [activeWebsitePage, setActiveWebsitePage] = useState<'home' | 'collections'>('home')
  const [config, setConfig] = useState<HomePageConfig>(DEFAULT_HOME_PAGE_CONFIG)
  const [savedConfig, setSavedConfig] = useState<HomePageConfig>(DEFAULT_HOME_PAGE_CONFIG)
  const [selectedId, setSelectedId] = useState('hero')
  const [menuId, setMenuId] = useState<string | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [showAddSections, setShowAddSections] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const addMenuRef = useRef<HTMLDivElement>(null)

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

  const selectedSection = useMemo(() => config.sections.find(section => section.id === selectedId) ?? null, [config.sections, selectedId])
  const activeCount = config.sections.filter(section => section.enabled).length
  const hasUnsavedChanges = JSON.stringify(config) !== JSON.stringify(savedConfig)

  const updateSection = (id: string, patch: Partial<HomePageSection>) => {
    setConfig(current => ({ ...current, sections: current.sections.map(section => section.id === id ? { ...section, ...patch } : section) }))
    setMessage('Unsaved changes')
  }

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
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 20, alignItems: 'start' }}>
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
                    <button type="button" role="menuitem" onClick={() => { setSelectedId(section.id); setMenuId(null) }} style={menuItemStyle}>Edit</button>
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
        <aside style={{ position: 'sticky', top: 24, border: `1px solid ${BORDER}`, background: '#F5F1EA' }}>
          {selectedSection ? <>
            <div style={{ padding: '18px 20px', borderBottom: `1px solid ${BORDER}` }}>
              <p style={{ margin: 0, color: CLAY, fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Section details</p>
              <h3 style={{ margin: '6px 0 0', color: INK, font: "500 20px 'Playfair Display', serif" }}>{SECTION_META[selectedSection.type].label}</h3>
            </div>
            <div style={{ display: 'grid', gap: 14, padding: 20 }}>
              <label style={fieldLabelStyle}>TITLE<input value={selectedSection.title} onChange={event => updateSection(selectedSection.id, { title: event.target.value })} style={FIELD} maxLength={140} /></label>
              <label style={fieldLabelStyle}>DESCRIPTION<textarea value={selectedSection.description} onChange={event => updateSection(selectedSection.id, { description: event.target.value })} style={{ ...FIELD, minHeight: 92, resize: 'vertical' }} maxLength={1000} /></label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: MUTED, fontSize: 12 }}><input type="checkbox" checked={selectedSection.enabled} onChange={event => updateSection(selectedSection.id, { enabled: event.target.checked })} />Show this section on the website</label>
            </div>
            <div style={{ padding: 16, borderTop: `1px solid ${BORDER}` }}><button type="button" onClick={() => void save()} disabled={saving || !hasUnsavedChanges} style={{ width: '100%', padding: 10, border: 0, background: INK, color: '#F5F1EA', cursor: saving ? 'wait' : 'pointer', opacity: saving || !hasUnsavedChanges ? .55 : 1 }}>{saving ? 'Saving...' : 'Save details'}</button></div>
          </> : <div style={{ padding: 22, color: MUTED, fontSize: 12 }}>Select a section to edit its details.</div>}
        </aside>
      </div>
      </>}
    </div>
  )
}

const menuItemStyle: React.CSSProperties = { padding: '8px 10px', border: 0, background: 'transparent', color: TEXT, textAlign: 'left', font: '12px Inter, sans-serif', cursor: 'pointer' }
const fieldLabelStyle: React.CSSProperties = { display: 'grid', gap: 6, color: MUTED, fontSize: 10, fontWeight: 700, letterSpacing: '.06em' }
