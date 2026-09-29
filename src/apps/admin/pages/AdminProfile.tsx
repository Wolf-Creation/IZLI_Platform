import { FormEvent, useEffect, useState } from 'react'
import type { Screen } from '../../../types'
import type { User } from '../../../entities'
import { getAdminProfile, updateAdminProfile } from '../../../shared/services/auth'

interface Props { onNavigate: (screen: Screen) => void; onUpdated: (user: User) => void }

export default function AdminProfile({ onNavigate, onUpdated }: Props) {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAdminProfile().then(profile => { setEmail(profile.email); setDisplayName(profile.displayName) }).catch(value => setError(value instanceof Error ? value.message : 'Unable to load profile')).finally(() => setLoading(false))
  }, [])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const profile = await updateAdminProfile({ email, displayName, ...(password ? { password } : {}) })
      setEmail(profile.email)
      setDisplayName(profile.displayName)
      setPassword('')
      onUpdated({ ...profile, createdAt: new Date().toISOString() })
      setMessage('Profile updated successfully.')
    } catch (value) {
      setError(value instanceof Error ? value.message : 'Unable to update profile.')
    } finally { setSaving(false) }
  }

  if (loading) return <div style={{ padding: 48, color: '#506681' }}>Loading profile...</div>
  return <div style={{ padding: '40px 48px 80px', maxWidth: 760, margin: '0 auto' }}>
    <button type="button" onClick={() => onNavigate('dashboard')} style={{ marginBottom: 24, padding: '9px 14px', border: '1px solid #D8D0C4', borderRadius: 9, background: 'transparent', color: '#506681', cursor: 'pointer' }}>Back</button>
    <div style={{ marginBottom: 28 }}><div style={{ color: '#8C6B52', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Account</div><h1 style={{ margin: '8px 0 4px', color: '#1E2F44', fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 500 }}>Admin profile</h1><p style={{ margin: 0, color: '#506681', fontSize: 13 }}>Update your admin email or password.</p></div>
    <form onSubmit={submit} style={{ padding: 24, background: '#F5F1EA', border: '1px solid #D8D0C4', borderRadius: 16 }}>
      <label style={labelStyle}>Display name<input value={displayName} onChange={event => setDisplayName(event.target.value)} required style={inputStyle} /></label>
      <label style={labelStyle}>Admin email<input value={email} onChange={event => setEmail(event.target.value)} type="email" required style={inputStyle} /></label>
      <label style={labelStyle}>New password<input value={password} onChange={event => setPassword(event.target.value)} type="password" minLength={8} placeholder="Leave empty to keep current password" style={inputStyle} /></label>
      {message && <div style={{ marginBottom: 14, color: '#4A7A5A', fontSize: 13 }}>{message}</div>}
      {error && <div style={{ marginBottom: 14, color: '#A06030', fontSize: 13 }}>{error}</div>}
      <button type="submit" disabled={saving} style={{ padding: '11px 18px', border: 'none', borderRadius: 9, background: '#1E2F44', color: '#E7DFD2', fontWeight: 600, cursor: saving ? 'wait' : 'pointer' }}>{saving ? 'Saving...' : 'Save changes'}</button>
    </form>
  </div>
}

const labelStyle = { display: 'block', marginBottom: 18, color: '#506681', fontSize: 12, fontWeight: 600 }
const inputStyle = { display: 'block', width: '100%', boxSizing: 'border-box' as const, marginTop: 7, padding: '11px 12px', border: '1px solid #D8D0C4', borderRadius: 9, background: '#EDE8DF', color: '#2E2E2E', outline: 'none' }
