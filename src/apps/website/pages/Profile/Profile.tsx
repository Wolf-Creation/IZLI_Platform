import { useEffect, useState } from 'react'
import { BORDER, CLAY, SAGE, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../../../tokens'
import type { WebPage } from '../../types'
import { TopBarPage } from '../../components/TopBarPage/TopBarPage'
import { getKeeperProfile, hasStoredSession, updateKeeperProfile, updateKeeperSecurity, type KeeperProfile } from '../../../../shared/services/auth'
import './Profile.scss'

const INDIGO = '#F5F1EA'
const TEXT = '#F5F1EA'
const TEXT_SEC = '#C7C0B7'
const BG = '#000000'
const SURFACE = '#151515'
const SURFACE_2 = '#0D0D0D'
const CREAM = '#F5F1EA'
const SAND = '#A9A198'

interface Props { onNavigate: (p: WebPage) => void }

type ProfileTab = 'Overview' | 'Orders' | 'Contributions' | 'Challenges' | 'Settings'

const ORDERS = [
  { id: 'FR-2024-0681', date: '1 Jul 2026', total: '€290', items: ['Tifinagh Frame Tee (M)', 'Woven Sahara Overshirt (L)'], status: 'Delivered' },
  { id: 'FR-2024-0601', date: '14 May 2026', total: '€95', items: ['Atlas Symbol Boxy Tee (M)'], status: 'Delivered' },
  { id: 'FR-2024-0544', date: '3 Mar 2026', total: '€195', items: ['Washed Indigo Heritage Tee (M)'], status: 'Delivered' },
]

const CONTRIBUTIONS = [
  { id: 'CTR-0178', title: 'Azoul mark — 12 variations', challenge: 'Atlas Pattern Remix', status: 'Featured', img: 'photo-1516762689617-e1cffcef479d' },
  { id: 'CTR-0142', title: 'Stone script from Beni Mellal', challenge: 'Archive a Symbol', status: 'Approved', img: 'photo-1469334031218-e382a71b716b' },
  { id: 'CTR-0121', title: 'Geometric reinterpretation', challenge: 'Textile Heritage', status: 'Approved', img: 'photo-1523381210434-271e8be1f52b' },
]

const TABS: ProfileTab[] = ['Overview', 'Orders', 'Contributions', 'Challenges', 'Settings']

const formatDisplayName = (value: string) => value.trim().toLowerCase().replace(/(^|\s)\S/g, character => character.toUpperCase())

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Delivered: { bg: '#E6EDE8', color: '#4A7A5A' },
  Featured: { bg: SURFACE_2, color: CLAY },
  Approved: { bg: '#E8EDF3', color: INDIGO },
}

export default function Profile({ onNavigate }: Props) {
  const [tab, setTab] = useState<ProfileTab>('Overview')
  const [profile, setProfile] = useState<KeeperProfile | null>(null)
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', gender: '', phone: '', governorate: '', age: '' })
  const [profileMessage, setProfileMessage] = useState('')
  const [securityForm, setSecurityForm] = useState({ twoFactorEnabled: false, currentPassword: '', newPassword: '', confirmPassword: '' })
  const [securityMessage, setSecurityMessage] = useState('')

  useEffect(() => {
    if (!hasStoredSession()) {
      onNavigate('keeper-circle-login')
      return
    }

    getKeeperProfile().then(keeperProfile => {
      setProfile(keeperProfile)
      setProfileForm({
        firstName: keeperProfile.firstName,
        lastName: keeperProfile.lastName,
        gender: keeperProfile.gender ?? '',
        phone: keeperProfile.phone ?? '',
        governorate: keeperProfile.governorate ?? '',
        age: keeperProfile.age ? String(keeperProfile.age) : '',
      })
      setSecurityForm(current => ({ ...current, twoFactorEnabled: Boolean(keeperProfile.twoFactorEnabled) }))
    }).catch(error => {
      if (error instanceof Error && ['Unauthorized', 'Invalid token'].includes(error.message)) {
        localStorage.removeItem('izli.accessToken')
        localStorage.removeItem('izli.currentUser')
        onNavigate('keeper-circle-login')
        return
      }
      setProfileMessage('Unable to load your Keeper details.')
    })
  }, [onNavigate])

  const updateProfileField = (field: keyof typeof profileForm, value: string) => {
    setProfileForm(current => ({ ...current, [field]: value }))
  }

  const saveProfile = async () => {
    try {
      const updatedProfile = await updateKeeperProfile({
        firstName: profileForm.firstName.trim(),
        lastName: profileForm.lastName.trim(),
        gender: profileForm.gender || undefined,
        phone: profileForm.phone.trim() || undefined,
        governorate: profileForm.governorate.trim() || undefined,
        age: profileForm.age ? Number(profileForm.age) : undefined,
      })
      setProfile(updatedProfile)
      setProfileForm({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        gender: updatedProfile.gender ?? '',
        phone: updatedProfile.phone ?? '',
        governorate: updatedProfile.governorate ?? '',
        age: updatedProfile.age ? String(updatedProfile.age) : '',
      })
      setProfileMessage('Profile updated.')
    } catch {
      setProfileMessage('Unable to update your profile.')
    }
  }

  const saveTwoFactor = async () => {
    setSecurityMessage('')
    try {
      const updatedProfile = await updateKeeperSecurity({ twoFactorEnabled: securityForm.twoFactorEnabled })
      setProfile(updatedProfile)
      setSecurityMessage('Two-factor authentication updated.')
    } catch (error) {
      setSecurityMessage(error instanceof Error ? error.message : 'Unable to update two-factor authentication.')
    }
  }

  const changePassword = async () => {
    setSecurityMessage('')
    if (!securityForm.currentPassword || !securityForm.newPassword || securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityMessage('Enter your current password and matching new passwords.')
      return
    }
    if (securityForm.newPassword.length < 8) {
      setSecurityMessage('The new password must contain at least 8 characters.')
      return
    }
    try {
      await updateKeeperSecurity({ currentPassword: securityForm.currentPassword, newPassword: securityForm.newPassword })
      setSecurityForm(current => ({ ...current, currentPassword: '', newPassword: '', confirmPassword: '' }))
      setSecurityMessage('Password updated.')
    } catch (error) {
      setSecurityMessage(error instanceof Error ? error.message : 'Unable to update your password.')
    }
  }

  const displayName = profile ? formatDisplayName(`${profile.firstName} ${profile.lastName}`) : 'Keeper Profile'
  const initials = profile ? `${profile.firstName[0] ?? ''}${profile.lastName[0] ?? ''}`.toUpperCase() : 'KP'

  return (
    <div className="profile-page-shell">
      <TopBarPage
        className="top-bar-page--profile"
        leading={
          <div className="top-bar-page__profile-leading">
            <div className="top-bar-page__profile-avatar">{initials}</div>
            <div>
              <h1 className="top-bar-page__profile-name">{displayName}</h1>
              <div className="top-bar-page__profile-level">Level 5 · Heritage Keeper</div>
            </div>
          </div>
        }
        trailing={
          <div className="top-bar-page__profile-stats">
            {[
              { label: 'Contributions', value: '34' },
              { label: 'Challenges', value: '12' },
              { label: 'Orders', value: '6' },
            ].map(stat => (
              <div key={stat.label} className="top-bar-page__profile-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        }
      />
      <div className="profile-page" style={{ background: BG, minHeight: '100vh', marginTop: 0 }}>
      <div className="profile-tabs">
        <div className="profile-tabs__inner">
          <div className="profile-tabs__categories" role="tablist" aria-label="Profile sections">
            {TABS.map(t => (
              <button key={t} className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)} role="tab" aria-selected={tab === t}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 40px 80px' }}>
        {tab === 'Overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px 14px', background: SURFACE_2, borderBottom: `1px solid ${BORDER}` }}><div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO }}>Community Standing</div></div>
              <div style={{ padding: '20px 22px' }}>
                {[
                  { l: 'Level', v: '5 — Heritage Keeper' },
                  { l: 'Contributions', v: '34 total · 3 Featured' },
                  { l: 'Challenges', v: '12 participated' },
                  { l: 'Lab involvement', v: '2 active projects' },
                  { l: 'Member since', v: 'March 2024' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 4 ? `1px solid ${BORDER}` : 'none' }}><span style={{ fontSize: 13, color: TEXT_SEC }}>{r.l}</span><span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{r.v}</span></div>
                ))}
              </div>
            </div>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px 14px', background: SURFACE_2, borderBottom: `1px solid ${BORDER}` }}><div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO }}>Recent Activity</div></div>
              <div style={{ padding: '8px 22px 12px' }}>
                {[
                  { icon: '◫', label: 'Contribution featured', title: 'Azoul mark — 12 variations', time: '8 Jul', color: CLAY },
                  { icon: '◇', label: 'Challenge joined', title: 'Mountain Memory Atlas', time: '24 Jun', color: INDIGO },
                  { icon: '⬡', label: 'Order delivered', title: 'FR-2024-0681 · €290', time: '3 Jul', color: SAGE },
                  { icon: '⬠', label: 'Lab project joined', title: 'Community Symbol Archive', time: '15 May', color: '#4A7A5A' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '11px 0', borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: a.color, flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{a.title}</div><div style={{ fontSize: 11, color: TEXT_SEC }}>{a.label}</div></div>
                    <span style={{ fontSize: 11, color: SAND, flexShrink: 0 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === 'Orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ORDERS.map(o => { const s = STATUS_STYLE[o.status]; return (
              <div key={o.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}><span style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 600, color: INDIGO }}>#{o.id}</span><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: s.bg, color: s.color, fontWeight: 500 }}>{o.status}</span></div>
                  <div style={{ fontSize: 13, color: TEXT_SEC, marginBottom: 4 }}>{o.items.join(', ')}</div>
                  <div style={{ fontSize: 12, color: SAND }}>{o.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}><div style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 500, color: INDIGO }}>{o.total}</div><button style={{ marginTop: 8, fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: FONT_SANS }}>View receipt</button></div>
              </div>
            )})}
          </div>
        )}
        {tab === 'Contributions' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {CONTRIBUTIONS.map(c => { const s = STATUS_STYLE[c.status]; return (
              <div key={c.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}><img src={`https://images.unsplash.com/${c.img}?w=600&h=450&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontFamily: FONT_MONO, fontSize: 10, color: SAND }}>{c.id}</span><span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: s.bg, color: s.color, fontWeight: 500 }}>{c.status}</span></div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: INDIGO, fontWeight: 500 }}>◇ {c.challenge}</div>
                </div>
              </div>
            )})}
          </div>
        )}
        {tab === 'Challenges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Atlas Pattern Remix', status: 'Active', submissions: 1, close: '1 Aug 2026' },
              { name: 'Archive a Symbol from Your Region', status: 'Completed', submissions: 1, close: '31 Mar 2026' },
              { name: 'Textile Heritage Documentation', status: 'Completed', submissions: 1, close: '28 Feb 2026' },
            ].map((c, i) => (
              <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 4 }}>◇ {c.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{c.submissions} submission{c.submissions !== 1 ? 's' : ''} · {c.status === 'Active' ? `Closes ${c.close}` : `Closed ${c.close}`}</div></div>
                <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: c.status === 'Active' ? '#E8EDF3' : SURFACE_2, color: c.status === 'Active' ? INDIGO : TEXT_SEC, fontWeight: 500 }}>{c.status}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'Settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, maxWidth: 600 }}>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '16px 22px', background: SURFACE_2, borderBottom: `1px solid ${BORDER}` }}><div style={{ fontFamily: FONT_SERIF, fontSize: 16, fontWeight: 500, color: INDIGO }}>Keeper details</div></div>
              <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  ['firstName', 'First name'], ['lastName', 'Last name'], ['email', 'Email'],
                  ['phone', 'Phone'], ['governorate', 'Governorate'], ['age', 'Age'],
                ].map(([field, label]) => (
                  <div key={field}><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.03em' }}>{label}</label><input value={field === 'email' ? profile?.email ?? '' : profileForm[field as keyof typeof profileForm]} onChange={event => field !== 'email' && updateProfileField(field as keyof typeof profileForm, event.target.value)} type={field === 'age' ? 'number' : field === 'email' ? 'email' : 'text'} readOnly={field === 'email'} style={{ width: '100%', padding: '9px 12px', background: BG, border: `1px solid ${BORDER}`, borderRadius: 9, fontSize: 13, color: TEXT, fontFamily: FONT_SANS, outline: 'none', boxSizing: 'border-box' }} /></div>
                ))}
                <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.03em' }}>Gender</label><select value={profileForm.gender} onChange={event => updateProfileField('gender', event.target.value)} style={{ width: '100%', padding: '9px 12px', background: BG, border: `1px solid ${BORDER}`, borderRadius: 9, fontSize: 13, color: TEXT, fontFamily: FONT_SANS, outline: 'none', boxSizing: 'border-box' }}><option value="">Select</option><option value="female">Female</option><option value="male">Male</option><option value="non-binary">Non-binary</option><option value="prefer-not-to-say">Prefer not to say</option></select></div>
                {profileMessage && <div style={{ fontSize: 12, color: TEXT_SEC }}>{profileMessage}</div>}
                <button onClick={saveProfile} style={{ alignSelf: 'flex-end', padding: '8px 18px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>Save Changes</button>
              </div>
            </div>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '16px 22px', background: SURFACE_2, borderBottom: `1px solid ${BORDER}` }}><div style={{ fontFamily: FONT_SERIF, fontSize: 16, fontWeight: 500, color: INDIGO }}>Security</div></div>
              <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, color: TEXT, fontSize: 13, cursor: 'pointer' }}>
                  <span><strong style={{ display: 'block', marginBottom: 4 }}>Two-factor authentication</strong><span style={{ color: TEXT_SEC, fontSize: 12 }}>Receive a verification code by email when signing in.</span></span>
                  <input type="checkbox" checked={securityForm.twoFactorEnabled} onChange={event => setSecurityForm(current => ({ ...current, twoFactorEnabled: event.target.checked }))} style={{ width: 18, height: 18, accentColor: CLAY, flexShrink: 0 }} />
                </label>
                <button onClick={saveTwoFactor} style={{ alignSelf: 'flex-end', padding: '8px 18px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>Save 2FA</button>
                <div style={{ height: 1, background: BORDER }} />
                <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Change password</div>
                {[
                  ['currentPassword', 'Current password'], ['newPassword', 'New password'], ['confirmPassword', 'Confirm new password'],
                ].map(([field, label]) => (
                  <div key={field}><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.03em' }}>{label}</label><input type="password" value={securityForm[field as keyof typeof securityForm] as string} onChange={event => setSecurityForm(current => ({ ...current, [field]: event.target.value }))} autoComplete={field === 'currentPassword' ? 'current-password' : 'new-password'} style={{ width: '100%', padding: '9px 12px', background: BG, border: `1px solid ${BORDER}`, borderRadius: 9, fontSize: 13, color: TEXT, fontFamily: FONT_SANS, outline: 'none', boxSizing: 'border-box' }} /></div>
                ))}
                {securityMessage && <div style={{ fontSize: 12, color: TEXT_SEC }}>{securityMessage}</div>}
                <button onClick={changePassword} style={{ alignSelf: 'flex-end', padding: '8px 18px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>Change password</button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}