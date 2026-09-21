import { useState } from 'react'
import type { Screen } from '../../../types'
import { useCategories } from '../../../shared/hooks/useCategories'
import { createCategory, deleteCategory } from '../../../shared/services/categories'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props {
  onNavigate: (s: Screen) => void
}

export default function CategoriesList({ onNavigate }: Props) {
  const { categories, loading, error, refetch } = useCategories()
  const [label, setLabel] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const addCategory = async () => {
    const trimmed = label.trim()
    if (!trimmed) return

    try {
      await createCategory({
        label: trimmed,
        slug: trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      })
      setLabel('')
      setMessage('Category created.')
      refetch()
    } catch (categoryError) {
      setMessage(categoryError instanceof Error ? categoryError.message : 'Unable to create category.')
    }
  }

  const removeCategory = async (id: string) => {
    try {
      await deleteCategory(id)
      setMessage('Category deleted.')
      refetch()
    } catch (categoryError) {
      setMessage(categoryError instanceof Error ? categoryError.message : 'Unable to delete category.')
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
          <input value={label} onChange={e => setLabel(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') void addCategory() }} placeholder="New category label" style={{ flex: '1 1 240px', minWidth: 200, padding: '10px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', color: TEXT, outline: 'none' }} />
          <button type="button" onClick={() => void addCategory()} style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Add category</button>
        </div>
        {message && <div style={{ marginTop: 12, fontSize: 12, color: message.toLowerCase().includes('error') ? '#A06030' : '#4A7A5A' }}>{message}</div>}
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
              <button type="button" onClick={() => void removeCategory(category.id)} style={{ border: 'none', background: 'transparent', color: '#A06030', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
