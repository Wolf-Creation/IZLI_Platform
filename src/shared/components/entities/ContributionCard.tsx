import type { CSSProperties } from 'react'
import type { Contribution } from '../../../entities'
import { TEXT, TEXT_SEC, BORDER, SURFACE, INDIGO, SAND, FONT_SANS, FONT_MONO } from '../../theme/tokens'
import { StatusChip, Badge } from '../ui/Badge'

interface ContributionCardProps {
  contribution: Pick<Contribution, 'id' | 'title' | 'type' | 'status' | 'memberName' | 'coverImageUrl' | 'challengeName' | 'votes'>
  onClick?: () => void
  style?: CSSProperties
}

export function ContributionCard({ contribution, onClick, style }: ContributionCardProps) {
  return (
    <div
      onClick={onClick}
      style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={contribution.coverImageUrl} alt={contribution.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px', color: SAND }}>{contribution.id}</span>
          <StatusChip status={contribution.status} />
        </div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 5 }}>{contribution.title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <Badge variant="neutral" size="xs">{contribution.type}</Badge>
            {contribution.challengeName && (
              <span style={{ fontSize: '10px', color: INDIGO, fontFamily: FONT_SANS }}>◇ {contribution.challengeName}</span>
            )}
          </div>
          <span style={{ fontSize: '11px', color: TEXT_SEC, fontFamily: FONT_SANS }}>↑ {contribution.votes}</span>
        </div>
      </div>
    </div>
  )
}
