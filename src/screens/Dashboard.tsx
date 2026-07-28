import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props {
  onNavigate: (s: Screen) => void
  onCreateProduct: () => void
  onEditProduct: (id: string) => void
}

function KpiCard({ label, value, delta, context, accent }: { label: string; value: string; delta: string; context: string; accent?: string }) {
  const up = delta.startsWith('+')
  return (
    <div style={{
      background: '#F5F1EA',
      border: `1px solid ${BORDER}`,
      borderRadius: 20,
      padding: '24px 24px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_SEC }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 500, color: accent ?? INDIGO, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: up ? SAGE : CLAY }}>{delta}</span>
        <span style={{ fontSize: 12, color: TEXT_SEC }}>{context}</span>
      </div>
    </div>
  )
}

function ActivityItem({ time, action, entity, user }: { time: string; action: string; entity: string; user: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ width: 32, height: 32, borderRadius: 999, background: '#EDE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: TEXT_SEC, flexShrink: 0 }}>
        {user.split(' ').map(w => w[0]).join('').slice(0, 2)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: TEXT }}>
          <span style={{ fontWeight: 500 }}>{user}</span> {action} <span style={{ fontWeight: 500, color: INDIGO }}>{entity}</span>
        </div>
        <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>{time}</div>
      </div>
    </div>
  )
}

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Published': { bg: '#E6EDE8', color: '#4A7A5A' },
    'Draft': { bg: '#EDE8DF', color: TEXT_SEC },
    'Active': { bg: '#E8EDF3', color: INDIGO },
    'Archived': { bg: '#EEE', color: '#999' },
  }
  const s = map[status] ?? map['Draft']
  return (
    <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: s.bg, color: s.color }}>
      {status}
    </span>
  )
}

export default function Dashboard({ onNavigate, onCreateProduct, onEditProduct }: Props) {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 500, color: INDIGO, letterSpacing: '-0.01em' }}>
          Good morning, Amine.
        </div>
        <div style={{ fontSize: 15, color: TEXT_SEC, marginTop: 6 }}>
          Here's what's happening across IZLI today — Wednesday, 9 July 2026.
        </div>
      </div>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <KpiCard label="Revenue MTD" value="€48,320" delta="+12.4%" context="vs last month" />
        <KpiCard label="Orders" value="214" delta="+8.1%" context="this month" />
        <KpiCard label="New Members" value="1,840" delta="+22%" context="this month" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        <KpiCard label="Active Challenges" value="6" delta="+2" context="vs last month" accent={CLAY} />
        <KpiCard label="Published Stories" value="18" delta="+5" context="this month" accent={SAGE} />
        <KpiCard label="Lab Projects" value="3" delta="new" context="this cycle" accent={TEXT_SEC} />
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Top Collections */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: INDIGO }}>Top Collections</div>
              <button onClick={() => onNavigate('collections')} style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#EFE8DD' }}>
                  {['Collection', 'Products', 'Revenue', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 24px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Echoes of Stone', products: 14, revenue: '€18,240', status: 'Published' },
                  { name: 'Indigo Memory', products: 9, revenue: '€12,800', status: 'Published' },
                  { name: 'Atlas Marks', products: 7, revenue: '€8,450', status: 'Active' },
                  { name: 'Heritage Essentials 01', products: 12, revenue: '€6,120', status: 'Draft' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 500, color: TEXT }}>{row.name}</td>
                    <td style={{ padding: '14px 24px', fontSize: 13, color: TEXT_SEC }}>{row.products}</td>
                    <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 500, color: TEXT }}>{row.revenue}</td>
                    <td style={{ padding: '14px 24px' }}><StatusChip status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Products */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: INDIGO }}>Top Products</div>
              <button onClick={() => onNavigate('products')} style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#EFE8DD' }}>
                  {['Product', 'Universe', 'Sold', 'Revenue'].map(h => (
                    <th key={h} style={{ padding: '10px 24px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEXT_SEC }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'prod-001', name: 'Tifinagh Frame Tee', universe: 'Heritage', sold: 84, rev: '€3,780' },
                  { id: 'prod-002', name: 'Washed Indigo Heritage Tee', universe: 'Heritage', sold: 71, rev: '€3,195' },
                  { id: 'prod-003', name: 'Atlas Symbol Boxy Tee', universe: 'Essentials', sold: 56, rev: '€2,240' },
                  { id: 'prod-006', name: 'Community Lab Archive Jersey', universe: 'Community Lab', sold: 38, rev: '€2,850' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}
                    onClick={() => onEditProduct(row.id)}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#EFE8DD'}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 500, color: TEXT }}>{row.name}</td>
                    <td style={{ padding: '14px 24px' }}><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>{row.universe}</span></td>
                    <td style={{ padding: '14px 24px', fontSize: 13, color: TEXT_SEC }}>{row.sold}</td>
                    <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 500, color: TEXT }}>{row.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Challenge + Community row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO, marginBottom: 16 }}>Challenge Performance</div>
              {[
                { name: 'Tifinagh Type Challenge', entries: 142, status: 'Active' },
                { name: 'Indigo Dye Archive', entries: 88, status: 'Active' },
                { name: 'Atlas Pattern Remix', entries: 67, status: 'Archived' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: TEXT_SEC }}>{c.entries} entries</div>
                  </div>
                  <StatusChip status={c.status} />
                </div>
              ))}
            </div>
            <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO, marginBottom: 16 }}>Community Health</div>
              {[
                { label: 'Active members', value: '8,420', change: '+4.2%' },
                { label: 'New registrations', value: '183', change: '+11%' },
                { label: 'Contributions', value: '342', change: '+28%' },
                { label: 'Lab participants', value: '94', change: '+18%' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
                  <div style={{ fontSize: 13, color: TEXT_SEC }}>{m.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{m.value}</span>
                    <span style={{ fontSize: 11, color: SAGE }}>{m.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Quick Actions */}
          <div style={{ background: INDIGO, borderRadius: 20, padding: 24 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: '#E7DFD2', marginBottom: 16 }}>Quick Actions</div>
            {[
              { label: 'Create Product', action: onCreateProduct, icon: '◈' },
              { label: 'Publish Story', screen: 'dashboard' as Screen, icon: '◫' },
              { label: 'Launch Challenge', screen: 'dashboard' as Screen, icon: '◇' },
              { label: 'Open Home Builder', screen: 'dashboard' as Screen, icon: '◻' },
            ].map((a, i) => (
              <button
                key={i}
                onClick={() => 'action' in a && a.action ? a.action() : onNavigate(a.screen!)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '11px 14px',
                  marginBottom: 8,
                  background: 'rgba(231,223,210,0.08)',
                  border: '1px solid rgba(231,223,210,0.15)',
                  borderRadius: 12,
                  color: '#E7DFD2',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(231,223,210,0.15)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(231,223,210,0.08)'}
              >
                <span style={{ fontSize: 15, opacity: 0.7 }}>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>

          {/* Activity Feed */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO, marginBottom: 4 }}>Recent Activity</div>
            <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 16 }}>Last 24 hours</div>
            <ActivityItem time="10 min ago" action="published" entity="Atlas Symbol Boxy Tee" user="Amine Kherrab" />
            <ActivityItem time="1 hr ago" action="created order" entity="#ORD-2841" user="Mehdi Aït Mansour" />
            <ActivityItem time="2 hr ago" action="submitted to" entity="Tifinagh Type Challenge" user="Lina Meziane" />
            <ActivityItem time="3 hr ago" action="updated" entity="Echoes of Stone" user="Amine Kherrab" />
            <ActivityItem time="5 hr ago" action="joined" entity="Community Lab" user="Youcef Benali" />
            <button style={{ width: '100%', marginTop: 16, padding: '9px', background: '#EFE8DD', border: 'none', borderRadius: 10, fontSize: 12, color: TEXT_SEC, cursor: 'pointer' }}>
              View all activity →
            </button>
          </div>

          {/* Editorial */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 24 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO, marginBottom: 16 }}>Editorial</div>
            {[
              { title: 'The Geometry of Tifinagh', reads: '4.2K', status: 'Published' },
              { title: 'Indigo as Memory', reads: '3.1K', status: 'Published' },
              { title: 'Atlas Patterns: A Field Study', reads: '—', status: 'Draft' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: TEXT_SEC }}>{s.reads} reads</div>
                </div>
                <StatusChip status={s.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
