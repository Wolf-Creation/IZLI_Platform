import { useEffect } from 'react'
import type { WebPage } from '../../types'
import { useCollection } from '../../../../shared/hooks/useCollections'
import { TopBarPage } from '../../components/TopBarPage/TopBarPage'
import './Collections.scss'

interface Props { slug: string; onNavigate: (page: WebPage, productId?: string) => void }

export default function CollectionDetailPage({ slug, onNavigate }: Props) {
  const { collection, products, loading, error } = useCollection(slug)
  const heroImage = collection?.heroImage || collection?.coverImage || collection?.coverImageUrl
  const collectionNameClass = collection?.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.collections-detail-page')
    const header = document.querySelector<HTMLElement>('.hero-header')
    const topBar = page?.querySelector<HTMLElement>('.top-bar-page')
    if (!page || !header || !topBar) return

    const updateHeights = () => {
      page.style.setProperty('--collections-main-header-height', `${header.getBoundingClientRect().height}px`)
      page.style.setProperty('--collections-top-bar-height', `${topBar.getBoundingClientRect().height}px`)
    }

    updateHeights()
    const observer = new ResizeObserver(updateHeights)
    observer.observe(header)
    observer.observe(topBar)

    return () => {
      observer.disconnect()
      page.style.removeProperty('--collections-main-header-height')
      page.style.removeProperty('--collections-top-bar-height')
    }
  }, [collection?.id])

  if (loading) return <div className="collections-detail-state">Loading collection...</div>
  if (error || !collection) return <div className="collections-detail-state">This collection could not be found.</div>

  return (
    <div className="collections-page collections-detail-page">
      <TopBarPage label={collection.name} descriptions={[collection.tagline || '', collection.shortDescription || '']} />
      <div className={`${collectionNameClass}_container`}>
        <section className="collections-detail-hero">
          {heroImage ? <img src={heroImage} alt={`${collection.name} collection`} /> : <div className="collections-detail-hero__empty">{collection.name}</div>}
          <div className="collections-detail-hero__overlay" />
          <div className="collections-detail-hero__caption">
            <p>{collection.tagline}</p>
            <h1>{collection.name}</h1>
          </div>
          <section className="collections-detail-story">
            <p>{collection.description || collection.shortDescription}</p>
          </section>
        </section>
        <section className="collections-detail-products">
          <header><span>Collection</span><h2>Pieces in this collection</h2></header>
          {products.length ? <div className="collections-detail-products__grid">
            {products.map(product => {
              const image = product.coverImageUrl || product.images?.[0] || product.media?.mainImage
              return <button type="button" className="collections-detail-product" key={product.id} onClick={() => onNavigate('product-detail', product.id)}>
                <span className="collections-detail-product__image">{image ? <img src={image} alt={product.name} /> : <span>IZLI</span>}</span>
                <span className="collections-detail-product__meta"><strong>{product.name}</strong><span>{product.price ?? 'Price TBA'} {product.price !== undefined ? product.currency : ''}</span></span>
              </button>
            })}
          </div> : <p className="collections-detail-products__empty">Products from this collection will appear here.</p>}
        </section>
      </div>
    </div>
  )
}