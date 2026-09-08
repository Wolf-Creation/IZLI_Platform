import { INDIGO, TEXT_SEC, BORDER, CLAY, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF, FONT_SANS } from '../../../tokens'
import type { WebPage } from '../../types'
import './Events.scss'

interface Props { onNavigate: (p: WebPage) => void }

const UPCOMING = [
  { title: 'Echoes of Stone — Launch Evening', type: 'Collection Launch', date: '19 Jul 2026', time: '19:00 – 22:00', location: 'IZLI, Paris 10e', capacity: 60, registered: 44, img: 'photo-1469334031218-e382a71b716b', featured: true, desc: 'Join us for the launch of the Echoes of Stone collection — an evening with the team, archival material, and an in-conversation with the embroidery artisans from Casablanca.' },
  { title: 'Tifinagh Script Workshop', type: 'Workshop', date: '26 Jul 2026', time: '14:00 – 17:00', location: 'Online (Zoom)', capacity: 30, registered: 28, img: 'photo-1516762689617-e1cffcef479d', featured: false, desc: 'An introduction to Tifinagh script history and practice with Amazigh cultural historian Youssef Taïeb. Open to all community members.' },
  { title: 'Atlas Pattern Challenge — Submission Workshop', type: 'Community', date: '3 Aug 2026', time: '16:00 – 18:00', location: 'Online', capacity: 50, registered: 22, img: 'photo-1523381210434-271e8be1f52b', featured: false, desc: 'A practical session for anyone who wants to contribute to the Atlas Pattern Remix challenge. We will walk through submission formats, research resources, and evaluation criteria.' },
  { title: 'Community Lab Open Day', type: 'Community', date: '12 Sep 2026', time: '11:00 – 16:00', location: 'IZLI, Paris 10e', capacity: 40, registered: 12, img: 'photo-1521572163474-6864f9cf17ab', featured: false, desc: 'An open studio day for community members to meet the IZLI team, see active Lab projects in progress, and learn how to get involved.' },
]

const TYPE_STYLE: Record<string, { bg: string; color: string }> = { 'Collection Launch': { bg: '#E8EDF3', color: INDIGO }, 'Workshop': { bg: SURFACE_2, color: CLAY }, 'Community': { bg: '#E6EDE8', color: '#4A7A5A' } }

export default function Events({ onNavigate }: Props) {
  const featured = UPCOMING[0]
  const rest = UPCOMING.slice(1)
  return (
    <div className="events-page" style={{ background: BG, minHeight: '100vh' }}>
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: '56px 40px 40px' }}><div style={{ maxWidth: 1280, margin: '0 auto' }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEXT_SEC, marginBottom: 12 }}>Events</div><h1 style={{ fontFamily: FONT_SERIF, fontSize: 48, fontWeight: 500, color: INDIGO, margin: 0 }}>What's on</h1></div></div>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 40px 0' }}>
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: 48 }}>
          <div style={{ overflow: 'hidden', position: 'relative' }}><img src={`https://images.unsplash.com/${featured.img}?w=800&h=600&fit=crop&auto=format`} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /><div style={{ position: 'absolute', top: 20, left: 20 }}><span style={{ fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 999, background: INDIGO, color: CREAM }}>Upcoming</span></div></div>
          <div style={{ padding: '48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}><span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: TYPE_STYLE[featured.type].bg, color: TYPE_STYLE[featured.type].color }}>{featured.type}</span></div>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 500, color: INDIGO, margin: 0, lineHeight: 1.2, marginBottom: 14 }}>{featured.title}</h2>
            <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.75, margin: 0, marginBottom: 24 }}>{featured.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>{[{ icon: '◷', text: `${featured.date} · ${featured.time}` }, { icon: '◎', text: featured.location }, { icon: '◯', text: `${featured.registered} / ${featured.capacity} registered` }].map(d => (<div key={d.text} style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ fontSize: 14, color: SAND }}>{d.icon}</span><span style={{ fontSize: 13, color: TEXT_SEC }}>{d.text}</span></div>))}</div>
            <div style={{ background: BORDER, borderRadius: 999, height: 5, marginBottom: 20 }}><div style={{ width: `${Math.round((featured.registered / featured.capacity) * 100)}%`, height: '100%', background: INDIGO, borderRadius: 999 }} /></div>
            <button onClick={() => onNavigate('login')} style={{ padding: '12px 24px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS, alignSelf: 'flex-start' }}>Register for this Event</button>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px 72px' }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 28, fontWeight: 500, color: INDIGO, margin: 0, marginBottom: 24 }}>More Events</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {rest.map(e => { const ts = TYPE_STYLE[e.type]; return (<div key={e.title} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', display: 'grid', gridTemplateColumns: '140px 1fr auto' }}><div style={{ overflow: 'hidden' }}><img src={`https://images.unsplash.com/${e.img}?w=280&h=220&fit=crop&auto=format`} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div><div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div style={{ display: 'flex', gap: 8, marginBottom: 8 }}><span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: ts.bg, color: ts.color }}>{e.type}</span></div><div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 500, color: INDIGO, marginBottom: 6 }}>{e.title}</div><div style={{ display: 'flex', gap: 16, fontSize: 12, color: TEXT_SEC }}><span>◷ {e.date} · {e.time}</span><span>◎ {e.location}</span><span>◯ {e.registered}/{e.capacity}</span></div></div><div style={{ padding: '24px 24px', display: 'flex', alignItems: 'center' }}><button onClick={() => onNavigate('login')} style={{ padding: '9px 18px', background: INDIGO, color: CREAM, border: 'none', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_SANS, whiteSpace: 'nowrap' }}>Register →</button></div></div>) })}
        </div>
      </section>
    </div>
  )
}