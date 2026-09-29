import { useEffect, useState } from 'react'
import type { WebPage } from '../../types'
import type { Product } from '../../../../entities'
import type { CartItemInput } from '../../cart'
import { useProduct } from '../../../../shared/hooks/useProducts'
import './ProductDetail.scss'

interface Props { productId: string | null; onNavigate: (p: WebPage) => void; onAddToCart: (item: CartItemInput) => void; onToggleWishlist: (item: CartItemInput) => void; isWishlisted: (id: string) => boolean }

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=1500&fit=crop&auto=format'

function productImages(product: Product) {
    const media = product.media
    const images = [media?.mainImage, product.coverImageUrl, ...(media?.gallery ?? []), ...(media?.detailImages ?? []), ...(media?.front ?? []), ...(media?.back ?? []), ...(product.images ?? [])].filter((image, index, list): image is string => Boolean(image) && list.indexOf(image) === index)
    return images.length ? images : [FALLBACK_IMAGE]
}

export default function ProductDetail({ productId, onNavigate, onAddToCart, onToggleWishlist, isWishlisted }: Props) {
    const { product, loading, error } = useProduct(productId ?? '')
    const [mobileImageIndex, setMobileImageIndex] = useState(0)
    const [selectedSize, setSelectedSize] = useState('')
    const [qty, setQty] = useState(1)
    const [specsTab, setSpecsTab] = useState<'details' | 'returns'>('details')
    const images = product ? productImages(product) : [FALLBACK_IMAGE]

    useEffect(() => {
        setMobileImageIndex(0)
    }, [productId])

    useEffect(() => {
        if (images.length < 2 || loading || error) return

        const intervalId = window.setInterval(() => {
            setMobileImageIndex(currentIndex => (currentIndex + 1) % images.length)
        }, 2000)

        return () => window.clearInterval(intervalId)
    }, [error, images.length, loading])

    if (loading) return <div className="product-detail-state"><p>Loading product...</p></div>
    if (error || !product) return <div className="product-detail-state"><p className="product-detail-eyebrow">Product unavailable</p><h1>This piece could not be found.</h1><button type="button" onClick={() => onNavigate('shop')}>Back to Shop</button></div>

    const sizes = product.sizes ?? []
    const availablePieceIds = new Set((product.inventoryPieces ?? []).filter(piece => piece.status === 'available').map(piece => piece.variantId))
    const isSizeAvailable = (size: string, stock: number) => stock > 0 || (product.variants ?? []).some(variant => variant.size === size && availablePieceIds.has(variant.id))
    const activeSize = selectedSize || sizes.find(size => isSizeAvailable(size.size, size.stock))?.size || sizes[0]?.size || ''
    const priceLabel = product.price === undefined ? 'Price TBA' : `${product.price} ${product.currency}`
    const totalLabel = product.price === undefined ? 'Price TBA' : `${product.price * qty} ${product.currency}`
    const remainingPieces = product.inventoryPieces
        ? product.inventoryPieces.filter(piece => piece.status === 'available').length
        : product.quantity ?? 0
    const releaseLabel = product.releaseNumber ? `Release ${product.releaseNumber}` : 'Active release'
    const color = product.colorways?.[0]
    const productIsWishlisted = isWishlisted(product.id)
    const wishlistItem = { id: product.id, name: product.name, universe: product.universe, price: product.price, currency: product.currency, size: activeSize || 'M', img: images[0] }
    const addToCart = () => {
        onAddToCart({ id: product.id, name: product.name, universe: product.universe, price: product.price, currency: product.currency, size: activeSize || 'M', img: images[0], qty })
        onNavigate('cart')
    }

    return <div className="product-detail-page">
        <div className="product-detail-breadcrumbs"><div className="product-detail-shell"><button type="button" onClick={() => onNavigate('shop')}>Shop</button><span>/</span><span>{product.universe}</span><span>/</span><strong>{product.name}</strong></div></div>
        <main className="product-detail-shell product-detail-main">
            <section className="product-detail-hero">
                <div className="product-detail-gallery" aria-label={`${product.name} image gallery`}>
                    <div className="product-detail-gallery__feature-grid">{images.map((image, index) => <div key={`${image}-${index}`}><img src={image} alt={`${product.name} view ${index + 1}`} /></div>)}</div>
                    <div className="product-detail-gallery__mobile-slider">
                        <div className="product-detail-gallery__mobile-track" style={{ transform: `translateX(-${mobileImageIndex * 100}%)` }}>
                            {images.map((image, index) => <img key={`${image}-mobile-${index}`} src={image} alt={`${product.name} view ${index + 1}`} />)}
                        </div>
                        {images.length > 1 && <>
                            <button type="button" className="product-detail-gallery__mobile-arrow product-detail-gallery__mobile-arrow--prev" onClick={() => setMobileImageIndex(index => (index - 1 + images.length) % images.length)} aria-label="Previous product image">‹</button>
                            <button type="button" className="product-detail-gallery__mobile-arrow product-detail-gallery__mobile-arrow--next" onClick={() => setMobileImageIndex(index => (index + 1) % images.length)} aria-label="Next product image">›</button>
                            <div className="product-detail-gallery__mobile-dots" aria-label="Product image slides">{images.map((image, index) => <button type="button" key={`${image}-dot`} className={index === mobileImageIndex ? 'is-active' : ''} onClick={() => setMobileImageIndex(index)} aria-label={`Show product image ${index + 1}`} />)}</div>
                        </>}
                    </div>
                </div>
                <div className="product-detail-purchase">
                    <div className="product-detail-release-meta">
                        <div className="product-detail-release-meta__info">
                            <span className="product-detail-release-number">{releaseLabel}</span>
                            <span className="product-detail-release-stock">{remainingPieces} pieces remaining</span>
                        </div>
                        <div className="product-detail-price">{priceLabel}</div>
                    </div>
                    <div className="product-detail-kicker"></div>
                    <div className="product-detail-title-row">
                        <h1>{product.name}</h1>
                        <button type="button" className={`product-detail-wishlist${productIsWishlisted ? ' is-active' : ''}`} onClick={() => onToggleWishlist(wishlistItem)} aria-label={productIsWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={productIsWishlisted}>
                            <svg viewBox="0 0 24 24" fill={productIsWishlisted ? 'currentColor' : 'none'} aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        </button>
                    </div>
                    <p className="product-detail-sku">{product.sku}</p>
                    <p className="product-detail-description">{product.shortDescription || product.description}</p>
                    {product.colorways?.length ? <div className="product-detail-color"><span>Color</span><div className="product-detail-color__swatches">{product.colorways.map(colorway => <button type="button" key={colorway.id} aria-label={colorway.name}>{colorway.images?.[0] ? <img src={colorway.images[0]} alt={colorway.name} /> : <i style={{ background: colorway.hex }} />}</button>)}</div></div> : color && <div className="product-detail-color"><span>Color</span><strong><i style={{ background: color.hex }} />{color.name}</strong></div>}
                    {sizes.length > 0 && <div className="product-detail-size"><div className="product-detail-field-label"><span>Size</span><span>Choose your fit</span></div><div className="product-detail-size__options">{sizes.map(size => { const available = isSizeAvailable(size.size, size.stock); return <button type="button" key={size.size} className={activeSize === size.size ? 'is-selected' : ''} disabled={!available} onClick={() => setSelectedSize(size.size)}>{size.size}</button> })}</div></div>}
                    <div className="product-detail-buy"><div className="product-detail-quantity"><button type="button" onClick={() => setQty(value => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><span>{qty}</span><button type="button" onClick={() => setQty(value => value + 1)} aria-label="Increase quantity">+</button></div><button type="button" className="product-detail-add" onClick={addToCart}>Add to Cart <span>{totalLabel}</span></button></div><p className="product-detail-shipping">Complimentary delivery on orders over 250 {product.currency}. Secure checkout.</p>
                    <div className="product-detail-tabs">
                        <nav className="product-detail-specs__nav" aria-label="Product information categories">
                            <button type="button" className={specsTab === 'details' ? 'is-active' : ''} onClick={() => setSpecsTab('details')}>Details</button>
                            <button type="button" className={specsTab === 'returns' ? 'is-active' : ''} onClick={() => setSpecsTab('returns')}>Returns and deliveries</button>
                        </nav>
                        {specsTab === 'details' ? <div className="product-detail-specs__grid">
                            {[
                                ['Fit', product.characteristics?.fit || product.fit?.join(', ') || 'Not specified'],
                                ['Fabric', product.characteristics?.fabric || product.materials?.join(', ') || 'Not specified'],
                                ['Weight', product.characteristics?.weight || 'Not specified'],
                                ['Composition', product.characteristics?.composition || 'Not specified'],
                            ].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
                        </div> : <div className="product-detail-specs__grid product-detail-specs__returns">
                            {[
                                ['Returns', '15-day returns on unworn pieces.'],
                                ['Shipping', 'Delivery in 2–3 business days.'],
                                ['Support', 'Pre-paid labels available for domestic returns.'],
                            ].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
                        </div>}

                    </div>
                </div>
            </section>
            {product.media?.modelImages?.length ? <section className="product-detail-campaign"><div><p className="product-detail-eyebrow">Campaign</p><h2>Seen in the world.</h2></div><div className="product-detail-campaign__images">{product.media.modelImages.slice(0, 3).map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${product.name} campaign ${index + 1}`} />)}</div></section> : null}
        </main>
    </div>
}