import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

const TABS = ['Overview', 'Activity', 'Contributions', 'Stories', 'Challenges', 'Lab', 'Commerce', 'Moderation']

function TimelineRow({ time, action, entity, type }: { time: string; action: string; entity: string; type: string }) {
  const icons: Record<string, string> = { contribution: '◈', story: '◫', challenge: '◇', lab: '⬠', order: '⬡', community: '◯' }
  return (
    <div style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ width: 28, height: 28, borderRadius: 999, background: '#EDE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: TEXT_SEC, flexShrink: 0 }}>
        {icons[type] ?? '·'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: TEXT }}>{action} <strong style={{ color: INDIGO }}>{entity}</strong></div>
        <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 1 }}>{time}</div>
      </div>
      <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC, alignSelf: 'flex-start', marginTop: 4 }}>{type}</span>
    </div>
  )
}

function RelationCard({ icon, type, title, sub, bg }: { icon: string; type: string; title: string; sub: string; bg: string }) {
  return (
    <div style={{ padding: '12px 14px', background: bg, border: `1px solid ${BORDER}`, borderRadius: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: '#EDE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{type}</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginTop: 1 }}>{title}</div>
        <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  )
}

export default function MemberProfile({ onNavigate }: Props) {
  const [tab, setTab] = useState('Overview')

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 72, height: 72, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#E7DFD2' }}>YB</div>
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: 18, height: 18, borderRadius: 999, background: '#E6EDE8', border: '2px solid #F5F1EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#4A7A5A', fontWeight: 700 }}>●</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 500, color: INDIGO }}>Youcef Benali</div>
            <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 2 }}>@youcef.benali · Member since January 2024</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#E7DFD2' }}>4</div>
              <span style={{ fontSize: 12, color: TEXT_SEC }}>Level 4 Contributor</span>
              <span style={{ width: 1, height: 14, background: BORDER }} />
              {['◈', '◇', '⬡'].map((b, i) => (
                <span key={i} style={{ fontSize: 16, color: CLAY }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('members')} style={{ padding: '8px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Back</button>
          <button style={{ padding: '8px 14px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Edit</button>
          <button style={{ padding: '8px 14px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Message</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 28, borderBottom: `1px solid ${BORDER}` }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: '9px 16px', fontSize: 13, fontWeight: t === tab ? 500 : 400,
              color: t === tab ? INDIGO : TEXT_SEC,
              background: 'transparent', border: 'none', borderBottom: `2px solid ${t === tab ? INDIGO : 'transparent'}`,
              cursor: 'pointer', marginBottom: -1, fontFamily: 'Inter, sans-serif', transition: 'all 0.12s',
            }}
          >{t}</button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div>
            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { label: 'Contributions', value: '22', accent: INDIGO },
                { label: 'Challenge Entries', value: '5', accent: CLAY },
                { label: 'Reads Earned', value: '14K', accent: SAGE },
                { label: 'Orders', value: '3', accent: TEXT_SEC },
              ].map((k, i) => (
                <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{k.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 500, color: k.accent, fontFamily: "'Playfair Display', serif" }}>{k.value}</div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Bio</div>
              <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.7 }}>
                Textile researcher and visual artist based in Algiers. Interested in the intersection of Amazigh craft traditions and contemporary design systems. Contributing to IZLI since the beginning.
              </div>
            </div>

            {/* Relationship map */}
            <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO, marginBottom: 16 }}>Relationship to IZLI</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <RelationCard icon="◈" type="Latest Contribution" title="Atlas geometry in motion" sub="Video · Pending Review" bg="#EDE8DF" />
                <RelationCard icon="◫" type="Published Story" title="From Contribution to Capsule" sub="Community · 1.2K reads" bg="#F3EDE8" />
                <RelationCard icon="◇" type="Active Challenge" title="Atlas Pattern Remix" sub="67 entries · Active" bg="#EFE8DD" />
                <RelationCard icon="⬠" type="Lab Project" title="Tifinagh Pattern System" sub="In progress · 4 participants" bg="#E8EDF3" />
                <RelationCard icon="⬡" type="Commerce" title="3 orders · €300 lifetime spend" sub="Last order: 9 Jul 2026" bg="#EDE8DF" />
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO, marginBottom: 16 }}>Recent Activity</div>
              <TimelineRow time="6 Jul 2026" action="Submitted contribution to" entity="Atlas Pattern Remix" type="contribution" />
              <TimelineRow time="28 Jun 2026" action="Story published:" entity="From Contribution to Capsule" type="story" />
              <TimelineRow time="14 Jun 2026" action="Joined lab project:" entity="Tifinagh Pattern System" type="lab" />
              <TimelineRow time="2 Jun 2026" action="Placed order" entity="#ORD-2792" type="order" />
              <TimelineRow time="20 May 2026" action="Submitted to" entity="Indigo Dye Archive challenge" type="challenge" />
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Quick Actions</div>
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['View public profile', 'Send message', 'Adjust level', 'Add badge', 'Suspend account'].map((a, i) => (
                  <button key={i} style={{ padding: '8px 12px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 9, fontSize: 12, color: i === 4 ? '#C0392B' : TEXT_SEC, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>{a}</button>
                ))}
              </div>
            </div>

            <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Account Info</div>
              {[{ l: 'Email', v: 'youcef.benali@gmail.com' }, { l: 'Location', v: 'Algiers, Algeria' }, { l: 'Language', v: 'Arabic / French' }, { l: 'Commerce account', v: 'Linked' }].map((r, i) => (
                <div key={i} style={{ marginBottom: 9 }}>
                  <div style={{ fontSize: 11, color: TEXT_SEC }}>{r.l}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{r.v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: INDIGO, borderRadius: 16, padding: '16px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(231,223,210,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Community Standing</div>
              {[{ l: 'Level', v: '4 — Senior Contributor' }, { l: 'Total XP', v: '2,840 pts' }, { l: 'Rank', v: '#12 overall' }].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
                  <span style={{ fontSize: 12, color: 'rgba(231,223,210,0.6)' }}>{s.l}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#E7DFD2' }}>{s.v}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Admin Notes</div>
              <textarea style={{ width: '100%', padding: '9px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'none', height: 72 }}
                defaultValue="Key contributor — textile research background. Consider for Lab editorial partnerships." />
              <button style={{ marginTop: 8, fontSize: 12, color: '#E7DFD2', background: INDIGO, border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {tab !== 'Overview' && (
        <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>
            {tab === 'Contributions' ? '◈' : tab === 'Stories' ? '◫' : tab === 'Challenges' ? '◇' : tab === 'Lab' ? '⬠' : tab === 'Commerce' ? '⬡' : tab === 'Moderation' ? '▦' : '◯'}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: INDIGO, marginBottom: 8 }}>{tab}</div>
          <div style={{ fontSize: 13, color: TEXT_SEC }}>Content for the {tab} tab — same design system, scoped data.</div>
        </div>
      )}
    </div>
  )
}
