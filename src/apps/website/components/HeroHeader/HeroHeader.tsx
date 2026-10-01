import { useState, useEffect } from 'react'
import type { WebPage } from '../../types'
import izliLogoText from '../../../../assets/logo/IZLI_logo_text.svg'
import './HeroHeader.scss'

interface Props {
  onNavigate: (page: WebPage) => void
  scrollY: number
  isHomePage?: boolean
  currentPage: WebPage
  cartCount: number
  wishlistCount: number
  onCart: () => void
  onWishlist: () => void
}

const MENU_ITEMS = [
  { label: 'IZLI', page: 'home' as WebPage },
  { label: 'Shop', page: 'shop' as WebPage },
  { label: 'Collections', page: 'collections' as WebPage },
  { label: 'Keeper Circle', page: 'keeper-circle' as WebPage },
  // { label: 'Legacy', page: 'legacy' as WebPage },
  // { label: 'Archives', page: 'archives' as WebPage },
  // { label: 'Stories', page: 'stories' as WebPage },
  // { label: 'Community', page: 'community' as WebPage },
]

interface AccountMenuProps {
  onProfile: () => void
  onLogout: () => void
}

function AccountMenu({ onProfile, onLogout }: AccountMenuProps) {
  return (
    <div className="hero-header__account-popover" role="menu">
      <button type="button" role="menuitem" onClick={onProfile}>Profile</button>
      <button type="button" role="menuitem" onClick={onLogout}>Log out</button>
    </div>
  )
}

export function HeroHeader({ onNavigate, currentPage, cartCount, wishlistCount, onCart, onWishlist }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const closeAccountMenu = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.hero-header__account-menu')) {
        setIsAccountMenuOpen(false)
      }
    }
    const closeAccountMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAccountMenuOpen(false)
    }

    document.addEventListener('mousedown', closeAccountMenu)
    document.addEventListener('keydown', closeAccountMenuOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeAccountMenu)
      document.removeEventListener('keydown', closeAccountMenuOnEscape)
    }
  }, [])

  const navigateFromMobileMenu = (page: WebPage) => {
    setIsMobileMenuOpen(false)
    onNavigate(page)
  }

  const navigateToMobileProfile = () => {
    setIsMobileMenuOpen(false)
    const isAuthenticated = Boolean(localStorage.getItem('izli.accessToken') && localStorage.getItem('izli.currentUser'))
    onNavigate(isAuthenticated ? 'profile' : 'keeper-circle-login')
  }

  // const currentSubmenu = isHomePage ? { label: 'IZLI', items: HOME_SUBMENU_ITEMS, triggerPage: 'home' as WebPage } : { label: 'Keeper Circle', items: KEEPER_SUBMENU_ITEMS, triggerPage: 'keeper-circle' as WebPage }

  const navigateToProfile = () => {
    const isAuthenticated = Boolean(localStorage.getItem('izli.accessToken') && localStorage.getItem('izli.currentUser'))
    setIsAccountMenuOpen(false)
    onNavigate(isAuthenticated ? 'profile' : 'keeper-circle-login')
  }

  const handleAccountClick = () => {
    const isAuthenticated = Boolean(localStorage.getItem('izli.accessToken') && localStorage.getItem('izli.currentUser'))
    if (!isAuthenticated) {
      setIsAccountMenuOpen(false)
      onNavigate('keeper-circle-login')
      return
    }

    setIsAccountMenuOpen(value => !value)
  }

  const logout = () => {
    localStorage.removeItem('izli.accessToken')
    localStorage.removeItem('izli.currentUser')
    setIsAccountMenuOpen(false)
    onNavigate('keeper-circle')
  }

  const isAuthenticated = Boolean(localStorage.getItem('izli.accessToken') && localStorage.getItem('izli.currentUser'))

  const isMenuItemActive = (page: WebPage) => {
    if (page === currentPage) return true
    if (page === 'shop') return currentPage === 'product-detail' || currentPage === 'cart'
    if (page === 'keeper-circle') return currentPage === 'profile' || currentPage === 'login' || currentPage === 'archives'
    return false
  }

  return (
    <header
      className="hero-header"
      style={{
        '--text-color': '#ffffff',
        zIndex: 1000,
      } as any}
    >
      <div className="hero-header__container">
        <div className="hero-header__mobile-bar">
          <button
            type="button"
            className="hero-header__mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
          </button>

          <button className="hero-header__mobile-brand" onClick={() => onNavigate('home')} aria-label="Back to home">
            <img className="hero-header__logo" src={izliLogoText} alt="" />
          </button>

          <div className="hero-header__mobile-actions">
            <button className="hero-header__mobile-action" onClick={onWishlist} aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}>
              <svg viewBox="0 0 24 24" fill={wishlistCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7"><path d="M7.25 3.75h9.5A1.75 1.75 0 0 1 18.5 5.5v14.75L12 16.4l-6.5 3.85V5.5a1.75 1.75 0 0 1 1.75-1.75Z" /></svg>
              {wishlistCount > 0 && <span className="hero-header__wishlist-badge">{wishlistCount}</span>}
            </button>
            <button className="hero-header__mobile-action hero-header__cart-action" onClick={onCart} aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 5h2l2.2 9.2a1.4 1.4 0 0 0 1.4 1.1h7.9a1.4 1.4 0 0 0 1.4-1.1L21 8H6.1" /><circle cx="10" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>
              {cartCount > 0 && <span className="hero-header__cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Left Menu */}
        <nav className="hero-header__menu">
          {MENU_ITEMS.map(item => (
            <button
              key={item.label}
              className={`hero-header__menu-item${isMenuItemActive(item.page) ? ' is-active' : ''}`}
              onClick={() => onNavigate(item.page)}
            >
              {item.label}
              {item.page === 'keeper-circle' && <span className="hero-header__discover-badge">Discover</span>}
            </button>
          ))}
          {/* <div className="hero-header__submenu-wrap">
            <button
              type="button"
              className="hero-header__menu-item hero-header__menu-item--submenu"
              onClick={() => onNavigate(currentSubmenu.triggerPage)}
            >
              {currentSubmenu.label}
            </button>
            <div className="hero-header__submenu" aria-label={`${currentSubmenu.label} submenu`}>
              {currentSubmenu.items.map(item => (
                <button key={item.label} type="button" onClick={() => onNavigate(item.page)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div> */}
        </nav>

        {/* Center Brand - Logo */}
        <div className="hero-header__brand">
          <button type="button" className="hero-header__brand-button" onClick={() => onNavigate('home')} aria-label="Back to home">
            <img className="hero-header__logo" src={izliLogoText} alt="" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="hero-header__icons">
          <button className={`hero-header__icon${wishlistCount > 0 ? ' is-active' : ''}`} title="Wishlist" aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`} onClick={onWishlist}>
            <svg viewBox="0 0 24 24" fill={wishlistCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M7.25 3.75h9.5A1.75 1.75 0 0 1 18.5 5.5v14.75L12 16.4l-6.5 3.85V5.5a1.75 1.75 0 0 1 1.75-1.75Z" />
            </svg>
            {wishlistCount > 0 && <span className="hero-header__wishlist-badge">{wishlistCount}</span>}
          </button>
          <button className="hero-header__icon hero-header__cart-action" title="Cart" onClick={onCart} aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="hero-header__cart-badge">{cartCount}</span>}
          </button>
          <div className="hero-header__account-menu">
            <button className="hero-header__icon" title="Account" aria-label="Account" onClick={handleAccountClick} aria-expanded={isAccountMenuOpen} aria-haspopup="menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            {isAccountMenuOpen && <AccountMenu onProfile={navigateToProfile} onLogout={logout} />}
          </div>
        </div>
      </div>

      <div className={`hero-header__mobile-panel ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="hero-header__mobile-panel-top">
          <span>IZLI / MENU</span>
          <button type="button" className="hero-header__mobile-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
        <div className="hero-header__mobile-panel-body">
          <nav className="hero-header__mobile-nav" aria-label="Mobile navigation">
            {MENU_ITEMS.map(item => (
              <button key={item.label} type="button" className={isMenuItemActive(item.page) ? 'is-active' : ''} onClick={() => navigateFromMobileMenu(item.page)}>
                <span>{item.label}{item.page === 'keeper-circle' && <small className="hero-header__mobile-discover-badge">Discover</small>}</span>
                <b aria-hidden="true">↗</b>
              </button>
            ))}
          </nav>
          <div className="hero-header__mobile-account-actions">
            <button type="button" className="hero-header__mobile-profile" onClick={navigateToMobileProfile}>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="7" r="3.5" /><path d="M5 20c1.2-4 12.8-4 14 0" /></svg>
                {isAuthenticated ? 'Profile' : 'Join our Keeper Circle'}
              </span>
              <b aria-hidden="true">↗</b>
            </button>
            {isAuthenticated && <button type="button" className="hero-header__mobile-logout" onClick={() => { setIsMobileMenuOpen(false); logout() }}>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M21 3v18" /></svg>
                Log out
              </span>
            </button>}
          </div>
        </div>
        <div className="hero-header__mobile-panel-footer">A contemporary universe inspired by Amazigh heritage.</div>
      </div>
    </header>
  )
}
