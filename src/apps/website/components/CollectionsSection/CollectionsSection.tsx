import { useState, useEffect } from 'react'
import './CollectionsSection.scss'

interface Collection {
  id: string
  number: string
  name: string
  headline: string
  description: string
  image: string
  imageAlt: string
}

const COLLECTIONS: Collection[] = [
  {
    id: 'heritage',
    number: '01',
    name: 'HERITAGE',
    headline: 'Rooted in the earth of our ancestors',
    description: 'Traditional craft techniques merged with contemporary silhouettes. Each piece carries the weight of memory.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop&auto=format',
    imageAlt: 'Heritage collection model',
  },
  {
    id: 'legacy',
    number: '02',
    name: 'LEGACY',
    headline: 'What we inherit becomes what we create',
    description: 'A dialogue between archival references and forward-thinking design. Timeless pieces for an uncertain future.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop&auto=format',
    imageAlt: 'Legacy collection model',
  },
  {
    id: 'freedom',
    number: '03',
    name: 'FREEDOM',
    headline: 'Unbound by convention',
    description: 'Bold proportions and unexpected textures. Liberation expressed through material and form.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format',
    imageAlt: 'Freedom collection model',
  },
  {
    id: 'community',
    number: '04',
    name: 'COMMUNITY',
    headline: 'Woven together, we persist',
    description: 'Collaborative pieces designed with and for communities. Fashion as a practice of collective care.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&auto=format',
    imageAlt: 'Community collection model',
  },
]

type LayoutState = 'A' | 'B'

export function CollectionsSection() {
  const [layoutState, setLayoutState] = useState<LayoutState>('A')
  const [isAnimating, setIsAnimating] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (prefersReducedMotion) {
        setLayoutState(prev => (prev === 'A' ? 'B' : 'A'))
      } else {
        setIsAnimating(true)
        const animationTimer = setTimeout(() => {
          setLayoutState(prev => (prev === 'A' ? 'B' : 'A'))
          setIsAnimating(false)
        }, 1400)
        return () => clearTimeout(animationTimer)
      }
    }, prefersReducedMotion ? 5000 : 10000)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const getColumnType = (index: number): 'image' | 'text' => {
    if (layoutState === 'A') {
      return index % 2 === 0 ? 'image' : 'text'
    } else {
      return index % 2 === 0 ? 'text' : 'image'
    }
  }

  return (
    <section className="collections-section">
      <div className="collections-header">
        <h2 className="collections-title">RBOR</h2>
        <p className="collections-subtitle">The first collection</p>
      </div>

      <div className={`collections-grid collections-grid--state-${layoutState} ${isAnimating ? 'is-animating' : ''}`}>
        {COLLECTIONS.map((collection, index) => {
          const columnType = getColumnType(index)
          return (
            <div
              key={collection.id}
              className={`collections-column collections-column--${index + 1} collections-column--${columnType}`}
              data-layout-state={layoutState}
            >
              {columnType === 'image' ? (
                <div className="collections-image-panel">
                  <img
                    src={collection.image}
                    alt={collection.imageAlt}
                    className="collections-image"
                  />
                  <div className="collections-image-overlay" />
                </div>
              ) : (
                <div className="collections-text-panel">
                  <div className="collections-text-panel__inner">
                    <div className="collections-label">{collection.number}</div>
                    <div className="collections-symbol">✶</div>
                    <h3 className="collections-name">{collection.name}</h3>
                    <h4 className="collections-headline">{collection.headline}</h4>
                    <p className="collections-description">{collection.description}</p>
                    <button className="collections-cta">
                      <span>Explore</span>
                      <span className="collections-cta__arrow">→</span>
                    </button>
                  </div>
                  <div className="collections-topo-bg" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
