import { useMemo, useState } from 'react'
import type { Screen } from '../../../types'
import type { Product } from '../../../entities'
import { useProducts } from '../../../shared/hooks/useProducts'
import { updateProduct } from '../../../shared/services/products'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const SURFACE = '#F5F1EA'

interface Props {
  onNavigate: (screen: Screen) => void
}

export default function StockManagement({ onNavigate }: Props) {
  const { products, loading, error, refetch } = useProducts()
  const [search, setSearch] = useState('')
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return products
    return products.filter(product => `${product.name} ${product.sku}`.toLowerCase().includes(query))
  }, [products, search])

  const quantityFor = (product: Product) => drafts[product.id] ?? String(product.quantity ?? 0)

  const saveQuantity = async (product: Product) => {
    const value = Number(quantityFor(product))
    if (!Number.isInteger(value) || value < 0) {
      setMessage('Quantity must be a whole number greater than or equal to 0.')
      return
    }

    try {
      setSavingId(product.id)
      setMessage(null)
      await updateProduct(product.id, { quantity: value })
      setMessage(`${product.name} stock updated.`)
      refetch()
    } catch (stockError) {
      setMessage(stockError instanceof Error ? stockError.message : 'Unable to update stock.')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Stock management</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Manage quantities for existing products.</div>
        </div>
        <button type="button" onClick={() => onNavigate('products')} style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', color: TEXT_SEC, cursor: 'pointer' }}>Back to products</button>
      </div>

      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 18, marginBottom: 20 }}>
        <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search by product name or SKU" style={{ width: '100%', maxWidth: 420, padding: '11px 13px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', color: TEXT, outline: 'none' }} />
        {message && <div style={{ marginTop: 12, fontSize: 13, color: message.toLowerCase().includes('unable') || message.toLowerCase().includes('must') ? '#A06030' : '#4A7A5A' }}>{message}</div>}
        {error && <div style={{ marginTop: 12, fontSize: 13, color: '#A06030' }}>{error}</div>}
      </div>

      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) 180px 180px 140px', gap: 16, padding: '13px 20px', background: '#EFE8DD', borderBottom: `1px solid ${BORDER}`, color: TEXT_SEC, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <span>Product</span><span>SKU</span><span>Current stock</span><span>Action</span>
        </div>
        {loading ? <div style={{ padding: 28, color: TEXT_SEC }}>Loading stock...</div> : visibleProducts.length === 0 ? <div style={{ padding: 28, color: TEXT_SEC }}>No products found.</div> : visibleProducts.map(product => (
          <div key={product.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) 180px 180px 140px', gap: 16, alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${BORDER}` }}>
            <div><div style={{ color: TEXT, fontWeight: 600, fontSize: 14 }}>{product.name}</div><div style={{ color: TEXT_SEC, fontSize: 12, marginTop: 4 }}>{product.universe}</div></div>
            <div style={{ color: TEXT_SEC, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{product.sku}</div>
            <input type="number" min="0" step="1" value={quantityFor(product)} onChange={event => setDrafts(current => ({ ...current, [product.id]: event.target.value }))} style={{ width: 120, padding: '9px 10px', border: `1px solid ${BORDER}`, borderRadius: 8, background: '#EDE8DF', color: TEXT, fontFamily: 'JetBrains Mono, monospace' }} aria-label={`Quantity for ${product.name}`} />
            <button type="button" disabled={savingId === product.id} onClick={() => void saveQuantity(product)} style={{ width: 'fit-content', padding: '9px 13px', border: 'none', borderRadius: 8, background: INDIGO, color: '#E7DFD2', fontSize: 12, fontWeight: 600, cursor: savingId === product.id ? 'wait' : 'pointer', opacity: savingId === product.id ? 0.65 : 1 }}>{savingId === product.id ? 'Saving...' : 'Save'}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
