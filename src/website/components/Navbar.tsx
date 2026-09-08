import { useEffect, useState } from 'react'
import { INDIGO, TEXT_SEC, BORDER, SURFACE, CREAM, CLAY, FONT_SANS } from '../../tokens'
import type { WebPage } from '../types'
import izliLogoSvg from '../../assets/logo/IZLI_logo.svg?raw'
import './Navbar.scss'

interface Props {
  current: WebPage
  onNavigate: (p: WebPage) => void
  cartCount?: number
}

const NAV_LINKS: { label: string; page: WebPage }[] = [
  { label: 'Shop', page: 'shop' },
  { label: 'Collections', page: 'collections' },
  { label: 'Legacy', page: 'legacy' },
  { label: 'Archives', page: 'archives' },
  { label: 'Stories', page: 'stories' },
  { label: 'Community', page: 'community' },
]

const HOME_NAV_LINKS: { label: string; page: WebPage }[] = [
  { label: 'Shop', page: 'shop' },
  { label: 'Collections', page: 'collections' },
  { label: 'Releases', page: 'shop' },
  { label: 'Legacy', page: 'legacy' },
  { label: 'Keeper Circle', page: 'keeper-circle' },
  { label: 'Journal', page: 'stories' },
  { label: 'About', page: 'about' },
]

function IconSearch() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
}

function IconUser() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.2" /><path d="M5.5 19c1.6-3.7 11.4-3.7 13 0" /></svg>
}

function IconHeart() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.4 6.6a5.2 5.2 0 0 0-7.4 0L12 7.6l-1-1a5.2 5.2 0 0 0-7.4 7.4l1 1 7.4 7.4 7.4-7.4 1-1a5.2 5.2 0 0 0 0-7.4Z" /></svg>
}

function IconCart() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h2l2.2 9.2a1.4 1.4 0 0 0 1.4 1.1h7.9a1.4 1.4 0 0 0 1.4-1.1L21 8H6.1" /><circle cx="10" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>
}

function IconMenu() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>
}

function IconClose() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12" /><path d="M18 6 6 18" /></svg>
}

function LogoMark({ className }: { className?: string }) {
  const innerSvg = izliLogoSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')

  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 180.96 53.94"
      preserveAspectRatio="xMidYMid meet"
      dangerouslySetInnerHTML={{ __html: innerSvg }}
    />
  )
}

export default function Navbar({ current, onNavigate, cartCount = 2 }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isHome = current === 'home'
  const links = isHome ? HOME_NAV_LINKS : NAV_LINKS

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : previousOverflow

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const navigateAndClose = (page: WebPage) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  const renderMobileHeader = () => (
    <div className={`navbar__mobile-bar ${isHome ? 'navbar__mobile-bar--home' : 'navbar__mobile-bar--default'}`}>
      <div className="navbar__mobile-left">
        <button type="button" onClick={() => setMenuOpen(true)} className="navbar__mobile-toggle" aria-label="Open menu">
          <IconMenu />
        </button>
        <button onClick={() => onNavigate('home')} className="navbar__mobile-logo" aria-label="Go home">
          <LogoMark className="navbar__logo-mark navbar__logo-mark--mobile" />
        </button>
      </div>

      <div className="navbar__mobile-actions flex">
        <button title="Search" className="navbar__mobile-action" aria-label="Search">
          <IconSearch />
        </button>
        <button title="Favorites" className="navbar__mobile-action" aria-label="Favorites">
          <IconHeart />
        </button>
        <button onClick={() => onNavigate('cart')} title="Cart" className="navbar__mobile-action navbar__mobile-action--cart" aria-label="Cart">
          <IconCart />
          {cartCount > 0 && <span className="navbar__mobile-cart-badge">{cartCount}</span>}
        </button>
      </div>
    </div>
  )

  const renderMobileMenu = () => (
    <div className={`navbar-mobile-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
      <div className="navbar-mobile-menu__panel">
        <div className="navbar-mobile-menu__top">
          <button onClick={() => navigateAndClose('home')} className="navbar-mobile-menu__logo" aria-label="Go home">
            <LogoMark className="navbar__logo-mark navbar__logo-mark--menu" />
          </button>
          <button type="button" onClick={() => setMenuOpen(false)} className="navbar-mobile-menu__close" aria-label="Close menu">
            <IconClose />
          </button>
        </div>

        <nav className="navbar-mobile-menu__nav">
          {links.map(({ label, page }) => (
            <button
              key={`${label}-${page}`}
              onClick={() => navigateAndClose(page)}
              className={`navbar-mobile-menu__link${current === page ? ' is-active' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="navbar-mobile-menu__footer">
          <button onClick={() => navigateAndClose('login')} className="navbar-mobile-menu__login">Connexion</button>
          <button onClick={() => navigateAndClose('cart')} className="navbar-mobile-menu__cart">Cart {cartCount > 0 ? `(${cartCount})` : ''}</button>
        </div>
      </div>
    </div>
  )

  if (isHome) {
    return (
      <header className={`navbar navbar--home ${isScrolled ? 'navbar--scrolled' : ''}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 220, color: CREAM, background: 'rgba(10,7,5,0.34)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: '0 6px 24px rgba(0,0,0,0.18)' }}>
        <div className="navbar__announcement" style={{ height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.88)', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,238,228,0.72)', fontFamily: FONT_SANS }}>
          Free shipping over 150 TND · Become a Keeper & unlock exclusive rewards
        </div>
        {renderMobileHeader()}
        <div className="navbar__desktop-bar" style={{ height: 72, background: 'rgba(10,7,5,0.24)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="navbar__desktop-inner" style={{ width: '100vw', height: '100%', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 20, padding: '0 64px' }}>
            <button
              onClick={() => onNavigate('home')}
              className="navbar__logo"
              style={{ display: 'flex', alignItems: 'center', gap: 10, justifySelf: 'start', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: CREAM }}
            >
              <LogoMark className="navbar__logo-mark navbar__logo-mark--desktop" />
            </button>

            <nav className="navbar__desktop-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, whiteSpace: 'nowrap' }}>
              {links.map(({ label, page }) => (
                <button
                  key={`${label}-${page}`}
                  onClick={() => onNavigate(page)}
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: current === page ? CREAM : 'rgba(245,238,228,0.72)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: FONT_SANS,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    transition: 'color 0.12s ease, opacity 0.12s ease',
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="navbar__desktop-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14 }}>
              <button title="Search" style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', border: 'none', background: 'transparent', color: 'var(--navbar-icon-color)', borderRadius: 999, cursor: 'pointer' }}><IconSearch /></button>
              <button title="Favorites" style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', border: 'none', background: 'transparent', color: 'var(--navbar-icon-color)', borderRadius: 999, cursor: 'pointer' }}><IconHeart /></button>
              <button onClick={() => onNavigate('login')} title="Account" style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', border: 'none', background: 'transparent', color: 'var(--navbar-icon-color)', borderRadius: 999, cursor: 'pointer' }}><IconUser /></button>
              <button onClick={() => onNavigate('cart')} title="Cart" style={{ position: 'relative', width: 32, height: 32, display: 'grid', placeItems: 'center', border: 'none', background: 'transparent', color: 'var(--navbar-icon-color)', borderRadius: 999, cursor: 'pointer' }}>
                <IconCart />
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: -2, right: -1, minWidth: 14, height: 14, padding: '0 3px', borderRadius: 999, background: '#C9AB7D', color: '#231812', fontSize: 9, fontWeight: 700, display: 'grid', placeItems: 'center', lineHeight: 1 }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        {renderMobileMenu()}
      </header>
    )
  }

  return (
    <header className="navbar navbar--default" style={{
      height: 64,
      background: SURFACE,
      borderBottom: `1px solid ${BORDER}`,
      position: 'sticky',
      top: 0,
      zIndex: 200,
      width: '100%',
    }}>
      {renderMobileHeader()}
      <div className="navbar__desktop-inner" style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 40px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
      }}>
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="navbar__logo"
          style={{ display: 'flex', alignItems: 'center', gap: 9, marginRight: 52, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
        >
          <LogoMark className="navbar__logo-mark navbar__logo-mark--desktop" />
        </button>

        {/* Nav links */}
        <nav className="navbar__desktop-nav" style={{ display: 'flex', gap: 36, flex: 1 }}>
          {links.map(({ label, page }) => (
            <button
              key={`${label}-${page}`}
              onClick={() => onNavigate(page)}
              style={{
                fontSize: 13,
                fontWeight: current === page ? 500 : 400,
                color: current === page ? INDIGO : TEXT_SEC,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: FONT_SANS,
                letterSpacing: '0.01em',
                borderBottom: current === page ? `1.5px solid ${INDIGO}` : '1.5px solid transparent',
                paddingBottom: 2,
                transition: 'color 0.12s',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="navbar__desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Search */}
          <button style={{ fontSize: 16, color: 'var(--navbar-icon-color)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>⌕</button>

          {/* Favorites */}
          <button style={{ fontSize: 16, color: 'var(--navbar-icon-color)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>♡</button>

          {/* About / Events */}
          <button
            onClick={() => onNavigate('about')}
            style={{ fontSize: 13, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT_SANS }}
          >
            About
          </button>

          {/* Account */}
          <button
            onClick={() => onNavigate('login')}
            style={{ fontSize: 13, color: current === 'profile' ? INDIGO : TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT_SANS, fontWeight: current === 'profile' ? 500 : 400 }}
          >
            {current === 'profile' ? 'Youcef B.' : 'Account'}
          </button>

          {/* Cart */}
          <button
            onClick={() => onNavigate('cart')}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '7px 16px',
              background: INDIGO, color: CREAM,
              border: 'none', borderRadius: 9,
              cursor: 'pointer', fontSize: 13, fontWeight: 500,
              fontFamily: FONT_SANS, flexShrink: 0,
            }}
          >
            Cart
            {cartCount > 0 && (
              <span style={{ background: CLAY, color: CREAM, borderRadius: 999, padding: '1px 6px', fontSize: 10, fontWeight: 700, lineHeight: 1.5 }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {renderMobileMenu()}
    </header>
  )
}
