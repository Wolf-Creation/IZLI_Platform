import { INDIGO, TEXT_SEC, BORDER, CLAY, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF } from '../../tokens'
import type { WebPage } from '../types'

interface Props { onNavigate: (p: WebPage) => void }

const TEAM = [
  { name: 'Amine Karimi', role: 'Founder & Creative Director', location: 'Paris / Casablanca', avatar: 'AK', bio: 'Grew up between Casablanca and Paris. Studied fashion at ESMOD before working in heritage preservation in Morocco for six years.' },
  { name: 'Sara Berrada', role: 'Head of Content & Community', location: 'Paris', avatar: 'SB', bio: 'Writer and cultural researcher. Published extensively on Amazigh textile traditions and contemporary North African identity.' },
  { name: 'Omar Figuigui', role: 'Community & Lab Director', location: 'Montréal / Algiers', avatar: 'OF', bio: 'Documentary maker turned community builder. Runs the Community Lab and coordinates with artisan partners across Morocco and Algeria.' },
]

const PRESS = [
  { outlet: 'Vogue Arabia', quote: '"A brand redefining what heritage fashion means in the 21st century."' },
  { outlet: 'Wallpaper', quote: '"IZLI is doing for Amazigh craft what Miu Miu did for Italian artisanship — making it urgent and now."' },
  { outlet: 'The Guardian', quote: '"The most interesting menswear brand working with North African heritage today."' },
]

export default function About({ onNavigate: _onNavigate }: Props) {
  return (
    <div style={{ background: BG }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: INDIGO, padding: '88px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SAND, marginBottom: 20 }}>About IZLI</div>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: 56, fontWeight: 500, color: CREAM, margin: 0, lineHeight: 1.1, marginBottom: 24 }}>
            Contemporary menswear. Amazigh heritage.
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(231,223,210,0.65)', lineHeight: 1.8, margin: 0 }}>
            IZLI is a Casablanca-founded menswear brand translating Amazigh craft traditions into contemporary garments. We are a design studio, a community platform, and a living archive — all in one.
          </p>
        </div>
      </section>

      {/* ── Origin story ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: CLAY, marginBottom: 16 }}>Our Story</div>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: 40, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.15, marginBottom: 20 }}>
              Founded on a belief that craft traditions are not historical artifacts.
            </h2>
            <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.85, margin: 0, marginBottom: 16 }}>
              IZLI was founded in 2022 in Casablanca by Amine Karimi, after six years of working in heritage preservation with Amazigh communities in the Middle Atlas. The name comes from the Tamazight word for "thread" — a metaphor for connection, continuity, and weaving across time.
            </p>
            <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.85, margin: 0 }}>
              Our first collection was made in collaboration with embroiderers in the Draa Valley. Today, every IZLI garment begins with research: archival visits, community contributions, and deep conversations with the people whose heritage we carry into our work.
            </p>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5' }}>
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&h=875&fit=crop&auto=format" alt="IZLI origin" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '72px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 48, textAlign: 'center' }}>What we believe</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { title: 'Heritage is a practice, not a museum piece.', desc: 'We do not reproduce heritage as costume. We research it, learn from it, and let it evolve through contemporary form.' },
              { title: 'The community knows more than the designer.', desc: 'The people who carry Amazigh traditions are our most important collaborators. Our community platform is not marketing — it is research.' },
              { title: 'Slow is the only way forward.', desc: 'We make limited quantities. We work with artisans at their pace. We do not do seasonal sales, off-price, or excess inventory.' },
            ].map(v => (
              <div key={v.title} style={{ padding: '28px 24px', background: BG, borderRadius: 16, border: `1px solid ${BORDER}` }}>
                <h3 style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.4, marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 40px' }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 40 }}>The team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {TEAM.map(t => (
            <div key={t.name} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ height: 200, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: 999, background: 'rgba(231,223,210,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: CREAM, fontFamily: FONT_SERIF }}>{t.avatar}</div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 500, color: INDIGO, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: CLAY, fontWeight: 600, letterSpacing: '0.02em', marginBottom: 4 }}>{t.role}</div>
                <div style={{ fontSize: 11, color: TEXT_SEC, marginBottom: 12 }}>{t.location}</div>
                <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.7, margin: 0 }}>{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Press ────────────────────────────────────────────────────── */}
      <section style={{ background: SURFACE_2, borderTop: `1px solid ${BORDER}`, padding: '64px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEXT_SEC, marginBottom: 32, textAlign: 'center' }}>As seen in</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PRESS.map(p => (
              <div key={p.outlet} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '24px' }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 13, fontWeight: 600, color: INDIGO, marginBottom: 12 }}>{p.outlet}</div>
                <p style={{ fontFamily: FONT_SERIF, fontSize: 15, color: TEXT_SEC, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>{p.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
