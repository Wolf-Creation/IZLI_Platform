import { INDIGO, TEXT, TEXT_SEC, BORDER, CLAY, SAGE, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF, FONT_SANS, FONT_MONO } from '../../tokens'
import type { WebPage } from '../types'

interface Props { onNavigate: (p: WebPage) => void }

const CONTRIBUTIONS = [
  { id: 'CTR-0178', title: 'Azoul mark — 12 variations', author: 'Youcef Benali', avatar: 'YB', challenge: 'Atlas Pattern Remix', img: 'photo-1516762689617-e1cffcef479d', featured: true },
  { id: 'CTR-0175', title: 'Symbol from Agadir region', author: 'Lina Meziane', avatar: 'LM', challenge: 'Archive a Symbol', img: 'photo-1469334031218-e382a71b716b', featured: false },
  { id: 'CTR-0172', title: 'Stone script from Beni Mellal', author: 'Amira Saïdi', avatar: 'AS', challenge: 'Atlas Pattern Remix', img: 'photo-1523381210434-271e8be1f52b', featured: false },
  { id: 'CTR-0169', title: 'Redrawn in thread', author: 'Nassim Ouchene', avatar: 'NO', challenge: 'Textile Heritage', img: 'photo-1490481651871-ab68de25d43d', featured: false },
  { id: 'CTR-0165', title: 'Digital geometry / Atlas grid', author: 'Karim Ouali', avatar: 'KO', challenge: 'Atlas Pattern Remix', img: 'photo-1521572163474-6864f9cf17ab', featured: false },
  { id: 'CTR-0161', title: 'Oral memory documentation', author: 'Sara Idrissi', avatar: 'SI', challenge: 'Memory Archive', img: 'photo-1618354691373-d851c5c3a990', featured: false },
]

const MEMBERS = [
  { name: 'Youcef Benali', level: 5, contributions: 34, avatar: 'YB', location: 'Algiers, DZ' },
  { name: 'Lina Meziane', level: 4, contributions: 28, avatar: 'LM', location: 'Paris, FR' },
  { name: 'Amira Saïdi', level: 4, contributions: 22, avatar: 'AS', location: 'Casablanca, MA' },
  { name: 'Nassim Ouchene', level: 3, contributions: 18, avatar: 'NO', location: 'Montreal, CA' },
]

const LEVEL_COLOR: Record<number, string> = { 5: CLAY, 4: INDIGO, 3: SAGE, 2: '#B7AA91', 1: '#D8D0C4' }

export default function Community({ onNavigate }: Props) {
  return (
    <div style={{ background: BG }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: '72px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEXT_SEC, marginBottom: 16 }}>Community</div>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 52, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.1, marginBottom: 20 }}>
              Heritage belongs<br />to everyone.
            </h1>
            <p style={{ fontSize: 15, color: TEXT_SEC, lineHeight: 1.8, margin: 0, marginBottom: 32, maxWidth: 440 }}>
              The IZLI community submits contributions, participates in challenges, and shapes what we make next. We are a growing archive of makers, writers, and memory-keepers — 148 members and counting.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => onNavigate('login')} style={{ padding: '12px 24px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>
                Join the Community
              </button>
              <button onClick={() => onNavigate('community-lab')} style={{ padding: '12px 20px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: FONT_SANS }}>
                Explore the Lab →
              </button>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Members', value: '148', icon: '◯' },
              { label: 'Contributions', value: '108', icon: '◫' },
              { label: 'Active Challenges', value: '3', icon: '◇' },
              { label: 'Lab Projects', value: '4', icon: '⬠' },
            ].map(s => (
              <div key={s.label} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ fontSize: 20, color: INDIGO, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: INDIGO, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent contributions ─────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 36 }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0 }}>Recent Contributions</h2>
          <span style={{ fontSize: 13, color: TEXT_SEC }}>108 total contributions</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {CONTRIBUTIONS.map(c => (
            <div key={c.id} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={`https://images.unsplash.com/${c.img}?w=600&h=450&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: SAND, marginBottom: 6, letterSpacing: '0.04em' }}>{c.id}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 6 }}>{c.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: CREAM }}>{c.avatar}</div>
                    <span style={{ fontSize: 12, color: TEXT_SEC }}>{c.author}</span>
                  </div>
                  <span style={{ fontSize: 11, color: INDIGO, fontWeight: 500 }}>◇ {c.challenge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Active challenge ─────────────────────────────────────────── */}
      <section style={{ background: SURFACE_2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9' }}>
            <img src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&h=450&fit=crop&auto=format" alt="Atlas Pattern Remix" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A7A5A', display: 'inline-block', marginBottom: 12 }}>Active Challenge</span>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.15, marginBottom: 14 }}>Atlas Pattern Remix</h2>
            <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.75, margin: 0, marginBottom: 24 }}>
              Document a traditional Amazigh geometric pattern from your region. Redraw it, photograph it, or reimagine it in a contemporary medium. 203 contributions received.
            </p>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div><div style={{ fontFamily: FONT_SERIF, fontSize: 24, fontWeight: 500, color: INDIGO }}>203</div><div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Submissions</div></div>
              <div><div style={{ fontFamily: FONT_SERIF, fontSize: 24, fontWeight: 500, color: INDIGO }}>63</div><div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Participants</div></div>
              <div><div style={{ fontFamily: FONT_SERIF, fontSize: 24, fontWeight: 500, color: CLAY }}>23d</div><div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Remaining</div></div>
            </div>
            <button onClick={() => onNavigate('login')} style={{ padding: '12px 24px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>
              Submit a Contribution →
            </button>
          </div>
        </div>
      </section>

      {/* ── Member spotlights ─────────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 40px' }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 36 }}>Member Spotlights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {MEMBERS.map(m => (
            <div key={m.name} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: CREAM, margin: '0 auto 12px' }}>{m.avatar}</div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 16, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 12 }}>{m.location}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: 999, background: LEVEL_COLOR[m.level], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: CREAM }}>{m.level}</div>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 700, color: INDIGO }}>{m.contributions}</span>
                <span style={{ fontSize: 11, color: TEXT_SEC }}>contributions</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
