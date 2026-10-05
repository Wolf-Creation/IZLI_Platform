import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { WebPage } from '../../../types'
import './HeroSlider.scss'

export interface HeroCarouselProduct {
  id: string
  name: string
  description: string
  universe: string
  price?: number
  currency: string
  image: string
  backImage?: string
}

interface Props {
  products: HeroCarouselProduct[]
  onNavigate: (page: WebPage, productId?: string) => void
  titleOverride?: string
  descriptionOverride?: string
  style?: CSSProperties
}

const AUTOPLAY_INTERVAL = 5000
export const SWEATSHIRT_FRONT_VIEW = 'https://res.cloudinary.com/tajbua8z/image/upload/e_background_removal,c_crop,g_center,w_900,h_1200,f_png/v1791214973/SWEATSHIRT_FRONT_VIEW.png'
export const SWEATSHIRT_BACK_VIEW = 'https://res.cloudinary.com/tajbua8z/image/upload/e_background_removal,c_crop,g_center,w_900,h_1200,f_png/v1791214975/SWEATSHIRT_BACK_VIEW.png'

const FALLBACK_SWEATSHIRT: HeroCarouselProduct = {
  id: '6abcefe9e4b73e0e772ed63c',
  name: 'MODERN NORTH AFRICA SWEATSHIRT',
  description: 'Oversized SweatShirt',
  universe: 'Essentials',
  price: 89,
  currency: 'TND',
  image: SWEATSHIRT_FRONT_VIEW,
  backImage: SWEATSHIRT_BACK_VIEW,
}

export function HeroSlider({ products, onNavigate, titleOverride, descriptionOverride, style }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isCenterSettled, setIsCenterSettled] = useState(true)
  const [shadowGeometry, setShadowGeometry] = useState<{ width: number; height: number; bottom: number } | null>(null)
  const autoplayTimerRef = useRef<number | null>(null)
  const carouselItemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const nextAdvanceAtRef = useRef(0)
  const remainingTimeRef = useRef(AUTOPLAY_INTERVAL)
  const carouselProducts = products.length > 0
    ? products.slice(0, 3)
    : [FALLBACK_SWEATSHIRT, FALLBACK_SWEATSHIRT, FALLBACK_SWEATSHIRT]
  const normalizedActiveIndex = ((activeIndex % carouselProducts.length) + carouselProducts.length) % carouselProducts.length
  const activeProduct = carouselProducts[normalizedActiveIndex]
  const productTitle = titleOverride?.trim() || activeProduct.name
  const productDescription = descriptionOverride?.trim() || activeProduct.description

  useEffect(() => {
    const item = carouselItemRefs.current[normalizedActiveIndex]
    const image = item?.querySelector<HTMLImageElement>('.hero-slider__carousel-image--front, .hero-slider__carousel-image')
    if (!item || !image) {
      setShadowGeometry(null)
      return
    }

    const updateShadowGeometry = () => {
      if (!image.naturalWidth || !image.naturalHeight) return

      const scale = Math.min(item.clientWidth / image.naturalWidth, item.clientHeight / image.naturalHeight)
      const imageWidth = image.naturalWidth * scale
      const imageHeight = image.naturalHeight * scale
      const shadowWidth = imageWidth * 0.78
      const shadowHeight = imageHeight * 0.07
      const imageBottomInset = (item.clientHeight - imageHeight) / 2

      setShadowGeometry({
        width: shadowWidth,
        height: shadowHeight,
        bottom: imageBottomInset + imageHeight * 0.36 - shadowHeight * 0.18,
      })
    }

    setShadowGeometry(null)
    image.addEventListener('load', updateShadowGeometry)
    const resizeObserver = new ResizeObserver(updateShadowGeometry)
    resizeObserver.observe(item)
    updateShadowGeometry()

    return () => {
      image.removeEventListener('load', updateShadowGeometry)
      resizeObserver.disconnect()
    }
  }, [activeProduct.backImage, activeProduct.image, normalizedActiveIndex])

  useEffect(() => {
    if (autoplayTimerRef.current !== null) {
      window.clearTimeout(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }

    if (isPaused) return

    nextAdvanceAtRef.current = Date.now() + remainingTimeRef.current
    autoplayTimerRef.current = window.setTimeout(() => {
      remainingTimeRef.current = AUTOPLAY_INTERVAL
      setIsCenterSettled(false)
      setActiveIndex(index => (index + 1) % carouselProducts.length)
    }, remainingTimeRef.current)

    return () => {
      if (autoplayTimerRef.current !== null) {
        window.clearTimeout(autoplayTimerRef.current)
      }
    }
  }, [activeIndex, isPaused, carouselProducts.length])

  const pauseAutoplay = () => {
    if (autoplayTimerRef.current !== null) {
      window.clearTimeout(autoplayTimerRef.current)
      autoplayTimerRef.current = null
      remainingTimeRef.current = Math.max(0, nextAdvanceAtRef.current - Date.now())
      setIsPaused(true)
    }
  }

  const resumeAutoplay = () => {
    if (isPaused) setIsPaused(false)
  }

  const selectProduct = (index: number) => {
    remainingTimeRef.current = AUTOPLAY_INTERVAL
    if (index !== normalizedActiveIndex) setIsCenterSettled(false)
    setActiveIndex(index)
  }

  return (
    <section className="hero-slider" style={style} aria-label="Featured products">
      <div key={activeProduct.id} className="hero-slider__product-details">
        <span className="hero-slider__product-universe">{activeProduct.universe}</span>
        <h1 className="hero-slider__product-name">{productTitle}</h1>
        <p className="hero-slider__product-description">{productDescription}</p>
        {activeProduct.price !== undefined && (
          <p className="hero-slider__product-price">
            {activeProduct.price} {activeProduct.currency}
          </p>
        )}
        <button
          type="button"
          className="hero-slider__product-link"
          onClick={() => onNavigate('product-detail', activeProduct.id)}
        >
          Discover product <span aria-hidden="true">↗</span>
        </button>
        {carouselProducts.length > 1 && (
          <nav className="hero-slider__pagination" aria-label="Featured products">
            <span className="hero-slider__pagination-count">
              {String(normalizedActiveIndex + 1).padStart(2, '0')}
              <span aria-hidden="true"> / </span>
              {String(carouselProducts.length).padStart(2, '0')}
            </span>
            <div className="hero-slider__pagination-track">
              {carouselProducts.map((product, index) => (
                <button
                  key={`${product.id}-pagination-${index}`}
                  type="button"
                  className={`hero-slider__pagination-step${index === normalizedActiveIndex ? ' is-active' : ''}`}
                  aria-label={`Show product ${index + 1}: ${product.name}`}
                  aria-current={index === normalizedActiveIndex ? 'true' : undefined}
                  onClick={() => selectProduct(index)}
                >
                  <span />
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>

      <div className="hero-slider__product-stage" aria-label="Featured product carousel">
        {carouselProducts.map((product, index) => {
          const position = (index - normalizedActiveIndex + carouselProducts.length) % carouselProducts.length
          const positionClass = position === 0 ? 'is-center' : position === 1 ? 'is-below' : 'is-above'

          return (
            <button
              key={`${product.id}-${index}`}
              ref={element => {
                carouselItemRefs.current[index] = element
              }}
              type="button"
              className={`hero-slider__carousel-item hero-slider__carousel-item--${positionClass}${position === 0 && isCenterSettled ? ' is-settled' : ''}`}
              aria-label={`Show ${product.name}`}
              aria-current={position === 0 ? 'true' : undefined}
              onClick={() => selectProduct(index)}
              onTransitionEnd={event => {
                if (position === 0 && event.propertyName === 'transform') setIsCenterSettled(true)
              }}
              onPointerEnter={pauseAutoplay}
              onPointerLeave={resumeAutoplay}
            >
              {position === 0 && shadowGeometry && (
                <span
                  className="hero-slider__product-shadow"
                  aria-hidden="true"
                  style={{
                    width: shadowGeometry.width,
                    height: shadowGeometry.height,
                    bottom: shadowGeometry.bottom,
                  }}
                />
              )}
              {product.backImage ? (
                <span className="hero-slider__carousel-flip">
                  <img
                    className="hero-slider__carousel-image hero-slider__carousel-image--front"
                    src={product.image || SWEATSHIRT_FRONT_VIEW}
                    alt=""
                    aria-hidden="true"
                    loading={position === 0 ? 'eager' : 'lazy'}
                    fetchPriority={position === 0 ? 'high' : 'auto'}
                  />
                  <img
                    className="hero-slider__carousel-image hero-slider__carousel-image--back"
                    src={product.backImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                </span>
              ) : (
                <img
                  className="hero-slider__carousel-image"
                  src={product.image || SWEATSHIRT_FRONT_VIEW}
                  alt=""
                  aria-hidden="true"
                  loading={position === 0 ? 'eager' : 'lazy'}
                  fetchPriority={position === 0 ? 'high' : 'auto'}
                />
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
