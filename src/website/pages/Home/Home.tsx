import { BG, FONT_SERIF } from '../../../tokens'
import { motion } from 'framer-motion'
import type { WebPage } from '../../types'
import Hero from './Hero/Hero'
import tShirtsImage from '../../../assets/Website_img/Shop/categories/T-shirts.png'
import shirtsImage from '../../../assets/Website_img/Shop/categories/Shirts.png'
import bandanaImage from '../../../assets/Website_img/Shop/categories/bandana.png'
import pantsImage from '../../../assets/Website_img/Shop/categories/pants.png'
import bannerImage from '../../../assets/Website_img/banner/banner_001.png'
import arrowTopRightIcon from '../../../assets/icons/arrow_top_right.svg'
import motifIcon from '../../../assets/icons/motif_001.svg'
import './Home.scss'

interface Props { onNavigate: (p: WebPage) => void }

const SHOP_CARDS = [
  { type: 'category', area: 'tshirts', name: 'T-Shirts', img: tShirtsImage, icon: '✳' },
  {
    type: 'banner',
    area: 'banner',
    eyebrow: 'New Collection',
    title: 'Desert Maghrebin',
    desc: 'Rooted in heritage. Designed for now.',
    img: bannerImage,
    cta: 'Discover the collection',
  },
  { type: 'category', area: 'bandanas', name: 'Bandanas', img: bandanaImage, icon: '◈' },
  { type: 'category', area: 'shirts', name: 'Shirts', img: shirtsImage, icon: '✦' },
  { type: 'category', area: 'pants', name: 'Pants', img: pantsImage, icon: '△' },
] as const

const SERVICE_FEATURES = [
  {
    title: 'Free shipping',
    desc: 'Over 150 TND',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h3l3 3v4h-6z" />
        <circle cx="7.5" cy="18" r="1.5" />
        <circle cx="17.5" cy="18" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Become a keeper',
    desc: 'Unlock rewards',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l2.6 5.1 5.7.8-4.1 4 .9 5.7-5.1-2.7-5.1 2.7.9-5.7-4.1-4 5.7-.8z" />
        <path d="M12 8.5v4.2" />
      </svg>
    ),
  },
  {
    title: 'Limited releases',
    desc: 'Made to last',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 11V8a5 5 0 0 1 10 0v3" />
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M12 14v3" />
      </svg>
    ),
  },
  {
    title: 'Rooted in heritage',
    desc: 'Made for today',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5v17" />
        <path d="M3.5 12h17" />
        <path d="M6.5 6.5l11 11" />
        <path d="M17.5 6.5l-11 11" />
      </svg>
    ),
  },
]

const COLLECTION_FEATURES = [
  { title: 'Legacy', desc: 'Architecture', icon: '✳' },
  { title: 'Universe', desc: 'Heritage', icon: '◌' },
  { title: 'Product', desc: 'Heavy Oversized Tee', icon: '👕' },
  { title: 'Release', desc: '001', icon: '✦' },
] as const

const RELEASE_POINTS = ['Release 001 badge', '100 Keeper points', 'Exclusive archive access']

const LEGACY_PILLARS = [
  { title: 'Amazigh references', desc: 'Motifs, symbols, and proportions translated into modern product.' },
  { title: 'Material memory', desc: 'Textures and finishing that carry the trace of the hand.' },
  { title: 'Living archive', desc: 'Every release remains part of the brand memory.' },
]

const KEEPER_BENEFITS = [
  { title: 'Private drops', desc: 'Early access to limited releases and reserved sizes.' },
  { title: 'Exclusive experiences', desc: 'Invitations to events, previews, and archive moments.' },
  { title: 'Community status', desc: 'Progress inside the ecosystem, not just a purchase.' },
]

const RECOMMENDED_PRODUCTS = [
  { name: 'Atlas Frame Tee', price: '79 TND', img: 'photo-1523381210434-271e8be1f52b', label: 'T-Shirt' },
  { name: 'Archive Shirt', price: '109 TND', img: 'photo-1483985988355-763728e1935b', label: 'Shirt' },
  { name: 'Symbol Bandana', price: '45 TND', img: 'photo-1503342217505-b0a15ec3261c', label: 'Bandana' },
  { name: 'Keeper Cap', price: '39 TND', img: 'photo-1529139574466-a303027c1d8b', label: 'Accessory' },
]

const categoryCardVariants = {
  hidden: { opacity: 0, y: -42 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

const BANNER_MOTIF_REPEAT_COUNT = 10

const bannerCardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const bannerRailVariants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? 14 : -14,
  }),
  visible: (direction: 'left' | 'right') => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: direction === 'left' ? 0.34 : 0.42,
    },
  }),
}

const bannerContentVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.5,
    },
  },
}

const bannerCtaVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.72,
    },
  },
}

export default function Home({ onNavigate }: Props) {
  return (
    <div className="home-page" style={{ background: BG }}>
      <Hero onNavigate={onNavigate} />

      <section className="home-services-bar">
        <div className="home-shell home-services-bar__inner">
          {SERVICE_FEATURES.map(feature => (
            <div key={feature.title} className="home-services-bar__item">
              <div className="home-services-bar__icon">{feature.icon}</div>
              <div className="home-services-description">
                <div className="home-services-bar__title">{feature.title}</div>
                <div className="home-services-bar__desc">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section home-section--shop home-section--shop-light">
        <div className="home-shell">
          <div className="home-section__header">
            <div>
              {/* <div className="home-eyebrow">Shop</div> */}
              <h2 className="home-section__title">Built Around Heritage.</h2>
              <p className="home-section__copy home-section__copy--shop">Timeless essentials shaped by heritage and crafted for today.</p>
            </div>
            <button onClick={() => onNavigate('shop')} className="home-inline-link">View all →</button>
          </div>

          <div className="home-shop-showcase">
            {SHOP_CARDS.map((card, index) => {
              if (card.type === 'banner') {
                return (
                  <motion.button
                    key={card.title}
                    onClick={() => onNavigate('collections')}
                    className="home-shop-card home-shop-card--banner"
                    style={{ gridArea: card.area }}
                    variants={bannerCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <img src={card.img} alt={card.title} className="home-shop-card__image" />
                    <div className="home-shop-card__overlay home-shop-card__overlay--banner" />
                    <motion.div className="home-shop-card__banner-rail home-shop-card__banner-rail--left" custom="left" variants={bannerRailVariants} aria-hidden="true">
                      <span className="home-shop-card__banner-rail-motif">
                        {Array.from({ length: BANNER_MOTIF_REPEAT_COUNT }).map((_, motifIndex) => (
                          <img key={`left-motif-${motifIndex}`} src={motifIcon} alt="" className="home-shop-card__banner-rail-motif-icon" />
                        ))}
                      </span>
                      <span className="home-shop-card__banner-rail-line" />
                    </motion.div>
                    <motion.div className="home-shop-card__banner-rail home-shop-card__banner-rail--right" custom="right" variants={bannerRailVariants} aria-hidden="true">
                      <span className="home-shop-card__banner-rail-line" />
                      <span className="home-shop-card__banner-rail-motif">
                        {Array.from({ length: BANNER_MOTIF_REPEAT_COUNT }).map((_, motifIndex) => (
                          <img key={`right-motif-${motifIndex}`} src={motifIcon} alt="" className="home-shop-card__banner-rail-motif-icon" />
                        ))}
                      </span>
                    </motion.div>
                    <motion.div className="home-shop-card__banner-content" variants={bannerContentVariants}>
                      <div className="home-shop-card__banner-top">
                        <div className="home-shop-card__banner-eyebrow">{card.eyebrow}</div>
                        <div className="home-shop-card__banner-mark">✶</div>
                        <h3 className="home-shop-card__banner-title">
                          <span>Desert</span>
                          <span>Maghrebin</span>
                        </h3>
                        <p className="home-shop-card__banner-desc">{card.desc}</p>
                      </div>
                      <motion.div className="home-shop-card__banner-cta hero-action-button hero-action-button--primary" variants={bannerCtaVariants}>
                        <span>{card.cta}</span>
                        <span className="hero-action-button__arrow">→</span>
                      </motion.div>
                    </motion.div>
                  </motion.button>
                )
              }

              return (
                <motion.button
                  key={card.name}
                  onClick={() => onNavigate('shop')}
                  className={`home-shop-card home-shop-card--${card.name.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  style={{ gridArea: card.area }}
                  variants={categoryCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  custom={index * 0.08}
                >
                  <img src={card.img} alt={card.name} className="home-shop-card__image" />
                  <div className="home-shop-card__overlay" />
                  {/* <div className="home-shop-card__badge">{card.icon}</div> */}
                  <div className="home-shop-card__corner-icon" aria-hidden="true">
                    <img src={arrowTopRightIcon} alt="" />
                  </div>
                  <div className="home-shop-card__content">
                    <div className="home-shop-card__name">{card.name}</div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="home-section home-section--featured">
        <div className="home-shell home-featured-layout">
          <div className="home-featured-layout__copy">
            <div className="home-featured-layout__eyebrow">Featured Collection</div>
            <div className="home-featured-layout__rule">
              <span />
              <span className="home-featured-layout__rule-mark">✶</span>
              <span />
            </div>
            <div className="home-featured-layout__overline">The first collection</div>
            <h2 className="home-featured-layout__title">RBOR</h2>
            <p className="home-featured-layout__copy-text">The beginning of the IZLI journey. One collection. One product. One vision.</p>
            <div className="home-featured-layout__divider" />
            <div className="home-featured-layout__feature-grid">
              {COLLECTION_FEATURES.map(feature => (
                <div key={feature.title} className="home-featured-layout__feature">
                  <div className="home-featured-layout__feature-icon">{feature.icon}</div>
                  <div className="home-featured-layout__feature-title">{feature.title}</div>
                  <div className="home-featured-layout__feature-desc">{feature.desc}</div>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('collections')} className="hero-action-button hero-action-button--primary home-featured-layout__cta">
              <span>Explore RBOR</span>
              <span className="hero-action-button__arrow">→</span>
            </button>
          </div>

          <div className="home-featured-layout__media">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&h=1400&fit=crop&auto=format"
              alt="RBOR collection"
              className="home-featured-layout__image"
            />
          </div>
        </div>

        <div className="home-shell home-featured-strip">
          <div className="home-featured-strip__left">
            <div className="home-featured-strip__icon">✶</div>
            <div>
              <div className="home-featured-strip__title">A collection rooted in heritage.</div>
              <div className="home-featured-strip__text">RBOR is inspired by Amazigh architecture and symbols, reimagined for today.</div>
            </div>
          </div>
          <button onClick={() => onNavigate('collections')} className="home-featured-strip__link">
            <span>Discover the story</span>
            <span>→</span>
          </button>
        </div>
      </section>

      <section className="home-section home-section--release">
        <div className="home-shell home-split home-split--release">
          <div className="home-split__copy">
            <div className="home-eyebrow">Current Release</div>
            <h2 className="home-section__title home-section__title--light">Release 001</h2>
            <p className="home-section__copy home-section__copy--light">A limited release with a precise drop rhythm, designed to feel like a chapter rather than a season.</p>
            <div className="home-chip-row">
              {RELEASE_POINTS.map(point => (
                <span key={point} className="home-chip home-chip--dark">{point}</span>
              ))}
            </div>
            <div className="home-actions-row">
              <button onClick={() => onNavigate('product-detail')} className="hero-action-button hero-action-button--primary">
                <span>Shop Release 001</span>
                <span className="hero-action-button__arrow">→</span>
              </button>
              <button onClick={() => onNavigate('shop')} className="hero-action-button hero-action-button--secondary">
                <span>Explore the shop</span>
                <span className="hero-action-button__arrow">↗</span>
              </button>
            </div>
          </div>

          <aside className="home-release-card">
            <div className="home-release-card__shell">
              <div className="home-release-card__label">Current Release</div>
              <div className="home-release-card__title" style={{ fontFamily: FONT_SERIF }}>Release 001</div>
              <div className="home-release-card__subtitle">Rbor Heavy Tee<br />Sand Beige</div>
              <div className="home-release-card__price">79 TND</div>
              <div className="home-release-card__rule" />
              <div className="home-release-card__list">
                {RELEASE_POINTS.map(point => (
                  <div key={point} className="home-release-card__list-item">
                    <span className="home-release-card__bullet">⌁</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <div className="home-release-card__stock-row">
                <span>Limited Stock</span>
                <span>120 / 300</span>
              </div>
              <div className="home-release-card__progress">
                <div className="home-release-card__progress-bar" />
              </div>
              <button type="button" onClick={() => onNavigate('product-detail')} className="home-release-card__button">
                <span>Shop Release 001</span>
                <span>→</span>
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="home-section home-section--legacy">
        <div className="home-shell">
          <div className="home-section__header home-section__header--dark">
            <div>
              <div className="home-eyebrow home-eyebrow--warm">Legacy</div>
              <h2 className="home-section__title home-section__title--dark">Carried forward, not archived away.</h2>
              <p className="home-section__copy home-section__copy--dark">Legacy is the thread that keeps the collection grounded: meaning, material, and memory stay visible in every cut.</p>
            </div>
            <button onClick={() => onNavigate('archives')} className="home-inline-link home-inline-link--dark">Open the archives →</button>
          </div>

          <div className="home-legacy-grid">
            {LEGACY_PILLARS.map(pillar => (
              <article key={pillar.title} className="home-legacy-card">
                <div className="home-legacy-card__index">0{LEGACY_PILLARS.indexOf(pillar) + 1}</div>
                <h3 className="home-legacy-card__title">{pillar.title}</h3>
                <p className="home-legacy-card__copy">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--keeper-circle">
        <div className="home-shell home-split home-split--circle">
          <div className="home-split__copy">
            <div className="home-eyebrow">Keeper Circle</div>
            <h2 className="home-section__title home-section__title--light">The circle around the archive.</h2>
            <p className="home-section__copy home-section__copy--light">The Keeper Circle is where private access, community status, and archive moments meet in one membership layer.</p>
            <div className="home-actions-row">
              <button onClick={() => onNavigate('keeper-circle')} className="hero-action-button hero-action-button--primary">
                <span>Explore the Circle</span>
                <span className="hero-action-button__arrow">→</span>
              </button>
              <button onClick={() => onNavigate('community')} className="hero-action-button hero-action-button--secondary">
                <span>Meet the community</span>
                <span className="hero-action-button__arrow">↗</span>
              </button>
            </div>
          </div>

          <div className="home-benefit-grid">
            {KEEPER_BENEFITS.map(benefit => (
              <div key={benefit.title} className="home-benefit-card">
                <div className="home-benefit-card__title">{benefit.title}</div>
                <div className="home-benefit-card__copy">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--cta">
        <div className="home-shell home-cta">
          <div className="home-eyebrow">Become a Keeper</div>
          <h2 className="home-cta__title">Own a limited release, unlock exclusive experiences, and become part of the IZLI legacy.</h2>
          <p className="home-cta__copy">Join the layer that gives access to the archive, the circle, and the next release before anyone else.</p>
          <div className="home-actions-row home-actions-row--center">
            <button onClick={() => onNavigate('login')} className="hero-action-button hero-action-button--primary">
              <span>Become a Keeper</span>
              <span className="hero-action-button__arrow">→</span>
            </button>
            <button onClick={() => onNavigate('keeper-circle')} className="hero-action-button hero-action-button--secondary">
              <span>View membership</span>
              <span className="hero-action-button__arrow">↗</span>
            </button>
          </div>
        </div>
      </section>

      <section className="home-section home-section--recommended">
        <div className="home-shell">
          <div className="home-section__header">
            <div>
              <div className="home-eyebrow">Recommended Products</div>
              <h2 className="home-section__title home-section__title--light">Objects aligned with the release.</h2>
              <p className="home-section__copy home-section__copy--light">A tighter selection chosen to echo the same material language as the current hero and release.</p>
            </div>
            <button onClick={() => onNavigate('shop')} className="home-inline-link">Browse the shop →</button>
          </div>

          <div className="home-product-grid">
            {RECOMMENDED_PRODUCTS.map(product => (
              <button key={product.name} onClick={() => onNavigate('product-detail')} className="home-product-card">
                <div className="home-product-card__media">
                  <img src={`https://images.unsplash.com/${product.img}?w=900&h=1080&fit=crop&auto=format`} alt={product.name} className="home-product-card__image" />
                  <div className="home-product-card__veil" />
                  <span className="home-product-card__label">{product.label}</span>
                </div>
                <div className="home-product-card__body">
                  <div>
                    <div className="home-product-card__name">{product.name}</div>
                    <div className="home-product-card__meta">Limited availability · Crafted for the archive</div>
                  </div>
                  <div className="home-product-card__price">{product.price}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}