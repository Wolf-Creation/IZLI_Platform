import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import legacyProductsImage from '../../../assets/Website_img/Legacy_section/legacy_nature_products.jpg'
import legacyVerticalImage from '../../../assets/Website_img/Legacy_section/legacy_nature_vert.png'
import legacyMarronImage from '../../../assets/Website_img/Legacy_section/legacy_nature_marron.png'
import legacyBeigeLinenImage from '../../../assets/Website_img/Legacy_section/legacy_nature_beige linen.png'
import legacyNoirImage from '../../../assets/Website_img/Legacy_section/legacy_nature_noir.png'
import izliLogoText from '../../../assets/logo/IZLI_logo_text.svg'
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
  { label: 'Keeper Circle', page: 'keeper-circle' },
]

const DISCOVER_LINKS: { label: string; page: WebPage }[] = [
  { label: 'New releases', page: 'shop' },
  { label: 'Keeper Circle', page: 'keeper-circle' },
  { label: 'Community Lab', page: 'community-lab' },
]

const COLLECTION_LINKS: { label: string; page: WebPage }[] = [
  { label: 'Legacy', page: 'legacy' },
  { label: 'Studio', page: 'studio' },
  { label: 'Essentials', page: 'shop' },
  { label: 'Community Lab', page: 'community-lab' },
]

const CATEGORY_LINKS: { label: string; page: WebPage }[] = [
  { label: 'Tops', page: 'shop' },
  { label: 'Bottoms', page: 'shop' },
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
      <div className="site-footer__grid">
        <div className="site-footer__column site-footer__column--about">
          <div className="home-about-copy">
            <div className="home-about-copy__text">
              <img className="site-footer__logo" src={izliLogoText} alt="IZLI" />
              <p className="home-legacy-editorial__intro">IZLI is more than a clothing brand — <br /> It is a contemporary universe inspired by Amazigh heritage, carrying stories, identity, and culture from one generation to the next.</p>
            </div>
            <div className="home-about-socials" aria-label="IZLI social media links">
              <a href="https://www.instagram.com/izli.tn/" target="_blank" rel="noreferrer" aria-label="Instagram @izli.tn"><Icon icon="line-md:instagram" aria-hidden="true" /></a>
              <a href="https://www.facebook.com/izli.tn/" target="_blank" rel="noreferrer" aria-label="Facebook @izli.tn"><Icon icon="line-md:facebook" aria-hidden="true" /></a>
              <a href="https://tiktok.com/@izliofficial" target="_blank" rel="noreferrer" aria-label="TikTok @izliofficial"><Icon icon="line-md:tiktok" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <div className="site-footer__column site-footer__column--pages">
          <FooterGroup title="Pages" links={PAGE_LINKS} onNavigate={onNavigate} />
          <FooterGroup title="Discover" links={DISCOVER_LINKS} onNavigate={onNavigate} />
        </div>
        <div className="site-footer__column site-footer__column--discover">
          <FooterGroup title="Collections" links={COLLECTION_LINKS} onNavigate={onNavigate} />
          <FooterGroup title="Categories" links={CATEGORY_LINKS} onNavigate={onNavigate} />
        </div>
      </div>

    </footer>
  )
}

function FooterGroup({ title, links, onNavigate }: { title: string; links: { label: string; page: WebPage }[]; onNavigate: (p: WebPage) => void }) {
  return (
    <div className="site-footer__group">
      <div>{links.map(link => <button type="button" key={link.label} onClick={() => onNavigate(link.page)}>{link.label}</button>)}</div>
      <h3>{title}</h3>
    </div>
  )
}
