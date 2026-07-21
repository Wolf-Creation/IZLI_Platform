import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

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

function HBar({ label, value, max, color = INDIGO, mono = false }: { label: string; value: number | string; max: number; color?: string; mono?: boolean }) {
  const pct = typeof value === 'number' ? Math.min(100, (value / max) * 100) : 50
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: TEXT }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: TEXT, fontFamily: mono ? "'JetBrains Mono', monospace" : undefined }}>{value}</span>
      </div>
      <div style={{ background: '#D8D0C4', borderRadius: 999, height: 5 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 999 }} />
      </div>
    </div>
  )
}

const MONTHLY_MEMBERS = [
  { label: 'Feb', value: 18 }, { label: 'Mar', value: 24 }, { label: 'Apr', value: 21 },
  { label: 'May', value: 32 }, { label: 'Jun', value: 28 }, { label: 'Jul', value: 37 },
]

const MONTHLY_CONTRIBUTIONS = [
  { label: 'Feb', value: 42 }, { label: 'Mar', value: 58 }, { label: 'Apr', value: 51 },
  { label: 'May', value: 74 }, { label: 'Jun', value: 89 }, { label: 'Jul', value: 108 },
]

const TOP_CONTRIBUTORS = [
  { name: 'Youcef Benali', level: 5, contributions: 34, stories: 3, lab: 2, challenges: 12, avatar: 'YB' },
  { name: 'Lina Meziane', level: 4, contributions: 28, stories: 2, lab: 1, challenges: 9, avatar: 'LM' },
  { name: 'Amira Saïdi', level: 4, contributions: 22, stories: 1, lab: 1, challenges: 7, avatar: 'AS' },
  { name: 'Nassim Ouchene', level: 3, contributions: 18, stories: 0, lab: 1, challenges: 5, avatar: 'NO' },
  { name: 'Karim Ouali', level: 3, contributions: 14, stories: 1, lab: 0, challenges: 4, avatar: 'KO' },
]

function BarMini({ data, color = INDIGO, height = 100 }: { data: { label: string; value: number }[]; color?: string; height?: number }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: '100%', background: color, borderRadius: '4px 4px 0 0', opacity: 0.82, height: `${(d.value / max) * (height - 20)}px`, minHeight: 2 }} />
          <span style={{ fontSize: 9, color: TEXT_SEC, whiteSpace: 'nowrap' }}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}

const PERIODS = ['7 days', '30 days', '90 days', 'YTD']

export default function CommunityAnalytics({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Community Analytics</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Member growth, contribution volume, and challenge participation</div>
        </div>
        <div style={{ display: 'flex', gap: 4, background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 12, padding: 4 }}>
          {PERIODS.map((p, i) => (
            <button key={p} style={{ padding: '6px 14px', borderRadius: 9, border: 'none', background: i === 1 ? INDIGO : 'transparent', color: i === 1 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'New Members', value: '37', delta: '+23%', spark: [18, 24, 21, 32, 28, 37], color: INDIGO },
          { label: 'Active Members', value: '148', delta: '+11%', spark: [112, 118, 114, 128, 138, 148], color: SAGE },
          { label: 'Contributions', value: '108', delta: '+21%', spark: [42, 58, 51, 74, 89, 108], color: CLAY },
          { label: 'Challenge Participants', value: '63', delta: '+18%', spark: [38, 44, 40, 52, 57, 63], color: INDIGO },
        ].map((k, i) => (
          <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>{k.label}</div>
                <div style={{ fontSize: 28, fontWeight: 500, color: k.color, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{k.value}</div>
                <div style={{ fontSize: 12, color: SAGE, marginTop: 6, fontWeight: 500 }}>{k.delta} <span style={{ color: TEXT_SEC, fontWeight: 400 }}>vs last period</span></div>
              </div>
              <Sparkline values={k.spark} color={k.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO, marginBottom: 20 }}>New Members / Month</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 110, paddingBottom: 20 }}>
              {['40', '25', '10'].map(l => <span key={l} style={{ fontSize: 10, color: TEXT_SEC }}>{l}</span>)}
            </div>
            <div style={{ flex: 1 }}>
              <BarMini data={MONTHLY_MEMBERS} color={INDIGO} height={110} />
            </div>
          </div>
        </div>
        <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO, marginBottom: 20 }}>Contribution Volume / Month</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 110, paddingBottom: 20 }}>
              {['120', '75', '30'].map(l => <span key={l} style={{ fontSize: 10, color: TEXT_SEC }}>{l}</span>)}
            </div>
            <div style={{ flex: 1 }}>
              <BarMini data={MONTHLY_CONTRIBUTIONS} color={CLAY} height={110} />
            </div>
          </div>
        </div>
      </div>

      {/* Main + side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Top contributors table */}
        <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>Top Contributors</div>
            <button onClick={() => onNavigate('members')} style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View all members →</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
                {['Member', 'Level', 'Contributions', 'Stories', 'Lab', 'Challenges'].map(h => (
                  <th key={h} style={{ padding: '9px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_CONTRIBUTORS.map((m, i) => (
                <tr key={i} style={{ borderBottom: i < TOP_CONTRIBUTORS.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer' }}
                  onClick={() => onNavigate('member-profile')}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = ''}
                >
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#E7DFD2', flexShrink: 0 }}>{m.avatar}</div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{m.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 999, background: m.level >= 4 ? CLAY : m.level === 3 ? SAGE : '#B7AA91', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#F5F1EA' }}>{m.level}</div>
                  </td>
                  {[m.contributions, m.stories, m.lab, m.challenges].map((v, j) => (
                    <td key={j} style={{ padding: '12px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: TEXT }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Level distribution */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: INDIGO, marginBottom: 16 }}>Member Levels</div>
            {[
              { level: 5, count: 8, color: CLAY },
              { level: 4, count: 24, color: INDIGO },
              { level: 3, count: 48, color: SAGE },
              { level: 2, count: 42, color: '#B7AA91' },
              { level: 1, count: 26, color: '#D8D0C4' },
            ].map(l => (
              <HBar key={l.level} label={`Level ${l.level}`} value={l.count} max={48} color={l.color} mono />
            ))}
          </div>

          {/* Challenge activity */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: INDIGO, marginBottom: 14 }}>Challenge Activity</div>
            {[
              { label: 'Active challenges', value: '3' },
              { label: 'Total submissions', value: '203' },
              { label: 'Avg per member', value: '3.2' },
              { label: 'Converted to story', value: '6' },
              { label: 'Sent to Lab', value: '3' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 4 ? `1px solid ${BORDER}` : 'none' }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT, fontFamily: "'JetBrains Mono', monospace" }}>{r.value}</span>
              </div>
            ))}
          </div>

          {/* Community health — dark panel */}
          <div style={{ background: INDIGO, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: '#E7DFD2', marginBottom: 14 }}>Community Health</div>
            {[
              { l: 'Retention 30d', v: '74%' },
              { l: 'Repeat contributors', v: '61%' },
              { l: 'Commerce crossover', v: '38%' },
              { l: 'New → Contributor', v: '28%' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
                <span style={{ fontSize: 12, color: 'rgba(231,223,210,0.6)' }}>{r.l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#E7DFD2' }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
