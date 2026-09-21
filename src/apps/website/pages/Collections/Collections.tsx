import { useState } from 'react'
import { INDIGO, CLAY, SAGE, BG } from '../../../../tokens'
import type { WebPage } from '../../types'
import { useProducts } from '../../../../shared/hooks/useProducts'
import { useCollections } from '../../../../shared/hooks/useCollections'
import './Collections.scss'

interface Props { onNavigate: (p: WebPage) => void }

const FILTERS = ['All', 'Heritage', 'Essentials', 'Studio', 'Community Lab']

const COLLECTION_COPY: Record<string, { eyebrow: string; headline: string }> = {
  'Echoes of Stone': { eyebrow: 'Heritage / 01', headline: 'Marks that carry forward.' },
  'Indigo Memory': { eyebrow: 'Heritage / 02', headline: 'Colour with a memory.' },
  'Atlas Marks': { eyebrow: 'Studio / 01', headline: 'Ideas take shape.' },
  'Heritage Essentials 01': { eyebrow: 'Essentials / 01', headline: 'Built for every day.' },
  'Mountain Memory': { eyebrow: 'Community Lab / 01', headline: 'A living archive.' },
  'Sahara Craft': { eyebrow: 'Studio / 02', headline: 'Form follows the desert.' },
}

export default function Collections({ onNavigate }: Props) {
  const { products, loading, error } = useProducts({ status: 'published' })
  const { collections, loading: collectionsLoading, error: collectionsError } = useCollections()
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? collections : collections.filter(collection => collection.universe === filter)
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
          const sectionCopy = COLLECTION_COPY[collection.name] ?? { eyebrow: `${collection.universe} / ${String(index + 1).padStart(2, '0')}`, headline: collection.name }
          const collectionProducts = products.filter(product =>
            (product.collectionIds ?? []).includes(collection.id) ||
            (collection.productIds ?? []).includes(product.id),
          )

          return (
            <section className={`collections-editorial ${index % 2 === 1 ? 'collections-editorial--reverse' : ''}`} key={collection.id}>
              <header className="collections-editorial__header">
                <div>
                  <span>{sectionCopy.eyebrow}</span>
                  <h2>{collection.name}</h2>
                </div>
                <button type="button" onClick={() => onNavigate('shop')}>Shop collection</button>
              </header>

              <div className="collections-editorial__body">
                <div className="collections-editorial__visual">
                  <img src={collection.coverImageUrl || ''} alt={`${collection.name} collection`} />
                  <div className="collections-editorial__visual-overlay" />
                  <div className="collections-editorial__visual-caption">
                    <span>{sectionCopy.eyebrow}</span>
                    <strong>{sectionCopy.headline}</strong>
                  </div>
                </div>

                <div className="collections-editorial__collections">
                  <p className="collections-editorial__copy">{collection.desc}</p>
                  <div className="collections-editorial__grid">
                    {(collectionProducts
                      .slice(0, 4)
                      .map(product => ({
                        ...product,
                        color: collection.name,
                        priceLabel: `${product.price} ${product.currency}`,
                        image: product.coverImageUrl || product.images?.[0] || '',
                      }))).map(product => (
                      <button key={`${collection.name}-${product.name}-${product.color}`} type="button" className="collection-card" onClick={() => onNavigate('product-detail')}>
                        <span className="collection-card__image">
                          <img src={product.image} alt={`${product.name} ${product.color}`} />
                        </span>
                        <span className="collection-card__info">
                          <span className="collection-card__name">{product.name}</span>
                          <span className="collection-card__meta">{product.color} · {product.priceLabel}</span>
                        </span>
                      </button>
                    ))}
                    {!loading && !collectionsLoading && !error && !collectionsError && collectionProducts.length === 0 && <p className="collections-editorial__copy">No published products in this collection yet.</p>}
                  </div>
                </div>
              </div>
            </section>
          )
        })}
        {(loading || collectionsLoading) && <div className="collections-count">Loading collections...</div>}
        {(error || collectionsError) && <div className="collections-count">Collections are temporarily unavailable.</div>}
        <div className="collections-count">Showing {visible.length} of {collections.length} collections</div>
      </section>
    </div>
  )
}