import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

const WINNERS = [
  { rank: 1, title: 'Azoul mark — 12 variations', author: 'Youcef Benali', avatar: 'YB', score: 9.2, img: 'photo-1516762689617-e1cffcef479d', downstream: ['Lab Project: Mountain Memory Atlas', 'Featured in Story'] },
  { rank: 2, title: 'Stone script from Beni Mellal', author: 'Lina Meziane', avatar: 'LM', score: 8.7, img: 'photo-1469334031218-e382a71b716b', downstream: ['Editorial Story: Archive a Mark'] },
  { rank: 3, title: 'Redrawn in thread', author: 'Amira Saïdi', avatar: 'AS', score: 8.1, img: 'photo-1523381210434-271e8be1f52b', downstream: ['Community Highlight'] },
]

const ALL_SELECTED = [
  ...WINNERS,
  { rank: 0, title: 'Digital geometry / Atlas grid', author: 'Karim Ouali', avatar: 'KO', score: 7.4, img: 'photo-1618354691373-d851c5c3a990', downstream: [] },
]

function ImpactCard({ icon, label, title, sub, accent, onClick }: { icon: string; label: string; title: string; sub: string; accent: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ padding: '14px 16px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 14, cursor: onClick ? 'pointer' : 'default', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginTop: 1 }}>{title}</div>
        <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  )
}

export default function ChallengeResults({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Challenge Results</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Atlas Pattern Remix · Completed · 203 submissions</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('challenge-submissions')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← All Submissions</button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Publish Results</button>
        </div>
      </div>

      {/* Results summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
        {[
          { label: 'Total Submissions', value: '203', color: INDIGO },
          { label: 'Selected', value: '4', color: '#4A7A5A' },
          { label: 'Stories Generated', value: '2', color: CLAY },
          { label: 'Lab Projects', value: '1', color: SAGE },
        ].map((k, i) => (
          <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 18, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontSize: 30, fontWeight: 500, color: k.color, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Left */}
        <div>
          {/* Podium */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: INDIGO }}>Winning Contributions</div>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {WINNERS.map((w, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px', background: i === 0 ? '#EFE8DD' : '#EDE8DF', border: `1px solid ${i === 0 ? '#C8BEA8' : BORDER}`, borderRadius: 16 }}>
                  {/* Rank */}
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: i === 0 ? CLAY : i === 1 ? SAGE : '#B7AA91', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#F5F1EA', flexShrink: 0 }}>
                    {['①', '②', '③'][i]}
                  </div>
                  {/* Thumbnail */}
                  <div style={{ width: 60, height: 72, borderRadius: 10, overflow: 'hidden', background: '#D8D0C4', flexShrink: 0 }}>
                    <img src={`https://images.unsplash.com/${w.img}?w=120&h=144&fit=crop&auto=format`} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 4 }}>{w.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#E7DFD2' }}>{w.avatar}</div>
                      <span style={{ fontSize: 12, color: TEXT_SEC }}>{w.author}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#4A7A5A' }}>{w.score}</span>
                    </div>
                    {w.downstream.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {w.downstream.map((d, j) => (
                          <span key={j} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: '#E8EDF3', color: INDIGO, fontWeight: 500 }}>→ {d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All selected */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: INDIGO }}>All Selected Contributions</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
                  {['Contribution', 'Author', 'Score', 'Downstream Impact'].map(h => (
                    <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_SELECTED.map((s, i) => (
                  <tr key={i} style={{ borderBottom: i < ALL_SELECTED.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                    <td style={{ padding: '13px 20px', fontSize: 13, fontWeight: 500, color: TEXT }}>{s.title}</td>
                    <td style={{ padding: '13px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 24, height: 24, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#E7DFD2' }}>{s.avatar}</div>
                        <span style={{ fontSize: 12, color: TEXT }}>{s.author}</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: '#4A7A5A' }}>{s.score}</td>
                    <td style={{ padding: '13px 20px' }}>
                      {s.downstream.length > 0
                        ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {s.downstream.map((d, j) => <span key={j} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>→ {d}</span>)}
                          </div>
                        : <span style={{ fontSize: 12, color: TEXT_SEC, fontStyle: 'italic' }}>None yet</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right panel — downstream impact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: INDIGO, marginBottom: 16 }}>What This Challenge Produced</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <ImpactCard icon="◫" label="Story" title="Atlas Pattern Remix — A New Archive" sub="Published · 2.8K reads" accent="#EFE8DD" onClick={() => onNavigate('story-editor')} />
              <ImpactCard icon="◫" label="Story" title="From Mountain to Cloth" sub="Published · 1.4K reads" accent="#EFE8DD" onClick={() => onNavigate('story-editor')} />
              <ImpactCard icon="⬠" label="Lab Project" title="Mountain Memory Atlas" sub="Active · 8 participants" accent="#E8EDF3" onClick={() => onNavigate('lab-project-editor')} />
              <ImpactCard icon="◯" label="Community Highlight" title="3 featured in community digest" sub="May 2026 issue" accent="#F3EDE8" />
            </div>
          </div>

          <div style={{ background: INDIGO, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: '#E7DFD2', marginBottom: 14 }}>Challenge Summary</div>
            {[
              { l: 'Challenge', v: 'Atlas Pattern Remix' },
              { l: 'Status', v: 'Completed' },
              { l: 'Duration', v: 'Jan – Apr 2026' },
              { l: 'Submissions', v: '203' },
              { l: 'Participation rate', v: '+38% vs target' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'rgba(231,223,210,0.6)' }}>{r.l}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#E7DFD2' }}>{r.v}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Create New Output</div>
            {[
              { label: 'Create Editorial Story', icon: '◫' },
              { label: 'Launch Lab Project', icon: '⬠' },
              { label: 'Feature in Community', icon: '◯' },
            ].map((a, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', marginBottom: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, color: TEXT_SEC, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                <span style={{ fontSize: 16 }}>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
