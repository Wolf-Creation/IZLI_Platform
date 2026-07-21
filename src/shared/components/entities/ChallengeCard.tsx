import type { CSSProperties } from 'react'
import type { Challenge } from '../../../entities'
import { TEXT_SEC, BORDER, SURFACE, INDIGO, SAND, CREAM, FONT_SERIF, FONT_SANS } from '../../theme/tokens'
import { StatusChip, Badge } from '../ui/Badge'

interface ChallengeCardProps {
  challenge: Pick<Challenge, 'id' | 'title' | 'tagline' | 'status' | 'level' | 'coverImageUrl' | 'endDate' | 'submissionsCount' | 'participantsCount'>
  onClick?: () => void
  style?: CSSProperties
}

export function ChallengeCard({ challenge, onClick, style }: ChallengeCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14,
        overflow: 'hidden', cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
        <img src={challenge.coverImageUrl} alt={challenge.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,47,68,0.35)' }} />
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          <StatusChip status={challenge.status} />
          <Badge variant="neutral" size="xs">{challenge.level}</Badge>
        </div>
        <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
          <span style={{ fontSize: '10px', color: 'rgba(231,223,210,0.7)' }}>◇</span>
          <span style={{ fontSize: '10px', color: CREAM, marginLeft: 4 }}>Challenge</span>
        </div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontFamily: FONT_SERIF, fontSize: '17px', fontWeight: 500, color: INDIGO, lineHeight: 1.2, marginBottom: 6 }}>{challenge.title}</div>
        <div style={{ fontSize: '12px', color: TEXT_SEC, lineHeight: 1.5, marginBottom: 10 }}>{challenge.tagline}</div>
        <div style={{ display: 'flex', gap: 16, fontSize: '11px', color: SAND, fontFamily: FONT_SANS }}>
          <span>{challenge.submissionsCount} submissions</span>
          <span>{challenge.participantsCount} participants</span>
          <span>Closes {challenge.endDate.slice(0, 10)}</span>
        </div>
      </div>
    </div>
  )
}
