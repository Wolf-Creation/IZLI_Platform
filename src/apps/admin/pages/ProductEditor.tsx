import { useEffect, useMemo, useState } from 'react'
import type { Screen } from '../../../types'
import type { Currency, InventoryPiece, InventoryPieceStatus, MediaAsset, MediaUploadResult, Product, ProductActivity, ProductMedia, ProductSeo, ProductStatus, ProductStory, ProductType, ProductUniverse } from '../../../entities'
import { useProduct } from '../../../shared/hooks/useProducts'
import { useCategories } from '../../../shared/hooks/useCategories'
import { useCollections } from '../../../shared/hooks/useCollections'
import { createProduct, getProductActivity, getProducts, updateProduct } from '../../../shared/services/products'
import { api } from '../../../shared/services/api'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const PRODUCT_TABS = ['Overview', 'Product Information', 'Caractéristiques produit', 'Design & Heritage', 'Variants', 'Pricing', 'Release', 'Inventory', 'QR Codes', 'Media', 'Story', 'SEO', 'Activity'] as const
type ProductTab = typeof PRODUCT_TABS[number]
const REQUIRED_FIELD_TABS: Record<string, ProductTab> = {
  name: 'Product Information', sku: 'Product Information', categoryId: 'Product Information', collectionId: 'Product Information',
  universe: 'Product Information', gender: 'Product Information', productType: 'Product Information', shortDescription: 'Product Information',
  colors: 'Variants', sizes: 'Variants', sellingPrice: 'Pricing', mainImage: 'Media',
}
const REQUIRED_FIELD_LABELS: Record<string, string> = {
  name: 'Product name', sku: 'SKU', categoryId: 'Category', collectionId: 'Collection', universe: 'Universe', gender: 'Gender',
  productType: 'Product type', shortDescription: 'Short description', colors: 'Color name / color code', sizes: 'Size', sellingPrice: 'Selling price', mainImage: 'Main image',
}
const PRODUCT_STATUSES: ProductStatus[] = ['draft', 'ready', 'published', 'archived']
const PRODUCT_TYPES = ['Oversized T-Shirt', 'Heritage Jersey', 'Heavy T-Shirt', 'Hoodie', 'Shirt']
const GENDERS = ['Men', 'Women', 'Unisex']
const UNIVERSES: ProductUniverse[] = ['Heritage', 'Essentials', 'Studio', 'Community Lab']
const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const INVENTORY_STATUSES: InventoryPieceStatus[] = ['available', 'reserved', 'sold', 'returned', 'damaged', 'lost']
const EMPTY_MEDIA: ProductMedia = { mainImage: '', gallery: [], detailImages: [], front: [], back: [], sleeve: [], embroidery: [], modelImages: [], campaignVideo: '', lifestyleImages: [] }
const EMPTY_STORY: ProductStory = { fullStory: '', designStory: '' }
const EMPTY_SEO: ProductSeo = { slug: '', metaTitle: '', metaDescription: '', keywords: [], ogImage: '' }

interface Props { onNavigate: (s: Screen) => void; productId: string | null; onDone: () => void }
interface ProductInformationForm {
  name: string; sku: string; categoryId: string; collectionId: string; legacy: string; universe: ProductUniverse | ''
  gender: string; productType: string; shortDescription: string; fullDescription: string; status: ProductStatus
  characteristics: { fit: string; fabric: string; composition: string; weight: string; finish: string; collar: string; sleeve: string; bottomHem: string; sleeveHem: string }
  design: { designName: string; tifinaghText: string; meaning: string; inspiration: string; heritageTheme: string; motif: string; motifMeaning: string; designStory: string; heritageStory: string; decorationTechnique: string; decorationPosition: string; customPosition: string; threadColor: string; threadColorHex: string; version: string }
  colors: { id: string; name: string; colorCode: string; hex: string; image: string }[]
  sizes: string[]
  pricing: { sellingPrice: string; compareAtPrice: string; currency: Currency; fabricCost: string; sewingCost: string; embroideryCost: string; washingCost: string; packagingCost: string; otherCost: string }
  release: { number: string; name: string; date: string; quantity: string; price: string; status: 'draft' | 'upcoming' | 'early-access' | 'live' | 'sold-out' | 'closed'; earlyAccess: boolean; earlyAccessDuration: string; earlyAccessUnit: 'hours' | 'days'; keeperPoints: string; keeperExclusive: boolean }
}
const EMPTY_FORM: ProductInformationForm = { name: '', sku: '', categoryId: '', collectionId: '', legacy: '', universe: '', gender: '', productType: '', shortDescription: '', fullDescription: '', status: 'draft', characteristics: { fit: 'Boxy Heavy Oversized', fabric: 'Jersey Cotton', composition: '100% Cotton', weight: '300 GSM', finish: 'Garment Washed', collar: '1x1 Rib', sleeve: '24 cm', bottomHem: '3 cm', sleeveHem: '3 cm' }, design: { designName: '', tifinaghText: '', meaning: '', inspiration: '', heritageTheme: '', motif: '', motifMeaning: '', designStory: '', heritageStory: '', decorationTechnique: '', decorationPosition: '', customPosition: '', threadColor: '', threadColorHex: '#E7DFD2', version: 'v1.0' }, colors: [], sizes: [], pricing: { sellingPrice: '', compareAtPrice: '', currency: 'TND', fabricCost: '', sewingCost: '', embroideryCost: '', washingCost: '', packagingCost: '', otherCost: '' }, release: { number: '01', name: '', date: '', quantity: '', price: '', status: 'draft', earlyAccess: false, earlyAccessDuration: '', earlyAccessUnit: 'hours', keeperPoints: '', keeperExclusive: false } }
const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '11px 13px', border: `1px solid ${BORDER}`, borderRadius: 9, background: '#FBF9F5', color: TEXT, fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif' }

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return <label style={{ display: 'grid', gap: 7, color: TEXT_SEC, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}><span>{label}{required && <span style={{ color: CLAY }}> *</span>}</span>{children}{error && <span style={{ color: '#B42318', fontSize: 11, fontWeight: 500, letterSpacing: 0, textTransform: 'none' }}>{error}</span>}</label>
}

function slugify(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function mediaAssetFromUpload(field: string, upload: MediaUploadResult): MediaAsset {
  return {
    field,
    url: upload.url,
    publicId: upload.publicId,
    resourceType: upload.resourceType,
    format: upload.format,
    width: upload.width,
    height: upload.height,
    bytes: upload.bytes,
  }
}

type MediaCollectionField = Exclude<keyof ProductMedia, 'mainImage' | 'campaignVideo'>

function MediaSlot({ label, field, media, uploading, onFiles, onReorder, onRemove }: { label: string; field: keyof ProductMedia; media: ProductMedia; uploading: boolean; onFiles: (field: keyof ProductMedia, files: FileList | File[]) => void; onReorder: (field: MediaCollectionField, fromIndex: number, toIndex: number) => void; onRemove: (field: keyof ProductMedia, index?: number) => void }) {
  const single = field === 'mainImage' || field === 'campaignVideo'
  const values = single ? (media[field] ? [media[field] as string] : []) : media[field] as string[]
  return <div style={{ padding: 18, border: `1px solid ${BORDER}`, borderRadius: 10, background: '#FBF9F5' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}><div style={{ color: INDIGO, fontSize: 14, fontWeight: 600 }}>{label}</div><label style={{ padding: '8px 11px', border: `1px solid ${BORDER}`, borderRadius: 8, background: '#F7F3EC', color: TEXT_SEC, fontSize: 11, cursor: 'pointer' }}>{uploading ? 'Uploading...' : single ? 'Upload' : 'Add files'}<input type="file" accept={field === 'campaignVideo' ? 'video/*' : 'image/*'} multiple={!single} onChange={event => { if (event.target.files) onFiles(field, event.target.files); event.currentTarget.value = '' }} style={{ display: 'none' }} /></label></div>{values.length === 0 ? <div onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); if (event.dataTransfer.files.length) onFiles(field, event.dataTransfer.files) }} style={{ minHeight: 72, display: 'grid', placeItems: 'center', border: `1px dashed ${BORDER}`, borderRadius: 8, color: TEXT_SEC, fontSize: 12 }}>Drag &amp; drop upload</div> : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>{values.map((url, index) => <div key={`${url}-${index}`} draggable={!single} onDragStart={event => event.dataTransfer.setData('text/plain', String(index))} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); const fromIndex = Number(event.dataTransfer.getData('text/plain')); if (!single && Number.isInteger(fromIndex)) onReorder(field as MediaCollectionField, fromIndex, index) }} style={{ position: 'relative', minHeight: 110, overflow: 'hidden', border: `1px solid ${BORDER}`, borderRadius: 8, background: '#EFE8DD', cursor: single ? 'default' : 'grab' }}>{field === 'campaignVideo' ? <video src={url} controls style={{ width: '100%', height: 110, objectFit: 'cover' }} /> : <img src={url} alt={`${label} ${index + 1}`} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />}<button type="button" onClick={() => onRemove(field, single ? undefined : index)} aria-label={`Remove ${label} ${index + 1}`} style={{ position: 'absolute', top: 6, right: 6, width: 24, height: 24, border: 0, borderRadius: '50%', background: 'rgba(30, 47, 68, .82)', color: '#fff', cursor: 'pointer' }}>×</button></div>)}</div>}</div>
}

function RichTextEditor({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  const command = (name: string, commandValue?: string) => {
    document.execCommand(name, false, commandValue)
  }
  return <div style={{ border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', background: '#FBF9F5' }}><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 10, borderBottom: `1px solid ${BORDER}`, background: '#F1ECE4' }}>{[['bold', 'B'], ['italic', 'I'], ['insertUnorderedList', '• List'], ['formatBlock', 'H2']].map(([action, label]) => <button key={action} type="button" onMouseDown={event => { event.preventDefault(); command(action, action === 'formatBlock' ? 'h2' : undefined) }} style={{ padding: '6px 9px', border: `1px solid ${BORDER}`, borderRadius: 6, background: '#FBF9F5', color: INDIGO, cursor: 'pointer', fontSize: 12, fontWeight: action === 'bold' ? 700 : 500 }}>{label}</button>)}<button type="button" onMouseDown={event => { event.preventDefault(); const url = window.prompt('Link URL'); if (url) command('createLink', url) }} style={{ padding: '6px 9px', border: `1px solid ${BORDER}`, borderRadius: 6, background: '#FBF9F5', color: INDIGO, cursor: 'pointer', fontSize: 12 }}>Link</button></div><div contentEditable suppressContentEditableWarning dangerouslySetInnerHTML={{ __html: value }} onInput={event => onChange(event.currentTarget.innerHTML)} data-placeholder={placeholder} style={{ minHeight: 180, padding: 14, color: TEXT, fontSize: 14, lineHeight: 1.65, outline: 'none' }} /></div>
}

export default function ProductEditor({ onNavigate, productId, onDone }: Props) {
  const { product, loading } = useProduct(productId ?? '')
  const { categories } = useCategories()
  const { collections } = useCollections()
  const [activeTab, setActiveTab] = useState<ProductTab>('Product Information')
  const [form, setForm] = useState<ProductInformationForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [validationAttempted, setValidationAttempted] = useState(false)
  const [validationToast, setValidationToast] = useState('')
  const [skuError, setSkuError] = useState('')
  const [inventoryPieces, setInventoryPieces] = useState<InventoryPiece[]>([])
  const [adjustmentOpen, setAdjustmentOpen] = useState(false)
  const [adjustmentVariantId, setAdjustmentVariantId] = useState('')
  const [adjustmentType, setAdjustmentType] = useState<InventoryPieceStatus>('damaged')
  const [adjustmentQuantity, setAdjustmentQuantity] = useState('1')
  const [adjustmentReason, setAdjustmentReason] = useState('')
  const [adjustmentNotes, setAdjustmentNotes] = useState('')
  const [media, setMedia] = useState<ProductMedia>(EMPTY_MEDIA)
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([])
  const [uploadingMedia, setUploadingMedia] = useState<string | null>(null)
  const [story, setStory] = useState<ProductStory>(EMPTY_STORY)
  const [seo, setSeo] = useState<ProductSeo>(EMPTY_SEO)
  const [seoSlugEdited, setSeoSlugEdited] = useState(false)
  const [uploadingOgImage, setUploadingOgImage] = useState(false)
  const [activity, setActivity] = useState<ProductActivity[]>([])
  const [activityLoading, setActivityLoading] = useState(false)

  useEffect(() => {
    if (!product) return
    setInventoryPieces(product.inventoryPieces ?? [])
    setMedia({ ...EMPTY_MEDIA, mainImage: product.media?.mainImage || product.coverImageUrl || '', ...product.media })
    setMediaAssets(product.mediaAssets ?? [])
    setStory({ ...EMPTY_STORY, ...product.story })
    setSeo({ ...EMPTY_SEO, ...product.seo })
    setSeoSlugEdited(Boolean(product.seo?.slug))
    setForm({ name: product.name ?? '', sku: product.sku ?? '', categoryId: product.categoryIds?.[0] ?? '', collectionId: product.collectionIds?.[0] ?? '', legacy: product.legacy ?? '', universe: product.universe ?? '', gender: product.gender ?? '', productType: product.productType ?? '', shortDescription: product.shortDescription ?? '', fullDescription: product.fullDescription ?? product.description ?? '', status: product.status === 'out-of-stock' ? 'draft' : product.status, characteristics: { ...EMPTY_FORM.characteristics, ...product.characteristics }, design: { ...EMPTY_FORM.design, ...product.design }, colors: (product.colorways ?? []).map(color => ({ id: color.id, name: color.name, colorCode: color.colorCode ?? '', hex: color.hex, image: color.images?.[0] ?? '' })), sizes: product.sizes?.map(size => size.size) ?? [], pricing: { ...EMPTY_FORM.pricing, sellingPrice: product.price !== undefined ? String(product.price) : '', currency: product.currency ?? 'TND', ...(product.pricing ? Object.fromEntries(Object.entries(product.pricing).map(([key, value]) => [key === 'compareAtPrice' ? 'compareAtPrice' : key.replace(/Cost$/, 'Cost'), value === undefined ? '' : String(value)])) : {}) } as ProductInformationForm['pricing'], release: { ...EMPTY_FORM.release, number: product.releaseNumber ?? '01', date: product.launchDate ? product.launchDate.slice(0, 10) : '', quantity: product.quantity !== undefined ? String(product.quantity) : '', price: product.releaseSettings?.price !== undefined ? String(product.releaseSettings.price) : product.price !== undefined ? String(product.price) : '', ...(product.releaseSettings ? { name: product.releaseSettings.name ?? '', status: product.releaseSettings.status ?? 'draft', earlyAccess: Boolean(product.releaseSettings.earlyAccess), earlyAccessDuration: product.releaseSettings.earlyAccessDuration ? String(product.releaseSettings.earlyAccessDuration) : '', earlyAccessUnit: product.releaseSettings.earlyAccessUnit ?? 'hours', keeperPoints: product.releaseSettings.keeperPoints ? String(product.releaseSettings.keeperPoints) : '', keeperExclusive: Boolean(product.releaseSettings.keeperExclusive) } : {}) } })
    setForm(current => ({ ...current, collectionId: product.collectionId ?? product.collectionIds?.[0] ?? '' }))
  }, [product])

  useEffect(() => {
    if (!seoSlugEdited) setSeo(current => ({ ...current, slug: slugify(form.name) }))
  }, [form.name, seoSlugEdited])

  useEffect(() => {
    if (!validationToast) return
    const timeoutId = window.setTimeout(() => setValidationToast(''), 5000)
    return () => window.clearTimeout(timeoutId)
  }, [validationToast])

  useEffect(() => {
    if (!productId || activeTab !== 'Activity') return
    setActivityLoading(true)
    getProductActivity(productId).then(setActivity).catch(() => setActivity([])).finally(() => setActivityLoading(false))
  }, [activeTab, productId])

  const update = <K extends keyof ProductInformationForm>(field: K, value: ProductInformationForm[K]) => setForm(current => ({ ...current, [field]: value }))
  const isEditing = Boolean(productId)
  const fieldErrors = useMemo(() => ({
    name: form.name.trim().length >= 2 ? '' : 'Enter a product name with at least 2 characters.',
    sku: /^[A-Z0-9-]+$/.test(form.sku.trim()) ? '' : 'Enter a SKU using letters, numbers, or hyphens.',
    categoryId: form.categoryId ? '' : 'Select a category.',
    collectionId: form.collectionId ? '' : 'Select a collection.',
    universe: form.universe ? '' : 'Select a universe.',
    gender: form.gender ? '' : 'Select a gender.',
    productType: form.productType ? '' : 'Select a product type.',
    shortDescription: form.shortDescription.trim() ? '' : 'Enter a short description.',
    colors: form.colors.length > 0 && form.colors.every(color => color.name.trim() && color.colorCode.trim()) ? '' : 'Add at least one color and enter its name and color code.',
    sizes: form.sizes.length > 0 ? '' : 'Select at least one size.',
    sellingPrice: Number(form.pricing.sellingPrice) > 0 ? '' : 'Enter a selling price greater than zero.',
    mainImage: media.mainImage.trim() ? '' : 'Add a main product image.',
  }), [form.categoryId, form.collectionId, form.colors, form.gender, form.name, form.pricing.sellingPrice, form.productType, form.shortDescription, form.sizes, form.sku, form.universe, media.mainImage])
  const missingFields = Object.entries(fieldErrors).filter(([, error]) => error)
  const requiredFieldError = (field: keyof typeof fieldErrors) => validationAttempted ? fieldErrors[field] : ''
  const requiredFieldStyle = (field: keyof typeof fieldErrors) => requiredFieldError(field)
    ? { ...inputStyle, borderColor: '#B42318', boxShadow: '0 0 0 1px #B42318' }
    : inputStyle
  const variants = useMemo(() => form.colors.flatMap(color => form.sizes.map(size => ({ id: `${color.colorCode}-${size}`, sku: `${form.sku.trim().toUpperCase()}-${color.colorCode}-${size}`, colorName: color.name, colorCode: color.colorCode, size, hex: color.hex, image: color.image }))), [form.colors, form.sizes, form.sku])
  const pricingNumbers = Object.fromEntries(Object.entries(form.pricing).map(([key, value]) => [key, typeof value === 'string' ? Number(value || 0) : value])) as Record<string, number>
  const totalCost = ['fabricCost', 'sewingCost', 'embroideryCost', 'washingCost', 'packagingCost', 'otherCost'].reduce((total, key) => total + (pricingNumbers[key] ?? 0), 0)
  const grossProfit = pricingNumbers.sellingPrice - totalCost
  const margin = pricingNumbers.sellingPrice > 0 ? (grossProfit / pricingNumbers.sellingPrice) * 100 : 0
  const inventoryRows = variants.map(variant => {
    const pieces = inventoryPieces.filter(piece => piece.variantId === variant.id)
    return { variant, counts: Object.fromEntries(INVENTORY_STATUSES.map(status => [status, pieces.filter(piece => piece.status === status).length])) as Record<InventoryPieceStatus, number> }
  })

  const applyAdjustment = () => {
    const quantity = Number(adjustmentQuantity)
    if (!adjustmentVariantId || !Number.isInteger(quantity) || quantity < 1) return
    const now = new Date().toISOString()
    const additions = Array.from({ length: quantity }, (_, index) => ({ id: `piece-${Date.now()}-${index}`, variantId: adjustmentVariantId, status: adjustmentType, reason: adjustmentReason.trim(), notes: adjustmentNotes.trim(), updatedAt: now }))
    setInventoryPieces(current => [...current, ...additions])
    setAdjustmentOpen(false)
    setAdjustmentQuantity('1')
    setAdjustmentReason('')
    setAdjustmentNotes('')
  }

  const uploadMediaFiles = async (field: keyof ProductMedia, files: FileList | File[]) => {
    const selectedFiles = Array.from(files)
    if (selectedFiles.length === 0) return
    setUploadingMedia(field)
    try {
      const uploaded = [] as MediaAsset[]
      for (const file of selectedFiles) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'products')
        const result = await api.upload<MediaUploadResult>('/uploads/images', formData)
        uploaded.push(mediaAssetFromUpload(field, result))
      }
      setMedia(current => field === 'mainImage' || field === 'campaignVideo' ? { ...current, [field]: uploaded[0].url } : { ...current, [field]: [...current[field], ...uploaded.map(asset => asset.url)] })
      setMediaAssets(current => [
        ...(field === 'mainImage' || field === 'campaignVideo' ? current.filter(asset => asset.field !== field) : current),
        ...uploaded,
      ])
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Media upload failed.')
    } finally {
      setUploadingMedia(null)
    }
  }

  const uploadOgImage = async (file: File) => {
    setUploadingOgImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'products')
      const result = await api.upload<MediaUploadResult>('/uploads/images', formData)
      setSeo(current => ({ ...current, ogImage: result.url }))
      setMediaAssets(current => [...current.filter(asset => asset.field !== 'seo.ogImage'), mediaAssetFromUpload('seo.ogImage', result)])
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'OG image upload failed.')
    } finally {
      setUploadingOgImage(false)
    }
  }

  const reorderMedia = (field: keyof ProductMedia, fromIndex: number, toIndex: number) => {
    if (field === 'mainImage' || field === 'campaignVideo') return
    setMedia(current => {
      const next = [...current[field]]
      const [item] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, item)
      return { ...current, [field]: next }
    })
  }

  const removeMedia = (field: keyof ProductMedia, index?: number) => {
    const removedUrl = field === 'mainImage' || field === 'campaignVideo'
      ? media[field] as string
      : (media[field] as string[])[index ?? -1]
    if (removedUrl) setMediaAssets(current => current.filter(asset => !(asset.field === field && asset.url === removedUrl)))
    setMedia(current => {
      if (field === 'mainImage' || field === 'campaignVideo') return { ...current, [field]: '' }
      return { ...current, [field]: current[field].filter((_, itemIndex) => itemIndex !== index) }
    })
  }

  const save = async () => {
    setMessage(''); setSkuError('')
    const normalizedSku = form.sku.trim().toUpperCase()
    if (missingFields.length > 0) {
      setValidationAttempted(true)
      const missingByTab = missingFields.reduce<Record<string, string[]>>((groups, [field]) => {
        const tab = REQUIRED_FIELD_TABS[field]
        if (tab) groups[tab] = [...(groups[tab] ?? []), REQUIRED_FIELD_LABELS[field] ?? field]
        return groups
      }, {})
      setValidationToast(Object.entries(missingByTab).map(([tab, fields]) => `${tab}: ${fields.join(', ')}`).join('\n'))
      const firstMissingField = missingFields[0][0]
      setActiveTab(REQUIRED_FIELD_TABS[firstMissingField] ?? 'Product Information')
      window.requestAnimationFrame(() => {
        const firstMissingControl = document.querySelector<HTMLElement>(`[data-required-field="${firstMissingField}"]`)
        firstMissingControl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        firstMissingControl?.focus({ preventScroll: true })
      })
      return
    }
    setValidationAttempted(false)
    setValidationToast('')
    try {
      const products = await getProducts()
      if (products.some(existing => existing.sku.toUpperCase() === normalizedSku && existing.id !== productId)) { setSkuError('This SKU already exists. Choose a unique SKU.'); return }
      setSaving(true)
      const payload: Partial<Product> = { name: form.name.trim(), sku: normalizedSku, categoryIds: [form.categoryId], collectionIds: [form.collectionId], legacy: form.legacy.trim(), universe: form.universe || 'Heritage', gender: form.gender, productType: form.productType as ProductType, shortDescription: form.shortDescription.trim(), fullDescription: form.fullDescription.trim(), description: form.fullDescription.trim(), status: form.status, releaseStatus: form.release.status === 'early-access' ? 'upcoming' : form.release.status === 'closed' ? 'archived' : form.release.status, price: pricingNumbers.sellingPrice, currency: form.pricing.currency, coverImageUrl: media.mainImage, images: media.gallery, media, story, seo, pricing: { compareAtPrice: pricingNumbers.compareAtPrice, fabricCost: pricingNumbers.fabricCost, sewingCost: pricingNumbers.sewingCost, embroideryCost: pricingNumbers.embroideryCost, washingCost: pricingNumbers.washingCost, packagingCost: pricingNumbers.packagingCost, otherCost: pricingNumbers.otherCost }, releaseNumber: form.release.number.padStart(2, '0'), launchDate: form.release.date ? new Date(form.release.date).toISOString() : undefined, quantity: Number(form.release.quantity || 0), releaseSettings: { name: form.release.name.trim(), date: form.release.date ? new Date(form.release.date).toISOString() : undefined, price: Number(form.release.price || 0), status: form.release.status, earlyAccess: form.release.earlyAccess, earlyAccessDuration: Number(form.release.earlyAccessDuration || 0), earlyAccessUnit: form.release.earlyAccessUnit, keeperPoints: Number(form.release.keeperPoints || 0), keeperExclusive: form.release.keeperExclusive }, characteristics: form.characteristics, design: form.design, colorways: form.colors.map(color => ({ id: color.id, name: color.name, colorCode: color.colorCode, hex: color.hex, images: color.image ? [color.image] : [], sizeStocks: Object.fromEntries(form.sizes.map(size => [size, 0])) })), sizes: form.sizes.map(size => ({ size, availability: 'available', stock: 0 })), variants, inventoryPieces }
      payload.mediaAssets = mediaAssets
      payload.collectionId = form.collectionId
      payload.collectionIds = []
      const saved = isEditing && productId ? await updateProduct(productId, payload) : await createProduct(payload)
      if (!saved) throw new Error('Product could not be saved.')
      setMessage(isEditing ? 'Product information updated.' : 'Product created.'); onDone()
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Product could not be saved.') } finally { setSaving(false) }
  }

  if (isEditing && loading) return <div style={{ padding: 48, color: TEXT_SEC }}>Loading product...</div>

  return <div style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 48px 80px', color: TEXT }}>
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, paddingBottom: 24, borderBottom: `1px solid ${BORDER}` }}>
      <div><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Product Management</div><h1 style={{ margin: '8px 0 0', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 500 }}>{form.name || 'New Product'}</h1><div style={{ marginTop: 6, color: TEXT_SEC, fontSize: 12 }}>{form.sku || 'SKU not defined'} · {form.status}</div></div>
      <div style={{ display: 'flex', gap: 8 }}><button type="button" onClick={() => onNavigate('products')} style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 9, background: 'transparent', color: TEXT_SEC, cursor: 'pointer' }}>Cancel</button><button type="button" onClick={() => void save()} disabled={saving} style={{ padding: '10px 18px', border: 0, borderRadius: 9, background: INDIGO, color: '#E7DFD2', fontWeight: 600, cursor: saving ? 'wait' : 'pointer' }}>{saving ? 'Saving...' : 'Save Draft'}</button></div>
    </header>
    {message && <div style={{ marginTop: 18, padding: 12, borderRadius: 9, background: message.includes('Complete') || message.includes('could') ? '#F9EDEA' : '#E6EDE8', color: message.includes('Complete') || message.includes('could') ? '#A63D2F' : '#4A7A5A', fontSize: 13 }}>{message}</div>}
    <nav style={{ display: 'flex', gap: 2, overflowX: 'auto', marginTop: 24, borderBottom: `1px solid ${BORDER}` }}>{PRODUCT_TABS.map(tab => { const tabHasErrors = missingFields.some(([field]) => REQUIRED_FIELD_TABS[field] === tab); return <button key={tab} type="button" onClick={() => setActiveTab(tab)} style={{ flex: '0 0 auto', padding: '13px 12px', border: 0, borderBottom: `2px solid ${activeTab === tab ? CLAY : 'transparent'}`, background: 'transparent', color: activeTab === tab ? INDIGO : TEXT_SEC, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{tab}{validationAttempted && tabHasErrors && <span aria-label="Missing required fields" style={{ marginLeft: 5, color: '#B42318', fontSize: 14 }}>*</span>}</button> })}</nav>
    <main style={{ marginTop: 26, maxWidth: 920 }}>
      {activeTab === 'Product Information' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>PRODUCT INFORMATION</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>This tab contains the core product information.</p></div>
        <h2 style={{ margin: '0 0 16px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Basic Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Field label="Product Name" required error={requiredFieldError('name')}><input data-required-field="name" aria-invalid={Boolean(requiredFieldError('name'))} value={form.name} minLength={2} maxLength={100} onChange={event => update('name', event.target.value)} style={requiredFieldStyle('name')} /></Field>
          <Field label="SKU" required error={requiredFieldError('sku')}><input data-required-field="sku" aria-invalid={Boolean(requiredFieldError('sku') || skuError)} value={form.sku} onChange={event => { setSkuError(''); update('sku', event.target.value.toUpperCase().replace(/\s/g, '-')) }} style={{ ...requiredFieldStyle('sku'), ...(skuError ? { borderColor: '#B42318', boxShadow: '0 0 0 1px #B42318' } : {}), fontFamily: 'monospace' }} />{skuError && <span style={{ color: '#A63D2F', fontSize: 11, textTransform: 'none', letterSpacing: 0 }}>{skuError}</span>}</Field>
          <Field label="Category" required error={requiredFieldError('categoryId')}><select data-required-field="categoryId" aria-invalid={Boolean(requiredFieldError('categoryId'))} value={form.categoryId} onChange={event => update('categoryId', event.target.value)} style={requiredFieldStyle('categoryId')}><option value="">Select category</option>{categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}</select></Field>
          <Field label="Collection" required error={requiredFieldError('collectionId')}><select data-required-field="collectionId" aria-invalid={Boolean(requiredFieldError('collectionId'))} value={form.collectionId} onChange={event => update('collectionId', event.target.value)} style={requiredFieldStyle('collectionId')}><option value="">Select collection</option>{collections.map(collection => <option key={collection.id} value={collection.id}>{collection.name}</option>)}</select></Field>
          <Field label="Legacy"><input value={form.legacy} onChange={event => update('legacy', event.target.value)} style={inputStyle} /></Field>
          <Field label="Universe" required error={requiredFieldError('universe')}><select data-required-field="universe" aria-invalid={Boolean(requiredFieldError('universe'))} value={form.universe} onChange={event => update('universe', event.target.value as ProductUniverse)} style={requiredFieldStyle('universe')}><option value="">Select universe</option>{UNIVERSES.map(universe => <option key={universe}>{universe}</option>)}</select></Field>
          <Field label="Gender" required error={requiredFieldError('gender')}><select data-required-field="gender" aria-invalid={Boolean(requiredFieldError('gender'))} value={form.gender} onChange={event => update('gender', event.target.value)} style={requiredFieldStyle('gender')}><option value="">Select gender</option>{GENDERS.map(gender => <option key={gender}>{gender}</option>)}</select></Field>
          <Field label="Product Type" required error={requiredFieldError('productType')}><select data-required-field="productType" aria-invalid={Boolean(requiredFieldError('productType'))} value={form.productType} onChange={event => update('productType', event.target.value)} style={requiredFieldStyle('productType')}><option value="">Select product type</option>{PRODUCT_TYPES.map(type => <option key={type}>{type}</option>)}</select></Field>
        </div>
        <div style={{ display: 'grid', gap: 18, marginTop: 18 }}><Field label="Short Description" required error={requiredFieldError('shortDescription')}><textarea data-required-field="shortDescription" aria-invalid={Boolean(requiredFieldError('shortDescription'))} value={form.shortDescription} maxLength={500} onChange={event => update('shortDescription', event.target.value)} style={{ ...requiredFieldStyle('shortDescription'), minHeight: 82, resize: 'vertical' }} /></Field><Field label="Full Description"><textarea value={form.fullDescription} onChange={event => update('fullDescription', event.target.value)} style={{ ...inputStyle, minHeight: 150, resize: 'vertical' }} /></Field></div>
        <div style={{ marginTop: 22, paddingTop: 22, borderTop: `1px solid ${BORDER}` }}><h2 style={{ margin: '0 0 16px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Product Status</h2><Field label="Status"><select value={form.status} onChange={event => update('status', event.target.value as ProductStatus)} style={inputStyle}>{PRODUCT_STATUSES.map(status => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select></Field></div>
      </section>}
      {activeTab === 'Caractéristiques produit' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>CARACTÉRISTIQUES PRODUIT</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Configure the product fit, materials and construction details.</p></div>
        <h2 style={{ margin: '0 0 16px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Produit</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {([['fit', 'Fit'], ['gender', 'Gender'], ['fabric', 'Fabric'], ['composition', 'Composition'], ['weight', 'Weight'], ['finish', 'Finish']] as const).map(([field, label]) => <Field key={field} label={label}><input value={field === 'gender' ? form.gender : form.characteristics[field]} onChange={event => field === 'gender' ? update('gender', event.target.value) : update('characteristics', { ...form.characteristics, [field]: event.target.value })} style={inputStyle} /></Field>)}
        </div>
        <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}><h2 style={{ margin: '0 0 16px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Construction</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>{([['collar', 'Collar'], ['sleeve', 'Sleeve'], ['bottomHem', 'Bottom Hem'], ['sleeveHem', 'Sleeve Hem']] as const).map(([field, label]) => <Field key={field} label={label}><input value={form.characteristics[field]} onChange={event => update('characteristics', { ...form.characteristics, [field]: event.target.value })} style={inputStyle} /></Field>)}</div>
        </div>
      </section>}
      {activeTab === 'Design & Heritage' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>DESIGN &amp; HERITAGE</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>This tab contains the cultural and design information.</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Field label="Design Name"><input value={form.design.designName} onChange={event => update('design', { ...form.design, designName: event.target.value })} style={inputStyle} /></Field>
          <Field label="Tifinagh Text"><input value={form.design.tifinaghText} onChange={event => update('design', { ...form.design, tifinaghText: event.target.value })} style={inputStyle} /></Field>
          <Field label="Meaning"><input value={form.design.meaning} onChange={event => update('design', { ...form.design, meaning: event.target.value })} style={inputStyle} /></Field>
          <Field label="Heritage Theme"><select value={form.design.heritageTheme} onChange={event => update('design', { ...form.design, heritageTheme: event.target.value })} style={inputStyle}><option value="">Select heritage theme</option><option>Symbols &amp; Scripts</option><option>Textile Heritage</option><option>Landscape &amp; Territory</option><option>Community Memory</option></select></Field>
          <Field label="Motif"><input list="product-motifs" value={form.design.motif} onChange={event => update('design', { ...form.design, motif: event.target.value })} style={inputStyle} /><datalist id="product-motifs"><option value="Diamond" /><option value="Eye" /><option value="Mountain" /><option value="Tifinagh Letter" /><option value="Zellij" /></datalist></Field>
          <Field label="Decoration Technique"><select value={form.design.decorationTechnique} onChange={event => update('design', { ...form.design, decorationTechnique: event.target.value })} style={inputStyle}><option value="">Select technique</option>{['Embroidery', 'Screen Printing', 'DTF', 'Woven', 'Embossing', 'None'].map(value => <option key={value}>{value}</option>)}</select></Field>
          <Field label="Decoration Position"><select value={form.design.decorationPosition} onChange={event => update('design', { ...form.design, decorationPosition: event.target.value })} style={inputStyle}><option value="">Select position</option>{['Front Center', 'Back Center', 'Left Chest', 'Right Chest', 'Sleeve', 'Collar', 'Hem', 'Custom'].map(value => <option key={value}>{value}</option>)}</select></Field>
          <Field label="Design Version"><input value={form.design.version} onChange={event => update('design', { ...form.design, version: event.target.value })} style={inputStyle} /></Field>
        </div>
        {form.design.decorationPosition === 'Custom' && <div style={{ marginTop: 18 }}><Field label="Custom Position"><textarea value={form.design.customPosition} onChange={event => update('design', { ...form.design, customPosition: event.target.value })} style={{ ...inputStyle, minHeight: 76, resize: 'vertical' }} /></Field></div>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}><Field label="Inspiration"><textarea value={form.design.inspiration} onChange={event => update('design', { ...form.design, inspiration: event.target.value })} style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} /></Field><Field label="Motif Meaning"><textarea value={form.design.motifMeaning} onChange={event => update('design', { ...form.design, motifMeaning: event.target.value })} style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} /></Field></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}><Field label="Design Story"><textarea value={form.design.designStory} onChange={event => update('design', { ...form.design, designStory: event.target.value })} style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} /></Field><Field label="Heritage Story"><textarea value={form.design.heritageStory} onChange={event => update('design', { ...form.design, heritageStory: event.target.value })} style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} /></Field></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12, alignItems: 'end', marginTop: 18, maxWidth: 520 }}><Field label="Thread Color"><input type="color" value={form.design.threadColorHex} onChange={event => update('design', { ...form.design, threadColorHex: event.target.value })} style={{ width: 54, height: 42, padding: 3, border: `1px solid ${BORDER}`, borderRadius: 9, background: '#FBF9F5' }} /></Field><Field label="Thread Color Name"><input value={form.design.threadColor} onChange={event => update('design', { ...form.design, threadColor: event.target.value })} style={inputStyle} placeholder="Beige" /></Field></div>
      </section>}
      {activeTab === 'Variants' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>VARIANTS</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Manage colors and sizes. Variants are generated automatically.</p></div>
        <h2 style={{ margin: '0 0 16px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Colors</h2>
        <div style={{ display: 'grid', gap: 12 }}>{form.colors.map((color, index) => <div key={color.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 72px 1fr auto', gap: 10, alignItems: 'end', padding: 14, border: `1px solid ${validationAttempted && (!color.name.trim() || !color.colorCode.trim()) ? '#B42318' : BORDER}`, boxShadow: validationAttempted && (!color.name.trim() || !color.colorCode.trim()) ? '0 0 0 1px #B42318' : undefined, borderRadius: 10, background: '#FBF9F5' }}><Field label="Color Name"><input value={color.name} onChange={event => { const next = [...form.colors]; next[index] = { ...color, name: event.target.value }; update('colors', next) }} style={inputStyle} /></Field><Field label="Color Code"><input value={color.colorCode} maxLength={5} onChange={event => { const next = [...form.colors]; next[index] = { ...color, colorCode: event.target.value.toUpperCase().replace(/\s/g, '') }; update('colors', next) }} style={{ ...inputStyle, fontFamily: 'monospace' }} /></Field><Field label="Hex"><input type="color" value={color.hex} onChange={event => { const next = [...form.colors]; next[index] = { ...color, hex: event.target.value }; update('colors', next) }} style={{ width: '100%', height: 42, padding: 3, border: `1px solid ${BORDER}`, borderRadius: 9 }} /></Field><Field label="Color Image URL"><input value={color.image} onChange={event => { const next = [...form.colors]; next[index] = { ...color, image: event.target.value }; update('colors', next) }} placeholder="Cloudinary URL" style={inputStyle} /></Field><button type="button" onClick={() => update('colors', form.colors.filter(item => item.id !== color.id))} style={{ height: 42, border: 0, background: 'transparent', color: '#A63D2F', cursor: 'pointer' }}>Remove</button></div>)}</div>
        <button type="button" data-required-field="colors" onClick={() => update('colors', [...form.colors, { id: `color-${Date.now()}`, name: '', colorCode: '', hex: '#111111', image: '' }])} style={{ marginTop: 14, padding: '10px 14px', border: `1px dashed ${validationAttempted && requiredFieldError('colors') ? '#B42318' : BORDER}`, borderRadius: 9, background: 'transparent', color: INDIGO, cursor: 'pointer', boxShadow: validationAttempted && requiredFieldError('colors') && form.colors.length === 0 ? '0 0 0 1px #B42318' : undefined }}>+ Add Color{validationAttempted && requiredFieldError('colors') && form.colors.length === 0 && <span style={{ color: '#B42318' }}> *</span>}</button>
        {validationAttempted && requiredFieldError('colors') && <div style={{ marginTop: 7, color: '#B42318', fontSize: 11 }}>{requiredFieldError('colors')}</div>}
        <div style={{ marginTop: 30, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}><h2 style={{ margin: '0 0 16px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Sizes <span style={{ color: '#B42318' }}>*</span></h2><div data-required-field="sizes" tabIndex={-1} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 8, border: `1px solid ${validationAttempted && requiredFieldError('sizes') ? '#B42318' : 'transparent'}`, borderRadius: 8, boxShadow: validationAttempted && requiredFieldError('sizes') ? '0 0 0 1px #B42318' : undefined }}>{SIZE_OPTIONS.map(size => <label key={size} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 12px', border: `1px solid ${form.sizes.includes(size) ? INDIGO : BORDER}`, borderRadius: 9, background: form.sizes.includes(size) ? '#E8EDF3' : '#FBF9F5', color: form.sizes.includes(size) ? INDIGO : TEXT_SEC, cursor: 'pointer', fontSize: 13 }}><input type="checkbox" checked={form.sizes.includes(size)} onChange={event => update('sizes', event.target.checked ? [...form.sizes, size] : form.sizes.filter(item => item !== size))} />{size}</label>)}</div>{validationAttempted && requiredFieldError('sizes') && <div style={{ marginTop: 7, color: '#B42318', fontSize: 11 }}>{requiredFieldError('sizes')}</div>}</div>
        <div style={{ marginTop: 30, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}><h2 style={{ margin: '0 0 8px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Variant Matrix</h2><p style={{ margin: '0 0 16px', color: TEXT_SEC, fontSize: 13 }}>{variants.length} variant{variants.length === 1 ? '' : 's'} generated from colors x sizes.</p>{variants.length === 0 ? <div style={{ color: TEXT_SEC, fontSize: 13 }}>Add at least one color and one size.</div> : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>{variants.map(variant => <div key={variant.id} style={{ padding: 12, border: `1px solid ${BORDER}`, borderRadius: 9, background: '#FBF9F5' }}><div style={{ fontFamily: 'monospace', fontSize: 12, color: INDIGO }}>{variant.sku}</div><div style={{ marginTop: 6, color: TEXT_SEC, fontSize: 12 }}>{variant.colorName} · {variant.size}</div></div>)}</div>}</div>
      </section>}
      {activeTab === 'Pricing' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>PRICING</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Display commercial information.</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {([['sellingPrice', 'Selling Price'], ['compareAtPrice', 'Compare-at Price'], ['fabricCost', 'Fabric Cost'], ['sewingCost', 'Sewing Cost'], ['embroideryCost', 'Embroidery Cost'], ['washingCost', 'Washing Cost'], ['packagingCost', 'Packaging Cost'], ['otherCost', 'Other Production Cost']] as const).map(([field, label]) => <Field key={field} label={label} required={field === 'sellingPrice'} error={field === 'sellingPrice' ? requiredFieldError('sellingPrice') : undefined}><input data-required-field={field === 'sellingPrice' ? 'sellingPrice' : undefined} aria-invalid={field === 'sellingPrice' && Boolean(requiredFieldError('sellingPrice'))} type="number" min="0" step="0.001" value={form.pricing[field]} onChange={event => update('pricing', { ...form.pricing, [field]: event.target.value })} style={field === 'sellingPrice' ? requiredFieldStyle('sellingPrice') : inputStyle} /></Field>)}
          <Field label="Currency"><select value={form.pricing.currency} onChange={event => update('pricing', { ...form.pricing, currency: event.target.value as Currency })} style={inputStyle}><option value="TND">TND</option><option value="EUR">EUR</option><option value="USD">USD</option><option value="MAD">MAD</option><option value="DZD">DZD</option></select></Field>
        </div>
        <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}><h2 style={{ margin: '0 0 16px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Calculated Values</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>{[['Total Cost', totalCost], ['Gross Profit', grossProfit], ['Margin %', margin]].map(([label, value]) => <div key={label as string} style={{ padding: 16, border: `1px solid ${BORDER}`, borderRadius: 9, background: '#EDE8DF' }}><div style={{ color: TEXT_SEC, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</div><div style={{ marginTop: 8, color: INDIGO, fontSize: 20, fontWeight: 700 }}>{label === 'Margin %' ? `${Number(value).toFixed(1)}%` : `${Number(value).toFixed(3)} ${form.pricing.currency}`}</div></div>)}</div></div>
      </section>}
      {activeTab === 'Release' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>RELEASE</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>This tab manages the product release.</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Field label="Release Number"><input type="number" min="1" value={Number(form.release.number || 1)} onChange={event => update('release', { ...form.release, number: String(Math.max(1, Number(event.target.value || 1))).padStart(2, '0') })} style={{ ...inputStyle, fontFamily: 'monospace' }} /><span style={{ color: TEXT_SEC, fontSize: 11, textTransform: 'none', letterSpacing: 0 }}>Displayed as {form.release.number.padStart(2, '0')}</span></Field>
          <Field label="Release Name"><input value={form.release.name} onChange={event => update('release', { ...form.release, name: event.target.value })} style={inputStyle} placeholder="First Release" /></Field>
          <Field label="Release Date"><input type="date" value={form.release.date} onChange={event => update('release', { ...form.release, date: event.target.value })} style={inputStyle} /></Field>
          <Field label="Release Quantity"><input type="number" min="1" step="1" value={form.release.quantity} onChange={event => update('release', { ...form.release, quantity: event.target.value })} style={inputStyle} placeholder="30" /></Field>
          <Field label="Release Price"><input type="number" min="0" step="0.001" value={form.release.price} onChange={event => update('release', { ...form.release, price: event.target.value })} style={inputStyle} placeholder="179.000" /></Field>
          <Field label="Release Status"><select value={form.release.status} onChange={event => update('release', { ...form.release, status: event.target.value as ProductInformationForm['release']['status'] })} style={inputStyle}>{[['draft', 'Draft'], ['upcoming', 'Upcoming'], ['early-access', 'Early Access'], ['live', 'Live'], ['sold-out', 'Sold Out'], ['closed', 'Closed']].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
        </div>
        <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}><h2 style={{ margin: '0 0 16px', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Keeper settings</h2>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: TEXT, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={form.release.earlyAccess} onChange={event => update('release', { ...form.release, earlyAccess: event.target.checked })} />Early Access</label>
          {form.release.earlyAccess && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}><Field label="Early Access Duration"><input type="number" min="1" step="1" value={form.release.earlyAccessDuration} onChange={event => update('release', { ...form.release, earlyAccessDuration: event.target.value })} style={inputStyle} placeholder="48" /></Field><Field label="Duration Unit"><select value={form.release.earlyAccessUnit} onChange={event => update('release', { ...form.release, earlyAccessUnit: event.target.value as 'hours' | 'days' })} style={inputStyle}><option value="hours">Hours</option><option value="days">Days</option></select></Field></div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}><Field label="Keeper Points"><input type="number" min="0" step="1" value={form.release.keeperPoints} onChange={event => update('release', { ...form.release, keeperPoints: event.target.value })} style={inputStyle} placeholder="100" /></Field><label style={{ display: 'flex', alignItems: 'center', gap: 10, alignSelf: 'end', minHeight: 42, color: TEXT, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={form.release.keeperExclusive} onChange={event => update('release', { ...form.release, keeperExclusive: event.target.checked })} />Keeper Exclusive</label></div>
        </div>
      </section>}
      {activeTab === 'Inventory' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18, marginBottom: 24 }}><div><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>INVENTORY</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Stock is calculated from individual physical pieces. No global stock number is entered here.</p></div><button type="button" onClick={() => setAdjustmentOpen(true)} disabled={variants.length === 0} style={{ padding: '10px 14px', border: 0, borderRadius: 9, background: INDIGO, color: '#E7DFD2', fontWeight: 600, cursor: variants.length === 0 ? 'not-allowed' : 'pointer', opacity: variants.length === 0 ? .5 : 1 }}>Adjust Inventory</button></div>
        {variants.length === 0 ? <div style={{ padding: 18, border: `1px dashed ${BORDER}`, borderRadius: 10, color: TEXT_SEC, fontSize: 13 }}>Add colors and sizes in Variants before registering physical pieces.</div> : <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}><thead><tr>{['Size', 'Color', 'Total', 'Available', 'Reserved', 'Sold', 'Returned', 'Damaged', 'Lost'].map(label => <th key={label} style={{ padding: '11px 10px', textAlign: label === 'Size' || label === 'Color' ? 'left' : 'right', borderBottom: `1px solid ${BORDER}`, color: TEXT_SEC, fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</th>)}</tr></thead><tbody>{inventoryRows.map(({ variant, counts }) => <tr key={variant.id}>{[variant.size, variant.colorName, INVENTORY_STATUSES.reduce((total, status) => total + counts[status], 0), ...INVENTORY_STATUSES.map(status => counts[status])].map((value, index) => <td key={`${variant.id}-${index}`} style={{ padding: '13px 10px', borderBottom: `1px solid ${BORDER}`, textAlign: index < 2 ? 'left' : 'right', color: index === 0 ? INDIGO : TEXT, fontFamily: index > 1 ? 'monospace' : 'inherit', fontSize: 13 }}>{value}</td>)}</tr>)}</tbody></table></div>}
        <div style={{ marginTop: 18, color: TEXT_SEC, fontSize: 12 }}>All values are read-only and derived from the registered pieces.</div>
      </section>}
      {activeTab === 'Media' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>MEDIA</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Manage product media. Drop files into a slot and drag thumbnails to reorder them.</p></div>
        <div style={{ display: 'grid', gap: 14 }}>
          <h2 style={{ margin: '4px 0 0', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Main Image</h2>
          <div data-required-field="mainImage" tabIndex={-1} style={{ padding: validationAttempted && requiredFieldError('mainImage') ? 5 : 0, border: `1px solid ${validationAttempted && requiredFieldError('mainImage') ? '#B42318' : 'transparent'}`, borderRadius: 11 }}><MediaSlot label="Main Product Image" field="mainImage" media={media} uploading={uploadingMedia === 'mainImage'} onFiles={uploadMediaFiles} onReorder={reorderMedia} onRemove={removeMedia} />{validationAttempted && requiredFieldError('mainImage') && <div style={{ marginTop: 7, padding: '8px 10px', border: '1px solid #B42318', borderRadius: 7, color: '#B42318', fontSize: 11 }}>* {requiredFieldError('mainImage')}</div>}</div>
          <h2 style={{ margin: '18px 0 0', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Gallery</h2>
          {([['gallery', 'Product Images'], ['detailImages', 'Detail Images'], ['front', 'Front'], ['back', 'Back'], ['sleeve', 'Sleeve'], ['embroidery', 'Embroidery']] as const).map(([field, label]) => <MediaSlot key={field} label={label} field={field} media={media} uploading={uploadingMedia === field} onFiles={uploadMediaFiles} onReorder={reorderMedia} onRemove={removeMedia} />)}
          <h2 style={{ margin: '18px 0 0', color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500 }}>Campaign</h2>
          {([['modelImages', 'Model Images'], ['campaignVideo', 'Campaign Video'], ['lifestyleImages', 'Lifestyle Images']] as const).map(([field, label]) => <MediaSlot key={field} label={label} field={field} media={media} uploading={uploadingMedia === field} onFiles={uploadMediaFiles} onReorder={reorderMedia} onRemove={removeMedia} />)}
        </div>
      </section>}
      {activeTab === 'Story' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>STORY</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Create the product storytelling with rich text.</p></div>
        <div style={{ display: 'grid', gap: 24 }}><div><div style={{ marginBottom: 8, color: INDIGO, fontSize: 14, fontWeight: 600 }}>Full Story</div><RichTextEditor value={story.fullStory} onChange={value => setStory(current => ({ ...current, fullStory: value }))} placeholder="Tell the complete story of this product..." /></div><div><div style={{ marginBottom: 8, color: INDIGO, fontSize: 14, fontWeight: 600 }}>Design Story</div><RichTextEditor value={story.designStory} onChange={value => setStory(current => ({ ...current, designStory: value }))} placeholder="Explain the design, references and intention..." /></div></div>
      </section>}
      {activeTab === 'SEO' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>SEO</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Define how this product appears in search results and social sharing.</p></div>
        <div style={{ display: 'grid', gap: 18 }}>
          <Field label="URL Slug"><input value={seo.slug} onChange={event => { setSeoSlugEdited(true); setSeo(current => ({ ...current, slug: slugify(event.target.value) })) }} style={{ ...inputStyle, fontFamily: 'monospace' }} /><span style={{ color: TEXT_SEC, fontSize: 11, textTransform: 'none', letterSpacing: 0 }}>Automatically generated from the product name until edited.</span></Field>
          <Field label="Meta Title"><input value={seo.metaTitle} maxLength={60} onChange={event => setSeo(current => ({ ...current, metaTitle: event.target.value }))} style={inputStyle} /><span style={{ color: TEXT_SEC, fontSize: 11, textTransform: 'none', letterSpacing: 0 }}>{seo.metaTitle.length}/60 characters</span></Field>
          <Field label="Meta Description"><textarea value={seo.metaDescription} maxLength={160} onChange={event => setSeo(current => ({ ...current, metaDescription: event.target.value }))} style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} /><span style={{ color: TEXT_SEC, fontSize: 11, textTransform: 'none', letterSpacing: 0 }}>{seo.metaDescription.length}/160 characters</span></Field>
          <Field label="Keywords"><input placeholder="Type a keyword and press Enter" style={inputStyle} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); const keyword = event.currentTarget.value.trim(); if (keyword && !seo.keywords.includes(keyword)) setSeo(current => ({ ...current, keywords: [...current.keywords, keyword] })); event.currentTarget.value = '' } }} /><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 2 }}>{seo.keywords.map(keyword => <span key={keyword} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 9px', borderRadius: 999, background: '#E8EDF3', color: INDIGO, fontSize: 12 }}>{keyword}<button type="button" onClick={() => setSeo(current => ({ ...current, keywords: current.keywords.filter(item => item !== keyword) }))} aria-label={`Remove ${keyword}`} style={{ border: 0, background: 'transparent', color: TEXT_SEC, cursor: 'pointer', padding: 0 }}>×</button></span>)}</div></Field>
          <Field label="OG Image"><label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150, border: `1px dashed ${BORDER}`, borderRadius: 10, background: '#FBF9F5', color: TEXT_SEC, cursor: 'pointer', overflow: 'hidden' }}>{seo.ogImage ? <img src={seo.ogImage} alt="Open Graph preview" style={{ width: '100%', height: 180, objectFit: 'cover' }} /> : <span>{uploadingOgImage ? 'Uploading...' : 'Upload image'}</span>}<input type="file" accept="image/*" disabled={uploadingOgImage} onChange={event => { const file = event.target.files?.[0]; if (file) void uploadOgImage(file); event.currentTarget.value = '' }} style={{ display: 'none' }} /></label>{seo.ogImage && <button type="button" onClick={() => setSeo(current => ({ ...current, ogImage: '' }))} style={{ marginTop: 8, padding: 0, border: 0, background: 'transparent', color: '#A63D2F', cursor: 'pointer' }}>Remove OG image</button>}</Field>
        </div>
      </section>}
      {activeTab === 'Activity' && <section style={{ padding: 26, border: `1px solid ${BORDER}`, borderRadius: 14, background: '#F7F3EC' }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: CLAY, fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>ACTIVITY</div><p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Chronological audit log for this product.</p></div>
        {!productId ? <div style={{ padding: 18, border: `1px dashed ${BORDER}`, borderRadius: 10, color: TEXT_SEC, fontSize: 13 }}>Save the product first to create an activity history.</div> : activityLoading ? <div style={{ color: TEXT_SEC, fontSize: 13 }}>Loading activity...</div> : activity.length === 0 ? <div style={{ padding: 18, border: `1px dashed ${BORDER}`, borderRadius: 10, color: TEXT_SEC, fontSize: 13 }}>No activity recorded yet.</div> : <div style={{ display: 'grid', gap: 0 }}>{activity.map(item => { const date = new Date(item.createdAt); return <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '150px 90px minmax(150px, 1fr) minmax(180px, 1.5fr) minmax(140px, 1fr)', gap: 14, alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 12 }}><div style={{ color: TEXT, fontWeight: 600 }}>{date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div><div style={{ color: TEXT_SEC, fontFamily: 'monospace' }}>{date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div><div style={{ color: TEXT_SEC }}>{item.actorEmail}</div><div style={{ color: INDIGO, fontWeight: 600 }}>{item.action}</div><div style={{ color: TEXT_SEC }}>{item.diff?.object || `${item.entityType} ${item.entityId}`}</div></div> })}</div>}
      </section>}
      {adjustmentOpen && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 20, display: 'grid', placeItems: 'center', padding: 20, background: 'rgba(30, 47, 68, .32)' }}><div style={{ width: 'min(520px, 100%)', padding: 26, borderRadius: 14, background: '#F7F3EC', border: `1px solid ${BORDER}`, boxShadow: '0 20px 60px rgba(30, 47, 68, .2)' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}><h2 style={{ margin: 0, color: INDIGO, fontFamily: "'Playfair Display', serif", fontSize: 23, fontWeight: 500 }}>Adjust Inventory</h2><button type="button" onClick={() => setAdjustmentOpen(false)} aria-label="Close" style={{ border: 0, background: 'transparent', color: TEXT_SEC, fontSize: 22, cursor: 'pointer' }}>×</button></div><div style={{ display: 'grid', gap: 16 }}><Field label="Variant"><select value={adjustmentVariantId} onChange={event => setAdjustmentVariantId(event.target.value)} style={inputStyle}><option value="">Select variant</option>{variants.map(variant => <option key={variant.id} value={variant.id}>{variant.size} / {variant.colorName} ({variant.sku})</option>)}</select></Field><Field label="Adjustment Type"><select value={adjustmentType} onChange={event => setAdjustmentType(event.target.value as InventoryPieceStatus)} style={inputStyle}>{INVENTORY_STATUSES.filter(status => status !== 'lost').map(status => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select></Field><Field label="Quantity"><input type="number" min="1" step="1" value={adjustmentQuantity} onChange={event => setAdjustmentQuantity(event.target.value)} style={inputStyle} /></Field><Field label="Reason"><input value={adjustmentReason} onChange={event => setAdjustmentReason(event.target.value)} style={inputStyle} placeholder="Production defect" /></Field><Field label="Notes"><textarea value={adjustmentNotes} onChange={event => setAdjustmentNotes(event.target.value)} style={{ ...inputStyle, minHeight: 78, resize: 'vertical' }} placeholder="Optional" /></Field></div><div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}><button type="button" onClick={() => setAdjustmentOpen(false)} style={{ padding: '10px 14px', border: `1px solid ${BORDER}`, borderRadius: 9, background: 'transparent', color: TEXT_SEC, cursor: 'pointer' }}>Cancel</button><button type="button" onClick={applyAdjustment} disabled={!adjustmentVariantId} style={{ padding: '10px 14px', border: 0, borderRadius: 9, background: INDIGO, color: '#E7DFD2', cursor: adjustmentVariantId ? 'pointer' : 'not-allowed', opacity: adjustmentVariantId ? 1 : .5 }}>Apply Adjustment</button></div></div></div>}
      {!['Product Information', 'Caractéristiques produit', 'Design & Heritage', 'Variants', 'Pricing', 'Release', 'Inventory', 'Media', 'Story', 'SEO', 'Activity'].includes(activeTab) && <section style={{ minHeight: 260, display: 'grid', placeItems: 'center', border: `1px dashed ${BORDER}`, borderRadius: 14, color: TEXT_SEC, background: '#FBF9F5' }}><div style={{ textAlign: 'center' }}><div style={{ color: INDIGO, fontWeight: 700 }}>{activeTab}</div><div style={{ marginTop: 8, fontSize: 13 }}>This tab is intentionally empty and ready for the next product module.</div></div></section>}
    </main>
    {validationToast && <div role="alert" aria-live="assertive" style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1500, width: 'min(380px, calc(100vw - 32px))', boxSizing: 'border-box', padding: '14px 18px', border: '1px solid #E4B8B3', borderRadius: 10, background: '#F9EDEA', color: '#8F1D15', fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-line', boxShadow: '0 14px 36px rgba(30, 47, 68, .2)' }}>{validationToast}</div>}
  </div>
}
