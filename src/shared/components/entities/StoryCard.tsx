import type { CSSProperties } from 'react'
import type { Story } from '../../../entities'
import { TEXT, TEXT_SEC, BORDER, SURFACE, INDIGO, SAND, FONT_SERIF, FONT_SANS } from '../../theme/tokens'
import { Badge } from '../ui/Badge'

interface StoryCardProps {
  story: Pick<Story, 'id' | 'title' | 'subtitle' | 'type' | 'status' | 'authorName' | 'coverImageUrl' | 'readTimeMinutes' | 'publishedAt'>
  variant?: 'grid' | 'row' | 'hero'
  onClick?: () => void
  style?: CSSProperties
}

const TYPE_VARIANT: Record<string, 'indigo' | 'clay' | 'sage' | 'neutral'> = {
  editorial: 'indigo',
  community: 'clay',
  heritage: 'sage',
  process: 'neutral',
  interview: 'neutral',
}

export function StoryCard({ story, variant = 'grid', onClick, style }: StoryCardProps) {
  if (variant === 'row') {
    return (
      <div onClick={onClick} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: `1px solid ${BORDER}`, cursor: onClick ? 'pointer' : 'default', ...style }}>
        <div style={{ width: 60, height: 70, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
          <img src={story.coverImageUrl} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
            <Badge variant={TYPE_VARIANT[story.type] ?? 'neutral'} size="xs">{story.type}</Badge>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 4 }}>{story.title}</div>
          <div style={{ fontSize: '11px', color: SAND }}>{story.authorName} · {story.readTimeMinutes}min</div>
        </div>
      </div>
    )
  }

  return (
    <div onClick={onClick} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', ...style }}>
      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        <img src={story.coverImageUrl} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <Badge variant={TYPE_VARIANT[story.type] ?? 'neutral'} size="xs">{story.type}</Badge>
        </div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: '17px', fontWeight: 500, color: INDIGO, lineHeight: 1.3, marginBottom: 6 }}>{story.title}</div>
        {story.subtitle && <div style={{ fontSize: '12px', color: TEXT_SEC, lineHeight: 1.5, marginBottom: 8 }}>{story.subtitle}</div>}
        <div style={{ fontSize: '11px', color: SAND, fontFamily: FONT_SANS }}>{story.authorName} · {story.readTimeMinutes} min read</div>
      </div>
    </div>
  )
}
