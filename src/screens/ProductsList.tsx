import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Published': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Draft': { bg: '#EDE8DF', color: TEXT_SEC },
    'Active': { bg: '#E8EDF3', color: INDIGO },
    'Archived': { bg: '#EEEEEE', color: '#999' },
    'Low Stock': { bg: '#FDF3EC', color: '#A06030' },
  }
  const s = map[status] ?? map['Draft']
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

const PRODUCTS = [
  { name: 'Tifinagh Frame Tee', universe: 'Heritage', collection: 'Echoes of Stone', status: 'Published', inventory: 48, price: '€45', updated: '8 Jul 2026' },
  { name: 'Washed Indigo Heritage Tee', universe: 'Heritage', collection: 'Indigo Memory', status: 'Published', inventory: 12, price: '€45', updated: '7 Jul 2026' },
  { name: 'Atlas Symbol Boxy Tee', universe: 'Essentials', collection: 'Atlas Marks', status: 'Published', inventory: 6, price: '€40', updated: '6 Jul 2026' },
  { name: 'Community Lab Archive Jersey', universe: 'Community Lab', collection: '—', status: 'Active', inventory: 24, price: '€75', updated: '5 Jul 2026' },
  { name: 'Amazigh Grid Sweatshirt', universe: 'Heritage', collection: 'Echoes of Stone', status: 'Draft', inventory: 0, price: '€85', updated: '3 Jul 2026' },
  { name: 'Woven Sahara Overshirt', universe: 'Studio', collection: 'Heritage Essentials 01', status: 'Published', inventory: 18, price: '€120', updated: '2 Jul 2026' },
  { name: 'Berber Stitch Cardigan', universe: 'Studio', collection: 'Heritage Essentials 01', status: 'Low Stock', inventory: 3, price: '€145', updated: '1 Jul 2026' },
  { name: 'Tifinagh Graphic Hoodie', universe: 'Essentials', collection: 'Atlas Marks', status: 'Archived', inventory: 0, price: '€65', updated: '28 Jun 2026' },
]

const UNIVERSES = ['All', 'Essentials', 'Heritage', 'Studio', 'Community Lab']

export default function ProductsList({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>Products</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>8 products across 4 universes</div>
        </div>
        <button
          onClick={() => onNavigate('product-editor')}
          style={{ display: 'flex', alignItems: 'center', gap: 7, background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
          + Create Product
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {/* Universe tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {UNIVERSES.map((u, i) => (
            <button key={u} style={{
              padding: '6px 14px',
              borderRadius: 10,
              border: `1px solid ${i === 0 ? INDIGO : BORDER}`,
              background: i === 0 ? INDIGO : 'transparent',
              color: i === 0 ? '#E7DFD2' : TEXT_SEC,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}>{u}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '7px 12px', width: 200 }}>
          <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
          <input placeholder="Search products..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }} />
        </div>
        {/* Status filter */}
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
              <th style={{ width: 40, padding: '12px 20px' }}>
                <input type="checkbox" style={{ cursor: 'pointer' }} />
              </th>
              {['Product', 'Universe', 'Collection', 'Status', 'Inventory', 'Price', 'Updated'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, i) => (
              <tr
                key={i}
                style={{ borderBottom: i < PRODUCTS.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onClick={() => onNavigate('product-editor')}
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
                        src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=96&fit=crop&auto=format`}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{p.name}</div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>{p.universe}</span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: TEXT_SEC }}>{p.collection}</td>
                <td style={{ padding: '14px 16px' }}><StatusChip status={p.status} /></td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: p.inventory < 5 ? '#A06030' : TEXT_SEC, fontFamily: "'JetBrains Mono', monospace" }}>{p.inventory}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500, color: TEXT }}>{p.price}</td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: TEXT_SEC }}>{p.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <div style={{ fontSize: 12, color: TEXT_SEC }}>Showing 8 of 8 products</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['←', '1', '2', '→'].map((p, i) => (
            <button key={i} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${i === 1 ? INDIGO : BORDER}`, background: i === 1 ? INDIGO : 'transparent', color: i === 1 ? '#E7DFD2' : TEXT_SEC, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
