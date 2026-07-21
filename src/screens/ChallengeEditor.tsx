import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: '#B7AA91', marginTop: 4 }}>{hint}</div>}
    </div>
  )
}

const inp: React.CSSProperties = { width: '100%', padding: '9px 13px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif' }

const OUTPUT_OPTIONS = [
  { icon: '◫', label: 'Editorial Story', desc: 'A selected contribution can be developed into a published story.' },
  { icon: '◯', label: 'Community Highlight', desc: 'Featured in the community section and member digest.' },
  { icon: '⬠', label: 'Lab Project', desc: 'Launch a collaborative lab project from selected submissions.' },
  { icon: '⬡', label: 'Product Research Source', desc: 'Use as research material for a future product or collection.' },
]

export default function ChallengeEditor({ onNavigate }: Props) {
  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Reinterpret a Mountain Mark</div>
          <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: 4 }}>Visual Art · Open · 34 submissions</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('challenges')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Back</button>
          <button onClick={() => onNavigate('challenge-submissions')} style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View Submissions →</button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Publish</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        {/* Main */}
        <div>
          <SectionCard title="Overview">
            <Field label="Challenge Title">
              <input style={inp} defaultValue="Reinterpret a Mountain Mark" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Type / Category">
                <select style={{ ...inp, cursor: 'pointer' }}>
                  <option>Visual Art</option><option>Typography</option><option>Documentary</option><option>Cultural Archive</option><option>Narrative</option><option>Design</option><option>Collaborative</option>
                </select>
              </Field>
              <Field label="Universe">
                <select style={{ ...inp, cursor: 'pointer' }}>
                  <option>Heritage</option><option>Essentials</option><option>Studio</option><option>Community Lab</option>
                </select>
              </Field>
            </div>
            <Field label="Short Description" hint="Shown on the challenge card and discovery pages">
              <textarea style={{ ...inp, height: 72, resize: 'vertical' }} defaultValue="The Atlas mountains are covered in marks — geometric, symbolic, functional. Take one and bring it into the present. Interpret it through any medium: drawing, photography, textile, code." />
            </Field>
            <Field label="Cover Image">
              <div style={{ height: 140, borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}`, background: '#EDE8DF', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700&h=180&fit=crop&auto=format" alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,47,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button style={{ background: 'rgba(245,241,234,0.92)', border: 'none', borderRadius: 10, padding: '7px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Replace Cover</button>
                </div>
              </div>
            </Field>
          </SectionCard>

          <SectionCard title="Brief & Intention" subtitle="The cultural and creative context for participants">
            <Field label="Challenge Narrative">
              <textarea style={{ ...inp, height: 130, resize: 'vertical' }} defaultValue="Across the Atlas range, communities have marked stone, cloth, and earth for centuries. These marks carried meaning that was spatial, social, cosmic. Many are still visible. Many have been forgotten. IZLI invites you to find one — from your region, your family memory, or your archive — and reinterpret it. Not as illustration. As a new construction." />
            </Field>
            <Field label="The Ask">
              <textarea style={{ ...inp, height: 80 }} defaultValue="Submit one reinterpretation of a mountain mark in any medium. Tell us where the mark comes from, and what you made of it." />
            </Field>
          </SectionCard>

          <SectionCard title="Submission Format">
            <Field label="Allowed Formats">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Image / Photography', 'Drawing / Illustration', 'Textile / Craft', 'Video (max 3 min)', 'Written Piece', 'Digital Design'].map((f, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 12px', border: `1px solid ${i < 4 ? INDIGO : BORDER}`, borderRadius: 10, background: i < 4 ? '#E8EDF3' : '#EDE8DF', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked={i < 4} style={{ cursor: 'pointer' }} />
                    <span style={{ fontSize: 12, color: i < 4 ? INDIGO : TEXT_SEC, fontWeight: i < 4 ? 500 : 400 }}>{f}</span>
                  </label>
                ))}
              </div>
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Max Submissions per Person">
                <input style={inp} type="number" defaultValue="1" />
              </Field>
              <Field label="Max File Size">
                <input style={inp} defaultValue="50 MB" />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Rules & Eligibility">
            <Field label="Eligibility">
              <select style={{ ...inp, cursor: 'pointer' }}>
                <option>All IZLI members</option><option>Level 2+ members</option><option>By invitation</option>
              </select>
            </Field>
            <Field label="Rules">
              <textarea style={{ ...inp, height: 100, resize: 'vertical' }} defaultValue="— Original work only&#10;— Must cite the source mark and its region&#10;— One submission per member&#10;— All formats welcome&#10;— IZLI may feature selected works in editorial or community contexts" />
            </Field>
          </SectionCard>

          <SectionCard title="Timeline">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <Field label="Opens">
                <input type="date" style={inp} defaultValue="2026-07-01" />
              </Field>
              <Field label="Submission Deadline">
                <input type="date" style={inp} defaultValue="2026-10-31" />
              </Field>
              <Field label="Results Announced">
                <input type="date" style={inp} defaultValue="2026-11-30" />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Rewards / Outputs" subtitle="What selected contributions can become">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {OUTPUT_OPTIONS.map((o, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', border: `1px solid ${i < 2 ? INDIGO : BORDER}`, borderRadius: 14, background: i < 2 ? '#E8EDF3' : '#EDE8DF', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked={i < 2} style={{ cursor: 'pointer', marginTop: 2 }} />
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: '#EFE8DD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{o.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: i < 2 ? INDIGO : TEXT }}>{o.label}</div>
                    <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 2 }}>{o.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            <Field label="Reward Description">
              <textarea style={{ ...inp, height: 72 }} defaultValue="Selected works will be featured in an IZLI editorial story. One outstanding submission may be invited to join a Community Lab project." />
            </Field>
          </SectionCard>

          <SectionCard title="FAQ">
            {[
              { q: 'Does the mark need to be from my personal heritage?', a: 'No — but it must come from the Atlas region broadly, and you must be able to share where you found it.' },
              { q: 'Can I submit a collaborative work?', a: 'Yes. Please list all collaborators in your submission notes.' },
            ].map((faq, i) => (
              <div key={i} style={{ marginBottom: 16, padding: '14px 16px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 6 }}>{faq.q}</div>
                <div style={{ fontSize: 13, color: TEXT_SEC }}>{faq.a}</div>
              </div>
            ))}
            <button style={{ fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add FAQ Item</button>
          </SectionCard>
        </div>

        {/* Sticky right */}
        <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Publish */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, background: '#EFE8DD' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Publishing</div>
            </div>
            <div style={{ padding: 20 }}>
              {[{ l: 'Status', v: 'Open', chip: true }, { l: 'Visibility', v: 'Public' }, { l: 'Eligible', v: 'All Members' }].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.l}</span>
                  {r.chip
                    ? <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 9px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>{r.v}</span>
                    : <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{r.v}</span>}
                </div>
              ))}
              <button style={{ width: '100%', padding: '10px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>Save & Publish</button>
              <button style={{ width: '100%', padding: '10px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Preview →</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Live Stats</div>
            {[{ l: 'Total submissions', v: '34' }, { l: 'Pending review', v: '8' }, { l: 'Approved', v: '22' }, { l: 'Days remaining', v: '113' }].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{s.l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{s.v}</span>
              </div>
            ))}
            <button onClick={() => onNavigate('challenge-submissions')} style={{ width: '100%', marginTop: 8, padding: '8px', background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Review Submissions →
            </button>
          </div>

          {/* Linked outputs */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Linked Outputs</div>
            {[
              { icon: '◫', label: 'Story', title: 'Not yet created', dim: true },
              { icon: '⬠', label: 'Lab Project', title: 'Mountain Memory Atlas', dim: false },
            ].map((o, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 12px', background: '#EDE8DF', borderRadius: 10, border: `1px solid ${BORDER}`, marginBottom: 8 }}>
                <span style={{ fontSize: 16, opacity: o.dim ? 0.35 : 1 }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 10, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{o.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: o.dim ? TEXT_SEC : TEXT, fontStyle: o.dim ? 'italic' : 'normal' }}>{o.title}</div>
                </div>
              </div>
            ))}
            <button style={{ width: '100%', marginTop: 4, padding: '7px', background: 'transparent', border: `1px dashed ${BORDER}`, borderRadius: 10, fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Link Output</button>
          </div>

          {/* Timestamps */}
          <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 10 }}>Dates</div>
            {[{ l: 'Opens', v: '1 Jul 2026' }, { l: 'Deadline', v: '31 Oct 2026' }, { l: 'Results', v: '30 Nov 2026' }].map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 12, color: TEXT_SEC }}>{d.l}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{d.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
