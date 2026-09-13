import { useState, useRef, useEffect } from 'react'
import './ProductCarousel.scss'

interface Product {
  id: string
  name: string
  price: number
  release: string
  images: string[]
}

interface Props {
  products: Product[]
  autoScrollSpeed?: number
}

const DEFAULT_AUTO_SCROLL_SPEED = 0.5

const REMAINING_STOCK: Record<string, number> = {
  'PRD-0008': 42,
  'PRD-0014': 36,
  'PRD-0016': 18,
  'PRD-0021': 24,
  'PRD-0022': 14,
  'PRD-0031': 21,
  'PRD-0039': 32,
  'PRD-0044': 27,
  'PRD-0045': 16,
  'PRD-0046': 38,
  'PRD-0047': 12,
  'PRD-0048': 19,
  'PRD-0049': 29,
  'PRD-0050': 23,
  'PRD-0051': 9,
  'PRD-0052': 31,
  'PRD-0053': 17,
}

const LOCAL_PRODUCT_IMAGES = import.meta.glob(
  '../../../assets/Website_img/Shop/new releases/**/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>

const LOCAL_PRODUCT_FOLDER_ALIASES: Record<string, string> = {
  'PRD-0008': 'Atlas_symbol_heavy_oversized',
  'PRD-0054': 'Porte_ksour_heavy_oversized',
}

function normalizeProductName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function getLocalProductImages(product: Product) {
  const folderAlias = LOCAL_PRODUCT_FOLDER_ALIASES[product.id]
  const productName = normalizeProductName(product.name)
  const entries = Object.entries(LOCAL_PRODUCT_IMAGES)
    .filter(([path]) => !folderAlias || path.includes(`/${folderAlias}/`))
    .filter(([path]) => {
      if (folderAlias) return true
      const folderName = path.split('/').slice(-2, -1)[0]
      return normalizeProductName(folderName) === productName
    })
    .sort(([firstPath], [secondPath]) => {
      const firstIsPrincipal = firstPath.toLowerCase().includes('principal')
      const secondIsPrincipal = secondPath.toLowerCase().includes('principal')

      if (firstIsPrincipal !== secondIsPrincipal) {
        return firstIsPrincipal ? -1 : 1
      }

      return firstPath.localeCompare(secondPath)
    })

  return entries.map(([, imageUrl]) => imageUrl)
}

export function ProductCarousel({ products, autoScrollSpeed = DEFAULT_AUTO_SCROLL_SPEED }: Props) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cycleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({})
  const autoScrollFrameRef = useRef<number | null>(null)
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    const initialState: Record<string, number> = {}
    products.forEach(p => {
      initialState[p.id] = 0
    })
    setCurrentImageIndex(initialState)
  }, [products])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )

    observer.observe(carousel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stopAutoScroll = () => {
      if (autoScrollFrameRef.current !== null) {
        cancelAnimationFrame(autoScrollFrameRef.current)
        autoScrollFrameRef.current = null
      }
    }

    if (isVisible && !hoveredCardId) {
      const animate = () => {
        const container = containerRef.current
        if (!container) {
          autoScrollFrameRef.current = requestAnimationFrame(animate)
          return
        }

        const cycleWidth = cycleRef.current?.offsetWidth ?? 0
        if (cycleWidth <= 0) {
          autoScrollFrameRef.current = requestAnimationFrame(animate)
          return
        }

        const nextPosition = scrollPositionRef.current + autoScrollSpeed
        scrollPositionRef.current = nextPosition >= cycleWidth ? nextPosition - cycleWidth : nextPosition
        container.scrollLeft = scrollPositionRef.current
        autoScrollFrameRef.current = requestAnimationFrame(animate)
      }

      stopAutoScroll()
      scrollPositionRef.current = containerRef.current?.scrollLeft ?? 0
      autoScrollFrameRef.current = requestAnimationFrame(animate)
    } else {
      stopAutoScroll()
    }

    return stopAutoScroll
  }, [autoScrollSpeed, isVisible, hoveredCardId])

  const changeImage = (productId: string, direction: 'next' | 'prev') => {
    setCurrentImageIndex(prev => {
      const product = products.find(p => p.id === productId)
      if (!product) return prev

      const imageCount = getLocalProductImages(product).length || product.images.length
      if (imageCount === 0) return prev

      const currentIdx = prev[productId] || 0
      const nextIdx = direction === 'next'
        ? (currentIdx + 1) % imageCount
        : (currentIdx - 1 + imageCount) % imageCount

      return { ...prev, [productId]: nextIdx }
    })
  }

  return (
    <div
      className="product-carousel"
      ref={carouselRef}
    >
      <div className="product-carousel__container" ref={containerRef}>
        <div className="product-carousel__track">
          {[0, 1].map(cycle => (
            <div
              key={`product-cycle-${cycle}`}
              ref={cycle === 0 ? cycleRef : undefined}
              className="product-carousel__cycle"
              aria-hidden={cycle === 1}
            >
              {products.map((product, productIndex) => {
          const imgIdx = currentImageIndex[product.id] || 0
          const imgUrl = product.images[imgIdx]
          const localImages = getLocalProductImages(product)

          return (
            <div
              key={`${cycle}-${product.id}-${productIndex}`}
              className="product-card"
              onMouseEnter={() => setHoveredCardId(product.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div className="product-card__image-wrapper">
                <img
                  src={localImages[imgIdx] ?? (imgUrl ? `https://images.unsplash.com/${imgUrl}?w=300&h=450&fit=crop&auto=format` : undefined)}
                  alt={product.name}
                  className="product-card__image"
                />
                <div className="product-card__badge">Only {REMAINING_STOCK[product.id] ?? 36} left</div>

                <button className="product-card__cta" aria-label={`Add ${product.name} to cart`}>
                  <span>Add to cart</span>
                  <span className="product-card__cta-icon" aria-hidden="true">+</span>
                </button>

                <div className="product-card__nav">
                  <button
                    className="product-card__arrow product-card__arrow--prev"
                    onClick={() => changeImage(product.id, 'prev')}
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    className="product-card__arrow product-card__arrow--next"
                    onClick={() => changeImage(product.id, 'next')}
                    aria-label="Next image"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="product-card__info">
                <div className="product-card__name">{product.name}</div>
                <div className="product-card__price">{product.price} TND</div>
              </div>
            </div>
              )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
