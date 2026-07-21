import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const SURFACE_2 = '#EFE8DD'
const CREAM = '#E7DFD2'

type InvStatus = 'Accepted' | 'Pending' | 'Expired'
type FilterType = 'All' | 'Pending' | 'Accepted' | 'Expired'

interface Invitation {
  id: number
  keeper: string
  initials: string
  code: string
  invitee: string
  status: InvStatus
  sent: string
  accepted: string
  action: string
}

const invitations: Invitation[] = [
  { id: 1, keeper: 'Karim Lounis', initials: 'KL', code: 'IZLI-KAR-X91', invitee: 'farida@—', status: 'Accepted', sent: '10 Jun 2026', accepted: '12 Jun 2026', action: 'View' },
  { id: 2, keeper: 'Youcef Benali', initials: 'YB', code: 'IZLI-YOU-B42', invitee: 'mehdi@—', status: 'Accepted', sent: '8 Jun 2026', accepted: '10 Jun 2026', action: 'View' },
  { id: 3, keeper: 'Farida Oussama', initials: 'FO', code: 'IZLI-FAR-C77', invitee: 'ines@—', status: 'Pending', sent: '5 Jul 2026', accepted: '', action: 'Resend' },
  { id: 4, keeper: 'Mehdi Aït Mansour', initials: 'MA', code: 'IZLI-MEH-D13', invitee: 'sonia@—', status: 'Accepted', sent: '1 Jun 2026', accepted: '3 Jun 2026', action: 'View' },
  { id: 5, keeper: 'Riad Mansouri', initials: 'RM', code: 'IZLI-RIA-F55', invitee: 'amira@—', status: 'Expired', sent: '1 Apr 2026', accepted: '', action: '' },
  { id: 6, keeper: 'Ines Chaoui', initials: 'IC', code: 'IZLI-INE-G88', invitee: 'riad@—', status: 'Pending', sent: '12 Jul 2026', accepted: '', action: 'Resend' },
  { id: 7, keeper: 'Youcef Benali', initials: 'YB', code: 'IZLI-YOU-B42', invitee: 'karim@—', status: 'Accepted', sent: '20 May 2026', accepted: '22 May 2026', action: 'View' },
  { id: 8, keeper: 'Karim Lounis', initials: 'KL', code: 'IZLI-KAR-X91', invitee: 'fouad@—', status: 'Pending', sent: '14 Jul 2026', accepted: '', action: 'Resend' },
]

const statusStyle = (s: InvStatus): React.CSSProperties => {
  if (s === 'Accepted') return { background: '#E6EDE8', color: '#4A7A5A' }
  if (s === 'Pending') return { background: SURFACE_2, color: CLAY }
  return { background: BG, color: TEXT_SEC }
}

const colTemplate = '48px 2fr 160px 120px 110px 100px 90px 80px'

export default function LegacyInvitations({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [search, setSearch] = useState('')

  const filters: FilterType[] = ['All', 'Pending', 'Accepted', 'Expired']

  const filtered = invitations.filter(inv => {
    const matchFilter = activeFilter === 'All' || inv.status === activeFilter
    const matchSearch = inv.keeper.toLowerCase().includes(search.toLowerCase()) || inv.code.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const kpis = [
    { label: 'Sent', value: '2,841' },
    { label: 'Accepted', value: '1,204' },
    { label: 'Converted to Keeper', value: '892' },
  ]

  const headerCells = ['', 'Keeper', 'Referral Code', 'Invitee', 'Status', 'Sent', 'Accepted', 'Actions']

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto', fontFamily: 'Inter, sans-serif', fontSize: 13, color: TEXT, background: BG, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 500, color: INDIGO, margin: 0 }}>Invitations</h1>
          <p style={{ color: TEXT_SEC, marginTop: 6, marginBottom: 0 }}>2,841 invitations sent · 1,204 accepted · 42% conversion</p>
        </div>
        <button style={{ background: 'transparent', color: INDIGO, border: `1.5px solid ${INDIGO}`, borderRadius: 8, padding: '9px 18px', fontSize: 13, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
          Export
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: INDIGO }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Filter toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? INDIGO : 'transparent', color: activeFilter === f ? CREAM : TEXT_SEC, border: 'none', borderRadius: 6, padding: '5px 14px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
              {f}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search keeper or code…"
          style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: '8px 14px', fontSize: 13, fontFamily: 'Inter, sans-serif', background: SURFACE, color: TEXT, outline: 'none', width: 240 }}
        />
      </div>

      {/* Table */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: colTemplate, padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, background: SURFACE_2 }}>
          {headerCells.map((h, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>

        {filtered.map((inv, idx) => (
          <div key={inv.id} style={{ display: 'grid', gridTemplateColumns: colTemplate, padding: '13px 20px', borderBottom: idx < filtered.length - 1 ? `1px solid ${BORDER}` : 'none', alignItems: 'center' }}>
            {/* Avatar */}
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: INDIGO, color: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
              {inv.initials}
            </div>

            {/* Keeper */}
            <div style={{ fontWeight: 500, color: TEXT }}>{inv.keeper}</div>

            {/* Referral code */}
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: CLAY }}>{inv.code}</div>

            {/* Invitee */}
            <div style={{ fontSize: 12, color: TEXT_SEC }}>{inv.invitee}</div>

            {/* Status */}
            <div>
              <span style={{ ...statusStyle(inv.status), borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{inv.status}</span>
            </div>

            {/* Sent */}
            <div style={{ fontSize: 12, color: TEXT_SEC }}>{inv.sent}</div>

            {/* Accepted */}
            <div style={{ fontSize: 12, color: TEXT_SEC }}>{inv.accepted || '—'}</div>

            {/* Action */}
            <div>
              {inv.action ? (
                <button style={{ background: inv.action === 'View' ? INDIGO : 'transparent', color: inv.action === 'View' ? CREAM : CLAY, border: inv.action === 'Resend' ? `1px solid ${CLAY}` : 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 500 }}>
                  {inv.action}
                </button>
              ) : <span style={{ color: TEXT_SEC }}>—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
