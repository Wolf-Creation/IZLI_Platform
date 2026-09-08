import { useState, useEffect, useRef } from 'react'
import bgImage from '../../../../assets/Website_img/bg_001.png'
import './NewHero.scss'

interface Props {
  scrollY: number
}

const TRANSITION_DISTANCE = 350 // pixels
const TITLE_SIZE_START = 96 // px
const TITLE_SIZE_END = 20 // px
const HEADER_HEIGHT = 80 // px (when not scrolled)

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return {
    r: parseInt(result![1], 16),
    g: parseInt(result![2], 16),
    b: parseInt(result![3], 16),
  }
}

function lerpColor(startHex: string, endHex: string, progress: number): string {
  const startRGB = hexToRgb(startHex)
  const endRGB = hexToRgb(endHex)

  const r = Math.round(lerp(startRGB.r, endRGB.r, progress))
  const g = Math.round(lerp(startRGB.g, endRGB.g, progress))
  const b = Math.round(lerp(startRGB.b, endRGB.b, progress))

  return `rgb(${r}, ${g}, ${b})`
}

const EXTENSIONS = ['Studio', 'Legacy', 'Editions', 'Keeper']

export function NewHero({ scrollY }: Props) {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const [heroHeight, setHeroHeight] = useState(window.innerHeight)
  const [titleInitialY, setTitleInitialY] = useState(0)
  const [currentExtensionIndex, setCurrentExtensionIndex] = useState(0)
  const [displayedChars, setDisplayedChars] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  // Typewriter animation for extensions
  useEffect(() => {
    // Don't animate if scrolling or waiting
    if (scrollY > 50 || isWaiting) return

    const currentExtension = EXTENSIONS[currentExtensionIndex]
    const typingSpeed = isDeleting ? 50 : 80 // Faster typing
    const pauseDuration = 2000 // Increased from 1500

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedChars < currentExtension.length) {
          setDisplayedChars(displayedChars + 1)
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayedChars > 0) {
          setDisplayedChars(displayedChars - 1)
        } else {
          // Wait 1500ms without displaying next extension
          setIsWaiting(true)
          setTimeout(() => {
            setCurrentExtensionIndex((prev) => (prev + 1) % EXTENSIONS.length)
            setIsDeleting(false)
            setIsWaiting(false)
          }, 1500)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayedChars, isDeleting, currentExtensionIndex, scrollY, isWaiting])

  useEffect(() => {
    if (heroRef.current) {
      setHeroHeight(heroRef.current.offsetHeight)
    }
    if (titleRef.current) {
      // Calculate initial position of title (center of hero)
      const rect = titleRef.current.getBoundingClientRect()
      setTitleInitialY(rect.top + window.scrollY + rect.height / 2)
    }
  }, [])

  const effectiveHeroHeight = heroHeight || window.innerHeight

  // Animation progress (0 to 1)
  const progress = Math.min(Math.max(scrollY / TRANSITION_DISTANCE, 0), 1)

  // Smooth easing (ease-out cubic)
  const easeProgress = 1 - Math.pow(1 - progress, 3)

  // Calculate positions
  // Start position: center of hero in viewport (hero takes full height, so center is at window.innerHeight / 2)
  const heroCenterYViewport = window.innerHeight / 2
  // End position: center of header
  const headerCenterYViewport = HEADER_HEIGHT / 2 - 13

  // Interpolate Y position (from hero center to header center) - fixed position
  const titleYFixed = lerp(heroCenterYViewport, headerCenterYViewport, easeProgress)

  // Interpolate size (72px to 16px)
  const titleScale = lerp(1, TITLE_SIZE_END / TITLE_SIZE_START, easeProgress)

  // Interpolate color from white to gold
  const titleColor = lerpColor('#ffffff', '#c9924e', easeProgress)

  // Hide other content when scrolling
  const contentOpacity = Math.max(1 - scrollY / (effectiveHeroHeight * 0.2), 0)

  return (
    <>
      <div
        ref={heroRef}
        className="new-hero"
      >
        <div className="new-hero__background">
          <img
            src={bgImage}
            alt="IZLI"
            className="new-hero__image"
          />
          <div className="new-hero__overlay" />
        </div>

        {/* Single animated title */}
        <div style={{ position: 'fixed', top: `${titleYFixed}px`, left: '50%', transform: `translate(-50%, -50%) scale(${titleScale})`, zIndex: 101, pointerEvents: 'none', display: 'flex', flexDirection: 'row', alignItems: 'end', gap: '12px' }}>
          <h1
            ref={titleRef}
            className="new-hero__title new-hero__title--animated"
            style={{
              color: titleColor,
              opacity: 1,
              margin: 0,
              whiteSpace: 'nowrap',
              position: 'static',
              top: 'auto',
              left: 'auto',
              transform: 'none',
            }}
          >
            IZLI
          </h1>

          {/* Typewriter extension - only show if not scrolling */}
          {scrollY < 50 && (
            <p
              style={{
                fontSize: '36px',
                fontWeight: 300,
                color: '#fff',
                margin: 0,
                minHeight: '24px',
                whiteSpace: 'nowrap',
                marginBottom: '6px',
              }}
            >
              / {EXTENSIONS[currentExtensionIndex].slice(0, displayedChars)}
              {!isDeleting && displayedChars < EXTENSIONS[currentExtensionIndex].length && (
                <span style={{ animation: 'blink 1s infinite' }}>|</span>
              )}
            </p>
          )}
        </div>

        <div
          className="new-hero__content"
          style={{
            opacity: contentOpacity,
          }}
        >
          <p className="new-hero__subtitle">Heritage Reimagined for Today</p>
        </div>

        <div className="new-hero__scroll-indicator" style={{ opacity: contentOpacity }}>
          <span>Scroll to explore</span>
          <div className="new-hero__scroll-arrow">↓</div>
        </div>
      </div>
    </>
  )
}
