import type { CSSProperties } from 'react'
import type { Collection } from '../../../entities'
import { TEXT, BORDER, SURFACE, CREAM, SAND, FONT_SERIF } from '../../theme/tokens'
import { StatusChip } from '../ui/Badge'

interface CollectionCardProps {
  collection: Pick<Collection, 'id' | 'name' | 'universe' | 'season' | 'status' | 'coverImageUrl' | 'description'>
  productCount?: number
  onClick?: () => void
  style?: CSSProperties
}

export function CollectionCard({ collection, productCount, onClick, style }: CollectionCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }}>
        <img src={collection.coverImageUrl} alt={collection.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,47,68,0.75) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
          <div style={{ fontFamily: FONT_SERIF, fontSize: '18px', fontWeight: 500, color: CREAM, lineHeight: 1.2, marginBottom: 6 }}>{collection.name}</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: 999, background: 'rgba(231,223,210,0.2)', color: CREAM, fontWeight: 600 }}>{collection.season}</span>
            <StatusChip status={collection.status} />
          </div>
        </div>
      </div>
      {(collection.description || productCount !== undefined) && (
        <div style={{ padding: '12px 14px' }}>
          {collection.description && (
            <div style={{ fontSize: '12px', color: TEXT, lineHeight: 1.5, marginBottom: productCount !== undefined ? 8 : 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {collection.description}
            </div>
          )}
          {productCount !== undefined && (
            <div style={{ fontSize: '11px', color: SAND }}>{productCount} product{productCount !== 1 ? 's' : ''}</div>
          )}
        </div>
      )}
    </div>
  )
}
