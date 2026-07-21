import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

function Sparkline({ values, color = INDIGO, w = 72, h = 24 }: { values: number[]; color?: string; w?: number; h?: number }) {
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

const TOP_STORIES = [
  { title: 'Indigo as Memory', type: 'Editorial', reads: 4820, avg: '5m 12s', ctr: '18%', spark: [3100, 3400, 3800, 4100, 4500, 4820], img: 'photo-1490481651871-ab68de25d43d' },
  { title: 'Atlas Pattern Remix — A New Archive', type: 'Community', reads: 2810, avg: '4m 02s', ctr: '12%', spark: [1200, 1500, 1800, 2100, 2400, 2810], img: 'photo-1516762689617-e1cffcef479d' },
  { title: 'What Sahara Taught Our Weavers', type: 'Editorial', reads: 2340, avg: '6m 45s', ctr: '21%', spark: [900, 1100, 1400, 1700, 2000, 2340], img: 'photo-1469334031218-e382a71b716b' },
  { title: 'Symbol Archive — The First Year', type: 'Editorial', reads: 1940, avg: '3m 55s', ctr: '9%', spark: [600, 800, 1100, 1400, 1700, 1940], img: 'photo-1523381210434-271e8be1f52b' },
  { title: 'From Mountain to Cloth', type: 'Community', reads: 1420, avg: '3m 28s', ctr: '7%', spark: [400, 600, 800, 1000, 1200, 1420], img: 'photo-1618354691373-d851c5c3a990' },
]

const TOP_PAGES = [
  { page: 'Community Lab', views: 18400, bounce: '28%', ctr: '34%' },
  { page: 'Heritage Universe', views: 12200, bounce: '41%', ctr: '22%' },
  { page: 'Stories', views: 9800, bounce: '35%', ctr: '18%' },
  { page: 'About / Heritage', views: 7100, bounce: '52%', ctr: '8%' },
  { page: 'Collections', views: 6400, bounce: '38%', ctr: '26%' },
]

const THEMES = [
  { theme: 'Pattern & Symbol', score: 92, stories: 8, engagement: '5m 24s' },
  { theme: 'Indigo & Dye', score: 87, stories: 5, engagement: '5m 02s' },
  { theme: 'Mountain / Atlas', score: 81, stories: 4, engagement: '4m 38s' },
  { theme: 'Textile Heritage', score: 74, stories: 6, engagement: '3m 55s' },
  { theme: 'Oral Memory', score: 62, stories: 3, engagement: '3m 20s' },
]

const PERIODS = ['7 days', '30 days', '90 days', 'YTD']

export default function ContentAnalytics({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Content Analytics</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Stories, pages, editorial themes, and shop click-through</div>
        </div>
        <div style={{ display: 'flex', gap: 4, background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 12, padding: 4 }}>
          {PERIODS.map((p, i) => (
            <button key={p} style={{ padding: '6px 14px', borderRadius: 9, border: 'none', background: i === 1 ? INDIGO : 'transparent', color: i === 1 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Story Reads', value: '13,330', delta: '+31%', spark: [7200, 8400, 9100, 10200, 11800, 13330] },
          { label: 'Avg Read Time', value: '4m 42s', delta: '+0:24', spark: [3.8, 4.0, 4.1, 4.3, 4.5, 4.7] },
          { label: 'Story → Shop CTR', value: '16.4%', delta: '+2.1pp', spark: [11, 12.5, 13, 14, 15.2, 16.4] },
          { label: 'Pages Indexed', value: '6', delta: '—', spark: [5, 5, 5, 6, 6, 6] },
        ].map((k, i) => (
          <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>{k.label}</div>
                <div style={{ fontSize: 28, fontWeight: 500, color: INDIGO, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{k.value}</div>
                <div style={{ fontSize: 12, color: SAGE, marginTop: 6, fontWeight: 500 }}>{k.delta} <span style={{ color: TEXT_SEC, fontWeight: 400 }}>vs last period</span></div>
              </div>
              <Sparkline values={k.spark} color={INDIGO} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Top Stories */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>Top Stories</div>
              <button onClick={() => onNavigate('stories')} style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View all →</button>
            </div>
            <div style={{ padding: '0 24px 8px' }}>
              {TOP_STORIES.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: i < TOP_STORIES.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer', alignItems: 'center' }}
                  onClick={() => onNavigate('story-editor')}
                >
                  <div style={{ width: 44, height: 52, borderRadius: 8, overflow: 'hidden', background: '#D8D0C4', flexShrink: 0 }}>
                    <img src={`https://images.unsplash.com/${s.img}?w=88&h=104&fit=crop&auto=format`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 999, background: s.type === 'Editorial' ? '#EDE8DF' : '#E8EDF3', color: s.type === 'Editorial' ? CLAY : INDIGO, fontWeight: 500 }}>{s.type}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: TEXT_SEC }}>Avg read {s.avg} · Shop CTR {s.ctr}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, fontFamily: "'JetBrains Mono', monospace" }}>{s.reads.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: TEXT_SEC }}>reads</div>
                    <Sparkline values={s.spark} color={INDIGO} w={64} h={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>Top Pages</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
                  {['Page', 'Views', 'Bounce Rate', 'Shop CTR'].map(h => (
                    <th key={h} style={{ padding: '9px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_PAGES.map((p, i) => (
                  <tr key={i} style={{ borderBottom: i < TOP_PAGES.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                    <td style={{ padding: '12px 20px', fontSize: 13, fontWeight: 500, color: TEXT }}>{p.page}</td>
                    <td style={{ padding: '12px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: TEXT }}>{p.views.toLocaleString()}</td>
                    <td style={{ padding: '12px 20px', fontSize: 12, color: TEXT_SEC }}>{p.bounce}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: parseFloat(p.ctr) > 20 ? SAGE : TEXT }}>{p.ctr}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Editorial themes */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: INDIGO, marginBottom: 4 }}>Best Editorial Themes</div>
            <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 14 }}>Ranked by engagement score</div>
            {THEMES.map((t, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{t.theme}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: INDIGO, fontFamily: "'JetBrains Mono', monospace" }}>{t.score}</span>
                </div>
                <div style={{ background: '#D8D0C4', borderRadius: 999, height: 5, marginBottom: 4 }}>
                  <div style={{ width: `${t.score}%`, height: '100%', background: INDIGO, borderRadius: 999 }} />
                </div>
                <div style={{ fontSize: 10, color: TEXT_SEC }}>{t.stories} stories · avg {t.engagement}</div>
              </div>
            ))}
          </div>

          {/* Story → Commerce funnel */}
          <div style={{ background: INDIGO, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: '#E7DFD2', marginBottom: 14 }}>Story → Commerce</div>
            {[
              { l: 'Story reads', v: '13,330' },
              { l: 'Clicked product link', v: '2,186' },
              { l: 'Visited shop page', v: '1,840' },
              { l: 'Added to cart', v: '614' },
              { l: 'Converted', v: '214' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 8, borderBottom: i < 4 ? '1px solid rgba(231,223,210,0.12)' : 'none' }}>
                <span style={{ fontSize: 12, color: 'rgba(231,223,210,0.6)' }}>{r.l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#E7DFD2', fontFamily: "'JetBrains Mono', monospace" }}>{r.v}</span>
              </div>
            ))}
          </div>

          {/* Content type split */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: INDIGO, marginBottom: 14 }}>Content Mix</div>
            {[
              { type: 'Editorial', pct: 62, color: CLAY },
              { type: 'Community', pct: 38, color: INDIGO },
            ].map((c, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: TEXT }}>{c.type}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{c.pct}%</span>
                </div>
                <div style={{ background: '#D8D0C4', borderRadius: 999, height: 6 }}>
                  <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 4, fontSize: 11, color: TEXT_SEC }}>15 stories total · 9 editorial · 6 community</div>
          </div>
        </div>
      </div>
    </div>
  )
}
