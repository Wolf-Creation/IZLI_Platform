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

type FilterState = {
  productType: string
  collection: string
  color: string
  clothingSize: string
  shoeSize: string
}

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
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({ productType: '', collection: '', color: '', clothingSize: '', shoeSize: '' })

  const activeFilterCount = Object.values(filters).filter(Boolean).length

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
      <header className="shop-page__topbar">
        <div className="shop-page__topbar-inner">
          <div className="shop-page__brand-block">
            <span className="shop-page__label">Shop</span>
            <small>Timeless essentials built for everyday wear.</small>
          </div>
          <div className="shop-page__meta">
            <span>Discover</span>
            <span>Minimal</span>
          </div>
        </div>
      </header>

      <div className="shop-shell shop-shell--category-bar">
        <div className="shop-category-strip" aria-label="Shop categories">
          <div className="shop-category-strip__categories">
            {(['All', ...CATEGORIES.map(category => category.label)] as Category[]).map(category => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'is-active' : ''}
                onClick={() => selectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <button type="button" className={`shop-filter-trigger ${isFilterOpen ? 'is-open' : ''}`} onClick={() => setIsFilterOpen(true)} aria-expanded={isFilterOpen}>
            <span aria-hidden="true">+</span> Filter ({activeFilterCount})
          </button>
        </div>
      </div>

      {isFilterOpen && <>
        <button type="button" className="shop-filter-overlay" onClick={() => setIsFilterOpen(false)} aria-label="Close filters" />
        <aside className="shop-filter-drawer" aria-label="Shop filters">
          <div className="shop-filter-drawer__header">
            <h2>Filter</h2>
            <button type="button" onClick={() => setIsFilterOpen(false)} aria-label="Close filters">×</button>
          </div>
          <div className="shop-filter-drawer__body">
            {([
              ['productType', 'Product type', ['Tops', 'Bottoms', 'Outerwear', 'Footwear']],
              ['collection', 'Collection', ['Basics', 'Classics', 'Essentials']],
              ['color', 'Color', ['Beige', 'Black', 'White', 'Olive', 'Grey']],
              ['clothingSize', 'Clothe', ['S', 'M', 'L', 'XL']],
              ['shoeSize', 'Shoes', ['38', '40', '42', '44']],
            ] as const).map(([key, label, options]) => (
              <section className="shop-filter-group" key={key}>
                <h3>{label}</h3>
                <div className="shop-filter-options">
                  {options.map(option => <button key={option} type="button" className={filters[key] === option ? 'is-active' : ''} onClick={() => setFilters(current => ({ ...current, [key]: current[key] === option ? '' : option }))}>{option}</button>)}
                </div>
              </section>
            ))}
          </div>
          <button type="button" className="shop-filter-clear" onClick={() => setFilters({ productType: '', collection: '', color: '', clothingSize: '', shoeSize: '' })}>Clear filters</button>
        </aside>
      </>}

      <section className="shop-catalogue" id="shop-catalogue">
        <div className="shop-shell">
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

          {visibleProducts.length > 0 ? <div className="shop-product-grid">
            {visibleProducts.map((product, index) => {
              const imageIndex = imageIndexes[product.id] ?? 0
              return <motion.article key={product.id} className="shop-product-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.45, delay: index * 0.04 }}>
                <div className="shop-product-card__media"><img src={product.images[imageIndex]} alt={product.name} /><span className="shop-product-card__release">{product.release}</span><button type="button" className="shop-product-card__cta" onClick={() => setCartCount(count => count + 1)}>Add to bag <span aria-hidden="true">+</span></button><button type="button" className="shop-product-card__arrow shop-product-card__arrow--prev" onClick={() => changeImage(product.id, -1, product.images.length)} aria-label={`Previous ${product.name} image`}>←</button><button type="button" className="shop-product-card__arrow shop-product-card__arrow--next" onClick={() => changeImage(product.id, 1, product.images.length)} aria-label={`Next ${product.name} image`}>→</button></div>
                <div className="shop-product-card__info"><div><p>{product.category} / {product.id}</p><h3>{product.name}</h3></div><strong>{product.price} TND</strong></div>
              </motion.article>
            })}
          </div> : <div className="shop-empty"><p className="shop-eyebrow">No match</p><h3>Nothing here yet.</h3><button type="button" onClick={() => { setQuery(''); setActiveCategory('All') }}>Clear filters</button></div>}
        </div>
      </section>
    </div>
  )
}