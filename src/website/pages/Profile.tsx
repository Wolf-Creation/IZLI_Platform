import { useState } from 'react'
import { INDIGO, TEXT, TEXT_SEC, BORDER, CLAY, SAGE, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../tokens'
import type { WebPage } from '../types'

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

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'Delivered': { bg: '#E6EDE8', color: '#4A7A5A' },
  'Featured': { bg: SURFACE_2, color: CLAY },
  'Approved': { bg: '#E8EDF3', color: INDIGO },
}

export default function Profile({ onNavigate: _onNavigate }: Props) {
  const [tab, setTab] = useState<ProfileTab>('Overview')

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      {/* Profile header */}
      <div style={{ background: INDIGO, padding: '48px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: 'rgba(231,223,210,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: CREAM, fontFamily: FONT_SERIF, flexShrink: 0, border: '2px solid rgba(231,223,210,0.25)' }}>YB</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: CREAM, margin: 0, marginBottom: 4 }}>Youcef Benali</h1>
            <div style={{ fontSize: 13, color: 'rgba(231,223,210,0.6)', marginBottom: 10 }}>youcef.benali@mail.com · Algiers, DZ</div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 26, height: 26, borderRadius: 999, background: CLAY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: CREAM }}>5</div>
              <span style={{ fontSize: 13, color: 'rgba(231,223,210,0.6)' }}>Level 5 · ◈ ◇ ⬡ ◫ ⬠</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'rgba(231,223,210,0.4)', marginLeft: 8 }}>MBR-0041</span>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { label: 'Contributions', value: '34' },
              { label: 'Challenges', value: '12' },
              { label: 'Orders', value: '6' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 28, fontWeight: 500, color: CREAM }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(231,223,210,0.45)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', gap: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '14px 20px', fontSize: 13, fontWeight: tab === t ? 500 : 400, color: tab === t ? INDIGO : TEXT_SEC, background: 'transparent', border: 'none', borderBottom: tab === t ? `2px solid ${INDIGO}` : '2px solid transparent', cursor: 'pointer', fontFamily: FONT_SANS, marginBottom: -1 }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 40px 80px' }}>

        {/* ── Overview ─────────────────────────────────────────────── */}
        {tab === 'Overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Community Standing */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px 14px', background: SURFACE_2, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO }}>Community Standing</div>
              </div>
              <div style={{ padding: '20px 22px' }}>
                {[
                  { l: 'Level', v: '5 — Heritage Keeper' },
                  { l: 'Contributions', v: '34 total · 3 Featured' },
                  { l: 'Challenges', v: '12 participated' },
                  { l: 'Lab involvement', v: '2 active projects' },
                  { l: 'Member since', v: 'March 2024' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 4 ? `1px solid ${BORDER}` : 'none' }}>
                    <span style={{ fontSize: 13, color: TEXT_SEC }}>{r.l}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px 14px', background: SURFACE_2, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO }}>Recent Activity</div>
              </div>
              <div style={{ padding: '8px 22px 12px' }}>
                {[
                  { icon: '◫', label: 'Contribution featured', title: 'Azoul mark — 12 variations', time: '8 Jul', color: CLAY },
                  { icon: '◇', label: 'Challenge joined', title: 'Mountain Memory Atlas', time: '24 Jun', color: INDIGO },
                  { icon: '⬡', label: 'Order delivered', title: 'FR-2024-0681 · €290', time: '3 Jul', color: SAGE },
                  { icon: '⬠', label: 'Lab project joined', title: 'Community Symbol Archive', time: '15 May', color: '#4A7A5A' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '11px 0', borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: a.color, flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{a.title}</div>
                      <div style={{ fontSize: 11, color: TEXT_SEC }}>{a.label}</div>
                    </div>
                    <span style={{ fontSize: 11, color: SAND, flexShrink: 0 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Orders ───────────────────────────────────────────────── */}
        {tab === 'Orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ORDERS.map(o => {
              const s = STATUS_STYLE[o.status]
              return (
                <div key={o.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 600, color: INDIGO }}>#{o.id}</span>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: s.bg, color: s.color, fontWeight: 500 }}>{o.status}</span>
                    </div>
                    <div style={{ fontSize: 13, color: TEXT_SEC, marginBottom: 4 }}>{o.items.join(', ')}</div>
                    <div style={{ fontSize: 12, color: SAND }}>{o.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 500, color: INDIGO }}>{o.total}</div>
                    <button style={{ marginTop: 8, fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: FONT_SANS }}>View receipt</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Contributions ─────────────────────────────────────────── */}
        {tab === 'Contributions' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {CONTRIBUTIONS.map(c => {
              const s = STATUS_STYLE[c.status]
              return (
                <div key={c.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img src={`https://images.unsplash.com/${c.img}?w=600&h=450&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: SAND }}>{c.id}</span>
                      <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: s.bg, color: s.color, fontWeight: 500 }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: INDIGO, fontWeight: 500 }}>◇ {c.challenge}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Challenges ───────────────────────────────────────────── */}
        {tab === 'Challenges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Atlas Pattern Remix', status: 'Active', submissions: 1, close: '1 Aug 2026' },
              { name: 'Archive a Symbol from Your Region', status: 'Completed', submissions: 1, close: '31 Mar 2026' },
              { name: 'Textile Heritage Documentation', status: 'Completed', submissions: 1, close: '28 Feb 2026' },
            ].map((c, i) => (
              <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 4 }}>◇ {c.name}</div>
                  <div style={{ fontSize: 12, color: TEXT_SEC }}>{c.submissions} submission{c.submissions !== 1 ? 's' : ''} · {c.status === 'Active' ? `Closes ${c.close}` : `Closed ${c.close}`}</div>
                </div>
                <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: c.status === 'Active' ? '#E8EDF3' : SURFACE_2, color: c.status === 'Active' ? INDIGO : TEXT_SEC, fontWeight: 500 }}>{c.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Settings ─────────────────────────────────────────────── */}
        {tab === 'Settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, maxWidth: 600 }}>
            {[
              { label: 'Profile', fields: [{ l: 'Full Name', v: 'Youcef Benali' }, { l: 'Email', v: 'youcef.benali@mail.com' }, { l: 'Location', v: 'Algiers, Algeria' }] },
              { label: 'Preferences', fields: [{ l: 'Newsletter', v: 'Subscribed' }, { l: 'Language', v: 'English' }] },
            ].map(section => (
              <div key={section.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ padding: '16px 22px', background: SURFACE_2, borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 16, fontWeight: 500, color: INDIGO }}>{section.label}</div>
                </div>
                <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {section.fields.map(f => (
                    <div key={f.l}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.03em' }}>{f.l}</label>
                      <input style={{ width: '100%', padding: '9px 12px', background: BG, border: `1px solid ${BORDER}`, borderRadius: 9, fontSize: 13, color: TEXT, fontFamily: FONT_SANS, outline: 'none', boxSizing: 'border-box' }} defaultValue={f.v} />
                    </div>
                  ))}
                  <button style={{ alignSelf: 'flex-end', padding: '8px 18px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>Save Changes</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
