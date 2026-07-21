import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

function ModerationChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Pending Review': { bg: '#FDF8EC', color: '#A07820' },
    'Needs Edits': { bg: '#FDF3EC', color: '#A06030' },
    'Approved': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Rejected': { bg: '#FDECEC', color: '#A02020' },
    'In Review': { bg: '#E8EDF3', color: INDIGO },
  }
  const s = map[status] ?? { bg: '#EDE8DF', color: TEXT_SEC }
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

const QUEUE = [
  {
    id: 'CON-0501', title: 'Tifinagh letterforms — personal study', type: 'Image Series', author: 'Amira Saïdi', avatar: 'AS',
    challenge: 'Tifinagh Type Challenge', status: 'Pending Review', submitted: '8 Jul 2026', reads: '—',
    preview: 'A personal study of 12 Tifinagh characters, hand-drawn and digitized. Each letter explores the negative space as much as the stroke itself.',
    img: 'photo-1516762689617-e1cffcef479d',
  },
  {
    id: 'CON-0500', title: 'Woven memory, unravelled thread', type: 'Written', author: 'Omar Hamdouchi', avatar: 'OH',
    challenge: 'Indigo Dye Archive', status: 'Needs Edits', submitted: '7 Jul 2026', reads: '—',
    preview: 'A reflection on inherited craft, set in the context of a grandmother\'s textile tradition and its disappearance from everyday life.',
    img: 'photo-1490481651871-ab68de25d43d',
  },
  {
    id: 'CON-0498', title: 'Atlas geometry in motion', type: 'Video', author: 'Youcef Benali', avatar: 'YB',
    challenge: 'Atlas Pattern Remix', status: 'Pending Review', submitted: '6 Jul 2026', reads: '—',
    preview: 'A 2-minute video tracing Atlas mountain geometry into contemporary textile pattern design. Shot in Marrakech and Casablanca.',
    img: 'photo-1523381210434-271e8be1f52b',
  },
  {
    id: 'CON-0494', title: 'The indigo merchant — photo essay', type: 'Photo Essay', author: 'Lina Meziane', avatar: 'LM',
    challenge: 'Indigo Dye Archive', status: 'Approved', submitted: '4 Jul 2026', reads: '480',
    preview: 'Eight photographs documenting the last traditional indigo merchants in Fès. Each image carries a caption about the dye trade and its cultural resonance.',
    img: 'photo-1469334031218-e382a71b716b',
  },
  {
    id: 'CON-0490', title: 'Community uniform concept', type: 'Design', author: 'Karim Ouali', avatar: 'KO',
    challenge: 'Community Lab Open Call', status: 'In Review', submitted: '2 Jul 2026', reads: '—',
    preview: 'A garment concept for a community uniform built around shared identity signals. Three variations with material and construction notes.',
    img: 'photo-1503341504253-dff4815485f1',
  },
]

function ContributionCard({ c, onNavigate }: { c: typeof QUEUE[0]; onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Cover */}
        <div style={{ width: 120, minWidth: 120, background: '#EDE8DF', overflow: 'hidden', position: 'relative' }}>
          <img src={`https://images.unsplash.com/${c.img}?w=160&h=200&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEXT_SEC }}>{c.id}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC }}>{c.type}</span>
                <ModerationChip status={c.status} />
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: TEXT, lineHeight: 1.3 }}>{c.title}</div>
            </div>
            <div style={{ fontSize: 12, color: TEXT_SEC, whiteSpace: 'nowrap', marginLeft: 16 }}>{c.submitted}</div>
          </div>

          <div style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, marginBottom: 14, maxHeight: 60, overflow: 'hidden' }}>{c.preview}</div>

          {/* Author + source */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#E7DFD2' }}>{c.avatar}</div>
              <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{c.author}</span>
            </div>
            <span style={{ width: 1, height: 14, background: BORDER }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 11, color: TEXT_SEC }}>From challenge:</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: INDIGO }}>{c.challenge}</span>
            </div>
          </div>

          {/* Moderation actions */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('contribution-detail')}
              style={{ padding: '7px 14px', background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              View Detail
            </button>
            <button style={{ padding: '7px 14px', background: '#E6EDE8', border: '1px solid #C4DEC8', borderRadius: 10, fontSize: 12, color: '#4A7A5A', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              ✓ Approve
            </button>
            <button style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              ✎ Request Edits
            </button>
            <button style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, color: CLAY, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              ↗ Convert to Story
            </button>
            <button style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, color: SAGE, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              ⬠ Send to Lab
            </button>
            <button style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, color: '#C0392B', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              ✕ Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StoryReviewQueue({ onNavigate }: Props) {
  const pending = QUEUE.filter(c => c.status === 'Pending Review' || c.status === 'In Review' || c.status === 'Needs Edits').length

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Review Queue</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>
            <span style={{ color: CLAY, fontWeight: 500 }}>{pending} items pending review</span> · 5 total submissions
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Bulk Actions</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['All', 'Pending Review', 'In Review', 'Needs Edits', 'Approved', 'Rejected'].map((f, i) => (
          <button key={f} style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {f}{i === 1 ? ' (3)' : i === 2 ? ' (1)' : ''}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>All Challenges</option><option>Tifinagh Type Challenge</option><option>Indigo Dye Archive</option><option>Atlas Pattern Remix</option>
        </select>
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>All Types</option><option>Image Series</option><option>Written</option><option>Video</option><option>Photo Essay</option><option>Design</option>
        </select>
      </div>

      {/* Cards */}
      <div>
        {QUEUE.map(c => <ContributionCard key={c.id} c={c} onNavigate={onNavigate} />)}
      </div>
    </div>
  )
}
