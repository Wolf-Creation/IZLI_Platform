import { AnimatePresence, motion } from 'framer-motion'
import { CREAM, FONT_SERIF } from '../../../../tokens'
import HeroButtons from './HeroButtons'
import { HERO_SCENES } from './HeroContent'
import { revealVariant } from './HeroAnimations'
import HeroIndex from './HeroIndex'
import type { WebPage } from '../../../types'

interface Props {
  onNavigate: (page: WebPage) => void
  parallaxX: number
  parallaxY: number
  activeSceneIndex: 0 | 1
}

export default function HeroText({ onNavigate, parallaxX, parallaxY, activeSceneIndex }: Props) {
  const currentScene = HERO_SCENES[activeSceneIndex]
  const titleParts = currentScene.title.split(' / ')

  return (
    <div className="hero-copy-shell" style={{ transform: `translate3d(${parallaxX * 0.18}px, ${parallaxY * 0.18}px, 0)` }}>
      <HeroIndex activeSceneIndex={activeSceneIndex} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSceneIndex}
          className="hero-copy"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                when: 'beforeChildren',
                staggerChildren: 0.08,
              },
            },
          }}
        >
          <motion.div className="hero-kicker" variants={revealVariant} custom={0}>
            {currentScene.tag.toUpperCase()}
          </motion.div>
          <motion.h1 className="hero-title" style={{ fontFamily: FONT_SERIF, color: CREAM }} variants={revealVariant} custom={0.12}>
            {titleParts.length > 1 ? (
              <>
                {titleParts.map((part, index) => (
                  <span key={part}>
                    {part}
                    {index < titleParts.length - 1 ? <br /> : null}
                  </span>
                ))}
              </>
            ) : (
              currentScene.title
            )}
          </motion.h1>
          <motion.p className="hero-description" variants={revealVariant} custom={0.24}>
            {currentScene.description}
          </motion.p>
          <motion.div variants={revealVariant} custom={0.36}>
            <HeroButtons onNavigate={onNavigate} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}