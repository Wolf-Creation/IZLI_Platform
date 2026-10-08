import { BG, FONT_SERIF } from '../../../../tokens'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import type { WebPage } from '../../types'
import { HeroSlider, SWEATSHIRT_BACK_VIEW, SWEATSHIRT_FRONT_VIEW, type HeroCarouselProduct } from './Hero/HeroSlider'
import { SplashScreen } from '../../components/SplashScreen/SplashScreen'
import { MinimalistProductRail } from '../../components/MinimalistProductRail/MinimalistProductRail'
import { MinimalistProductCard } from '../../components/MinimalistProductCard/MinimalistProductCard'
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton'
import { TopBarSection } from '../../components/TopBarSection/TopBarSection'
import { MarqueeBanner } from '../../components/MarqueeBanner/MarqueeBanner'
import { withHeroBackgroundRemoved } from '../../../../shared/heroMedia'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { useCollections } from '../../../../shared/hooks/useCollections'
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

const KEEPER_CIRCLE_HOME_BANNER = 'https://res.cloudinary.com/tajbua8z/image/upload/v1791386869/banner_001.png'

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
  const { collections } = useCollections()
  const [homeConfig, setHomeConfig] = useState(DEFAULT_HOME_PAGE_CONFIG)
  const [scrollY, setScrollY] = useState(0)
  const [showSplash, setShowSplash] = useState(true)
  const [newReleasesProgress, setNewReleasesProgress] = useState(0)
  const [topsProgress, setTopsProgress] = useState(0)
  const [bottomsProgress, setBottomsProgress] = useState(0)
  const [keeperCircleProgress, setKeeperCircleProgress] = useState(0)
  const availableHeroProducts: HeroCarouselProduct[] = products
    .filter(product => product.status === 'published' && product.productType !== 'Bottoms' && !product.name.toLowerCase().includes(' copy'))
    .map(product => {
      const linkedCollectionId = product.collectionId ?? product.collectionIds[0]
      const collection = (linkedCollectionId
        ? collections.find(item => item.id === linkedCollectionId)
        : undefined) ?? collections.find(item => item.productIds.includes(product.id))
      const hero3dFront = product.media?.hero3dFront?.[0]
      const hero3dRight = product.media?.hero3dRight?.[0]
      const hero3dBack = product.media?.hero3dBack?.[0]
      const hero3dLeft = product.media?.hero3dLeft?.[0]
      const hero3dImages = {
        front: hero3dFront,
        right: hero3dRight,
        back: hero3dBack,
        left: hero3dLeft,
      }
      const hero3dViews = (product.media?.hero3dOrder ?? ['front', 'right', 'back', 'left'])
        .flatMap(view => hero3dImages[view] ? [{ view, image: withHeroBackgroundRemoved(hero3dImages[view]) }] : [])
      const hasCustomHero3dImages = hero3dViews.length > 0
      const isFallbackSweatshirt = product.name.toLowerCase().includes('sweatshirt')

      return {
        id: product.id,
        name: product.name,
        universe: product.universe,
        collectionName: collection?.name,
        collectionDescription: collection?.shortDescription || collection?.description,
        collectionSlug: collection?.slug,
        features: [
          {
            title: 'Premium fabric',
            description: product.characteristics?.composition || product.characteristics?.fabric || 'Heavyweight cotton for lasting comfort.',
          },
          {
            title: 'Modern silhouette',
            description: product.characteristics?.fit || 'An oversized fit with considered details.',
          },
          {
            title: 'Timeless design',
            description: product.design?.heritageTheme || product.legacy || 'Rooted in heritage, made for today.',
          },
        ],
        image: hero3dViews[0]?.image || withHeroBackgroundRemoved(isFallbackSweatshirt && !hasCustomHero3dImages
          ? SWEATSHIRT_FRONT_VIEW
          : product.coverImageUrl || product.images?.[0] || ''),
        hero3dViews: hero3dViews.length > 0 ? hero3dViews : undefined,
        rightImage: hero3dRight ? withHeroBackgroundRemoved(hero3dRight) : undefined,
        backImage: hero3dBack
          ? withHeroBackgroundRemoved(hero3dBack)
          : !hasCustomHero3dImages && isFallbackSweatshirt
            ? SWEATSHIRT_BACK_VIEW
            : undefined,
        leftImage: hero3dLeft ? withHeroBackgroundRemoved(hero3dLeft) : undefined,
      }
    })
    .sort((first, second) => Number(second.name.toLowerCase().includes('sweatshirt')) - Number(first.name.toLowerCase().includes('sweatshirt')))
  const heroSection = homeConfig.sections.find(section => section.type === 'hero')
  const heroProductCount = heroSection?.productCount ?? 3
  const selectedHeroProducts = heroSection?.productIds?.length
    ? heroSection.productIds.map(id => availableHeroProducts.find(product => product.id === id)).filter((product): product is HeroCarouselProduct => Boolean(product)).slice(0, heroProductCount)
    : []
  const heroProducts = selectedHeroProducts.length ? selectedHeroProducts : availableHeroProducts.slice(0, heroProductCount)
  const websiteProducts = products.filter(product => (product.releaseSettings?.status ?? product.releaseStatus) === 'live' && product.releaseNumber === '01').map(product => ({
    id: product.id,
    name: product.name,
    price: product.price === undefined ? 'Price TBA' : `${product.price} ${product.currency}`,
    image: product.coverImageUrl || product.images?.[0] || '',
    hoverImage: product.images?.find(image => image !== (product.coverImageUrl || product.images?.[0])),
    mediaAssets: product.mediaAssets,
  }))
  const displayedShopProducts = websiteProducts
  const availableTopsProducts = products.filter(product => product.status === 'published' && product.productType !== 'Bottoms')
  const availableBottomsProducts = products.filter(product => product.status === 'published' && product.productType === 'Bottoms')
  const instagramPosts = products
    .filter(product => product.status === 'published')
    .flatMap(product => {
      const images = [product.coverImageUrl, ...(product.images ?? [])]
        .filter((image, index, allImages): image is string => Boolean(image) && allImages.indexOf(image) === index)
      return images.map((image, index) => ({
        id: `${product.id}-${index}`,
        image,
        alt: `${product.name} — IZLI Instagram`,
      }))
    })
  const homeSections = homeConfig.sections.filter(section => section.enabled)
  const heroSectionIndex = homeSections.findIndex(section => section.type === 'hero')

  const renderProductCards = (catalogueProducts: typeof products) => catalogueProducts.map(product => {
    const image = product.coverImageUrl || product.images?.[0] || ''
    const wishlistItem: CartItemInput = {
      id: product.id,
      name: product.name,
      universe: product.universe,
      price: product.price,
      currency: product.currency,
      size: product.sizes?.find(item => item.stock > 0)?.size ?? product.sizes?.[0]?.size ?? 'M',
      img: image,
    }
    return (
      <MinimalistProductCard
        key={product.id}
        product={{
          id: product.id,
          name: product.name,
          price: product.price === undefined ? 'Price TBA' : `${product.price} ${product.currency}`,
          image,
          hoverImage: product.images?.find(productImage => productImage !== image),
          mediaAssets: product.mediaAssets,
        }}
        onClick={() => onNavigate('product-detail', product.id)}
        onToggleWishlist={() => onToggleWishlist(wishlistItem)}
        isWishlisted={isWishlisted(product.id)}
      />
    )
  })

  const productsForSection = (section: typeof homeConfig.sections[number], catalogueProducts: typeof products) => {
    if (section.productIds === undefined) return catalogueProducts
    const productsById = new Map(catalogueProducts.map(product => [product.id, product]))
    return section.productIds.map(id => productsById.get(id)).filter((product): product is typeof products[number] => Boolean(product))
  }

  useEffect(() => {
    let isCurrent = true
    getHomePageConfig().then(config => {
      if (isCurrent) setHomeConfig(config)
    }).catch(() => undefined)
    return () => { isCurrent = false }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll<HTMLElement>('.home-tops-editorial__header').forEach(header => {
        const section = header.closest<HTMLElement>('.home-section--shop, .home-section--tops, .home-section--bottoms, .home-section--keeper-circle')
        if (!section) return

        const stickyTop = Number.parseFloat(getComputedStyle(header).top) || 0
        const headerBounds = header.getBoundingClientRect()
        const sectionBounds = section.getBoundingClientRect()
        const isStuck = headerBounds.top <= stickyTop + 1 && sectionBounds.bottom >= headerBounds.bottom
        header.classList.toggle('is-stuck', isStuck)
      })

      const newReleasesRail = document.querySelector<HTMLElement>('.home-section--shop .minimalist-product-rail--scrollable')
      const railViewport = newReleasesRail?.querySelector<HTMLElement>('.minimalist-product-rail__viewport')
      const railTrack = newReleasesRail?.querySelector<HTMLElement>('.minimalist-product-rail__grid')
      if (newReleasesRail && railViewport && railTrack) {
        const railWidth = newReleasesRail.clientWidth
        const cardsDistance = Math.max(0, railTrack.scrollWidth - railWidth)
        const endMessage = newReleasesRail.querySelector<HTMLElement>('.minimalist-product-rail__end-message')
        const endMessageTrack = endMessage?.querySelector<HTMLElement>('span')
        const messageDistance = endMessage && endMessageTrack
          ? endMessageTrack.scrollWidth
          : 0
        const totalDistance = cardsDistance + messageDistance
        const distanceValue = `${totalDistance}px`
        if (newReleasesRail.style.getPropertyValue('--minimalist-product-rail-scroll-distance') !== distanceValue) {
          newReleasesRail.style.setProperty('--minimalist-product-rail-scroll-distance', distanceValue)
        }

        const stickyTop = Number.parseFloat(getComputedStyle(railViewport).top) || 0
        const scrollDistance = totalDistance
          ? Math.max(0, Math.min(totalDistance, stickyTop - newReleasesRail.getBoundingClientRect().top))
          : 0
        railTrack.style.position = ''
        railTrack.style.top = ''
        railTrack.style.left = ''
        railTrack.style.transformOrigin = ''
        railTrack.style.transform = `translate3d(${-Math.min(scrollDistance, cardsDistance)}px, 0, 0)`
        if (endMessage) endMessage.style.top = ''
        if (endMessage && endMessageTrack && messageDistance > 0) {
          const messageProgress = Math.max(0, Math.min(1, (scrollDistance - cardsDistance) / messageDistance))
          const messageOffset = railWidth - messageProgress * endMessageTrack.scrollWidth
          if (scrollDistance >= cardsDistance) {
            const messageBottom = Number.parseFloat(getComputedStyle(endMessage).bottom) || 0
            const messageHeight = endMessage.offsetHeight
            const messageGap = 32
            const availableGridHeight = Math.max(0, railViewport.clientHeight - messageBottom - messageHeight - messageGap)
            const heightScale = railTrack.offsetHeight > 0
              ? availableGridHeight / railTrack.offsetHeight
              : 1
            const gridScale = Math.min(1, heightScale)
            const scaledGridHeight = railTrack.offsetHeight * gridScale
            railTrack.style.position = 'absolute'
            railTrack.style.top = `${Math.max(0, (availableGridHeight - scaledGridHeight) / 2)}px`
            railTrack.style.left = '50%'
            railTrack.style.transformOrigin = 'top center'
            railTrack.style.transform = `translateX(-50%) scale(${gridScale})`
          }
          endMessage.style.opacity = messageProgress > 0 ? '1' : '0'
          endMessageTrack.style.transform = `translate3d(${messageOffset}px, 0, 0)`
        }
        const progress = totalDistance ? scrollDistance / totalDistance : 0
        const progressPercent = Math.round(progress * 100)
        setNewReleasesProgress(previousProgress => previousProgress === progressPercent ? previousProgress : progressPercent)
      }

      const updateSectionProgress = (sectionSelector: string, itemSelector: string, setProgress: (progress: number) => void) => {
        const section = document.querySelector<HTMLElement>(sectionSelector)
        const header = section?.querySelector<HTMLElement>('.home-tops-editorial__header')
        const items = section?.querySelectorAll<HTMLElement>(itemSelector)
        if (!header || !items?.length) {
          setProgress(0)
          return
        }

        const progressLine = header.getBoundingClientRect().bottom
        const viewedItems = Array.from(items).filter(item => item.getBoundingClientRect().top < progressLine).length
        setProgress(Math.round((viewedItems / items.length) * 100))
      }

      updateSectionProgress('.home-section--tops', '.home-tops-editorial__grid > .minimalist-product-card', setTopsProgress)
      updateSectionProgress('.home-section--bottoms', '.home-tops-editorial__grid > .minimalist-product-card', setBottomsProgress)
      const keeperSection = document.querySelector<HTMLElement>('.home-section--keeper-circle')
      const keeperHeader = keeperSection?.querySelector<HTMLElement>('.home-tops-editorial__header')
      if (keeperSection && keeperHeader) {
        const sectionBounds = keeperSection.getBoundingClientRect()
        const headerBounds = keeperHeader.getBoundingClientRect()
        const progressRange = sectionBounds.height - headerBounds.height
        const progress = progressRange > 0
          ? Math.max(0, Math.min(1, (headerBounds.bottom - sectionBounds.top - headerBounds.height) / progressRange))
          : 0
        const progressPercent = Math.round(progress * 100)
        setKeeperCircleProgress(previousProgress => previousProgress === progressPercent ? previousProgress : progressPercent)
      } else {
        setKeeperCircleProgress(0)
      }
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    const railResizeObserver = new ResizeObserver(handleScroll)
    const rail = document.querySelector('.home-section--shop .minimalist-product-rail--scrollable')
    const railViewport = rail?.querySelector('.minimalist-product-rail__viewport')
    const railTrack = rail?.querySelector('.minimalist-product-rail__grid')
    if (railViewport) railResizeObserver.observe(railViewport)
    if (railTrack) railResizeObserver.observe(railTrack)
    return () => {
      railResizeObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [homeConfig.sections, products.length])

  return (
    <div className="home-page" style={{ background: BG, display: 'flex', flexDirection: 'column' }}>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {homeSections.map((section, sectionIndex) => section.type === 'hero' && <HeroSlider
        key={section.id}
        products={section.id === heroSection?.id ? heroProducts : availableHeroProducts.slice(0, 3)}
        onNavigate={onNavigate}
        backgroundImage={section.backgroundImage}
        overlayPosition={section.overlayPosition}
        overlayOpacity={section.overlayOpacity}
        style={{ order: sectionIndex }}
      />)}
      {heroSectionIndex >= 0 && <MarqueeBanner
        items={['IZLI — WEAR THE STORY', 'HERITAGE IN MOTION', 'MADE TO BE KEPT', 'FROM ROOTS TO NOW']}
        className="home-hero-marquee"
        style={{ order: heroSectionIndex + 0.5 }}
      />}
      {homeSections.map((section, sectionIndex) => section.type === 'new-releases' && <section key={section.id} className="home-section home-section--shop" style={{ order: sectionIndex }}>
        <TopBarSection
          title={section.title || 'New releases'}
          action={<PrimaryButton className="home-tops-editorial__cta" onClick={() => onNavigate('shop', 'new-releases')}>Shop new releases</PrimaryButton>}
          progress={newReleasesProgress}
        />
        <div className="home-shell">
          {section.description && <p className="home-shop-description">{section.description}</p>}
          <MinimalistProductRail
            products={displayedShopProducts}
            label="New releases"
            onNavigate={productId => onNavigate('product-detail', productId)}
            onProgressChange={setNewReleasesProgress}
            showProgress={false}
            scrollable
            endMessage="NOT JUST A NEW RELEASE. THE BEGINNING OF A STORY."
          />
        </div>
      </section>)}

      {homeSections.map((section, sectionIndex) => section.type === 'tops' && <section key={section.id} className="home-section home-section--tops" style={{ order: sectionIndex }}>
        <TopBarSection
          title={section.title || 'Tops'}
          action={<PrimaryButton className="home-tops-editorial__cta" onClick={() => onNavigate('shop')}>Shop tops</PrimaryButton>}
          progress={topsProgress}
        />
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
              {renderProductCards(productsForSection(section, availableTopsProducts))}
              {!productsLoading && productsForSection(section, availableTopsProducts).length === 0 && <p className="home-tops-editorial__empty">New products will be available soon.</p>}
            </div>
          </div>
        </div>
      </section>)}

      {homeSections.map((section, sectionIndex) => section.type === 'bottoms' && <section key={section.id} className="home-section home-section--bottoms" style={{ order: sectionIndex }}>
        <TopBarSection
          title={section.title || 'Bottoms'}
          action={<PrimaryButton className="home-tops-editorial__cta" onClick={() => onNavigate('shop')}>Shop bottoms</PrimaryButton>}
          progress={bottomsProgress}
        />
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
              {renderProductCards(productsForSection(section, availableBottomsProducts))}
              {!productsLoading && productsForSection(section, availableBottomsProducts).length === 0 && <p className="home-tops-editorial__empty">No Bottoms products are published yet.</p>}
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
          <TopBarSection
            title={section.title || 'KEEPER CIRCLE'}
            className="keeper-circle-topbar"
            progress={keeperCircleProgress}
            progressLabel="Benefits explored"
            action={<PrimaryButton className="home-tops-editorial__cta" onClick={() => onNavigate('keeper-circle')}>
              DISCOVER THE CIRCLE
            </PrimaryButton>}
          />
          <div className="home-keeper-editorial">
            <div className="keeper-circle-intro-row">
              <div className="keeper-circle-intro-row__image">
                <img src={KEEPER_CIRCLE_HOME_BANNER} alt="IZLI Keeper Circle members together" loading="lazy" decoding="async" />
              </div>
              <div className="keeper-circle-invitation">
                <span className="keeper-circle-invitation__eyebrow">A WELCOME GIFT FOR YOU</span>
                <h3>Your story begins here. <br />Enjoy 20% off.</h3>
                <p>Become a Keeper to unlock your welcome reward and get closer to every IZLI story.</p>
                <PrimaryButton className="keeper-circle-invitation__cta" onClick={() => onNavigate('keeper-circle')}>
                  BECOME A KEEPER
                </PrimaryButton>
              </div>
            </div>
            <div className="keeper-benefit-tabs" role="list" aria-label="Keeper Circle benefits">
              {(section.benefits ?? DEFAULT_HOME_PAGE_CONFIG.sections.find(item => item.type === 'keeper-circle')?.benefits ?? []).map((benefit, index) => (
                <article className="keeper-benefit-tabs__item" role="listitem" key={index}>
                  <div className="keeper-benefit-tabs__content">
                    <span className="keeper-benefit-tabs__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="keeper-benefit-tabs__label">{benefit.eyebrow}</span>
                    <h3 className="keeper-benefit-tabs__title">
                      <span>{benefit.titleLead}</span>
                      <span>{benefit.titleHighlight}</span>
                    </h3>
                    <p className="keeper-benefit-tabs__description">{benefit.description}</p>
                  </div>
                  <button
                    className="keeper-benefit-tabs__link"
                    type="button"
                    onClick={() => onNavigate('keeper-circle')}
                    aria-label={`Learn more about ${benefit.eyebrow}`}
                  >
                    <span>LEARN MORE</span>
                    <span className="keeper-benefit-tabs__link-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h13M12 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="home-instagram" aria-labelledby="home-instagram-title" style={{ order: homeSections.length + 1 }}>
        <div className="home-instagram__heading">
          <span>Follow on Instagram</span>
          <a id="home-instagram-title" href="https://www.instagram.com/izli.tn/" target="_blank" rel="noreferrer">
            @izli.tn
          </a>
        </div>
        {instagramPosts.length > 0 && (
          <div className="home-instagram__marquee" role="region" aria-label="IZLI Instagram posts">
            <div className="home-instagram__track">
              {[0, 1].map(copy => (
                <div className="home-instagram__group" key={copy} aria-hidden={copy === 1}>
                  {instagramPosts.map((post, index) => (
                    <a
                      className="home-instagram__post"
                      href="https://www.instagram.com/izli.tn/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${post.alt} on Instagram`}
                      key={`${copy}-${post.id}`}
                      tabIndex={copy === 1 ? -1 : undefined}
                    >
                      <img src={post.image} alt={copy === 0 ? post.alt : ''} loading="lazy" decoding="async" />
                      <span className="home-instagram__post-overlay" aria-hidden="true">
                        <Icon icon="line-md:instagram" />
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  )
}