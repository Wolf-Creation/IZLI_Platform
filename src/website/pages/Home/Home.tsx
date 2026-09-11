import { BG, FONT_SERIF } from '../../../tokens'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import type { WebPage } from '../../types'
import { HeroSlider } from './Hero/HeroSlider'
import { HeroHeader } from '../../components/HeroHeader'
import { ScrollToTop } from '../../components/ScrollToTop'
import { SplashScreen } from '../../components/SplashScreen/SplashScreen'
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel'
import { KeeperCircleCta } from '../../components/KeeperCircleCta/KeeperCircleCta'
import tShirtsImage from '../../../assets/Website_img/Shop/categories/T-shirts.png'
import tafuktImage from '../../../assets/Website_img/Shop/tops/banner/TAFUKT_001.png'
import tafuktBottomsImage from '../../../assets/Website_img/Shop/tops/banner/TAFUKT_002.png'
import shirtsImage from '../../../assets/Website_img/Shop/categories/Shirts.png'
import bandanaImage from '../../../assets/Website_img/Shop/categories/bandana.png'
import pantsImage from '../../../assets/Website_img/Shop/categories/pants.png'
import bannerImage from '../../../assets/Website_img/banner/banner_001.png'
import topsAtlasPrincipal from '../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-Principal.png'
import topsAtlasDetail from '../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-A.png'
import topsAtlasBack from '../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-B.png'
import topsPortePrincipal from '../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-Principal.png'
import topsPorteDetail from '../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-A.png'
import topsPorteBack from '../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-B.png'
import keeperCircleImage from '../../../assets/Website_img/Keeper_circle/banner/banner_001.png'
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

const PRODUCTS_NEW_BASE = [
  { id: 'PRD-0008', name: 'Atlas Symbol Heavy Oversized', price: 65, release: 'Release 01', images: [] },
  { id: 'PRD-0054', name: 'Porte Ksour Heavy Oversized', price: 85, release: 'Release 01', images: [] },
]

const PRODUCTS_NEW = [...PRODUCTS_NEW_BASE, ...PRODUCTS_NEW_BASE, ...PRODUCTS_NEW_BASE]

const PRODUCTS_LAST = [
  { id: 'PRD-0016', name: 'Mountain Mark Crewneck', price: 125, release: 'Release 03', images: ['photo-1469334031218-e382a71b716b', 'photo-1523381210434-271e8be1f52b', 'photo-1617196034183-421b4040ed20'] },
  { id: 'PRD-0022', name: 'Loom Stripe Shirt', price: 145, release: 'Release 02', images: ['photo-1516762689617-e1cffcef479d', 'photo-1618354691373-d851c5c3a990', 'photo-1490481651871-ab68de25d43d'] },
  { id: 'PRD-0044', name: 'Essentials Straight Trouser', price: 115, release: 'Release 01', images: ['photo-1611312449408-fcece27cdbb7', 'photo-1521572163474-6864f9cf17ab', 'photo-1469334031218-e382a71b716b'] },
  { id: 'PRD-0051', name: 'Sahara Work Jacket', price: 285, release: 'Release 03', images: ['photo-1620799140408-edc6dcb6d633', 'photo-1617196034183-421b4040ed20', 'photo-1516762689617-e1cffcef479d'] },
  { id: 'PRD-0014', name: 'Tifinagh Frame Tee', price: 89, release: 'Release 01', images: ['photo-1523381210434-271e8be1f52b', 'photo-1490481651871-ab68de25d43d', 'photo-1618354691373-d851c5c3a990'] },
  { id: 'PRD-0031', name: 'Woven Sahara Overshirt', price: 175, release: 'Release 01', images: ['photo-1617196034183-421b4040ed20', 'photo-1469334031218-e382a71b716b', 'photo-1516762689617-e1cffcef479d'] },
  { id: 'PRD-0039', name: 'Community Lab Archive Jersey', price: 105, release: 'Release 02', images: ['photo-1521572163474-6864f9cf17ab', 'photo-1523381210434-271e8be1f52b', 'photo-1617196034183-421b4040ed20'] },
  { id: 'PRD-0048', name: 'Desert Denim Jacket', price: 195, release: 'Release 02', images: ['photo-1551028719-00167b16ebc5', 'photo-1551028727-430b22ef4ba2', 'photo-1551028719-00167b16ebc5'] },
  { id: 'PRD-0049', name: 'Archive Print Tee', price: 75, release: 'Release 03', images: ['photo-1553062407-98eeb64c6a62', 'photo-1523381210434-271e8be1f52b', 'photo-1618354691373-d851c5c3a990'] },
  { id: 'PRD-0050', name: 'Studio Knit Sweater', price: 135, release: 'Release 02', images: ['photo-1521572163474-6864f9cf17ab', 'photo-1550258987-920a2eae2e8d', 'photo-1516824750904-b878cd98c67c'] },
  { id: 'PRD-0052', name: 'Heritage Leather Belt', price: 85, release: 'Release 01', images: ['photo-1548036328-c9fa89d128fa', 'photo-1553062407-98eeb64c6a62', 'photo-1520256262607-b135b80006a1'] },
  { id: 'PRD-0053', name: 'Community Backpack', price: 165, release: 'Release 03', images: ['photo-1553338896-f4b87faa54d8', 'photo-1553062407-98eeb64c6a62', 'photo-1548036328-c9fa89d128fa'] },
]

const RELEASE_POINTS = ['Release 001 badge', '100 Keeper points', 'Exclusive archive access']

const TOP_PRODUCTS = [
  { name: 'Atlas Symbol Tee', color: 'Black', price: '65 TND', image: topsAtlasPrincipal },
  { name: 'Atlas Symbol Tee', color: 'Sand', price: '65 TND', image: topsAtlasDetail },
  { name: 'Atlas Symbol Tee', color: 'Charcoal', price: '65 TND', image: topsAtlasBack },
  { name: 'Porte Ksour Tee', color: 'Ecru', price: '85 TND', image: topsPortePrincipal },
  { name: 'Porte Ksour Tee', color: 'Marron', price: '85 TND', image: topsPorteDetail },
  { name: 'Porte Ksour Tee', color: 'Noir', price: '85 TND', image: topsPorteBack },
] as const

type KeeperTitleTone = 'primary' | 'accent' | 'muted'
type KeeperTitleSegment = { text: string; tone: KeeperTitleTone }
type KeeperTitleLine = KeeperTitleSegment[]

const KEEPER_BENEFITS = [
  {
    number: '01',
    title: [
      [{ text: 'BEFORE THE RELEASE.', tone: 'muted' }],
      [{ text: 'BEFORE EVERYONE ELSE.', tone: 'primary' }],
    ],
    eyebrow: 'FIRST ACCESS',
    copy: 'As a Keeper, you enter the release before the public. \n\nDiscover new pieces earlier, access limited drops, and secure your size before the collection reaches everyone else.',
    indicators: [['Discover', 'First'], ['Secure', 'Your Size'], ['Priority', 'Access']],
    closing: [''],
  },
  {
    number: '02',
    title: [
      [{ text: 'AS YOU RISE', tone: 'muted' }],
      [{ text: 'NEW DOORS OPEN.', tone: 'primary' }],
    ],
    eyebrow: 'EXCLUSIVE EXPERIENCES',
    copy: 'The circle opens onto the moments behind the collection. Meet the people, places, and stories that give each release its meaning.',
    indicators: [['Private', 'Events'], ['Members-Only', 'Experiences'], ['Status-Based', 'Access']],
    closing: [''],
  },
  {
    number: '03',
    title: [
      [{ text: 'GROW WITHIN.', tone: 'muted' }],
      [{ text: 'GO FURTHER.', tone: 'primary' }],
    ],
    eyebrow: 'IZLI COMMUNITY',
    copy: 'Every piece you choose, every story you share, and every moment you take part in helps shape your journey within the IZLI community. As you grow, your Keeper Status evolves — opening the way to deeper access and new experiences.',
    indicators: [['Grow', 'Your Status'], ['Share', ' the Story'], ['Carry', 'the Pieces']],
    closing: [''],
  },
] as const

const KEEPER_PANELS = [
  {
    number: '01',
    id: 'keeper-circle-introduction',
    title: [
      [
        { text: 'Get ', tone: 'muted' },
        { text: 'First Access ', tone: 'accent' },
        { text: 'to what comes next,', tone: 'muted' },
      ],
      [
        { text: 'Unlock ', tone: 'muted' },
        { text: 'Exclusive Experiences', tone: 'accent' },
        { text: ',', tone: 'muted' },
      ],
      [
        { text: 'and Become part of the ', tone: 'muted' },
        { text: 'IZLI Community', tone: 'accent' },
        { text: '.', tone: 'muted' },
      ],
    ] satisfies KeeperTitleLine[],
    eyebrow: '',
    copy: 'IZLI is more than what you wear. It gives its Keepers a closer connection to what comes next, experiences beyond the garment, and a place within a community carrying a shared heritage forward.',
    indicators: [],
    closing: ['', ''],
  },
  ...KEEPER_BENEFITS.map((benefit, index) => ({
    ...benefit,
    number: `0${index + 1}`,
    id: benefit.title.flat().map(segment => segment.text).join('-').toLowerCase(),
  })),
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

export default function Home({ onNavigate }: Props) {
  const [scrollY, setScrollY] = useState(0)
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState('new')
  const [activeKeeperBenefit, setActiveKeeperBenefit] = useState(0)
  const [introTitleRevealed, setIntroTitleRevealed] = useState(false)
  const keeperSectionRef = useRef<HTMLElement>(null)
  const introTitleRevealedRef = useRef(false)
  const introRevealCompleteRef = useRef(false)
  const keeperStepTransitionRef = useRef(false)
  const keeperReturnPendingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const section = keeperSectionRef.current
    if (!section) return

    const panels = Array.from(section.querySelectorAll<HTMLElement>('[data-keeper-panel]'))
    const observer = new IntersectionObserver(
      entries => {
        const visiblePanel = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => {
            const viewportCenter = window.innerHeight / 2
            const aCenter = a.boundingClientRect.top + a.boundingClientRect.height / 2
            const bCenter = b.boundingClientRect.top + b.boundingClientRect.height / 2
            return Math.abs(aCenter - viewportCenter) - Math.abs(bCenter - viewportCenter)
          })[0]
        const nextIndex = visiblePanel ? panels.indexOf(visiblePanel.target as HTMLElement) : -1
          if (nextIndex >= 0 && !keeperStepTransitionRef.current) {
            setActiveKeeperBenefit(currentIndex => currentIndex === nextIndex ? currentIndex : nextIndex)
          }
      },
      { threshold: [0.15, 0.35, 0.55, 0.75], rootMargin: '-32% 0px -32% 0px' },
    )

    panels.forEach(panel => observer.observe(panel))
    let wasKeeperSectionActive = false
    let wasKeeperSectionBelow = false

    const resetIntroReveal = () => {
      introTitleRevealedRef.current = false
      introRevealCompleteRef.current = false
      keeperStepTransitionRef.current = false
      setIntroTitleRevealed(false)
    }

    const resetKeeperCircle = () => {
      setActiveKeeperBenefit(0)
    }

    const handleKeeperSectionScroll = () => {
      const sectionRect = section.getBoundingClientRect()
      const headerHeight = document.querySelector<HTMLElement>('.hero-header')?.getBoundingClientRect().height ?? 83
      const isKeeperSectionActive = sectionRect.top <= headerHeight && sectionRect.bottom > headerHeight
      const keeperResetLine = window.innerHeight * 0.3
      const isKeeperSectionBelow = sectionRect.bottom <= keeperResetLine

      if (isKeeperSectionBelow) {
        keeperReturnPendingRef.current = true
        wasKeeperSectionBelow = true
        resetKeeperCircle()
      }

      if (wasKeeperSectionBelow && isKeeperSectionActive) {
        wasKeeperSectionBelow = false
        resetKeeperCircle()
        keeperStepTransitionRef.current = false
        keeperReturnPendingRef.current = false
      }

      if (wasKeeperSectionActive && !isKeeperSectionActive) {
        resetKeeperCircle()

        if (sectionRect.top > headerHeight) {
          resetIntroReveal()
        }
      }

      wasKeeperSectionActive = isKeeperSectionActive
    }

    const handleKeeperWheel = (event: WheelEvent) => {
      if (window.innerWidth <= 900 || Math.abs(event.deltaY) <= 8) return

      const sectionRect = section.getBoundingClientRect()
      const headerHeight = 83
      const keeperResetLine = window.innerHeight * 0.3
      const sectionIsEntering = event.deltaY > 0 && sectionRect.top > headerHeight && sectionRect.top < window.innerHeight
      if (sectionIsEntering) {
        event.preventDefault()
        if (keeperStepTransitionRef.current) return

        resetIntroReveal()
        setActiveKeeperBenefit(0)
        keeperStepTransitionRef.current = true
        window.scrollTo({
          top: window.scrollY + sectionRect.top - headerHeight,
          behavior: 'smooth',
        })
        window.setTimeout(() => {
          keeperStepTransitionRef.current = false
          keeperReturnPendingRef.current = false
        }, 850)
        return
      }

      if (event.deltaY < 0 && sectionRect.bottom <= keeperResetLine) {
        event.preventDefault()
        if (keeperStepTransitionRef.current) return

        resetIntroReveal()
        setActiveKeeperBenefit(0)
        keeperStepTransitionRef.current = true
        window.scrollTo({
          top: sectionRect.top + window.scrollY - headerHeight,
          behavior: 'auto',
        })
        window.setTimeout(() => {
          keeperStepTransitionRef.current = false
          keeperReturnPendingRef.current = false
        }, 850)
        return
      }

      const sectionIsActive = sectionRect.top <= headerHeight && sectionRect.bottom > headerHeight
      if (!sectionIsActive) return

      if (keeperStepTransitionRef.current) {
        event.preventDefault()
        return
      }

      const isScrollingDown = event.deltaY > 0
      if (isScrollingDown && !introRevealCompleteRef.current) {
        event.preventDefault()

        if (!introTitleRevealedRef.current) {
          introTitleRevealedRef.current = true
          setIntroTitleRevealed(true)
          keeperStepTransitionRef.current = true
          window.setTimeout(() => {
            introRevealCompleteRef.current = true
            keeperStepTransitionRef.current = false
          }, 620)
        }

        return
      }

      const viewportCenter = window.innerHeight / 2
      const currentIndex = panels.reduce((closestIndex, panel, index) => {
        const panelCenter = panel.getBoundingClientRect().top + panel.getBoundingClientRect().height / 2
        const closestPanel = panels[closestIndex]
        const closestCenter = closestPanel.getBoundingClientRect().top + closestPanel.getBoundingClientRect().height / 2
        return Math.abs(panelCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter) ? index : closestIndex
      }, 0)
      const nextIndex = currentIndex + (isScrollingDown ? 1 : -1)
      const nextPanel = panels[nextIndex]

      if (!nextPanel) return

      event.preventDefault()
      keeperStepTransitionRef.current = true
      setActiveKeeperBenefit(nextIndex)
      window.scrollTo({
        top: window.scrollY + nextPanel.getBoundingClientRect().top - headerHeight,
        behavior: 'smooth',
      })
      window.setTimeout(() => {
        keeperStepTransitionRef.current = false
      }, 800)
    }

    window.addEventListener('scroll', handleKeeperSectionScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('wheel', handleKeeperWheel)
      window.removeEventListener('scroll', handleKeeperSectionScroll)
    }
  }, [])

  const keeperHeaderHeight = 83
  const keeperSection = keeperSectionRef.current
  const keeperViewportHeight = Math.max(window.innerHeight - keeperHeaderHeight, 1)
  const keeperSectionTravel = Math.max((keeperSection?.offsetHeight ?? keeperViewportHeight) - keeperViewportHeight, 1)
  const keeperSectionProgress = Math.min(
    Math.max((scrollY - (keeperSection?.offsetTop ?? 0) + keeperHeaderHeight) / keeperSectionTravel, 0),
    1,
  )
  const keeperImageScale = 1 + keeperSectionProgress * 0.3

  return (
    <div className="home-page" style={{ background: BG }}>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <HeroHeader onNavigate={onNavigate} scrollY={scrollY} />
      <HeroSlider scrollY={scrollY} onNavigate={onNavigate} />

      <section className="home-section home-section--shop">
        <div className="home-shell">
          <div className="home-shop-tabs">
            <button className={`home-shop-tab ${activeTab === 'new' ? 'home-shop-tab--active' : ''}`} onClick={() => setActiveTab('new')}>
              New releases
            </button>
            <button className={`home-shop-tab ${activeTab === 'last' ? 'home-shop-tab--active' : ''}`} onClick={() => setActiveTab('last')}>
              Last releases
            </button>
          </div>

          <ProductCarousel products={activeTab === 'new' ? PRODUCTS_NEW : PRODUCTS_LAST} />
        </div>
      </section>

      <section className="home-section home-section--tops">
        <header className="home-tops-editorial__header">
          <div>
            <h2>Tops</h2>
          </div>
          <KeeperCircleCta onClick={() => onNavigate('shop')}>Shop tops</KeeperCircleCta>
        </header>
        <div className="home-tops-editorial">
          <div className="home-tops-editorial__visual">
            <img src={tafuktImage} alt="IZLI tops collection" />
            <div className="home-tops-editorial__visual-overlay" />
            <div className="home-tops-editorial__visual-caption">
              <span>Essential forms</span>
              <strong>Built for every day</strong>
            </div>
          </div>

          <div className="home-tops-editorial__products">
            <div className="home-tops-editorial__grid">
              {TOP_PRODUCTS.map(product => (
                <button key={`${product.name}-${product.color}`} type="button" className="home-tops-product-card" onClick={() => onNavigate('product-detail')}>
                  <span className="home-tops-product-card__image"><img src={product.image} alt={`${product.name} ${product.color}`} /></span>
                  <span className="home-tops-product-card__info">
                    <span>{product.name}</span>
                    <small>{product.color}</small>
                    <strong>{product.price}</strong>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section--bottoms">
        <header className="home-tops-editorial__header">
          <div>
            <h2>Bottoms</h2>
          </div>
          <KeeperCircleCta onClick={() => onNavigate('shop')}>Shop bottoms</KeeperCircleCta>
        </header>
        <div className="home-tops-editorial home-bottoms-editorial">
          <div className="home-tops-editorial__visual">
            <img src={tafuktBottomsImage} alt="IZLI bottoms collection" />
            <div className="home-tops-editorial__visual-overlay" />
            <div className="home-tops-editorial__visual-caption">
              <span>Grounded silhouettes</span>
              <strong>Made to move with you</strong>
            </div>
          </div>

          <div className="home-tops-editorial__products">
            <div className="home-tops-editorial__grid">
              {TOP_PRODUCTS.map(product => (
                <button key={`${product.name}-${product.color}`} type="button" className="home-tops-product-card" onClick={() => onNavigate('product-detail')}>
                  <span className="home-tops-product-card__image"><img src={product.image} alt={`${product.name} ${product.color}`} /></span>
                  <span className="home-tops-product-card__info">
                    <span>{product.name}</span>
                    <small>{product.color}</small>
                    <strong>{product.price}</strong>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section ref={keeperSectionRef} className="home-section home-section--keeper-circle">
        <div className="keeper-circle-layout">
          <div className="keeper-sticky-visual">
            <img src={keeperCircleImage} alt="Keeper Circle community" style={{ transform: `scale(${keeperImageScale})` }} />
            <div className="keeper-sticky-visual__overlay" aria-hidden="true" />
            <div className="keeper-sticky-visual__title">KEEPER CIRCLE</div>
            {/* <div className="keeper-sticky-visual__caption">The circle around the archive.</div> */}
          </div>

          <div className="keeper-scroll-content">
            {KEEPER_PANELS.map((benefit, benefitIndex) => (
              <article
                id={benefit.id}
                key={benefit.id}
                data-keeper-panel=""
                className={`keeper-benefit-panel ${benefitIndex === 0 ? `keeper-benefit-panel--intro ${introTitleRevealed ? 'keeper-benefit-panel--intro-revealed' : ''}` : ''} ${benefitIndex > 0 ? 'keeper-benefit-panel--exclusive' : ''} ${benefitIndex === KEEPER_PANELS.length - 1 ? 'keeper-benefit-panel--community' : ''} ${activeKeeperBenefit === benefitIndex ? 'is-active' : ''}`}
              >
                
                {benefitIndex > 0 && (
                  <div className="keeper-benefit-panel__eyebrow keeper-benefit-panel__eyebrow--badge">
                    {/* <span aria-hidden="true">✳</span> */}
                    {benefit.eyebrow}
                  </div>
                )}
                <h2 className="keeper-benefit-panel__title">
                  {benefit.title.map((line, lineIndex) => (
                    <span className="keeper-benefit-panel__title-line" key={lineIndex}>
                      {line.map((segment, segmentIndex) => (
                        <span className={`keeper-benefit-panel__title-segment keeper-benefit-panel__title-segment--${segment.tone}`} key={segmentIndex}>
                          {benefitIndex === 0 && segment.tone === 'accent'
                            ? [...segment.text].map((character, characterIndex) => (
                              <span
                                className="keeper-benefit-panel__title-character"
                                key={`${character}-${characterIndex}`}
                                style={{ transitionDelay: `${lineIndex * 100 + characterIndex * 12}ms` }}
                              >
                                {character === ' ' ? '\u00a0' : character}
                              </span>
                            ))
                            : segment.text}
                        </span>
                      ))}
                    </span>
                  ))}
                </h2>
                {/* {benefitIndex !== 1 && <p className="keeper-benefit-panel__eyebrow">{benefit.eyebrow}</p>} */}
                <div className="keeper-benefit-panel__copy">
                  {benefit.copy.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {benefit.indicators.length > 0 && (
                  <div className="keeper-benefit-panel__indicators">
                    {benefit.indicators.map(indicator => (
                      <div className="keeper-benefit-indicator" key={indicator.join('-')}>
                        <span className="keeper-benefit-indicator__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17M3.5 12h17" /></svg></span>
                        <span>{indicator.map(line => <strong key={line}>{line}</strong>)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {benefit.closing[0] && (
                  <>
                    <div className="keeper-benefit-panel__rule" />
                    <p className="keeper-benefit-panel__closing">{benefit.closing[0]}<strong>{benefit.closing[1]}</strong></p>
                  </>
                )}
                {benefitIndex === KEEPER_PANELS.length - 1 && (
                  <div className="keeper-benefit-panel__actions">
                    <KeeperCircleCta onClick={() => onNavigate('keeper-circle')}>
                      Discover the Circle
                    </KeeperCircleCta>
                    <KeeperCircleCta variant="secondary" onClick={() => onNavigate('login')}>
                      Become a Keeper
                    </KeeperCircleCta>
                  </div>
                )}
              </article>
            ))}
          </div>

          <nav className="keeper-scroll-indicator" aria-label="Keeper Circle benefits">
            <span className="keeper-scroll-indicator__line" aria-hidden="true" />
            {KEEPER_PANELS.map((benefit, index) => (
              <a
                className={activeKeeperBenefit === index ? 'is-active' : ''}
                href={`#${benefit.id}`}
                key={benefit.id}
                aria-label={index === 0 ? 'Introduction' : `Point ${benefit.number}`}
                onClick={event => {
                  event.preventDefault()
                  setActiveKeeperBenefit(index)
                  const targetPanel = document.getElementById(benefit.id)
                  const mainHeader = document.querySelector<HTMLElement>('.hero-header')
                  if (!targetPanel) return

                  const headerHeight = mainHeader?.getBoundingClientRect().height ?? 83
                  const targetTop = targetPanel.getBoundingClientRect().top + window.scrollY - headerHeight
                  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
                }}
              >
                {index === 0 ? <span className="keeper-scroll-indicator__dot" aria-hidden="true" /> : benefit.number}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}