import { INDIGO, TEXT, TEXT_SEC, BORDER, CLAY, SAGE, SAND, BG, SURFACE, SURFACE_2, CREAM, FONT_SERIF, FONT_SANS } from '../../tokens'
import type { WebPage } from '../types'

interface Props { onNavigate: (p: WebPage) => void }

const UNIVERSES = [
  { name: 'Heritage', desc: 'Rooted in Amazigh craft', img: 'photo-1490481651871-ab68de25d43d', color: INDIGO },
  { name: 'Essentials', desc: 'Daily wear, lasting quality', img: 'photo-1523381210434-271e8be1f52b', color: CLAY },
  { name: 'Studio', desc: 'Contemporary interpretations', img: 'photo-1618354691373-d851c5c3a990', color: SAGE },
  { name: 'Community Lab', desc: 'Made with the community', img: 'photo-1521572163474-6864f9cf17ab', color: '#4A7A5A' },
]

const STORIES = [
  { title: 'Indigo as Memory', type: 'Editorial', reads: '4.8K', img: 'photo-1490481651871-ab68de25d43d' },
  { title: 'What Sahara Taught Our Weavers', type: 'Editorial', reads: '2.3K', img: 'photo-1469334031218-e382a71b716b' },
  { title: 'Atlas Pattern Remix — A New Archive', type: 'Community', reads: '2.8K', img: 'photo-1516762689617-e1cffcef479d' },
]

export default function Home({ onNavigate }: Props) {
  return (
    <div style={{ background: BG }}>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '88vh', overflow: 'hidden' }}>
        {/* Left — editorial text */}
        <div style={{ background: INDIGO, padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SAND, marginBottom: 28 }}>
            New Collection — SS 2026
          </div>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: 72, fontWeight: 500, color: CREAM, lineHeight: 1.05, margin: 0, marginBottom: 28 }}>
            Echoes<br />of Stone.
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(231,223,210,0.65)', lineHeight: 1.7, maxWidth: 360, margin: 0, marginBottom: 40 }}>
            A collection rooted in the memory of Atlas stone marks — patterns that predate script, carried forward in cloth.
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <button
              onClick={() => onNavigate('collections')}
              style={{ padding: '13px 28px', background: CREAM, color: INDIGO, border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: FONT_SANS }}
            >
              Shop Collection
            </button>
            <button
              onClick={() => onNavigate('stories')}
              style={{ padding: '13px 24px', background: 'transparent', color: CREAM, border: '1px solid rgba(231,223,210,0.3)', borderRadius: 10, fontSize: 14, cursor: 'pointer', fontFamily: FONT_SANS }}
            >
              Discover the Story →
            </button>
          </div>
        </div>
        {/* Right — editorial image */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=900&h=1100&fit=crop&auto=format"
            alt="Echoes of Stone collection"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', bottom: 24, right: 24, background: 'rgba(245,241,234,0.92)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: '10px 16px', fontSize: 11, color: INDIGO, fontFamily: FONT_SANS, fontWeight: 500 }}>
            Tifinagh Frame Tee — Heritage · €95
          </div>
        </div>
      </section>

      {/* ── Shop by Universe ───────────────────────────────────────────── */}
      <section style={{ padding: '88px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: INDIGO, margin: 0 }}>Shop by Universe</h2>
          <button onClick={() => onNavigate('shop')} style={{ fontSize: 13, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT_SANS }}>View all →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {UNIVERSES.map(u => (
            <button
              key={u.name}
              onClick={() => onNavigate('shop')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 14, position: 'relative', aspectRatio: '3/4' }}>
                <img
                  src={`https://images.unsplash.com/${u.img}?w=500&h=660&fit=crop&auto=format`}
                  alt={u.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,47,68,0.5) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 500, color: CREAM }}>{u.name}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: TEXT_SEC, marginTop: -4 }}>{u.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Collection ────────────────────────────────────────── */}
      <section style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=680&fit=crop&auto=format"
              alt="Indigo Memory"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{ padding: '72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: CLAY, marginBottom: 16 }}>Featured Collection</div>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: 44, fontWeight: 500, color: INDIGO, lineHeight: 1.1, margin: 0, marginBottom: 20 }}>Indigo<br />Memory</h2>
            <p style={{ fontSize: 15, color: TEXT_SEC, lineHeight: 1.75, maxWidth: 380, margin: 0, marginBottom: 32 }}>
              A capsule exploring the cultural history of indigo dyeing in North Africa — translated into a series of carefully constructed garments.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
              {['5 pieces', 'Heritage', 'SS 2026'].map(tag => (
                <span key={tag} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 999, background: SURFACE_2, color: TEXT_SEC, border: `1px solid ${BORDER}` }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => onNavigate('collections')} style={{ padding: '12px 24px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>
                View Collection
              </button>
              <button onClick={() => onNavigate('stories')} style={{ padding: '12px 20px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 14, cursor: 'pointer', fontFamily: FONT_SANS }}>
                Read the Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stories ───────────────────────────────────────────────────── */}
      <section style={{ padding: '88px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: INDIGO, margin: 0 }}>From the Journal</h2>
          <button onClick={() => onNavigate('stories')} style={{ fontSize: 13, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT_SANS }}>All stories →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {STORIES.map(s => (
            <button key={s.title} onClick={() => onNavigate('stories')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 16, aspectRatio: '4/3' }}>
                <img
                  src={`https://images.unsplash.com/${s.img}?w=700&h=520&fit=crop&auto=format`}
                  alt={s.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999, background: s.type === 'Editorial' ? SURFACE_2 : '#E8EDF3', color: s.type === 'Editorial' ? CLAY : INDIGO }}>{s.type}</span>
                <span style={{ fontSize: 11, color: TEXT_SEC }}>{s.reads} reads</span>
              </div>
              <h3 style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 500, color: INDIGO, lineHeight: 1.3, margin: 0 }}>{s.title}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* ── Community + Lab Banner ─────────────────────────────────────── */}
      <section style={{ background: SURFACE_2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          {/* Community */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEXT_SEC, marginBottom: 14 }}>Community</div>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 14 }}>Heritage belongs to everyone.</h2>
            <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.7, margin: 0, marginBottom: 24 }}>
              Our community submits contributions, participates in challenges, and shapes what IZLI makes next. Join a growing archive of makers, writers, and memory-keepers.
            </p>
            <button onClick={() => onNavigate('community')} style={{ padding: '11px 22px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>
              Explore Community →
            </button>
          </div>
          {/* Lab */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEXT_SEC, marginBottom: 14 }}>Community Lab</div>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 14 }}>Where contributions become collections.</h2>
            <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.7, margin: 0, marginBottom: 24 }}>
              The Community Lab turns the best contributions into real research, editorial stories, and product prototypes. Every garment has a source.
            </p>
            <button onClick={() => onNavigate('community-lab')} style={{ padding: '11px 22px', background: 'transparent', color: INDIGO, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: FONT_SANS }}>
              Discover the Lab →
            </button>
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 40px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: SAND, marginBottom: 16 }}>Newsletter</div>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 14 }}>Stay close to the work.</h2>
        <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.7, margin: 0, marginBottom: 32 }}>
          New collections, challenge launches, community stories, and events — in your inbox, at a human pace.
        </p>
        <div style={{ display: 'flex', gap: 0, maxWidth: 420, margin: '0 auto' }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{ flex: 1, padding: '12px 16px', background: SURFACE, border: `1px solid ${BORDER}`, borderRight: 'none', borderRadius: '10px 0 0 10px', fontSize: 14, color: TEXT, fontFamily: FONT_SANS, outline: 'none' }}
          />
          <button style={{ padding: '12px 20px', background: INDIGO, color: CREAM, border: 'none', borderRadius: '0 10px 10px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT_SANS, whiteSpace: 'nowrap' }}>
            Subscribe
          </button>
        </div>
      </section>

    </div>
  )
}
