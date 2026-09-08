import { useState, useEffect } from 'react'
import type { WebPage } from '../../types'
import './Header.scss'

interface Props {
  onNavigate: (page: WebPage) => void
  scrollY: number
}

const MENU_ITEMS = [
  { label: 'Shop', page: 'shop' as WebPage },
  { label: 'Collections', page: 'collections' as WebPage },
  { label: 'Legacy', page: 'legacy' as WebPage },
  // { label: 'Archives', page: 'archives' as WebPage },
  // { label: 'Stories', page: 'stories' as WebPage },
  // { label: 'Community', page: 'community' as WebPage },
]

export function Header({ onNavigate, scrollY }: Props) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsScrolled(scrollY > 100)
  }, [scrollY])

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        {/* Left Menu */}
        <nav className="header__menu">
          {MENU_ITEMS.map(item => (
            <button
              key={item.label}
              className="header__menu-item"
              onClick={() => onNavigate(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Center Brand */}
        <div className="header__brand">
          <h1 className="header__brand-text">IZLI</h1>
        </div>

        {/* Right Icons */}
        <div className="header__icons">
          <button className="header__icon" title="Favorites" aria-label="Favorites">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="header__icon" title="Account" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button className="header__icon" title="Cart" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
