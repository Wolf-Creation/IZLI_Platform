import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { HERO_SCENES, HERO_TIMINGS } from './HeroContent'
import type { ParallaxPoint } from './HeroParallax'

interface Props {
  sceneIndex: number
  onModelSceneChange: (sceneIndex: number) => void
  onCycleComplete: (sceneIndex: number) => void
  parallax: ParallaxPoint
}

function preloadSceneImages() {
  return Promise.all(
    HERO_SCENES.map(scene => new Promise<void>(resolve => {
      const image = new Image()
      image.src = scene.image
      image.onload = () => resolve()
      image.onerror = () => resolve()
    })),
  )
}

export default function HeroBackground({ sceneIndex, onModelSceneChange, onCycleComplete, parallax }: Props) {
  const sceneZeroRef = useRef<HTMLImageElement | null>(null)
  const sceneOneRef = useRef<HTMLImageElement | null>(null)
  const [ready, setReady] = useState(false)
  const activeIndexRef = useRef(sceneIndex)
  const hasInitializedRef = useRef(false)

  useEffect(() => {
    let alive = true

    preloadSceneImages().then(() => {
      if (alive) setReady(true)
    })

    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!ready) return undefined

    const getLayer = (index: 0 | 1) => (index === 0 ? sceneZeroRef.current : sceneOneRef.current)

    let timeline: gsap.core.Timeline | null = null
    let cancelled = false

    const runCycle = (currentSceneIndex: 0 | 1) => {
      if (cancelled) return

      const nextSceneIndex: 0 | 1 = currentSceneIndex === 0 ? 1 : 0
      const currentLayer = getLayer(currentSceneIndex)
      const nextLayer = getLayer(nextSceneIndex)
      if (!currentLayer || !nextLayer) return
      const direction = currentSceneIndex === 0 ? -1 : 1

      gsap.killTweensOf([currentLayer, nextLayer])

      if (!hasInitializedRef.current) {
        gsap.set(currentLayer, {
          opacity: 1,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          filter: 'blur(0px) saturate(1.04)',
          zIndex: 2,
        })
        hasInitializedRef.current = true
      } else {
        gsap.set(currentLayer, {
          opacity: 1,
          zIndex: 2,
        })
      }

      gsap.set(nextLayer, {
        opacity: 0,
        scale: 1.03,
        xPercent: direction * 8,
        yPercent: 0,
        filter: 'blur(14px) saturate(1.04)',
        zIndex: 1,
      })

      timeline = gsap.timeline({ defaults: { ease: 'none' } })

      timeline.to(currentLayer, {
        scale: 1.15,
        xPercent: direction * -2.4,
        yPercent: direction * 0.9,
        duration: HERO_TIMINGS.sceneDuration / 1000,
      }, 0)

      timeline.to(currentLayer, {
        opacity: 0,
        filter: 'blur(12px) saturate(1.05)',
        duration: HERO_TIMINGS.transitionDuration / 1000,
        ease: 'power3.inOut',
      }, HERO_TIMINGS.sceneDuration / 1000)

      timeline.to(nextLayer, {
        opacity: 1,
        scale: 1.15,
        xPercent: 0,
        yPercent: 0,
        filter: 'blur(0px) saturate(1.05)',
        duration: HERO_TIMINGS.transitionDuration / 1000,
        ease: 'power3.inOut',
      }, HERO_TIMINGS.sceneDuration / 1000)

      timeline.add(() => {
        if (!cancelled) {
          onModelSceneChange(nextSceneIndex)
        }
      }, HERO_TIMINGS.sceneDuration / 1000)

      timeline.add(() => {
        if (!cancelled) {
          onCycleComplete(nextSceneIndex)
          runCycle(nextSceneIndex)
        }
      }, (HERO_TIMINGS.sceneDuration + HERO_TIMINGS.transitionDuration + 0.05) / 1000)
    }

    runCycle(activeIndexRef.current)

    return () => {
      cancelled = true
      timeline?.kill()
    }
  }, [onCycleComplete, onModelSceneChange, ready])

  return (
    <div className="hero-background" aria-hidden="true">
      <div className="hero-background__layer hero-background__layer--sky" style={{ transform: `translate3d(${parallax.x * 0.08}px, ${parallax.y * 0.06}px, 0)` }} />

      <div className="hero-background__layer hero-background__layer--mountains" style={{ transform: `translate3d(${parallax.x * 0.28}px, ${parallax.y * 0.24}px, 0)` }}>
        <img ref={sceneZeroRef} src={HERO_SCENES[0].image} alt={HERO_SCENES[0].tag} className="hero-background__image" style={{ objectPosition: HERO_SCENES[0].focus }} />
        <img ref={sceneOneRef} src={HERO_SCENES[1].image} alt={HERO_SCENES[1].tag} className="hero-background__image" style={{ objectPosition: HERO_SCENES[1].focus }} />
      </div>

      <div className="hero-background__layer hero-background__layer--fog" style={{ transform: `translate3d(${parallax.x * -0.04}px, ${parallax.y * -0.03}px, 0)` }} />
      <div className="hero-background__layer hero-background__layer--rays" style={{ transform: `translate3d(${parallax.x * 0.12}px, ${parallax.y * 0.1}px, 0)` }} />
      <div className="hero-background__layer hero-background__layer--dust" style={{ transform: `translate3d(${parallax.x * 0.18}px, ${parallax.y * 0.14}px, 0)` }} />
      <div className="hero-background__layer hero-background__layer--volumetric" style={{ transform: `translate3d(${parallax.x * 0.06}px, ${parallax.y * 0.04}px, 0)` }} />
    </div>
  )
}