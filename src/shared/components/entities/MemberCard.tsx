import type { CSSProperties } from 'react'
import type { CommunityMember } from '../../../entities'
import { TEXT, TEXT_SEC, BORDER, SURFACE, INDIGO, CLAY, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../theme/tokens'
import { Avatar } from '../ui/Avatar'
import { StatusChip } from '../ui/Badge'

interface MemberCardProps {
  member: Pick<CommunityMember, 'id' | 'displayName' | 'level' | 'status' | 'contributionsCount' | 'challengesParticipated' | 'location'>
  onClick?: () => void
  style?: CSSProperties
}

export function MemberCard({ member, onClick, style }: MemberCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14,
        padding: '18px 20px', cursor: onClick ? 'pointer' : 'default',
        display: 'flex', flexDirection: 'column', gap: 12,
        ...style,
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar name={member.displayName} size="md" round />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '14px', fontWeight: 500, color: TEXT, marginBottom: 2 }}>{member.displayName}</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 20, height: 20, borderRadius: 999, background: CLAY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#FFFFFF', flexShrink: 0 }}>
              {member.level}
            </div>
            <StatusChip status={member.status} />
          </div>
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: '10px', color: TEXT_SEC }}>{member.id}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { l: 'Contributions', v: member.contributionsCount },
          { l: 'Challenges', v: member.challengesParticipated },
        ].map(s => (
          <div key={s.l} style={{ background: '#EDE8DF', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: '18px', fontWeight: 500, color: INDIGO }}>{s.v}</div>
            <div style={{ fontSize: '10px', color: TEXT_SEC, fontFamily: FONT_SANS }}>{s.l}</div>
          </div>
        ))}
      </div>
      {member.location && (
        <div style={{ fontSize: '11px', color: TEXT_SEC, fontFamily: FONT_SANS }}>◎ {member.location}</div>
      )}
    </div>
  )
}
