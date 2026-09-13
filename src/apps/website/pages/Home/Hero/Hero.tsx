import { useRef, useState } from 'react'
import type { WebPage } from '../../../types'
import HeroBackground from './HeroBackground'
import HeroModel from './HeroModel'
import HeroText from './HeroText'
import ReleaseCard from './ReleaseCard'
import { useHeroParallax } from './HeroParallax'

interface Props {
  onNavigate: (page: WebPage) => void
}

export default function Hero({ onNavigate }: Props) {
  const heroRef = useRef<HTMLElement | null>(null)
  const parallax = useHeroParallax(heroRef)
  const [sceneIndex, setSceneIndex] = useState<0 | 1>(0)
  const [modelSceneIndex, setModelSceneIndex] = useState<0 | 1>(0)

  return (
    <section ref={heroRef} className="hero hero--cinematic">
      <HeroBackground
        sceneIndex={sceneIndex}
        onModelSceneChange={setModelSceneIndex}
        onCycleComplete={setSceneIndex}
        parallax={parallax}
      />

      <div className="hero__layout">
        <div className="hero__content">
          <HeroText onNavigate={onNavigate} parallaxX={parallax.x} parallaxY={parallax.y} activeSceneIndex={sceneIndex} />
        </div>

        <div className="hero__stage">
          <HeroModel sceneIndex={modelSceneIndex} parallax={parallax} />
        </div>

        <div className="hero__release-slot">
          <ReleaseCard parallax={parallax} />
        </div>
      </div>
    </section>
  )
}