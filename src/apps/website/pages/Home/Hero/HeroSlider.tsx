import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { WebPage } from '../../../types'
import { getHeroOverlayGradient, type HeroOverlayPosition } from '../../../../../shared/services/home'
import { PrimaryButton } from '../../../components/PrimaryButton/PrimaryButton'
import './HeroSlider.scss'

export interface HeroCarouselProduct {
  id: string
  name: string
  universe: string
  image: string
  collectionName?: string
  collectionDescription?: string
  collectionSlug?: string
  hero3dViews?: { view: string; image: string }[]
  rightImage?: string
  backImage?: string
  leftImage?: string
  features?: { title: string; description: string }[]
}

interface HeroCarouselView {
  view: string
  image: string
}

interface HeroProductAlphaMask {
  width: number
  height: number
  alpha: Uint8ClampedArray
}

interface Props {
  products: HeroCarouselProduct[]
  onNavigate: (page: WebPage, productId?: string) => void
  backgroundImage?: string
  overlayPosition?: HeroOverlayPosition
  overlayOpacity?: number
  style?: CSSProperties
}

const AUTOPLAY_INTERVAL = 5000
export const SWEATSHIRT_FRONT_VIEW = 'https://res.cloudinary.com/tajbua8z/image/upload/e_background_removal,c_crop,g_center,w_900,h_1200,f_png/v1791214973/SWEATSHIRT_FRONT_VIEW.png'
export const SWEATSHIRT_BACK_VIEW = 'https://res.cloudinary.com/tajbua8z/image/upload/e_background_removal,c_crop,g_center,w_900,h_1200,f_png/v1791214975/SWEATSHIRT_BACK_VIEW.png'

const FALLBACK_SWEATSHIRT: HeroCarouselProduct = {
  id: '6abcefe9e4b73e0e772ed63c',
  name: 'Modern North Africa Sweatshirt',
  universe: 'Essentials',
  image: SWEATSHIRT_FRONT_VIEW,
  hero3dViews: [
    { view: 'front', image: SWEATSHIRT_FRONT_VIEW },
    { view: 'back', image: SWEATSHIRT_BACK_VIEW },
  ],
}

function getHeroViews(product: HeroCarouselProduct): HeroCarouselView[] {
  return product.hero3dViews ?? [
    { view: 'front', image: product.image },
    ...(product.rightImage ? [{ view: 'right', image: product.rightImage }] : []),
    ...(product.backImage ? [{ view: 'back', image: product.backImage }] : []),
    ...(product.leftImage ? [{ view: 'left', image: product.leftImage }] : []),
  ]
}

function isPointerOnProduct(
  image: HTMLImageElement | null,
  mask: HeroProductAlphaMask | null,
  clientX: number,
  clientY: number,
): boolean {
  if (!image || !mask || !image.naturalWidth || !image.naturalHeight) return false

  const bounds = image.parentElement?.getBoundingClientRect()
  if (!bounds) return false
  const scale = Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
  const renderedWidth = image.naturalWidth * scale
  const renderedHeight = image.naturalHeight * scale
  const offsetX = (bounds.width - renderedWidth) / 2
  const offsetY = (bounds.height - renderedHeight) / 2
  const sourceX = Math.floor(((clientX - bounds.left - offsetX) / renderedWidth) * mask.width)
  const sourceY = Math.floor(((clientY - bounds.top - offsetY) / renderedHeight) * mask.height)

  if (sourceX < 0 || sourceY < 0 || sourceX >= mask.width || sourceY >= mask.height) return false

  for (let y = Math.max(0, sourceY - 1); y <= Math.min(mask.height - 1, sourceY + 1); y += 1) {
    for (let x = Math.max(0, sourceX - 1); x <= Math.min(mask.width - 1, sourceX + 1); x += 1) {
      if (mask.alpha[y * mask.width + x] > 32) return true
    }
  }

  return false
}

export function HeroSlider({
  products,
  onNavigate,
  backgroundImage,
  overlayPosition = 'left',
  overlayOpacity = 50,
  style,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeViewIndex, setActiveViewIndex] = useState(0)
  const [productViewTransition, setProductViewTransition] = useState<'hover' | 'reset' | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isCenterSettled, setIsCenterSettled] = useState(true)
  const [shadowGeometry, setShadowGeometry] = useState<{ width: number; height: number } | null>(null)
  const autoplayTimerRef = useRef<number | null>(null)
  const carouselItemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeProductImageRef = useRef<HTMLImageElement | null>(null)
  const activeProductAlphaMaskRef = useRef<HeroProductAlphaMask | null>(null)
  const isPointerOverProductRef = useRef(false)
  const nextAdvanceAtRef = useRef(0)
  const remainingTimeRef = useRef(AUTOPLAY_INTERVAL)
  const carouselProducts = products.length > 0
    ? products.slice(0, 3)
    : [FALLBACK_SWEATSHIRT, FALLBACK_SWEATSHIRT, FALLBACK_SWEATSHIRT]
  const normalizedActiveIndex = ((activeIndex % carouselProducts.length) + carouselProducts.length) % carouselProducts.length
  const activeProduct = carouselProducts[normalizedActiveIndex]
  const activeProductViews = getHeroViews(activeProduct)
  const productFeatures = activeProduct.features ?? [
    { title: 'Premium fabric', description: 'Heavyweight cotton for lasting comfort.' },
    { title: 'Modern silhouette', description: 'An oversized fit with considered details.' },
    { title: 'Timeless design', description: 'Rooted in heritage, made for today.' },
  ]

  useEffect(() => {
    setActiveViewIndex(0)
    setProductViewTransition(null)
    isPointerOverProductRef.current = false
  }, [activeProduct.id])

  useEffect(() => {
    const image = activeProductImageRef.current
    activeProductAlphaMaskRef.current = null
    if (!image) return

    const buildAlphaMask = () => {
      if (!image.naturalWidth || !image.naturalHeight) return

      const canvas = document.createElement('canvas')
      const maskScale = 256 / Math.max(image.naturalWidth, image.naturalHeight)
      canvas.width = Math.max(1, Math.round(image.naturalWidth * maskScale))
      canvas.height = Math.max(1, Math.round(image.naturalHeight * maskScale))
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) {
        console.error('Unable to create a canvas context for the hero product hover target.')
        return
      }

      try {
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height)
        const alpha = new Uint8ClampedArray(canvas.width * canvas.height)

        for (let pixel = 0; pixel < alpha.length; pixel += 1) {
          alpha[pixel] = pixels.data[pixel * 4 + 3]
        }

        activeProductAlphaMaskRef.current = {
          width: canvas.width,
          height: canvas.height,
          alpha,
        }
      } catch (error) {
        console.error('Unable to read transparency from the hero product image.', error)
      }
    }

    if (image.complete) {
      buildAlphaMask()
      return
    }

    image.addEventListener('load', buildAlphaMask)
    return () => image.removeEventListener('load', buildAlphaMask)
  }, [activeViewIndex, normalizedActiveIndex])

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

      setShadowGeometry({
        width: shadowWidth,
        height: shadowHeight,
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
      {backgroundImage && <img className="hero-slider__background-image" src={backgroundImage} alt="" aria-hidden="true" />}
      {backgroundImage && <span
        className="hero-slider__background-overlay"
        aria-hidden="true"
        style={{ background: getHeroOverlayGradient(overlayPosition, overlayOpacity) }}
      />}
      <div className="hero-slider__content">
      <div key={activeProduct.id} className="hero-slider__product-details">
        <span className="hero-slider__product-universe">{activeProduct.collectionName || activeProduct.universe}</span>
        {activeProduct.collectionDescription && (
          <h1 className="hero-slider__collection-description">{activeProduct.collectionDescription}</h1>
        )}
        <PrimaryButton
          className="hero-slider__product-link"
          onClick={() => activeProduct.collectionSlug
            ? onNavigate('collection-detail', activeProduct.collectionSlug)
            : onNavigate('collections')}
        >
          Browse collection
        </PrimaryButton>
      </div>

      <aside className="hero-slider__features" aria-label={`${activeProduct.name} features`}>
        {productFeatures.map((feature, index) => (
          <div className="hero-slider__feature" key={`${activeProduct.id}-feature-${index}`}>
            <span className="hero-slider__feature-icon" aria-hidden="true">
              {index === 0 ? (
                <svg viewBox="0 0 40 40" fill="none"><path d="M27.5 8.5c-10 1-16 7-16 15.5 0 4 2.5 7 6 7 8.5 0 14.5-9 14-22-1.5 3.5-5.5 6.5-11.5 9" /><path d="M13 30c3-5 6-8 11-11" /></svg>
              ) : index === 1 ? (
                <svg viewBox="0 0 40 40" fill="none"><path d="m20 7 13 7-13 7-13-7 13-7Z" /><path d="m7 20 13 7 13-7M7 26l13 7 13-7" /></svg>
              ) : (
                <svg viewBox="0 0 40 40" fill="none"><path d="m5 30 10-13 6 7 6-11 9 17H5Z" /><path d="M10 30h25" /></svg>
              )}
            </span>
            <span className="hero-slider__feature-copy">
              <strong>{feature.title}</strong>
              <span>{feature.description}</span>
            </span>
          </div>
        ))}
      </aside>

      <div className="hero-slider__product-stage" aria-label="Featured product carousel">
        {carouselProducts.map((product, index) => {
          const position = (index - normalizedActiveIndex + carouselProducts.length) % carouselProducts.length
          const positionClass = position === 0 ? 'is-center' : position === 1 ? 'is-below' : 'is-above'
          const orderedViews = getHeroViews(product)
          const viewIndex = position === 0 ? activeViewIndex % orderedViews.length : 0
          const visibleView = orderedViews[viewIndex]
          const visibleImage = visibleView?.image || product.image || SWEATSHIRT_FRONT_VIEW
          const productMaskStyle = {
            '--hero-product-mask': `url(${JSON.stringify(visibleImage)})`,
          } as CSSProperties

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
              onPointerEnter={() => {
                if (position !== 0) pauseAutoplay()
              }}
              onPointerMove={event => {
                if (position !== 0 || orderedViews.length < 2 || event.pointerType === 'touch') return

                const pointerIsOnProduct = isPointerOnProduct(
                  activeProductImageRef.current,
                  activeProductAlphaMaskRef.current,
                  event.clientX,
                  event.clientY,
                )
                if (pointerIsOnProduct === isPointerOverProductRef.current) return

                isPointerOverProductRef.current = pointerIsOnProduct
                if (pointerIsOnProduct) {
                  pauseAutoplay()
                  setProductViewTransition('hover')
                  setActiveViewIndex(1)
                } else {
                  resumeAutoplay()
                  setProductViewTransition('reset')
                  setActiveViewIndex(0)
                }
              }}
              onPointerLeave={() => {
                if (position !== 0) {
                  resumeAutoplay()
                } else if (isPointerOverProductRef.current) {
                  isPointerOverProductRef.current = false
                  resumeAutoplay()
                  setProductViewTransition('reset')
                  setActiveViewIndex(0)
                }
              }}
              onFocus={() => {
                if (position === 0 && orderedViews.length > 1) {
                  isPointerOverProductRef.current = true
                  pauseAutoplay()
                  setProductViewTransition('hover')
                  setActiveViewIndex(1)
                }
              }}
              onBlur={() => {
                if (position === 0 && orderedViews.length > 1) {
                  isPointerOverProductRef.current = false
                  resumeAutoplay()
                  setProductViewTransition('reset')
                  setActiveViewIndex(0)
                }
              }}
            >
              {position === 0 && shadowGeometry && (
                <span
                  key={`${product.id}-${visibleView.view}-${viewIndex}`}
                  className="hero-slider__product-shadow"
                  aria-hidden="true"
                  style={{
                    width: shadowGeometry.width,
                    height: shadowGeometry.height,
                  }}
                />
              )}
              {orderedViews.length > 1 ? (
                <span
                  className={`hero-slider__carousel-flip hero-slider__carousel-flip--ordered-views${position === 0 && productViewTransition ? ` hero-slider__carousel-flip--${productViewTransition}` : ''}`}
                  style={productMaskStyle}
                >
                  <img
                    key={`${product.id}-${visibleView.view}-${viewIndex}`}
                    ref={image => {
                      if (position === 0) activeProductImageRef.current = image
                    }}
                    className="hero-slider__carousel-image hero-slider__carousel-image--ordered"
                    src={visibleView.image}
                    alt=""
                    aria-hidden="true"
                    crossOrigin="anonymous"
                    loading={position === 0 ? 'eager' : 'lazy'}
                    fetchPriority={position === 0 ? 'high' : 'auto'}
                  />
                </span>
              ) : (
                <span
                  className="hero-slider__carousel-flip hero-slider__carousel-flip--single-view"
                  style={productMaskStyle}
                >
                  <img
                    className="hero-slider__carousel-image"
                    src={visibleImage}
                    alt=""
                    aria-hidden="true"
                    loading={position === 0 ? 'eager' : 'lazy'}
                    fetchPriority={position === 0 ? 'high' : 'auto'}
                  />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <nav className="hero-slider__controls" aria-label="Featured products">
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
        <button
          type="button"
          className="hero-slider__arrow"
          aria-label="Previous featured product"
          disabled={carouselProducts.length < 2}
          onClick={() => selectProduct((normalizedActiveIndex - 1 + carouselProducts.length) % carouselProducts.length)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="hero-slider__arrow hero-slider__arrow--next"
          aria-label="Next featured product"
          disabled={carouselProducts.length < 2}
          onClick={() => selectProduct((normalizedActiveIndex + 1) % carouselProducts.length)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </nav>
      </div>
    </section>
  )
}
