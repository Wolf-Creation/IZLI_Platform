import { useEffect, useMemo, useState } from 'react'
import type { Screen } from '../../../types'
import { api } from '../../../shared/services/api'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface OrderRecord {
  id: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  customerPhone2?: string
  shippingAddress: string
  shippingCarrier?: string
  paymentMethod?: string
  paymentStatus: string
  status: string
  lineItems: Array<{ productName: string; sku: string; size: string; qty: number; unitPrice: number; currency: string }>
  subtotal: number
  shippingCost: number
  total: number
  currency: string
  createdAt: string
}

interface Props {
  onNavigate: (screen: Screen) => void
}

function StatusChip({ label, color, background }: { label: string; color: string; background: string }) {
  return <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 999, background, color, whiteSpace: 'nowrap' }}>{label}</span>
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat('fr-TN', { style: 'currency', currency, maximumFractionDigits: 3 }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}

const fulfillmentLabels: Record<string, string> = {
  pending: 'Unfulfilled',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
}
const filters = ['All', 'Unfulfilled', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']

export default function OrdersList(_props: Props) {
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let active = true
    api.get<{ items: OrderRecord[] }>('/orders')
      .then(result => {
        if (active) setOrders(result.items)
      })
      .catch(reason => {
        if (active) setError(reason instanceof Error ? reason.message : 'Could not load orders.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const visibleOrders = useMemo(() => {
    const query = search.trim().toLowerCase()
    return orders.filter(order => {
      const fulfillment = fulfillmentLabels[order.status] ?? order.status
      const matchesFilter = filter === 'All' || (filter === 'Unfulfilled' ? order.status === 'pending' : fulfillment === filter)
      const matchesSearch = !query || [order.id, order.customerName, order.customerEmail, order.customerPhone, order.customerPhone2]
        .some(value => value?.toLowerCase().includes(query))
      return matchesFilter && matchesSearch
    })
  }, [orders, filter, search])

  const paymentLabel = (order: OrderRecord) => order.paymentStatus === 'paid' ? 'Paid' : order.paymentStatus === 'refunded' ? 'Refunded' : 'Pending · COD'

  return (
    <main style={{ padding: '40px 48px', maxWidth: 1440, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, gap: 20, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>Orders</h1>
          <p style={{ fontSize: 14, color: TEXT_SEC, margin: '6px 0 0' }}>{orders.length} saved orders</p>
        </div>
        <button type="button" onClick={() => window.location.reload()} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer' }}>Refresh</button>
      </header>

      <section style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {filters.map(value => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            style={{ padding: '6px 13px', borderRadius: 10, border: `1px solid ${filter === value ? INDIGO : BORDER}`, background: filter === value ? INDIGO : 'transparent', color: filter === value ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
          >
            {value}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <input
          aria-label="Search orders"
          placeholder="Search orders or customers…"
          value={search}
          onChange={event => setSearch(event.target.value)}
          style={{ minWidth: 220, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '9px 12px', background: '#EDE8DF', color: TEXT, fontSize: 12 }}
        />
      </section>

      {error && <p role="alert" style={{ padding: 16, color: '#A02020', background: '#FDECEC', borderRadius: 10 }}>{error}</p>}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: 980, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
              {['Order', 'Customer', 'Items', 'Total', 'Payment', 'Fulfillment', 'Date'].map(label => (
                <th key={label} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={7} style={{ padding: 28, color: TEXT_SEC, textAlign: 'center' }}>Loading orders…</td></tr>}
            {!loading && !error && visibleOrders.map(order => {
              const fulfillment = fulfillmentLabels[order.status] ?? order.status
              const isFulfilled = ['Shipped', 'Delivered'].includes(fulfillment)
              return (
                <tr key={order.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td style={{ padding: '14px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: INDIGO, fontWeight: 600 }}>#{order.id.slice(-8).toUpperCase()}</td>
                  <td style={{ padding: '14px 16px', minWidth: 220 }}>
                    <strong style={{ display: 'block', fontSize: 13, color: TEXT }}>{order.customerName || 'Customer'}</strong>
                    <span style={{ display: 'block', marginTop: 3, fontSize: 11, color: TEXT_SEC }}>{order.customerEmail}</span>
                    <span style={{ display: 'block', marginTop: 3, fontSize: 11, color: TEXT_SEC }}>{order.customerPhone}</span>
                    {order.customerPhone2 && <span style={{ display: 'block', marginTop: 3, fontSize: 11, color: TEXT_SEC }}>{order.customerPhone2}</span>}
                    <details style={{ marginTop: 7, fontSize: 11, color: TEXT_SEC }}>
                      <summary style={{ cursor: 'pointer' }}>Delivery Address &amp; items</summary>
                      <p>{order.shippingAddress}</p>
                      <p>{order.shippingCarrier || 'Carrier not saved'} · Cash on delivery</p>
                      {order.lineItems.map((item, index) => (
                        <p key={`${item.sku}-${index}`}>{item.productName} · {item.sku} · Size {item.size} × {item.qty}</p>
                      ))}
                    </details>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: TEXT_SEC }}>{order.lineItems.reduce((count, item) => count + item.qty, 0)} items</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: TEXT, whiteSpace: 'nowrap' }}>{formatMoney(order.total, order.currency)}</td>
                  <td style={{ padding: '14px 16px' }}><StatusChip label={paymentLabel(order)} color={order.paymentStatus === 'paid' ? '#4A7A5A' : '#A07820'} background={order.paymentStatus === 'paid' ? '#E6EDE8' : '#FDF8EC'} /></td>
                  <td style={{ padding: '14px 16px' }}><StatusChip label={fulfillment} color={isFulfilled ? INDIGO : TEXT_SEC} background={isFulfilled ? '#E8EDF3' : '#EDE8DF'} /></td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: TEXT_SEC, whiteSpace: 'nowrap' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              )
            })}
            {!loading && !error && visibleOrders.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 32, color: TEXT_SEC, textAlign: 'center' }}>{orders.length ? 'No orders match these filters.' : 'No saved orders yet.'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 16, fontSize: 12, color: TEXT_SEC }}>Showing {visibleOrders.length} of {orders.length} orders</p>
    </main>
  )
}
