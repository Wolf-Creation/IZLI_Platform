import { useEffect, useState } from 'react'
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
import Cart, { type CartItem, type CartItemInput, type WishlistItem } from './cart'
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
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('izli.cart') ?? '[]') as CartItem[] } catch { return [] }
  })
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('izli.wishlist') ?? '[]') as WishlistItem[] } catch { return [] }
  })
  const [scrollY, setScrollY] = useState(0)
  const [isIntroTransitioning, setIsIntroTransitioning] = useState(false)

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
      const existing = current.find(cartItem => cartItem.id === item.id && cartItem.size === item.size)
      if (existing) return current.map(cartItem => cartItem === existing ? { ...cartItem, qty: cartItem.qty + addedQuantity } : cartItem)
      return [...current, { ...item, qty: addedQuantity } as CartItem]
    })
  }

  const updateCartQuantity = (id: string, delta: number) => setCartItems(current => current.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
  const removeCartItem = (id: string) => setCartItems(current => current.filter(item => item.id !== id))
  const toggleWishlist = (item: CartItemInput) => setWishlistItems(current => current.some(existing => existing.id === item.id) ? current.filter(existing => existing.id !== item.id) : [...current, item])
  const removeWishlistItem = (id: string) => setWishlistItems(current => current.filter(item => item.id !== id))

  useEffect(() => {
    const syncPage = () => {
      setPage(websitePageFromPath(window.location.pathname))
      setProductId(window.location.pathname.startsWith('/product/') ? decodeURIComponent(window.location.pathname.split('/')[2] ?? '') : null)
      setCollectionSlug(window.location.pathname.startsWith('/collections/') ? decodeURIComponent(window.location.pathname.split('/')[2] ?? '') : null)
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

  const navigate = (p: WebPage, nextProductId?: string) => {
    const path = websitePathForPage(p, nextProductId)

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
    }

    setIsIntroTransitioning(true)
    setPage(p)
    setProductId(p === 'product-detail' ? nextProductId ?? null : null)
    setCollectionSlug(p === 'collection-detail' ? nextProductId ?? null : null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
      case 'collections':    return <Collections onNavigate={navigate} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={id => wishlistItems.some(item => item.id === id)} />
      case 'collection-detail': return <CollectionDetailPage slug={collectionSlug ?? ''} onNavigate={navigate} />
      case 'shop':           return <Shop onNavigate={navigate} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={id => wishlistItems.some(item => item.id === id)} />
      case 'product-detail': return <ProductDetail productId={productId} onNavigate={navigate} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={id => wishlistItems.some(item => item.id === id)} />
      case 'heritage':       return <Heritage onNavigate={navigate} />
      case 'stories':        return <Stories onNavigate={navigate} />
      case 'community':      return <Community onNavigate={navigate} />
      case 'community-lab':  return <CommunityLab onNavigate={navigate} />
      case 'events':         return <Events onNavigate={navigate} />
      case 'about':          return <About onNavigate={navigate} />
      case 'cart':           return <Cart items={cartItems} onNavigate={navigate} onUpdateQuantity={updateCartQuantity} onRemove={removeCartItem} />
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

  const showFooter = !PAGES_WITHOUT_FOOTER.includes(page)
  const showHeader = true
  const isHeroHomeStyle = page === 'home' || page === 'shop'

  return (
    <div className="website-app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isIntroTransitioning && <SplashScreen onComplete={() => setIsIntroTransitioning(false)} />}
      {showHeader && <HeroHeader onNavigate={navigate} scrollY={scrollY} isHomePage={isHeroHomeStyle} currentPage={page} cartCount={cartCount} wishlistCount={wishlistCount} onCart={() => navigate('cart')} onWishlist={() => navigate('wishlist')} />}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      {showFooter && <Footer onNavigate={navigate} showHomeAbout />}
      <WhatsAppContact />
    </div>
  )
}
