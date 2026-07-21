import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'

interface Props { onNavigate: (s: Screen) => void }

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Pending Review': { bg: '#FDF8EC', color: '#A07820' },
    'Approved': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Published': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Needs Edits': { bg: '#FDF3EC', color: '#A06030' },
    'Rejected': { bg: '#FDECEC', color: '#A02020' },
    'In Review': { bg: '#E8EDF3', color: INDIGO },
    'Selected': { bg: '#EFE8DD', color: CLAY },
  }
  const s = map[status] ?? { bg: '#EDE8DF', color: TEXT_SEC }
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

const CONTRIBUTIONS = [
  { id: 'CON-0501', title: 'Tifinagh letterforms — personal study', type: 'Image Series', author: 'Amira Saïdi', avatar: 'AS', challenge: 'Tifinagh Type Challenge', status: 'Pending Review', submitted: '8 Jul 2026', img: 'photo-1516762689617-e1cffcef479d' },
  { id: 'CON-0500', title: 'Woven memory, unravelled thread', type: 'Written', author: 'Omar Hamdouchi', avatar: 'OH', challenge: 'Indigo Dye Archive', status: 'Needs Edits', submitted: '7 Jul 2026', img: 'photo-1490481651871-ab68de25d43d' },
  { id: 'CON-0498', title: 'Atlas geometry in motion', type: 'Video', author: 'Youcef Benali', avatar: 'YB', challenge: 'Atlas Pattern Remix', status: 'In Review', submitted: '6 Jul 2026', img: 'photo-1523381210434-271e8be1f52b' },
  { id: 'CON-0494', title: 'The indigo merchant — photo essay', type: 'Photo Essay', author: 'Lina Meziane', avatar: 'LM', challenge: 'Indigo Dye Archive', status: 'Published', submitted: '4 Jul 2026', img: 'photo-1469334031218-e382a71b716b' },
  { id: 'CON-0490', title: 'Community uniform concept', type: 'Design', author: 'Karim Ouali', avatar: 'KO', challenge: 'Community Lab Open Call', status: 'Selected', submitted: '2 Jul 2026', img: 'photo-1503341504253-dff4815485f1' },
  { id: 'CON-0484', title: 'Geometry of the weave', type: 'Image Series', author: 'Nour Amazigh', avatar: 'NA', challenge: 'Atlas Pattern Remix', status: 'Approved', submitted: '28 Jun 2026', img: 'photo-1618354691373-d851c5c3a990' },
  { id: 'CON-0481', title: 'Heritage thread study vol. 2', type: 'Written', author: 'Youcef Benali', avatar: 'YB', challenge: 'Indigo Dye Archive', status: 'Approved', submitted: '22 Jun 2026', img: 'photo-1489987707025-afc232f7ea0f' },
  { id: 'CON-0472', title: 'Symbol drift: from stone to screen', type: 'Design', author: 'Amira Saïdi', avatar: 'AS', challenge: 'Tifinagh Type Challenge', status: 'Rejected', submitted: '18 Jun 2026', img: 'photo-1558618666-fcd25c85cd64' },
]

const FILTERS = ['All', 'Pending Review', 'In Review', 'Approved', 'Published', 'Needs Edits', 'Rejected']

export default function ContributionsList({ onNavigate }: Props) {
  const pending = CONTRIBUTIONS.filter(c => c.status === 'Pending Review' || c.status === 'In Review').length

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Contributions</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>
            342 total · <span style={{ color: CLAY, fontWeight: 500 }}>{pending} awaiting review</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('story-review')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Open Review Queue →</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {FILTERS.map((f, i) => (
            <button key={f} style={{ padding: '5px 11px', borderRadius: 8, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '7px 12px', width: 200 }}>
          <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
          <input placeholder="Search contributions..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }} />
        </div>
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>All Challenges</option><option>Tifinagh Type Challenge</option><option>Indigo Dye Archive</option><option>Atlas Pattern Remix</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
              <th style={{ width: 40, padding: '12px 20px' }}><input type="checkbox" /></th>
              {['Contribution', 'Type', 'Author', 'Challenge', 'Status', 'Submitted', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CONTRIBUTIONS.map((c, i) => (
              <tr key={i}
                style={{ borderBottom: i < CONTRIBUTIONS.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onClick={() => onNavigate('contribution-detail')}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
              >
                <td style={{ padding: '13px 20px' }} onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 52, borderRadius: 8, overflow: 'hidden', background: '#EDE8DF', flexShrink: 0 }}>
                      <img src={`https://images.unsplash.com/${c.img}?w=88&h=104&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TEXT_SEC, marginBottom: 2 }}>{c.id}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{c.title}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '13px 16px' }}><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC }}>{c.type}</span></td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#E7DFD2' }}>{c.avatar}</div>
                    <span style={{ fontSize: 12, color: TEXT }}>{c.author}</span>
                  </div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: INDIGO, fontWeight: 500 }}>{c.challenge}</td>
                <td style={{ padding: '13px 16px' }}><StatusChip status={c.status} /></td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: TEXT_SEC, whiteSpace: 'nowrap' }}>{c.submitted}</td>
                <td style={{ padding: '13px 16px' }} onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ fontSize: 11, color: '#4A7A5A', background: '#E6EDE8', border: 'none', borderRadius: 7, padding: '4px 9px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>✓</button>
                    <button style={{ fontSize: 11, color: TEXT_SEC, background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 9px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>···</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
