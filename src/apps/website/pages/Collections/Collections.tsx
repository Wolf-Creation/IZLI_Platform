import { useState } from 'react'
import { INDIGO, CLAY, SAGE, BG } from '../../../../tokens'
import type { WebPage } from '../../types'
import atlasPrincipal from '../../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-Principal.png'
import atlasDetail from '../../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-A.png'
import atlasBack from '../../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-B.png'
import portePrincipal from '../../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-Principal.png'
import porteDetail from '../../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-A.png'
import porteBack from '../../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-B.png'
import './Collections.scss'

interface Props { onNavigate: (p: WebPage) => void }

const COLLECTIONS = [
  { name: 'Echoes of Stone', universe: 'Heritage', season: 'SS 2026', products: 8, status: 'New', desc: 'Atlas stone marks translated into contemporary garments. The marks that predate script.', img: 'photo-1469334031218-e382a71b716b', accent: INDIGO },
  { name: 'Indigo Memory', universe: 'Heritage', season: 'SS 2026', products: 5, status: 'Available', desc: 'A capsule on the cultural history of indigo dyeing in North Africa.', img: 'photo-1490481651871-ab68de25d43d', accent: '#2a4a6e' },
  { name: 'Atlas Marks', universe: 'Studio', season: 'AW 2025', products: 6, status: 'Available', desc: 'Contemporary reinterpretations of geometric marks found across the Atlas range.', img: 'photo-1516762689617-e1cffcef479d', accent: CLAY },
  { name: 'Heritage Essentials 01', universe: 'Essentials', season: 'Permanent', products: 12, status: 'Available', desc: 'The foundation of the IZLI wardrobe. Built for daily wear, made to last decades.', img: 'photo-1523381210434-271e8be1f52b', accent: SAGE },
  { name: 'Mountain Memory', universe: 'Community Lab', season: 'Limited', products: 3, status: 'Limited', desc: 'A community-led research capsule. Garments co-designed with contributors from the Atlas communities.', img: 'photo-1521572163474-6864f9cf17ab', accent: '#4A7A5A' },
  { name: 'Sahara Craft', universe: 'Studio', season: 'AW 2025', products: 4, status: 'Available', desc: 'Structured desert forms. Utilitarian shapes distilled from nomadic garment traditions.', img: 'photo-1618354691373-d851c5c3a990', accent: '#7A6050' },
]

const FILTERS = ['All', 'Heritage', 'Essentials', 'Studio', 'Community Lab']

const LOCAL_PRODUCT_IMAGES = [
  atlasPrincipal,
  atlasDetail,
  atlasBack,
  portePrincipal,
  porteDetail,
  porteBack,
]

const COLLECTION_COPY: Record<string, { eyebrow: string; headline: string }> = {
  'Echoes of Stone': { eyebrow: 'Heritage / 01', headline: 'Marks that carry forward.' },
  'Indigo Memory': { eyebrow: 'Heritage / 02', headline: 'Colour with a memory.' },
  'Atlas Marks': { eyebrow: 'Studio / 01', headline: 'Ideas take shape.' },
  'Heritage Essentials 01': { eyebrow: 'Essentials / 01', headline: 'Built for every day.' },
  'Mountain Memory': { eyebrow: 'Community Lab / 01', headline: 'A living archive.' },
  'Sahara Craft': { eyebrow: 'Studio / 02', headline: 'Form follows the desert.' },
}

const COLLECTION_PRODUCTS: Record<string, { name: string; color: string; price: string; image: string }[]> = {
  'Echoes of Stone': [
    { name: 'Stone Mark Tee', color: 'Black', price: '79 TND', image: 'photo-1521572163474-6864f9cf17ab' },
    { name: 'Stone Mark Tee', color: 'Ecru', price: '79 TND', image: 'photo-1523381210434-271e8be1f52b' },
    { name: 'Atlas Heavy Shirt', color: 'Charcoal', price: '119 TND', image: 'photo-1516762689617-e1cffcef479d' },
    { name: 'Archive Trouser', color: 'Sand', price: '139 TND', image: 'photo-1611312449408-fcece27cdbb7' },
  ],
  'Indigo Memory': [
    { name: 'Indigo Frame Tee', color: 'Indigo', price: '89 TND', image: 'photo-1490481651871-ab68de25d43d' },
    { name: 'Dye House Shirt', color: 'Blue', price: '125 TND', image: 'photo-1618354691373-d851c5c3a990' },
    { name: 'Memory Overshirt', color: 'Washed Indigo', price: '165 TND', image: 'photo-1551028719-00167b16ebc5' },
    { name: 'Indigo Bandana', color: 'Deep Blue', price: '45 TND', image: 'photo-1503342217505-b0a15ec3261c' },
  ],
  'Atlas Marks': [
    { name: 'Atlas Symbol Tee', color: 'Black', price: '65 TND', image: 'photo-1521572163474-6864f9cf17ab' },
    { name: 'Atlas Symbol Tee', color: 'Sand', price: '65 TND', image: 'photo-1523381210434-271e8be1f52b' },
    { name: 'Mark Knit', color: 'Oat', price: '135 TND', image: 'photo-1550258987-920a2eae2e8d' },
    { name: 'Studio Frame Jacket', color: 'Stone', price: '195 TND', image: 'photo-1620799140408-edc6dcb6d633' },
  ],
  'Heritage Essentials 01': [
    { name: 'Essential Heavy Tee', color: 'White', price: '65 TND', image: 'photo-1521572163474-6864f9cf17ab' },
    { name: 'Essential Heavy Tee', color: 'Black', price: '65 TND', image: 'photo-1551488831-00ddcb6c6bd3' },
    { name: 'Straight Trouser', color: 'Olive', price: '115 TND', image: 'photo-1611312449408-fcece27cdbb7' },
    { name: 'Everyday Overshirt', color: 'Ecru', price: '145 TND', image: 'photo-1617196034183-421b4040ed20' },
  ],
  'Mountain Memory': [
    { name: 'Mountain Mark Jersey', color: 'Grey', price: '105 TND', image: 'photo-1521572163474-6864f9cf17ab' },
    { name: 'Community Archive Tee', color: 'Green', price: '89 TND', image: 'photo-1523381210434-271e8be1f52b' },
    { name: 'Keeper Backpack', color: 'Natural', price: '165 TND', image: 'photo-1553338896-f4b87faa54d8' },
    { name: 'Mountain Cap', color: 'Olive', price: '49 TND', image: 'photo-1529139574466-a303027c1d8b' },
  ],
  'Sahara Craft': [
    { name: 'Sahara Work Jacket', color: 'Clay', price: '285 TND', image: 'photo-1620799140408-edc6dcb6d633' },
    { name: 'Desert Overshirt', color: 'Brown', price: '175 TND', image: 'photo-1618354691373-d851c5c3a990' },
    { name: 'Nomad Trouser', color: 'Sand', price: '145 TND', image: 'photo-1611312449408-fcece27cdbb7' },
    { name: 'Craft Tee', color: 'Natural', price: '75 TND', image: 'photo-1551028719-00167b16ebc5' },
  ],
}

export default function Collections({ onNavigate }: Props) {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? COLLECTIONS : COLLECTIONS.filter(c => c.universe === filter)
  return (
    <div className="collections-page" style={{ background: BG, minHeight: '100vh' }}>
      <header className="collections-header">
        <div className="collections-shell">
          <div className="collections-kicker">Collections</div>
          <h1 className="collections-title">Every collection<br />has a story.</h1>
          <p className="collections-sub">Rooted in Amazigh heritage, each collection is built around research, community contributions, and a commitment to craft.</p>
        </div>
      </header>

      <div className="collections-filters">
        <div className="collections-shell collections-filters__row">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`collections-filter ${filter === f ? 'is-active' : ''}`}>{f}</button>
          ))}
        </div>
      </div>

      <section className="collections-sections">
        {visible.map((collection, index) => {
          const sectionCopy = COLLECTION_COPY[collection.name]
          const products = COLLECTION_PRODUCTS[collection.name]

          return (
            <section className={`collections-editorial ${index % 2 === 1 ? 'collections-editorial--reverse' : ''}`} key={collection.name}>
              <header className="collections-editorial__header">
                <div>
                  <span>{sectionCopy.eyebrow}</span>
                  <h2>{collection.name}</h2>
                </div>
                <button type="button" onClick={() => onNavigate('shop')}>Shop collection</button>
              </header>

              <div className="collections-editorial__body">
                <div className="collections-editorial__visual">
                  <img src={`https://images.unsplash.com/${collection.img}?w=1200&h=1000&fit=crop&auto=format`} alt={`${collection.name} collection`} />
                  <div className="collections-editorial__visual-overlay" />
                  <div className="collections-editorial__visual-caption">
                    <span>{sectionCopy.eyebrow}</span>
                    <strong>{sectionCopy.headline}</strong>
                  </div>
                </div>

                <div className="collections-editorial__collections">
                  <p className="collections-editorial__copy">{collection.desc}</p>
                  <div className="collections-editorial__grid">
                    {products.map((product, productIndex) => (
                      <button key={`${collection.name}-${product.name}-${product.color}`} type="button" className="collection-card" onClick={() => onNavigate('product-detail')}>
                        <span className="collection-card__image">
                          <img src={LOCAL_PRODUCT_IMAGES[(index * products.length + productIndex) % LOCAL_PRODUCT_IMAGES.length]} alt={`${product.name} ${product.color}`} />
                        </span>
                        <span className="collection-card__info">
                          <span className="collection-card__name">{product.name}</span>
                          <span className="collection-card__meta">{product.color} · {product.price}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )
        })}
        <div className="collections-count">Showing {visible.length} of {COLLECTIONS.length} collections</div>
      </section>
    </div>
  )
}