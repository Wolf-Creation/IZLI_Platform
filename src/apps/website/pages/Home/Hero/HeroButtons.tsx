import { motion } from 'framer-motion'
import type { WebPage } from '../../../types'

interface Props {
  onNavigate: (page: WebPage) => void
}

export default function HeroButtons({ onNavigate }: Props) {
  return (
    <div className="hero-actions">
      <motion.button
        type="button"
        className="hero-action-button hero-action-button--primary"
        onClick={() => onNavigate('collections')}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.99 }}
      >
        <span>Explore the Collection</span>
        <span className="hero-action-button__arrow">→</span>
      </motion.button>
      <motion.button
        type="button"
        className="hero-action-button hero-action-button--secondary"
        onClick={() => onNavigate('stories')}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.99 }}
      >
        <span>Discover Our World</span>
        <span className="hero-action-button__arrow">→</span>
      </motion.button>
    </div>
  )
}