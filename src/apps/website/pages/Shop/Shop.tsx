import { useMemo, useState } from 'react'
import type { WebPage } from '../../types'
import { motion } from 'framer-motion'
import bannerImage from '../../../../assets/Website_img/banner/banner_001.png'
import tshirtsImage from '../../../../assets/Website_img/Shop/categories/T-shirts.png'
import shirtsImage from '../../../../assets/Website_img/Shop/categories/Shirts.png'
import pantsImage from '../../../../assets/Website_img/Shop/categories/pants.png'
import bandanaImage from '../../../../assets/Website_img/Shop/categories/bandana.png'
import atlasPrincipal from '../../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-Principal.png'
import atlasDetail from '../../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-A.png'
import atlasBack from '../../../../assets/Website_img/Shop/new releases/Atlas_symbol_heavy_oversized/001-B.png'
import portePrincipal from '../../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-Principal.png'
import porteDetail from '../../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-A.png'
import porteBack from '../../../../assets/Website_img/Shop/new releases/Porte_ksour_heavy_oversized/002-B.png'
import './Shop.scss'

interface Props { onNavigate: (p: WebPage) => void }

type Category = 'All' | 'T-Shirts' | 'Shirts' | 'Pants' | 'Accessories'

const CATEGORIES = [
  { label: 'T-Shirts', image: tshirtsImage },
  { label: 'Shirts', image: shirtsImage },
  { label: 'Pants', image: pantsImage },
  { label: 'Accessories', image: bandanaImage },
] as const

const PRODUCTS = [
  { id: 'PRD-0008', name: 'Atlas Symbol Heavy Oversized', category: 'T-Shirts' as Category, price: 65, release: 'New release', images: [atlasPrincipal, atlasDetail, atlasBack] },
  { id: 'PRD-0054', name: 'Porte Ksour Heavy Oversized', category: 'T-Shirts' as Category, price: 85, release: 'New release', images: [portePrincipal, porteDetail, porteBack] },
  { id: 'PRD-0016', name: 'Mountain Mark Crewneck', category: 'Shirts' as Category, price: 125, release: 'Last release', images: [atlasDetail, atlasPrincipal] },
  { id: 'PRD-0022', name: 'Loom Stripe Shirt', category: 'Shirts' as Category, price: 145, release: 'Last release', images: [porteDetail, portePrincipal] },
  { id: 'PRD-0044', name: 'Essentials Straight Trouser', category: 'Pants' as Category, price: 115, release: 'Last release', images: [pantsImage, atlasBack] },
  { id: 'PRD-0052', name: 'Heritage Bandana', category: 'Accessories' as Category, price: 45, release: 'Last release', images: [bandanaImage, porteBack] },
] as const

export default function Shop({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'new' | 'last'>('new')
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<'featured' | 'price-low' | 'price-high'>('featured')
  const [cartCount, setCartCount] = useState(0)
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({})

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = PRODUCTS.filter(product => {
      const matchesTab = activeTab === 'new' ? product.release === 'New release' : product.release === 'Last release'
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory
      const matchesQuery = !normalizedQuery || product.name.toLowerCase().includes(normalizedQuery)
      return matchesTab && matchesCategory && matchesQuery
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price
      if (sort === 'price-high') return b.price - a.price
      return a.id.localeCompare(b.id)
    })
  }, [activeCategory, activeTab, query, sort])

  const selectCategory = (category: Category) => setActiveCategory(category)

  const changeImage = (id: string, direction: 1 | -1, imageCount: number) => {
    setImageIndexes(current => ({
      ...current,
      [id]: ((current[id] ?? 0) + direction + imageCount) % imageCount,
    }))
  }

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <img src={bannerImage} alt="IZLI collection" className="shop-hero__image" />
        <div className="shop-hero__veil" />
        <div className="shop-hero__content">
          <p className="shop-eyebrow">IZLI / SHOP 001</p>
          <h1>Objects with a<br /><em>memory.</em></h1>
          <p className="shop-hero__copy">Contemporary essentials shaped by North African heritage, made to be carried forward.</p>
          <button type="button" className="shop-hero__link" onClick={() => document.getElementById('shop-catalogue')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore the collection <span aria-hidden="true">↘</span>
          </button>
        </div>
        <div className="shop-hero__index" aria-hidden="true"><span>01</span><i /><span>SHOP</span></div>
      </section>

      <section className="shop-categories" aria-label="Shop categories">
        <div className="shop-shell">
          <div className="shop-section-heading">
            <div><p className="shop-eyebrow">Browse the universe</p><h2>Find your piece.</h2></div>
            <p>From daily uniforms to considered layers, each release carries a fragment of the IZLI story.</p>
          </div>
          <div className="shop-category-grid">
            {CATEGORIES.map(category => (
              <button type="button" className="shop-category-card" key={category.label} onClick={() => { selectCategory(category.label); document.getElementById('shop-catalogue')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <img src={category.image} alt="" />
                <span>{category.label}</span><b aria-hidden="true">↗</b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-catalogue" id="shop-catalogue">
        <div className="shop-shell">
          <div className="shop-catalogue__topline">
            <div><p className="shop-eyebrow">The catalogue</p><h2>Choose what stays.</h2></div>
            <div className="shop-cart-status">{cartCount} {cartCount === 1 ? 'piece' : 'pieces'} in your bag</div>
          </div>

          <div className="shop-toolbar">
            <div className="shop-release-tabs" role="tablist" aria-label="Release filter">
              <button type="button" className={activeTab === 'new' ? 'is-active' : ''} onClick={() => setActiveTab('new')}>New releases</button>
              <button type="button" className={activeTab === 'last' ? 'is-active' : ''} onClick={() => setActiveTab('last')}>Archive releases</button>
            </div>
            <div className="shop-toolbar__controls">
              <label className="shop-search"><span>Search</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a piece" /></label>
              <select aria-label="Sort products" value={sort} onChange={event => setSort(event.target.value as typeof sort)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select>
            </div>
          </div>

          <div className="shop-filter-row" aria-label="Product categories">
            {(['All', ...CATEGORIES.map(category => category.label)] as Category[]).map(category => <button type="button" key={category} className={activeCategory === category ? 'is-active' : ''} onClick={() => selectCategory(category)}>{category}</button>)}
          </div>

          {visibleProducts.length > 0 ? <div className="shop-product-grid">
            {visibleProducts.map((product, index) => {
              const imageIndex = imageIndexes[product.id] ?? 0
              return <motion.article key={product.id} className="shop-product-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.45, delay: index * 0.04 }}>
                <div className="shop-product-card__media"><img src={product.images[imageIndex]} alt={product.name} /><span className="shop-product-card__release">{product.release}</span><button type="button" className="shop-product-card__arrow shop-product-card__arrow--prev" onClick={() => changeImage(product.id, -1, product.images.length)} aria-label={`Previous ${product.name} image`}>←</button><button type="button" className="shop-product-card__arrow shop-product-card__arrow--next" onClick={() => changeImage(product.id, 1, product.images.length)} aria-label={`Next ${product.name} image`}>→</button></div>
                <div className="shop-product-card__info"><div><p>{product.category} / {product.id}</p><h3>{product.name}</h3></div><strong>{product.price} TND</strong></div>
                <button type="button" className="shop-product-card__cta" onClick={() => setCartCount(count => count + 1)}>Add to bag <span aria-hidden="true">+</span></button>
              </motion.article>
            })}
          </div> : <div className="shop-empty"><p className="shop-eyebrow">No match</p><h3>Nothing here yet.</h3><button type="button" onClick={() => { setQuery(''); setActiveCategory('All') }}>Clear filters</button></div>}
        </div>
      </section>
    </div>
  )
}