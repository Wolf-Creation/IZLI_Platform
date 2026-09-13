import { useEffect, useRef, useState } from 'react'
import JSZip from 'jszip'
import QRCode from 'qrcode'
import jsQR from 'jsqr'
import type { Screen } from '../../../types'
import { coreApi } from '../../../core/api'

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

type ExportFormat = 'svg' | 'png'

type GeneratedCode = {
  qrNumber: string
  url: string
  sequenceNumber: number
  svg: string
  png: string
}

type SavedSeries = {
  id: string
  name: string
  startSequence: number
  endSequence: number
  startQrNumber?: string
  endQrNumber?: string
  format?: ExportFormat
  createdBy: string
  quantity: number
  usedCount?: number
  blankCount?: number
  createdAt: string
}

type SavedQr = {
  id?: string
  qrNumber: string
  url: string
  sequenceNumber: number
  status?: string
  serialNumber?: string | null
  productCode?: string | null
  size?: string | null
  color?: string | null
  colorCode?: string | null
  releaseNumber?: string | null
  releaseProductNumber?: string | null
}

function createSeriesName() {
  return `IZS001-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
}

function getAdminEmail() {
  try {
    const user = JSON.parse(localStorage.getItem('izli.currentUser') || 'null') as { email?: string } | null
    return user?.email || 'admin@izli.tn'
  } catch {
    return 'admin@izli.tn'
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function QRCodeGenerator({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [seriesName, setSeriesName] = useState(createSeriesName())
  const [createdBy] = useState(getAdminEmail)
  const [quantity, setQuantity] = useState(12)
  const [format, setFormat] = useState<ExportFormat>('svg')
  const [codes, setCodes] = useState<GeneratedCode[]>([])
  const [batches, setBatches] = useState<SavedSeries[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [showGenerator, setShowGenerator] = useState(false)
  const [showAssign, setShowAssign] = useState(false)
  const [products, setProducts] = useState<Array<{ id: string; name: string; sku: string; releaseNumber?: string }>>([])
  const [qrCodes, setQrCodes] = useState<SavedQr[]>([])
  const [qrSearch, setQrSearch] = useState('')
  const [qrStatus, setQrStatus] = useState('')
  const [qrPage, setQrPage] = useState(1)
  const [selectedProductId, setSelectedProductId] = useState('')
  const [scannedIdentifier, setScannedIdentifier] = useState('')
  const [assignment, setAssignment] = useState({ size: '', color: '', colorCode: '', releaseNumber: '', releaseProductNumber: '' })
  const scannerRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    Promise.all([
      coreApi.get<SavedSeries[]>('/qr/series'),
      coreApi.get<Array<{ id: string; name: string; sku: string; releaseNumber?: string }>>('/resources/products?limit=200'),
      coreApi.get<SavedQr[]>('/qr/codes'),
    ])
      .then(([savedBatches, savedProducts, savedQrs]) => {
        setBatches(savedBatches)
        setProducts(savedProducts)
        setQrCodes(savedQrs)
      })
      .catch(() => setBatches([]))
  }, [])

  useEffect(() => {
    setQrPage(1)
  }, [qrSearch, qrStatus])

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

  const generateCodes = async () => {
    setError('')
    setNotice('')
    setIsGenerating(true)
    try {
      if (quantity < 1 || quantity > 5000) {
        throw new Error('Renseignez une quantité entre 1 et 5000.')
      }

      const result = await coreApi.post<{ series: SavedSeries; codes: Array<{ qrNumber: string; url: string; sequenceNumber: number }> }>('/qr/series', {
        quantity,
        name: seriesName,
        createdBy,
        format,
      })
      const generated = await Promise.all(result.codes.map(async code => {
        const [svg, png] = await Promise.all([
          QRCode.toString(code.url, { type: 'svg', margin: 2, width: 240, errorCorrectionLevel: 'H' }),
          QRCode.toDataURL(code.url, { margin: 2, width: 240, errorCorrectionLevel: 'H' }),
        ])
        return { ...code, svg, png }
      }))

      setCodes(generated)
      setBatches(current => [result.series, ...current.filter(batch => batch.id !== result.series.id)])
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

    setShowGenerator(false)
    setNotice('Serie deja enregistree dans la base de donnees.')
  }

  const generateBatchCodes = async (codesToGenerate: SavedQr[]) => Promise.all(codesToGenerate.map(async code => {
    const [svg, png] = await Promise.all([
      QRCode.toString(code.url, { type: 'svg', margin: 2, width: 240, errorCorrectionLevel: 'H' }),
      QRCode.toDataURL(code.url, { margin: 2, width: 240, errorCorrectionLevel: 'H' }),
    ])
    return { ...code, svg, png }
  }))

  const downloadSavedSeries = async (batch: SavedSeries, exportFormat: ExportFormat) => {
    const savedCodes = await coreApi.get<SavedQr[]>(`/qr/codes?seriesId=${batch.id}`)
    if (!savedCodes.length) return
    const generatedCodes = await generateBatchCodes(savedCodes)
    const zip = new JSZip()
    const folder = zip.folder(batch.name) ?? zip
    for (const code of generatedCodes) {
      if (exportFormat === 'svg') folder.file(`${code.qrNumber}.svg`, code.svg)
      else folder.file(`${code.qrNumber}.png`, code.png.split(',')[1], { base64: true })
    }
    downloadBlob(await zip.generateAsync({ type: 'blob' }), `${batch.name}-${exportFormat}.zip`)
  }

  const deleteQrSeries = async (batch: SavedSeries) => {
    if (!window.confirm(`Supprimer la serie "${batch.name}" et ses QR codes vierges ?`)) return
    try {
      setError('')
      await coreApi.del(`/qr/series/${batch.id}`)
      const [refreshedSeries, refreshedQrs] = await Promise.all([
        coreApi.get<SavedSeries[]>('/qr/series'),
        coreApi.get<SavedQr[]>('/qr/codes'),
      ])
      setBatches(refreshedSeries)
      setQrCodes(refreshedQrs)
      setNotice('Serie QR supprimee.')
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Suppression impossible.')
    }
  }

  const assignScannedCode = async () => {
    if (!scannedIdentifier || !selectedProductId) {
      setError('Scannez un QR et selectionnez un produit.')
      return
    }
    try {
      setError('')
      await coreApi.post('/qr/assign', { qrNumber: scannedIdentifier, productId: selectedProductId, ...assignment })
      const [refreshed, refreshedQrs] = await Promise.all([
        coreApi.get<SavedSeries[]>('/qr/series'),
        coreApi.get<SavedQr[]>('/qr/codes'),
      ])
      setBatches(refreshed)
      setQrCodes(refreshedQrs)
      setShowAssign(false)
      setScannedIdentifier('')
      setAssignment({ size: '', color: '', colorCode: '', releaseNumber: '', releaseProductNumber: '' })
      setNotice('QR code assigne au produit.')
    } catch (assignError) {
      setError(assignError instanceof Error ? assignError.message : 'Assignation impossible.')
    }
  }

  const selectedProduct = products.find(productOption => productOption.id === selectedProductId)
  const serialPreview = scannedIdentifier && selectedProduct && assignment.releaseNumber && assignment.releaseProductNumber && assignment.size && assignment.colorCode
    ? `IZLI-${selectedProduct.sku.toUpperCase()}-R${assignment.releaseNumber.toUpperCase()}-P${assignment.releaseProductNumber.toUpperCase()}-${assignment.size.toUpperCase()}-${assignment.colorCode.toUpperCase()}`
    : 'Completez les informations pour previsualiser le serial.'

  const filteredQrs = qrCodes.filter(qr => (!qrStatus || qr.status === qrStatus) && (!qrSearch || `${qr.qrNumber} ${qr.serialNumber ?? ''}`.toLowerCase().includes(qrSearch.toLowerCase())))
  const qrPageSize = 10
  const totalQrPages = Math.max(1, Math.ceil(filteredQrs.length / qrPageSize))
  const visibleQrs = filteredQrs.slice((qrPage - 1) * qrPageSize, qrPage * qrPageSize)

  const downloadBundle = async () => {
    if (codes.length === 0) return
    setError('')
    try {
      const zip = new JSZip()
      const folder = zip.folder(seriesName) ?? zip
      const metadata = [
        `Series,${seriesName}`,
        `Created by,${createdBy}`,
        '',
        'QR Number,URL,Sequence',
        ...codes.map(code => `${code.qrNumber},${code.url},${code.sequenceNumber}`),
      ].join('\n')
      folder.file('metadata.csv', metadata)

      if (format === 'svg') {
        codes.forEach(code => folder.file(`${code.qrNumber}.svg`, code.svg))
      } else {
        for (const code of codes) {
          const base64 = code.png.split(',')[1]
          folder.file(`${code.qrNumber}.png`, base64, { base64: true })
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
            <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Content / QR management</div>
            <h1 style={{ margin: 0, color: INDIGO, fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 500 }}>QR Code Manager</h1>
            <p style={{ margin: '8px 0 0', color: TEXT_SEC, fontSize: 13 }}>Creez des QR vierges en serie, puis assignez-les separement a des produits.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button type="button" onClick={() => setShowAssign(true)} style={{ padding: '10px 14px', border: `1px solid ${BORDER}`, borderRadius: 9, background: SURFACE, color: INDIGO, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>QR assign</button>
            <button type="button" onClick={() => setShowGenerator(true)} style={{ padding: '10px 14px', border: 0, borderRadius: 9, background: INDIGO, color: CREAM, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Nouvelle serie</button>
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
              <label><span style={labelStyle}>Numero du QR scanne</span><input value={scannedIdentifier} onChange={event => setScannedIdentifier(event.target.value.toUpperCase())} placeholder="IZLI-000001" style={inputStyle} /></label>
              <label style={{ display: 'block', marginTop: 14 }}><span style={labelStyle}>Produit a assigner</span><select value={selectedProductId} onChange={event => { const nextProduct = products.find(productOption => productOption.id === event.target.value); setSelectedProductId(event.target.value); setAssignment(current => ({ ...current, releaseNumber: nextProduct?.releaseNumber ?? current.releaseNumber })) }} style={inputStyle}><option value="">Selectionner un produit</option>{products.map(productOption => <option key={productOption.id} value={productOption.id}>{productOption.name} · {productOption.sku}{productOption.releaseNumber ? ` · Release ${productOption.releaseNumber}` : ''}</option>)}</select></label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
                {([['size', 'Taille'], ['color', 'Couleur'], ['colorCode', 'Code couleur'], ['releaseNumber', 'Release'], ['releaseProductNumber', 'No produit release']] as const).map(([field, label]) => (
                  <label key={field}><span style={labelStyle}>{label}</span><input value={assignment[field]} onChange={event => setAssignment(current => ({ ...current, [field]: event.target.value }))} style={inputStyle} /></label>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: 12, borderRadius: 9, background: '#EBF0F5', color: INDIGO }}>
                <div style={{ ...labelStyle, marginBottom: 5 }}>Serial number preview</div>
                <code style={{ fontSize: 12, wordBreak: 'break-word' }}>{serialPreview}</code>
              </div>
              <button type="button" onClick={assignScannedCode} style={{ width: '100%', marginTop: 18, padding: 12, border: 0, borderRadius: 9, background: INDIGO, color: CREAM, fontWeight: 600, cursor: 'pointer' }}>Assigner le QR au produit</button>
            </section>
          </div>
        )}

        {!showGenerator && (
          <section style={{ ...cardStyle, marginBottom: 22 }}>
            <h2 style={{ margin: '0 0 16px', color: INDIGO, fontSize: 18 }}>Series QR enregistrees</h2>
            {batches.length === 0 ? <div style={{ color: TEXT_SEC, fontSize: 13 }}>Aucune serie sauvegardee.</div> : batches.map(batch => (
              <div key={batch.id} style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr 0.7fr 0.7fr auto', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button type="button" title="Supprimer la serie" aria-label={`Supprimer la serie ${batch.name}`} onClick={() => deleteQrSeries(batch)} style={{ width: 30, height: 30, display: 'grid', placeItems: 'center', flexShrink: 0, border: `1px solid #D9AAA3`, borderRadius: 7, background: '#F9EDEA', color: '#A63D2F', cursor: 'pointer' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
                  </button>
                  <div><strong style={{ display: 'block', color: TEXT, fontSize: 13 }}>{batch.name}</strong><span style={{ color: TEXT_SEC, fontSize: 11 }}>{batch.startQrNumber || `IZLI-${String(batch.startSequence).padStart(6, '0')}`} → {batch.endQrNumber || `IZLI-${String(batch.endSequence).padStart(6, '0')}`}</span><span style={{ display: 'block', color: SAND, fontSize: 10, marginTop: 4 }}>{batch.createdBy} · {new Date(batch.createdAt).toLocaleDateString()}</span></div>
                </div>
                <div><span style={{ display: 'block', color: TEXT_SEC, fontSize: 10 }}>Plage reservee</span><strong style={{ color: INDIGO }}>{batch.startSequence} → {batch.endSequence}</strong></div>
                <div><span style={{ display: 'block', color: TEXT_SEC, fontSize: 10 }}>QR generes</span><strong style={{ color: INDIGO }}>{batch.quantity}</strong></div>
                <div><span style={{ display: 'block', color: TEXT_SEC, fontSize: 10 }}>Encore vierges</span><strong style={{ color: GOLD }}>{batch.blankCount ?? batch.quantity}</strong></div>
                <div style={{ display: 'flex', gap: 6 }}><button type="button" title="Telecharger SVG" aria-label={`Telecharger SVG ${batch.name}`} onClick={() => downloadSavedSeries(batch, 'svg')} style={{ width: 34, height: 34, border: `1px solid ${BORDER}`, borderRadius: 7, background: SURFACE_2, color: INDIGO, cursor: 'pointer', fontSize: 10 }}>SVG</button><button type="button" title="Telecharger PNG" aria-label={`Telecharger PNG ${batch.name}`} onClick={() => downloadSavedSeries(batch, 'png')} style={{ width: 34, height: 34, border: `1px solid ${BORDER}`, borderRadius: 7, background: SURFACE_2, color: INDIGO, cursor: 'pointer', fontSize: 10 }}>PNG</button></div>
              </div>
            ))}
          </section>
        )}

        {!showGenerator && (
          <section style={{ ...cardStyle, marginBottom: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <h2 style={{ margin: 0, color: INDIGO, fontSize: 18 }}>QR codes</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={qrSearch} onChange={event => setQrSearch(event.target.value)} placeholder="Rechercher QR ou serial" style={{ ...inputStyle, width: 210 }} />
                <select value={qrStatus} onChange={event => setQrStatus(event.target.value)} style={{ ...inputStyle, width: 140 }}><option value="">Tous les statuts</option><option value="unassigned">UNASSIGNED</option><option value="assigned">ASSIGNED</option><option value="sold">SOLD</option><option value="activated">ACTIVATED</option><option value="keeper">KEEPER</option></select>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead><tr style={{ color: TEXT_SEC, textAlign: 'left', borderBottom: `1px solid ${BORDER}` }}>{['QR number', 'Serial number', 'Product', 'Size', 'Color', 'Release', 'Status'].map(label => <th key={label} style={{ padding: '9px 8px', fontWeight: 600 }}>{label}</th>)}</tr></thead>
                <tbody>{visibleQrs.map(qr => (
                  <tr key={qr.id ?? qr.qrNumber} style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <td style={{ padding: '10px 8px', color: INDIGO, fontFamily: 'monospace', fontWeight: 600 }}>{qr.qrNumber}</td>
                    <td style={{ padding: '10px 8px', color: TEXT_SEC, fontFamily: 'monospace' }}>{qr.serialNumber ?? '—'}</td>
                    <td style={{ padding: '10px 8px', color: TEXT }}>{qr.productCode ?? '—'}</td>
                    <td style={{ padding: '10px 8px', color: TEXT_SEC }}>{qr.size ?? '—'}</td>
                    <td style={{ padding: '10px 8px', color: TEXT_SEC }}>{qr.color ?? '—'}{qr.colorCode ? ` (${qr.colorCode})` : ''}</td>
                    <td style={{ padding: '10px 8px', color: TEXT_SEC }}>{qr.releaseNumber ? `${qr.releaseNumber} / ${qr.releaseProductNumber ?? '—'}` : '—'}</td>
                    <td style={{ padding: '10px 8px' }}><span style={{ padding: '4px 7px', borderRadius: 6, background: qr.status === 'assigned' ? '#E6EDE8' : SURFACE_2, color: qr.status === 'assigned' ? '#4A7A5A' : TEXT_SEC, fontSize: 10, fontWeight: 700 }}>{(qr.status ?? 'unassigned').toUpperCase()}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 16, color: TEXT_SEC, fontSize: 12 }}>
              <span>{filteredQrs.length} QR code{filteredQrs.length !== 1 ? 's' : ''} · Page {qrPage} / {totalQrPages}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" onClick={() => setQrPage(page => Math.max(1, page - 1))} disabled={qrPage === 1} style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 7, background: qrPage === 1 ? SURFACE_2 : SURFACE, color: TEXT_SEC, cursor: qrPage === 1 ? 'not-allowed' : 'pointer' }}>Precedent</button>
                <button type="button" onClick={() => setQrPage(page => Math.min(totalQrPages, page + 1))} disabled={qrPage === totalQrPages} style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 7, background: qrPage === totalQrPages ? SURFACE_2 : SURFACE, color: TEXT_SEC, cursor: qrPage === totalQrPages ? 'not-allowed' : 'pointer' }}>Suivant</button>
              </div>
            </div>
          </section>
        )}

        {showGenerator && <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 22, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 18px', color: INDIGO, fontSize: 16 }}>1. Identite de la serie</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label><span style={labelStyle}>Nom de la serie</span><input value={seriesName} onChange={event => setSeriesName(event.target.value)} style={inputStyle} /></label>
                <label><span style={labelStyle}>Utilisateur createur</span><input value={createdBy} readOnly style={{ ...inputStyle, background: SURFACE_2 }} /></label>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 18px', color: INDIGO, fontSize: 16 }}>2. Generation</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: 14, alignItems: 'end' }}>
                <label><span style={labelStyle}>Nombre de QR codes</span><input type="number" min="1" max="5000" value={quantity} onChange={event => setQuantity(Math.max(1, Math.min(5000, Number(event.target.value))))} style={inputStyle} /></label>
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
                  <div style={{ marginTop: 12, color: INDIGO, fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-word' }}>{codes[0].qrNumber}</div>
                  <div style={{ color: TEXT_SEC, fontSize: 11, marginTop: 5 }}>QR vierge, sans produit assigne.</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                    <button type="button" onClick={downloadBundle} style={{ padding: '10px 8px', border: `1px solid ${BORDER}`, borderRadius: 9, background: SURFACE_2, color: INDIGO, cursor: 'pointer', fontSize: 12 }}>Telecharger {format.toUpperCase()}</button>
                    <button type="button" onClick={saveBatch} style={{ padding: '10px 8px', border: 0, borderRadius: 9, background: GOLD, color: '#fff', cursor: 'pointer', fontSize: 12 }}>Voir les QR codes</button>
                  </div>
                </>
              )}
            </section>

            <section style={cardStyle}>
              <h2 style={{ margin: '0 0 14px', color: INDIGO, fontSize: 16 }}>Dernieres series</h2>
              {batches.length === 0 ? <div style={{ color: TEXT_SEC, fontSize: 12 }}>Aucune serie sauvegardee.</div> : batches.map(batch => (
                <div key={batch.id} style={{ padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><strong style={{ color: TEXT, fontSize: 12 }}>{batch.name}</strong><span style={{ color: GOLD, fontSize: 11 }}>{batch.quantity} codes</span></div>
                  <div style={{ color: TEXT_SEC, fontSize: 11, marginTop: 4 }}>IZLI-{String(batch.startSequence).padStart(6, '0')} → IZLI-{String(batch.endSequence).padStart(6, '0')}</div>
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
