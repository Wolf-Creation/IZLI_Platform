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
    'In Progress': { bg: '#E8EDF3', color: INDIGO },
    'Draft': { bg: '#EDE8DF', color: TEXT_SEC },
    'Completed': { bg: '#EFE8DD', color: CLAY },
    'Paused': { bg: '#FDF8EC', color: '#A07820' },
  }
  const s = map[status] ?? { bg: '#EDE8DF', color: TEXT_SEC }
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

const PROJECTS = [
  {
    name: 'Mountain Memory Atlas',
    status: 'Active',
    participants: 8,
    contributions: 34,
    outputs: ['Story Draft', 'Archive'],
    milestone: 'Editorial review — Aug 2026',
    challengeSource: 'Atlas Pattern Remix',
    img: 'photo-1469334031218-e382a71b716b',
    updated: '8 Jul 2026',
    desc: 'A collaborative atlas of mountain marks, patterns and symbols gathered by community members across the Atlas range.',
  },
  {
    name: 'Community Symbol Archive',
    status: 'In Progress',
    participants: 12,
    contributions: 56,
    outputs: ['Digital Archive', 'Story'],
    milestone: 'Submission close — Sep 2026',
    challengeSource: 'Archive a Symbol from Your Region',
    img: 'photo-1516762689617-e1cffcef479d',
    updated: '5 Jul 2026',
    desc: 'A living archive of Amazigh symbols contributed by community members. Organized by region, type, and material application.',
  },
  {
    name: 'Indigo Story Capsule',
    status: 'In Progress',
    participants: 6,
    contributions: 18,
    outputs: ['Collection Research', 'Story'],
    milestone: 'First draft — Oct 2026',
    challengeSource: 'Indigo Dye Archive',
    img: 'photo-1490481651871-ab68de25d43d',
    updated: '2 Jul 2026',
    desc: 'A collaborative story and product research capsule exploring the cultural history of indigo dyeing in North Africa.',
  },
  {
    name: 'Oral Memory to Garment Project',
    status: 'Draft',
    participants: 0,
    contributions: 0,
    outputs: ['Product Research'],
    milestone: 'Launch — Sep 2026',
    challengeSource: 'Tell the Story Behind a Family Object',
    img: 'photo-1521572163474-6864f9cf17ab',
    updated: '28 Jun 2026',
    desc: 'Translating oral family memory into garment design language — a community-led research process for an upcoming collection.',
  },
]

export default function LabProjectsList({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Community Lab</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>4 projects · 26 participants · 108 linked contributions</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('calls-for-contribution')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Open Calls →</button>
          <button onClick={() => onNavigate('lab-project-editor')}
            style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            + New Project
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Active Projects', value: '3', accent: INDIGO },
          { label: 'Total Participants', value: '26', accent: SAGE },
          { label: 'Linked Contributions', value: '108', accent: CLAY },
          { label: 'Stories Generated', value: '4', accent: TEXT_SEC },
        ].map((k, i) => (
          <div key={i} style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 18, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: k.accent, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        {['All', 'Active', 'In Progress', 'Draft', 'Completed'].map((f, i) => (
          <button key={f} style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>
        ))}
      </div>

      {/* Project cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {PROJECTS.map((p, i) => (
          <div key={i}
            style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onClick={() => onNavigate('lab-project-editor')}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(30,47,68,0.08)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex' }}>
              {/* Cover */}
              <div style={{ width: 120, minWidth: 120, background: '#EDE8DF', overflow: 'hidden' }}>
                <img src={`https://images.unsplash.com/${p.img}?w=160&h=180&fit=crop&auto=format`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              {/* Content */}
              <div style={{ flex: 1, padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</div>
                  </div>
                  <StatusChip status={p.status} />
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 24, marginBottom: 14 }}>
                  {[
                    { label: 'Participants', value: p.participants },
                    { label: 'Contributions', value: p.contributions },
                  ].map((s, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: INDIGO, fontFamily: "'Playfair Display', serif" }}>{s.value}</span>
                      <span style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {p.outputs.map(o => <span key={o} style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: '#EFE8DD', color: CLAY, fontWeight: 500 }}>{o}</span>)}
                  </div>
                </div>

                {/* Source + milestone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, color: TEXT_SEC }}>From challenge:</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: INDIGO }}>◇ {p.challengeSource}</span>
                  </div>
                  <span style={{ width: 1, height: 14, background: BORDER }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, color: TEXT_SEC }}>Next milestone:</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{p.milestone}</span>
                  </div>
                  <span style={{ width: 1, height: 14, background: BORDER }} />
                  <span style={{ fontSize: 11, color: TEXT_SEC }}>Updated {p.updated}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
