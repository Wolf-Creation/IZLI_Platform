import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

type DecisionState = 'Shortlisted' | 'Selected' | 'Rejected' | 'Pending'

function DecisionChip({ state }: { state: DecisionState }) {
  const map: Record<DecisionState, { bg: string; color: string }> = {
    'Shortlisted': { bg: '#FDF8EC', color: '#A07820' },
    'Selected': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Rejected': { bg: '#FDECEC', color: '#A02020' },
    'Pending': { bg: '#EDE8DF', color: TEXT_SEC },
  }
  const s = map[state]
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{state}</span>
}

const SUBMISSIONS = [
  { id: 'SUB-0142', title: 'Azoul mark — 12 variations', author: 'Youcef Benali', avatar: 'YB', type: 'Image Series', score: 9.2, decision: 'Selected' as DecisionState, tags: ['geometric', 'textile', 'symbol'], img: 'photo-1516762689617-e1cffcef479d', note: 'Outstanding research depth. Recommend for lab.' },
  { id: 'SUB-0139', title: 'Stone script from Beni Mellal', author: 'Lina Meziane', avatar: 'LM', type: 'Photo Essay', score: 8.7, decision: 'Selected' as DecisionState, tags: ['documentary', 'atlas', 'archive'], img: 'photo-1469334031218-e382a71b716b', note: 'Exceptional imagery. Story potential.' },
  { id: 'SUB-0136', title: 'Redrawn in thread', author: 'Amira Saïdi', avatar: 'AS', type: 'Textile', score: 8.1, decision: 'Shortlisted' as DecisionState, tags: ['craft', 'textile', 'interpretation'], img: 'photo-1523381210434-271e8be1f52b', note: '' },
  { id: 'SUB-0133', title: 'Digital geometry / Atlas grid', author: 'Karim Ouali', avatar: 'KO', type: 'Digital Design', score: 7.4, decision: 'Shortlisted' as DecisionState, tags: ['digital', 'pattern', 'grid'], img: 'photo-1618354691373-d851c5c3a990', note: '' },
  { id: 'SUB-0130', title: 'Mark from grandmother\'s wall', author: 'Sarah El Fassi', avatar: 'SE', type: 'Photography', score: 6.8, decision: 'Pending' as DecisionState, tags: ['family', 'archive', 'personal'], img: 'photo-1503341504253-dff4815485f1', note: '' },
  { id: 'SUB-0127', title: 'Abstract typographic study', author: 'Omar Hamdouchi', avatar: 'OH', type: 'Typography', score: 5.2, decision: 'Rejected' as DecisionState, tags: ['type', 'abstract'], img: 'photo-1521572163474-6864f9cf17ab', note: 'Does not meet origin documentation requirement.' },
]

const VIEWS = ['Gallery', 'Table']

export default function ChallengeSubmissions({ onNavigate }: Props) {
  const [view, setView] = useState<'Gallery' | 'Table'>('Gallery')
  const selected = SUBMISSIONS.filter(s => s.decision === 'Selected').length
  const shortlisted = SUBMISSIONS.filter(s => s.decision === 'Shortlisted').length

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Submissions</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>
            Reinterpret a Mountain Mark · <span style={{ color: '#4A7A5A', fontWeight: 500 }}>{selected} selected</span> · {shortlisted} shortlisted · {SUBMISSIONS.length} total shown
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('challenge-editor')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Challenge</button>
          <button onClick={() => onNavigate('challenge-results')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View Results →</button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Publish Results</button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '12px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
        {[
          { l: 'Total', v: '34', color: TEXT },
          { l: 'Pending', v: '8', color: '#A07820' },
          { l: 'Shortlisted', v: String(shortlisted), color: '#A07820' },
          { l: 'Selected', v: String(selected), color: '#4A7A5A' },
          { l: 'Rejected', v: '4', color: '#A02020' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ width: 1, height: 16, background: BORDER }} />}
            <div>
              <span style={{ fontSize: 11, color: TEXT_SEC }}>{s.l}: </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.v}</span>
            </div>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        {/* View toggle */}
        <div style={{ display: 'flex', background: '#EDE8DF', borderRadius: 9, padding: 3, border: `1px solid ${BORDER}` }}>
          {VIEWS.map(v => (
            <button key={v} onClick={() => setView(v as 'Gallery' | 'Table')}
              style={{ padding: '5px 14px', borderRadius: 7, border: 'none', background: view === v ? INDIGO : 'transparent', color: view === v ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.12s' }}>{v}</button>
          ))}
        </div>
        {/* Filters */}
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>All Decisions</option><option>Pending</option><option>Shortlisted</option><option>Selected</option><option>Rejected</option>
        </select>
      </div>

      {/* Gallery view */}
      {view === 'Gallery' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {SUBMISSIONS.map((s, i) => (
            <div key={i} style={{ background: '#F5F1EA', border: `2px solid ${s.decision === 'Selected' ? '#4A7A5A' : s.decision === 'Shortlisted' ? '#A07820' : BORDER}`, borderRadius: 18, overflow: 'hidden', cursor: 'pointer' }}>
              {/* Image */}
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#EDE8DF', position: 'relative' }}>
                <img src={`https://images.unsplash.com/${s.img}?w=400&h=300&fit=crop&auto=format`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  <DecisionChip state={s.decision} />
                </div>
                <div style={{ position: 'absolute', top: 10, right: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.score}
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 4, lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#E7DFD2' }}>{s.avatar}</div>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{s.author}</span>
                  <span style={{ fontSize: 11, padding: '1px 7px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC }}>{s.type}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                  {s.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>#{t}</span>)}
                </div>
                {s.note && <div style={{ fontSize: 12, color: TEXT_SEC, fontStyle: 'italic', marginBottom: 10, padding: '8px 10px', background: '#EDE8DF', borderRadius: 8 }}>{s.note}</div>}
                {/* Actions */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{ flex: 1, padding: '6px', background: '#E6EDE8', border: 'none', borderRadius: 8, fontSize: 11, color: '#4A7A5A', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>✓ Select</button>
                  <button style={{ padding: '6px 10px', background: '#FDF8EC', border: 'none', borderRadius: 8, fontSize: 11, color: '#A07820', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>⭐</button>
                  <button style={{ padding: '6px 10px', background: '#FDECEC', border: 'none', borderRadius: 8, fontSize: 11, color: '#A02020', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table view */}
      {view === 'Table' && (
        <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
                <th style={{ width: 40, padding: '12px 20px' }}><input type="checkbox" /></th>
                {['Submission', 'Author', 'Type', 'Score', 'Decision', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUBMISSIONS.map((s, i) => (
                <tr key={i} style={{ borderBottom: i < SUBMISSIONS.length - 1 ? `1px solid ${BORDER}` : 'none', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                  <td style={{ padding: '13px 20px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 40, height: 48, borderRadius: 8, overflow: 'hidden', background: '#EDE8DF', flexShrink: 0 }}>
                        <img src={`https://images.unsplash.com/${s.img}?w=80&h=96&fit=crop&auto=format`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: TEXT_SEC, fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>{s.id}</div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{s.title}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#E7DFD2' }}>{s.avatar}</div>
                      <span style={{ fontSize: 12, color: TEXT }}>{s.author}</span>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px' }}><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC }}>{s.type}</span></td>
                  <td style={{ padding: '13px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: s.score >= 8 ? '#4A7A5A' : s.score >= 6 ? '#A07820' : '#A02020' }}>{s.score}</td>
                  <td style={{ padding: '13px 16px' }}><DecisionChip state={s.decision} /></td>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ padding: '4px 10px', background: '#E6EDE8', border: 'none', borderRadius: 7, fontSize: 11, color: '#4A7A5A', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Select</button>
                      <button style={{ padding: '4px 10px', background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 7, fontSize: 11, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>···</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
