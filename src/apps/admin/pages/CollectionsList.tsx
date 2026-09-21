import type { Screen } from '../../../types'
import { useCollections } from '../../../shared/hooks/useCollections'
import { useProducts } from '../../../shared/hooks/useProducts'

const INDIGO = '#1E2F44'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Published': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Draft': { bg: '#EDE8DF', color: TEXT_SEC },
    'Active': { bg: '#E8EDF3', color: INDIGO },
  }
  const s = map[status] ?? map['Draft']
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

export default function CollectionsList({ onNavigate }: Props) {
  const { collections, loading: collectionsLoading, error: collectionsError } = useCollections()
  const { products, loading: productsLoading } = useProducts()
  const productCount = (collection: typeof collections[number]) => {
    const linkedIds = new Set([
      ...(collection.productIds ?? []),
      ...products.filter(product => (product.collectionIds ?? []).includes(collection.id)).map(product => product.id),
    ])
    return linkedIds.size
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Collections</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>{collections.length} collections · {collections.reduce((total, collection) => total + productCount(collection), 0)} linked products</div>
        </div>
        <button
          onClick={() => onNavigate('collection-editor')}
          style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          + Create Collection
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {collections.map((c, i) => (
          <div
            key={i}
            onClick={() => onNavigate('collection-editor')}
            style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(30,47,68,0.08)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
          >
            {/* Cover */}
            <div style={{ height: 200, overflow: 'hidden', background: '#EDE8DF', position: 'relative' }}>
              <img
                src={c.coverImageUrl}
                alt={c.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,47,68,0.45), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: '#F5F1EA' }}>{c.name}</div>
              </div>
            </div>
            {/* Meta */}
            <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>{c.universe}</span>
              <span style={{ fontSize: 12, color: TEXT_SEC }}>{productCount(c)} products</span>
              <div style={{ flex: 1 }} />
              <StatusChip status={c.status} />
              <span style={{ fontSize: 11, color: TEXT_SEC }}>{c.updated}</span>
            </div>
          </div>
        ))}
        {!collectionsLoading && !productsLoading && collections.length === 0 && <div style={{ gridColumn: '1 / -1', padding: 32, textAlign: 'center', color: TEXT_SEC }}>No collections found.</div>}
        {collectionsError && <div style={{ gridColumn: '1 / -1', padding: 32, textAlign: 'center', color: '#A06030' }}>{collectionsError}</div>}
      </div>
    </div>
  )
}
