import { INDIGO, TEXT_SEC, BORDER, CLAY, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF, FONT_SANS } from '../../../tokens'
import type { WebPage } from '../../types'
import './CommunityLab.scss'

interface Props { onNavigate: (p: WebPage) => void }

const PROJECTS = [
  { name: 'Mountain Memory Atlas', status: 'Active', participants: 8, contributions: 34, milestone: 'Editorial review', img: 'photo-1469334031218-e382a71b716b', source: 'Atlas Pattern Remix' },
  { name: 'Community Symbol Archive', status: 'Active', participants: 12, contributions: 56, milestone: 'Submission close Sep', img: 'photo-1516762689617-e1cffcef479d', source: 'Archive a Symbol' },
  { name: 'Indigo Story Capsule', status: 'Active', participants: 6, contributions: 18, milestone: 'First draft Oct', img: 'photo-1490481651871-ab68de25d43d', source: 'Indigo Dye Archive' },
]

const OPEN_CALLS = [
  { title: 'Mountain Memory Atlas — Open Call', type: 'Research', submissions: 34, capacity: 60, deadline: '15 Aug 2026', img: 'photo-1469334031218-e382a71b716b' },
  { title: 'Symbol Archive — Regional Documentarians', type: 'Documentary', submissions: 56, capacity: 100, deadline: '30 Sep 2026', img: 'photo-1516762689617-e1cffcef479d' },
  { title: 'Indigo Story — Textile Heritage Contributors', type: 'Textile', submissions: 18, capacity: 30, deadline: '31 Oct 2026', img: 'photo-1490481651871-ab68de25d43d' },
]

const STEPS = [
  { n: '01', title: 'Challenge launched', desc: 'A challenge is published with a brief, timeline, and format guidelines. Anyone can participate.' },
  { n: '02', title: 'Contributions submitted', desc: 'Community members submit their work — photography, writing, drawings, field recordings, or craft.' },
  { n: '03', title: 'Curation & research', desc: 'The IZLI team reviews submissions with community moderators. Selected contributions enter the Lab.' },
  { n: '04', title: 'Becomes real', desc: 'Lab projects are turned into editorial stories, archived research, or the basis for new IZLI garments.' },
]

export default function CommunityLab({ onNavigate }: Props) {
  return (
    <div className="communitylab-page" style={{ background: BG }}>
      <section style={{ background: INDIGO, padding: '88px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SAND, marginBottom: 16 }}>Community Lab</div>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 56, fontWeight: 500, color: CREAM, margin: 0, lineHeight: 1.05, marginBottom: 20 }}>Where contributions become collections.</h1>
            <p style={{ fontSize: 15, color: 'rgba(231,223,210,0.65)', lineHeight: 1.8, margin: 0, marginBottom: 32 }}>The Community Lab is IZLI's collaborative research space. It turns the best community contributions into editorial stories, archived research, and real product prototypes. Every garment we make has a source.</p>
            <button onClick={() => onNavigate('login')} style={{ padding: '12px 24px', background: CREAM, color: INDIGO, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT_SANS }}>Join the Lab →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ label: 'Active Projects', value: '4' }, { label: 'Participants', value: '26' }, { label: 'Contributions', value: '108' }, { label: 'Stories Generated', value: '4' }].map(s => (<div key={s.label} style={{ background: 'rgba(231,223,210,0.08)', borderRadius: 14, padding: '20px 18px', border: '1px solid rgba(231,223,210,0.12)' }}><div style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: CREAM, lineHeight: 1 }}>{s.value}</div><div style={{ fontSize: 11, color: 'rgba(231,223,210,0.5)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>{s.label}</div></div>))}
          </div>
        </div>
      </section>
      <section style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: '72px 40px' }}><div style={{ maxWidth: 1280, margin: '0 auto' }}><h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 48, textAlign: 'center' }}>How the Lab works</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>{STEPS.map(s => (<div key={s.n}><div style={{ fontFamily: FONT_SERIF, fontSize: 40, fontWeight: 400, color: BORDER, marginBottom: 16 }}>{s.n}</div><div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO, marginBottom: 10 }}>{s.title}</div><div style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.7 }}>{s.desc}</div></div>))}</div></div></section>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 40px' }}><h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 36 }}>Active Projects</h2><div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{PROJECTS.map(p => (<div key={p.name} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden', display: 'grid', gridTemplateColumns: '200px 1fr' }}><div style={{ overflow: 'hidden' }}><img src={`https://images.unsplash.com/${p.img}?w=400&h=280&fit=crop&auto=format`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div><div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div style={{ display: 'flex', gap: 8, marginBottom: 10 }}><span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>Active</span></div><h3 style={{ fontFamily: FONT_SERIF, fontSize: 22, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 8 }}>{p.name}</h3><div style={{ display: 'flex', gap: 28, marginBottom: 12 }}><div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}><span style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 600, color: INDIGO }}>{p.participants}</span><span style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Participants</span></div><div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}><span style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 600, color: INDIGO }}>{p.contributions}</span><span style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Contributions</span></div></div><div style={{ fontSize: 12, color: INDIGO, fontWeight: 500, marginBottom: 14 }}>◇ From challenge: {p.source}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>Next milestone: {p.milestone}</div></div></div>))}</div></section>
      <section style={{ background: SURFACE_2, borderTop: `1px solid ${BORDER}`, padding: '72px 40px' }}><div style={{ maxWidth: 1280, margin: '0 auto' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 36 }}><h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0 }}>Open Calls</h2><span style={{ fontSize: 13, color: TEXT_SEC }}>3 open calls · 108 submissions</span></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>{OPEN_CALLS.map(c => (<div key={c.title} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}><div style={{ height: 140, overflow: 'hidden' }}><img src={`https://images.unsplash.com/${c.img}?w=500&h=280&fit=crop&auto=format`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div><div style={{ padding: '20px' }}><span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: BG, color: TEXT_SEC, border: `1px solid ${BORDER}`, fontWeight: 500, display: 'inline-block', marginBottom: 10 }}>{c.type}</span><div style={{ fontSize: 14, fontWeight: 500, color: TEXT, lineHeight: 1.3, marginBottom: 10 }}>{c.title}</div><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, color: TEXT_SEC }}><span>{c.submissions} / {c.capacity} submissions</span><span>Deadline: {c.deadline}</span></div><div style={{ background: BORDER, borderRadius: 999, height: 4, marginBottom: 14 }}><div style={{ width: `${Math.round((c.submissions / c.capacity) * 100)}%`, height: '100%', background: INDIGO, borderRadius: 999 }} /></div><button onClick={() => onNavigate('login')} style={{ width: '100%', padding: '9px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS }}>Submit a Contribution</button></div></div>))}</div></div></section>
    </div>
  )
}