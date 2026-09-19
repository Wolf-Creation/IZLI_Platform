import { useEffect, useState } from 'react'
import legacyProductsImage from '../../../assets/Website_img/Legacy_section/legacy_nature_products.jpg'
import legacyVerticalImage from '../../../assets/Website_img/Legacy_section/legacy_nature_vert.png'
import legacyMarronImage from '../../../assets/Website_img/Legacy_section/legacy_nature_marron.png'
import legacyBeigeLinenImage from '../../../assets/Website_img/Legacy_section/legacy_nature_beige linen.png'
import legacyNoirImage from '../../../assets/Website_img/Legacy_section/legacy_nature_noir.png'
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

const KEEPER_CIRCLE_LINKS: { label: string; page: WebPage }[] = [
  { label: 'Become a Keeper', page: 'keeper-circle' },
  { label: 'Member benefits', page: 'keeper-circle' },
  { label: 'Early access', page: 'shop' },
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
                <a href="https://www.instagram.com/izli.tn/" target="_blank" rel="noreferrer" aria-label="Instagram @izli.tn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
                <a href="https://www.facebook.com/izli.tn/" target="_blank" rel="noreferrer" aria-label="Facebook @izli.tn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.5 1.6-1.5H18V4.1c-.4-.1-1.4-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3V10H8.5v3h2.8v8z" /></svg></a>
                <a href="https://wa.me/21690577555" target="_blank" rel="noreferrer" aria-label="WhatsApp +216 90 577 555"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9 9.3c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c.5 1 1.2 1.7 2.2 2.2l.6-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.3.2-.8.3-1.2.2-2.5-.6-4.8-2.9-5.4-5.4-.1-.4 0-.9.2-1.2Z" /></svg></a>
              </div>
            </aside>
            <div className="home-legacy-editorial__collage" aria-label="IZLI textile archive">
              <img src={legacyProductsImage} alt="IZLI legacy products" />
            </div>
            <div className="home-legacy-editorial__model" aria-label="IZLI legacy archive">
              <img
                key={LEGACY_NATURE_IMAGES[legacyNatureIndex].src}
                src={LEGACY_NATURE_IMAGES[legacyNatureIndex].src}
                alt={LEGACY_NATURE_IMAGES[legacyNatureIndex].alt}
              />
            </div>
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
        <div className="site-footer__column site-footer__column--keeper">
          <FooterGroup title="Keeper Circle" links={KEEPER_CIRCLE_LINKS} onNavigate={onNavigate} />
        </div>
        {/* <div className="site-footer__column site-footer__column--newsletter">
          <h2>Join IZLI. Get 15% off your first order.</h2>
          <p>Subscribe and get 15% discount on your next purchase.</p>
          <label htmlFor="footer-email">Email</label>
          <div className="site-footer__newsletter">
            <input id="footer-email" type="email" placeholder="you@example.com" />
            <button type="button">Submit</button>
          </div>
        </div> */}
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
