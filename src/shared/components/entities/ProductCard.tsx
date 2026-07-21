import type { CSSProperties } from 'react'
import type { Product } from '../../../entities'
import { INDIGO, TEXT, BORDER, SURFACE, SAND, CREAM, FONT_SERIF, FONT_MONO } from '../../theme/tokens'
import { StatusChip } from '../ui/Badge'

interface ProductCardProps {
  product: Pick<Product, 'id' | 'sku' | 'name' | 'universe' | 'status' | 'price' | 'currency' | 'coverImageUrl'>
  variant?: 'grid' | 'row'
  onClick?: () => void
  style?: CSSProperties
}

export function ProductCard({ product, variant = 'grid', onClick, style }: ProductCardProps) {
  if (variant === 'row') {
    return (
      <div
        onClick={onClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
          cursor: onClick ? 'pointer' : 'default',
          borderBottom: `1px solid ${BORDER}`,
          ...style,
        }}
      >
        <div style={{ width: 44, height: 52, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
          <img src={product.coverImageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: 500, color: TEXT, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: '10px', color: SAND }}>{product.sku}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: INDIGO, marginBottom: 4 }}>€{product.price}</div>
          <StatusChip status={product.status} />
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
        <img src={product.coverImageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: 'rgba(30,47,68,0.7)', color: CREAM }}>{product.universe}</span>
        </div>
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: '10px', color: SAND, marginBottom: 4 }}>{product.sku}</div>
        <div style={{ fontSize: '14px', fontWeight: 500, color: TEXT, marginBottom: 6, lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: FONT_SERIF, fontSize: '16px', fontWeight: 500, color: INDIGO }}>€{product.price}</span>
          <StatusChip status={product.status} />
        </div>
      </div>
    </div>
  )
}
