import type { Screen } from '../types'
import { useState } from 'react'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

type Action = 'create' | 'update' | 'delete' | 'publish' | 'approve' | 'reject' | 'login' | 'invite'

interface LogEntry {
  id: string
  ts: string
  actor: string
  actorAvatar: string
  action: Action
  entity: string
  entityType: string
  entityId: string
  detail?: string
}

const LOGS: LogEntry[] = [
  { id: 'EVT-00281', ts: '2026-07-09 14:32', actor: 'Amine Karimi', actorAvatar: 'AK', action: 'publish', entity: 'Indigo as Memory', entityType: 'Story', entityId: 'STR-0041', detail: 'Changed status from Draft to Published' },
  { id: 'EVT-00280', ts: '2026-07-09 14:18', actor: 'Sara Berrada', actorAvatar: 'SB', action: 'update', entity: 'Tifinagh Frame Tee', entityType: 'Product', entityId: 'PRD-0014', detail: 'Updated price from €89 to €95' },
  { id: 'EVT-00279', ts: '2026-07-09 13:55', actor: 'Omar Figuigui', actorAvatar: 'OF', action: 'approve', entity: 'Mountain Memory — Azoul mark', entityType: 'Contribution', entityId: 'CTR-0178', detail: 'Moderation decision: Approved' },
  { id: 'EVT-00278', ts: '2026-07-09 13:22', actor: 'Sara Berrada', actorAvatar: 'SB', action: 'create', entity: 'Atlas Pattern Remix', entityType: 'Challenge', entityId: 'CHL-0008', detail: 'Created in Draft status' },
  { id: 'EVT-00277', ts: '2026-07-09 12:14', actor: 'Zineb Haddad', actorAvatar: 'ZH', action: 'update', entity: 'Order #FR-2024-0681', entityType: 'Order', entityId: 'ORD-0681', detail: 'Fulfillment status set to Shipped' },
  { id: 'EVT-00276', ts: '2026-07-09 11:48', actor: 'Omar Figuigui', actorAvatar: 'OF', action: 'reject', entity: 'Off-topic submission', entityType: 'Contribution', entityId: 'CTR-0177', detail: 'Moderation decision: Rejected — not relevant to brief' },
  { id: 'EVT-00275', ts: '2026-07-09 10:33', actor: 'Amine Karimi', actorAvatar: 'AK', action: 'invite', entity: 'leila@izli.co', entityType: 'Team', entityId: 'USR-0005', detail: 'Invited as Content Editor' },
  { id: 'EVT-00274', ts: '2026-07-09 09:55', actor: 'Sara Berrada', actorAvatar: 'SB', action: 'update', entity: 'Echoes of Stone', entityType: 'Collection', entityId: 'COL-0003', detail: 'Updated hero image and intro copy' },
  { id: 'EVT-00273', ts: '2026-07-08 18:20', actor: 'Amine Karimi', actorAvatar: 'AK', action: 'publish', entity: 'Heritage Essentials 01', entityType: 'Collection', entityId: 'COL-0001', detail: 'Changed status from Scheduled to Published' },
  { id: 'EVT-00272', ts: '2026-07-08 17:02', actor: 'Omar Figuigui', actorAvatar: 'OF', action: 'create', entity: 'Mountain Memory Atlas', entityType: 'Lab Project', entityId: 'LAB-0004', detail: 'Created from Challenge CHL-0006 results' },
  { id: 'EVT-00271', ts: '2026-07-08 15:40', actor: 'Amine Karimi', actorAvatar: 'AK', action: 'update', entity: 'Global Settings', entityType: 'Settings', entityId: 'SYS', detail: 'Updated Stripe integration keys' },
  { id: 'EVT-00270', ts: '2026-07-08 14:15', actor: 'Sara Berrada', actorAvatar: 'SB', action: 'delete', entity: 'Draft story (unpublished)', entityType: 'Story', entityId: 'STR-0039', detail: 'Permanently deleted draft — 0 reads' },
  { id: 'EVT-00269', ts: '2026-07-08 11:07', actor: 'Zineb Haddad', actorAvatar: 'ZH', action: 'login', entity: 'zineb@izli.co', entityType: 'Auth', entityId: 'USR-0004', detail: 'Authenticated from Paris, FR' },
  { id: 'EVT-00268', ts: '2026-07-07 16:44', actor: 'Omar Figuigui', actorAvatar: 'OF', action: 'approve', entity: 'Symbol from Agadir region', entityType: 'Contribution', entityId: 'CTR-0175', detail: 'Converted to Story STR-0040' },
]

const ACTION_META: Record<Action, { label: string; bg: string; color: string }> = {
  create:  { label: 'Created',   bg: '#E6EDE8', color: '#4A7A5A' },
  update:  { label: 'Updated',   bg: '#E8EDF3', color: INDIGO },
  delete:  { label: 'Deleted',   bg: '#FDE8E8', color: '#B05050' },
  publish: { label: 'Published', bg: '#EFE8DD', color: CLAY },
  approve: { label: 'Approved',  bg: '#E6EDE8', color: '#4A7A5A' },
  reject:  { label: 'Rejected',  bg: '#FDE8E8', color: '#B05050' },
  login:   { label: 'Login',     bg: '#EDE8DF', color: TEXT_SEC },
  invite:  { label: 'Invited',   bg: '#F3EDE8', color: SAGE },
}

const ENTITY_TYPES = ['All', 'Story', 'Product', 'Collection', 'Contribution', 'Challenge', 'Lab Project', 'Order', 'Settings', 'Auth', 'Team']
const ACTORS = ['All actors', 'Amine Karimi', 'Sara Berrada', 'Omar Figuigui', 'Zineb Haddad']

export default function AuditLog({ onNavigate: _ }: Props) {
  const [entityFilter, setEntityFilter] = useState('All')
  const [actorFilter, setActorFilter] = useState('All actors')
  const [search, setSearch] = useState('')

  const filtered = LOGS.filter(l => {
    if (entityFilter !== 'All' && l.entityType !== entityFilter) return false
    if (actorFilter !== 'All actors' && l.actor !== actorFilter) return false
    if (search && !l.entity.toLowerCase().includes(search.toLowerCase()) && !l.id.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Audit Log</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>System activity timeline — {LOGS.length} events shown</div>
        </div>
        <button style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by entity or ID…"
          style={{ flex: 1, minWidth: 200, padding: '7px 12px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 9, fontSize: 13, color: TEXT, fontFamily: 'Inter, sans-serif', outline: 'none' }}
        />
        <select value={actorFilter} onChange={e => setActorFilter(e.target.value)} style={{ padding: '7px 12px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 9, fontSize: 13, color: TEXT_SEC, fontFamily: 'Inter, sans-serif', appearance: 'none', cursor: 'pointer' }}>
          {ACTORS.map(a => <option key={a}>{a}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ENTITY_TYPES.slice(0, 7).map(t => (
            <button key={t} onClick={() => setEntityFilter(t)} style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${entityFilter === t ? INDIGO : BORDER}`, background: entityFilter === t ? INDIGO : 'transparent', color: entityFilter === t ? '#E7DFD2' : TEXT_SEC, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Log table */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
              {['Time', 'Event ID', 'Actor', 'Action', 'Entity', 'Detail'].map(h => (
                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => {
              const meta = ACTION_META[log.action]
              return (
                <tr key={log.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none', verticalAlign: 'middle' }}>
                  {/* Time */}
                  <td style={{ padding: '13px 20px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEXT_SEC }}>{log.ts.split(' ')[0]}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: TEXT }}>{log.ts.split(' ')[1]}</div>
                  </td>
                  {/* Event ID */}
                  <td style={{ padding: '13px 20px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEXT_SEC }}>{log.id}</span>
                  </td>
                  {/* Actor */}
                  <td style={{ padding: '13px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#E7DFD2', flexShrink: 0 }}>{log.actorAvatar}</div>
                      <span style={{ fontSize: 12, color: TEXT, whiteSpace: 'nowrap' }}>{log.actor}</span>
                    </div>
                  </td>
                  {/* Action */}
                  <td style={{ padding: '13px 20px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: meta.bg, color: meta.color }}>{meta.label}</span>
                  </td>
                  {/* Entity */}
                  <td style={{ padding: '13px 20px' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.entity}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
                      <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>{log.entityType}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TEXT_SEC }}>{log.entityId}</span>
                    </div>
                  </td>
                  {/* Detail */}
                  <td style={{ padding: '13px 20px', maxWidth: 260 }}>
                    <span style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.4 }}>{log.detail}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: TEXT_SEC, fontSize: 13 }}>No events match the current filters.</div>
        )}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <div style={{ fontSize: 12, color: TEXT_SEC }}>Showing {filtered.length} of {LOGS.length} events</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['← Previous', '1', '2', '3', 'Next →'].map((p, i) => (
            <button key={p} style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${i === 1 ? INDIGO : BORDER}`, background: i === 1 ? INDIGO : 'transparent', color: i === 1 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
