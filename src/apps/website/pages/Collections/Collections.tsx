import type { WebPage } from '../../types'
import { useEffect, useMemo, useState } from 'react'
import { MinimalistProductRail } from '../../components/MinimalistProductRail/MinimalistProductRail'
import { OptimizedImage } from '../../components/OptimizedImage/OptimizedImage'
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton'
import { TopBarPage } from '../../components/TopBarPage/TopBarPage'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { useCollections } from '../../../../shared/hooks/useCollections'
import { DEFAULT_COLLECTIONS_PAGE_CONFIG, getCollectionsPageConfig } from '../../../../shared/services/collections'
import bannerImage from '../../../../assets/Website_img/banner/banner_001.png'
import './Collections.scss'

interface Props {
  onNavigate: (page: WebPage, slug?: string) => void
}

export default function Collections({ onNavigate }: Props) {
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
    () => products.filter(product => (product.releaseSettings?.status ?? product.releaseStatus) === 'live' && product.releaseNumber === '01'),
    [products],
  )
  const minimalistProducts = useMemo(
    () => newProducts.map(product => {
      const image = product.coverImageUrl || product.images?.[0] || ''
      return {
        id: product.id,
        name: product.name,
        price: product.price === undefined ? 'Price TBA' : `${product.price} ${product.currency}`,
        image,
        hoverImage: product.images?.find(productImage => productImage !== image),
        mediaAssets: product.mediaAssets,
      }
    }),
    [newProducts],
  )

  return (
    <div className="collections-page">
      <TopBarPage
        className="collections-page__top-bar"
        label={'Collections'}
        descriptions={['Four creative directions, each with its own purpose, all connected by the same roots.']}
      />
      <section className="collections-sections website-section-spacing">
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

      <section className="collections-new-products website-section-spacing" aria-labelledby="collections-new-products-title">
        <div className="collections-new-products__layout website-content-container">
          <header className="collections-new-products__title-panel">
            <div className="collections-new-products__intro">
              <span className="collections-new-products__eyebrow">JUST ARRIVED</span>
              <h2 id="collections-new-products-title">New releases</h2>
              <p>Explore the latest pieces from IZLI, rooted in heritage and made for what comes next.</p>
              <PrimaryButton onClick={() => onNavigate('shop', 'new-releases')}>
                DISCOVER NEW RELEASES
              </PrimaryButton>
            </div>
          </header>

          <div className="collections-new-products__rail">
            {productsLoading ? <p className="collections-new-products__message">Loading products...</p> : productsError ? <p className="collections-new-products__message">Products are temporarily unavailable.</p> : minimalistProducts.length ? <MinimalistProductRail
              products={minimalistProducts}
              label="New releases"
              onNavigate={productId => onNavigate('product-detail', productId)}
            /> : <p className="collections-new-products__message">No new releases available right now.</p>}
          </div>
        </div>
      </section>
    </div>
  )
}