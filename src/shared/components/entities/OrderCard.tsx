import type { CSSProperties } from 'react'
import type { Order } from '../../../entities'
import { TEXT_SEC, BORDER, SURFACE, INDIGO, SAND, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../theme/tokens'
import { StatusChip } from '../ui/Badge'

interface OrderCardProps {
  order: Pick<Order, 'id' | 'status' | 'paymentStatus' | 'lineItems' | 'total' | 'currency' | 'createdAt'>
  onClick?: () => void
  style?: CSSProperties
}

export function OrderCard({ order, onClick, style }: OrderCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14,
        padding: '16px 20px', cursor: onClick ? 'pointer' : 'default',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 16, ...style,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', fontWeight: 600, color: INDIGO }}>#{order.id}</span>
          <StatusChip status={order.status} />
          <StatusChip status={order.paymentStatus} />
        </div>
        <div style={{ fontSize: '12px', color: TEXT_SEC, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {order.lineItems.map(l => `${l.productName} (${l.size})`).join(', ')}
        </div>
        <div style={{ fontSize: '11px', color: SAND, fontFamily: FONT_SANS }}>{order.createdAt.slice(0, 10)}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: FONT_SERIF, fontSize: '18px', fontWeight: 500, color: INDIGO }}>€{order.total}</div>
        <div style={{ fontSize: '11px', color: TEXT_SEC, fontFamily: FONT_SANS, marginTop: 2 }}>{order.lineItems.length} item{order.lineItems.length !== 1 ? 's' : ''}</div>
      </div>
    </div>
  )
}
