import { useState } from 'react'
import { INDIGO, TEXT, TEXT_SEC, BORDER, BG, SURFACE, SURFACE_2, CREAM, FONT_SERIF, FONT_SANS } from '../../../tokens'
import type { WebPage } from '../types'
import type { User } from '../../entities'
import { useAuthentication } from '../../../shared/hooks/useAuthentication'
import izliLogo from '../../../assets/logo/IZLI_logo.svg'
import './Login.scss'

interface Props {
  onNavigate: (p: WebPage) => void
  onAuthenticated: (user: User) => void
}

export default function Login({ onNavigate, onAuthenticated }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [fullName, setFullName] = useState('Youcef Benali')
  const [email, setEmail] = useState('you@example.com')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, register } = useAuthentication()

  const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    background: BG, border: `1px solid ${BORDER}`,
    borderRadius: 10, fontSize: 14, color: TEXT,
    fontFamily: FONT_SANS, boxSizing: 'border-box', outline: 'none',
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&h=1100&fit=crop&auto=format" alt="IZLI" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 40%, rgba(237,232,223,0.15))' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 40 }}>
          <div style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: CREAM, lineHeight: 1.2, maxWidth: 300 }}>Heritage belongs to everyone.</div>
          <div style={{ fontSize: 13, color: 'rgba(231,223,210,0.7)', marginTop: 10 }}>Join the IZLI community.</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 40 }}>
            <img src={izliLogo} alt="IZLI" style={{ width: 72, height: 'auto', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', gap: 0, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 4, marginBottom: 32 }}>
            {(['login', 'register'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '9px', borderRadius: 9, border: 'none', background: mode === m ? INDIGO : 'transparent', color: mode === m ? CREAM : TEXT_SEC, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>
                {m === 'login' ? 'Sign In' : 'Join'}
              </button>
            ))}
          </div>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 8 }}>{mode === 'login' ? 'Welcome back.' : 'Join the community.'}</h2>
          <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.6, margin: 0, marginBottom: 28 }}>{mode === 'login' ? 'Sign in to access your orders, contributions, and community profile.' : 'Create an account to submit contributions, participate in challenges, and explore the Community Lab.'}</p>
          <form onSubmit={async e => {
            e.preventDefault()
            setSubmitting(true)
            try {
              if (mode === 'login') {
                const user = await login(email, password)
                if (user.role === 'admin') {
                  onAuthenticated(user)
                } else {
                  onNavigate('profile')
                }
                return
              }
              await register(email, password, fullName)
              onNavigate('profile')
            } finally {
              setSubmitting(false)
            }
          }}>
            {mode === 'register' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.02em' }}>Full Name</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)} style={inp} type="text" placeholder="Youcef Benali" />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.02em' }}>Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} style={inp} type="email" placeholder="you@example.com" />
            </div>
            <div style={{ marginBottom: mode === 'login' ? 8 : 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.02em' }}>Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} style={inp} type="password" placeholder="••••••••" />
            </div>
            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <button type="button" style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: FONT_SANS }}>Forgot password?</button>
              </div>
            )}
            {mode === 'register' && (
              <div style={{ marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <input type="checkbox" id="terms" style={{ marginTop: 2, flexShrink: 0, accentColor: INDIGO }} />
                <label htmlFor="terms" style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.5, cursor: 'pointer' }}>I agree to the Terms of Service and understand that my contributions may be used in IZLI research and products.</label>
              </div>
            )}
            <button type="submit" disabled={submitting} style={{ width: '100%', padding: '13px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 11, fontSize: 14, fontWeight: 600, cursor: submitting ? 'wait' : 'pointer', fontFamily: FONT_SANS, marginBottom: 16, opacity: submitting ? 0.8 : 1 }}>{submitting ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}</button>
          </form>
          <div style={{ textAlign: 'center', fontSize: 13, color: TEXT_SEC }}>
            {mode === 'login' ? 'New to IZLI? ' : 'Already a member? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ color: INDIGO, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, textDecoration: 'underline', fontFamily: FONT_SANS }}>{mode === 'login' ? 'Join the community →' : 'Sign in →'}</button>
          </div>
          {mode === 'register' && (
            <div style={{ marginTop: 32, padding: '20px', background: SURFACE_2, borderRadius: 14, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: INDIGO, marginBottom: 10 }}>Community members get</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {['◇ Participate in creative challenges', '◫ Submit contributions to the Lab', '◈ Build your community portfolio', '⬡ Early access to new collections'].map(p => (
                  <div key={p} style={{ fontSize: 12, color: TEXT_SEC }}>{p}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}