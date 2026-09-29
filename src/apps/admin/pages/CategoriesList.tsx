import { useState } from 'react'
import type { Screen } from '../../../types'
import { useCategories } from '../../../shared/hooks/useCategories'
import { createCategory, deleteCategory } from '../../../shared/services/categories'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

interface Props {
  onNavigate: (s: Screen) => void
}

export default function CategoriesList({ onNavigate }: Props) {
  const { categories, loading, error, refetch } = useCategories()
  const [label, setLabel] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; label: string } | null>(null)

  const removeCategory = async () => {
    if (!categoryToDelete || saving) return
    try {
      setSaving(true)
      await deleteCategory(categoryToDelete.id)
      setCategoryToDelete(null)
      setMessage('Category deleted.')
      refetch()
    } catch (categoryError) {
      setMessage(categoryError instanceof Error ? categoryError.message : 'Unable to delete category.')
    } finally {
      setSaving(false)
    }
  }

  const addCategory = async () => {
    const trimmed = label.trim()
    if (!trimmed || saving) return
    const existingSlugs = new Set(categories.map(category => category.slug))
    const slug = slugify(trimmed)

    if (existingSlugs.has(slug)) {
      setMessage('This category already exists.')
      return
    }

    try {
      setSaving(true)
      await createCategory({ label: trimmed, slug })
      setLabel('')
      setMessage('Category created.')
      refetch()
    } catch (categoryError) {
      setMessage(categoryError instanceof Error ? categoryError.message : 'Unable to create category.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Categories</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>{categories.length} categories linked to website</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('products')} style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 12, background: 'transparent', color: TEXT_SEC, cursor: 'pointer' }}>Back to products</button>
          <button onClick={refetch} style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 12, background: 'transparent', color: TEXT_SEC, cursor: 'pointer' }}>Refresh</button>
        </div>
      </div>

      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input value={label} onChange={event => setLabel(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') void addCategory() }} placeholder="New category name" style={{ flex: '1 1 240px', minWidth: 220, padding: '10px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', color: TEXT, outline: 'none' }} />
          <button type="button" disabled={saving || loading || !label.trim()} onClick={() => void addCategory()} style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 500, cursor: saving || loading || !label.trim() ? 'not-allowed' : 'pointer', opacity: saving || loading || !label.trim() ? 0.6 : 1 }}>{saving ? 'Saving...' : 'Add category'}</button>
        </div>
        {message && <div style={{ marginTop: 12, fontSize: 12, color: message.toLowerCase().includes('unable') || message.toLowerCase().includes('failed') || message.toLowerCase().includes('error') ? '#A06030' : '#4A7A5A' }}>{message}</div>}
        {error && <div style={{ marginTop: 12, fontSize: 12, color: '#A06030' }}>{error}</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {loading ? (
          <div style={{ fontSize: 13, color: TEXT_SEC }}>Loading categories...</div>
        ) : categories.length === 0 ? (
          <div style={{ fontSize: 13, color: TEXT_SEC }}>No categories yet.</div>
        ) : (
          categories.map(category => (
            <div key={category.id} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{category.label}</div>
                <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 4 }}>{category.slug}</div>
              </div>
              <button type="button" onClick={() => setCategoryToDelete({ id: category.id, label: category.label })} style={{ border: 'none', background: 'transparent', color: '#A06030', fontSize: 18, cursor: 'pointer' }} aria-label={`Delete ${category.label}`}>×</button>
            </div>
          ))
        )}
      </div>

      {categoryToDelete && <div role="presentation" onClick={() => !saving && setCategoryToDelete(null)} style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(30, 47, 68, 0.42)', backdropFilter: 'blur(4px)' }}>
        <div role="dialog" aria-modal="true" aria-labelledby="delete-category-title" onClick={event => event.stopPropagation()} style={{ width: 'min(440px, 100%)', background: '#F7F3EC', border: `1px solid ${BORDER}`, borderRadius: 18, boxShadow: '0 24px 80px rgba(30, 47, 68, 0.22)', overflow: 'hidden' }}>
          <div style={{ padding: '22px 24px 16px', borderBottom: `1px solid ${BORDER}`, background: '#EEE6DA' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A06030', marginBottom: 8 }}>Category action</div>
            <h2 id="delete-category-title" style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 25, fontWeight: 500, color: INDIGO }}>Delete category?</h2>
          </div>
          <div style={{ padding: 24 }}>
            <p style={{ margin: '0 0 22px', color: TEXT_SEC, fontSize: 14, lineHeight: 1.6 }}>You are about to remove <strong style={{ color: TEXT }}>{categoryToDelete.label}</strong>. Products linked to this category may lose their category assignment.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" disabled={saving} onClick={() => setCategoryToDelete(null)} style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', color: TEXT_SEC, cursor: saving ? 'not-allowed' : 'pointer' }}>Cancel</button>
              <button type="button" disabled={saving} onClick={() => void removeCategory()} style={{ padding: '10px 16px', border: 'none', borderRadius: 10, background: '#A06030', color: '#FFF8EF', fontWeight: 600, cursor: saving ? 'wait' : 'pointer' }}>{saving ? 'Deleting...' : 'Delete category'}</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}
