import { useEffect, useState } from 'react'
import legacyProductsImage from '../../assets/Website_img/Legacy_section/legacy_nature_products.jpg'
import legacyVerticalImage from '../../assets/Website_img/Legacy_section/legacy_nature_vert.png'
import legacyMarronImage from '../../assets/Website_img/Legacy_section/legacy_nature_marron.png'
import legacyBeigeLinenImage from '../../assets/Website_img/Legacy_section/legacy_nature_beige linen.png'
import legacyNoirImage from '../../assets/Website_img/Legacy_section/legacy_nature_noir.png'
import type { WebPage } from '../types'
import './Footer.scss'

interface Props { onNavigate: (p: WebPage) => void; showHomeAbout?: boolean }

const LEGACY_NATURE_IMAGES = [
  { src: legacyVerticalImage, alt: 'IZLI legacy collection in green' },
  { src: legacyMarronImage, alt: 'IZLI legacy collection in brown' },
  { src: legacyBeigeLinenImage, alt: 'IZLI legacy collection in beige linen' },
  { src: legacyNoirImage, alt: 'IZLI legacy collection in black' },
] as const

const PAGE_LINKS: { label: string; page: WebPage }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Shop', page: 'shop' },
  { label: 'Collections', page: 'collections' },
  { label: 'Stories', page: 'stories' },
  { label: 'Contact', page: 'about' },
]

const DISCOVER_LINKS: { label: string; page: WebPage }[] = [
  { label: 'New arrivals', page: 'shop' },
  { label: 'Keeper Circle', page: 'keeper-circle' },
  { label: 'Heritage', page: 'heritage' },
  { label: 'Community Lab', page: 'community-lab' },
]

const COLLECTION_LINKS: { label: string; page: WebPage }[] = [
  { label: 'Tops', page: 'shop' },
  { label: 'Bottoms', page: 'shop' },
  { label: 'Essentials', page: 'shop' },
]

const SOCIALS = [
  { label: 'Instagram', icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></> },
  { label: 'Twitch', icon: <><path d="M4 3h16v12l-4 4h-4l-3 3v-3H4z" /><path d="M9 8v4M15 8v4" /></> },
  { label: 'YouTube', icon: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="m10 9 5 3-5 3z" /></> },
  { label: 'Facebook', icon: <path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.5 1.6-1.5H18V4.1c-.4-.1-1.4-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V10H8.5v3h2.8v8z" /> },
]

export default function Footer({ onNavigate, showHomeAbout = false }: Props) {
  const [legacyNatureIndex, setLegacyNatureIndex] = useState(0)

  useEffect(() => {
    if (!showHomeAbout) return

    const interval = window.setInterval(() => {
      setLegacyNatureIndex(index => (index + 1) % LEGACY_NATURE_IMAGES.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [showHomeAbout])

  return (
    <footer className={`site-footer ${showHomeAbout ? 'site-footer--home' : ''}`}>
      {showHomeAbout && (
        <section className="site-footer__about home-section--about">
          <div className="home-legacy-editorial">
            <aside className="home-legacy-editorial__copy">
              <div className="home-about-copy">
                <div className="home-legacy-editorial__logo">IZLI.TN</div>
                <p className="home-legacy-editorial__intro">IZLI is more than a clothing brand — it is a contemporary universe inspired by Amazigh heritage, carrying stories, identity, and culture from one generation to the next.</p>
              </div>
              <div className="home-about-socials" aria-label="IZLI social media links">
                <a href="#instagram" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
                <a href="#twitch" aria-label="Twitch"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16v12l-4 4h-4l-3 3v-3H4z" /><path d="M9 8v4M15 8v4" /></svg></a>
                <a href="#youtube" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="3" /><path d="m10 9 5 3-5 3z" /></svg></a>
                <a href="#facebook" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.5 1.6-1.5H18V4.1c-.4-.1-1.4-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V10H8.5v3h2.8v8z" /></svg></a>
              </div>
            </aside>
            <div className="home-legacy-editorial__collage" aria-label="IZLI textile archive">
              <img src={legacyProductsImage} alt="IZLI legacy products" />
            </div>
            <button className="home-legacy-editorial__model" onClick={() => onNavigate('archives')} aria-label="Explore the IZLI legacy archive">
              <img
                key={LEGACY_NATURE_IMAGES[legacyNatureIndex].src}
                src={LEGACY_NATURE_IMAGES[legacyNatureIndex].src}
                alt={LEGACY_NATURE_IMAGES[legacyNatureIndex].alt}
              />
              <span>Explore the legacy <b aria-hidden="true">↗</b></span>
            </button>
          </div>
        </section>
      )}
      <div className="site-footer__grid">
        <div className="site-footer__column site-footer__column--pages">
          <FooterGroup title="Pages" links={PAGE_LINKS} onNavigate={onNavigate} />
          <FooterGroup title="Legal" links={[{ label: 'Privacy policy', page: 'about' }, { label: 'Cookie policy', page: 'about' }]} onNavigate={onNavigate} />
        </div>
        <div className="site-footer__column site-footer__column--discover">
          <FooterGroup title="Discover" links={DISCOVER_LINKS} onNavigate={onNavigate} />
          <FooterGroup title="Collections" links={COLLECTION_LINKS.slice(2)} onNavigate={onNavigate} />
          <FooterGroup title="Categories" links={COLLECTION_LINKS.slice(0, 2)} onNavigate={onNavigate} />
        </div>
        <div className="site-footer__column site-footer__column--newsletter">
          <h2>Join IZLI. Get 15% off your first order.</h2>
          <p>Subscribe and get 15% discount on your next purchase.</p>
          <label htmlFor="footer-email">Email</label>
          <div className="site-footer__newsletter">
            <input id="footer-email" type="email" placeholder="you@example.com" />
            <button type="button">Submit</button>
          </div>
        </div>
      </div>
      
    </footer>
  )
}

function FooterGroup({ title, links, onNavigate }: { title: string; links: { label: string; page: WebPage }[]; onNavigate: (p: WebPage) => void }) {
  return (
    <div className="site-footer__group">
      <h3>{title}</h3>
      <div>{links.map(link => <button type="button" key={link.label} onClick={() => onNavigate(link.page)}>{link.label}</button>)}</div>
    </div>
  )
}
