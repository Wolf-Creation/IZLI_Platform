import { AnimatePresence, motion } from 'framer-motion'
import { HERO_SCENES, HERO_TIMINGS } from './HeroContent'
import type { ParallaxPoint } from './HeroParallax'

interface Props {
  sceneIndex: number
  parallax: ParallaxPoint
}

export default function HeroModel({ sceneIndex, parallax }: Props) {
  const currentScene = HERO_SCENES[sceneIndex]

  return (
    <div className="hero-model-shell">
      <div className="hero-model-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={sceneIndex}
            src={currentScene.modelImage}
            alt={currentScene.modelAlt}
            className="hero-model-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: HERO_TIMINGS.modelFadeDuration / 1000, ease: 'easeInOut' }}
            style={{ pointerEvents: 'none' }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}