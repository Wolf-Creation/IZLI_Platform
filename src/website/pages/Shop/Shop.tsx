import { useState } from 'react'
import type { WebPage } from '../../types'
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel'
import './Shop.scss'

interface Props { onNavigate: (p: WebPage) => void }

const PRODUCTS_NEW_BASE = [
  { id: 'PRD-0008', name: 'Atlas Symbol Heavy Oversized', price: 65, release: 'Release 01', images: [] },
  { id: 'PRD-0054', name: 'Porte Ksour Heavy Oversized', price: 85, release: 'Release 01', images: [] },
]

const PRODUCTS_NEW = [...PRODUCTS_NEW_BASE, ...PRODUCTS_NEW_BASE, ...PRODUCTS_NEW_BASE]

const PRODUCTS_LAST = [
  { id: 'PRD-0016', name: 'Mountain Mark Crewneck', price: 125, release: 'Release 03', images: ['photo-1469334031218-e382a71b716b', 'photo-1523381210434-271e8be1f52b', 'photo-1617196034183-421b4040ed20'] },
  { id: 'PRD-0022', name: 'Loom Stripe Shirt', price: 145, release: 'Release 02', images: ['photo-1516762689617-e1cffcef479d', 'photo-1618354691373-d851c5c3a990', 'photo-1490481651871-ab68de25d43d'] },
  { id: 'PRD-0044', name: 'Essentials Straight Trouser', price: 115, release: 'Release 01', images: ['photo-1611312449408-fcece27cdbb7', 'photo-1521572163474-6864f9cf17ab', 'photo-1469334031218-e382a71b716b'] },
  { id: 'PRD-0051', name: 'Sahara Work Jacket', price: 285, release: 'Release 03', images: ['photo-1620799140408-edc6dcb6d633', 'photo-1617196034183-421b4040ed20', 'photo-1516762689617-e1cffcef479d'] },
]

export default function Shop({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState('new')

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-tabs">
          <button className={`shop-tab ${activeTab === 'new' ? 'shop-tab--active' : ''}`} onClick={() => setActiveTab('new')}>
            New releases
          </button>
          <button className={`shop-tab ${activeTab === 'last' ? 'shop-tab--active' : ''}`} onClick={() => setActiveTab('last')}>
            Last releases
          </button>
        </div>

        <ProductCarousel products={activeTab === 'new' ? PRODUCTS_NEW : PRODUCTS_LAST} />
      </div>
    </div>
  )
}