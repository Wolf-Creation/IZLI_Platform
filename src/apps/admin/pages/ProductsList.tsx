import { useEffect, useMemo, useState } from 'react'
import type { Screen } from '../../../types'
import type { Category, Collection, Product } from '../../../entities'
import { useProducts } from '../../../shared/hooks/useProducts'
import { getCategories } from '../../../shared/services/categories'
import { getCollections } from '../../../shared/services/collections'
import { createProduct, deleteProduct } from '../../../shared/services/products'
import { api } from '../../../shared/services/api'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props {
  onNavigate: (s: Screen) => void
  onCreateProduct: () => void
  onEditProduct: (id: string) => void
}

const UNIVERSES = ['All', 'Heritage', 'Essentials', 'Studio', 'Community Lab']
const CATALOG_STATUSES = ['All', 'published', 'draft', 'archived', 'out-of-stock']
const RELEASE_STATUSES = ['All', 'draft', 'ready', 'production', 'upcoming', 'live', 'sold-out', 'archived']

function ReleaseChip({ status }: { status?: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    draft: { bg: '#EDE8DF', color: TEXT_SEC },
    ready: { bg: '#E8EDF3', color: INDIGO },
    production: { bg: '#F3EDE8', color: '#8C6B52' },
    upcoming: { bg: '#EEF1EA', color: '#6B7A5A' },
    live: { bg: '#E6EDE8', color: '#4A7A5A' },
    'sold-out': { bg: '#FDF3EC', color: '#A06030' },
    archived: { bg: '#EEEEEE', color: '#999' },
  }

  const key = status ?? 'draft'
  const s = map[key] ?? map.draft
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color, textTransform: 'uppercase' }}>{key}</span>
}

function CatalogChip({ status }: { status: Product['status'] }) {
  const map: Record<string, { bg: string; color: string }> = {
    published: { bg: '#E6EDE8', color: '#4A7A5A' },
    draft: { bg: '#EDE8DF', color: TEXT_SEC },
    archived: { bg: '#EEEEEE', color: '#999' },
    'out-of-stock': { bg: '#FDF3EC', color: '#A06030' },
  }

  const s = map[status] ?? map.draft
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color, textTransform: 'uppercase' }}>{status}</span>
}

interface QrCodeSummary {
  productId?: string
  status?: string
}

export default function ProductsList({ onCreateProduct, onEditProduct }: Props) {
  const { products, loading, error, refetch } = useProducts()
  const [categories, setCategories] = useState<Category[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [qrCodes, setQrCodes] = useState<QrCodeSummary[]>([])
  const [search, setSearch] = useState('')
  const [universe, setUniverse] = useState('All')
  const [catalogStatus, setCatalogStatus] = useState('All')
  const [releaseStatus, setReleaseStatus] = useState('All')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleteTarget, setDeleteTarget] = useState<string[] | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [actionMenuId, setActionMenuId] = useState<string | null>(null)
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  const [duplicateError, setDuplicateError] = useState('')

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]))
    getCollections().then(setCollections).catch(() => setCollections([]))
    api.get<QrCodeSummary[]>('/qr/codes').then(setQrCodes).catch(() => setQrCodes([]))
  }, [])

  const categoryById = useMemo(() => new Map(categories.map(category => [category.id, category.label])), [categories])
  const collectionById = useMemo(() => new Map(collections.map(collection => [collection.id, collection.name])), [collections])

  const productCategory = (product: Product) => product.categoryIds?.map(id => categoryById.get(id)).filter(Boolean).join(', ') || product.productType || '—'
  const productCollection = (product: Product) => collectionById.get(product.collectionId ?? '') || product.collectionIds?.map(id => collectionById.get(id)).filter(Boolean).join(', ') || '—'
  const productStock = (product: Product) => {
    const pieces = product.inventoryPieces ?? []
    const total = pieces.length
    const available = pieces.filter(piece => piece.status === 'available').length
    return { total, available }
  }
  const productQrProgress = (product: Product) => {
    const codes = qrCodes.filter(code => code.productId === product.id)
    return { generated: codes.length, assigned: codes.filter(code => code.status !== 'unassigned').length }
  }

  const visibleProducts = useMemo(() => {
    let rows = [...products]

    if (universe !== 'All') {
      rows = rows.filter(product => product.universe === universe)
    }

    if (catalogStatus !== 'All') {
      rows = rows.filter(product => product.status === catalogStatus)
    }

    if (releaseStatus !== 'All') {
      rows = rows.filter(product => (product.releaseStatus ?? 'draft') === releaseStatus)
    }

    if (search.trim()) {
      const query = search.toLowerCase()
      rows = rows.filter(product => {
        const haystack = [
          product.name,
          product.sku,
          product.universe,
          product.description,
          product.archiveTitle,
          product.storyTitle,
          product.releaseNumber,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return haystack.includes(query)
      })
    }

    return rows.sort((left, right) => {
      const leftDate = new Date(left.updatedAt ?? left.createdAt ?? '').getTime()
      const rightDate = new Date(right.updatedAt ?? right.createdAt ?? '').getTime()
      return rightDate - leftDate
    })
  }, [catalogStatus, products, releaseStatus, search, universe])

  const allVisibleSelected = visibleProducts.length > 0 && visibleProducts.every(product => selectedIds.includes(product.id))
  const toggleSelected = (id: string) => setSelectedIds(current => current.includes(id) ? current.filter(selectedId => selectedId !== id) : [...current, id])

  const confirmDelete = async () => {
    if (!deleteTarget?.length) return
    setDeleting(true)
    setDeleteError('')
    try {
      await Promise.all(deleteTarget.map(deleteProduct))
      setSelectedIds(current => current.filter(id => !deleteTarget.includes(id)))
      setDeleteTarget(null)
      refetch()
    } catch (deleteFailure) {
      setDeleteError(deleteFailure instanceof Error ? deleteFailure.message : 'Unable to delete selected products.')
    } finally {
      setDeleting(false)
    }
  }

  const duplicateProduct = async (product: Product) => {
    setDuplicatingId(product.id)
    setDuplicateError('')
    setActionMenuId(null)
    try {
      const duplicate = JSON.parse(JSON.stringify(product)) as Partial<Product> & { id?: string; createdAt?: string; updatedAt?: string }
      delete duplicate.id
      delete duplicate.createdAt
      delete duplicate.updatedAt
      duplicate.name = `${product.name} Copy`
      duplicate.sku = `${product.sku}-COPY-${Date.now().toString().slice(-5)}`
      duplicate.status = 'draft'
      duplicate.releaseStatus = 'draft'
      duplicate.seo = { ...(product.seo ?? { slug: '', metaTitle: '', metaDescription: '', keywords: [], ogImage: '' }), slug: `${product.seo?.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}-copy-${Date.now().toString().slice(-5)}` }
      await createProduct(duplicate)
      refetch()
    } catch (duplicateFailure) {
      setDuplicateError(duplicateFailure instanceof Error ? duplicateFailure.message : 'Unable to duplicate product.')
    } finally {
      setDuplicatingId(null)
    }
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>Products</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>
            {visibleProducts.length} release{visibleProducts.length !== 1 ? 's' : ''} visible in MongoDB
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {selectedIds.length > 0 && <button onClick={() => { setDeleteError(''); setDeleteTarget(selectedIds) }} style={{ padding: '10px 16px', border: '1px solid #C98278', borderRadius: 12, background: '#F9EDEA', color: '#A63D2F', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete ({selectedIds.length})</button>}
          <button
            onClick={refetch}
            style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 12, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
          >
            Refresh
          </button>
          <button
            onClick={onCreateProduct}
            style={{ display: 'flex', alignItems: 'center', gap: 7, background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            + Create Release
          </button>
        </div>
      </div>

      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {selectedIds.length > 0 && <span style={{ fontSize: 12, color: TEXT_SEC }}>{selectedIds.length} selected</span>}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {UNIVERSES.map(u => (
            <button
              key={u}
              onClick={() => setUniverse(u)}
              style={{
                padding: '6px 14px',
                borderRadius: 10,
                border: `1px solid ${universe === u ? INDIGO : BORDER}`,
                background: universe === u ? INDIGO : 'transparent',
                color: universe === u ? '#E7DFD2' : TEXT_SEC,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {u}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '7px 12px', width: 220 }}>
          <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search releases..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }}
          />
        </div>
        <select value={catalogStatus} onChange={e => setCatalogStatus(e.target.value)} style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          {CATALOG_STATUSES.map(status => <option key={status}>{status}</option>)}
        </select>
        <select value={releaseStatus} onChange={e => setReleaseStatus(e.target.value)} style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          {RELEASE_STATUSES.map(status => <option key={status}>{status}</option>)}
        </select>
      </div>

      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
              <th style={{ width: 40, padding: '12px 20px' }}>
                <input type="checkbox" checked={allVisibleSelected} onChange={event => setSelectedIds(event.target.checked ? Array.from(new Set([...selectedIds, ...visibleProducts.map(product => product.id)])) : selectedIds.filter(id => !visibleProducts.some(product => product.id === id)))} style={{ cursor: 'pointer' }} />
              </th>
              {['Product', 'SKU', 'Collection', 'Category', 'Current Release', 'Price', 'Stock', 'QR Progress', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={11} style={{ padding: '28px 20px', color: TEXT_SEC, fontSize: 13 }}>Loading releases...</td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={11} style={{ padding: '28px 20px', color: '#A06030', fontSize: 13 }}>
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && visibleProducts.length === 0 && (
              <tr>
                <td colSpan={11} style={{ padding: '28px 20px', color: TEXT_SEC, fontSize: 13 }}>
                  No releases match the current filters.
                </td>
              </tr>
            )}
            {!loading && !error && visibleProducts.map(product => (
              <tr
                key={product.id}
                style={{ borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', transition: 'background 0.12s' }}
                onClick={() => onEditProduct(product.id)}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
              >
                <td style={{ padding: '14px 20px' }} onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={selectedIds.includes(product.id)} onChange={() => toggleSelected(product.id)} style={{ cursor: 'pointer' }} />
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 48, borderRadius: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, flexShrink: 0, overflow: 'hidden' }}>
                      <img
                        src={product.coverImageUrl || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=96&fit=crop&auto=format'}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{product.name}</div>
                      <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>{product.sku}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: TEXT_SEC, fontFamily: 'JetBrains Mono, monospace' }}>{product.sku}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>{productCollection(product)}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: '#F3EDE8', color: '#8C6B52' }}>{productCategory(product)}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <ReleaseChip status={product.releaseStatus} />
                  <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>{product.releaseNumber ?? '—'}</div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500, color: TEXT }}>
                  {product.currency} {product.price}
                </td>
                <td style={{ padding: '14px 16px', minWidth: 130 }}>
                  {(() => { const stock = productStock(product); const ratio = stock.total > 0 ? Math.round((stock.available / stock.total) * 100) : 0; return <div><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, color: TEXT, fontFamily: 'JetBrains Mono, monospace' }}><span>{stock.available} / {stock.total}</span><span style={{ color: TEXT_SEC }}>{ratio}%</span></div><div style={{ height: 5, marginTop: 6, borderRadius: 999, background: '#E1D9CE', overflow: 'hidden' }}><div style={{ width: `${ratio}%`, height: '100%', background: ratio > 20 ? '#4A7A5A' : '#A06030' }} /></div></div> })()}
                </td>
                <td style={{ padding: '14px 16px', minWidth: 125 }}>
                  {(() => { const qr = productQrProgress(product); const ratio = qr.generated > 0 ? Math.round((qr.assigned / qr.generated) * 100) : 0; return <div><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, color: TEXT, fontFamily: 'JetBrains Mono, monospace' }}><span>{qr.assigned} / {qr.generated}</span><span style={{ color: TEXT_SEC }}>{ratio}%</span></div><div style={{ height: 5, marginTop: 6, borderRadius: 999, background: '#E1D9CE', overflow: 'hidden' }}><div style={{ width: `${ratio}%`, height: '100%', background: INDIGO }} /></div></div> })()}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <CatalogChip status={product.status} />
                </td>
                <td style={{ padding: '14px 16px' }} onClick={e => e.stopPropagation()}>
                  <div style={{ position: 'relative' }}>
                    <button type="button" onClick={() => setActionMenuId(current => current === product.id ? null : product.id)} aria-label={`Open actions for ${product.name}`} style={{ width: 30, height: 30, border: `1px solid ${BORDER}`, borderRadius: 8, background: actionMenuId === product.id ? '#E8EDF3' : 'transparent', color: TEXT_SEC, fontSize: 18, lineHeight: 1, cursor: 'pointer' }}>⋮</button>
                    {actionMenuId === product.id && <div style={{ position: 'absolute', right: 0, top: 36, zIndex: 10, width: 150, padding: 6, border: `1px solid ${BORDER}`, borderRadius: 9, background: '#FBF9F5', boxShadow: '0 12px 28px rgba(30, 47, 68, .14)' }}>
                      <button type="button" onClick={() => { setActionMenuId(null); onEditProduct(product.id) }} style={{ display: 'block', width: '100%', padding: '8px 9px', border: 0, borderRadius: 6, background: 'transparent', color: TEXT, textAlign: 'left', cursor: 'pointer', fontSize: 12 }}>Modifier</button>
                      <button type="button" disabled={duplicatingId === product.id} onClick={() => void duplicateProduct(product)} style={{ display: 'block', width: '100%', padding: '8px 9px', border: 0, borderRadius: 6, background: 'transparent', color: TEXT, textAlign: 'left', cursor: duplicatingId === product.id ? 'wait' : 'pointer', fontSize: 12 }}>{duplicatingId === product.id ? 'Duplication...' : 'Dupliquer'}</button>
                      <button type="button" onClick={() => { setActionMenuId(null); setDuplicateError(''); setDeleteError(''); setDeleteTarget([product.id]) }} style={{ display: 'block', width: '100%', padding: '8px 9px', border: 0, borderRadius: 6, background: 'transparent', color: '#A63D2F', textAlign: 'left', cursor: 'pointer', fontSize: 12 }}>Supprimer</button>
                    </div>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 1500, display: 'grid', placeItems: 'center', padding: 24, background: 'rgba(17, 17, 17, .48)' }}>
        <div style={{ width: 'min(100%, 440px)', padding: 26, borderRadius: 16, background: '#F5F1EA', border: `1px solid ${BORDER}`, boxShadow: '0 24px 60px rgba(17,17,17,.22)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#A63D2F', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Danger zone</div>
          <h2 style={{ margin: '0 0 10px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 25 }}>Delete product{deleteTarget.length > 1 ? 's' : ''}?</h2>
          <p style={{ margin: '0 0 18px', color: TEXT_SEC, fontSize: 13, lineHeight: 1.6 }}>This permanently removes {deleteTarget.length === 1 ? 'this product' : `these ${deleteTarget.length} products`} and cannot be undone.</p>
          {deleteError && <div style={{ marginBottom: 14, padding: 10, borderRadius: 8, background: '#F9EDEA', color: '#A63D2F', fontSize: 12 }}>{deleteError}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}><button type="button" onClick={() => setDeleteTarget(null)} disabled={deleting} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 9, background: 'transparent', color: TEXT_SEC, cursor: 'pointer' }}>Cancel</button><button type="button" onClick={() => void confirmDelete()} disabled={deleting} style={{ padding: '9px 16px', border: 0, borderRadius: 9, background: '#A63D2F', color: '#FFF', fontWeight: 600, cursor: deleting ? 'wait' : 'pointer' }}>{deleting ? 'Deleting…' : 'Delete permanently'}</button></div>
        </div>
      </div>}

      {duplicateError && <div role="alert" style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1500, maxWidth: 360, padding: '12px 15px', borderRadius: 9, background: '#F9EDEA', color: '#A63D2F', fontSize: 12, boxShadow: '0 12px 28px rgba(30, 47, 68, .14)' }}>{duplicateError}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <div style={{ fontSize: 12, color: TEXT_SEC }}>
          Showing {visibleProducts.length} of {products.length} releases
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${BORDER}`, background: 'transparent', color: TEXT_SEC, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
        >
          ←
        </button>
      </div>
    </div>
  )
}
