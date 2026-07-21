import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'

interface Props { onNavigate: (s: Screen) => void }

const CALLS = [
  { title: 'Mountain Memory Atlas — Contribution Open Call', project: 'Mountain Memory Atlas', type: 'Research', submissions: 34, capacity: 60, status: 'Open', deadline: '15 Aug 2026', img: 'photo-1469334031218-e382a71b716b' },
  { title: 'Symbol Archive — Regional Documentarians Needed', project: 'Community Symbol Archive', type: 'Documentary', submissions: 56, capacity: 100, status: 'Open', deadline: '30 Sep 2026', img: 'photo-1516762689617-e1cffcef479d' },
  { title: 'Indigo Story — Textile Heritage Contributors', project: 'Indigo Story Capsule', type: 'Textile / Written', submissions: 18, capacity: 30, status: 'Open', deadline: '31 Oct 2026', img: 'photo-1490481651871-ab68de25d43d' },
  { title: 'Oral Memory to Garment — Call for Participants', project: 'Oral Memory to Garment Project', type: 'Narrative', submissions: 0, capacity: 20, status: 'Draft', deadline: 'Sep 2026', img: 'photo-1521572163474-6864f9cf17ab' },
]

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div style={{ background: '#D8D0C4', borderRadius: 999, height: 6, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: pct > 80 ? CLAY : INDIGO, borderRadius: 999, transition: 'width 0.3s' }} />
    </div>
  )
}

export default function CallsForContribution({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Open Calls</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Community Lab contribution calls · 3 open · 108 total submissions</div>
        </div>
        <button style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          + Create Open Call
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {CALLS.map((c, i) => (
          <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onClick={() => onNavigate('lab-project-editor')}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(30,47,68,0.08)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex' }}>
              <div style={{ width: 100, minWidth: 100, background: '#EDE8DF', overflow: 'hidden' }}>
                <img src={`https://images.unsplash.com/${c.img}?w=140&h=160&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1, padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC }}>{c.type}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: c.status === 'Open' ? '#E8EDF3' : '#EDE8DF', color: c.status === 'Open' ? INDIGO : TEXT_SEC }}>{c.status}</span>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: TEXT_SEC }}>→ <span style={{ color: INDIGO, fontWeight: 500 }}>⬠ {c.project}</span></div>
                  </div>
                  <div style={{ fontSize: 12, color: TEXT_SEC, whiteSpace: 'nowrap', marginLeft: 16 }}>Deadline: <strong style={{ color: TEXT }}>{c.deadline}</strong></div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: TEXT_SEC }}>{c.submissions} submissions · {c.capacity} capacity</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{Math.round((c.submissions / c.capacity) * 100)}%</span>
                  </div>
                  <ProgressBar value={c.submissions} max={c.capacity} />
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button onClick={e => e.stopPropagation()} style={{ padding: '5px 12px', background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 11, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View Project →</button>
                  <button onClick={e => e.stopPropagation()} style={{ padding: '5px 12px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 11, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Edit Call</button>
                  {c.status === 'Draft' && <button onClick={e => e.stopPropagation()} style={{ padding: '5px 12px', background: INDIGO, border: 'none', borderRadius: 8, fontSize: 11, color: '#E7DFD2', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Publish</button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
