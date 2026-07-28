import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const BORDER = '#D8D0C4'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'

interface NavItem {
  label: string
  screen?: Screen
  icon: string
  children?: { label: string; screen: Screen; icon: string }[]
}

function Icon({ icon, width = 20, height = 20, style }: { icon: string; width?: number; height?: number; style?: React.CSSProperties }) {
  const glyph = ICON_GLYPHS[icon] ?? '◌'
  return (
    <span
      aria-hidden="true"
      style={{
        width,
        height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.min(width, height) * 0.9,
        lineHeight: 1,
        userSelect: 'none',
        ...style,
      }}
    >
      {glyph}
    </span>
  )
}

const ICON_GLYPHS: Record<string, string> = {
  'mdi:view-dashboard-outline': '⌂',
  'mdi:shopping-outline': '🛍',
  'mdi:tshirt-crew-outline': '👕',
  'mdi:folder-multiple-outline': '🗂',
  'mdi:package-variant-closed-outline': '📦',
  'mdi:book-open-page-variant-outline': '📖',
  'mdi:newspaper-variant-outline': '📰',
  'mdi:archive-outline': '🗄',
  'mdi:archive-star-outline': '★',
  'mdi:image-multiple-outline': '🖼',
  'mdi:palette-outline': '🎨',
  'mdi:web-outline': '🌐',
  'mdi:file-document-outline': '📄',
  'mdi:graph-outline': '⟡',
  'mdi:brush-outline': '🖌',
  'mdi:lightbulb-outline': '💡',
  'mdi:card-account-details-outline': '🪪',
  'mdi:qrcode-scan': '▣',
  'mdi:account-group-outline': '👥',
  'mdi:account-multiple-outline': '👤',
  'mdi:hand-heart-outline': '🤝',
  'mdi:flag-outline': '⚑',
  'mdi:flask-outline': '⚗',
  'mdi:timeline-outline': '≋',
  'mdi:account-heart-outline': '♡',
  'mdi:stairs-up': '↟',
  'mdi:vote-outline': '✓',
  'mdi:gift-outline': '🎁',
  'mdi:trophy-outline': '🏆',
  'mdi:email-outline': '✉',
  'mdi:share-variant-outline': '⇪',
  'mdi:factory': '🏭',
  'mdi:monitor-dashboard': '🖥',
  'mdi:file-document-multiple-outline': '📑',
  'mdi:folder-multiple-image': '🖼',
  'mdi:layers-outline': '⬚',
  'mdi:export': '⤴',
  'mdi:shape-outline': '⬡',
  'mdi:chart-box-outline': '📊',
  'mdi:chart-line': '📈',
  'mdi:chart-timeline-variant': '📉',
  'mdi:account-chart-outline': '📋',
  'mdi:file-chart-outline': '🗒',
  'mdi:star-four-points-outline': '✦',
  'mdi:cog-outline': '⚙',
  'mdi:account-cog-outline': '🛠',
  'mdi:robot-outline': '🤖',
  'mdi:tune-variant': '🎚',
  'mdi:file-search-outline': '🔎',
  'mdi:chevron-down': '⌄',
}

const NAV: NavItem[] = [
  { label: 'Overview', screen: 'dashboard', icon: 'mdi:view-dashboard-outline' },
  {
    label: 'Commerce',
    icon: 'mdi:shopping-outline',
    children: [
      { label: 'Products', screen: 'products', icon: 'mdi:tshirt-crew-outline' },
      { label: 'Collections', screen: 'collections', icon: 'mdi:folder-multiple-outline' },
      { label: 'Orders', screen: 'orders', icon: 'mdi:package-variant-closed-outline' },
    ],
  },
  {
    label: 'Content',
    icon: 'mdi:book-open-page-variant-outline',
    children: [
      { label: 'Stories', screen: 'stories', icon: 'mdi:newspaper-variant-outline' },
      { label: 'Heritage Library', screen: 'heritage-library', icon: 'mdi:archive-outline' },
      { label: 'Media Library', screen: 'media-library', icon: 'mdi:image-multiple-outline' },
      { label: 'Brand Assets', screen: 'brand-assets', icon: 'mdi:palette-outline' },
      { label: 'Website Builder', screen: 'home-builder', icon: 'mdi:web-outline' },
      { label: 'Site Pages', screen: 'site-page-editor', icon: 'mdi:file-document-outline' },
    ],
  },
  {
    label: 'Content Graph',
    icon: 'mdi:graph-outline',
    children: [
      { label: 'Style Guides', screen: 'style-guides', icon: 'mdi:brush-outline' },
      { label: 'Recommendation Hub', screen: 'recommendation-hub', icon: 'mdi:lightbulb-outline' },
      { label: 'Product Passports', screen: 'product-passports', icon: 'mdi:card-account-details-outline' },
      { label: 'QR Experiences', screen: 'qr-experiences', icon: 'mdi:qrcode-scan' },
    ],
  },
  {
    label: 'Community',
    icon: 'mdi:account-group-outline',
    children: [
      { label: 'Members', screen: 'members', icon: 'mdi:account-multiple-outline' },
      { label: 'Contributions', screen: 'contributions', icon: 'mdi:hand-heart-outline' },
      { label: 'Challenges', screen: 'challenges', icon: 'mdi:flag-outline' },
      { label: 'Community Lab', screen: 'lab-projects', icon: 'mdi:flask-outline' },
    ],
  },
  {
    label: 'Legacy',
    icon: 'mdi:archive-outline',
    children: [
      { label: 'Legacies', screen: 'legacies', icon: 'mdi:archive-star-outline' },
      { label: 'Archives', screen: 'legacy-archives', icon: 'mdi:archive-outline' },
      { label: 'Legacy Timeline', screen: 'legacy-timeline', icon: 'mdi:timeline-outline' },
      { label: 'Keeper Circle', screen: 'legacy-keeper-circle', icon: 'mdi:account-heart-outline' },
      { label: 'Keeper Levels', screen: 'legacy-keeper-levels', icon: 'mdi:stairs-up' },
      { label: 'Voting', screen: 'legacy-voting', icon: 'mdi:vote-outline' },
      { label: 'Rewards', screen: 'legacy-rewards', icon: 'mdi:gift-outline' },
      { label: 'Achievements', screen: 'legacy-achievements', icon: 'mdi:trophy-outline' },
      { label: 'Invitations', screen: 'legacy-invitations', icon: 'mdi:email-outline' },
      { label: 'Referral Program', screen: 'legacy-referral', icon: 'mdi:share-variant-outline' },
    ],
  },
  {
    label: 'Production',
    icon: 'mdi:factory',
    children: [
      { label: 'Production Dashboard', screen: 'production-center', icon: 'mdi:monitor-dashboard' },
      { label: 'Production Templates', screen: 'production-templates', icon: 'mdi:file-document-multiple-outline' },
      { label: 'Production Assets', screen: 'production-assets', icon: 'mdi:folder-multiple-image' },
      { label: 'Batch Jobs', screen: 'batch-generator', icon: 'mdi:layers-outline' },
      { label: 'Exports', screen: 'export-center', icon: 'mdi:export' },
    ],
  },
  { label: 'Design System', screen: 'components', icon: 'mdi:shape-outline' },
  {
    label: 'Analytics',
    icon: 'mdi:chart-box-outline',
    children: [
      { label: 'Commerce', screen: 'commerce-analytics', icon: 'mdi:chart-line' },
      { label: 'Legacy', screen: 'legacy-analytics', icon: 'mdi:chart-timeline-variant' },
      { label: 'Community', screen: 'community-analytics', icon: 'mdi:account-chart-outline' },
      { label: 'Production', screen: 'production-analytics', icon: 'mdi:chart-box-outline' },
      { label: 'Content', screen: 'content-analytics', icon: 'mdi:file-chart-outline' },
      { label: 'Recommendations', screen: 'recommendation-analytics', icon: 'mdi:star-four-points-outline' },
    ],
  },
  {
    label: 'System',
    icon: 'mdi:cog-outline',
    children: [
      { label: 'Team & Roles', screen: 'team-roles', icon: 'mdi:account-cog-outline' },
      { label: 'Automation', screen: 'system-automation', icon: 'mdi:robot-outline' },
      { label: 'Global Settings', screen: 'global-settings', icon: 'mdi:tune-variant' },
      { label: 'Audit Log', screen: 'audit-log', icon: 'mdi:file-search-outline' },
    ],
  },
]

interface Props {
  active: Screen
  onNavigate: (s: Screen) => void
  collapsed: boolean
  hovered: boolean
  onToggleCollapse: () => void
  onHoverChange: (hovered: boolean) => void
}

export default function Sidebar({ active, onNavigate, collapsed, hovered, onToggleCollapse, onHoverChange }: Props) {
  const expanded = !collapsed || hovered
  const [openSection, setOpenSection] = useState<string | null>(null)

  return (
    <aside style={{
      width: expanded ? 264 : 72,
      minWidth: expanded ? 264 : 72,
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
      transition: 'width 0.18s ease, min-width 0.18s ease',
    }} onMouseEnter={() => onHoverChange(true)} onMouseLeave={() => onHoverChange(false)}>
      <div style={{ padding: expanded ? '26px 24px 20px' : '22px 16px 18px', borderBottom: `1px solid ${BORDER}` }}>
        <button
          onClick={onToggleCollapse}
          style={{ display: 'flex', alignItems: 'center', gap: expanded ? 10 : 0, width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ width: 32, height: 32, background: INDIGO, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#E7DFD2', fontSize: 14, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>I</span>
          </div>
          {expanded && (
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 17, color: INDIGO, letterSpacing: '0.02em' }}>IZLI</div>
              <div style={{ fontSize: 10, color: TEXT_SEC, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 1 }}>Admin</div>
            </div>
          )}
        </button>
      </div>

      <nav
        style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      >
        {NAV.map((item) => (
          <NavSection
            key={item.label}
            item={item}
            active={active}
            onNavigate={onNavigate}
            collapsed={collapsed && !hovered}
            open={openSection === item.label}
            onToggle={() => setOpenSection(current => current === item.label ? null : item.label)}
          />
        ))}
      </nav>

      <div style={{ padding: expanded ? '14px 20px' : '14px 0', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: expanded ? 10 : 0, justifyContent: expanded ? 'flex-start' : 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#E7DFD2' }}>AK</div>
          {expanded && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Amine Kherrab</div>
              <div style={{ fontSize: 11, color: TEXT_SEC }}>Super Admin</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

function NavSection({ item, active, onNavigate, collapsed, open, onToggle }: { item: NavItem; active: Screen; onNavigate: (s: Screen) => void; collapsed: boolean; open: boolean; onToggle: () => void }) {
  const isChildActive = item.children?.some(c => c.screen === active)
  const isActive = item.screen === active

  if (item.children) {
    return (
      <div style={{ marginBottom: 2 }}>
        <button
          type="button"
          onClick={onToggle}
          style={{
            display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '8px 0' : '6px 20px',
            fontSize: 13, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: isChildActive ? INDIGO : TEXT_SEC,
            cursor: 'pointer', userSelect: 'none', width: '100%', background: 'transparent', border: 'none', textAlign: 'left',
          }}>
          <Icon icon={item.icon} width={20} height={20} style={{ color: isChildActive ? INDIGO : TEXT_SEC, opacity: 0.8, flexShrink: 0, marginLeft: collapsed ? 'auto' : 0, marginRight: collapsed ? 'auto' : 0 }} />
          {!collapsed && item.label}
          {!collapsed && (
            <Icon icon="mdi:chevron-down" width={20} height={20} style={{ marginLeft: 'auto', color: TEXT_SEC, opacity: 0.7, paddingRight: 20, lineHeight: 1, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease' }} />
          )}
        </button>
        {open && !collapsed && item.children.map(child => (
          <button key={child.label} onClick={() => onNavigate(child.screen)}
            style={{
              display: 'flex', alignItems: 'center', width: '100%',
              padding: '6px 20px 6px 44px',
              fontSize: 12, fontWeight: active === child.screen ? 500 : 400,
              textTransform: 'uppercase',
              color: active === child.screen ? INDIGO : TEXT,
              background: active === child.screen ? '#E8EDF3' : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s',
            }}
            onMouseEnter={e => { if (active !== child.screen) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(30,47,68,0.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = active === child.screen ? '#E8EDF3' : 'transparent' }}
          >
            <Icon icon={child.icon} width={18} height={18} style={{ color: active === child.screen ? INDIGO : TEXT_SEC, marginRight: 10, flexShrink: 0, opacity: 0.8 }} />
            {child.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <button onClick={() => item.screen && onNavigate(item.screen)}
      style={{
        display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10, width: '100%',
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? '10px 0' : '7px 20px', fontSize: 14, fontWeight: isActive ? 500 : 400,
        textTransform: 'uppercase',
        color: isActive ? INDIGO : TEXT,
        background: isActive ? '#E8EDF3' : 'transparent',
        border: 'none', cursor: item.screen ? 'pointer' : 'default', textAlign: 'left',
        transition: 'background 0.12s', marginBottom: 1,
      }}
      onMouseEnter={e => { if (!isActive && item.screen) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(30,47,68,0.05)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = isActive ? '#E8EDF3' : 'transparent' }}
    >
      <Icon icon={item.icon} width={20} height={20} style={{ color: isActive ? INDIGO : '#B7AA91', width: 20, lineHeight: 1, flexShrink: 0, opacity: 0.8, marginLeft: collapsed ? 'auto' : 0, marginRight: collapsed ? 'auto' : 0 }} />
      {!collapsed && item.label}
    </button>
  )
}
