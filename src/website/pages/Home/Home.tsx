import { INDIGO, TEXT, TEXT_SEC, BORDER, CLAY, SAGE, BG, SURFACE, SURFACE_2, CREAM, FONT_SERIF, FONT_SANS } from '../../../tokens'
import { motion } from 'framer-motion'
import type { WebPage } from '../../types'
import Hero from './Hero/Hero'
import tShirtsImage from '../../../assets/Website_img/Shop/categories/T-shirts.png'
import shirtsImage from '../../../assets/Website_img/Shop/categories/Shirts.png'
import bandanaImage from '../../../assets/Website_img/Shop/categories/bandana.png'
import pantsImage from '../../../assets/Website_img/Shop/categories/pants.png'
import './Home.scss'

interface Props { onNavigate: (p: WebPage) => void }

const SHOP_CATEGORIES = [
  { name: 'T-Shirts', desc: 'Core graphics, archival cuts, everyday ritual.', img: tShirtsImage, icon: '✳' },
  { name: 'Shirts', desc: 'Structured layers with a tailored, quiet silhouette.', img: shirtsImage, icon: '✦' },
  { name: 'Bandanas', desc: 'Small-format pieces with symbolic embroidery.', img: bandanaImage, icon: '◈' },
  { name: 'Pants', desc: 'Easy structure, clean line, and a grounded silhouette.', img: pantsImage, icon: '△' },
]

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

const FEATURED_BADGES = ['The only collection', 'Heritage-driven', 'Archive first']

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
      ease: [0.22, 1, 0.36, 1],
    },
  }),
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
              <div>
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
              <div className="home-eyebrow">Shop</div>
              <h2 className="home-section__title">T-Shirts, Shirts, Bandanas, Pants...</h2>
              <p className="home-section__copy home-section__copy--shop">The core wardrobe of IZLI. Timeless pieces designed with meaning, crafted to live with you, wherever you go.</p>
            </div>
            <button onClick={() => onNavigate('shop')} className="home-inline-link">View all →</button>
          </div>

          <div className="home-category-grid">
            {SHOP_CATEGORIES.map(category => (
              <motion.button
                key={category.name}
                onClick={() => onNavigate('shop')}
                className="home-category-card"
                variants={categoryCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={SHOP_CATEGORIES.indexOf(category) * 0.08}
              >
                <img src={category.img} alt={category.name} className="home-category-card__image" />
                <div className="home-category-card__overlay" />
                <div className="home-category-card__badge">{category.icon}</div>
                <div className="home-category-card__content">
                  <div className="home-category-card__name">{category.name}</div>
                  <div className="home-category-card__desc">{category.desc}</div>
                  <div className="home-category-card__link">
                    <span>Explore</span>
                    <span className="home-category-card__link-icon">→</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--featured">
        <div className="home-shell home-split home-split--featured">
          <div className="home-split__copy">
            <div className="home-eyebrow home-eyebrow--warm">Featured Collection</div>
            <h2 className="home-collection-title">RBOR</h2>
            <p className="home-section__copy home-section__copy--dark">The only collection. A focused archive of garments, shaped with one visual language and one release rhythm.</p>
            <div className="home-chip-row">
              {FEATURED_BADGES.map(badge => (
                <span key={badge} className="home-chip">{badge}</span>
              ))}
            </div>
            <div className="home-actions-row">
              <button onClick={() => onNavigate('collections')} className="hero-action-button hero-action-button--primary">
                <span>View RBOR</span>
                <span className="hero-action-button__arrow">→</span>
              </button>
              <button onClick={() => onNavigate('heritage')} className="hero-action-button hero-action-button--secondary">
                <span>Read the legacy</span>
                <span className="hero-action-button__arrow">↗</span>
              </button>
            </div>
          </div>

          <div className="home-featured-card">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1400&fit=crop&auto=format"
              alt="RBOR collection"
              className="home-featured-card__image"
            />
            <div className="home-featured-card__veil" />
            <div className="home-featured-card__meta">
              <div className="home-featured-card__label">The only collection</div>
              <div className="home-featured-card__title">RBOR / 2026</div>
              <div className="home-featured-card__text">A single collection holding the full narrative system of IZLI.</div>
            </div>
          </div>
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