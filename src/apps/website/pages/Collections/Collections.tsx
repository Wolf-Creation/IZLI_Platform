import type { WebPage } from '../../types'
import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { OptimizedImage } from '../../components/OptimizedImage/OptimizedImage'
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton'
import { TopBarPage } from '../../components/TopBarPage/TopBarPage'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { useCollections } from '../../../../shared/hooks/useCollections'
import { DEFAULT_COLLECTIONS_PAGE_CONFIG, getCollectionsPageConfig } from '../../../../shared/services/collections'
import type { CartItemInput } from '../../cart'
import bannerImage from '../../../../assets/Website_img/banner/banner_001.png'
import './Collections.scss'

interface Props {
  onNavigate: (page: WebPage, slug?: string) => void
  onAddToCart: (item: CartItemInput) => void
  onToggleWishlist: (item: CartItemInput) => void
  isWishlisted: (id: string) => boolean
}

export default function Collections({ onNavigate, onAddToCart, onToggleWishlist, isWishlisted }: Props) {
  const { collections, loading, error } = useCollections()
  const { products, loading: productsLoading, error: productsError } = useProducts({ status: 'published' })
  const [pageConfig, setPageConfig] = useState(DEFAULT_COLLECTIONS_PAGE_CONFIG)

  useEffect(() => {
    getCollectionsPageConfig().then(setPageConfig).catch(() => setPageConfig(DEFAULT_COLLECTIONS_PAGE_CONFIG))
  }, [])

  const visibleCollections = useMemo(() => {
    const visible = new Set(pageConfig.visibleCollectionSlugs)
    const order = new Map(pageConfig.collectionOrder.map((slug, index) => [slug, index]))
    return collections
      .filter(collection => visible.has(collection.slug))
      .sort((left, right) => (order.get(left.slug) ?? Number.MAX_SAFE_INTEGER) - (order.get(right.slug) ?? Number.MAX_SAFE_INTEGER) || (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
  }, [collections, pageConfig.collectionOrder, pageConfig.visibleCollectionSlugs])

  const newProducts = useMemo(
    () => products.filter(product => (product.releaseSettings?.status ?? product.releaseStatus) === 'live' && product.releaseNumber === '01').slice(0, 4),
    [products],
  )

  return (
    <div className="collections-page">
      <TopBarPage
        className="collections-page__top-bar"
        label={'Different stories.\nOne circle.'}
        descriptions={['Four creative directions, each with its own purpose, all connected by the same roots.']}
      />
      <section className="collections-sections">
        <div className="collections-directory" data-columns={pageConfig.columns}>
          {visibleCollections.map(collection => {
            const image = collection.coverImage || collection.coverImageUrl
            const imageAsset = collection.mediaAssets?.find(asset => asset.url === image)
            return (
              <article className="collections-directory__item" key={collection.id}>
                <button type="button" className="collections-directory__visual" onClick={() => onNavigate('collection-detail', collection.slug)} aria-label={`View ${collection.name} collection`}>
                  {image ? <OptimizedImage src={image} preset="collectionCard" dimensions={imageAsset} alt={`${collection.name} collection`} /> : <span className="collections-directory__image-empty">IZLI / {collection.type?.replace('_', ' ')}</span>}
                </button>
                <div className="collections-directory__copy">
                  <div className="collections-directory__caption">
                    {pageConfig.showTagline && <span>{collection.tagline}</span>}
                    <strong>{collection.name}</strong>
                  </div>
                  {pageConfig.showShortDescription && <p>{collection.shortDescription}</p>}
                  <PrimaryButton className="collections-directory__cta" onClick={() => onNavigate('collection-detail', collection.slug)}>View collection</PrimaryButton>
                </div>
              </article>
            )
          })}
          {loading && <p className="collections-count">Loading collections...</p>}
          {error && <p className="collections-count">Collections are temporarily unavailable.</p>}
          {!loading && !error && visibleCollections.length === 0 && <p className="collections-count">No active collections are available.</p>}
        </div>
      </section>

      <section className="collections-new-products" aria-labelledby="collections-new-products-title">
        <header className="collections-new-products__title-panel">
          <h2 id="collections-new-products-title">New releases</h2>
        </header>

        <div className="collections-new-products__rail">
          {productsLoading ? <p className="collections-new-products__message">Loading products...</p> : productsError ? <p className="collections-new-products__message">Products are temporarily unavailable.</p> : newProducts.length ? <div className="collections-new-products__track">
            {[false, true].map(isDuplicate => (
              <div className="collections-new-products__group" key={isDuplicate ? 'duplicate' : 'original'} aria-hidden={isDuplicate}>
                {newProducts.map(product => {
                  const image = product.coverImageUrl || product.images?.[0] || ''
                  return <div className="collections-new-products__item" key={`${isDuplicate ? 'duplicate-' : ''}${product.id}`}>
                    <ProductCard
                      name={product.name}
                      price={product.price === undefined ? 'Price TBA' : `${product.price} ${product.currency}`}
                      image={image}
                      images={product.images}
                      mediaAssets={product.mediaAssets}
                      onClick={isDuplicate ? undefined : () => onNavigate('product-detail', product.id)}
                      onAddToCart={isDuplicate ? undefined : () => onAddToCart({ id: product.id, name: product.name, universe: product.universe, price: product.price, currency: product.currency, size: product.sizes?.find(size => size.stock > 0)?.size ?? 'M', img: image })}
                      onToggleWishlist={isDuplicate ? undefined : () => onToggleWishlist({ id: product.id, name: product.name, universe: product.universe, price: product.price, currency: product.currency, size: product.sizes?.find(size => size.stock > 0)?.size ?? 'M', img: image })}
                      isWishlisted={isWishlisted(product.id)}
                      isInteractive={!isDuplicate}
                      className="collections-new-products__card"
                    />
                  </div>
                })}
              </div>
            ))}
          </div> : <p className="collections-new-products__message">No new releases available right now.</p>}
        </div>
      </section>

      <div className="collections-banner" aria-label="IZLI: a land, a people, a continuing story">
        <img src={bannerImage} alt="IZLI, a land, a people, a continuing story" loading="lazy" decoding="async" />
      </div>
    </div>
  )
}