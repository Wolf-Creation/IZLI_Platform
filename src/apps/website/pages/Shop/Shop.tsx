import { useMemo, useState } from 'react'
import type { WebPage } from '../../types'
import { motion } from 'framer-motion'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { useCategories } from '../../../../shared/hooks/useCategories'
import './Shop.scss'

interface Props { onNavigate: (p: WebPage) => void }

type FilterState = {
  productType: string
  collection: string
  color: string
  clothingSize: string
  shoeSize: string
}

export default function Shop({ onNavigate }: Props) {
  const { products, loading, error } = useProducts({ status: 'published' })
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({ productType: '', collection: '', color: '', clothingSize: '', shoeSize: '' })

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = products.filter(product => {
      const matchesCategory = activeCategory === 'All' || (product.categoryIds ?? []).includes(activeCategory)
      const matchesQuery = !normalizedQuery || product.name.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })

    return [...filtered].sort((a, b) => a.id.localeCompare(b.id))
  }, [activeCategory, products, query])

  const selectCategory = (categoryId: string) => setActiveCategory(categoryId)

  return (
    <div className="shop-page">
      <header className="shop-page__topbar">
        <div className="shop-page__topbar-inner">
          <div className="shop-page__brand-block">
            <span className="shop-page__label">Shop</span>
            <div className="flex flex-col gap-4">
              <small >Discover all products.</small>
              <small >Timeless essentials built for everyday wear.</small>
            </div>
          </div>
        </div>
      </header>

      <div className="shop-shell shop-shell--category-bar">
        <div className="shop-category-strip" aria-label="Shop categories">
          <div className="shop-category-strip__categories">
            {[{ id: 'All', label: 'All' }, ...categories].map(category => (
              <button
                key={category.id}
                type="button"
                className={activeCategory === category.id ? 'is-active' : ''}
                onClick={() => selectCategory(category.id)}
              >
                {category.label}
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
          

          {loading || categoriesLoading ? <div className="shop-empty"><h3>Loading catalogue...</h3></div> : error || categoriesError ? <div className="shop-empty"><h3>Catalogue unavailable.</h3><p>{error ?? categoriesError}</p></div> : visibleProducts.length > 0 ? <div className="shop-product-grid">
            {visibleProducts.map((product, index) => {
              const remainingStock = (product.sizes ?? []).reduce((total, size) => total + size.stock, 0) || product.quantity || 0
              const categoryLabel = categories.find(category => (product.categoryIds ?? []).includes(category.id))?.label ?? product.universe
              return <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.45, delay: index * 0.04 }}>
                <ProductCard
                  name={product.name}
                  subtitle={`${categoryLabel} / ${product.sku}`}
                  price={`${product.price} ${product.currency}`}
                  image={product.coverImageUrl || product.images?.[0] || ''}
                  badge={`Only ${remainingStock} left`}
                  onClick={() => onNavigate('product-detail')}
                  className="shop-product-card"
                />
              </motion.div>
            })}
          </div> : <div className="shop-empty"><p className="shop-eyebrow">No match</p><h3>Nothing here yet.</h3><button type="button" onClick={() => { setQuery(''); setActiveCategory('All') }}>Clear filters</button></div>}
        </div>
      </section>
    </div>
  )
}