import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import './MarqueeBanner.scss'

interface MarqueeBannerProps {
  items: string[]
  direction?: 'left' | 'right'
  duration?: number
  separator?: string
  className?: string
  style?: CSSProperties
}

type MarqueeStyle = CSSProperties & {
  '--marquee-duration': string
  '--marquee-direction': 'normal' | 'reverse'
}

export function MarqueeBanner({
  items,
  direction = 'left',
  duration = 60,
  separator = '✦',
  className = '',
  style,
}: MarqueeBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const [groupCopies, setGroupCopies] = useState(2)
  const sequenceKey = items.join('\u0000')

  useLayoutEffect(() => {
    const banner = bannerRef.current
    const group = groupRef.current
    if (!banner || !group) return

    let isActive = true
    const updateCopies = () => {
      if (!isActive) return
      const children = group.children
      const firstCycleChildCount = items.length * 2
      if (children.length < firstCycleChildCount || firstCycleChildCount === 0) return

      const firstCycleWidth = children[firstCycleChildCount - 1].getBoundingClientRect().right
        - children[0].getBoundingClientRect().left
      const gap = Number.parseFloat(window.getComputedStyle(group).columnGap) || 0
      const cycleWidth = firstCycleWidth + gap
      if (cycleWidth <= 0) return

      const nextCopies = Math.max(1, Math.ceil((banner.clientWidth + gap) / cycleWidth))
      setGroupCopies(current => current === nextCopies ? current : nextCopies)
    }

    const resizeObserver = new ResizeObserver(updateCopies)
    resizeObserver.observe(banner)
    window.addEventListener('resize', updateCopies)
    updateCopies()
    void document.fonts.ready.then(updateCopies)
    return () => {
      isActive = false
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateCopies)
    }
  }, [items.length, sequenceKey])

  if (items.length === 0) return null

  const marqueeStyle: MarqueeStyle = {
    '--marquee-duration': `${duration}s`,
    '--marquee-direction': direction === 'left' ? 'normal' : 'reverse',
  }
  const label = items.join(` ${separator} `)

  return (
    <div
      ref={bannerRef}
      className={`izli-marquee ${className}`.trim()}
      style={{ ...style, ...marqueeStyle }}
      role="img"
      aria-label={label}
    >
      <div className="izli-marquee__track" aria-hidden="true">
        {[0, 1].map(groupCopy => (
          <div className="izli-marquee__group" key={groupCopy} ref={groupCopy === 0 ? groupRef : undefined}>
            {Array.from({ length: groupCopies }, (_, cycle) => items.flatMap((item, index) => [
              <span className="izli-marquee__phrase" key={`${cycle}-${index}-phrase`}>{item}</span>,
              <span className="izli-marquee__separator" key={`${cycle}-${index}-separator`}>{separator}</span>,
            ]))}
          </div>
        ))}
      </div>
    </div>
  )
}
