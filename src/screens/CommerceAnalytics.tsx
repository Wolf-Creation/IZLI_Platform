import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

// SVG bar chart component
function BarChart({ data, color = INDIGO, height = 120 }: { data: { label: string; value: number }[]; color?: string; height?: number }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height, paddingTop: 8 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: '100%', background: color, borderRadius: '4px 4px 0 0', opacity: 0.85, height: `${(d.value / max) * (height - 24)}px`, minHeight: 2, transition: 'height 0.3s' }} />
          <span style={{ fontSize: 9, color: TEXT_SEC, whiteSpace: 'nowrap' }}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}

// Sparkline
function Sparkline({ values, color = INDIGO, w = 80, h = 28 }: { values: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

const MONTHLY = [
  { label: 'Feb', value: 31200 }, { label: 'Mar', value: 38400 }, { label: 'Apr', value: 35100 },
  { label: 'May', value: 42800 }, { label: 'Jun', value: 44600 }, { label: 'Jul', value: 48320 },
]

const TOP_PRODUCTS = [
  { name: 'Tifinagh Frame Tee', universe: 'Heritage', revenue: 3780, units: 84, share: 78 },
  { name: 'Washed Indigo Heritage Tee', universe: 'Heritage', revenue: 3195, units: 71, share: 66 },
  { name: 'Community Lab Archive Jersey', universe: 'Community Lab', revenue: 2850, units: 38, share: 59 },
  { name: 'Atlas Symbol Boxy Tee', universe: 'Essentials', revenue: 2240, units: 56, share: 52 },
  { name: 'Woven Sahara Overshirt', universe: 'Studio', revenue: 1920, units: 16, share: 44 },
]

const TOP_COLLECTIONS = [
  { name: 'Echoes of Stone', revenue: 18240, share: 38 },
  { name: 'Indigo Memory', revenue: 12800, share: 26 },
  { name: 'Atlas Marks', revenue: 8450, share: 18 },
  { name: 'Heritage Essentials 01', revenue: 6120, share: 13 },
]

const PERIODS = ['7 days', '30 days', '90 days', 'YTD', 'All time']

export default function CommerceAnalytics({ onNavigate: _ }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Commerce Analytics</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Revenue, orders, and product performance</div>
        </div>
        <div style={{ display: 'flex', gap: 4, background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 12, padding: 4 }}>
          {PERIODS.map((p, i) => (
            <button key={p} style={{ padding: '6px 14px', borderRadius: 9, border: 'none', background: i === 1 ? INDIGO : 'transparent', color: i === 1 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Revenue MTD', value: '€48,320', delta: '+12.4%', spark: [28, 32, 30, 38, 35, 42, 44, 48] },
          { label: 'Orders', value: '214', delta: '+8.1%', spark: [160, 170, 155, 180, 175, 195, 200, 214] },
          { label: 'AOV', value: '€225.80', delta: '+4.2%', spark: [200, 210, 205, 215, 208, 218, 222, 226] },
          { label: 'Conversion Rate', value: '3.8%', delta: '+0.4pp', spark: [2.9, 3.1, 3.0, 3.3, 3.2, 3.5, 3.7, 3.8] },
        ].map((k, i) => (
          <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>{k.label}</div>
                <div style={{ fontSize: 28, fontWeight: 500, color: INDIGO, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{k.value}</div>
                <div style={{ fontSize: 12, color: SAGE, marginTop: 6, fontWeight: 500 }}>{k.delta} <span style={{ color: TEXT_SEC, fontWeight: 400 }}>vs last month</span></div>
              </div>
              <Sparkline values={k.spark} color={INDIGO} />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '24px', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: INDIGO }}>Monthly Revenue</div>
          <div style={{ fontSize: 12, color: TEXT_SEC }}>Feb – Jul 2026</div>
        </div>
        {/* Y-axis labels */}
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 140, paddingBottom: 20 }}>
            {['€50K', '€40K', '€30K'].map(l => <span key={l} style={{ fontSize: 10, color: TEXT_SEC }}>{l}</span>)}
          </div>
          <div style={{ flex: 1 }}>
            <BarChart data={MONTHLY} color={INDIGO} height={140} />
          </div>
        </div>
      </div>

      {/* Products + Collections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Top Products */}
        <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>Top Products</div>
          </div>
          <div style={{ padding: '0 24px 8px' }}>
            {TOP_PRODUCTS.map((p, i) => (
              <div key={i} style={{ padding: '14px 0', borderBottom: i < TOP_PRODUCTS.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: TEXT_SEC }}>{p.units} units · <span style={{ padding: '1px 6px', background: '#E8EDF3', borderRadius: 999, color: INDIGO }}>{p.universe}</span></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>€{p.revenue.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: TEXT_SEC }}>{p.share}% of top</div>
                  </div>
                </div>
                <div style={{ background: '#D8D0C4', borderRadius: 999, height: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${p.share}%`, height: '100%', background: INDIGO, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Collections */}
        <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>Top Collections</div>
          </div>
          <div style={{ padding: '16px 24px' }}>
            {/* Donut-style breakdown */}
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: 100, height: 100, transform: 'rotate(-90deg)' }}>
                  {[{ col: INDIGO, v: 38, off: 0 }, { col: CLAY, v: 26, off: 38 }, { col: SAGE, v: 18, off: 64 }, { col: '#B7AA91', v: 13, off: 82 }].map((s, i) => (
                    <circle key={i} cx="18" cy="18" r="14" fill="none" stroke={s.col} strokeWidth="4" strokeDasharray={`${s.v * 0.88} 100`} strokeDashoffset={-s.off * 0.88} />
                  ))}
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                {TOP_COLLECTIONS.map((c, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: [INDIGO, CLAY, SAGE, '#B7AA91'][i] }} />
                      <span style={{ fontSize: 12, color: TEXT }}>{c.name}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>€{c.revenue.toLocaleString()}</span>
                      <span style={{ fontSize: 11, color: TEXT_SEC, marginLeft: 6 }}>{c.share}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Universe breakdown bars */}
          <div style={{ padding: '0 24px 20px', borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Revenue by Universe</div>
            {[
              { name: 'Heritage', pct: 48, color: INDIGO },
              { name: 'Essentials', pct: 28, color: SAGE },
              { name: 'Studio', pct: 14, color: CLAY },
              { name: 'Community Lab', pct: 10, color: '#B7AA91' },
            ].map((u, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: TEXT }}>{u.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{u.pct}%</span>
                </div>
                <div style={{ background: '#D8D0C4', borderRadius: 999, height: 5 }}>
                  <div style={{ width: `${u.pct}%`, height: '100%', background: u.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
