import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'


interface Props { onNavigate: (s: Screen) => void }

const ORDERS = [
  { id: '#ORD-2841', date: '9 Jul 2026', total: '€135.00', status: 'Fulfilled', items: ['Tifinagh Frame Tee (M)', 'Atlas Symbol Boxy Tee (L)', 'Washed Indigo Heritage Tee (M)'] },
  { id: '#ORD-2792', date: '12 Jun 2026', total: '€75.00', status: 'Fulfilled', items: ['Community Lab Archive Jersey (L)'] },
  { id: '#ORD-2744', date: '3 May 2026', total: '€90.00', status: 'Refunded', items: ['Berber Stitch Cardigan (M)', 'Tifinagh Frame Tee (S)'] },
]

export default function CustomerDetail({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 600, color: '#E7DFD2', flexShrink: 0 }}>MA</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 500, color: INDIGO }}>Mehdi Aït Mansour</div>
            <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 3 }}>mehdi.ait@example.com · Member since February 2024</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('orders')} style={{ padding: '9px 18px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Back</button>
          <button style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Edit</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Left */}
        <div>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Total Spend', value: '€300.00', accent: INDIGO },
              { label: 'Orders', value: '3', accent: INDIGO },
              { label: 'Avg. Order', value: '€100.00', accent: TEXT_SEC },
              { label: 'Last Order', value: '9 Jul 2026', accent: TEXT_SEC },
            ].map((k, i) => (
              <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '18px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{k.label}</div>
                <div style={{ fontSize: 24, fontWeight: 500, color: k.accent, fontFamily: "'Playfair Display', serif" }}>{k.value}</div>
              </div>
            ))}
          </div>

          {/* Order history */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Order History</div>
            </div>
            <div>
              {ORDERS.map((o, i) => (
                <div key={i} style={{ padding: '18px 24px', borderBottom: i < ORDERS.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: INDIGO, fontWeight: 500 }}>{o.id}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 999,
                        background: o.status === 'Fulfilled' ? '#E6EDE8' : '#EDE8DF',
                        color: o.status === 'Fulfilled' ? '#4A7A5A' : TEXT_SEC }}>{o.status}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{o.total}</span>
                      <span style={{ fontSize: 12, color: TEXT_SEC }}>{o.date}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {o.items.map((item, j) => (
                      <span key={j} style={{ fontSize: 11, padding: '3px 10px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT_SEC }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 16 }}>Admin Notes</div>
            <textarea
              style={{ width: '100%', padding: '12px 14px', border: `1px solid ${BORDER}`, borderRadius: 12, background: '#EDE8DF', fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical', height: 100 }}
              defaultValue="VIP customer. Purchases consistently from Heritage universe. Eligible for early access to new drops."
            />
            <button style={{ marginTop: 10, padding: '8px 16px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save Note</button>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Profile Info */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Profile</div>
            </div>
            <div style={{ padding: 20 }}>
              {[
                { l: 'Location', v: 'Casablanca, Morocco' },
                { l: 'Language', v: 'French / Tamazight' },
                { l: 'Currency', v: 'EUR' },
                { l: 'Channel', v: 'Online Store' },
                { l: 'Tags', v: 'VIP · Heritage Fan' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.l}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: TEXT, textAlign: 'right', maxWidth: 160 }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Account */}
          <div style={{ background: INDIGO, borderRadius: 20, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(231,223,210,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Community Account</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(231,223,210,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, color: '#E7DFD2' }}>MA</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#E7DFD2' }}>@mehdi.ait</div>
                <div style={{ fontSize: 11, color: 'rgba(231,223,210,0.6)' }}>Active · Level 3 Contributor</div>
              </div>
            </div>
            {[
              { l: 'Contributions', v: '14' },
              { l: 'Challenge entries', v: '3' },
              { l: 'Lab projects', v: '1' },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'rgba(231,223,210,0.6)' }}>{m.l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#E7DFD2' }}>{m.v}</span>
              </div>
            ))}
            <button style={{ width: '100%', marginTop: 14, padding: '9px', background: 'rgba(231,223,210,0.12)', border: '1px solid rgba(231,223,210,0.2)', borderRadius: 10, fontSize: 12, color: '#E7DFD2', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              View Community Profile →
            </button>
          </div>

          {/* Contact */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Contact</div>
            {[
              { l: 'Email', v: 'mehdi.ait@example.com' },
              { l: 'Phone', v: '+212 6 12 34 56 78' },
            ].map((c, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: TEXT_SEC }}>{c.l}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
