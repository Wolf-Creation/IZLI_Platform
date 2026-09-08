import { useState, useEffect } from 'react'
import type { WebPage } from '../../types'
import './HeroHeader.scss'

interface Props {
  onNavigate: (page: WebPage) => void
  scrollY: number
  isHomePage?: boolean
}

const MENU_ITEMS = [
  { label: 'Shop', page: 'shop' as WebPage },
  { label: 'Collections', page: 'collections' as WebPage },
  // { label: 'Legacy', page: 'legacy' as WebPage },
  // { label: 'Archives', page: 'archives' as WebPage },
  // { label: 'Stories', page: 'stories' as WebPage },
  { label: 'Community', page: 'community' as WebPage },
  { label: 'Keeper Circle', page: 'keeper-circle' as WebPage },
]

const TRANSITION_DISTANCE = 350 // Same as animation distance in NewHero

export function HeroHeader({ onNavigate, scrollY, isHomePage = true }: Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // On non-home pages, always show scrolled state
  const effectiveScrollY = isHomePage ? scrollY : 350

  // Calculate background opacity progress (0 to 1)
  const headerBgProgress = Math.min(Math.max(effectiveScrollY / TRANSITION_DISTANCE, 0), 1)

  // Text color transition: white (0) to black (1)
  const textColorR = Math.round(255 - (255 - 0) * headerBgProgress)
  const textColorG = Math.round(255 - (255 - 0) * headerBgProgress)
  const textColorB = Math.round(255 - (255 - 0) * headerBgProgress)
  const textColor = headerBgProgress < 0.1 ? '#ffffff' : `rgb(${textColorR}, ${textColorG}, ${textColorB})`

  useEffect(() => {
    setIsScrolled(isHomePage ? scrollY > 100 : true)
  }, [scrollY, isHomePage])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navigateFromMobileMenu = (page: WebPage) => {
    setIsMobileMenuOpen(false)
    onNavigate(page)
  }

  return (
    <header
      className={`hero-header ${isScrolled ? 'hero-header--scrolled' : ''}`}
      style={{
        background: `rgba(245, 239, 232, ${headerBgProgress})`,
        backdropFilter: headerBgProgress > 0 ? `blur(${10 * headerBgProgress}px)` : 'none',
        borderBottom: `1px solid rgba(0, 0, 0, ${headerBgProgress * 0.1})`,
        boxShadow: `0 2px 8px rgba(0, 0, 0, ${headerBgProgress * 0.08})`,
        transition: 'none',
        '--text-color': textColor,
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
            <svg className="hero-header__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 313.12 313.12">
              <g><rect className="hero-header__logo-line" x="-2.32" y="78.42" width="165.9" height="4.4" transform="translate(-33.39 80.62) rotate(-45)"/><rect className="hero-header__logo-line" x="230.31" y="-2.33" width="4.4" height="165.9" transform="translate(11.1 188.02) rotate(-45)"/><rect className="hero-header__logo-line" x="149.54" y="230.31" width="165.9" height="4.4" transform="translate(-96.31 232.5) rotate(-45)"/><rect className="hero-header__logo-line" x="78.41" y="149.55" width="4.4" height="165.93" transform="translate(-140.8 125.1) rotate(-45)"/><rect className="hero-header__logo-accent" x="147.36" y="3.81" width="18.4" height="18.4" transform="translate(36.66 114.51) rotate(-45)"/><rect className="hero-header__logo-accent" x="3.81" y="147.36" width="18.4" height="18.4" transform="translate(-106.9 55.05) rotate(-45)"/><rect className="hero-header__logo-accent" x="147.36" y="290.91" width="18.4" height="18.4" transform="translate(-166.37 198.63) rotate(-45)"/><rect className="hero-header__logo-accent" x="290.91" y="147.36" width="18.4" height="18.4" transform="translate(-22.8 258.07) rotate(-45)"/><polygon className="hero-header__logo-accent" points="189.56 187.75 189.61 129.87 218.82 158.45 189.56 187.75"/><polygon className="hero-header__logo-line" points="163.53 249.61 163.53 75.95 178.94 75.95 178.94 212.41 232.9 158.45 216.41 141.97 227.31 131.07 254.69 158.45 163.53 249.61"/><polygon className="hero-header__logo-accent" points="123.56 125.37 123.51 183.25 94.3 154.67 123.56 125.37"/><polygon className="hero-header__logo-line" points="149.59 237.17 134.18 237.17 134.18 100.72 80.23 154.67 96.71 171.15 85.81 182.05 58.43 154.67 149.59 63.51 149.59 237.17"/></g>
            </svg>
          </button>

          <div className="hero-header__mobile-actions">
            <button className="hero-header__mobile-action" onClick={() => onNavigate('login')} aria-label="Account">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="7" r="3.5"/><path d="M5 20c1.2-4 12.8-4 14 0"/></svg>
            </button>
            <button className="hero-header__mobile-action" onClick={() => onNavigate('cart')} aria-label="Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 5h2l2.2 9.2a1.4 1.4 0 0 0 1.4 1.1h7.9a1.4 1.4 0 0 0 1.4-1.1L21 8H6.1"/><circle cx="10" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>
            </button>
          </div>
        </div>

        {/* Left Menu */}
        <nav className="hero-header__menu">
          {MENU_ITEMS.map(item => (
            <button
              key={item.label}
              className="hero-header__menu-item"
              onClick={() => onNavigate(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Center Brand - Logo */}
        <button className="hero-header__brand" onClick={() => onNavigate('home')} aria-label="Back to home" style={{ cursor: 'pointer' }}>
          <svg className="hero-header__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 313.12 313.12">
            <g id="Calque_2" data-name="Calque 2">
              <g id="Calque_1-2" data-name="Calque 1">
                <rect className="hero-header__logo-line" x="-2.32" y="78.42" width="165.9" height="4.4" transform="translate(-33.39 80.62) rotate(-45)"/>
                <rect className="hero-header__logo-line" x="230.31" y="-2.33" width="4.4" height="165.9" transform="translate(11.1 188.02) rotate(-45)"/>
                <rect className="hero-header__logo-line" x="149.54" y="230.31" width="165.9" height="4.4" transform="translate(-96.31 232.5) rotate(-45)"/>
                <rect className="hero-header__logo-line" x="78.41" y="149.55" width="4.4" height="165.93" transform="translate(-140.8 125.1) rotate(-45)"/>
                <rect className="hero-header__logo-line" x="6" y="85.64" width="165.9" height="6.6" transform="translate(-36.84 88.94) rotate(-45)"/>
                <rect className="hero-header__logo-line" x="220.87" y="6.01" width="6.6" height="165.9" transform="translate(2.75 184.57) rotate(-45)"/>
                <rect className="hero-header__logo-line" x="141.2" y="220.86" width="165.9" height="6.6" transform="translate(-92.86 224.15) rotate(-45)"/>
                <rect className="hero-header__logo-line" x="85.66" y="141.21" width="6.6" height="165.93" transform="translate(-132.46 128.56) rotate(-45)"/>
                <rect className="hero-header__logo-accent" x="147.36" y="3.81" width="18.4" height="18.4" transform="translate(36.66 114.51) rotate(-45)"/>
                <rect className="hero-header__logo-accent" x="3.81" y="147.36" width="18.4" height="18.4" transform="translate(-106.9 55.05) rotate(-45)"/>
                <rect className="hero-header__logo-accent" x="147.36" y="290.91" width="18.4" height="18.4" transform="translate(-166.37 198.63) rotate(-45)"/>
                <rect className="hero-header__logo-accent" x="290.91" y="147.36" width="18.4" height="18.4" transform="translate(-22.8 258.07) rotate(-45)"/>
                <polygon className="hero-header__logo-accent" points="189.56 187.75 189.61 129.87 218.82 158.45 189.56 187.75"/>
                <polygon className="hero-header__logo-line" points="163.53 249.61 163.53 75.95 178.94 75.95 178.94 212.41 232.9 158.45 216.41 141.97 227.31 131.07 254.69 158.45 163.53 249.61"/>
                <polygon className="hero-header__logo-accent" points="123.56 125.37 123.51 183.25 94.3 154.67 123.56 125.37"/>
                <polygon className="hero-header__logo-line" points="149.59 237.17 134.18 237.17 134.18 100.72 80.23 154.67 96.71 171.15 85.81 182.05 58.43 154.67 149.59 63.51 149.59 237.17"/>
              </g>
            </g>
          </svg>
        </button>

        {/* Right Icons */}
        <div className="hero-header__icons">
          <button className="hero-header__icon" title="Favorites" aria-label="Favorites">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="hero-header__icon" title="Account" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button className="hero-header__icon" title="Cart" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`hero-header__mobile-panel ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="hero-header__mobile-panel-top">
          <span>IZLI / MENU</span>
          <button type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">Close</button>
        </div>
        <nav className="hero-header__mobile-nav" aria-label="Mobile navigation">
          {MENU_ITEMS.map(item => (
            <button key={item.label} type="button" onClick={() => navigateFromMobileMenu(item.page)}>
              <span>{item.label}</span>
              <b aria-hidden="true">↗</b>
            </button>
          ))}
        </nav>
        <div className="hero-header__mobile-panel-footer">A contemporary universe inspired by Amazigh heritage.</div>
      </div>
    </header>
  )
}
