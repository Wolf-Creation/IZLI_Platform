import { useEffect, useMemo, useState } from 'react'
import type { WebPage } from '../../types'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { TopBarPage } from '../../components/TopBarPage/TopBarPage'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { useCategories } from '../../../../shared/hooks/useCategories'
import { useCollections } from '../../../../shared/hooks/useCollections'
import type { CartItemInput } from '../../cart'
import './Shop.scss'

interface Props { onNavigate: (p: WebPage, productId?: string) => void; onAddToCart: (item: CartItemInput) => void; onToggleWishlist: (item: CartItemInput) => void; isWishlisted: (id: string) => boolean; initialFilter?: string }

type FilterState = {
  productType: string
  collection: string
  color: string
  clothingSize: string
}

export default function Shop({ onNavigate, onAddToCart, onToggleWishlist, isWishlisted, initialFilter }: Props) {
  const { products, loading, error } = useProducts({ status: 'published' })
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  const { collections, loading: collectionsLoading, error: collectionsError } = useCollections()
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({ productType: '', collection: '', color: '', clothingSize: '' })
  const [showNewReleaseFilter, setShowNewReleaseFilter] = useState(initialFilter === 'new-releases')
  const shouldReduceMotion = useReducedMotion()

  const activeFilterCount = Object.values(filters).filter(Boolean).length + Number(showNewReleaseFilter)

  const productCategories = useMemo(
    () => categories.filter(category => products.some(product => (product.categoryIds ?? []).includes(category.id))),
    [categories, products],
  )

  const productTypes = useMemo(() => [...new Set(products.map(product => product.productType).filter(Boolean))] as string[], [products])
  const productCollections = useMemo(
    () => collections.filter(collection => products.some(product => product.collectionId === collection.id || (product.collectionIds ?? []).includes(collection.id))),
    [collections, products],
  )

  useEffect(() => {
    setShowNewReleaseFilter(initialFilter === 'new-releases')
  }, [initialFilter])

  useEffect(() => {
    if (activeCategory !== 'All' && !productCategories.some(category => category.id === activeCategory)) {
      setActiveCategory('All')
    }
  }, [activeCategory, productCategories])

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = products.filter(product => {
      const matchesCategory = activeCategory === 'All' || (product.categoryIds ?? []).includes(activeCategory)
      const matchesType = !filters.productType || product.productType === filters.productType
      const matchesCollection = !filters.collection || product.collectionId === filters.collection || (product.collectionIds ?? []).includes(filters.collection)
      const matchesQuery = !normalizedQuery || product.name.toLowerCase().includes(normalizedQuery)
      const matchesSize = !filters.clothingSize || (product.sizes ?? []).some(size => size.size === filters.clothingSize)
      const matchesRelease = !showNewReleaseFilter || ((product.releaseSettings?.status ?? product.releaseStatus) === 'live' && product.releaseNumber === '01')
      return matchesCategory && matchesType && matchesCollection && matchesSize && matchesQuery && matchesRelease
    })

    return [...filtered].sort((a, b) => a.id.localeCompare(b.id))
  }, [activeCategory, filters, products, query, showNewReleaseFilter])

  useEffect(() => {
    if (filters.collection && !productCollections.some(collection => collection.id === filters.collection)) {
      setFilters(current => ({ ...current, collection: '' }))
    }
    if (filters.productType && !productTypes.includes(filters.productType)) {
      setFilters(current => ({ ...current, productType: '' }))
    }
  }, [filters.collection, filters.productType, productCollections, productTypes])

  const selectCategory = (categoryId: string) => setActiveCategory(categoryId)
  const removeNewReleaseFilter = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('filter')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
    setShowNewReleaseFilter(false)
  }
  const clearFilters = () => {
    setQuery('')
    setActiveCategory('All')
    setFilters({ productType: '', collection: '', color: '', clothingSize: '' })
    removeNewReleaseFilter()
  }

  return (
    <div className="shop-page">
      <TopBarPage
        label="Shop"
        descriptions={['Discover all products.', 'Timeless essentials built for everyday wear.']}
      />

      <div className="shop-shell shop-shell--category-bar">
        <div className="shop-category-strip" aria-label="Shop categories">
          <div className="shop-category-strip__categories">
            {[{ id: 'All', label: 'All' }, ...productCategories].map(category => (
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
        {showNewReleaseFilter && (
          <div className="shop-active-filters">
            <span>Showing new releases</span>
            <button type="button" onClick={removeNewReleaseFilter} aria-label="Remove new releases filter">×</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFilterOpen && <motion.button
          key="shop-filter-overlay"
          type="button"
          className="shop-filter-overlay"
          onClick={() => setIsFilterOpen(false)}
          aria-label="Close filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
        />}
        {isFilterOpen && <motion.aside
          key="shop-filter-drawer"
          className="shop-filter-drawer"
          aria-label="Shop filters"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="shop-filter-drawer__header">
            <h2>Filter</h2>
            <button type="button" onClick={() => setIsFilterOpen(false)} aria-label="Close filters">×</button>
          </div>
          <div className="shop-filter-drawer__body">
            {([
              ['productType', 'Product type', productTypes],
              ['collection', 'Collection', productCollections.map(collection => collection.name)],
              ['color', 'Color', ['Beige', 'Black', 'White', 'Olive', 'Grey']],
              ['clothingSize', 'Size', ['S', 'M', 'L', 'XL', 'XXL']],
            ] as const).map(([key, label, options]) => (
              <section className="shop-filter-group" key={key}>
                <h3>{label}</h3>
                <div className="shop-filter-options">
                  {options.map(option => {
                    const value = key === 'collection' ? productCollections.find(collection => collection.name === option)?.id ?? option : option
                    return <button key={option} type="button" className={filters[key] === value ? 'is-active' : ''} onClick={() => setFilters(current => ({ ...current, [key]: current[key] === value ? '' : value }))}>{option}</button>
                  })}
                </div>
              </section>
            ))}
          </div>
          <button type="button" className="shop-filter-clear" onClick={clearFilters}>Clear filters</button>
        </motion.aside>}
      </AnimatePresence>

      <section className="shop-catalogue" id="shop-catalogue">
        <div className="shop-shell">
          

          {loading || categoriesLoading || collectionsLoading ? <div className="shop-empty"><h3>Loading catalogue...</h3></div> : error || categoriesError || collectionsError ? <div className="shop-empty"><h3>Catalogue unavailable.</h3><p>{error ?? categoriesError ?? collectionsError}</p></div> : visibleProducts.length > 0 ? <div className="shop-product-grid">
            {visibleProducts.map((product, index) => {
              const remainingStock = (product.sizes ?? []).reduce((total, size) => total + size.stock, 0) || product.quantity || 0
              return <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.45, delay: index * 0.04 }}>
                <ProductCard
                  name={product.name}
                  price={product.price === undefined ? 'Price TBA' : `${product.price} ${product.currency}`}
                  image={product.coverImageUrl || product.images?.[0] || ''}
                  images={product.images}
                  mediaAssets={product.mediaAssets}
                  badge={`Only ${remainingStock} left`}
                  onClick={() => onNavigate('product-detail', product.id)}
                  onAddToCart={() => onAddToCart({ id: product.id, name: product.name, universe: product.universe, price: product.price, currency: product.currency, size: product.sizes?.find(size => size.stock > 0)?.size ?? 'M', img: product.coverImageUrl || product.images?.[0] || '' })}
                  onToggleWishlist={() => onToggleWishlist({ id: product.id, name: product.name, universe: product.universe, price: product.price, currency: product.currency, size: product.sizes?.find(size => size.stock > 0)?.size ?? 'M', img: product.coverImageUrl || product.images?.[0] || '' })}
                  isWishlisted={isWishlisted(product.id)}
                  className="shop-product-card"
                />
              </motion.div>
            })}
          </div> : <div className="shop-empty"><p className="shop-eyebrow">No match</p><h3>Nothing here yet.</h3><button type="button" onClick={clearFilters}>Clear filters</button></div>}
        </div>
      </section>
    </div>
  )
}