import { FormEvent, useEffect, useState } from 'react'
import type { WebPage } from '../../types'
import { api } from '../../../../shared/services/api'
import './KeeperCircleAccess.scss'

interface Props {
  onNavigate: (page: WebPage) => void
  onVerified: () => void
}

type Mode = 'login' | 'register' | 'verify' | 'forgot-request' | 'forgot-reset'

const initialForm = { firstName: '', lastName: '', gender: '', phone: '', email: '', password: '', passwordConfirm: '', governorate: '', age: '' }
const TUNISIAN_GOVERNORATES = ['Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan']

export default function KeeperCircleAccess({ onNavigate, onVerified }: Props) {
  const [mode, setMode] = useState<Mode>('login')
  const [form, setForm] = useState(initialForm)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const update = (field: keyof typeof initialForm, value: string) => setForm(current => ({ ...current, [field]: value }))
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    try {
      if (mode === 'login') {
        const result = await api.post<{ user: { id: string; email: string; displayName: string }; accessToken: string }>('/auth/keeper/login', { email: form.email, password: form.password })
        localStorage.setItem('izli.currentUser', JSON.stringify(result.user))
        localStorage.setItem('izli.accessToken', result.accessToken)
        onVerified()
        onNavigate('profile')
      } else if (mode === 'register') {
        const result = await api.post<{ email: string; devCode?: string }>('/auth/keeper/register', { ...form, age: Number(form.age) })
        setMode('verify')
        setMessage(result.devCode ? `Code de test: ${result.devCode}` : `Un code de verification a ete envoye a ${form.email}.`)
      } else {
        if (mode === 'verify') {
          const result = await api.post<{ user: { id: string; email: string; displayName: string }; accessToken: string }>('/auth/keeper/verify', { email: form.email, code })
          localStorage.setItem('izli.currentUser', JSON.stringify(result.user))
          localStorage.setItem('izli.accessToken', result.accessToken)
          onVerified()
          onNavigate('profile')
        } else if (mode === 'forgot-request') {
          const result = await api.post<{ email: string; devCode?: string }>('/auth/keeper/forgot-password', { email: form.email })
          setMode('forgot-reset')
          setMessage(result.devCode ? `Code de test: ${result.devCode}` : `Un code de recuperation a ete envoye a ${form.email}.`)
        } else {
          if (form.password !== form.passwordConfirm) {
            setError('Les deux mots de passe doivent etre identiques.')
            return
          }
          await api.post('/auth/keeper/reset-password', { email: form.email, code, password: form.password })
          setMode('login')
          setCode('')
          setForm(current => ({ ...current, password: '', passwordConfirm: '' }))
          setMessage('Mot de passe mis a jour. Vous pouvez vous connecter.')
        }
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    ['firstName', 'First name', 'text'], ['lastName', 'Last name', 'text'], ['phone', 'Phone number', 'tel'],
    ['email', 'Email address', 'email'], ['password', 'Password', 'password'], ['governorate', 'Governorate', 'text'], ['age', 'Age', 'number'],
  ] as const

  const renderPasswordField = (field: 'password' | 'passwordConfirm' = 'password', label = 'Password') => (
    <label className="keeper-access__password-field">
      <span>{label}</span>
      <div>
        <input value={form[field]} onChange={event => update(field, event.target.value)} type={showPassword ? 'text' : 'password'} required />
        <button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? '◉' : '◌'}</button>
      </div>
    </label>
  )

  const isForgotMode = mode === 'forgot-request' || mode === 'forgot-reset'

  return (
    <main className="keeper-access">
      <div className="keeper-access__panel">
        <div className="keeper-access__eyebrow">IZLI / KEEPER CIRCLE</div>
        <h1>{mode === 'verify' ? 'Verify your Keeper account.' : mode === 'register' ? 'Enter the Circle.' : mode === 'forgot-request' ? 'Recover your Keeper account.' : mode === 'forgot-reset' ? 'Create a new password.' : 'Welcome back, Keeper.'}</h1>
        <p>{mode === 'verify' ? 'Confirm the code sent to your email to activate your profile.' : isForgotMode ? 'We will send a recovery code to your Keeper email address.' : 'The Keeper Circle is a private space for IZLI members.'}</p>

        {!isForgotMode && <div className="keeper-access__tabs">
          <button className={mode === 'login' ? 'is-active' : ''} onClick={() => setMode('login')}>Sign in</button>
          <button className={mode === 'register' ? 'is-active' : ''} onClick={() => setMode('register')}>Create account</button>
        </div>}

        {error && <div className="keeper-access__message keeper-access__message--error">{error}</div>}
        {message && <div className="keeper-access__message">{message}</div>}

        <form onSubmit={submit}>
          {mode === 'verify' ? (
            <label><span>Verification code</span><input value={code} onChange={event => setCode(event.target.value)} inputMode="numeric" maxLength={6} placeholder="000000" required /></label>
          ) : mode === 'forgot-request' ? (
            <label><span>Email address</span><input value={form.email} onChange={event => update('email', event.target.value)} type="email" required /></label>
          ) : mode === 'forgot-reset' ? (
            <>
              <label><span>Recovery code</span><input value={code} onChange={event => setCode(event.target.value)} inputMode="numeric" maxLength={6} placeholder="000000" required /></label>
              {renderPasswordField('password', 'New password')}
              {renderPasswordField('passwordConfirm', 'Confirm new password')}
            </>
          ) : mode === 'login' ? (
            <><label><span>Email address</span><input value={form.email} onChange={event => update('email', event.target.value)} type="email" required /></label>{renderPasswordField()}</>
          ) : (
            <div className="keeper-access__grid">
              {fields.filter(([field]) => field !== 'password' && field !== 'governorate').map(([field, label, type]) => <label key={field}><span>{label}</span><input value={form[field]} onChange={event => update(field, event.target.value)} type={type} min={field === 'age' ? 13 : undefined} required /></label>)}
              <label><span>Governorate</span><select value={form.governorate} onChange={event => update('governorate', event.target.value)} required><option value="">Select governorate</option>{TUNISIAN_GOVERNORATES.map(governorate => <option key={governorate}>{governorate}</option>)}</select></label>
              <label><span>Gender</span><select value={form.gender} onChange={event => update('gender', event.target.value)} required><option value="">Select</option><option value="female">Female</option><option value="male">Male</option><option value="non-binary">Non-binary</option><option value="prefer-not-to-say">Prefer not to say</option></select></label>
              {renderPasswordField()}
            </div>
          )}
          <button className="keeper-access__submit" disabled={loading}>{loading ? 'Please wait...' : mode === 'verify' ? 'Verify and continue' : mode === 'register' ? 'Create Keeper account' : mode === 'forgot-request' ? 'Send recovery code' : mode === 'forgot-reset' ? 'Update password' : 'Enter Keeper Circle'}</button>
        </form>
        {mode === 'login' && <button type="button" className="keeper-access__forgot" onClick={() => { setMode('forgot-request'); setError(''); setMessage('') }}>Forgot password?</button>}
        {isForgotMode && <button type="button" className="keeper-access__back" onClick={() => { setMode('login'); setError(''); setMessage('') }}>Back to sign in</button>}
        <button className="keeper-access__back" onClick={() => onNavigate('home')}>Back to IZLI home</button>
      </div>
    </main>
  )
}
