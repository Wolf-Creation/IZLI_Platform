import { INDIGO, CREAM, SAND, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../tokens'
import type { WebPage } from '../types'
import izliLogo from '../../assets/logo/IZLI_logo.svg'
import './Footer.scss'

interface Props { onNavigate: (p: WebPage) => void }

const LINKS: { group: string; items: { label: string; page?: WebPage }[] }[] = [
  {
    group: 'Shop',
    items: [
      { label: 'Heritage', page: 'shop' },
      { label: 'Essentials', page: 'shop' },
      { label: 'Studio', page: 'shop' },
      { label: 'Community Lab', page: 'shop' },
      { label: 'Collections', page: 'collections' },
    ],
  },
  {
    group: 'Brand',
    items: [
      { label: 'Heritage', page: 'heritage' },
      { label: 'Stories', page: 'stories' },
      { label: 'Events', page: 'events' },
      { label: 'About', page: 'about' },
    ],
  },
  {
    group: 'Community',
    items: [
      { label: 'Members', page: 'community' },
      { label: 'Contributions', page: 'community' },
      { label: 'Challenges', page: 'community' },
      { label: 'Community Lab', page: 'community-lab' },
    ],
  },
  {
    group: 'Account',
    items: [
      { label: 'Sign In', page: 'login' },
      { label: 'My Profile', page: 'profile' },
      { label: 'Orders', page: 'profile' },
      { label: 'Cart', page: 'cart' },
    ],
  },
]

export default function Footer({ onNavigate }: Props) {
  return (
    <footer className="site-footer" style={{ background: INDIGO, paddingTop: 64, paddingBottom: 40 }}>
      <div className="site-footer__inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        {/* Top row */}
        <div className="site-footer__top" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          {/* Brand column */}
          <div className="site-footer__brand">
            <div className="site-footer__brand-logo" style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
              <img src={izliLogo} alt="IZLI" style={{ width: 60, height: 'auto', display: 'block' }} />
            </div>
            <p className="site-footer__brand-copy" style={{ fontSize: 13, color: 'rgba(231,223,210,0.6)', lineHeight: 1.7, marginBottom: 20, maxWidth: 260 }}>
              Contemporary menswear rooted in Amazigh heritage. Designed with intention, made to last.
            </p>
            {/* Newsletter */}
            <div className="site-footer__newsletter" style={{ display: 'flex', gap: 0 }}>
              <input
                type="email"
                placeholder="Your email"
                className="site-footer__newsletter-input"
                style={{
                  flex: 1, padding: '9px 14px',
                  background: 'rgba(231,223,210,0.08)',
                  border: '1px solid rgba(231,223,210,0.2)',
                  borderRight: 'none',
                  borderRadius: '9px 0 0 9px',
                  color: CREAM, fontSize: 13,
                  fontFamily: FONT_SANS, outline: 'none',
                }}
              />
              <button className="site-footer__newsletter-button" style={{ padding: '9px 16px', background: CREAM, border: 'none', borderRadius: '0 9px 9px 0', fontSize: 12, fontWeight: 600, color: INDIGO, cursor: 'pointer', fontFamily: FONT_SANS, whiteSpace: 'nowrap' }}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Link columns */}
          {LINKS.map(group => (
            <div key={group.group} className="site-footer__group">
              <div className="site-footer__group-title" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: SAND, marginBottom: 16 }}>{group.group}</div>
              <div className="site-footer__group-links" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map(item => (
                  <button
                    key={item.label}
                    onClick={() => item.page && onNavigate(item.page)}
                    className="site-footer__group-link"
                    style={{ fontSize: 13, color: 'rgba(231,223,210,0.65)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: FONT_SANS, transition: 'color 0.12s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(231,223,210,0.65)')}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="site-footer__divider" style={{ height: 1, background: 'rgba(231,223,210,0.12)', marginBottom: 28 }} />

        {/* Bottom row */}
        <div className="site-footer__bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'rgba(231,223,210,0.35)', fontFamily: FONT_MONO, letterSpacing: '0.04em' }}>
            © 2026 IZLI. All rights reserved.
          </span>
          <div className="site-footer__legal" style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Cookies', 'Sustainability'].map(l => (
              <button key={l} style={{ fontSize: 11, color: 'rgba(231,223,210,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT_SANS }}>
                {l}
              </button>
            ))}
          </div>
          <div className="site-footer__social" style={{ display: 'flex', gap: 16 }}>
            {['IG', 'TW', 'PT'].map(s => (
              <button key={s} style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(231,223,210,0.15)', background: 'none', color: 'rgba(231,223,210,0.5)', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: FONT_MONO }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
