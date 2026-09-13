import { useEffect, useState } from 'react'
import type { WebPage } from '../../types'
import { coreApi } from '../../../../core/api'

interface Props {
  qrNumber: string
  onNavigate: (page: WebPage) => void
}

type QrDetails = {
  qrNumber: string
  serialNumber?: string | null
  status: string
  size?: string | null
  color?: string | null
  colorCode?: string | null
  releaseNumber?: string | null
  releaseProductNumber?: string | null
  productId?: { name?: string; sku?: string; description?: string; coverImageUrl?: string } | null
}

export default function QrProduct({ qrNumber, onNavigate }: Props) {
  const [qr, setQr] = useState<QrDetails | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    coreApi.get<QrDetails>(`/qr/public/${encodeURIComponent(qrNumber)}`).then(setQr).catch(errorValue => {
      setError(errorValue instanceof Error ? errorValue.message : 'QR code introuvable.')
    })
  }, [qrNumber])

  if (error) {
    return <main style={{ minHeight: '70vh', padding: '150px 24px 80px', textAlign: 'center', color: '#1E2F44' }}><h1>QR code introuvable</h1><p>{error}</p><button onClick={() => onNavigate('home')}>Retour a IZLI</button></main>
  }

  if (!qr) return <main style={{ minHeight: '70vh', padding: '150px 24px 80px', textAlign: 'center', color: '#506681' }}>Chargement du produit...</main>

  const product = qr.productId
  return (
    <main style={{ minHeight: '70vh', padding: '140px 6vw 80px', background: '#EDE8DF', color: '#1E2F44' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 420px)', gap: 42, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A87935', fontWeight: 700 }}>IZLI product passport</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 42, fontWeight: 500, margin: '14px 0' }}>{product?.name ?? 'Produit IZLI'}</h1>
          <p style={{ color: '#506681', lineHeight: 1.7 }}>{product?.description || 'Ce QR code identifie une piece authentique de l ecosysteme IZLI.'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
            {[['QR number', qr.qrNumber], ['Serial number', qr.serialNumber || 'Non assigne'], ['Taille', qr.size || '—'], ['Couleur', qr.color ? `${qr.color}${qr.colorCode ? ` (${qr.colorCode})` : ''}` : '—'], ['Release', qr.releaseNumber || '—'], ['Produit dans la release', qr.releaseProductNumber || '—'], ['Statut', qr.status]].map(([label, value]) => <div key={label} style={{ padding: 14, background: '#F5F1EA', border: '1px solid #D8D0C4', borderRadius: 10 }}><div style={{ fontSize: 10, color: '#506681', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div><div style={{ marginTop: 6, fontSize: 13, fontFamily: label.includes('number') ? 'monospace' : 'inherit' }}>{value}</div></div>)}
          </div>
        </div>
        {product?.coverImageUrl ? <img src={product.coverImageUrl} alt={product.name || qr.qrNumber} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 14 }} /> : <div style={{ aspectRatio: '4 / 5', borderRadius: 14, background: '#1E2F44', display: 'grid', placeItems: 'center', color: '#E7DFD2', fontFamily: 'Playfair Display, serif', fontSize: 24 }}>IZLI</div>}
      </div>
    </main>
  )
}
