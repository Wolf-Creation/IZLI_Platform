import type { Screen } from '../types'
import { useState } from 'react'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 12px', background: '#EDE8DF', border: `1px solid ${BORDER}`,
  borderRadius: 10, fontSize: 13, color: TEXT, fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', outline: 'none',
}

const SECTIONS = ['Brand', 'Site', 'Commerce', 'Community', 'Challenges', 'Notifications', 'Integrations', 'SEO Defaults'] as const
type SectionKey = typeof SECTIONS[number]

function Toggle({ checked }: { checked: boolean }) {
  return (
    <div style={{ width: 40, height: 22, borderRadius: 999, background: checked ? INDIGO : '#D8D0C4', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
      <div style={{ width: 16, height: 16, borderRadius: 999, background: '#F5F1EA', position: 'absolute', top: 3, left: checked ? 21 : 3, transition: 'left 0.2s' }} />
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, letterSpacing: '0.02em' }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 5 }}>{hint}</div>}
    </div>
  )
}

function SectionCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>{title}</div>
        {desc && <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{ padding: '20px 24px' }}>{children}</div>
    </div>
  )
}

function ToggleRow({ label, hint, checked }: { label: string; hint?: string; checked: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ flex: 1, marginRight: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{label}</div>
        {hint && <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>{hint}</div>}
      </div>
      <Toggle checked={checked} />
    </div>
  )
}

const CONTENT: Record<SectionKey, React.ReactNode> = {
  'Brand': (
    <>
      <Field label="Brand Name"><input style={inp} defaultValue="IZLI" /></Field>
      <Field label="Tagline"><input style={inp} defaultValue="Contemporary menswear. Amazigh heritage." /></Field>
      <Field label="Primary Language">
        <select style={inp}><option>English (EN)</option><option>French (FR)</option><option>Arabic (AR)</option></select>
      </Field>
      <Field label="Brand Logo" hint="Recommended: SVG or PNG at 2× resolution">
        <div style={{ padding: '20px 16px', background: '#EDE8DF', border: `2px dashed ${BORDER}`, borderRadius: 10, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: 12, color: TEXT_SEC }}>Drop logo file or click to upload</div>
        </div>
      </Field>
      <Field label="Brand Colors">
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ label: 'Primary', color: '#1E2F44' }, { label: 'Accent', color: '#8C6B52' }, { label: 'Background', color: '#EDE8DF' }].map(c => (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, background: c.color, border: `1px solid ${BORDER}` }} />
              <span style={{ fontSize: 12, color: TEXT_SEC }}>{c.label}</span>
            </div>
          ))}
        </div>
      </Field>
    </>
  ),
  'Site': (
    <>
      <Field label="Site URL"><input style={inp} defaultValue="https://izli.co" /></Field>
      <Field label="Admin Domain"><input style={inp} defaultValue="https://admin.izli.co" /></Field>
      <ToggleRow label="Maintenance Mode" hint="Temporarily take the site offline for all visitors" checked={false} />
      <ToggleRow label="Community Lab Page" hint="Show Community Lab section in site navigation" checked={true} />
      <ToggleRow label="Stories Section" hint="Enable the editorial stories section" checked={true} />
      <div style={{ paddingTop: 8 }}>
        <Field label="Cookie Banner Text">
          <textarea rows={3} style={{ ...inp, resize: 'vertical' }} defaultValue="We use cookies to improve your experience and understand how you engage with our content and products." />
        </Field>
      </div>
    </>
  ),
  'Commerce': (
    <>
      <Field label="Currency">
        <select style={inp}><option>EUR (€)</option><option>USD ($)</option><option>GBP (£)</option><option>MAD (د.م.)</option></select>
      </Field>
      <Field label="Shipping Countries"><input style={inp} defaultValue="France, Germany, Netherlands, Belgium, Morocco, UK" /></Field>
      <ToggleRow label="Community Lab Product Drops" hint="Allow Lab-originated products to be sold" checked={true} />
      <ToggleRow label="Pre-orders" hint="Enable pre-order for out-of-stock items" checked={false} />
      <ToggleRow label="Show Stock Count" hint="Display remaining stock count on product pages" checked={false} />
      <div style={{ paddingTop: 8 }}>
        <Field label="Low Stock Threshold" hint="Alert when inventory drops below this number">
          <input style={{ ...inp, width: 120 }} type="number" defaultValue={5} />
        </Field>
      </div>
    </>
  ),
  'Community': (
    <>
      <ToggleRow label="Public Member Profiles" hint="Allow members to view each other's profiles" checked={true} />
      <ToggleRow label="Contribution Submissions" hint="Allow new contributions to be submitted" checked={true} />
      <ToggleRow label="Level-up Notifications" hint="Notify members when they reach a new level" checked={true} />
      <ToggleRow label="Commerce Integration" hint="Show purchase history on member profiles" checked={true} />
      <div style={{ paddingTop: 12 }}>
        <Field label="Max Contributions per Challenge" hint="Limit per member per challenge">
          <input style={{ ...inp, width: 120 }} type="number" defaultValue={3} />
        </Field>
        <Field label="Default Contribution License" hint="Applies to all submissions unless overridden">
          <select style={inp}>
            <option>CC BY-NC 4.0 — Attribution Non-Commercial</option>
            <option>CC BY 4.0 — Attribution</option>
            <option>All rights reserved</option>
          </select>
        </Field>
      </div>
    </>
  ),
  'Challenges': (
    <>
      <ToggleRow label="Challenges Enabled" hint="Allow new challenges to be published" checked={true} />
      <ToggleRow label="Anonymous Submissions" hint="Allow members to submit without public attribution" checked={false} />
      <ToggleRow label="Public Voting" hint="Allow community to vote on submissions before moderation" checked={false} />
      <div style={{ paddingTop: 12 }}>
        <Field label="Default Challenge Duration" hint="In days — can be overridden per challenge">
          <input style={{ ...inp, width: 120 }} type="number" defaultValue={90} />
        </Field>
        <Field label="Auto-publish Results After" hint="Days after close date — set 0 to disable auto-publish">
          <input style={{ ...inp, width: 120 }} type="number" defaultValue={14} />
        </Field>
      </div>
    </>
  ),
  'Notifications': (
    <>
      <ToggleRow label="Email: New Contributions" hint="Notify moderators of new submissions" checked={true} />
      <ToggleRow label="Email: New Members" hint="Notify admins when members register" checked={false} />
      <ToggleRow label="Email: Order Alerts" hint="Commerce events for the team" checked={true} />
      <ToggleRow label="Slack: Content Published" hint="Post to Slack when stories go live" checked={true} />
      <div style={{ paddingTop: 12 }}>
        <Field label="Notification Email"><input style={inp} defaultValue="team@izli.co" /></Field>
        <Field label="Slack Webhook URL" hint="Paste your Slack incoming webhook here">
          <input style={inp} type="url" placeholder="https://hooks.slack.com/services/..." />
        </Field>
      </div>
    </>
  ),
  'Integrations': (
    <>
      {[
        { name: 'Stripe', status: 'Connected', color: '#4A7A5A', desc: 'Payment processing for commerce orders' },
        { name: 'Mailchimp', status: 'Connected', color: '#4A7A5A', desc: 'Email list sync and newsletter dispatch' },
        { name: 'Cloudinary', status: 'Connected', color: '#4A7A5A', desc: 'Media storage and image optimization' },
        { name: 'Google Analytics', status: 'Not configured', color: TEXT_SEC, desc: 'Site-level pageview and event tracking' },
        { name: 'Klaviyo', status: 'Not configured', color: TEXT_SEC, desc: 'Advanced e-commerce email flows' },
      ].map((intg, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{intg.name}</div>
            <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>{intg.desc}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: intg.color }}>{intg.status}</span>
            <button style={{ padding: '5px 12px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 11, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              {intg.status === 'Connected' ? 'Configure' : 'Connect'}
            </button>
          </div>
        </div>
      ))}
    </>
  ),
  'SEO Defaults': (
    <>
      <Field label="Default Meta Title Template" hint="Use {title} for dynamic page title">
        <input style={inp} defaultValue="{title} — IZLI" />
      </Field>
      <Field label="Default Meta Description">
        <textarea rows={3} style={{ ...inp, resize: 'vertical' }} defaultValue="IZLI — Contemporary menswear with Amazigh heritage. Designed with intention, made to last." />
      </Field>
      <Field label="Default OG Image" hint="Used when no page-specific image is set">
        <div style={{ padding: '16px', background: '#EDE8DF', border: `2px dashed ${BORDER}`, borderRadius: 10, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: 12, color: TEXT_SEC }}>Upload OG image (1200×630px recommended)</div>
        </div>
      </Field>
      <Field label="Robots.txt">
        <textarea rows={4} style={{ ...inp, resize: 'vertical', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }} defaultValue={"User-agent: *\nDisallow: /admin/\nSitemap: https://izli.co/sitemap.xml"} />
      </Field>
    </>
  ),
}

export default function GlobalSettings({ onNavigate: _ }: Props) {
  const [active, setActive] = useState<SectionKey>('Brand')

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Global Settings</div>
        <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Brand, site, commerce, community, and system configuration</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, alignItems: 'start' }}>
        {/* Settings nav */}
        <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', position: 'sticky', top: 24 }}>
          {SECTIONS.map((s, i) => (
            <button key={s} onClick={() => setActive(s)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 18px', background: active === s ? '#E8EDF3' : 'transparent', color: active === s ? INDIGO : TEXT_SEC, fontWeight: active === s ? 600 : 400, fontSize: 13, border: 'none', borderBottom: i < SECTIONS.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              {s}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          <SectionCard title={active}>
            {CONTENT[active]}
          </SectionCard>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button style={{ padding: '10px 20px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Reset</button>
            <button style={{ padding: '10px 22px', background: INDIGO, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#E7DFD2', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}
