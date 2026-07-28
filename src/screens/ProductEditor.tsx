import { useEffect, useState } from 'react'
import type { Screen } from '../types'
import type { Currency, Product, ProductReleaseStatus, ProductStatus, ProductUniverse, SizeAvailability } from '../entities'
import { useProduct } from '../shared/hooks/useProducts'
import { createProduct, updateProduct } from '../shared/services/products'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'

interface Props {
  onNavigate: (s: Screen) => void
  productId: string | null
  onDone: () => void
}

interface ProductForm {
  sku: string
  name: string
  universe: ProductUniverse
  status: ProductStatus
  releaseNumber: string
  quantity: string
  launchDate: string
  releaseStatus: ProductReleaseStatus
  qrExperienceUrl: string
  productPassportId: string
  archiveTitle: string
  storyTitle: string
  price: string
  currency: Currency
  description: string
  coverImageUrl: string
  imagesText: string
  sizesText: string
  materialsText: string
  careInstructionsText: string
  productionNotes: string
}

const EMPTY_FORM: ProductForm = {
  sku: '',
  name: '',
  universe: 'Heritage',
  status: 'draft',
  releaseNumber: '01',
  quantity: '150',
  launchDate: '',
  releaseStatus: 'draft',
  qrExperienceUrl: '',
  productPassportId: '',
  archiveTitle: '',
  storyTitle: '',
  price: '0',
  currency: 'EUR',
  description: '',
  coverImageUrl: '',
  imagesText: '',
  sizesText: '',
  materialsText: '',
  careInstructionsText: '',
  productionNotes: '',
}

const UPPER_RELEASE_STATUSES: ProductReleaseStatus[] = ['draft', 'ready', 'production', 'upcoming', 'live', 'sold-out', 'archived']
const CATALOG_STATUSES: ProductStatus[] = ['published', 'draft', 'archived', 'out-of-stock']
const UNIVERSES: ProductUniverse[] = ['Heritage', 'Essentials', 'Studio', 'Community Lab']
const CURRENCIES: Currency[] = ['EUR', 'USD', 'MAD', 'DZD']

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '18px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, letterSpacing: '0.01em' }}>{title}</div>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: '#B7AA91', marginTop: 4 }}>{hint}</div>}
    </div>
  )
}

function StatusPill({ label, active }: { label: string; active: boolean }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 999, background: active ? INDIGO : '#EDE8DF', color: active ? '#E7DFD2' : TEXT_SEC, textTransform: 'uppercase' }}>
      {label}
    </span>
  )
}

function Chip({ label, active }: { label: string; active: boolean }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: active ? '#E8EDF3' : '#EDE8DF', color: active ? INDIGO : TEXT_SEC, textTransform: 'uppercase' }}>
      {label}
    </span>
  )
}

function CatalogChip({ status }: { status: ProductStatus }) {
  const map: Record<ProductStatus, { bg: string; color: string }> = {
    published: { bg: '#E6EDE8', color: '#4A7A5A' },
    draft: { bg: '#EDE8DF', color: TEXT_SEC },
    archived: { bg: '#EEEEEE', color: '#999' },
    'out-of-stock': { bg: '#FDF3EC', color: '#A06030' },
  }

  const palette = map[status]

  return (
    <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: palette.bg, color: palette.color, textTransform: 'uppercase' }}>
      {status}
    </span>
  )
}

function mapProductToForm(product: Product): ProductForm {
  return {
    sku: product.sku,
    name: product.name,
    universe: product.universe,
    status: product.status,
    releaseNumber: product.releaseNumber ?? '01',
    quantity: String(product.quantity ?? 150),
    launchDate: product.launchDate ? product.launchDate.slice(0, 10) : '',
    releaseStatus: product.releaseStatus ?? 'draft',
    qrExperienceUrl: product.qrExperienceUrl ?? '',
    productPassportId: product.productPassportId ?? '',
    archiveTitle: product.archiveTitle ?? '',
    storyTitle: product.storyTitle ?? '',
    price: String(product.price ?? 0),
    currency: product.currency,
    description: product.description ?? '',
    coverImageUrl: product.coverImageUrl ?? '',
    imagesText: (product.images ?? []).join('\n'),
    sizesText: (product.sizes ?? []).map(size => `${size.size}, ${size.stock}, ${size.availability}`).join('\n'),
    materialsText: (product.materials ?? []).join('\n'),
    careInstructionsText: (product.careInstructions ?? []).join('\n'),
    productionNotes: product.productionNotes ?? '',
  }
}

function splitLines(text: string) {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
}

function parseSizes(text: string) {
  return splitLines(text).map(line => {
    const [sizeRaw, stockRaw, availabilityRaw] = line.split(',').map(part => part.trim())
    const availability = (availabilityRaw as SizeAvailability) || 'available'
    return {
      size: sizeRaw || 'M',
      stock: Number(stockRaw || 0),
      availability,
    }
  })
}

export default function ProductEditor({ onNavigate, productId, onDone }: Props) {
  const { product, loading } = useProduct(productId ?? '')
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (productId) {
      if (product) {
        setForm(mapProductToForm(product))
      }
      return
    }

    setForm(EMPTY_FORM)
  }, [product, productId])

  const isEditing = Boolean(productId)
  const pageTitle = form.name || (isEditing ? 'Edit Product Release' : 'Create Product Release')
  const subtitle = isEditing
    ? 'Update the Legacy Release data and save the changes directly into MongoDB.'
    : 'Create a new finite release with product passport, QR, and production details.'

  const updateField = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) => {
    setForm(current => ({ ...current, [key]: value }))
  }

  const save = async () => {
    setSaving(true)
    setMessage(null)

    const payload: Partial<Product> = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      universe: form.universe,
      status: form.status,
      releaseNumber: form.releaseNumber.trim(),
      quantity: Number(form.quantity || 0),
      launchDate: form.launchDate ? new Date(form.launchDate).toISOString() : undefined,
      releaseStatus: form.releaseStatus,
      qrExperienceUrl: form.qrExperienceUrl.trim(),
      productPassportId: form.productPassportId.trim(),
      archiveTitle: form.archiveTitle.trim(),
      storyTitle: form.storyTitle.trim(),
      price: Number(form.price || 0),
      currency: form.currency,
      description: form.description.trim(),
      coverImageUrl: form.coverImageUrl.trim(),
      images: splitLines(form.imagesText),
      sizes: parseSizes(form.sizesText),
      materials: splitLines(form.materialsText),
      careInstructions: splitLines(form.careInstructionsText),
      productionNotes: form.productionNotes.trim(),
    }

    try {
      const saved = isEditing && productId
        ? await updateProduct(productId, payload)
        : await createProduct(payload)

      if (!saved) {
        throw new Error('Unable to save product release')
      }

      setMessage(isEditing ? 'Release updated successfully.' : 'Release created successfully.')
      onDone()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save product release')
    } finally {
      setSaving(false)
    }
  }

  if (isEditing && loading) {
    return <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto', color: TEXT_SEC }}>Loading product release...</div>
  }

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>{pageTitle}</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>{subtitle}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => onNavigate('products')} style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            ← Back
          </button>
          <button onClick={save} disabled={saving} style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: saving ? 'wait' : 'pointer', fontFamily: 'Inter, sans-serif', opacity: saving ? 0.85 : 1 }}>
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Release'}
          </button>
        </div>
      </div>

      {message && (
        <div style={{ marginBottom: 18, padding: '12px 16px', borderRadius: 12, background: '#E6EDE8', color: '#4A7A5A', border: '1px solid #C8D9CC', fontSize: 13 }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
        <div>
          <SectionCard title="Release Core">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Product Name">
                <input value={form.name} onChange={e => updateField('name', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="SKU" hint="Use the release identifier convention from the protocol">
                <input value={form.sku} onChange={e => updateField('sku', e.target.value)} style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }} />
              </Field>
              <Field label="Universe">
                <select value={form.universe} onChange={e => updateField('universe', e.target.value as ProductUniverse)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {UNIVERSES.map(universe => <option key={universe}>{universe}</option>)}
                </select>
              </Field>
              <Field label="Catalog Status">
                <select value={form.status} onChange={e => updateField('status', e.target.value as ProductStatus)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {CATALOG_STATUSES.map(status => <option key={status}>{status}</option>)}
                </select>
              </Field>
              <Field label="Release Number">
                <input value={form.releaseNumber} onChange={e => updateField('releaseNumber', e.target.value)} style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }} />
              </Field>
              <Field label="Release Status">
                <select value={form.releaseStatus} onChange={e => updateField('releaseStatus', e.target.value as ProductReleaseStatus)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {UPPER_RELEASE_STATUSES.map(status => <option key={status}>{status}</option>)}
                </select>
              </Field>
              <Field label="Quantity" hint="Finite quantity is mandatory for every Legacy Release">
                <input type="number" min="0" value={form.quantity} onChange={e => updateField('quantity', e.target.value)} style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }} />
              </Field>
              <Field label="Launch Date">
                <input type="date" value={form.launchDate} onChange={e => updateField('launchDate', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Price">
                <input type="number" min="0" step="0.01" value={form.price} onChange={e => updateField('price', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Currency">
                <select value={form.currency} onChange={e => updateField('currency', e.target.value as Currency)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {CURRENCIES.map(currency => <option key={currency}>{currency}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Description" hint="Shown in the public product page and the admin preview">
              <textarea value={form.description} onChange={e => updateField('description', e.target.value)} style={{ ...inputStyle, height: 96, resize: 'vertical' }} />
            </Field>
          </SectionCard>

          <SectionCard title="Release Context">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Archive Title">
                <input value={form.archiveTitle} onChange={e => updateField('archiveTitle', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Story Title">
                <input value={form.storyTitle} onChange={e => updateField('storyTitle', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="QR Experience URL">
                <input value={form.qrExperienceUrl} onChange={e => updateField('qrExperienceUrl', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Product Passport ID">
                <input value={form.productPassportId} onChange={e => updateField('productPassportId', e.target.value)} style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }} />
              </Field>
            </div>
            <Field label="Cover Image URL">
              <input value={form.coverImageUrl} onChange={e => updateField('coverImageUrl', e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Production Notes">
              <textarea value={form.productionNotes} onChange={e => updateField('productionNotes', e.target.value)} style={{ ...inputStyle, height: 92, resize: 'vertical' }} />
            </Field>
          </SectionCard>

          <SectionCard title="Media / Materials / Sizes">
            <Field label="Image URLs" hint="One URL per line">
              <textarea value={form.imagesText} onChange={e => updateField('imagesText', e.target.value)} style={{ ...inputStyle, height: 96, resize: 'vertical' }} />
            </Field>
            <Field label="Materials" hint="One material per line">
              <textarea value={form.materialsText} onChange={e => updateField('materialsText', e.target.value)} style={{ ...inputStyle, height: 84, resize: 'vertical' }} />
            </Field>
            <Field label="Care Instructions" hint="One instruction per line">
              <textarea value={form.careInstructionsText} onChange={e => updateField('careInstructionsText', e.target.value)} style={{ ...inputStyle, height: 84, resize: 'vertical' }} />
            </Field>
            <Field label="Sizes" hint="Format: size, stock, availability. One size per line">
              <textarea value={form.sizesText} onChange={e => updateField('sizesText', e.target.value)} style={{ ...inputStyle, height: 120, resize: 'vertical', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }} />
            </Field>
          </SectionCard>
        </div>

        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Release Summary</div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 500, color: INDIGO, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>{form.name || 'Unnamed Release'}</div>
              <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 16, fontFamily: 'JetBrains Mono, monospace' }}>{form.sku || 'No SKU yet'}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                <Chip label={form.universe} active />
                <StatusPill label={form.releaseStatus} active={form.releaseStatus === 'live'} />
                <CatalogChip status={form.status} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Quantity</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{form.quantity || '0'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Launch</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{form.launchDate || 'Not set'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>Passport</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{form.productPassportId || 'Not linked'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>QR</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: TEXT, wordBreak: 'break-all', textAlign: 'right' }}>{form.qrExperienceUrl || 'Not linked'}</span>
              </div>
              <button onClick={save} disabled={saving} style={{ width: '100%', padding: '10px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: saving ? 'wait' : 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
                {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Release'}
              </button>
              <button onClick={() => onNavigate('products')} style={{ width: '100%', padding: '10px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Cancel →
              </button>
            </div>
          </div>

          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Protocol Checks</div>
            {[
              { label: 'Finite quantity', ok: Number(form.quantity || 0) > 0 },
              { label: 'Passport linked', ok: Boolean(form.productPassportId.trim()) },
              { label: 'QR linked', ok: Boolean(form.qrExperienceUrl.trim()) },
              { label: 'Story linked', ok: Boolean(form.storyTitle.trim()) },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{item.label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: item.ok ? '#4A7A5A' : '#A06030' }}>{item.ok ? 'OK' : 'Missing'}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Release Preview</div>
            <div style={{ aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#EDE8DF', marginBottom: 12 }}>
              {form.coverImageUrl ? (
                <img src={form.coverImageUrl} alt={form.name || 'product preview'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_SEC, fontSize: 12 }}>Cover image preview</div>
              )}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{form.name || 'Unnamed Release'}</div>
            <div style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.5 }}>{form.description || 'Add the release description and story context to preview the public product page.'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: `1px solid ${BORDER}`,
  borderRadius: 10,
  background: '#EDE8DF',
  fontSize: 13,
  color: TEXT,
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
}
