import { FormEvent, useState } from 'react'
import { loginAdmin } from '../../../shared/services/auth'
import type { User } from '../../../entities'

interface Props { onAuthenticated: (user: User) => void }

export default function AdminLogin({ onAuthenticated }: Props) {
  const [email, setEmail] = useState('admin@izli.tn')
  const [password, setPassword] = useState('11110000')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      onAuthenticated(await loginAdmin(email, password))
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Invalid admin credentials.')
    } finally {
      setLoading(false)
    }
  }

  return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#EDE8DF', padding: 24 }}>
    <form onSubmit={submit} style={{ width: 'min(420px, 100%)', padding: 36, background: '#F5F1EA', border: '1px solid #D8D0C4', borderRadius: 18, boxShadow: '0 20px 60px rgba(30,47,68,0.12)' }}>
      <div style={{ color: '#8C6B52', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>IZLI / ADMIN</div>
      <h1 style={{ margin: '0 0 8px', color: '#1E2F44', fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 500 }}>Welcome back</h1>
      <p style={{ margin: '0 0 26px', color: '#506681', fontSize: 13 }}>Sign in to manage the IZLI platform.</p>
      <label style={{ display: 'block', marginBottom: 16, color: '#506681', fontSize: 12, fontWeight: 600 }}>Email<input value={email} onChange={event => setEmail(event.target.value)} type="email" required style={inputStyle} /></label>
      <label style={{ display: 'block', marginBottom: 20, color: '#506681', fontSize: 12, fontWeight: 600 }}>Password<input value={password} onChange={event => setPassword(event.target.value)} type="password" required style={inputStyle} /></label>
      {error && <div style={{ marginBottom: 16, color: '#A06030', fontSize: 12 }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 16px', border: 'none', borderRadius: 10, background: '#1E2F44', color: '#E7DFD2', fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>{loading ? 'Signing in...' : 'Sign in'}</button>
    </form>
  </main>
}

const inputStyle = { display: 'block', width: '100%', boxSizing: 'border-box' as const, marginTop: 7, padding: '11px 12px', border: '1px solid #D8D0C4', borderRadius: 9, background: '#EDE8DF', color: '#2E2E2E', outline: 'none' }
