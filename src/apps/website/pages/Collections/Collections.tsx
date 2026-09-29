import type { WebPage } from '../../types'
import { useEffect, useMemo, useState } from 'react'
import { useCollections } from '../../../../shared/hooks/useCollections'
import { DEFAULT_COLLECTIONS_PAGE_CONFIG, getCollectionsPageConfig } from '../../../../shared/services/collections'
import { TopBarPage } from '../../components/TopBarPage/TopBarPage'
import './Collections.scss'

interface Props { onNavigate: (page: WebPage, slug?: string) => void }

export default function Collections({ onNavigate }: Props) {
  const { collections, loading, error } = useCollections()
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

  return (
    <div className="collections-page">
      <TopBarPage label={pageConfig.title} descriptions={pageConfig.descriptions} />
      <section className="collections-sections">
        <header className="collections-directory__header"><h1>{pageConfig.sectionTitle}</h1></header>
        <div className="collections-directory" style={{ gridTemplateColumns: `repeat(${pageConfig.columns}, minmax(0, 1fr))` } as React.CSSProperties}>
          {visibleCollections.map(collection => {
            const image = collection.coverImage || collection.coverImageUrl
            return (
              <article className="collections-directory__item" key={collection.id}>
                <button type="button" className="collections-directory__visual" onClick={() => onNavigate('collection-detail', collection.slug)} aria-label={`View ${collection.name} collection`}>
                  {image ? <img src={image} alt={`${collection.name} collection`} /> : <span className="collections-directory__image-empty">IZLI / {collection.type?.replace('_', ' ')}</span>}
                  <span className="collections-directory__overlay" />
                  <span className="collections-directory__caption">
                    {pageConfig.showTagline && <span>{collection.tagline}</span>}
                    <strong>{collection.name}</strong>
                  </span>
                </button>
                <div className="collections-directory__copy">
                  {pageConfig.showShortDescription && <p>{collection.shortDescription}</p>}
                  <button type="button" onClick={() => onNavigate('collection-detail', collection.slug)}>View collection <span aria-hidden="true">↗</span></button>
                </div>
              </article>
            )
          })}
          {loading && <p className="collections-count">Loading collections...</p>}
          {error && <p className="collections-count">Collections are temporarily unavailable.</p>}
          {!loading && !error && visibleCollections.length === 0 && <p className="collections-count">No active collections are available.</p>}
        </div>
      </section>
    </div>
  )
}