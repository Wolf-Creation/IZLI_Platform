import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'

interface Props { onNavigate: (s: Screen) => void }

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Active': { bg: '#E6EDE8', color: '#4A7A5A' },
    'New': { bg: '#E8EDF3', color: INDIGO },
    'Paused': { bg: '#EDE8DF', color: TEXT_SEC },
    'Flagged': { bg: '#FDECEC', color: '#A02020' },
  }
  const s = map[status] ?? { bg: '#EDE8DF', color: TEXT_SEC }
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>{status}</span>
}

function LevelBadge({ level }: { level: number }) {
  const colors = ['', '#B7AA91', '#7D8470', '#506681', '#1E2F44', '#8C6B52']
  return (
    <div style={{ width: 22, height: 22, borderRadius: 999, background: colors[level] ?? '#B7AA91', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#F5F1EA' }}>
      {level}
    </div>
  )
}

const MEMBERS = [
  { name: 'Youcef Benali', handle: '@youcef.benali', avatar: 'YB', level: 4, badges: ['◈', '◇', '⬡'], contributions: 22, challenges: 5, orders: 3, status: 'Active', joined: 'Jan 2024' },
  { name: 'Amira Saïdi', handle: '@amira.saidi', avatar: 'AS', level: 3, badges: ['◈', '◫'], contributions: 14, challenges: 3, orders: 1, status: 'Active', joined: 'Mar 2024' },
  { name: 'Mehdi Aït Mansour', handle: '@mehdi.ait', avatar: 'MA', level: 3, badges: ['◈', '⬡'], contributions: 10, challenges: 2, orders: 8, status: 'Active', joined: 'Feb 2024' },
  { name: 'Lina Meziane', handle: '@lina.mez', avatar: 'LM', level: 5, badges: ['◈', '◇', '◫', '⬠'], contributions: 38, challenges: 7, orders: 4, status: 'Active', joined: 'Sep 2023' },
  { name: 'Omar Hamdouchi', handle: '@omar.h', avatar: 'OH', level: 2, badges: ['◈'], contributions: 6, challenges: 2, orders: 0, status: 'Active', joined: 'May 2024' },
  { name: 'Karim Ouali', handle: '@karim.o', avatar: 'KO', level: 2, badges: ['◈'], contributions: 5, challenges: 1, orders: 2, status: 'New', joined: 'Jun 2024' },
  { name: 'Sarah El Fassi', handle: '@sarah.ef', avatar: 'SE', level: 1, badges: [], contributions: 1, challenges: 0, orders: 1, status: 'New', joined: 'Jul 2024' },
  { name: 'Nour Amazigh', handle: '@nour.amazigh', avatar: 'NA', level: 3, badges: ['◈', '◇'], contributions: 12, challenges: 4, orders: 0, status: 'Paused', joined: 'Nov 2023' },
]

const LEVEL_FILTERS = ['All Levels', 'Level 5', 'Level 4', 'Level 3', 'Level 2', 'Level 1']

export default function MembersList({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Members</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>8,420 active members · 183 new this month</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Export</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {LEVEL_FILTERS.map((f, i) => (
            <button key={f} style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '7px 12px', width: 200 }}>
          <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
          <input placeholder="Search members..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }} />
        </div>
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>All Status</option><option>Active</option><option>New</option><option>Paused</option><option>Flagged</option>
        </select>
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>Activity: All</option><option>Most contributions</option><option>Most orders</option><option>Recently joined</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
              <th style={{ width: 40, padding: '12px 20px' }}><input type="checkbox" /></th>
              {['Member', 'Level', 'Badges', 'Contributions', 'Challenges', 'Orders', 'Status', 'Joined', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((m, i) => (
              <tr key={i}
                style={{ borderBottom: i < MEMBERS.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onClick={() => onNavigate('member-profile')}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
              >
                <td style={{ padding: '13px 20px' }} onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#E7DFD2', flexShrink: 0 }}>{m.avatar}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: TEXT_SEC }}>{m.handle}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '13px 16px' }}><LevelBadge level={m.level} /></td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {m.badges.map((b, j) => (
                      <span key={j} style={{ fontSize: 14, color: CLAY }}>{b}</span>
                    ))}
                    {m.badges.length === 0 && <span style={{ fontSize: 11, color: '#B7AA91' }}>—</span>}
                  </div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 500, color: TEXT, fontFamily: "'JetBrains Mono', monospace" }}>{m.contributions}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: TEXT_SEC, fontFamily: "'JetBrains Mono', monospace" }}>{m.challenges}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: TEXT_SEC, fontFamily: "'JetBrains Mono', monospace" }}>{m.orders}</td>
                <td style={{ padding: '13px 16px' }}><StatusChip status={m.status} /></td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: TEXT_SEC }}>{m.joined}</td>
                <td style={{ padding: '13px 16px' }}>
                  <button onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: TEXT_SEC, background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 7, padding: '4px 10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>···</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <div style={{ fontSize: 12, color: TEXT_SEC }}>Showing 8 of 8,420 members</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['←', '1', '2', '3', '...', '→'].map((p, i) => (
            <button key={i} style={{ minWidth: 32, height: 32, padding: '0 6px', borderRadius: 8, border: `1px solid ${i === 1 ? INDIGO : BORDER}`, background: i === 1 ? INDIGO : 'transparent', color: i === 1 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
