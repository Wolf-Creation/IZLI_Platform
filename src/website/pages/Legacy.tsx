import type { WebPage } from '../types'

const INDIGO = '#1E2F44'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const SAND = '#B7AA91'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const CREAM = '#E7DFD2'
const FONT_SERIF = "'Playfair Display', serif"
const FONT_SANS = "'Inter', sans-serif"

interface Props { onNavigate: (p: WebPage) => void }

const cards = [
  {
    icon: '⬡',
    title: 'Archive',
    desc: 'Every collection becomes a permanent Archive. Once sealed, it belongs to history.',
  },
  {
    icon: '◈',
    title: 'Keeper',
    desc: 'Every purchase transforms you into a Keeper — a guardian of the Archive.',
  },
  {
    icon: '◉',
    title: 'Legacy',
    desc: 'Keepers vote on future Archives. The community shapes what endures.',
  },
]

const steps = [
  { label: 'Instagram / Story Discovery', desc: 'Your first encounter with an IZLI Archive.' },
  { label: 'Legacy Discovery', desc: 'Understanding the system behind every piece.' },
  { label: 'Archive Exploration', desc: 'Exploring the living collection and its stories.' },
  { label: 'Product Purchase', desc: 'Choosing and claiming a piece of the Archive.' },
  { label: 'Become a Keeper', desc: 'Your purchase unlocks your Keeper status.' },
  { label: 'Keeper Circle', desc: 'Access to the private community and exclusive content.' },
  { label: 'Vote on Next Archive', desc: 'Help shape what IZLI creates next.' },
  { label: 'Legacy Grows', desc: 'Your voice becomes part of IZLI history.' },
]

const levels = [
  { num: 1, name: 'Visitor', desc: 'Discovered IZLI', color: '#B7AA91' },
  { num: 2, name: 'Customer', desc: 'First purchase made', color: '#9E9080' },
  { num: 3, name: 'Keeper', desc: 'Full Archive access', color: '#8C6B52' },
  { num: 4, name: 'Senior Keeper', desc: 'Voting rights unlocked', color: '#5C7C9A' },
  { num: 5, name: 'Legacy Keeper', desc: 'Early access + referrals', color: '#3A6080' },
  { num: 6, name: 'Guardian', desc: 'Shapes future Archives', color: '#1E2F44' },
]

export default function Legacy({ onNavigate }: Props) {
  return (
    <div style={{ background: BG, fontFamily: FONT_SANS }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{ background: INDIGO, padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.15em', color: SAND, textTransform: 'uppercase', marginBottom: 20 }}>
          IZLI LEGACY
        </div>
        <h1 style={{
          fontFamily: FONT_SERIF, fontSize: 52, fontWeight: 400, color: CREAM,
          lineHeight: 1.2, maxWidth: 720, margin: '0 auto 24px',
        }}>
          Every piece belongs to an Archive. Every Archive belongs to history.
        </h1>
        <p style={{ fontSize: 17, color: SAND, maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.7 }}>
          IZLI is not a fashion brand. It is a living legacy — built product by product, keeper by keeper, archive by archive.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('archives')}
            style={{
              padding: '13px 28px', background: CREAM, color: INDIGO,
              border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: FONT_SANS,
            }}
          >
            Explore Archives
          </button>
          <button
            onClick={() => onNavigate('keeper-circle')}
            style={{
              padding: '13px 28px', background: 'transparent', color: CREAM,
              border: `1.5px solid ${CREAM}`, borderRadius: 999, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: FONT_SANS,
            }}
          >
            Join the Circle
          </button>
        </div>
      </section>

      {/* ── What is Legacy ────────────────────────────────────────────── */}
      <section style={{ background: BG, padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {cards.map((c) => (
              <div
                key={c.title}
                style={{
                  flex: '1 1 260px', background: SURFACE, border: `1px solid ${BORDER}`,
                  borderRadius: 20, padding: 32,
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: INDIGO,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, color: CREAM, marginBottom: 20,
                }}>
                  {c.icon}
                </div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 22, color: INDIGO, marginBottom: 10 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.7 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey Timeline ──────────────────────────────────────────── */}
      <section style={{ background: INDIGO, padding: '80px 40px' }}>
        <h2 style={{
          fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 400, color: CREAM,
          textAlign: 'center', marginBottom: 56,
        }}>
          From Discovery to Legacy
        </h2>
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          {/* vertical dashed line */}
          <div style={{
            position: 'absolute', left: 20, top: 0, bottom: 0, width: 1,
            borderLeft: `2px dashed ${SAND}`, opacity: 0.35,
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {steps.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div style={{
                  flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
                  border: `1.5px solid ${SAND}`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: CREAM, fontSize: 14, fontWeight: 600,
                  background: INDIGO, zIndex: 1,
                }}>
                  {i + 1}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: CREAM, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: SAND, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Keeper Levels ─────────────────────────────────────────────── */}
      <section style={{ background: SURFACE, padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{
            fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 400, color: INDIGO,
            marginBottom: 40, textAlign: 'center',
          }}>
            Keeper Levels
          </h2>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
            {levels.map((l) => (
              <div
                key={l.name}
                style={{
                  flex: '0 0 180px', background: CREAM, border: `1px solid ${BORDER}`,
                  borderRadius: 16, padding: '24px 16px', textAlign: 'center',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: l.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px', color: '#fff', fontWeight: 700, fontSize: 16,
                }}>
                  {l.num}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INDIGO, marginBottom: 6 }}>{l.name}</div>
                <div style={{ fontSize: 12, color: TEXT_SEC, lineHeight: 1.5 }}>{l.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section style={{ background: BG, padding: '80px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 400, color: INDIGO, marginBottom: 16 }}>
          Start your Legacy
        </h2>
        <p style={{ fontSize: 16, color: TEXT_SEC, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Explore the current Archive and claim your piece of IZLI history.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              padding: '13px 28px', background: INDIGO, color: CREAM,
              border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: FONT_SANS,
            }}
          >
            Shop Now
          </button>
          <button
            onClick={() => onNavigate('archives')}
            style={{
              padding: '13px 28px', background: 'transparent', color: INDIGO,
              border: `1.5px solid ${INDIGO}`, borderRadius: 999, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: FONT_SANS,
            }}
          >
            View Archives
          </button>
        </div>
      </section>

    </div>
  )
}
