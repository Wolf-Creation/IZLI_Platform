import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

function PaymentChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Paid': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Pending': { bg: '#FDF8EC', color: '#A07820' },
    'Refunded': { bg: '#EDE8DF', color: TEXT_SEC },
    'Failed': { bg: '#FDECEC', color: '#A02020' },
  }
  const s = map[status] ?? map['Pending']
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

function FulfillChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Fulfilled': { bg: '#E8EDF3', color: INDIGO },
    'Unfulfilled': { bg: '#EDE8DF', color: TEXT_SEC },
    'Partial': { bg: '#F3EDE8', color: '#8C6B52' },
    'Returned': { bg: '#EEEEEE', color: '#888' },
  }
  const s = map[status] ?? map['Unfulfilled']
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

const ORDERS = [
  { id: '#ORD-2841', customer: 'Mehdi Aït Mansour', email: 'mehdi@example.com', total: '€135.00', payment: 'Paid', fulfill: 'Fulfilled', date: '9 Jul 2026', items: 3 },
  { id: '#ORD-2840', customer: 'Lina Meziane', email: 'lina@example.com', total: '€45.00', payment: 'Paid', fulfill: 'Unfulfilled', date: '9 Jul 2026', items: 1 },
  { id: '#ORD-2839', customer: 'Youcef Benali', email: 'youcef@example.com', total: '€220.00', payment: 'Paid', fulfill: 'Partial', date: '8 Jul 2026', items: 4 },
  { id: '#ORD-2838', customer: 'Amira Saïdi', email: 'amira@example.com', total: '€85.00', payment: 'Pending', fulfill: 'Unfulfilled', date: '8 Jul 2026', items: 1 },
  { id: '#ORD-2837', customer: 'Karim Ouali', email: 'karim@example.com', total: '€45.00', payment: 'Paid', fulfill: 'Fulfilled', date: '7 Jul 2026', items: 1 },
  { id: '#ORD-2836', customer: 'Sarah El Fassi', email: 'sarah@example.com', total: '€165.00', payment: 'Paid', fulfill: 'Fulfilled', date: '7 Jul 2026', items: 2 },
  { id: '#ORD-2835', customer: 'Omar Hamdouchi', email: 'omar@example.com', total: '€75.00', payment: 'Refunded', fulfill: 'Returned', date: '6 Jul 2026', items: 1 },
]

export default function OrdersList({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Orders</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>214 orders this month · €48,320 revenue</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Export</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['All', 'Unfulfilled', 'Paid', 'Pending', 'Returned'].map((f, i) => (
          <button key={f} style={{ padding: '5px 13px', borderRadius: 10, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '7px 12px', width: 200 }}>
          <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
          <input placeholder="Search orders..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }} />
        </div>
        <input type="date" defaultValue="2026-07-01" style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
      </div>

      {/* Table */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
              <th style={{ width: 40, padding: '12px 20px' }}><input type="checkbox" /></th>
              {['Order', 'Customer', 'Items', 'Total', 'Payment', 'Fulfillment', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o, i) => (
              <tr
                key={i}
                style={{ borderBottom: i < ORDERS.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onClick={() => onNavigate('customer')}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
              >
                <td style={{ padding: '13px 20px' }} onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                <td style={{ padding: '13px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: INDIGO, fontWeight: 500 }}>{o.id}</td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{o.customer}</div>
                  <div style={{ fontSize: 11, color: TEXT_SEC }}>{o.email}</div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: TEXT_SEC }}>{o.items} items</td>
                <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 600, color: TEXT }}>{o.total}</td>
                <td style={{ padding: '13px 16px' }}><PaymentChip status={o.payment} /></td>
                <td style={{ padding: '13px 16px' }}><FulfillChip status={o.fulfill} /></td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: TEXT_SEC }}>{o.date}</td>
                <td style={{ padding: '13px 16px' }}>
                  <button onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Actions</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <div style={{ fontSize: 12, color: TEXT_SEC }}>Showing 7 of 214 orders</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['←', '1', '2', '3', '...', '31', '→'].map((p, i) => (
            <button key={i} style={{ minWidth: 32, height: 32, padding: '0 6px', borderRadius: 8, border: `1px solid ${i === 1 ? INDIGO : BORDER}`, background: i === 1 ? INDIGO : 'transparent', color: i === 1 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
