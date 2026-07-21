import type { CSSProperties } from 'react'
import type { LabProject } from '../../../entities'
import { TEXT_SEC, BORDER, SURFACE, INDIGO, SAND, FONT_SERIF, FONT_SANS } from '../../theme/tokens'
import { StatusChip, Badge } from '../ui/Badge'

interface LabProjectCardProps {
  project: Pick<LabProject, 'id' | 'title' | 'tagline' | 'status' | 'category' | 'coverImageUrl' | 'membersCount' | 'maxMembers' | 'contributionsCount' | 'progress' | 'leadName'>
  variant?: 'grid' | 'horizontal'
  onClick?: () => void
  style?: CSSProperties
}

export function LabProjectCard({ project, variant = 'grid', onClick, style }: LabProjectCardProps) {
  const progressBar = (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '11px', color: TEXT_SEC, fontFamily: FONT_SANS }}>
        <span>{project.progress}% complete</span>
        <span>{project.membersCount}/{project.maxMembers} members</span>
      </div>
      <div style={{ height: 4, background: BORDER, borderRadius: 999 }}>
        <div style={{ height: '100%', width: `${project.progress}%`, background: INDIGO, borderRadius: 999 }} />
      </div>
    </div>
  )

  if (variant === 'horizontal') {
    return (
      <div onClick={onClick} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', display: 'flex', cursor: onClick ? 'pointer' : 'default', ...style }}>
        <div style={{ width: 200, flexShrink: 0, overflow: 'hidden' }}>
          <img src={project.coverImageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <StatusChip status={project.status} />
            <Badge variant="neutral" size="xs">{project.category}</Badge>
          </div>
          <div style={{ fontFamily: FONT_SERIF, fontSize: '20px', fontWeight: 500, color: INDIGO }}>{project.title}</div>
          <div style={{ fontSize: '13px', color: TEXT_SEC }}>{project.tagline}</div>
          {progressBar}
        </div>
      </div>
    )
  }

  return (
    <div onClick={onClick} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', ...style }}>
      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        <img src={project.coverImageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <StatusChip status={project.status} />
          <Badge variant="neutral" size="xs">{project.category}</Badge>
        </div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: '16px', fontWeight: 500, color: INDIGO, lineHeight: 1.2 }}>{project.title}</div>
        <div style={{ fontSize: '12px', color: TEXT_SEC }}>{project.tagline}</div>
        {progressBar}
        <div style={{ fontSize: '11px', color: SAND, fontFamily: FONT_SANS }}>Led by {project.leadName} · {project.contributionsCount} contributions</div>
      </div>
    </div>
  )
}
