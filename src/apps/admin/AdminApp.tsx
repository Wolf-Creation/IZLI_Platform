import { useEffect, useState } from 'react'
import type { Screen } from '../../types'
import { adminPathForScreen, adminStateFromPath, ADMIN_ROUTES } from '../../routes/admin'
import { logout as authLogout } from '../../shared/services/auth'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import Dashboard from './pages/Dashboard'
import ProductsList from './pages/ProductsList'
import ProductEditor from './pages/ProductEditor'
import CollectionsList from './pages/CollectionsList'
import CollectionEditor from './pages/CollectionEditor'
import OrdersList from './pages/OrdersList'
import CustomerDetail from './pages/CustomerDetail'
import HomeBuilder from './pages/HomeBuilder'
import SitePageEditor from './pages/SitePageEditor'
import MediaLibrary from './pages/MediaLibrary'
import StoriesList from './pages/StoriesList'
import StoryEditor from './pages/StoryEditor'
import StoryReviewQueue from './pages/StoryReviewQueue'
import MembersList from './pages/MembersList'
import MemberProfile from './pages/MemberProfile'
import ContributionsList from './pages/ContributionsList'
import ContributionDetail from './pages/ContributionDetail'
import ChallengesList from './pages/ChallengesList'
import ChallengeEditor from './pages/ChallengeEditor'
import ChallengeSubmissions from './pages/ChallengeSubmissions'
import ChallengeResults from './pages/ChallengeResults'
import LabProjectsList from './pages/LabProjectsList'
import LabProjectEditor from './pages/LabProjectEditor'
import CallsForContribution from './pages/CallsForContribution'
import CommerceAnalytics from './pages/CommerceAnalytics'
import CommunityAnalytics from './pages/CommunityAnalytics'
import ContentAnalytics from './pages/ContentAnalytics'
import TeamRoles from './pages/TeamRoles'
import GlobalSettings from './pages/GlobalSettings'
import AuditLog from './pages/AuditLog'
import Components from './pages/Components'
import StyleGuidesList from './pages/StyleGuidesList'
import StyleGuideEditor from './pages/StyleGuideEditor'
import RecommendationHubList from './pages/RecommendationHubList'
import RecommendationHubEditor from './pages/RecommendationHubEditor'
import ProductPassportList from './pages/ProductPassportList'
import ProductPassportEditor from './pages/ProductPassportEditor'
import ProductionCenter from './pages/ProductionCenter'
import ProductionTemplates from './pages/ProductionTemplates'
import ProductionAssets from './pages/ProductionAssets'
import PrintPresets from './pages/PrintPresets'
import BatchGenerator from './pages/BatchGenerator'
import ExportCenter from './pages/ExportCenter'
import LegacyArchives from './pages/LegacyArchives'
import LegacyTimeline from './pages/LegacyTimeline'
import LegacyKeeperCircle from './pages/LegacyKeeperCircle'
import LegacyVoting from './pages/LegacyVoting'
import LegacyRewards from './pages/LegacyRewards'
import LegacyAchievements from './pages/LegacyAchievements'
import LegacyInvitations from './pages/LegacyInvitations'
import LegacyReferral from './pages/LegacyReferral'
import LegacyAnalytics from './pages/LegacyAnalytics'
import Legacies from './pages/Legacies'
import HeritageLibrary from './pages/HeritageLibrary'
import BrandAssets from './pages/BrandAssets'
import QRExperiences from './pages/QRExperiences'
import QRCodeGenerator from './pages/QRCodeGenerator'
import LegacyKeeperLevels from './pages/LegacyKeeperLevels'
import SystemAutomation from './pages/SystemAutomation'
import ProductionAnalytics from './pages/ProductionAnalytics'
import RecommendationAnalytics from './pages/RecommendationAnalytics'

export default function AdminApp() {
	const initialState = adminStateFromPath(window.location.pathname)
	const [screen, setScreen] = useState<Screen>(initialState.screen)
	const [productEditorId, setProductEditorId] = useState<string | null>(initialState.productEditorId)
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
	const [sidebarHovered, setSidebarHovered] = useState(false)

	useEffect(() => {
		const syncFromLocation = () => {
			const nextState = adminStateFromPath(window.location.pathname)
			setScreen(nextState.screen)
			setProductEditorId(nextState.productEditorId)
		}

		window.addEventListener('popstate', syncFromLocation)
		syncFromLocation()
		return () => window.removeEventListener('popstate', syncFromLocation)
	}, [])

	const navigate = (nextScreen: Screen) => {
		const nextPath = adminPathForScreen(nextScreen, productEditorId)
		window.history.pushState({}, '', nextPath)
		setScreen(nextScreen)
		if (nextScreen !== 'product-editor') setProductEditorId(null)
	}

	const openProductCreate = () => {
		setProductEditorId(null)
		window.history.pushState({}, '', ADMIN_ROUTES.PRODUCT_NEW)
		setScreen('product-editor')
	}

	const openProductEdit = (id: string) => {
		setProductEditorId(id)
		window.history.pushState({}, '', adminPathForScreen('product-editor', id))
		setScreen('product-editor')
	}

	const closeProductEditor = () => {
		setProductEditorId(null)
		window.history.pushState({}, '', ADMIN_ROUTES.PRODUCTS)
		setScreen('products')
	}

	const handleLogout = async () => {
		await authLogout()
		window.history.pushState({}, '', '/')
		setScreen('dashboard')
		setProductEditorId(null)
	}

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
			default: return <Dashboard onNavigate={navigate} onCreateProduct={openProductCreate} onEditProduct={openProductEdit} />
		}
	}

	const sidebarWidth = sidebarCollapsed && !sidebarHovered ? 72 : 264

	return (
		<div style={{ display: 'flex', height: '100vh', background: '#EDE8DF', fontFamily: 'Inter, sans-serif' }}>
			<Sidebar active={screen} onNavigate={navigate} collapsed={sidebarCollapsed} hovered={sidebarHovered} onToggleCollapse={() => setSidebarCollapsed(value => !value)} onHoverChange={setSidebarHovered} />
			<div style={{ marginLeft: sidebarWidth, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'margin-left 0.18s ease' }}>
				<Topbar screen={screen} onNavigate={navigate} onLogout={handleLogout} />
				<main style={{ flex: 1, overflowY: 'auto' }}>{renderScreen()}</main>
			</div>
		</div>
	)
}
