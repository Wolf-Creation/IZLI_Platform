import { useState } from 'react'
import type { WebPage } from './types'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Heritage from './pages/Heritage'
import Stories from './pages/Stories'
import Community from './pages/Community'
import CommunityLab from './pages/CommunityLab'
import Events from './pages/Events'
import About from './pages/About'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Legacy from './pages/Legacy'
import Archives from './pages/Archives'
import KeeperCircle from './pages/KeeperCircle'

const PAGES_WITHOUT_FOOTER: WebPage[] = ['login']

export default function WebsiteApp() {
  const [page, setPage] = useState<WebPage>('home')
  const [cartCount] = useState(2)

  const navigate = (p: WebPage) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (page) {
      case 'home':           return <Home onNavigate={navigate} />
      case 'collections':    return <Collections onNavigate={navigate} />
      case 'shop':           return <Shop onNavigate={navigate} />
      case 'product-detail': return <ProductDetail onNavigate={navigate} />
      case 'heritage':       return <Heritage onNavigate={navigate} />
      case 'stories':        return <Stories onNavigate={navigate} />
      case 'community':      return <Community onNavigate={navigate} />
      case 'community-lab':  return <CommunityLab onNavigate={navigate} />
      case 'events':         return <Events onNavigate={navigate} />
      case 'about':          return <About onNavigate={navigate} />
      case 'cart':           return <Cart onNavigate={navigate} />
      case 'login':          return <Login onNavigate={navigate} />
      case 'profile':        return <Profile onNavigate={navigate} />
      case 'legacy':         return <Legacy onNavigate={navigate} />
      case 'archives':       return <Archives onNavigate={navigate} />
      case 'keeper-circle':  return <KeeperCircle onNavigate={navigate} />
      default:               return <Home onNavigate={navigate} />
    }
  }

  const showFooter = !PAGES_WITHOUT_FOOTER.includes(page)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar current={page} onNavigate={navigate} cartCount={cartCount} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  )
}
