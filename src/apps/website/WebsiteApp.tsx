import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { WebPage } from './types'
import { HeroHeader } from './components/HeroHeader/HeroHeader'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Collections from './pages/Collections/Collections'
import CollectionDetailPage from './pages/Collections/CollectionDetailPage'
import Shop from './pages/Shop/Shop'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Heritage from './pages/Heritage/Heritage'
import Stories from './pages/Stories/Stories'
import Community from './pages/Community/Community'
import CommunityLab from './pages/CommunityLab/CommunityLab'
import Events from './pages/Events/Events'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Legacy from './pages/Legacy/Legacy'
import Archives from './pages/Archives/Archives'
import KeeperCircle from './pages/KeeperCircle/KeeperCircle'
import QrProduct from './pages/QrProduct/QrProduct'
import NotFoundPage from '../../shared/components/NotFoundPage'
import { websitePageFromPath, websitePathForPage } from '../../routes/website'
import type { User } from '../../entities'
import { SplashScreen } from './components/SplashScreen/SplashScreen'
import { trackCtaClick, trackPageView } from '../../shared/services/analytics'
import { WhatsAppContact } from './components/ScrollToTop'
import { CartDrawer } from './components/CartDrawer/CartDrawer'
import Cart, { type CartItem, type CartItemInput, type WishlistItem } from './cart.tsx'
import Wishlist from './pages/Wishlist/Wishlist'
import './WebsiteTheme.scss'

const PAGES_WITHOUT_FOOTER: WebPage[] = ['login', 'keeper-circle-login']

interface Props {
  onAdminRequest?: () => void
}

const getTrackingId = (key: string) => {
  const storage = key.includes('Session') ? sessionStorage : localStorage
  const existing = storage.getItem(key)
  if (existing) return existing
  const value = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  storage.setItem(key, value)
  return value
}

export default function WebsiteApp({ onAdminRequest }: Props) {
  const [page, setPage] = useState<WebPage>(() => websitePageFromPath(window.location.pathname))
  const [productId, setProductId] = useState<string | null>(() => window.location.pathname.startsWith('/product/') ? decodeURIComponent(window.location.pathname.split('/')[2] ?? '') : null)
  const [collectionSlug, setCollectionSlug] = useState<string | null>(() => window.location.pathname.startsWith('/collections/') ? decodeURIComponent(window.location.pathname.split('/')[2] ?? '') : null)
  const [shopFilter, setShopFilter] = useState(() => new URLSearchParams(window.location.search).get('filter') ?? '')
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('izli.cart') ?? '[]') as CartItem[] } catch { return [] }
  })
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('izli.wishlist') ?? '[]') as WishlistItem[] } catch { return [] }
  })
  const [scrollY, setScrollY] = useState(0)
  const [isIntroTransitioning, setIsIntroTransitioning] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [page, productId, collectionSlug, shopFilter])

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches) return

    let animationFrame = 0
    let lastFrameTime = 0
    let targetY = window.scrollY

    const canScrollWithinTarget = (target: EventTarget | null, deltaY: number) => {
      let element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null

      while (element && element !== document.body) {
        const { overflowY } = window.getComputedStyle(element)
        if ((overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight) {
          const canContinue = deltaY > 0
            ? element.scrollTop + element.clientHeight < element.scrollHeight
            : element.scrollTop > 0
          if (canContinue) return true
        }
        element = element.parentElement
      }

      return false
    }

    const animateScroll = (now: number) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetY = Math.max(0, Math.min(targetY, maxScroll))
      const currentY = window.scrollY
      const distance = targetY - currentY
      const elapsed = lastFrameTime ? Math.min(now - lastFrameTime, 32) : 16
      const progress = 1 - Math.exp(-elapsed / 180)

      if (Math.abs(distance) > 0.5) {
        window.scrollTo({
          top: currentY + distance * progress,
          behavior: 'instant',
        })
        lastFrameTime = now
        animationFrame = window.requestAnimationFrame(animateScroll)
      } else {
        window.scrollTo({ top: targetY, behavior: 'instant' })
        animationFrame = 0
        lastFrameTime = 0
      }
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX) || canScrollWithinTarget(event.target, event.deltaY)) return

      const delta = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? event.deltaY * 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? event.deltaY * window.innerHeight
          : event.deltaY
      const scrollStep = Math.sign(delta) * Math.min(Math.abs(delta), Math.min(96, window.innerHeight * 0.14))
      const currentY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      if ((currentY <= 0 && scrollStep < 0) || (currentY >= maxScroll && scrollStep > 0)) return

      event.preventDefault()
      if (!animationFrame) targetY = currentY
      targetY = Math.max(0, Math.min(targetY + scrollStep, maxScroll))
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animateScroll)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    const main = document.querySelector('.website-app main')
    if (!main || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = [
      'section',
      'article',
      'figure',
      '.izli-product-card',
      '.collections-directory__item',
      '.home-collections-story-card',
      '.keeper-benefit-tabs__item',
      '.product-detail-campaign__images img',
      '.product-detail-gallery__feature-grid > div',
      '.hero-slider',
      '.hero-slider__content',
      '.hero-slider__products',
      '[class*="card"]',
      '[class*="tile"]',
    ].join(', ')
    const cardOrTileClass = /(?:__|-)(?:card|tile)(?:$|--)/
    const isRevealTarget = (element: Element) => {
      if (element.matches('section, article, figure, .izli-product-card, .collections-directory__item, .home-collections-story-card, .keeper-benefit-tabs__item, .product-detail-campaign__images img, .product-detail-gallery__feature-grid > div, .hero-slider, .hero-slider__content, .hero-slider__products')) return true
      return Array.from(element.classList).some(className => cardOrTileClass.test(className))
    }
    const observeTarget = (element: Element) => {
      if (element.hasAttribute('data-scroll-reveal') || !isRevealTarget(element)) return
      element.setAttribute('data-scroll-reveal', element.tagName === 'SECTION' ? 'section' : 'item')
    }
    const observeTargets = (root: Element) => {
      if (root.matches(targets)) observeTarget(root)
      root.querySelectorAll(targets).forEach(observeTarget)
    }
    const revealVisibleTargets = () => {
      const revealBoundary = window.innerHeight * 0.88
      main.querySelectorAll('[data-scroll-reveal]:not(.is-scroll-visible)').forEach(element => {
        const bounds = element.getBoundingClientRect()
        if (bounds.top <= revealBoundary && bounds.bottom > 0) element.classList.add('is-scroll-visible')
      })
    }
    const mutations = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node instanceof Element) observeTargets(node)
      }))
      revealVisibleTargets()
    })

    observeTargets(main)
    mutations.observe(main, { childList: true, subtree: true })
    window.addEventListener('scroll', revealVisibleTargets, { passive: true })
    revealVisibleTargets()
    return () => {
      window.removeEventListener('scroll', revealVisibleTargets)
      mutations.disconnect()
    }
  }, [page, productId, collectionSlug, shopFilter])

  useEffect(() => {
    localStorage.setItem('izli.cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('izli.wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0)
  const wishlistCount = wishlistItems.length

  const addToCart = (item: CartItemInput) => {
    const addedQuantity = item.qty ?? 1
    setCartItems(current => {
      const existing = current.find(cartItem => cartItem.id === item.id && cartItem.size === item.size && cartItem.colorId === item.colorId)
      if (existing) return current.map(cartItem => cartItem === existing ? { ...cartItem, qty: cartItem.qty + addedQuantity } : cartItem)
      return [...current, { ...item, qty: addedQuantity } as CartItem]
    })
  }

  const updateCartQuantity = (id: string, size: string, delta: number, colorId?: string) => setCartItems(current => current.map(item => item.id === id && item.size === size && item.colorId === colorId ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
  const removeCartItem = (id: string, size: string, colorId?: string) => setCartItems(current => current.filter(item => item.id !== id || item.size !== size || item.colorId !== colorId))
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), [])
  const toggleWishlist = (item: CartItemInput) => setWishlistItems(current => current.some(existing => existing.id === item.id) ? current.filter(existing => existing.id !== item.id) : [...current, item])
  const removeWishlistItem = (id: string) => setWishlistItems(current => current.filter(item => item.id !== id))

  useEffect(() => {
    const syncPage = () => {
      setPage(websitePageFromPath(window.location.pathname))
      setProductId(window.location.pathname.startsWith('/product/') ? decodeURIComponent(window.location.pathname.split('/')[2] ?? '') : null)
      setCollectionSlug(window.location.pathname.startsWith('/collections/') ? decodeURIComponent(window.location.pathname.split('/')[2] ?? '') : null)
      setShopFilter(new URLSearchParams(window.location.search).get('filter') ?? '')
    }

    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const visitorId = getTrackingId('izli.analyticsVisitorId')
    const sessionId = getTrackingId('izli.analyticsSessionId')
    void trackPageView({ page: window.location.pathname, visitorId, sessionId })
  }, [page, productId])

  useEffect(() => {
    const handleCtaClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const cta = target.closest<HTMLElement>('[data-analytics-cta]')
      if (!cta) return
      void trackCtaClick({
        page: window.location.pathname,
        cta: cta.dataset.analyticsCta ?? 'cta',
        visitorId: getTrackingId('izli.analyticsVisitorId'),
        sessionId: getTrackingId('izli.analyticsSessionId'),
      })
    }

    document.addEventListener('click', handleCtaClick)
    return () => document.removeEventListener('click', handleCtaClick)
  }, [])

  const navigate = (p: WebPage, routeParam?: string) => {
    const path = websitePathForPage(p, routeParam)
    const query = p === 'shop' && routeParam === 'new-releases' ? '?filter=new-releases' : ''
    const destination = `${path}${query}`

    if (`${window.location.pathname}${window.location.search}` !== destination) {
      window.history.pushState({}, '', destination)
    }

    setIsIntroTransitioning(p !== 'cart')
    setPage(p)
    setProductId(p === 'product-detail' ? routeParam ?? null : null)
    setCollectionSlug(p === 'collection-detail' ? routeParam ?? null : null)
    setShopFilter(p === 'shop' && routeParam === 'new-releases' ? routeParam : '')
  }

  const handleAuthenticated = (user: User) => {
    if (user.role === 'admin') {
      onAdminRequest?.()
      return
    }

    navigate('profile')
  }

  const renderPage = () => {
    switch (page) {
      case 'not-found': return <NotFoundPage onReturnHome={() => navigate('home')} />
      case 'home':           return <Home onNavigate={navigate} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={id => wishlistItems.some(item => item.id === id)} />
      case 'collections':    return <Collections onNavigate={navigate} />
      case 'collection-detail': return <CollectionDetailPage slug={collectionSlug ?? ''} onNavigate={navigate} onToggleWishlist={toggleWishlist} isWishlisted={id => wishlistItems.some(item => item.id === id)} />
      case 'shop':           return <Shop initialFilter={shopFilter} onNavigate={navigate} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={id => wishlistItems.some(item => item.id === id)} />
      case 'product-detail': return <ProductDetail productId={productId} onNavigate={navigate} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={id => wishlistItems.some(item => item.id === id)} />
      case 'heritage':       return <Heritage onNavigate={navigate} />
      case 'stories':        return <Stories onNavigate={navigate} />
      case 'community':      return <Community onNavigate={navigate} />
      case 'community-lab':  return <CommunityLab onNavigate={navigate} />
      case 'events':         return <Events onNavigate={navigate} />
      case 'about':          return <About onNavigate={navigate} />
      case 'cart':           return <Cart items={cartItems} onNavigate={navigate} onUpdateQuantity={updateCartQuantity} onRemove={removeCartItem} onClearCart={() => setCartItems([])} />
      case 'wishlist':       return <Wishlist items={wishlistItems} onNavigate={navigate} onAddToCart={addToCart} onRemove={removeWishlistItem} />
      case 'login':          return <Login onNavigate={navigate} onAuthenticated={handleAuthenticated} />
      case 'profile':        return <Profile onNavigate={navigate} />
      case 'legacy':         return <Legacy onNavigate={navigate} />
      case 'archives':       return <Archives onNavigate={navigate} />
      case 'keeper-circle':  return <KeeperCircle onNavigate={navigate} requireAuth={false} />
      case 'keeper-circle-login': return <KeeperCircle onNavigate={navigate} requireAuth />
      case 'qr-product':    return <QrProduct qrNumber={decodeURIComponent(window.location.pathname.split('/').pop() || '')} onNavigate={navigate} />
      default:               return <Home onNavigate={navigate} onAddToCart={addToCart} />
    }
  }

  const showFooter = page !== 'cart' && !PAGES_WITHOUT_FOOTER.includes(page)
  const showHeader = page !== 'cart'
  const isHeroHomeStyle = page === 'home' || page === 'shop'

  return (
    <div className={`website-app${page === 'home' ? ' website-app--home' : ''}${page === 'cart' ? ' website-app--checkout' : ''}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isIntroTransitioning && <SplashScreen onComplete={() => setIsIntroTransitioning(false)} />}
      {showHeader && <HeroHeader onNavigate={navigate} scrollY={scrollY} isHomePage={page === 'home'} currentPage={page} cartCount={cartCount} wishlistCount={wishlistCount} onCart={() => setIsCartDrawerOpen(true)} onWishlist={() => navigate('wishlist')} />}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      {showFooter && <Footer onNavigate={navigate} showHomeAbout />}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        items={cartItems}
        onClose={closeCartDrawer}
        onCheckout={() => {
          closeCartDrawer()
          navigate('cart')
        }}
        onViewProduct={productId => {
          closeCartDrawer()
          navigate('product-detail', productId)
        }}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeCartItem}
        onClearCart={() => setCartItems([])}
      />
      {page !== 'cart' && <WhatsAppContact />}
    </div>
  )
}
