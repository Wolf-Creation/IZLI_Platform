import { useEffect, useState } from 'react'
import type { Screen } from './types'
import WebsiteApp from './website/WebsiteApp'
import { ADMIN_ROUTES, adminPathForScreen, adminStateFromPath } from './routes/admin'
import { logout as authLogout } from './shared/services/auth'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './screens/Dashboard'
import ProductsList from './screens/ProductsList'
import ProductEditor from './screens/ProductEditor'
import CollectionsList from './screens/CollectionsList'
import CollectionEditor from './screens/CollectionEditor'
import OrdersList from './screens/OrdersList'
import CustomerDetail from './screens/CustomerDetail'
import HomeBuilder from './screens/HomeBuilder'
import SitePageEditor from './screens/SitePageEditor'
import MediaLibrary from './screens/MediaLibrary'
import StoriesList from './screens/StoriesList'
import StoryEditor from './screens/StoryEditor'
import StoryReviewQueue from './screens/StoryReviewQueue'
import MembersList from './screens/MembersList'
import MemberProfile from './screens/MemberProfile'
import ContributionsList from './screens/ContributionsList'
import ContributionDetail from './screens/ContributionDetail'
import ChallengesList from './screens/ChallengesList'
import ChallengeEditor from './screens/ChallengeEditor'
import ChallengeSubmissions from './screens/ChallengeSubmissions'
import ChallengeResults from './screens/ChallengeResults'
import LabProjectsList from './screens/LabProjectsList'
import LabProjectEditor from './screens/LabProjectEditor'
import CallsForContribution from './screens/CallsForContribution'
import CommerceAnalytics from './screens/CommerceAnalytics'
import CommunityAnalytics from './screens/CommunityAnalytics'
import ContentAnalytics from './screens/ContentAnalytics'
import TeamRoles from './screens/TeamRoles'
import GlobalSettings from './screens/GlobalSettings'
import AuditLog from './screens/AuditLog'
import Components from './screens/Components'
import StyleGuidesList from './screens/StyleGuidesList'
import StyleGuideEditor from './screens/StyleGuideEditor'
import RecommendationHubList from './screens/RecommendationHubList'
import RecommendationHubEditor from './screens/RecommendationHubEditor'
import ProductPassportList from './screens/ProductPassportList'
import ProductPassportEditor from './screens/ProductPassportEditor'
import ProductionCenter from './screens/ProductionCenter'
import ProductionTemplates from './screens/ProductionTemplates'
import ProductionAssets from './screens/ProductionAssets'
import PrintPresets from './screens/PrintPresets'
import BatchGenerator from './screens/BatchGenerator'
import ExportCenter from './screens/ExportCenter'
import LegacyArchives from './screens/LegacyArchives'
import LegacyTimeline from './screens/LegacyTimeline'
import LegacyKeeperCircle from './screens/LegacyKeeperCircle'
import LegacyVoting from './screens/LegacyVoting'
import LegacyRewards from './screens/LegacyRewards'
import LegacyAchievements from './screens/LegacyAchievements'
import LegacyInvitations from './screens/LegacyInvitations'
import LegacyReferral from './screens/LegacyReferral'
import LegacyAnalytics from './screens/LegacyAnalytics'
import Legacies from './screens/Legacies'
import HeritageLibrary from './screens/HeritageLibrary'
import BrandAssets from './screens/BrandAssets'
import QRExperiences from './screens/QRExperiences'
import QRCodeGenerator from './screens/QRCodeGenerator'
import LegacyKeeperLevels from './screens/LegacyKeeperLevels'
import SystemAutomation from './screens/SystemAutomation'
import ProductionAnalytics from './screens/ProductionAnalytics'
import RecommendationAnalytics from './screens/RecommendationAnalytics'

export default function App() {
  const initialAdminState = adminStateFromPath(window.location.pathname)
  const [app, setApp] = useState<'admin' | 'website'>(() => window.location.pathname.startsWith('/admin') ? 'admin' : 'website')
  const [screen, setScreen] = useState<Screen>(initialAdminState.screen)
  const [productEditorId, setProductEditorId] = useState<string | null>(initialAdminState.productEditorId)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarHovered, setSidebarHovered] = useState(false)

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (navigationEntry?.type === 'reload') {
      window.history.scrollRestoration = 'manual'
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    return () => {
      window.history.scrollRestoration = 'auto'
    }
  }, [])

  const navigate = (s: Screen) => {
    const nextPath = adminPathForScreen(s, productEditorId)
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }

    setScreen(s)
    if (s !== 'product-editor') {
      setProductEditorId(null)
    }
  }

  const openProductCreate = () => {
    setProductEditorId(null)
    if (window.location.pathname !== ADMIN_ROUTES.PRODUCT_NEW) {
      window.history.pushState({}, '', ADMIN_ROUTES.PRODUCT_NEW)
    }
    setScreen('product-editor')
  }

  const openProductEdit = (id: string) => {
    setProductEditorId(id)
    const nextPath = adminPathForScreen('product-editor', id)
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }
    setScreen('product-editor')
  }

  const closeProductEditor = () => {
    setProductEditorId(null)
    if (window.location.pathname !== ADMIN_ROUTES.PRODUCTS) {
      window.history.pushState({}, '', ADMIN_ROUTES.PRODUCTS)
    }
    setScreen('products')
  }

  useEffect(() => {
    const syncFromLocation = () => {
      const pathname = window.location.pathname
      const nextApp = pathname.startsWith('/admin') ? 'admin' : 'website'
      setApp(nextApp)

      if (nextApp === 'admin') {
        const nextState = adminStateFromPath(pathname)
        setScreen(nextState.screen)
        setProductEditorId(nextState.productEditorId)
      }
    }

    window.addEventListener('popstate', syncFromLocation)
    syncFromLocation()
    return () => window.removeEventListener('popstate', syncFromLocation)
  }, [])

  const openAdmin = () => {
    if (window.location.pathname !== ADMIN_ROUTES.DASHBOARD) {
      window.history.pushState({}, '', ADMIN_ROUTES.DASHBOARD)
    }
    setApp('admin')
    const nextState = adminStateFromPath(window.location.pathname)
    setScreen(nextState.screen)
    setProductEditorId(nextState.productEditorId)
  }

  const handleAdminLogout = async () => {
    await authLogout()
    if (window.location.pathname !== '/login') {
      window.history.pushState({}, '', '/login')
    }
    setScreen('dashboard')
    setProductEditorId(null)
    setApp('website')
  }

  const sidebarWidth = sidebarCollapsed && !sidebarHovered ? 72 : 264

  function renderScreen() {
    switch (screen) {
      case 'dashboard': return <Dashboard onNavigate={navigate} onCreateProduct={openProductCreate} onEditProduct={openProductEdit} />
      case 'products': return <ProductsList onNavigate={navigate} onCreateProduct={openProductCreate} onEditProduct={openProductEdit} />
      case 'product-editor': return <ProductEditor onNavigate={navigate} productId={productEditorId} onDone={closeProductEditor} />
      case 'collections': return <CollectionsList onNavigate={navigate} />
      case 'collection-editor': return <CollectionEditor onNavigate={navigate} />
      case 'orders': return <OrdersList onNavigate={navigate} />
      case 'customer': return <CustomerDetail onNavigate={navigate} />
      case 'home-builder': return <HomeBuilder onNavigate={navigate} />
      case 'site-page-editor': return <SitePageEditor onNavigate={navigate} />
      case 'media-library': return <MediaLibrary onNavigate={navigate} />
      case 'stories': return <StoriesList onNavigate={navigate} />
      case 'story-editor': return <StoryEditor onNavigate={navigate} />
      case 'story-review': return <StoryReviewQueue onNavigate={navigate} />
      case 'members': return <MembersList onNavigate={navigate} />
      case 'member-profile': return <MemberProfile onNavigate={navigate} />
      case 'contributions': return <ContributionsList onNavigate={navigate} />
      case 'contribution-detail': return <ContributionDetail onNavigate={navigate} />
      case 'challenges': return <ChallengesList onNavigate={navigate} />
      case 'challenge-editor': return <ChallengeEditor onNavigate={navigate} />
      case 'challenge-submissions': return <ChallengeSubmissions onNavigate={navigate} />
      case 'challenge-results': return <ChallengeResults onNavigate={navigate} />
      case 'lab-projects': return <LabProjectsList onNavigate={navigate} />
      case 'lab-project-editor': return <LabProjectEditor onNavigate={navigate} />
      case 'calls-for-contribution': return <CallsForContribution onNavigate={navigate} />
      case 'commerce-analytics': return <CommerceAnalytics onNavigate={navigate} />
      case 'community-analytics': return <CommunityAnalytics onNavigate={navigate} />
      case 'content-analytics': return <ContentAnalytics onNavigate={navigate} />
      case 'team-roles': return <TeamRoles onNavigate={navigate} />
      case 'global-settings': return <GlobalSettings onNavigate={navigate} />
      case 'audit-log': return <AuditLog onNavigate={navigate} />
      case 'style-guides': return <StyleGuidesList onNavigate={navigate} />
      case 'style-guide-editor': return <StyleGuideEditor onNavigate={navigate} />
      case 'recommendation-hub': return <RecommendationHubList onNavigate={navigate} />
      case 'recommendation-hub-editor': return <RecommendationHubEditor onNavigate={navigate} />
      case 'product-passports': return <ProductPassportList onNavigate={navigate} />
      case 'product-passport-editor': return <ProductPassportEditor onNavigate={navigate} />
      case 'production-center': return <ProductionCenter onNavigate={navigate} />
      case 'production-templates': return <ProductionTemplates onNavigate={navigate} />
      case 'production-assets': return <ProductionAssets onNavigate={navigate} />
      case 'print-presets': return <PrintPresets onNavigate={navigate} />
      case 'batch-generator': return <BatchGenerator onNavigate={navigate} />
      case 'export-center': return <ExportCenter onNavigate={navigate} />
      case 'legacies': return <Legacies onNavigate={navigate} />
      case 'legacy-archives': return <LegacyArchives onNavigate={navigate} />
      case 'legacy-timeline': return <LegacyTimeline onNavigate={navigate} />
      case 'legacy-keeper-circle': return <LegacyKeeperCircle onNavigate={navigate} />
      case 'legacy-voting': return <LegacyVoting onNavigate={navigate} />
      case 'legacy-rewards': return <LegacyRewards onNavigate={navigate} />
      case 'legacy-achievements': return <LegacyAchievements onNavigate={navigate} />
      case 'legacy-invitations': return <LegacyInvitations onNavigate={navigate} />
      case 'legacy-referral': return <LegacyReferral onNavigate={navigate} />
      case 'legacy-analytics': return <LegacyAnalytics onNavigate={navigate} />
      case 'heritage-library': return <HeritageLibrary onNavigate={navigate} />
      case 'brand-assets': return <BrandAssets onNavigate={navigate} />
      case 'qr-experiences': return <QRExperiences onNavigate={navigate} />
      case 'qr-code-generator': return <QRCodeGenerator onNavigate={navigate} />
      case 'legacy-keeper-levels': return <LegacyKeeperLevels onNavigate={navigate} />
      case 'system-automation': return <SystemAutomation onNavigate={navigate} />
      case 'production-analytics': return <ProductionAnalytics onNavigate={navigate} />
      case 'recommendation-analytics': return <RecommendationAnalytics onNavigate={navigate} />
      case 'components': return <Components onNavigate={navigate} />
      default: return <Dashboard onNavigate={navigate} />
    }
  }

  if (app === 'website') {
    return (
      <div style={{ position: 'relative' }}>
        <WebsiteApp onAdminRequest={openAdmin} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#EDE8DF', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar
        active={screen}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        hovered={sidebarHovered}
        onToggleCollapse={() => setSidebarCollapsed(value => !value)}
        onHoverChange={setSidebarHovered}
      />
      <div style={{ marginLeft: sidebarWidth, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'margin-left 0.18s ease' }}>
        <Topbar screen={screen} onNavigate={navigate} onLogout={handleAdminLogout} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderScreen()}
        </main>
      </div>
    </div>
  )
}
