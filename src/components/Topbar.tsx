import type { Screen } from '../types'

const BORDER = '#D8D0C4'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const INDIGO = '#1E2F44'

const BREADCRUMBS: Partial<Record<Screen, string[]>> = {
  dashboard: ['Overview'],
  products: ['Commerce', 'Products'],
  'product-editor': ['Commerce', 'Products', 'Tifinagh Frame Tee'],
  collections: ['Commerce', 'Collections'],
  'collection-editor': ['Commerce', 'Collections', 'Echoes of Stone'],
  orders: ['Commerce', 'Orders'],
  customer: ['Commerce', 'Customers', 'Mehdi Aït Mansour'],
  'home-builder': ['Website & Content', 'Home Builder'],
  'site-page-editor': ['Website & Content', 'Site Pages', 'About'],
  'media-library': ['Website & Content', 'Media Library'],
  stories: ['Journal & Stories', 'Stories'],
  'story-editor': ['Journal & Stories', 'Stories', 'Indigo as Memory'],
  'story-review': ['Journal & Stories', 'Review Queue'],
  members: ['Community', 'Members'],
  'member-profile': ['Community', 'Members', 'Youcef Benali'],
  contributions: ['Community', 'Contributions'],
  'contribution-detail': ['Community', 'Contributions', 'CON-0441'],
  challenges: ['Challenges', 'All Challenges'],
  'challenge-editor': ['Challenges', 'All Challenges', 'Reinterpret a Mountain Mark'],
  'challenge-submissions': ['Challenges', 'Submissions', 'Tifinagh Type Challenge'],
  'challenge-results': ['Challenges', 'Results', 'Tifinagh Type Challenge'],
  'lab-projects': ['Community Lab', 'Lab Projects'],
  'lab-project-editor': ['Community Lab', 'Lab Projects', 'Mountain Memory Atlas'],
  'calls-for-contribution': ['Community Lab', 'Open Calls'],
  'commerce-analytics': ['Analytics', 'Commerce'],
  'community-analytics': ['Analytics', 'Community'],
  'content-analytics': ['Analytics', 'Content'],
  'team-roles': ['System', 'Team & Roles'],
  'global-settings': ['System', 'Global Settings'],
  'audit-log': ['System', 'Audit Log'],
  'style-guides': ['Commerce', 'Style Guides'],
  'style-guide-editor': ['Commerce', 'Style Guides', 'Sage Collection Style Guide'],
  'recommendation-hub': ['Commerce', 'Recommendation Hub'],
  'recommendation-hub-editor': ['Commerce', 'Recommendation Hub', 'Complete Your Style'],
  'product-passports': ['Commerce', 'Product Passports'],
  'product-passport-editor': ['Commerce', 'Product Passports', 'IZLI-2026-000125'],
  'legacy-archives': ['Legacy', 'Archives'],
  'legacy-timeline': ['Legacy', 'Legacy Timeline'],
  'legacy-keeper-circle': ['Legacy', 'Keeper Circle'],
  'legacy-voting': ['Legacy', 'Voting'],
  'legacy-rewards': ['Legacy', 'Rewards'],
  'legacy-achievements': ['Legacy', 'Achievements'],
  'legacy-invitations': ['Legacy', 'Invitations'],
  'legacy-referral': ['Legacy', 'Referral Program'],
  'legacy-analytics': ['Legacy', 'Legacy Analytics'],
  'production-center': ['Production', 'Production Dashboard'],
  'production-templates': ['Production', 'Production Templates'],
  'production-assets': ['Production', 'Production Assets'],
  'print-presets': ['Production', 'Print Presets'],
  'batch-generator': ['Production', 'Batch Jobs'],
  'export-center': ['Production', 'Exports'],
  'components': ['Design System'],
  'heritage-library': ['Content', 'Heritage Library'],
  'brand-assets': ['Content', 'Brand Assets'],
  'qr-experiences': ['Content Graph', 'QR Experiences'],
  'legacy-keeper-levels': ['Legacy', 'Keeper Levels'],
  'system-automation': ['System', 'Automation'],
  'production-analytics': ['Analytics', 'Production'],
  'recommendation-analytics': ['Analytics', 'Recommendations'],
}

interface Props {
  screen: Screen
  onNavigate: (s: Screen) => void
}

export default function Topbar({ screen, onNavigate }: Props) {
  const crumbs = BREADCRUMBS[screen] ?? ['Overview']

  return (
    <header style={{
      height: 60,
      background: '#F5F1EA',
      borderBottom: `1px solid ${BORDER}`,
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ color: '#B7AA91', fontSize: 12 }}>›</span>}
            <span style={{ fontSize: 13, color: i === crumbs.length - 1 ? TEXT : TEXT_SEC, fontWeight: i === crumbs.length - 1 ? 500 : 400, whiteSpace: 'nowrap' }}>{crumb}</span>
          </span>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '6px 12px', width: 200, flexShrink: 0 }}>
        <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
        <input placeholder="Search..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }} />
        <span style={{ fontSize: 10, color: '#B7AA91', background: '#D8D0C4', padding: '2px 5px', borderRadius: 4 }}>⌘K</span>
      </div>

      <button onClick={() => onNavigate('challenge-editor')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
        + Create
      </button>

      <button style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${BORDER}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontSize: 16, flexShrink: 0 }}>
        🔔
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: '#8C6B52', borderRadius: 999, border: '1.5px solid #F5F1EA' }} />
      </button>

      <div style={{ width: 34, height: 34, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#E7DFD2', cursor: 'pointer', flexShrink: 0 }}>AK</div>
    </header>
  )
}
