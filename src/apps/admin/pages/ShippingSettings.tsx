import { useEffect, useState, type FormEvent } from 'react'
import type { Screen } from '../../../types'
import { getShippingSettings, updateShippingSettings, type ShippingSettings as ShippingSettingsData } from '../../../shared/services/shipping'

interface Props {
  onNavigate: (screen: Screen) => void
}

const CURRENCIES = ['TND', 'EUR', 'USD', 'MAD', 'DZD']
const inputStyle = {
  width: '100%',
  border: '1px solid #D8D0C4',
  borderRadius: 10,
  padding: '12px 14px',
  background: '#F5F1EA',
  color: '#2E2E2E',
  font: 'inherit',
}

export default function ShippingSettings(_props: Props) {
  const [settings, setSettings] = useState<ShippingSettingsData>({
    carrierName: '',
    deliveryFee: 0,
    currency: 'TND',
    configured: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let active = true
    getShippingSettings()
      .then(value => {
        if (active) setSettings(value)
      })
      .catch(reason => {
        if (active) setError(reason instanceof Error ? reason.message : 'Could not load shipping settings.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const updated = await updateShippingSettings({
        carrierName: settings.carrierName.trim(),
        deliveryFee: Number(settings.deliveryFee),
        currency: settings.currency,
      })
      setSettings(updated)
      setSaved(true)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not save shipping settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '40px 48px', color: '#2E2E2E' }}>
      <header style={{ marginBottom: 30 }}>
        <p style={{ color: '#B7AA91', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Commerce settings</p>
        <h1 style={{ color: '#1E2F44', fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, margin: '8px 0' }}>Expédition</h1>
        <p style={{ color: '#506681', margin: 0 }}>Configurez le transporteur par défaut et les frais appliqués à chaque commande.</p>
      </header>

      {loading ? <p role="status">Loading shipping settings…</p> : (
        <form onSubmit={handleSubmit} style={{ background: '#F5F1EA', border: '1px solid #D8D0C4', borderRadius: 18, padding: 28, display: 'grid', gap: 22 }}>
          <label style={{ display: 'grid', gap: 8, fontSize: 13, fontWeight: 600 }}>
            Delivery company
            <input
              required
              maxLength={100}
              autoComplete="organization"
              value={settings.carrierName}
              onChange={event => setSettings(current => ({ ...current, carrierName: event.target.value }))}
              placeholder="e.g. Your delivery partner"
              style={inputStyle}
            />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 160px', gap: 16 }}>
            <label style={{ display: 'grid', gap: 8, fontSize: 13, fontWeight: 600 }}>
              Delivery fee
              <input
                required
                type="number"
                min="0"
                max="100000"
                step="0.001"
                value={settings.deliveryFee}
                onChange={event => setSettings(current => ({ ...current, deliveryFee: Number(event.target.value) }))}
                style={inputStyle}
              />
            </label>
            <label style={{ display: 'grid', gap: 8, fontSize: 13, fontWeight: 600 }}>
              Currency
              <select
                value={settings.currency}
                onChange={event => setSettings(current => ({ ...current, currency: event.target.value }))}
                style={inputStyle}
              >
                {CURRENCIES.map(currency => <option key={currency} value={currency}>{currency}</option>)}
              </select>
            </label>
          </div>

          <p style={{ color: '#506681', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            This carrier and its delivery fee are used for all new orders. Customers pay cash on delivery; the fee is included in the order total.
          </p>
          {error && <p role="alert" style={{ color: '#A02020', margin: 0 }}>{error}</p>}
          {saved && <p role="status" style={{ color: '#4A7A5A', margin: 0 }}>Shipping settings saved.</p>}
          <button disabled={saving} type="submit" style={{ justifySelf: 'start', border: 0, borderRadius: 10, background: '#1E2F44', color: '#E7DFD2', padding: '12px 22px', fontWeight: 600, cursor: saving ? 'wait' : 'pointer', opacity: saving ? .7 : 1 }}>
            {saving ? 'Saving…' : 'Save shipping settings'}
          </button>
        </form>
      )}
    </main>
  )
}
