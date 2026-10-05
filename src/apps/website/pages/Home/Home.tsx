import { BG, FONT_SERIF } from '../../../../tokens'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { WebPage } from '../../types'
import { HeroSlider } from './Hero/HeroSlider'
import { SplashScreen } from '../../components/SplashScreen/SplashScreen'
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { DEFAULT_HOME_PAGE_CONFIG, getHomePageConfig } from '../../../../shared/services/home'
import type { CartItemInput } from '../../cart'
import tShirtsImage from '../../../../assets/Website_img/Shop/categories/T-shirts.png'
import tafuktImage from '../../../../assets/Website_img/Shop/tops/banner/TAFUKT_001.png'
import tafuktBottomsImage from '../../../../assets/Website_img/Shop/tops/banner/TAFUKT_002.png'
import shirtsImage from '../../../../assets/Website_img/Shop/categories/Shirts.png'
import bandanaImage from '../../../../assets/Website_img/Shop/categories/bandana.png'
import pantsImage from '../../../../assets/Website_img/Shop/categories/pants.png'
import bannerImage from '../../../../assets/Website_img/banner/banner_001.png'
import arrowTopRightIcon from '../../../../assets/icons/arrow_top_right.svg'
import motifIcon from '../../../../assets/icons/motif_001.svg'
import './Home.scss'

interface Props { onNavigate: (p: WebPage, productId?: string) => void; onAddToCart: (item: CartItemInput) => void; onToggleWishlist: (item: CartItemInput) => void; isWishlisted: (id: string) => boolean }

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

function KeeperBenefitIcon({ number }: { number: string }) {
  if (number === '01') {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11.5" />
        <path d="M16 9v7l5 3" />
        <path d="M5 6v6h6" />
      </svg>
    )
  }

  if (number === '02') {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="m16 3 2.8 9.2L28 15l-9.2 2.8L16 27l-2.8-9.2L4 15l9.2-2.8L16 3Z" />
        <path d="m25 21 .9 3.1L29 25l-3.1.9L25 29l-.9-3.1L21 25l3.1-.9L25 21Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="10" r="4" />
      <path d="M7 27v-2a9 9 0 0 1 18 0v2H7Z" />
      <path d="M6 11a3.5 3.5 0 0 0 0 7m20-7a3.5 3.5 0 0 1 0 7" />
    </svg>
  )
}

const KEEPER_BENEFITS = [
  {
    number: '01',
    title: [
      [{ text: 'Before the release.', tone: 'muted' }],
      [{ text: 'Before everyone else.', tone: 'primary' }],
    ],
    eyebrow: 'FIRST ACCESS',
    copy: 'Discover new pieces earlier, access limited drops, and secure your size before the collection reaches everyone else.',
    indicators: [['Discover', 'First'], ['Secure', 'Your Size'], ['Priority', 'Access']],
    closing: [''],
  },
  {
    number: '02',
    title: [
      [{ text: 'As you rise,', tone: 'muted' }],
      [{ text: 'New doors open.', tone: 'primary' }],
    ],
    eyebrow: 'EXCLUSIVE EXPERIENCES',
    copy: 'The circle opens onto the moments behind the collection. Meet the people, places, and stories that give each release its meaning.',
    indicators: [['Private', 'Events'], ['Members-Only', 'Experiences'], ['Status-Based', 'Access']],
    closing: [''],
  },
  {
    number: '03',
    title: [
      [{ text: 'Grow within,', tone: 'muted' }],
      [{ text: 'Go further.', tone: 'primary' }],
    ],
    eyebrow: 'IZLI COMMUNITY',
    copy: 'Every piece you choose, every story you share, and every moment you take part in helps shape your journey within the IZLI community. As you grow, your Keeper Status evolves — opening the way to deeper access and new experiences.',
    indicators: [['Grow', 'Your Status'], ['Share', ' the Story'], ['Carry', 'the Pieces']],
    closing: [''],
  },
] as const

const COLLECTIONS_STORIES = [
  {
    number: '01',
    label: 'HERITAGE',
    title: 'Transmetre l\'essentiel.',
    img: bannerImage,
  },
  {
    number: '02',
    label: 'LEGACY',
    title: 'Plus qu\'une marque.',
    img: bannerImage,
  },
  {
    number: '03',
    label: 'SYMBOLS',
    title: 'Culture en fibre.',
    img: bannerImage,
  },
  {
    number: '04',
    label: 'COMMUNITY',
    title: 'Ensemble, nous créons.',
    img: bannerImage,
  },
]

const RECOMMENDED_PRODUCTS = [
  { name: 'Atlas Frame Tee', price: '79 TND', img: 'photo-1523381210434-271e8be1f52b', label: 'T-Shirt', colors: ['#2b2521', '#8a6f57', '#d9cfbb', '#8f9179'] },
  { name: 'Archive Shirt', price: '109 TND', img: 'photo-1483985988355-763728e1935b', label: 'Shirt', colors: ['#c9a87e', '#8a6f57', '#2b2521', '#d9cfbb'] },
  { name: 'Symbol Bandana', price: '45 TND', img: 'photo-1503342217505-b0a15ec3261c', label: 'Bandana', colors: ['#2b2521', '#d9cfbb', '#c9a87e', '#8f9179'] },
  { name: 'Keeper Cap', price: '39 TND', img: 'photo-1529139574466-a303027c1d8b', label: 'Accessory', colors: ['#5a3d2b', '#8a6f57', '#d9cfbb', '#8f9179'] },
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

export default function Home({ onNavigate, onAddToCart, onToggleWishlist, isWishlisted }: Props) {
  const { products, loading: productsLoading } = useProducts({ status: 'published' })
  const [homeConfig, setHomeConfig] = useState(DEFAULT_HOME_PAGE_CONFIG)
  const [scrollY, setScrollY] = useState(0)
  const [showSplash, setShowSplash] = useState(true)
  const websiteProducts = products.filter(product => (product.releaseSettings?.status ?? product.releaseStatus) === 'live' && product.releaseNumber === '01').map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    currency: product.currency,
    release: `Release ${product.releaseNumber ?? '01'}`,
    releaseNumber: product.releaseNumber,
    images: product.images ?? [],
    releaseStatus: 'live' as const,
  }))
  const displayedShopProducts = websiteProducts
  const topsProducts = products.filter(product => product.status === 'published' && product.productType !== 'Bottoms')
  const bottomsProducts = products.filter(product => product.status === 'published' && product.productType === 'Bottoms')
  const homeSections = homeConfig.sections.filter(section => section.enabled)

  const renderProductCards = (catalogueProducts: typeof products) => catalogueProducts.map(product => {
    const image = product.coverImageUrl || product.images?.[0] || ''
    const size = product.sizes?.find(item => item.stock > 0)?.size ?? product.sizes?.[0]?.size ?? 'M'
    return (
      <ProductCard
        key={product.id}
        name={product.name}
        price={product.price === undefined ? 'Price TBA' : `${product.price} ${product.currency}`}
        image={image}
        images={product.images}
        mediaAssets={product.mediaAssets}
        badge={product.releaseStatus === 'live' ? 'New' : undefined}
        onClick={() => onNavigate('product-detail', product.id)}
        onAddToCart={() => onAddToCart({
          id: product.id,
          name: product.name,
          universe: product.universe,
          price: product.price,
          currency: product.currency,
          size,
          img: image,
        })}
        className="home-tops-product-card"
      />
    )
  })

  useEffect(() => {
    let isCurrent = true
    getHomePageConfig().then(config => {
      if (isCurrent) setHomeConfig(config)
    }).catch(() => undefined)
    return () => { isCurrent = false }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="home-page" style={{ background: BG, display: 'flex', flexDirection: 'column' }}>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {homeSections.map((section, sectionIndex) => section.type === 'hero' && <HeroSlider
        key={section.id}
        scrollY={scrollY}
        onNavigate={onNavigate}
        titleOverride={section.title}
        descriptionOverride={section.description}
        style={{ order: sectionIndex }}
      />)}
      {homeSections.map((section, sectionIndex) => section.type === 'new-releases' && <section key={section.id} className="home-section home-section--shop" style={{ order: sectionIndex }}>
        <div className="home-shell">
          <div className="home-shop-tabs" role="tablist" aria-label="Shop releases">
            <span className="home-shop-tab home-shop-tab--active" role="tab" aria-selected="true" tabIndex={0}>{section.title || 'New releases'}</span>
          </div>
          {section.description && <p className="home-shop-description">{section.description}</p>}
          <ProductCarousel
            products={displayedShopProducts}
            onNavigate={onNavigate}
            onAddToCart={productId => {
              const product = products.find(item => item.id === productId)
              if (!product) return
              onAddToCart({ id: product.id, name: product.name, universe: product.universe, price: product.price, currency: product.currency, size: product.sizes?.find(size => size.stock > 0)?.size ?? 'M', img: product.coverImageUrl || product.images?.[0] || '' })
            }}
          />
        </div>
      </section>)}

      {homeSections.map((section, sectionIndex) => section.type === 'tops' && <section key={section.id} className="home-section home-section--tops" style={{ order: sectionIndex }}>
        <header className="home-tops-editorial__header">
          <div>
            <h2>{section.title || 'Tops'}</h2>
          </div>
          <PrimaryButton className="home-tops-editorial__cta" onClick={() => onNavigate('shop')}>Shop tops</PrimaryButton>
        </header>
        <div className="home-tops-editorial">
          <div className="home-tops-editorial__visual">
            <img src={tafuktImage} alt="IZLI tops collection" loading="lazy" decoding="async" />
            <div className="home-tops-editorial__visual-overlay" />
            <div className="home-tops-editorial__visual-caption">
              <span>Essential forms</span>
              <strong>{section.description || 'Built for every day'}</strong>
            </div>
          </div>

          <div className="home-tops-editorial__products">
            <div className="home-tops-editorial__grid">
              {renderProductCards(topsProducts)}
              {!productsLoading && topsProducts.length === 0 && <p className="home-tops-editorial__empty">New products will be available soon.</p>}
            </div>
          </div>
        </div>
      </section>)}

      {homeSections.map((section, sectionIndex) => section.type === 'bottoms' && <section key={section.id} className="home-section home-section--bottoms" style={{ order: sectionIndex }}>
        <header className="home-tops-editorial__header">
          <div>
            <h2>{section.title || 'Bottoms'}</h2>
          </div>
          <PrimaryButton className="home-tops-editorial__cta" onClick={() => onNavigate('shop')}>Shop bottoms</PrimaryButton>
        </header>
        <div className="home-tops-editorial home-bottoms-editorial">
          <div className="home-tops-editorial__visual">
            <img src={tafuktBottomsImage} alt="IZLI bottoms collection" loading="lazy" decoding="async" />
            <div className="home-tops-editorial__visual-overlay" />
            <div className="home-tops-editorial__visual-caption">
              <span>Grounded silhouettes</span>
              <strong>{section.description || 'Made to move with you'}</strong>
            </div>
          </div>

          <div className="home-tops-editorial__products">
            <div className="home-tops-editorial__grid">
              {renderProductCards(bottomsProducts)}
              {!productsLoading && bottomsProducts.length === 0 && <p className="home-tops-editorial__empty">No Bottoms products are published yet.</p>}
            </div>
          </div>
        </div>
      </section>)}

      {/* <section className="home-section home-section--release">
        <div className="home-shell home-split home-split--release">
          <div className="home-release-photo-grid">
            {[
              { src: 'photo-1521572163474-6864f9cf17ab', label: 'Front' },
              { src: 'photo-1583743814966-8936f5b7be1a', label: 'Detail' },
              { src: 'photo-1503341504253-dff4815485f1', label: 'Fabric' },
              { src: 'photo-1523381210434-271e8be1f52b', label: 'Fit' },
            ].map(({ src, label }) => (
              <div key={label} className="home-release-photo-grid__cell">
                <img
                  src={`https://images.unsplash.com/${src}?w=600&h=720&fit=crop&auto=format`}
                  alt={label}
                  className="home-release-photo-grid__img"
                />
                <span className="home-release-photo-grid__label">{label}</span>
              </div>
            ))}
          </div>

          <aside className="home-release-content">
            <div className="home-release-content__label">Current Release</div>
            <div className="home-release-content__title" style={{ fontFamily: FONT_SERIF }}>Release 001</div>
            <div className="home-release-content__subtitle">Rbor Heavy Tee<br />Sand Beige</div>
            <div className="home-release-content__price">79 TND</div>
            <div className="home-release-content__rule" />
            <div className="home-release-content__list">
              {RELEASE_POINTS.map(point => (
                <div key={point} className="home-release-content__list-item">
                  <span className="home-release-content__bullet">⌁</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="home-release-content__stock-row">
              <span>Limited Stock</span>
              <span>120 / 300</span>
            </div>
            <div className="home-release-content__progress">
              <div className="home-release-content__progress-bar" />
            </div>
            <button type="button" onClick={() => onNavigate('product-detail')} className="hero-action-button hero-action-button--primary home-release-content__cta">
              <span>Shop Release 001</span>
              <span className="hero-action-button__arrow">→</span>
            </button>
          </aside>
        </div>
      </section> */}

      {homeSections.map((section, sectionIndex) => section.type === 'keeper-circle' && (
        <section key={section.id} className="home-section home-section--keeper-circle" style={{ order: sectionIndex }}>
          <div className="home-keeper-editorial">
            <aside className="home-keeper-intro">
              <h2>KEEPER CIRCLE</h2>
              <p>Get First Access to what comes next, Unlock Exclusive Experiences, and Become part of the IZLI Community.</p>
              <PrimaryButton className="home-keeper-intro__cta" onClick={() => onNavigate('keeper-circle')}>
                DISCOVER THE CIRCLE
              </PrimaryButton>
            </aside>

            <div className="keeper-benefit-tabs" aria-label="Keeper Circle benefits">
              {KEEPER_BENEFITS.map(benefit => (
                <article className="keeper-benefit-tabs__item" key={benefit.number}>
                  <h3 className="keeper-benefit-tabs__tab">
                    <span className="keeper-benefit-tabs__icon">
                      <KeeperBenefitIcon number={benefit.number} />
                    </span>
                    <span className="keeper-benefit-tabs__label">{benefit.eyebrow}</span>
                  </h3>

                  <div className="keeper-benefit-tab-panel">
                    <h3 className="keeper-benefit-tab-panel__title">
                      {benefit.title.map((line, lineIndex) => (
                        <span className="keeper-benefit-tab-panel__title-line" key={lineIndex}>
                          {line.map((segment, segmentIndex) => (
                            <span className={`keeper-benefit-tab-panel__title-segment keeper-benefit-tab-panel__title-segment--${segment.tone}`} key={segmentIndex}>
                              {segment.text}
                            </span>
                          ))}
                        </span>
                      ))}
                    </h3>
                    <p className="keeper-benefit-tab-panel__copy">{benefit.copy}</p>
                    <ul className="keeper-benefit-tab-panel__benefits">
                      {benefit.indicators.map(indicator => (
                        <li key={indicator.join('-')}>
                          <span className="keeper-benefit-tab-panel__benefit-mark" aria-hidden="true">
                            <svg viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h9M8 4l4 4-4 4" />
                            </svg>
                          </span>
                          <span className="keeper-benefit-tab-panel__benefit-text">
                            {indicator[0]} {indicator[1].trim()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

    </div>
  )
}