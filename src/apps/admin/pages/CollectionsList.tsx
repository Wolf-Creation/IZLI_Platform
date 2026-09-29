import { useCallback, useEffect, useState } from 'react'
import type { Screen } from '../../../types'
import type { Collection, Product } from '../../../entities'
import { getAdminCollections, updateCollection } from '../../../shared/services/collections'
import { useProducts } from '../../../shared/hooks/useProducts'

const INDIGO = '#1E2F44'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props {
  onNavigate: (screen: Screen) => void
  onCreate: () => void
  onEdit: (id: string) => void
}

function productCount(collection: Collection, products: Product[]) {
  return products.filter(product => product.collectionId === collection.id || (product.collectionIds ?? []).includes(collection.id)).length
}

export default function CollectionsList({ onNavigate, onCreate, onEdit }: Props) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState<string | null>(null)
  const { products } = useProducts()

  const refresh = useCallback(() => {
    setLoading(true)
    setError('')
    getAdminCollections()
      .then(setCollections)
      .catch(requestError => setError(requestError instanceof Error ? requestError.message : 'Collections could not be loaded.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(refresh, [refresh])

  const toggleActive = async (collection: Collection) => {
    setSavingId(collection.id)
    try {
      await updateCollection(collection.id, { isActive: !collection.isActive })
      refresh()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Collection could not be updated.')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Collections</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: TEXT_SEC }}>{collections.length} collections · ordered by display order</p>
        </div>
        <button type="button" onClick={onCreate} style={{ padding: '10px 20px', border: 0, background: INDIGO, color: '#E7DFD2', fontSize: 13, cursor: 'pointer' }}>+ Create collection</button>
      </header>
      {error && <p role="alert" style={{ color: '#A63D2F' }}>{error}</p>}
      {loading ? <p style={{ color: TEXT_SEC }}>Loading collections...</p> : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
        {collections.map(collection => {
          const image = collection.coverImage || collection.coverImageUrl
          return <article key={collection.id} style={{ overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#F5F1EA' }}>
            <button type="button" onClick={() => onEdit(collection.id)} style={{ position: 'relative', display: 'grid', width: '100%', aspectRatio: '16 / 7', padding: 0, overflow: 'hidden', placeItems: 'center', border: 0, background: '#EDE8DF', cursor: 'pointer' }}>
              {image ? <img src={image} alt={collection.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ color: TEXT_SEC, fontSize: 12 }}>No cover image</span>}
              <strong style={{ position: 'absolute', bottom: 18, left: 20, color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: 24, textShadow: '0 2px 12px #000' }}>{String(collection.displayOrder ?? 0).padStart(2, '0')} — {collection.name}</strong>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
              <span style={{ color: TEXT_SEC, fontSize: 11 }}>{collection.tagline}</span>
              <span style={{ marginLeft: 'auto', color: TEXT_SEC, fontSize: 11 }}>{productCount(collection, products)} products</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: 7, color: TEXT_SEC, fontSize: 11, cursor: 'pointer' }}>
                <input type="checkbox" checked={Boolean(collection.isActive)} disabled={savingId === collection.id} onChange={() => void toggleActive(collection)} />
                Active
              </label>
            </div>
            <div style={{ padding: '0 18px 16px' }}><button type="button" onClick={() => onEdit(collection.id)} style={{ padding: 0, border: 0, borderBottom: '1px solid #C9924E', background: 'transparent', color: INDIGO, fontSize: 11, cursor: 'pointer' }}>Edit collection</button></div>
          </article>
        })}
        {!collections.length && <p style={{ gridColumn: '1 / -1', color: TEXT_SEC }}>No collections found.</p>}
      </div>}
      <button type="button" onClick={() => onNavigate('dashboard')} style={{ marginTop: 24, padding: 0, border: 0, background: 'none', color: TEXT_SEC, cursor: 'pointer' }}>Back to dashboard</button>
    </div>
  )
}