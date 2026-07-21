// IZLI OS — The invisible platform core
// Orchestrates Commerce, Legacy, Community, Production, Recommendations, QR, Style Intelligence

// Engines
export * from './engines'

// Services
export { ProductService, KeeperService, ArchiveService, SearchService } from './services'
export type { IProductService, IKeeperService, IArchiveService, ISearchService } from './services'

// Workflows
export { ProductLifecycleWorkflow, ArchiveLifecycleWorkflow, KeeperLifecycleWorkflow, QRWorkflow, PublishingWorkflow, ALL_WORKFLOWS, runWorkflow } from './workflows'
export type { WorkflowDefinition, WorkflowContext, WorkflowStep, WorkflowStatus } from './workflows'

// Automations
export { AUTOMATION_DEFINITIONS, getAutomation, getActiveAutomations } from './automations'
export type { AutomationDefinition, AutomationStep } from './automations'

// Events
export { EventBus } from './events'
export type { IZLIEvent, EventType, EventPayload } from './events'

// Registry
export { ENTITY_REGISTRY, getEntity, getEntitiesByModule, getSearchableEntities } from './registry'
export type { EntityType, EntityMeta } from './registry'

// Entities + Content Graph
export { ContentGraph } from './entities'
export type { EntityRef, ContentNode, IZLIContentGraph } from './entities'

// Permissions
export { PermissionEngine, hasPermission, getPermissions, canAccess } from './permissions'
export type { AdminRole, MemberRole, PlatformRole, Permission } from './permissions'

// Generators
export { ProductIdentifierGenerator, QRGenerator, ReferralGenerator, BadgeGenerator, PassportGenerator } from './generators'
export type { IProductIdentifierGenerator, IQRGenerator, IReferralGenerator, IBadgeGenerator, IPassportGenerator } from './generators'

// Providers
export { DataProvider, CacheProvider } from './providers'
export type { IDataProvider, IMediaProvider, ICacheProvider } from './providers'

// Repositories
export { ProductRepository, ArchiveRepository, KeeperRepository, StoryRepository } from './repositories'
export type { Repository, IProductRepository, IArchiveRepository, IKeeperRepository, IStoryRepository } from './repositories'

// Analytics
export { AnalyticsService } from './analytics'
export type { IAnalyticsService, PlatformMetrics, CommerceMetrics, LegacyMetrics, CommunityMetrics, QRMetrics, ProductionMetrics, AnalyticsPeriod } from './analytics'

export const IZLI_OS_VERSION = '1.0.0'
