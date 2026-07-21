import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Active': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Open': { bg: '#E8EDF3', color: INDIGO },
    'Draft': { bg: '#EDE8DF', color: TEXT_SEC },
    'Closed': { bg: '#EEE', color: '#888' },
    'Completed': { bg: '#EFE8DD', color: CLAY },
    'Paused': { bg: '#FDF8EC', color: '#A07820' },
  }
  const s = map[status] ?? { bg: '#EDE8DF', color: TEXT_SEC }
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

const CHALLENGES = [
  { title: 'Tifinagh Type Challenge', type: 'Typography', submissions: 142, status: 'Active', open: '1 May 2026', close: '31 Aug 2026', img: 'photo-1516762689617-e1cffcef479d', outputs: 'Story + Lab Project' },
  { title: 'Indigo Dye Archive', type: 'Documentary', submissions: 88, status: 'Active', open: '15 Apr 2026', close: '15 Sep 2026', img: 'photo-1490481651871-ab68de25d43d', outputs: 'Story' },
  { title: 'Archive a Symbol from Your Region', type: 'Cultural Archive', submissions: 67, status: 'Active', open: '1 Jun 2026', close: '30 Sep 2026', img: 'photo-1469334031218-e382a71b716b', outputs: 'Community Highlight' },
  { title: 'Reinterpret a Mountain Mark', type: 'Visual Art', submissions: 34, status: 'Open', open: '1 Jul 2026', close: '31 Oct 2026', img: 'photo-1503341504253-dff4815485f1', outputs: 'Lab Project' },
  { title: 'Tell the Story Behind a Family Object', type: 'Narrative', submissions: 21, status: 'Open', open: '9 Jul 2026', close: '9 Nov 2026', img: 'photo-1521572163474-6864f9cf17ab', outputs: 'Story' },
  { title: 'Build a Shared Heritage Moodboard', type: 'Collaborative', submissions: 0, status: 'Draft', open: '—', close: '—', img: 'photo-1618354691373-d851c5c3a990', outputs: 'Community Highlight' },
  { title: 'Atlas Pattern Remix', type: 'Design', submissions: 203, status: 'Completed', open: '1 Jan 2026', close: '30 Apr 2026', img: 'photo-1523381210434-271e8be1f52b', outputs: 'Story + Product Research' },
]

const TYPES = ['All', 'Typography', 'Documentary', 'Cultural Archive', 'Visual Art', 'Narrative', 'Design', 'Collaborative']

export default function ChallengesList({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Challenges</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>7 challenges · 555 total submissions · 3 active</div>
        </div>
        <button onClick={() => onNavigate('challenge-editor')}
          style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          + Create Challenge
        </button>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total Submissions', value: '555', delta: '+88 this month', accent: INDIGO },
          { label: 'Active Challenges', value: '3', delta: '2 open', accent: CLAY },
          { label: 'Avg. Submissions', value: '79', delta: 'per challenge', accent: SAGE },
          { label: 'Converted to Story', value: '12', delta: 'all time', accent: TEXT_SEC },
        ].map((k, i) => (
          <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 18, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: k.accent, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 6 }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '12px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {['All Status', 'Active', 'Open', 'Draft', 'Completed', 'Closed'].map((f, i) => (
            <button key={f} style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          {TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '7px 12px', width: 190 }}>
          <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
          <input placeholder="Search challenges..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }} />
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {CHALLENGES.map((c, i) => (
          <div key={i}
            style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onClick={() => onNavigate('challenge-editor')}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(30,47,68,0.09)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', gap: 0 }}>
              {/* Cover */}
              <div style={{ width: 100, minWidth: 100, background: '#EDE8DF', overflow: 'hidden' }}>
                <img src={`https://images.unsplash.com/${c.img}?w=140&h=160&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              {/* Content */}
              <div style={{ flex: 1, padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC }}>{c.type}</span>
                      <StatusChip status={c.status} />
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: TEXT, lineHeight: 1.3 }}>{c.title}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Submissions</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: INDIGO, fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>{c.submissions}</div>
                  </div>
                  <div style={{ width: 1, background: BORDER }} />
                  <div>
                    <div style={{ fontSize: 10, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Closes</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginTop: 2 }}>{c.close}</div>
                  </div>
                  <div style={{ width: 1, background: BORDER }} />
                  <div>
                    <div style={{ fontSize: 10, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Outputs</div>
                    <div style={{ fontSize: 12, color: CLAY, marginTop: 2, fontWeight: 500 }}>{c.outputs}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={e => { e.stopPropagation(); onNavigate('challenge-submissions') }}
                    style={{ padding: '5px 12px', background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 11, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    View Submissions →
                  </button>
                  <button onClick={e => { e.stopPropagation(); onNavigate('challenge-editor') }}
                    style={{ padding: '5px 12px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 11, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Edit
                  </button>
                  {c.status === 'Completed' && (
                    <button onClick={e => { e.stopPropagation(); onNavigate('challenge-results') }}
                      style={{ padding: '5px 12px', background: '#E8EDF3', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 11, color: INDIGO, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                      Results
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
