import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

const COLLECTIONS = [
  { name: 'Echoes of Stone', universe: 'Heritage', products: 14, status: 'Published', updated: '8 Jul 2026', image: 'photo-1469334031218-e382a71b716b' },
  { name: 'Indigo Memory', universe: 'Heritage', products: 9, status: 'Published', updated: '5 Jul 2026', image: 'photo-1490481651871-ab68de25d43d' },
  { name: 'Atlas Marks', universe: 'Essentials', products: 7, status: 'Active', updated: '3 Jul 2026', image: 'photo-1516762689617-e1cffcef479d' },
  { name: 'Heritage Essentials 01', universe: 'Studio', products: 12, status: 'Draft', updated: '28 Jun 2026', image: 'photo-1523381210434-271e8be1f52b' },
]

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
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Collections</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>4 collections · 42 products total</div>
        </div>
        <button
          onClick={() => onNavigate('collection-editor')}
          style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          + Create Collection
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {COLLECTIONS.map((c, i) => (
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
                src={`https://images.unsplash.com/${c.image}?w=700&h=240&fit=crop&auto=format`}
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
              <span style={{ fontSize: 12, color: TEXT_SEC }}>{c.products} products</span>
              <div style={{ flex: 1 }} />
              <StatusChip status={c.status} />
              <span style={{ fontSize: 11, color: TEXT_SEC }}>{c.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
