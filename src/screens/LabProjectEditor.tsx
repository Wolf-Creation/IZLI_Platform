import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAGE = '#7D8470'

interface Props { onNavigate: (s: Screen) => void }

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

const inp: React.CSSProperties = { width: '100%', padding: '9px 13px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif' }

const PARTICIPANTS = [
  { name: 'Youcef Benali', avatar: 'YB', role: 'Lead Researcher', contributions: 8 },
  { name: 'Lina Meziane', avatar: 'LM', role: 'Visual Archivist', contributions: 11 },
  { name: 'Amira Saïdi', avatar: 'AS', role: 'Textile Analyst', contributions: 6 },
  { name: 'Karim Ouali', avatar: 'KO', role: 'Contributor', contributions: 5 },
]

const MILESTONES = [
  { label: 'Contribution collection open', date: '1 May 2026', status: 'done' },
  { label: 'First editorial review', date: '15 Jul 2026', status: 'upcoming' },
  { label: 'Archive draft complete', date: '15 Aug 2026', status: 'upcoming' },
  { label: 'Story published', date: '30 Sep 2026', status: 'upcoming' },
]

const LINKED_CONTRIBUTIONS = [
  { id: 'CON-0142', title: 'Azoul mark — 12 variations', author: 'Youcef Benali', img: 'photo-1516762689617-e1cffcef479d' },
  { id: 'CON-0139', title: 'Stone script from Beni Mellal', author: 'Lina Meziane', img: 'photo-1469334031218-e382a71b716b' },
  { id: 'CON-0136', title: 'Redrawn in thread', author: 'Amira Saïdi', img: 'photo-1523381210434-271e8be1f52b' },
]

export default function LabProjectEditor({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Mountain Memory Atlas</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>Active · 8 participants · 34 linked contributions</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('lab-projects')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Back</button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save Project</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        {/* Main */}
        <div>
          <SectionCard title="Overview">
            <Field label="Project Name">
              <input style={inp} defaultValue="Mountain Memory Atlas" />
            </Field>
            <Field label="Project Description">
              <textarea style={{ ...inp, height: 100, resize: 'vertical' }} defaultValue="A collaborative atlas of mountain marks, patterns and symbols gathered by community members across the Atlas range. The project collects visual, material and written documentation to create a living archive." />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Status">
                <select style={{ ...inp, cursor: 'pointer' }}><option>Active</option><option>In Progress</option><option>Paused</option><option>Completed</option></select>
              </Field>
              <Field label="Visibility">
                <select style={{ ...inp, cursor: 'pointer' }}><option>Community only</option><option>Public</option><option>Private</option></select>
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Objectives">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Document at least 200 distinct marks from the Atlas region', 'Classify marks by type, region, material and function', 'Create an editorial story from the collected material', 'Feed the archive into a future IZLI collection research process'].map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                  <span style={{ width: 20, height: 20, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#E7DFD2', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: TEXT }}>{obj}</span>
                </div>
              ))}
              <button style={{ alignSelf: 'flex-start', fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add Objective</button>
            </div>
          </SectionCard>

          <SectionCard title="Participants" subtitle={`${PARTICIPANTS.length} contributors`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
              {PARTICIPANTS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#E7DFD2' }}>{p.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: TEXT_SEC }}>{p.role}</div>
                  </div>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{p.contributions} contributions</span>
                  <button style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>···</button>
                </div>
              ))}
            </div>
            <button style={{ fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Invite Participant</button>
          </SectionCard>

          <SectionCard title="Milestones">
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: BORDER }} />
              {MILESTONES.map((m, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
                  <div style={{ position: 'absolute', left: -24, top: 3, width: 12, height: 12, borderRadius: 999, background: m.status === 'done' ? SAGE : '#EDE8DF', border: `2px solid ${m.status === 'done' ? SAGE : BORDER}` }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: m.status === 'done' ? TEXT_SEC : TEXT, textDecoration: m.status === 'done' ? 'line-through' : 'none' }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>{m.date}</div>
                    </div>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: m.status === 'done' ? '#E6EDE8' : '#EDE8DF', color: m.status === 'done' ? '#4A7A5A' : TEXT_SEC }}>
                      {m.status === 'done' ? 'Done' : 'Upcoming'}
                    </span>
                  </div>
                </div>
              ))}
              <button style={{ fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add Milestone</button>
            </div>
          </SectionCard>

          <SectionCard title="Linked Contributions" subtitle="Source material feeding this project">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
              {LINKED_CONTRIBUTIONS.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                  <div style={{ width: 40, height: 48, borderRadius: 8, overflow: 'hidden', background: '#D8D0C4', flexShrink: 0 }}>
                    <img src={`https://images.unsplash.com/${c.img}?w=80&h=96&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TEXT_SEC, marginBottom: 2 }}>{c.id}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: TEXT_SEC }}>{c.author}</div>
                  </div>
                  <button style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: TEXT_SEC, marginBottom: 8 }}>+ 31 more contributions linked</div>
            <button style={{ fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Link Contribution</button>
          </SectionCard>

          <SectionCard title="Outputs" subtitle="What this project will produce">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '◫', type: 'Story', title: 'Atlas Pattern Remix — A New Archive', status: 'Draft' },
                { icon: '⬡', type: 'Product Research', title: 'Mountain marks for SS27 collection', status: 'In Progress' },
              ].map((o, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: '#F5F1EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{o.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{o.type}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{o.title}</div>
                  </div>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#EDE8DF', border: `1px solid ${BORDER}`, color: TEXT_SEC }}>{o.status}</span>
                </div>
              ))}
              <button style={{ alignSelf: 'flex-start', fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add Output</button>
            </div>
          </SectionCard>
        </div>

        {/* Sticky right */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Project Status</div>
            </div>
            <div style={{ padding: 20 }}>
              {[{ l: 'Status', v: 'Active', chip: true }, { l: 'Visibility', v: 'Community' }, { l: 'Participants', v: '8' }, { l: 'Contributions', v: '34' }].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.l}</span>
                  {r.chip
                    ? <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 9px', borderRadius: 999, background: '#E6EDE8', color: '#4A7A5A' }}>{r.v}</span>
                    : <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{r.v}</span>}
                </div>
              ))}
              <button style={{ width: '100%', padding: '9px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save Changes</button>
            </div>
          </div>

          {/* Source challenge */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Source Challenge</div>
            <div onClick={() => onNavigate('challenge-editor')} style={{ padding: '12px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12, cursor: 'pointer' }}>
              <div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Challenge</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: INDIGO, marginTop: 1 }}>◇ Atlas Pattern Remix</div>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 2 }}>Completed · 203 submissions</div>
              <div style={{ fontSize: 11, color: CLAY, marginTop: 4 }}>↗ View challenge</div>
            </div>
          </div>

          {/* Next milestone */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Next Milestone</div>
            <div style={{ padding: '12px 14px', background: '#FDF8EC', border: `1px solid #EADDB0`, borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#A07820' }}>First editorial review</div>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 3 }}>15 Jul 2026 · 6 days away</div>
            </div>
          </div>

          {/* Relation summary */}
          <div style={{ background: INDIGO, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(231,223,210,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Relationship Map</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { from: 'Challenge', name: 'Atlas Pattern Remix', icon: '◇' },
                { from: 'Contributions', name: '34 linked works', icon: '◈' },
                { from: '→ Story', name: 'A New Archive (draft)', icon: '◫' },
                { from: '→ Research', name: 'SS27 collection input', icon: '⬡' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: 'rgba(231,223,210,0.5)' }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(231,223,210,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.from}</div>
                    <div style={{ fontSize: 12, color: '#E7DFD2' }}>{r.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
