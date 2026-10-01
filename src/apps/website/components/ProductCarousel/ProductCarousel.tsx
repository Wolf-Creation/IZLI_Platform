import { useState, useRef, useEffect } from 'react'
import { OptimizedImage } from '../OptimizedImage/OptimizedImage'
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
  '../../../../assets/Website_img/Shop/new releases/**/*.{png,jpg,jpeg,webp}',
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

function resolveProductImage(image?: string) {
  if (!image) return undefined
  if (/^https?:\/\//i.test(image) || image.startsWith('/')) return image
  return `https://images.unsplash.com/${image}?w=600&h=900&fit=crop&auto=format`
}

export function ProductCarousel({ products, autoScrollSpeed = DEFAULT_AUTO_SCROLL_SPEED }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [isManuallyScrolling, setIsManuallyScrolling] = useState(false)
  const [cycleCount, setCycleCount] = useState(2)
  const containerRef = useRef<HTMLDivElement>(null)
  const cycleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollFrameRef = useRef<number | null>(null)
  const scrollPositionRef = useRef(0)
  const manualScrollTimeoutRef = useRef<number | null>(null)

  const pauseAutoScroll = () => {
    if (manualScrollTimeoutRef.current !== null) window.clearTimeout(manualScrollTimeoutRef.current)
    setIsManuallyScrolling(true)
  }

  const resumeAutoScroll = () => {
    if (manualScrollTimeoutRef.current !== null) window.clearTimeout(manualScrollTimeoutRef.current)
    manualScrollTimeoutRef.current = window.setTimeout(() => {
      manualScrollTimeoutRef.current = null
      setIsManuallyScrolling(false)
    }, 1000)
  }

  useEffect(() => () => {
    if (manualScrollTimeoutRef.current !== null) window.clearTimeout(manualScrollTimeoutRef.current)
  }, [])

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
    const container = containerRef.current
    const cycle = cycleRef.current
    if (!container || !cycle) return

    const updateCycleCount = () => {
      const cycleWidth = cycle.getBoundingClientRect().width
      if (cycleWidth <= 0) return
      const cycleGap = Number.parseFloat(getComputedStyle(cycle.parentElement!).columnGap) || 0
      const cycleDistance = cycleWidth + cycleGap
      setCycleCount(Math.max(2, Math.ceil(container.clientWidth / cycleDistance) + 2))
    }

    updateCycleCount()
    const observer = new ResizeObserver(updateCycleCount)
    observer.observe(container)
    observer.observe(cycle)
    return () => observer.disconnect()
  }, [products.length])

  useEffect(() => {
    const stopAutoScroll = () => {
      if (autoScrollFrameRef.current !== null) {
        cancelAnimationFrame(autoScrollFrameRef.current)
        autoScrollFrameRef.current = null
      }
    }

    if (isVisible) {
      const animate = () => {
        const container = containerRef.current
        if (!container) {
          autoScrollFrameRef.current = requestAnimationFrame(animate)
          return
        }

        const cycle = cycleRef.current
        const cycleWidth = cycle?.offsetWidth ?? 0
        const cycleGap = cycle ? Number.parseFloat(getComputedStyle(cycle.parentElement!).columnGap) || 0 : 0
        const cycleDistance = cycleWidth + cycleGap
        if (cycleDistance <= 0) {
          autoScrollFrameRef.current = requestAnimationFrame(animate)
          return
        }

        const nextPosition = scrollPositionRef.current + autoScrollSpeed
        scrollPositionRef.current = nextPosition >= cycleDistance ? nextPosition % cycleDistance : nextPosition
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
  }, [autoScrollSpeed, isManuallyScrolling, isVisible])

  return (
    <div
      className="product-carousel"
      ref={carouselRef}
    >
      <div
        className="product-carousel__container"
        ref={containerRef}
        onPointerDown={pauseAutoScroll}
        onPointerUp={resumeAutoScroll}
        onPointerCancel={resumeAutoScroll}
        onTouchStart={pauseAutoScroll}
        onTouchEnd={resumeAutoScroll}
        onTouchCancel={resumeAutoScroll}
        onWheel={() => {
          pauseAutoScroll()
          resumeAutoScroll()
        }}
      >
        <div className="product-carousel__track">
          {Array.from({ length: cycleCount }, (_, cycle) => (
            <div
              key={`product-cycle-${cycle}`}
              ref={cycle === 0 ? cycleRef : undefined}
              className="product-carousel__cycle"
              aria-hidden={cycle > 0}
            >
              {products.map((product, productIndex) => {
          const localImages = getLocalProductImages(product)
          const image = localImages[0] ?? resolveProductImage(product.images[0])
          const hoverImage = localImages[1] ?? resolveProductImage(product.images[1])

          return (
            <div
              key={`${cycle}-${product.id}-${productIndex}`}
              className="product-card"
            >
              <div className="product-card__image-wrapper">
                <OptimizedImage
                  src={image ?? ''}
                  preset="productCarousel"
                  alt={product.name}
                  className="product-card__image"
                />
                {hoverImage && <OptimizedImage src={hoverImage} preset="productCarousel" alt="" aria-hidden="true" loading="lazy" className="product-card__image product-card__image--hover" />}
                <div className="product-card__badge">Only {REMAINING_STOCK[product.id] ?? 36} left</div>

                <button className="product-card__cta" tabIndex={cycle > 0 ? -1 : undefined} aria-label={`Add ${product.name} to cart`}>
                  <span>Add to cart</span>
                  <span className="product-card__cta-icon" aria-hidden="true">+</span>
                </button>

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
