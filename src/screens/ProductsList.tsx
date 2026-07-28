import { useMemo, useState } from 'react'
import type { Screen } from '../types'
import type { Product } from '../entities'
import { useProducts } from '../shared/hooks/useProducts'

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

export default function ProductsList({ onCreateProduct, onEditProduct }: Props) {
  const { products, loading, error, refetch } = useProducts()
  const [search, setSearch] = useState('')
  const [universe, setUniverse] = useState('All')
  const [catalogStatus, setCatalogStatus] = useState('All')
  const [releaseStatus, setReleaseStatus] = useState('All')

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
                <input type="checkbox" style={{ cursor: 'pointer' }} />
              </th>
              {['Product', 'Universe', 'Release', 'Quantity', 'Catalog', 'Price', 'Updated'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} style={{ padding: '28px 20px', color: TEXT_SEC, fontSize: 13 }}>Loading releases...</td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={8} style={{ padding: '28px 20px', color: '#A06030', fontSize: 13 }}>
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && visibleProducts.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: '28px 20px', color: TEXT_SEC, fontSize: 13 }}>
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
                  <input type="checkbox" style={{ cursor: 'pointer' }} />
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
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>{product.universe}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <ReleaseChip status={product.releaseStatus} />
                  <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>{product.releaseNumber ?? '—'}</div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: TEXT_SEC, fontFamily: 'JetBrains Mono, monospace' }}>{product.quantity ?? 0}</td>
                <td style={{ padding: '14px 16px' }}>
                  <CatalogChip status={product.status} />
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500, color: TEXT }}>
                  {product.currency} {product.price}
                </td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: TEXT_SEC }}>
                  {new Date(product.updatedAt ?? product.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
