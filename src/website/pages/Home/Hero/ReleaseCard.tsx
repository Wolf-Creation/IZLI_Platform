import { useMotionValue, useSpring } from 'framer-motion'
import { motion } from 'framer-motion'
import { CREAM, FONT_SERIF } from '../../../../tokens'
import { releaseCardVariant } from './HeroAnimations'
import type { ParallaxPoint } from './HeroParallax'

interface Props {
  parallax: ParallaxPoint
}

export default function ReleaseCard({ parallax }: Props) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 22 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 22 })

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const boundedX = Math.min(100, Math.max(0, x))
    const boundedY = Math.min(100, Math.max(0, y))

    rotateX.set(-((boundedY - 50) / 50) * 10)
    rotateY.set(((boundedX - 50) / 50) * 12)
  }

  const handlePointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setPointer({ x: 50, y: 50 })
  }

  return (
    <motion.aside
      className="hero-release-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={releaseCardVariant}
    >
      <div className="hero-release-card__parallax" style={{ transform: `translate3d(${parallax.x * 0.35}px, ${parallax.y * 0.35}px, 0)` }}>
        <motion.div
          className="hero-release-card__shell"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          whileHover={{ scale: 1.02, boxShadow: '0 42px 130px rgba(0, 0, 0, 0.40), 0 20px 40px rgba(0, 0, 0, 0.24)' }}
          transition={{ type: 'spring', stiffness: 170, damping: 18 }}
          style={{
            transformStyle: 'preserve-3d',
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
          } as React.CSSProperties}
        >
          <div className="hero-release-card__float release-card-float">
            <div className="hero-release-card__glass" aria-hidden="true" />

            <div className="hero-release-card__label">Current Release</div>
            <div className="hero-release-card__title" style={{ fontFamily: FONT_SERIF }}>Release 001</div>
            <div className="hero-release-card__subtitle">Rbor Heavy Tee<br />Sand Beige</div>
            <div className="hero-release-card__price">79 TND</div>
            <div className="hero-release-card__rule" />
            <div className="hero-release-card__list">
              {['100 Points', 'Release 001 Badge', 'Keeper Circle Event #1'].map(item => (
                <div key={item} className="hero-release-card__list-item">
                  <span className="hero-release-card__bullet">⌁</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="hero-release-card__stock-row">
              <span>Limited Stock</span>
              <span>120 / 300</span>
            </div>
            <div className="hero-release-card__progress">
              <motion.div
                className="hero-release-card__progress-bar"
                initial={{ width: '0%' }}
                whileInView={{ width: '40%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <button type="button" className="hero-release-card__button">
              <span>Shop Release 001</span>
              <span>→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}