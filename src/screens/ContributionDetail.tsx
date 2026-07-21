import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

export default function ContributionDetail({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TEXT_SEC }}>CON-0501</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC }}>Image Series</span>
            <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: '#FDF8EC', color: '#A07820' }}>Pending Review</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>
            Tifinagh letterforms — personal study
          </div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 6 }}>
            Submitted 8 Jul 2026 · Tifinagh Type Challenge
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('contributions')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Back</button>
          <button onClick={() => onNavigate('story-review')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Review Queue →</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Main content */}
        <div>
          {/* Media */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Contribution Media</div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                {['photo-1516762689617-e1cffcef479d', 'photo-1618354691373-d851c5c3a990', 'photo-1503341504253-dff4815485f1'].map((id, i) => (
                  <div key={i} style={{ aspectRatio: '1', borderRadius: 12, overflow: 'hidden', background: '#EDE8DF' }}>
                    <img src={`https://images.unsplash.com/${id}?w=300&h=300&fit=crop&auto=format`} alt={`Image ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: TEXT_SEC }}>3 images · tifinagh-study-01.jpg, tifinagh-study-02.jpg, tifinagh-study-03.jpg</div>
            </div>
          </div>

          {/* Content */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Contribution Text</div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.8 }}>
                <p style={{ marginTop: 0 }}>A personal study of 12 Tifinagh characters, hand-drawn and digitized. Each letter explores the negative space as much as the stroke itself — the silence between forms is where meaning accumulates.</p>
                <p>I've been studying the Tifinagh alphabet for three years, beginning from a place of inheritance. My grandmother used these symbols as decorative marks — she didn't know them as writing, but as geometry. This work starts from that tension.</p>
                <p style={{ marginBottom: 0 }}>The series documents each character through three phases: hand study, digital vector, and applied textile grid. The textile application is still incomplete — the grid work continues alongside the challenge submission.</p>
              </div>
            </div>
          </div>

          {/* Challenge reference */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Challenge Reference</div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#E8EDF3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>◇</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Challenge</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: TEXT }}>Tifinagh Type Challenge</div>
                  <div style={{ fontSize: 12, color: TEXT_SEC }}>Active · 142 entries · Deadline: 31 Aug 2026</div>
                </div>
                <button style={{ fontSize: 12, color: TEXT_SEC, background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View Challenge →</button>
              </div>
            </div>
          </div>

          {/* Moderation notes */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Moderation Notes</div>
            </div>
            <div style={{ padding: 24 }}>
              <textarea
                style={{ width: '100%', padding: '12px 14px', border: `1px solid ${BORDER}`, borderRadius: 12, background: '#EDE8DF', fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical', height: 100 }}
                placeholder="Add an internal note about this contribution..."
              />
              <button style={{ marginTop: 10, padding: '8px 16px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save Note</button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Moderation actions */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Moderation Actions</div>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{ padding: '10px 14px', background: '#E6EDE8', border: '1px solid #C4DEC8', borderRadius: 10, fontSize: 13, color: '#4A7A5A', fontWeight: 500, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                ✓ Approve Contribution
              </button>
              <button style={{ padding: '10px 14px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, color: TEXT_SEC, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                ✎ Request Edits
              </button>
              <button style={{ padding: '10px 14px', background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, color: CLAY, fontWeight: 500, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                ↗ Convert to Story
              </button>
              <button style={{ padding: '10px 14px', background: '#E8EDF3', border: `1px solid #B8CCE0`, borderRadius: 10, fontSize: 13, color: INDIGO, fontWeight: 500, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                ⭐ Feature
              </button>
              <button style={{ padding: '10px 14px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, color: SAGE, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                ⬠ Send to Lab
              </button>
              <div style={{ height: 1, background: BORDER, margin: '4px 0' }} />
              <button style={{ padding: '10px 14px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, color: '#C0392B', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                ✕ Reject
              </button>
            </div>
          </div>

          {/* Author */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Author</div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#E7DFD2' }}>AS</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Amira Saïdi</div>
                  <div style={{ fontSize: 12, color: TEXT_SEC }}>@amira.saidi · Level 3</div>
                </div>
              </div>
              {[{ l: 'Total contributions', v: '14' }, { l: 'Approved', v: '11' }, { l: 'Challenge entries', v: '3' }].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{s.l}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{s.v}</span>
                </div>
              ))}
              <button
                onClick={() => onNavigate('member-profile')}
                style={{ width: '100%', marginTop: 10, padding: '8px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                View full profile →
              </button>
            </div>
          </div>

          {/* Meta */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Submission Info</div>
            {[{ l: 'ID', v: 'CON-0501' }, { l: 'Submitted', v: '8 Jul 2026' }, { l: 'Type', v: 'Image Series' }, { l: 'Challenge', v: 'Tifinagh Type' }].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.l}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: TEXT, fontFamily: r.l === 'ID' ? "'JetBrains Mono', monospace" : 'inherit' }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
