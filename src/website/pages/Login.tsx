import { useState } from 'react'
import { INDIGO, TEXT, TEXT_SEC, BORDER, BG, SURFACE, SURFACE_2, CREAM, FONT_SERIF, FONT_SANS } from '../../tokens'
import type { WebPage } from '../types'

interface Props { onNavigate: (p: WebPage) => void }

export default function Login({ onNavigate }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    background: BG, border: `1px solid ${BORDER}`,
    borderRadius: 10, fontSize: 14, color: TEXT,
    fontFamily: FONT_SANS, boxSizing: 'border-box', outline: 'none',
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left — editorial visual */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&h=1100&fit=crop&auto=format"
          alt="IZLI"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 40%, rgba(237,232,223,0.15))' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 40 }}>
          <div style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: CREAM, lineHeight: 1.2, maxWidth: 300 }}>
            Heritage belongs to everyone.
          </div>
          <div style={{ fontSize: 13, color: 'rgba(231,223,210,0.7)', marginTop: 10 }}>Join the IZLI community.</div>
        </div>
      </div>

      {/* Right — form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 40 }}>
            <div style={{ width: 32, height: 32, background: INDIGO, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: CREAM, fontSize: 14, fontFamily: FONT_SERIF, fontWeight: 600 }}>I</span>
            </div>
            <span style={{ fontFamily: FONT_SERIF, fontWeight: 600, fontSize: 18, color: INDIGO }}>IZLI</span>
          </div>

          {/* Mode toggle */}
          <div style={{ display: 'flex', gap: 0, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 4, marginBottom: 32 }}>
            {(['login', 'register'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '9px', borderRadius: 9, border: 'none', background: mode === m ? INDIGO : 'transparent', color: mode === m ? CREAM : TEXT_SEC, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>
                {m === 'login' ? 'Sign In' : 'Join'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 8 }}>
            {mode === 'login' ? 'Welcome back.' : 'Join the community.'}
          </h2>
          <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.6, margin: 0, marginBottom: 28 }}>
            {mode === 'login'
              ? 'Sign in to access your orders, contributions, and community profile.'
              : 'Create an account to submit contributions, participate in challenges, and explore the Community Lab.'}
          </p>

          {/* Form */}
          <form onSubmit={e => { e.preventDefault(); onNavigate('profile') }}>
            {mode === 'register' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.02em' }}>Full Name</label>
                <input style={inp} type="text" placeholder="Youcef Benali" />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.02em' }}>Email Address</label>
              <input style={inp} type="email" placeholder="you@example.com" />
            </div>
            <div style={{ marginBottom: mode === 'login' ? 8 : 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.02em' }}>Password</label>
              <input style={inp} type="password" placeholder="••••••••" />
            </div>
            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <button type="button" style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: FONT_SANS }}>
                  Forgot password?
                </button>
              </div>
            )}
            {mode === 'register' && (
              <div style={{ marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <input type="checkbox" id="terms" style={{ marginTop: 2, flexShrink: 0, accentColor: INDIGO }} />
                <label htmlFor="terms" style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.5, cursor: 'pointer' }}>
                  I agree to the Terms of Service and understand that my contributions may be used in IZLI research and products.
                </label>
              </div>
            )}
            <button type="submit" style={{ width: '100%', padding: '13px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 11, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: FONT_SANS, marginBottom: 16 }}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle mode */}
          <div style={{ textAlign: 'center', fontSize: 13, color: TEXT_SEC }}>
            {mode === 'login' ? "New to IZLI? " : "Already a member? "}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ color: INDIGO, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, textDecoration: 'underline', fontFamily: FONT_SANS }}>
              {mode === 'login' ? 'Join the community →' : 'Sign in →'}
            </button>
          </div>

          {/* Community perks */}
          {mode === 'register' && (
            <div style={{ marginTop: 32, padding: '20px', background: SURFACE_2, borderRadius: 14, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: INDIGO, marginBottom: 10 }}>Community members get</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  '◇ Participate in creative challenges',
                  '◫ Submit contributions to the Lab',
                  '◈ Build your community portfolio',
                  '⬡ Early access to new collections',
                ].map(p => (
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
