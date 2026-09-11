import { useEffect, useMemo, useRef, useState } from 'react'
import JSZip from 'jszip'
import QRCode from 'qrcode'
import jsQR from 'jsqr'
import type { Screen } from '../types'
import { coreApi } from '../core/api'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const SURFACE_2 = '#EFE8DD'
const CREAM = '#E7DFD2'
const GOLD = '#A87935'
const SAND = '#B7AA91'

type OriginStatement = 'MADE IN TUNISIA' | 'DESIGNED IN TUNISIA'
type ExportFormat = 'svg' | 'png'

type ProductForm = {
  pieceName: string
  productName: string
  collection: string
  reference: string
  color: string
  size: string
  materials: string
  weightGsm: string
  originStatement: OriginStatement
}

type GeneratedCode = {
  identifier: string
  url: string
  sequence: number
  svg: string
  png: string
}

type SavedBatch = {
  id: string
  seriesNumber?: number
  seriesName: string
  createdBy: string
  quantity: number
  usedCount?: number
  blankCount?: number
  codes?: Array<{ identifier: string; url: string; sequence: number; status?: string }>
  product: { productName: string; reference: string; color: string; size: string }
  createdAt: string
}

const INITIAL_PRODUCT: ProductForm = {
  pieceName: 'TAFUKT',
  productName: 'TEXTURED OVERSHIRT',
  collection: 'AUTUMN / WINTER 2026',
  reference: 'IZ-OS-001',
  color: 'KHAKI',
  size: 'M',
  materials: '95% POLYESTER\n5% LYCRA',
  weightGsm: '260',
  originStatement: 'MADE IN TUNISIA',
}

function createSeriesName(reference: string) {
  return `${reference.replace(/[^a-z0-9]/gi, '').toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function downloadText(content: string, filename: string, type = 'image/svg+xml') {
  downloadBlob(new Blob([content], { type }), filename)
}

async function createPngBundle(codes: GeneratedCode[], product: ProductForm, seriesName: string) {
  const width = 720
  const cardHeight = 340
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = Math.max(cardHeight, codes.length * cardHeight)
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas export is not supported by this browser.')

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (const [index, code] of codes.entries()) {
    const image = new Image()
    image.src = code.png
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error(`Unable to render ${code.identifier}`))
    })

    const y = index * cardHeight
    context.fillStyle = '#ffffff'
    context.fillRect(0, y, width, cardHeight)
    context.drawImage(image, 32, y + 32, 220, 220)
    context.fillStyle = '#1E2F44'
    context.font = '600 22px Arial'
    context.fillText(product.pieceName, 290, y + 78)
    context.font = '16px Arial'
    context.fillText(product.productName, 290, y + 112)
    context.font = 'bold 18px monospace'
    context.fillText(code.identifier, 290, y + 160)
    context.font = '14px Arial'
    context.fillText(`${product.reference} | ${product.color} | ${product.size}`, 290, y + 192)
    context.fillStyle = '#506681'
    context.fillText(seriesName, 290, y + 226)
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Unable to create PNG export.')), 'image/png')
  })
}

export default function QRCodeGenerator({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [product, setProduct] = useState<ProductForm>(INITIAL_PRODUCT)
  const [seriesName, setSeriesName] = useState(createSeriesName(INITIAL_PRODUCT.reference))
  const [createdBy, setCreatedBy] = useState('admin@izli.tn')
  const [quantity, setQuantity] = useState(12)
  const [format, setFormat] = useState<ExportFormat>('svg')
  const [codes, setCodes] = useState<GeneratedCode[]>([])
  const [batches, setBatches] = useState<SavedBatch[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [showGenerator, setShowGenerator] = useState(false)
  const [showAssign, setShowAssign] = useState(false)
  const [products, setProducts] = useState<Array<{ id: string; name: string; sku: string }>>([])
  const [selectedProductId, setSelectedProductId] = useState('')
  const [scannedIdentifier, setScannedIdentifier] = useState('')
  const [seriesNumber, setSeriesNumber] = useState(1)
  const scannerRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    Promise.all([
      coreApi.get<SavedBatch[]>('/resources/qrCodeBatches/summary'),
      coreApi.get<Array<{ id: string; name: string; sku: string }>>('/resources/products?limit=200'),
    ])
      .then(([savedBatches, savedProducts]) => {
        setBatches(savedBatches)
        setProducts(savedProducts)
        setSeriesNumber(Math.max(0, ...savedBatches.map(batch => batch.seriesNumber ?? 0)) + 1)
      })
      .catch(() => setBatches([]))
  }, [])

  useEffect(() => {
    if (!showAssign) return
    let cancelled = false
    const startScanner = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('La camera necessite une connexion HTTPS sur telephone.')
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (cancelled || !stream || !scannerRef.current) return
        streamRef.current = stream
        scannerRef.current.srcObject = stream
        await scannerRef.current.play()
        const Detector = (window as Window & { BarcodeDetector?: new (options?: { formats: string[] }) => { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>> } }).BarcodeDetector
        const detector = Detector ? new Detector({ formats: ['qr_code'] }) : null
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d', { willReadFrequently: true })
        const scan = async () => {
          if (cancelled || !scannerRef.current) return
          let value: string | undefined
          if (detector) {
            const detected = await detector.detect(scannerRef.current).catch(() => [])
            value = detected[0]?.rawValue
          } else if (context && scannerRef.current.videoWidth > 0) {
            canvas.width = scannerRef.current.videoWidth
            canvas.height = scannerRef.current.videoHeight
            context.drawImage(scannerRef.current, 0, 0, canvas.width, canvas.height)
            const image = context.getImageData(0, 0, canvas.width, canvas.height)
            value = jsQR(image.data, image.width, image.height)?.data
          }
          if (value) {
            setScannedIdentifier(value.split('/').pop()?.toUpperCase() ?? value.toUpperCase())
            return
          }
          window.setTimeout(scan, 250)
        }
        scan()
      } catch {
        setError('Camera indisponible. Saisissez le numero du QR manuellement.')
      }
    }
    startScanner()
    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }, [showAssign])

  const normalizedMaterials = useMemo(
    () => product.materials.split('\n').map(value => value.trim()).filter(Boolean),
    [product.materials],
  )

  const updateProduct = (field: keyof ProductForm, value: string) => {
    setProduct(current => ({ ...current, [field]: value }))
    if (field === 'reference') setSeriesName(createSeriesName(value))
  }

  const generateCodes = async () => {
    setError('')
    setNotice('')
    setIsGenerating(true)
    try {
      if (!product.reference.trim() || !product.productName.trim() || quantity < 1 || quantity > 500) {
        throw new Error('Renseignez la référence, le nom produit et une quantité entre 1 et 500.')
      }

      const generated = await Promise.all(Array.from({ length: quantity }, async (_, index) => {
        const sequence = index + 1
        const identifier = `${product.reference.trim().toUpperCase()}-S${String(seriesNumber).padStart(4, '0')}-${String(sequence).padStart(5, '0')}`
        const url = `https://izli.co/p/${identifier.toLowerCase()}`
        const [svg, png] = await Promise.all([
          QRCode.toString(url, { type: 'svg', margin: 2, width: 240, errorCorrectionLevel: 'H' }),
          QRCode.toDataURL(url, { margin: 2, width: 240, errorCorrectionLevel: 'H' }),
        ])
        return { identifier, url, sequence, svg, png }
      }))

      setCodes(generated)
      setNotice(`${generated.length} identifiants uniques ont ete generes.`)
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : 'Generation impossible.')
    } finally {
      setIsGenerating(false)
    }
  }

  const saveBatch = async () => {
    if (codes.length === 0) {
      setError('Generez la serie avant de la sauvegarder.')
      return
    }

    setError('')
    setNotice('')
    setIsSaving(true)
    try {
      await coreApi.post<SavedBatch>('/resources/qrCodeBatches', {
        seriesName,
        seriesNumber,
        createdBy,
        quantity: codes.length,
        exportFormats: [format],
        product: {
          ...product,
          materials: normalizedMaterials,
          weightGsm: Number(product.weightGsm) || undefined,
        },
        codes: codes.map(({ identifier, url, sequence }) => ({ identifier, url, sequence })),
      })
      const refreshed = await coreApi.get<SavedBatch[]>('/resources/qrCodeBatches/summary')
      setBatches(refreshed)
      setShowGenerator(false)
      setNotice('Serie enregistree dans la base de donnees.')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Enregistrement impossible. Verifiez la connexion API.')
    } finally {
      setIsSaving(false)
    }
  }

  const generateBatchCodes = async (batch: SavedBatch) => Promise.all((batch.codes ?? []).map(async code => {
    const [svg, png] = await Promise.all([
      QRCode.toString(code.url, { type: 'svg', margin: 2, width: 240, errorCorrectionLevel: 'H' }),
      QRCode.toDataURL(code.url, { margin: 2, width: 240, errorCorrectionLevel: 'H' }),
    ])
    return { ...code, svg, png }
  }))

  const downloadSavedSeries = async (batch: SavedBatch, exportFormat: ExportFormat) => {
    if (!batch.codes?.length) return
    const generatedCodes = await generateBatchCodes(batch)
    const zip = new JSZip()
    const folder = zip.folder(batch.seriesName) ?? zip
    for (const code of generatedCodes) {
      if (exportFormat === 'svg') folder.file(`${code.identifier}.svg`, code.svg)
      else folder.file(`${code.identifier}.png`, code.png.split(',')[1], { base64: true })
    }
    downloadBlob(await zip.generateAsync({ type: 'blob' }), `${batch.seriesName}-${exportFormat}.zip`)
  }

  const assignScannedCode = async () => {
    if (!scannedIdentifier || !selectedProductId) {
      setError('Scannez un QR et selectionnez un produit.')
      return
    }
    try {
      setError('')
      await coreApi.post('/resources/qrCodeBatches/assign', { identifier: scannedIdentifier, productId: selectedProductId })
      const refreshed = await coreApi.get<SavedBatch[]>('/resources/qrCodeBatches/summary')
      setBatches(refreshed)
      setShowAssign(false)
      setScannedIdentifier('')
      setNotice('QR code assigne au produit.')
    } catch (assignError) {
      setError(assignError instanceof Error ? assignError.message : 'Assignation impossible.')
    }
  }

  const downloadBundle = async () => {
    if (codes.length === 0) return
    setError('')
    try {
      const zip = new JSZip()
      const folder = zip.folder(seriesName) ?? zip
      const metadata = [
        `Series,${seriesName}`,
        `Created by,${createdBy}`,
        `Piece,${product.pieceName}`,
        `Product,${product.productName}`,
        `Collection,${product.collection}`,
        `Reference,${product.reference}`,
        `Color,${product.color}`,
        `Size,${product.size}`,
        `Materials,${normalizedMaterials.join(' / ')}`,
        `Weight GSM,${product.weightGsm}`,
        `Origin,${product.originStatement}`,
        '',
        'Identifier,URL,Sequence',
        ...codes.map(code => `${code.identifier},${code.url},${code.sequence}`),
      ].join('\n')
      folder.file('metadata.csv', metadata)

      if (format === 'svg') {
        codes.forEach(code => folder.file(`${code.identifier}.svg`, code.svg))
      } else {
        for (const code of codes) {
          const base64 = code.png.split(',')[1]
          folder.file(`${code.identifier}.png`, base64, { base64: true })
        }
      }

      const archive = await zip.generateAsync({ type: 'blob' })
      downloadBlob(archive, `${seriesName}-${format}.zip`)
      setNotice(`Export ${format.toUpperCase()} telecharge.`)
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : 'Export impossible.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: `1px solid ${BORDER}`,
    borderRadius: 9, background: '#fffdf9', color: TEXT, fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif',
  }
  const labelStyle: React.CSSProperties = { display: 'block', color: TEXT_SEC, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }
  const cardStyle: React.CSSProperties = { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '40px 48px 80px', color: TEXT, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 30 }}>
          <div>
            <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Content / Product Identity</div>
            <h1 style={{ margin: 0, color: INDIGO, fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 500 }}>QR Code Generator</h1>
            <p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Creer une serie traceable pour chaque piece et exporter les QR codes pour la production.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button type="button" onClick={() => setShowAssign(true)} style={{ padding: '10px 14px', border: `1px solid ${BORDER}`, borderRadius: 9, background: SURFACE, color: INDIGO, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>QR assign</button>
            <button type="button" onClick={() => { setShowGenerator(true); setSeriesNumber(Math.max(0, ...batches.map(batch => batch.seriesNumber ?? 0)) + 1) }} style={{ padding: '10px 14px', border: 0, borderRadius: 9, background: INDIGO, color: CREAM, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Nouvelle serie</button>
          </div>
        </div>

        {error && <div style={{ padding: '12px 14px', marginBottom: 18, borderRadius: 10, background: '#F9EDEA', color: '#A63D2F', fontSize: 13 }}>{error}</div>}
        {notice && <div style={{ padding: '12px 14px', marginBottom: 18, borderRadius: 10, background: '#E6EDE8', color: '#4A7A5A', fontSize: 13 }}>{notice}</div>}

        {showAssign && (
          <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'grid', placeItems: 'center', padding: 24, background: 'rgba(20, 30, 40, 0.52)' }}>
            <section style={{ width: 'min(100%, 520px)', ...cardStyle }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <h2 style={{ margin: 0, color: INDIGO, fontSize: 19 }}>QR assign</h2>
                <button type="button" onClick={() => setShowAssign(false)} aria-label="Fermer" style={{ border: 0, background: 'transparent', color: TEXT_SEC, fontSize: 22, cursor: 'pointer' }}>×</button>
              </div>
              <video ref={scannerRef} muted playsInline style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', background: '#202833', borderRadius: 10, marginBottom: 12 }} />
              <label><span style={labelStyle}>Numero du QR scanne</span><input value={scannedIdentifier} onChange={event => setScannedIdentifier(event.target.value.toUpperCase())} placeholder="IZ-OS-001-00001" style={inputStyle} /></label>
              <label style={{ display: 'block', marginTop: 14 }}><span style={labelStyle}>Produit a assigner</span><select value={selectedProductId} onChange={event => setSelectedProductId(event.target.value)} style={inputStyle}><option value="">Selectionner un produit</option>{products.map(productOption => <option key={productOption.id} value={productOption.id}>{productOption.name} · {productOption.sku}</option>)}</select></label>
              <button type="button" onClick={assignScannedCode} style={{ width: '100%', marginTop: 18, padding: 12, border: 0, borderRadius: 9, background: INDIGO, color: CREAM, fontWeight: 600, cursor: 'pointer' }}>Assigner le QR au produit</button>
            </section>
          </div>
        )}

        {!showGenerator && (
          <section style={{ ...cardStyle, marginBottom: 22 }}>
            <h2 style={{ margin: '0 0 16px', color: INDIGO, fontSize: 18 }}>Series QR enregistrees</h2>
            {batches.length === 0 ? <div style={{ color: TEXT_SEC, fontSize: 13 }}>Aucune serie sauvegardee.</div> : batches.map(batch => (
              <div key={batch.id} style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr 0.7fr 0.7fr auto', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${BORDER}` }}>
                <div><strong style={{ display: 'block', color: TEXT, fontSize: 13 }}>{batch.seriesName}</strong><span style={{ color: TEXT_SEC, fontSize: 11 }}>{batch.product.productName} · {batch.product.reference}</span><span style={{ display: 'block', color: SAND, fontSize: 10, marginTop: 4 }}>{batch.createdBy} · {new Date(batch.createdAt).toLocaleDateString()}</span></div>
                <div><span style={{ display: 'block', color: TEXT_SEC, fontSize: 10 }}>Numero serie</span><strong style={{ color: INDIGO }}>{batch.seriesNumber ?? '—'}</strong></div>
                <div><span style={{ display: 'block', color: TEXT_SEC, fontSize: 10 }}>QR generes</span><strong style={{ color: INDIGO }}>{batch.quantity}</strong></div>
                <div><span style={{ display: 'block', color: TEXT_SEC, fontSize: 10 }}>Encore vierges</span><strong style={{ color: GOLD }}>{batch.blankCount ?? batch.quantity}</strong></div>
                <div style={{ display: 'flex', gap: 6 }}><button type="button" title="Telecharger SVG" aria-label={`Telecharger SVG ${batch.seriesName}`} onClick={() => downloadSavedSeries(batch, 'svg')} style={{ width: 34, height: 34, border: `1px solid ${BORDER}`, borderRadius: 7, background: SURFACE_2, color: INDIGO, cursor: 'pointer', fontSize: 10 }}>SVG</button><button type="button" title="Telecharger PNG" aria-label={`Telecharger PNG ${batch.seriesName}`} onClick={() => downloadSavedSeries(batch, 'png')} style={{ width: 34, height: 34, border: `1px solid ${BORDER}`, borderRadius: 7, background: SURFACE_2, color: INDIGO, cursor: 'pointer', fontSize: 10 }}>PNG</button></div>
              </div>
            ))}
          </section>
        )}

        {showGenerator && <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 22, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 18px', color: INDIGO, fontSize: 16 }}>1. Identite de la serie</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label><span style={labelStyle}>Numero de serie</span><input type="number" min="1" value={seriesNumber} onChange={event => setSeriesNumber(Math.max(1, Number(event.target.value)))} style={inputStyle} /></label>
                <label><span style={labelStyle}>Nom de la serie</span><input value={seriesName} onChange={event => setSeriesName(event.target.value)} style={inputStyle} /></label>
                <label><span style={labelStyle}>Utilisateur createur</span><input value={createdBy} onChange={event => setCreatedBy(event.target.value)} style={inputStyle} /></label>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 18px', color: INDIGO, fontSize: 16 }}>2. Identite du produit</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 14 }}>
                <label><span style={labelStyle}>Nom de la piece</span><input value={product.pieceName} onChange={event => updateProduct('pieceName', event.target.value)} style={inputStyle} /></label>
                <label><span style={labelStyle}>Nom produit</span><input value={product.productName} onChange={event => updateProduct('productName', event.target.value)} style={inputStyle} /></label>
                <label><span style={labelStyle}>Collection</span><input value={product.collection} onChange={event => updateProduct('collection', event.target.value)} style={inputStyle} /></label>
                <label><span style={labelStyle}>Reference produit</span><input value={product.reference} onChange={event => updateProduct('reference', event.target.value)} style={inputStyle} /></label>
                <label><span style={labelStyle}>Coloris</span><input value={product.color} onChange={event => updateProduct('color', event.target.value)} style={inputStyle} /></label>
                <label><span style={labelStyle}>Taille</span><input value={product.size} onChange={event => updateProduct('size', event.target.value)} style={inputStyle} /></label>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 18px', color: INDIGO, fontSize: 16 }}>3. Informations produit</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr', gap: 14 }}>
                <label><span style={labelStyle}>Matieres (% par ligne)</span><textarea value={product.materials} onChange={event => updateProduct('materials', event.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></label>
                <label><span style={labelStyle}>Poids GSM</span><input type="number" min="0" value={product.weightGsm} onChange={event => updateProduct('weightGsm', event.target.value)} style={inputStyle} /></label>
                <label><span style={labelStyle}>Origine</span><select value={product.originStatement} onChange={event => updateProduct('originStatement', event.target.value as OriginStatement)} style={inputStyle}><option>MADE IN TUNISIA</option><option>DESIGNED IN TUNISIA</option></select></label>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 18px', color: INDIGO, fontSize: 16 }}>4. Generation</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: 14, alignItems: 'end' }}>
                <label><span style={labelStyle}>Nombre de pieces</span><input type="number" min="1" max="500" value={quantity} onChange={event => setQuantity(Math.max(1, Math.min(500, Number(event.target.value))))} style={inputStyle} /></label>
                <label><span style={labelStyle}>Format export groupe</span><select value={format} onChange={event => setFormat(event.target.value as ExportFormat)} style={inputStyle}><option value="svg">SVG</option><option value="png">PNG</option></select></label>
                <button type="button" onClick={generateCodes} disabled={isGenerating} style={{ padding: '11px 18px', border: 0, borderRadius: 9, background: INDIGO, color: CREAM, fontSize: 13, fontWeight: 600, cursor: isGenerating ? 'wait' : 'pointer' }}>{isGenerating ? 'Generation...' : 'Generer la serie'}</button>
              </div>
            </section>
          </div>

          <aside style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 16px', color: INDIGO, fontSize: 16 }}>Apercu et export</h2>
              {codes.length === 0 ? (
                <div style={{ padding: '28px 10px', textAlign: 'center', color: TEXT_SEC, fontSize: 13 }}>Generez une serie pour voir le premier QR code.</div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: 16, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 12 }} dangerouslySetInnerHTML={{ __html: codes[0].svg }} />
                  <div style={{ marginTop: 12, color: INDIGO, fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-word' }}>{codes[0].identifier}</div>
                  <div style={{ color: TEXT_SEC, fontSize: 11, marginTop: 5 }}>Chaque piece possede son identifiant unique.</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                    <button type="button" onClick={downloadBundle} style={{ padding: '10px 8px', border: `1px solid ${BORDER}`, borderRadius: 9, background: SURFACE_2, color: INDIGO, cursor: 'pointer', fontSize: 12 }}>Telecharger {format.toUpperCase()}</button>
                    <button type="button" onClick={saveBatch} disabled={isSaving} style={{ padding: '10px 8px', border: 0, borderRadius: 9, background: GOLD, color: '#fff', cursor: isSaving ? 'wait' : 'pointer', fontSize: 12 }}>{isSaving ? 'Enregistrement...' : 'Enregistrer en DB'}</button>
                  </div>
                </>
              )}
            </section>

            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 14px', color: INDIGO, fontSize: 16 }}>Dernieres series</h2>
              {batches.length === 0 ? <div style={{ color: TEXT_SEC, fontSize: 12 }}>Aucune serie sauvegardee.</div> : batches.map(batch => (
                <div key={batch.id} style={{ padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><strong style={{ color: TEXT, fontSize: 12 }}>{batch.seriesName}</strong><span style={{ color: GOLD, fontSize: 11 }}>{batch.quantity} codes</span></div>
                  <div style={{ color: TEXT_SEC, fontSize: 11, marginTop: 4 }}>{batch.product.productName} · {batch.product.reference} · {batch.product.size}</div>
                  <div style={{ color: SAND, fontSize: 10, marginTop: 4 }}>{batch.createdBy} · {new Date(batch.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </section>
          </aside>
        </div>}
      </div>
    </div>
  )
}
