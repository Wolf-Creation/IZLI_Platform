import { useState } from 'react'
import type { WebPage } from '../types'

const INDIGO = '#1E2F44'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'
const SAND = '#B7AA91'
const BG = '#EDE8DF'
const SURFACE = '#F5F1EA'
const CREAM = '#E7DFD2'
const FONT_SERIF = "'Playfair Display', serif"
const FONT_SANS = "'Inter', sans-serif"
const FONT_MONO = "'JetBrains Mono', monospace"

interface Props { onNavigate: (p: WebPage) => void }

const ownedProducts = [
  { name: 'Tifinagh Tee', archive: 'Echoes of Stone · Size M', img: 'photo-1469334031218-e382a71b716b' },
  { name: 'Sahara Overshirt', archive: 'Sahara Drift · Size L', img: 'photo-1523381210434-271e8be1f52b' },
  { name: 'Atlas Hoodie', archive: 'Atlas FW25 · Size M', img: 'photo-1516762689617-e1cffcef479d' },
  { name: 'Indigo Cargo', archive: 'Coastal Indigo · Size 32', img: 'photo-1617196034183-421b4040ed20' },
]

const stories = [
  { title: 'How the Echoes of Stone Archive was Born', date: 'Apr 2026', img: 'photo-1521572163474-6864f9cf17ab' },
  { title: 'Meet the Artisans Behind Coastal Indigo', date: 'Jun 2026', img: 'photo-1469334031218-e382a71b716b' },
]

interface VoteCard {
  id: number
  title: string
  closes: string
  options: string[]
}

const voteCards: VoteCard[] = [
  {
    id: 1,
    title: 'Mountain Memory — Archive Theme',
    closes: '12 days',
    options: ['High Altitude Minimalism', 'Andean Textile Heritage', 'Raw Alpine Materiality'],
  },
  {
    id: 2,
    title: 'Next Graphic Direction',
    closes: '8 days',
    options: ['Tifinagh Script Bold', 'Geometric Negative Space'],
  },
]

export default function KeeperCircle({ onNavigate }: Props) {
  const [votes, setVotes] = useState<Record<number, string>>({})
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText('IZLI-YOU-B42').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: BG, fontFamily: FONT_SANS }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{ background: INDIGO, padding: '48px 0' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 32,
        }}>
          <div>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 40, fontWeight: 400, color: CREAM, margin: '0 0 8px' }}>
              Keeper Circle
            </h1>
            <p style={{ fontSize: 16, color: SAND, margin: '0 0 16px' }}>Welcome back, Youcef.</p>
            <div style={{
              display: 'inline-block', padding: '5px 14px',
              background: 'rgba(255,255,255,0.12)', color: CREAM,
              borderRadius: 999, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
            }}>
              Legacy Keeper
            </div>
          </div>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Archives', val: '3' },
              { label: 'Products', val: '12' },
              { label: 'Legacy Points', val: '8,420' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: CREAM }}>{s.val}</div>
                <div style={{ fontSize: 12, color: SAND, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard ─────────────────────────────────────────────────── */}
      <section style={{ background: BG, padding: '64px 0' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 40px',
          display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32,
        }}>

          {/* ── Left column ─────────────────────────────────────────── */}
          <div>

            {/* Owned Products */}
            <div>
              <h2 style={{ fontFamily: FONT_SERIF, fontSize: 22, fontWeight: 500, color: INDIGO, margin: '0 0 20px' }}>
                Your Archive Pieces
              </h2>
              <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
                {ownedProducts.map((p) => (
                  <div
                    key={p.name}
                    style={{
                      flex: '0 0 180px', background: SURFACE, border: `1px solid ${BORDER}`,
                      borderRadius: 12, overflow: 'hidden',
                    }}
                  >
                    <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                      <img
                        src={`https://images.unsplash.com/${p.img}?w=360&h=450&fit=crop&auto=format`}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: INDIGO, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: SAND, lineHeight: 1.4 }}>{p.archive}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Voting */}
            <div style={{ marginTop: 32 }}>
              <h2 style={{ fontFamily: FONT_SERIF, fontSize: 22, fontWeight: 500, color: INDIGO, margin: '0 0 20px' }}>
                Cast Your Vote
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {voteCards.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      background: SURFACE, border: `1px solid ${BORDER}`,
                      borderRadius: 16, padding: 20,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: INDIGO }}>{v.title}</div>
                      <div style={{ fontSize: 12, color: CLAY, fontWeight: 500 }}>Closes in {v.closes}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                      {v.options.map((opt) => (
                        <label
                          key={opt}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                        >
                          <input
                            type="radio"
                            name={`vote-${v.id}`}
                            value={opt}
                            checked={votes[v.id] === opt}
                            onChange={() => setVotes((prev) => ({ ...prev, [v.id]: opt }))}
                            style={{ accentColor: INDIGO, width: 16, height: 16 }}
                          />
                          <span style={{ fontSize: 13, color: TEXT_SEC }}>{opt}</span>
                        </label>
                      ))}
                    </div>
                    <button
                      style={{
                        padding: '9px 20px', background: votes[v.id] ? INDIGO : BORDER,
                        color: votes[v.id] ? CREAM : TEXT_SEC,
                        border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600,
                        cursor: votes[v.id] ? 'pointer' : 'default', fontFamily: FONT_SANS,
                        transition: 'background 0.2s',
                      }}
                    >
                      Submit Vote
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusive Stories */}
            <div style={{ marginTop: 32 }}>
              <h2 style={{ fontFamily: FONT_SERIF, fontSize: 22, fontWeight: 500, color: INDIGO, margin: '0 0 20px' }}>
                Keeper Stories
              </h2>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {stories.map((s) => (
                  <div
                    key={s.title}
                    style={{
                      flex: '1 1 240px', background: SURFACE, border: `1px solid ${BORDER}`,
                      borderRadius: 12, overflow: 'hidden', display: 'flex',
                    }}
                  >
                    <div style={{ width: 90, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={`https://images.unsplash.com/${s.img}?w=180&h=180&fit=crop&auto=format`}
                        alt={s.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{
                        position: 'absolute', top: 6, left: 6,
                        background: CLAY, color: CREAM,
                        borderRadius: 999, padding: '2px 7px', fontSize: 9, fontWeight: 700,
                      }}>
                        Exclusive
                      </div>
                    </div>
                    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: INDIGO, lineHeight: 1.4, marginBottom: 6 }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: SAND }}>{s.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column ────────────────────────────────────────── */}
          <div>

            {/* Keeper Stats */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INDIGO, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Keeper Stats
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: TEXT_SEC }}>Level</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: INDIGO }}>Legacy Keeper</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: BG, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 3, background: INDIGO, width: '75%' }} />
                </div>
                <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 4 }}>75% to Guardian</div>
              </div>
              {[
                { label: 'Archives', val: '3' },
                { label: 'Products', val: '12' },
                { label: 'Points', val: '8,420' },
                { label: 'Votes', val: '14' },
                { label: 'Referrals', val: '6' },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '10px 0', borderBottom: `1px solid ${BORDER}`,
                  }}
                >
                  <span style={{ fontSize: 13, color: TEXT_SEC }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: INDIGO }}>{row.val}</span>
                </div>
              ))}
            </div>

            {/* Upcoming Archive */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20, marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INDIGO, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Upcoming Archive
              </div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 18, color: INDIGO, margin: '8px 0 4px' }}>Mountain Memory</div>
              <div style={{ fontSize: 12, color: SAND, marginBottom: 10 }}>Oct 2026</div>
              <div style={{
                display: 'inline-block', padding: '4px 10px',
                background: CLAY, color: CREAM,
                borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 12,
              }}>
                You have early access
              </div>
              <p style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, margin: '0 0 16px' }}>
                High altitude, ancient paths, and future stories. The Mountain Memory Archive opens to Keepers first.
              </p>
              <button
                onClick={() => onNavigate('archives')}
                style={{
                  width: '100%', padding: '10px 0', background: INDIGO, color: CREAM,
                  border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', fontFamily: FONT_SANS,
                }}
              >
                Explore Archive
              </button>
            </div>

            {/* Referral */}
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20, marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INDIGO, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Your Referral Link
              </div>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 15, color: INDIGO,
                background: BG, border: `1px solid ${BORDER}`,
                padding: '8px 12px', borderRadius: 8, marginBottom: 12,
                letterSpacing: '0.05em',
              }}>
                IZLI-YOU-B42
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <button
                  onClick={handleCopy}
                  style={{
                    flex: 1, padding: '9px 0', background: INDIGO, color: CREAM,
                    border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', fontFamily: FONT_SANS,
                  }}
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  style={{
                    flex: 1, padding: '9px 0', background: 'transparent', color: INDIGO,
                    border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', fontFamily: FONT_SANS,
                  }}
                >
                  Share
                </button>
              </div>
              <div style={{ fontSize: 12, color: TEXT_SEC }}>
                6 friends invited · 4 became Keepers
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
