import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Published': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Draft': { bg: '#EDE8DF', color: TEXT_SEC },
    'In Review': { bg: '#FDF8EC', color: '#A07820' },
    'Scheduled': { bg: '#E8EDF3', color: INDIGO },
    'Archived': { bg: '#EEE', color: '#999' },
  }
  const s = map[status] ?? map['Draft']
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

function TypeChip({ type }: { type: string }) {
  const editorial = type === 'Editorial'
  return (
    <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: editorial ? '#EFE8DD' : '#E8EDF3', color: editorial ? '#8C6B52' : INDIGO, fontWeight: 500 }}>
      {type}
    </span>
  )
}

const STORIES = [
  { title: 'The Meaning of the Shoulder Motif', type: 'Editorial', universe: 'Heritage', author: 'Amine Kherrab', status: 'Published', reads: '3.8K', date: '2 Jul 2026', img: 'photo-1521572163474-6864f9cf17ab' },
  { title: 'Indigo as Memory', type: 'Editorial', universe: 'Heritage', author: 'Amine Kherrab', status: 'Published', reads: '3.1K', date: '18 Jun 2026', img: 'photo-1490481651871-ab68de25d43d' },
  { title: 'Symbols Carried in Cloth', type: 'Editorial', universe: 'Heritage', author: 'Lina Meziane', status: 'Published', reads: '2.4K', date: '4 Jun 2026', img: 'photo-1469334031218-e382a71b716b' },
  { title: 'From Contribution to Capsule', type: 'Community', universe: 'Community Lab', author: 'Youcef Benali', status: 'Published', reads: '1.2K', date: '28 May 2026', img: 'photo-1518611012118-696072aa579a' },
  { title: 'The Geometry of Tifinagh', type: 'Editorial', universe: 'Heritage', author: 'Amine Kherrab', status: 'Published', reads: '4.2K', date: '12 May 2026', img: 'photo-1516762689617-e1cffcef479d' },
  { title: 'Atlas Patterns: A Field Study', type: 'Editorial', universe: 'Essentials', author: 'Lina Meziane', status: 'Draft', reads: '—', date: '8 Jul 2026', img: 'photo-1503341504253-dff4815485f1' },
  { title: 'Woven in Studio', type: 'Community', universe: 'Studio', author: 'Amira Saïdi', status: 'In Review', reads: '—', date: '7 Jul 2026', img: 'photo-1523381210434-271e8be1f52b' },
  { title: 'The Community Manifesto', type: 'Editorial', universe: 'Community', author: 'Amine Kherrab', status: 'Scheduled', reads: '—', date: '15 Jul 2026', img: 'photo-1618354691373-d851c5c3a990' },
]

const FILTERS_TYPE = ['All Types', 'Editorial', 'Community']
const FILTERS_STATUS = ['All Status', 'Published', 'Draft', 'In Review', 'Scheduled', 'Archived']

export default function StoriesList({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Stories</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>8 stories · 5 published · 3 in progress</div>
        </div>
        <button onClick={() => onNavigate('story-editor')}
          style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          + Create Story
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {FILTERS_TYPE.map((f, i) => (
            <button key={f} style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '7px 12px', width: 200 }}>
          <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
          <input placeholder="Search stories..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }} />
        </div>
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          {FILTERS_STATUS.map(f => <option key={f}>{f}</option>)}
        </select>
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>All Authors</option><option>Amine Kherrab</option><option>Lina Meziane</option><option>Youcef Benali</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
              <th style={{ width: 40, padding: '12px 20px' }}><input type="checkbox" /></th>
              {['Story', 'Type', 'Universe', 'Author', 'Status', 'Reads', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STORIES.map((s, i) => (
              <tr key={i}
                style={{ borderBottom: i < STORIES.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onClick={() => onNavigate('story-editor')}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
              >
                <td style={{ padding: '13px 20px' }} onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 52, borderRadius: 8, overflow: 'hidden', background: '#EDE8DF', flexShrink: 0 }}>
                      <img src={`https://images.unsplash.com/${s.img}?w=88&h=104&fit=crop&auto=format`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, lineHeight: 1.3 }}>{s.title}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '13px 16px' }}><TypeChip type={s.type} /></td>
                <td style={{ padding: '13px 16px' }}><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#EDE8DF', color: TEXT_SEC }}>{s.universe}</span></td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: TEXT_SEC }}>{s.author}</td>
                <td style={{ padding: '13px 16px' }}><StatusChip status={s.status} /></td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: TEXT_SEC, fontFamily: "'JetBrains Mono', monospace" }}>{s.reads}</td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: TEXT_SEC, whiteSpace: 'nowrap' }}>{s.date}</td>
                <td style={{ padding: '13px 16px' }}>
                  <button onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: TEXT_SEC, background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>···</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
