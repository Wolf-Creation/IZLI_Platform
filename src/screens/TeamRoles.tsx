import type { Screen } from '../types'
import { useState } from 'react'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

type RoleKey = 'Super Admin' | 'Content Editor' | 'Community Mod' | 'Commerce Manager' | 'Viewer'

const ROLES: { role: RoleKey; desc: string; color: string }[] = [
  { role: 'Super Admin', desc: 'Full access to all screens and destructive actions', color: INDIGO },
  { role: 'Content Editor', desc: 'Create/edit stories, products, collections, site pages', color: CLAY },
  { role: 'Community Mod', desc: 'Moderate contributions, manage members, run challenges', color: SAGE },
  { role: 'Commerce Manager', desc: 'Orders, inventory, customer records, pricing', color: '#506681' },
  { role: 'Viewer', desc: 'Read-only access to analytics and content', color: '#B7AA91' },
]

const MEMBERS = [
  { name: 'Amine Karimi', email: 'amine@izli.co', role: 'Super Admin' as RoleKey, joined: 'Jan 2024', avatar: 'AK', active: true },
  { name: 'Sara Berrada', email: 'sara@izli.co', role: 'Content Editor' as RoleKey, joined: 'Mar 2024', avatar: 'SB', active: true },
  { name: 'Omar Figuigui', email: 'omar@izli.co', role: 'Community Mod' as RoleKey, joined: 'May 2024', avatar: 'OF', active: true },
  { name: 'Zineb Haddad', email: 'zineb@izli.co', role: 'Commerce Manager' as RoleKey, joined: 'Jun 2024', avatar: 'ZH', active: true },
  { name: 'Leila Amrani', email: 'leila@izli.co', role: 'Content Editor' as RoleKey, joined: 'Sep 2024', avatar: 'LA', active: false },
]

const PERMISSION_MAP: Record<RoleKey, Record<string, boolean>> = {
  'Super Admin':       { Dashboard: true, Products: true, Orders: true, Members: true, Challenges: true, Lab: true, Stories: true, Analytics: true, Settings: true },
  'Content Editor':    { Dashboard: true, Products: true, Orders: false, Members: false, Challenges: false, Lab: false, Stories: true, Analytics: true, Settings: false },
  'Community Mod':     { Dashboard: true, Products: false, Orders: false, Members: true, Challenges: true, Lab: true, Stories: true, Analytics: false, Settings: false },
  'Commerce Manager':  { Dashboard: true, Products: true, Orders: true, Members: false, Challenges: false, Lab: false, Stories: false, Analytics: true, Settings: false },
  'Viewer':            { Dashboard: true, Products: false, Orders: false, Members: false, Challenges: false, Lab: false, Stories: false, Analytics: true, Settings: false },
}

const MODULES = ['Dashboard', 'Products', 'Orders', 'Members', 'Challenges', 'Lab', 'Stories', 'Analytics', 'Settings']

function RoleChip({ role }: { role: RoleKey }) {
  const r = ROLES.find(r => r.role === role)
  return <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: `${r?.color}22`, color: r?.color, border: `1px solid ${r?.color}44` }}>{role}</span>
}

export default function TeamRoles({ onNavigate: _ }: Props) {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('Super Admin')

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Team & Roles</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>5 team members · 5 roles</div>
        </div>
        <button style={{ background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          + Invite Member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Team members table */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>Team Members</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
                  {['Member', 'Role', 'Status', 'Joined', ''].map((h, j) => (
                    <th key={j} style={{ padding: '9px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MEMBERS.map((m, i) => (
                  <tr key={i} style={{ borderBottom: i < MEMBERS.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                    <td style={{ padding: '13px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 999, background: m.active ? INDIGO : '#B7AA91', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#E7DFD2', flexShrink: 0 }}>{m.avatar}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{m.name}</div>
                          <div style={{ fontSize: 11, color: TEXT_SEC }}>{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '13px 20px' }}><RoleChip role={m.role} /></td>
                    <td style={{ padding: '13px 20px' }}>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: m.active ? '#E6EDE8' : '#EDE8DF', color: m.active ? '#4A7A5A' : TEXT_SEC, fontWeight: 500 }}>
                        {m.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '13px 20px', fontSize: 12, color: TEXT_SEC }}>{m.joined}</td>
                    <td style={{ padding: '13px 20px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={{ padding: '4px 10px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 7, fontSize: 11, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Edit</button>
                        <button style={{ padding: '4px 10px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: 7, fontSize: 11, color: '#B05050', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Permissions matrix */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>Permissions by Role</div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead>
                  <tr style={{ background: '#EFE8DD', borderBottom: `1px solid ${BORDER}` }}>
                    <th style={{ padding: '9px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC, minWidth: 140 }}>Module</th>
                    {ROLES.map(r => (
                      <th key={r.role} style={{ padding: '9px 14px', textAlign: 'center', fontSize: 10, fontWeight: 600, color: r.color, whiteSpace: 'nowrap' }}>{r.role}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MODULES.map((mod, i) => (
                    <tr key={mod} style={{ borderBottom: i < MODULES.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                      <td style={{ padding: '11px 20px', fontSize: 13, fontWeight: 500, color: TEXT }}>{mod}</td>
                      {ROLES.map(r => (
                        <td key={r.role} style={{ padding: '11px 14px', textAlign: 'center' }}>
                          <span style={{ fontSize: 16, color: PERMISSION_MAP[r.role][mod] ? '#4A7A5A' : '#D8D0C4' }}>
                            {PERMISSION_MAP[r.role][mod] ? '✓' : '—'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Role detail */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: INDIGO }}>Role Detail</div>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ROLES.map(r => (
                <button key={r.role}
                  onClick={() => setSelectedRole(r.role)}
                  style={{ padding: '10px 12px', borderRadius: 12, border: `1px solid ${selectedRole === r.role ? r.color : BORDER}`, background: selectedRole === r.role ? `${r.color}12` : 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: r.color }}>{r.role}</div>
                  <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dark invite panel */}
          <div style={{ background: INDIGO, borderRadius: 20, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: '#E7DFD2', marginBottom: 12 }}>Invite a Team Member</div>
            <input type="email" placeholder="Email address" style={{ width: '100%', padding: '9px 12px', background: 'rgba(231,223,210,0.08)', border: '1px solid rgba(231,223,210,0.2)', borderRadius: 10, color: '#E7DFD2', fontSize: 12, marginBottom: 10, boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
            <select style={{ width: '100%', padding: '9px 12px', background: 'rgba(231,223,210,0.08)', border: '1px solid rgba(231,223,210,0.2)', borderRadius: 10, color: '#E7DFD2', fontSize: 12, marginBottom: 12, boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', appearance: 'none' }}>
              {ROLES.map(r => <option key={r.role} value={r.role} style={{ background: INDIGO }}>{r.role}</option>)}
            </select>
            <button style={{ width: '100%', padding: '10px', background: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, color: INDIGO, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Send Invitation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
