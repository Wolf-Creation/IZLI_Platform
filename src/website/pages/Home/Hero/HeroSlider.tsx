import { useState, useEffect, useRef, useCallback } from 'react'
import legacy from '../../../../assets/Website_img/Legacy/legacy.png'
import studio from '../../../../assets/Website_img/Studio/studio.png'
import essentials from '../../../../assets/Website_img/Essantials/essantials.png'
import communityLab from '../../../../assets/Website_img/CommunityLab/communitylab.png'
import product1 from '../../../../assets/Website_img/model_front_view_final3.png'
import product2 from '../../../../assets/Website_img/model_front_view_final4.png'
import product3 from '../../../../assets/Website_img/model_front_view_final5.png'
import type { WebPage } from '../../../types'
import { KeeperCircleCta } from '../../../components/KeeperCircleCta/KeeperCircleCta'
import './HeroSlider.scss'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📝 MODIFIER LE CONTENU DE CHAQUE SLIDE ICI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Pour chaque univers, vous pouvez modifier:
// - label: Petit titre en haut (ex: "STUDIO")
// - title: Grand titre principal (ex: "IZLI — Studio")
// - miniDescription: Sous-titre court (ex: "Where ideas take form.")
// - description: Description complète
// - cta: Texte du bouton (ex: "SHOP NOW")
// - image: Image de background
//
export interface SlideData {
  id: string
  label: string
  extension: string
  title: string
  miniDescription: string
  description: string
  cta: string
  image: string
}

interface Props {
  scrollY: number
  onNavigate: (page: WebPage) => void
}

const SLIDES: SlideData[] = [
  {
    id: 'studio',
    label: 'STUDIO',
    extension: 'Studio',
    title: 'Studio',
    miniDescription: 'Where ideas take form.',
    description: 'Experimental pieces shaped by contemporary design, materials and new perspectives.',
    cta: 'SHOP NOW',
    image: studio,
  },
  {
    id: 'legacy',
    label: 'LEGACY',
    extension: 'Legacy',
    title: 'Legacy',
    miniDescription: 'What we inherit, we reinterpret.',
    description: 'Stories, symbols and traditions carried forward through contemporary design.',
    cta: 'SHOP NOW',
    image: legacy,
  },
  {
    id: 'essentials',
    label: 'ESSENTIALS',
    extension: 'Essantials',
    title: 'Essentials',
    miniDescription: 'The foundation of IZLI.',
    description: 'Essential pieces defined by simplicity, quality and a lasting identity.',
    cta: 'SHOP NOW',
    image: essentials,
  },
  {
    id: 'community-lab',
    label: 'COMMUNITY LAB',
    extension: 'Comunity lab',
    title: 'Community Lab',
    miniDescription: 'Ideas made together.',
    description: 'A space where the IZLI community experiments, creates and shapes what comes next.',
    cta: 'SHOP NOW',
    image: communityLab,
  },
]
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const AUTOPLAY_DURATION = 5500
const TRANSITION_DURATION = 900

export function HeroSlider({ scrollY, onNavigate }: Props) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isHoveredOnProducts, setIsHoveredOnProducts] = useState(false)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const slideStartTimeRef = useRef<number>(Date.now())
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const elapsedTimeOnPauseRef = useRef<number>(0)

  // Hide extensions when scrolling
  const shouldShowExtensions = scrollY < 50

  const isTransitioningRef = useRef(false)

  const handleNextSlide = useCallback(() => {
    // Guard: prevent multiple simultaneous transitions
    if (isTransitioningRef.current) {
      console.warn(`⚠️  Blocked duplicate handleNextSlide call - transition already in progress`)
      return
    }

    isTransitioningRef.current = true

    setIsTransitioning(true)
    setProgress(0)
    setActiveSlide((prev) => {
      const next = (prev + 1) % SLIDES.length
      console.log(`🔄 Slide transition: ${SLIDES[prev].extension} (${prev}) → ${SLIDES[next].extension} (${next}) at ${new Date().toLocaleTimeString()}`)
      return next
    })

    setTimeout(() => {
      console.log(`✅ Transition animation complete (${TRANSITION_DURATION}ms)`)
      setIsTransitioning(false)
      isTransitioningRef.current = false
    }, TRANSITION_DURATION)
  }, [])

  const handleExtensionClick = useCallback((index: number) => {
    setIsTransitioning((isTransiting) => {
      if (isTransiting || index === activeSlide) return isTransiting
      setProgress(0)
      setActiveSlide(index)
      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION)
      return true
    })
  }, [activeSlide])

  // Reset timer when slide changes (via click or autoplay)
  useEffect(() => {
    const slideStartTime = Date.now()
    slideStartTimeRef.current = slideStartTime
    setProgress(0)

    console.log(`📺 Slide ${activeSlide} (${SLIDES[activeSlide].extension}) started at ${new Date(slideStartTime).toLocaleTimeString()}`)

    return () => {
      const slideDuration = Date.now() - slideStartTime
      console.log(`⏱️  Slide ${activeSlide} (${SLIDES[activeSlide].extension}) lasted ${slideDuration}ms (expected 5500ms)`)
    }
  }, [activeSlide])

  // Handle pause/resume of autoplay on products hover
  useEffect(() => {
    if (isHoveredOnProducts) {
      elapsedTimeOnPauseRef.current = Date.now() - slideStartTimeRef.current
    } else {
      slideStartTimeRef.current = Date.now() - elapsedTimeOnPauseRef.current
    }
  }, [isHoveredOnProducts])

  // Auto-play timer with timestamp-based progress
  useEffect(() => {
    // Clear any existing timers
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    if (!shouldShowExtensions || isHoveredOnProducts) return

    console.log(`⏰ Starting autoplay for slide ${activeSlide} (${SLIDES[activeSlide].extension})`)

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - slideStartTimeRef.current
      const progressPercent = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100)
      setProgress(progressPercent)
    }, 16) // ~60fps

    autoplayTimerRef.current = setTimeout(() => {
      console.log(`⏰ Autoplay timer triggered after ${AUTOPLAY_DURATION}ms for slide ${activeSlide}`)
      handleNextSlide()
    }, AUTOPLAY_DURATION)

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }
  }, [activeSlide, shouldShowExtensions, handleNextSlide, isHoveredOnProducts])


  const currentSlide = SLIDES[activeSlide]
  const previousSlide = SLIDES[(activeSlide - 1 + SLIDES.length) % SLIDES.length]

  return (
    <div
      ref={sliderRef}
      className="hero-slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chromatic Aberration SVG Filter */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="chromatic-exit">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" seed={activeSlide} />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Background Images */}
      <div className="hero-slider__background">
        {/* Previous slide exits */}
        {isTransitioning && (
          <div
            className="hero-slider__slide hero-slider__slide--exit"
            style={{
              backgroundImage: `url(${previousSlide.image})`,
            }}
          />
        )}

        {/* Current slide enters or stays active */}
        <div
          className={`hero-slider__slide ${isTransitioning ? 'hero-slider__slide--enter' : 'hero-slider__slide--active'}`}
          style={{
            backgroundImage: `url(${currentSlide.image})`,
          }}
        />

        <div className="hero-slider__overlay" />
      </div>

      {/* LEFT SIDE - CONTENT */}
      <div className={`hero-slider__content ${isTransitioning ? 'hero-slider__content--exit' : 'hero-slider__content--enter'}`}>
        {/* <div className="hero-slider__label">{currentSlide.label}</div> */}
        <h1 className="hero-slider__title-text hero-slider__content-item--0">{currentSlide.title}</h1>
        <p className="hero-slider__mini-description hero-slider__content-item--1">{currentSlide.miniDescription}</p>
        <div className="hero-slider__divider hero-slider__content-item--2" />
        <p className="hero-slider__description-text hero-slider__content-item--3">{currentSlide.description}</p>
        <KeeperCircleCta className="hero-slider__cta hero-slider__content-item--4" onClick={() => onNavigate('shop')}>
          {currentSlide.cta}
        </KeeperCircleCta>
      </div>

      {/* RIGHT SIDE - PRODUCT TILES */}
      <div
        className={`hero-slider__products ${isTransitioning ? 'hero-slider__products--exit' : 'hero-slider__products--enter'}`}
        onMouseEnter={() => setIsHoveredOnProducts(true)}
        onMouseLeave={() => setIsHoveredOnProducts(false)}
      >
        <div className="hero-slider__product-tile">
          <img src={product1} alt="Product 1" />
          <button className="hero-slider__product-cta">View</button>
        </div>
        <div className="hero-slider__product-tile">
          <img src={product2} alt="Product 2" />
          <button className="hero-slider__product-cta">View</button>
        </div>
        <div className="hero-slider__product-tile">
          <img src={product3} alt="Product 3" />
          <button className="hero-slider__product-cta">View</button>
        </div>
      </div>



      {/* Horizontal Navigation at Bottom */}
      {shouldShowExtensions && (
        <nav className="hero-slider__navigation">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-slider__nav-button ${index === activeSlide ? 'hero-slider__nav-button--active' : ''}`}
              onClick={() => handleExtensionClick(index)}
              title={slide.extension}
            >
              <span className="hero-slider__nav-label">{slide.extension}</span>
              {index === activeSlide && (
                <div
                  className="hero-slider__progress-bar"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              )}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
