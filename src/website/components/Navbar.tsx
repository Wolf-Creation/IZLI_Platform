import { INDIGO, TEXT_SEC, BORDER, SURFACE, CREAM, CLAY, FONT_SERIF, FONT_SANS } from '../../tokens'
import type { WebPage } from '../types'

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

export default function Navbar({ current, onNavigate, cartCount = 2 }: Props) {
  return (
    <header style={{
      height: 64,
      background: SURFACE,
      borderBottom: `1px solid ${BORDER}`,
      position: 'sticky',
      top: 0,
      zIndex: 200,
      width: '100%',
    }}>
      <div style={{
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
          style={{ display: 'flex', alignItems: 'center', gap: 9, marginRight: 52, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
        >
          <div style={{ width: 30, height: 30, background: INDIGO, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: CREAM, fontSize: 13, fontFamily: FONT_SERIF, fontWeight: 600 }}>I</span>
          </div>
          <span style={{ fontFamily: FONT_SERIF, fontWeight: 600, fontSize: 17, color: INDIGO, letterSpacing: '0.02em' }}>IZLI</span>
        </button>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: 36, flex: 1 }}>
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Search */}
          <button style={{ fontSize: 16, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>⌕</button>

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
    </header>
  )
}
