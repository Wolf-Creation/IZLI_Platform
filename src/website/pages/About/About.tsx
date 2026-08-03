import { INDIGO, TEXT_SEC, BORDER, CLAY, BG, SURFACE, SURFACE_2, CREAM, SAND, FONT_SERIF } from '../../../tokens'
import type { WebPage } from '../../types'
import './About.scss'

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
    <div className="about-page" style={{ background: BG }}>
      <section className="about-hero">
        <div className="about-hero__inner">
          <div className="about-kicker">About IZLI</div>
          <h1 className="about-title" style={{ fontFamily: FONT_SERIF }}>
            Contemporary menswear. Amazigh heritage.
          </h1>
          <p className="about-hero__text">
            IZLI is a Casablanca-founded menswear brand translating Amazigh craft traditions into contemporary garments. We are a design studio, a community platform, and a living archive — all in one.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section about-story" style={{ padding: 0 }}>
          <div>
            <div className="about-section-kicker">Our Story</div>
            <h2 className="about-heading about-heading--xl" style={{ fontFamily: FONT_SERIF }}>
              Founded on a belief that craft traditions are not historical artifacts.
            </h2>
            <p className="about-text">
              IZLI was founded in 2022 in Casablanca by Amine Karimi, after six years of working in heritage preservation with Amazigh communities in the Middle Atlas. The name comes from the Tamazight word for "thread" — a metaphor for connection, continuity, and weaving across time.
            </p>
            <p className="about-text">
              Our first collection was made in collaboration with embroiderers in the Draa Valley. Today, every IZLI garment begins with research: archival visits, community contributions, and deep conversations with the people whose heritage we carry into our work.
            </p>
          </div>
          <div className="about-media">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&h=875&fit=crop&auto=format" alt="IZLI origin" />
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-section" style={{ padding: 0 }}>
          <h2 className="about-heading about-heading--lg" style={{ textAlign: 'center', fontFamily: FONT_SERIF }}>
            What we believe
          </h2>
          <div className="about-values__grid">
            {[
              { title: 'Heritage is a practice, not a museum piece.', desc: 'We do not reproduce heritage as costume. We research it, learn from it, and let it evolve through contemporary form.' },
              { title: 'The community knows more than the designer.', desc: 'The people who carry Amazigh traditions are our most important collaborators. Our community platform is not marketing — it is research.' },
              { title: 'Slow is the only way forward.', desc: 'We make limited quantities. We work with artisans at their pace. We do not do seasonal sales, off-price, or excess inventory.' },
            ].map(v => (
              <div key={v.title} className="about-card">
                <h3 className="about-card__title" style={{ fontFamily: FONT_SERIF }}>{v.title}</h3>
                <p className="about-text" style={{ fontSize: 13, lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-heading about-heading--lg" style={{ fontFamily: FONT_SERIF }}>The team</h2>
        <div className="about-team__grid">
          {TEAM.map(t => (
            <div key={t.name} className="about-team__card">
              <div className="about-team__photo">
                <div className="about-team__avatar">{t.avatar}</div>
              </div>
              <div className="about-team__body">
                <div className="about-team__name" style={{ fontFamily: FONT_SERIF }}>{t.name}</div>
                <div className="about-team__role">{t.role}</div>
                <div className="about-team__location">{t.location}</div>
                <p className="about-team__bio">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-press">
        <div className="about-press__inner">
          <div className="about-press-kicker">As seen in</div>
          <div className="about-press__grid">
            {PRESS.map(p => (
              <div key={p.outlet} className="about-press__card">
                <div className="about-press__outlet" style={{ fontFamily: FONT_SERIF }}>{p.outlet}</div>
                <p className="about-press__quote">{p.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}