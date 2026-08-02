import { useEffect, useMemo, useState } from 'react'
import { INDIGO, TEXT, TEXT_SEC, BORDER, CLAY, SAGE, SAND, BG, SURFACE, SURFACE_2, CREAM, FONT_SERIF, FONT_SANS } from '../../tokens'
import type { WebPage } from '../types'
import bg001 from '../../assets/Website_img/bg_001.png'
import bg002 from '../../assets/Website_img/bg_002.png'

interface Props { onNavigate: (p: WebPage) => void }

type SliderPhase = 'scene-1' | 'transition-to-2' | 'scene-2' | 'transition-to-1'

const SLIDER_TIMING = {
  scene: 7200,
  transition: 1800,
}

const HERO_SCENES = [
  {
    id: 'scene-1',
    tag: 'High Atlas Ksar',
    title: 'Front View / Heritage Frame',
    description: 'Warm atlas light, atmospheric haze and a fixed foreground model facing front to reveal the chest embroidery.',
    image: bg001,
    focus: 'center top',
    modelImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=1600&fit=crop&auto=format',
    modelAlt: 'Front view model wearing the heritage t-shirt',
  },
  {
    id: 'scene-2',
    tag: 'Maghrebi Desert',
    title: 'Back View / Campaign Reveal',
    description: 'Golden dunes, distant mountains and cinematic sunset light now revealing the back embroidery in full.',
    image: bg002,
    focus: 'center bottom',
    modelImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&h=1600&fit=crop&auto=format',
    modelAlt: 'Back view model wearing the heritage t-shirt',
  },
] as const

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
}

function CinematicHeroSlider({ onNavigate }: Props) {
  const [phase, setPhase] = useState<SliderPhase>('scene-1')
  const [motionProgress, setMotionProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    let started = performance.now()
    let running = true

    const tick = (now: number) => {
      if (!running) return
      const elapsed = now - started

      if (phase === 'scene-1' || phase === 'scene-2') {
        const progress = Math.min(elapsed / SLIDER_TIMING.scene, 1)
        setMotionProgress(easeInOutCubic(progress))

        if (progress >= 1) {
          started = now
          setPhase(current => current === 'scene-1' ? 'transition-to-2' : 'transition-to-1')
        }
      } else {
        const progress = Math.min(elapsed / SLIDER_TIMING.transition, 1)
        setMotionProgress(progress)

        if (progress >= 1) {
          started = now
          setPhase(current => current === 'transition-to-2' ? 'scene-2' : 'scene-1')
        }
      }

      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    return () => {
      running = false
      window.cancelAnimationFrame(raf)
    }
  }, [phase])

  const currentScene = phase === 'scene-2' || phase === 'transition-to-1' ? HERO_SCENES[1] : HERO_SCENES[0]
  const nextScene = currentScene.id === 'scene-1' ? HERO_SCENES[1] : HERO_SCENES[0]
  const transitionDirection = currentScene.id === 'scene-1' ? 1 : -1
  const isTransition = phase === 'transition-to-2' || phase === 'transition-to-1'
  const sceneZoom = phase === 'scene-1' || phase === 'scene-2' ? 1 + motionProgress * 0.15 : 1.15
  const transitionFade = isTransition ? motionProgress : 0
  const blurAmount = isTransition ? 10 + motionProgress * 18 : 0
  const shakeX = isTransition ? Math.sin(motionProgress * Math.PI * 7) * 4 : 0
  const shakeY = isTransition ? Math.cos(motionProgress * Math.PI * 6) * 2 : 0
  const foregroundRotation = phase === 'scene-1'
    ? -2
    : phase === 'scene-2'
      ? 2
      : transitionDirection > 0
        ? -2 + motionProgress * 22
        : 20 - motionProgress * 22
  const foregroundScale = 1 + (isTransition ? motionProgress * 0.015 : 0)

  const heroOverlay = useMemo(() => {
    const sceneAOpacity = currentScene.id === 'scene-1' ? 1 - transitionFade : transitionFade
    const sceneBOpacity = currentScene.id === 'scene-1' ? transitionFade : 1 - transitionFade

    return { sceneAOpacity, sceneBOpacity }
  }, [currentScene.id, transitionFade])

  const progressLabel = phase === 'scene-1' || phase === 'transition-to-2'
    ? 'Scene 01 · Back view'
    : 'Scene 02 · Front view'

  return (
    <section style={{ position: 'relative', minHeight: '88vh', overflow: 'hidden', background: '#120D09' }}>
      <style>{`@keyframes heroFloat { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -8px, 0); } }`}</style>

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#120D09' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'transparent',
            transform: `scale(${sceneZoom}) translate3d(${shakeX}px, ${shakeY}px, 0)`,
            filter: `${isTransition ? `blur(${blurAmount}px) saturate(1.12)` : 'saturate(1.04)'}`,
            opacity: heroOverlay.sceneAOpacity,
            transition: isTransition ? 'none' : 'opacity 900ms ease, filter 900ms ease, transform 900ms ease',
            willChange: 'transform, opacity, filter',
          }}
        />
        <img
          src={currentScene.image}
          alt={currentScene.tag}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: currentScene.focus,
            transform: `scale(${sceneZoom}) translate3d(${shakeX}px, ${shakeY}px, 0)`,
            filter: `${isTransition ? `blur(${blurAmount}px) saturate(1.08)` : 'saturate(1.05)'}`,
            opacity: heroOverlay.sceneAOpacity,
            transition: isTransition ? 'none' : 'opacity 900ms ease, filter 900ms ease, transform 900ms ease',
            willChange: 'transform, opacity, filter',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'transparent',
            transform: `scale(${1.05 + (isTransition ? motionProgress * 0.05 : 0)}) translate3d(${shakeX * -0.7}px, ${shakeY * 0.5}px, 0)`,
            filter: `${isTransition ? `blur(${Math.max(blurAmount - 6, 0)}px) saturate(1.08)` : 'blur(8px) saturate(1.02)'}`,
            opacity: heroOverlay.sceneBOpacity,
            transition: isTransition ? 'none' : 'opacity 900ms ease, filter 900ms ease, transform 900ms ease',
            willChange: 'transform, opacity, filter',
          }}
        />
        <img
          src={nextScene.image}
          alt={nextScene.tag}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: nextScene.focus,
            transform: `scale(${1.05 + (isTransition ? motionProgress * 0.05 : 0)}) translate3d(${shakeX * -0.7}px, ${shakeY * 0.5}px, 0)`,
            filter: `${isTransition ? `blur(${Math.max(blurAmount - 6, 0)}px) saturate(1.08)` : 'blur(8px) saturate(1.02)'}`,
            opacity: heroOverlay.sceneBOpacity,
            transition: isTransition ? 'none' : 'opacity 900ms ease, filter 900ms ease, transform 900ms ease',
            willChange: 'transform, opacity, filter',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,6,4,0.32) 0%, rgba(8,6,4,0.12) 54%, rgba(8,6,4,0.06) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 55% 44%, rgba(255,208,142,0.12), transparent 30%), linear-gradient(to top, rgba(8,6,4,0.18), transparent 36%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(360px, 0.92fr) minmax(0, 1.08fr)', minHeight: '88vh' }}>
        <div style={{ position: 'relative', padding: '56px 52px 56px 64px', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ width: '42%', minWidth: 280, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 3 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(231,223,210,0.72)', marginBottom: 18 }}>ROOTED IN HERITAGE. MADE FOR TODAY.</div>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 70, fontWeight: 500, color: CREAM, lineHeight: 0.95, margin: 0, marginBottom: 20, maxWidth: 360 }}>MODERN<br />AMAZIGH<br />WEAR</h1>
            <p style={{ fontSize: 17, color: 'rgba(231,223,210,0.72)', lineHeight: 1.7, maxWidth: 260, margin: 0, marginBottom: 28 }}>Heritage.<br />Transmission.<br />Freedom. Community.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('collections')} style={{ padding: '12px 20px', background: '#C9AB7D', color: '#231812', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: FONT_SANS, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Explore the Collection</button>
              <button onClick={() => onNavigate('stories')} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.02)', color: CREAM, border: '1px solid rgba(231,223,210,0.18)', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Discover Our World</button>
            </div>
          </div>

          <div style={{ flex: 1, position: 'relative', minHeight: '88vh', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, perspective: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: '4% 8% 12%', borderRadius: 28, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.08))', boxShadow: '0 18px 80px rgba(0,0,0,0.22)', opacity: 0.22, transform: `scale(${1 + motionProgress * 0.02}) translate3d(${motionProgress * 10}px, 0, 0)`, filter: isTransition ? 'blur(18px)' : 'blur(12px)' }} />
            </div>

            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translate3d(${isTransition ? motionProgress * 14 * transitionDirection : 0}px, 0, 0)` }}>
              <div style={{ width: 'min(46vw, 700px)', height: 'min(76vh, 820px)', position: 'relative', transformStyle: 'preserve-3d', transform: `translate3d(0, ${isTransition ? motionProgress * -10 : 0}px, 0) rotateY(${foregroundRotation}deg) scale(${foregroundScale})`, animation: 'heroFloat 10s ease-in-out infinite', boxShadow: '0 24px 120px rgba(0,0,0,0.24)', borderRadius: 28, overflow: 'hidden', background: 'rgba(255,255,255,0.02)', opacity: 0.98, filter: 'contrast(1.05) saturate(1.02)' }}>
                <img
                  src={currentScene.modelImage}
                  alt={currentScene.modelAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: currentScene.id === 'scene-1' ? 'center top' : 'center center', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: currentScene.id === 'scene-1' ? 'linear-gradient(180deg, rgba(60,29,12,0.00) 0%, rgba(60,29,12,0.10) 100%)' : 'linear-gradient(180deg, rgba(60,29,12,0.00) 0%, rgba(60,29,12,0.06) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: isTransition ? 'linear-gradient(90deg, rgba(255,255,255,0.00), rgba(255,255,255,0.12), rgba(255,255,255,0.00))' : 'transparent', opacity: motionProgress * 0.7, mixBlendMode: 'screen' }} />
              </div>
            </div>

            <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, zIndex: 3 }}>
              <div style={{ maxWidth: 300, color: 'rgba(231,223,210,0.84)', fontSize: 13, lineHeight: 1.7 }}>{progressLabel}</div>
              <div style={{ fontSize: 11, color: 'rgba(231,223,210,0.64)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{phase === 'scene-1' || phase === 'transition-to-2' ? 'Scene 01 → Scene 02' : 'Scene 02 → Scene 01'}</div>
            </div>
          </div>

          <div style={{ width: 320, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', zIndex: 3 }}>
            <div style={{ width: '100%', background: 'linear-gradient(180deg, rgba(246,239,230,0.94), rgba(238,229,217,0.90))', color: '#241B16', borderRadius: 6, padding: '18px 18px 16px', boxShadow: '0 18px 60px rgba(0,0,0,0.24)', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7B6A5D', marginBottom: 10 }}>Current Release</div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 26, lineHeight: 1.03, marginBottom: 10 }}>Release 001</div>
              <div style={{ fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#5E5249', lineHeight: 1.7, marginBottom: 14 }}>Rbor Heavy Tee<br />Sand Beige</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>79 TND</div>
              <div style={{ height: 1, background: 'rgba(36,27,22,0.10)', marginBottom: 12 }} />
              <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
                {[
                  '100 Points',
                  'Release 001 Badge',
                  'Keeper Circle Event #1',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#4E4137', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    <span style={{ width: 14, height: 14, borderRadius: 999, border: '1px solid rgba(36,27,22,0.45)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>⌁</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#75685D', marginBottom: 8 }}>
                <span>Limited Stock</span>
                <span>120 / 300</span>
              </div>
              <div style={{ height: 3, borderRadius: 999, background: 'rgba(36,27,22,0.08)', overflow: 'hidden', marginBottom: 18 }}>
                <div style={{ width: '40%', height: '100%', background: '#B89C77' }} />
              </div>
              <button style={{ width: '100%', padding: '12px 16px', background: '#120D09', color: CREAM, border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span>Shop Release 001</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
      <CinematicHeroSlider onNavigate={onNavigate} />

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
