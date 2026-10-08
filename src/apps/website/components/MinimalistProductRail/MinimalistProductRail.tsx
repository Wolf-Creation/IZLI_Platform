import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { MinimalistProductCard, type MinimalistProduct } from '../MinimalistProductCard/MinimalistProductCard'
import './MinimalistProductRail.scss'

interface Props {
  products: MinimalistProduct[]
  onNavigate: (productId: string) => void
  label: string
  onProgressChange?: (progress: number) => void
  showProgress?: boolean
  scrollable?: boolean
  endMessage?: string
}

const PAGE_SIZE = 4

export function MinimalistProductRail({
  products,
  onNavigate,
  label,
  onProgressChange,
  showProgress = true,
  scrollable = false,
  endMessage,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const pageCount = Math.ceil(products.length / PAGE_SIZE)
  const currentPage = Math.min(page, Math.max(0, pageCount - 1))
  const pages = Array.from({ length: pageCount }, (_, index) => {
    const pageStart = pageStartFor(index, products.length)
    return products.slice(pageStart, pageStart + PAGE_SIZE)
  })
  const currentPageStart = pageStartFor(currentPage, products.length)
  const visibleProductCount = Math.min(PAGE_SIZE, products.length - currentPageStart)
  const progress = products.length
    ? Math.round(((currentPageStart + visibleProductCount) / products.length) * 100)
    : 0

  useEffect(() => {
    if (!scrollable) onProgressChange?.(progress)
  }, [onProgressChange, progress, scrollable])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!scrollable || !viewport) return

    let lastTouchX = 0
    let lastTouchY = 0
    let isHorizontalSwipe = false

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      lastTouchX = touch.clientX
      lastTouchY = touch.clientY
      isHorizontalSwipe = false
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return

      const deltaX = lastTouchX - touch.clientX
      const deltaY = lastTouchY - touch.clientY
      if (!isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 4) {
        isHorizontalSwipe = true
      }
      if (!isHorizontalSwipe) return

      event.preventDefault()
      window.scrollBy({ top: deltaX, behavior: 'instant' })
      lastTouchX = touch.clientX
      lastTouchY = touch.clientY
    }

    const handleTouchEnd = () => {
      isHorizontalSwipe = false
    }

    viewport.addEventListener('touchstart', handleTouchStart, { passive: true })
    viewport.addEventListener('touchmove', handleTouchMove, { passive: false })
    viewport.addEventListener('touchend', handleTouchEnd, { passive: true })
    viewport.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      viewport.removeEventListener('touchstart', handleTouchStart)
      viewport.removeEventListener('touchmove', handleTouchMove)
      viewport.removeEventListener('touchend', handleTouchEnd)
      viewport.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [scrollable])

  const navigateToPage = (nextPage: number) => {
    if (nextPage === currentPage) return
    setPage(nextPage)
  }

  return (
    <div className={`minimalist-product-rail${scrollable ? ' minimalist-product-rail--scrollable' : ''}${!scrollable && pageCount > 1 ? ' has-pagination' : ''}`} role="region" aria-label={label}>
      {!scrollable && pageCount > 1 && <button
        type="button"
        className="minimalist-product-rail__arrow minimalist-product-rail__arrow--previous"
        aria-label="Previous products"
        onClick={() => navigateToPage((currentPage - 1 + pageCount) % pageCount)}
      >
        <Icon icon="solar:alt-arrow-left-linear" aria-hidden="true" />
      </button>}
      {scrollable
        ? <div className="minimalist-product-rail__viewport" ref={viewportRef}>
            <div className="minimalist-product-rail__grid">
              {products.map(product => (
                <MinimalistProductCard key={product.id} product={product} onClick={() => onNavigate(product.id)} />
              ))}
            </div>
            {endMessage && (
              <div className="minimalist-product-rail__end-message" aria-label={endMessage}>
                <span>
                  {endMessage.split(/(NEW RELEASE|STORY)/gi).map((part, index) =>
                    /^(NEW RELEASE|STORY)$/i.test(part)
                      ? <span className="minimalist-product-rail__end-message-highlight" key={`${part}-${index}`}>{part}</span>
                      : part
                  )}
                </span>
              </div>
            )}
          </div>
        : <div className="minimalist-product-rail__viewport" aria-live="polite">
            <div
              className="minimalist-product-rail__track"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {pages.map((pageProducts, index) => (
                <div className="minimalist-product-rail__page" key={index} aria-hidden={index !== currentPage}>
                  <div className="minimalist-product-rail__grid">
                    {pageProducts.map(product => (
                      <MinimalistProductCard key={product.id} product={product} onClick={() => onNavigate(product.id)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>}
      {showProgress && <MinimalistProductProgress progress={progress} />}
      {!scrollable && pageCount > 1 && <button
        type="button"
        className="minimalist-product-rail__arrow minimalist-product-rail__arrow--next"
        aria-label="Next products"
        onClick={() => navigateToPage((currentPage + 1) % pageCount)}
      >
        <Icon icon="solar:alt-arrow-right-linear" aria-hidden="true" />
      </button>}
      
    </div>
  )
}

export function MinimalistProductProgress({ progress, label = 'Products viewed' }: { progress: number; label?: string }) {
  return (
    <div
      className="minimalist-product-rail__progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <span style={{ width: `${progress}%` }} />
    </div>
  )
}

function pageStartFor(page: number, productCount: number): number {
  return Math.min(page * PAGE_SIZE, Math.max(0, productCount - PAGE_SIZE))
}
