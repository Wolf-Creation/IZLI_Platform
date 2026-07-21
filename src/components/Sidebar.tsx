import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const BORDER = '#D8D0C4'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'

interface NavItem {
  label: string
  screen?: Screen
  icon: string
  children?: { label: string; screen: Screen }[]
}

const NAV: NavItem[] = [
  { label: 'Overview', screen: 'dashboard', icon: '◈' },
  {
    label: 'Commerce',
    icon: '⬡',
    children: [
      { label: 'Products', screen: 'products' },
      { label: 'Collections', screen: 'collections' },
      { label: 'Orders', screen: 'orders' },
    ],
  },
  {
    label: 'Content',
    icon: '◫',
    children: [
      { label: 'Stories', screen: 'stories' },
      { label: 'Heritage Library', screen: 'heritage-library' },
      { label: 'Media Library', screen: 'media-library' },
      { label: 'Brand Assets', screen: 'brand-assets' },
      { label: 'Website Builder', screen: 'home-builder' },
      { label: 'Site Pages', screen: 'site-page-editor' },
    ],
  },
  {
    label: 'Content Graph',
    icon: '▦',
    children: [
      { label: 'Style Guides', screen: 'style-guides' },
      { label: 'Recommendation Hub', screen: 'recommendation-hub' },
      { label: 'Product Passports', screen: 'product-passports' },
      { label: 'QR Experiences', screen: 'qr-experiences' },
    ],
  },
  {
    label: 'Community',
    icon: '◯',
    children: [
      { label: 'Members', screen: 'members' },
      { label: 'Contributions', screen: 'contributions' },
      { label: 'Challenges', screen: 'challenges' },
      { label: 'Community Lab', screen: 'lab-projects' },
    ],
  },
  {
    label: 'Legacy',
    icon: '◉',
    children: [
      { label: 'Archives', screen: 'legacy-archives' },
      { label: 'Legacy Timeline', screen: 'legacy-timeline' },
      { label: 'Keeper Circle', screen: 'legacy-keeper-circle' },
      { label: 'Keeper Levels', screen: 'legacy-keeper-levels' },
      { label: 'Voting', screen: 'legacy-voting' },
      { label: 'Rewards', screen: 'legacy-rewards' },
      { label: 'Achievements', screen: 'legacy-achievements' },
      { label: 'Invitations', screen: 'legacy-invitations' },
      { label: 'Referral Program', screen: 'legacy-referral' },
    ],
  },
  {
    label: 'Production',
    icon: '⬢',
    children: [
      { label: 'Production Dashboard', screen: 'production-center' },
      { label: 'Production Templates', screen: 'production-templates' },
      { label: 'Production Assets', screen: 'production-assets' },
      { label: 'Batch Jobs', screen: 'batch-generator' },
      { label: 'Exports', screen: 'export-center' },
    ],
  },
  { label: 'Design System', screen: 'components', icon: '▣' },
  {
    label: 'Analytics',
    icon: '△',
    children: [
      { label: 'Commerce', screen: 'commerce-analytics' },
      { label: 'Legacy', screen: 'legacy-analytics' },
      { label: 'Community', screen: 'community-analytics' },
      { label: 'Production', screen: 'production-analytics' },
      { label: 'Content', screen: 'content-analytics' },
      { label: 'Recommendations', screen: 'recommendation-analytics' },
    ],
  },
  {
    label: 'System',
    icon: '⊞',
    children: [
      { label: 'Team & Roles', screen: 'team-roles' },
      { label: 'Automation', screen: 'system-automation' },
      { label: 'Global Settings', screen: 'global-settings' },
      { label: 'Audit Log', screen: 'audit-log' },
    ],
  },
]

interface Props {
  active: Screen
  onNavigate: (s: Screen) => void
}

export default function Sidebar({ active, onNavigate }: Props) {
  return (
    <aside style={{
      width: 264,
      minWidth: 264,
      height: '100vh',
      background: '#F5F1EA',
      borderRight: `1px solid ${BORDER}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      overflow: 'hidden',
    }}>
      <div style={{ padding: '26px 24px 20px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: INDIGO, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#E7DFD2', fontSize: 14, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>I</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 17, color: INDIGO, letterSpacing: '0.02em' }}>IZLI</div>
            <div style={{ fontSize: 10, color: TEXT_SEC, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 1 }}>Admin</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {NAV.map((item) => (
          <NavSection key={item.label} item={item} active={active} onNavigate={onNavigate} />
        ))}
      </nav>

      <div style={{ padding: '14px 20px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#E7DFD2' }}>AK</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Amine Kherrab</div>
            <div style={{ fontSize: 11, color: TEXT_SEC }}>Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function NavSection({ item, active, onNavigate }: { item: NavItem; active: Screen; onNavigate: (s: Screen) => void }) {
  const isChildActive = item.children?.some(c => c.screen === active)
  const isActive = item.screen === active

  if (item.children) {
    return (
      <div style={{ marginBottom: 2 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '6px 20px',
          fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
          color: isChildActive ? INDIGO : TEXT_SEC,
          cursor: 'default', userSelect: 'none',
        }}>
          <span style={{ fontSize: 13, opacity: 0.65 }}>{item.icon}</span>
          {item.label}
        </div>
        {item.children.map(child => (
          <button key={child.label} onClick={() => onNavigate(child.screen)}
            style={{
              display: 'flex', alignItems: 'center', width: '100%',
              padding: '6px 20px 6px 44px',
              fontSize: 13, fontWeight: active === child.screen ? 500 : 400,
              color: active === child.screen ? INDIGO : TEXT,
              background: active === child.screen ? '#E8EDF3' : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s',
            }}
            onMouseEnter={e => { if (active !== child.screen) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(30,47,68,0.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = active === child.screen ? '#E8EDF3' : 'transparent' }}
          >
            <span style={{ width: 5, height: 5, borderRadius: 999, background: active === child.screen ? INDIGO : '#B7AA91', marginRight: 10, flexShrink: 0 }} />
            {child.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <button onClick={() => item.screen && onNavigate(item.screen)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        padding: '7px 20px', fontSize: 13, fontWeight: isActive ? 500 : 400,
        color: isActive ? INDIGO : TEXT,
        background: isActive ? '#E8EDF3' : 'transparent',
        border: 'none', cursor: item.screen ? 'pointer' : 'default', textAlign: 'left',
        transition: 'background 0.12s', marginBottom: 1,
      }}
      onMouseEnter={e => { if (!isActive && item.screen) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(30,47,68,0.05)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = isActive ? '#E8EDF3' : 'transparent' }}
    >
      <span style={{ fontSize: 14, color: isActive ? INDIGO : '#B7AA91', width: 18 }}>{item.icon}</span>
      {item.label}
    </button>
  )
}
