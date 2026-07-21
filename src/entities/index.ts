// ─── Primitive types ────────────────────────────────────────────────────────

export type ID = string
export type ISODate = string
export type URL = string
export type Currency = 'EUR' | 'USD' | 'MAD' | 'DZD'

// ─── Taxonomy ────────────────────────────────────────────────────────────────

export interface Category {
  id: ID
  slug: string
  label: string
  parent?: ID
}

export interface Tag {
  id: ID
  slug: string
  label: string
  color?: string
}

// ─── Media ───────────────────────────────────────────────────────────────────

export type MediaType = 'image' | 'video' | 'document' | 'audio'

export interface Media {
  id: ID
  type: MediaType
  url: URL
  alt?: string
  width?: number
  height?: number
  sizeBytes?: number
  mimeType?: string
  createdAt: ISODate
  tags: Tag[]
}

// ─── User / Auth ─────────────────────────────────────────────────────────────

export type UserRole = 'owner' | 'admin' | 'editor' | 'moderator' | 'viewer'
export type UserStatus = 'active' | 'suspended' | 'invited' | 'deactivated'

export interface User {
  id: ID
  email: string
  displayName: string
  avatarUrl?: URL
  role: UserRole
  status: UserStatus
  createdAt: ISODate
  lastActiveAt?: ISODate
}

// ─── Customer ────────────────────────────────────────────────────────────────

export type CustomerSegment = 'new' | 'returning' | 'vip' | 'at-risk' | 'inactive'

export interface Customer {
  id: ID
  email: string
  firstName: string
  lastName: string
  avatarUrl?: URL
  phone?: string
  location?: string
  segment: CustomerSegment
  ordersCount: number
  totalSpend: number
  currency: Currency
  createdAt: ISODate
  lastOrderAt?: ISODate
  wishlistIds: ID[]
  tags: Tag[]
}

// ─── Community Member ────────────────────────────────────────────────────────

export type MemberLevel = 1 | 2 | 3 | 4 | 5
export type MemberStatus = 'active' | 'suspended' | 'pending' | 'banned'

export interface CommunityMember {
  id: ID
  customerId?: ID
  displayName: string
  email: string
  avatarUrl?: URL
  location?: string
  level: MemberLevel
  status: MemberStatus
  contributionsCount: number
  featuredContributions: number
  challengesParticipated: number
  labProjectsJoined: number
  joinedAt: ISODate
  lastActiveAt?: ISODate
  badges: string[]
}

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductStatus = 'published' | 'draft' | 'archived' | 'out-of-stock'
export type ProductUniverse = 'Heritage' | 'Essentials' | 'Studio' | 'Community Lab'
export type SizeAvailability = 'available' | 'low' | 'sold-out'

export interface ProductSize {
  size: string
  availability: SizeAvailability
  stock: number
}

export interface Product {
  id: ID
  sku: string
  name: string
  universe: ProductUniverse
  status: ProductStatus
  price: number
  currency: Currency
  description: string
  coverImageUrl: URL
  images: URL[]
  sizes: ProductSize[]
  materials: string[]
  careInstructions: string[]
  relatedStoryId?: ID
  relatedChallengeId?: ID
  collectionIds: ID[]
  tags: Tag[]
  createdAt: ISODate
  publishedAt?: ISODate
}

// ─── Collection ──────────────────────────────────────────────────────────────

export type CollectionStatus = 'active' | 'draft' | 'archived'
export type CollectionSeason = 'SS25' | 'FW25' | 'SS26' | 'FW26' | 'Permanent'

export interface Collection {
  id: ID
  slug: string
  name: string
  universe: ProductUniverse
  season: CollectionSeason
  status: CollectionStatus
  coverImageUrl: URL
  description: string
  productIds: ID[]
  tags: Tag[]
  createdAt: ISODate
  publishedAt?: ISODate
}

// ─── Order ───────────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partial'

export interface OrderLineItem {
  productId: ID
  productName: string
  sku: string
  size: string
  qty: number
  unitPrice: number
  currency: Currency
}

export interface Order {
  id: ID
  customerId: ID
  status: OrderStatus
  paymentStatus: PaymentStatus
  lineItems: OrderLineItem[]
  subtotal: number
  shippingCost: number
  total: number
  currency: Currency
  shippingAddress: string
  trackingNumber?: string
  notes?: string
  createdAt: ISODate
  updatedAt: ISODate
}

// ─── Story ───────────────────────────────────────────────────────────────────

export type StoryStatus = 'published' | 'draft' | 'review' | 'archived' | 'rejected'
export type StoryType = 'editorial' | 'community' | 'heritage' | 'process' | 'interview'

export interface Story {
  id: ID
  slug: string
  title: string
  subtitle?: string
  type: StoryType
  status: StoryStatus
  authorId: ID
  authorName: string
  coverImageUrl: URL
  body: string
  readTimeMinutes: number
  relatedProductIds: ID[]
  relatedChallengeIds: ID[]
  tags: Tag[]
  publishedAt?: ISODate
  createdAt: ISODate
}

// ─── Heritage Article ────────────────────────────────────────────────────────

export type HeritageArticleStatus = 'published' | 'draft' | 'archived'

export interface HeritageArticle {
  id: ID
  slug: string
  title: string
  region: string
  period?: string
  status: HeritageArticleStatus
  coverImageUrl: URL
  body: string
  authorId: ID
  authorName: string
  relatedStoryIds: ID[]
  relatedProductIds: ID[]
  tags: Tag[]
  publishedAt?: ISODate
  createdAt: ISODate
}

// ─── Contribution ────────────────────────────────────────────────────────────

export type ContributionStatus = 'pending' | 'approved' | 'featured' | 'rejected' | 'under-review'
export type ContributionType = 'archive' | 'pattern' | 'craft' | 'textile' | 'symbol' | 'photography'

export interface Contribution {
  id: ID
  title: string
  type: ContributionType
  status: ContributionStatus
  memberId: ID
  memberName: string
  challengeId?: ID
  challengeName?: string
  description: string
  mediaUrls: URL[]
  coverImageUrl: URL
  votes: number
  reviewNotes?: string
  createdAt: ISODate
  reviewedAt?: ISODate
}

// ─── Challenge ───────────────────────────────────────────────────────────────

export type ChallengeStatus = 'active' | 'upcoming' | 'closed' | 'results' | 'draft'
export type ChallengeLevel = 'open' | 'member' | 'advanced' | 'invitation'

export interface Challenge {
  id: ID
  slug: string
  title: string
  tagline: string
  status: ChallengeStatus
  level: ChallengeLevel
  coverImageUrl: URL
  description: string
  guidelines: string
  startDate: ISODate
  endDate: ISODate
  submissionsCount: number
  participantsCount: number
  maxParticipants?: number
  winnersCount: number
  relatedProductIds: ID[]
  tags: Tag[]
  createdAt: ISODate
}

// ─── Submission ──────────────────────────────────────────────────────────────

export type SubmissionStatus = 'draft' | 'submitted' | 'shortlisted' | 'winner' | 'rejected'

export interface Submission {
  id: ID
  challengeId: ID
  memberId: ID
  memberName: string
  title: string
  description: string
  mediaUrls: URL[]
  coverImageUrl: URL
  status: SubmissionStatus
  votes: number
  judgeScore?: number
  judgeNotes?: string
  rank?: number
  submittedAt: ISODate
  reviewedAt?: ISODate
}

// ─── Community Lab Project ───────────────────────────────────────────────────

export type LabProjectStatus = 'active' | 'completed' | 'archived' | 'draft' | 'paused'
export type LabProjectCategory = 'archive' | 'research' | 'design' | 'craft' | 'education'

export interface LabProject {
  id: ID
  slug: string
  title: string
  tagline: string
  status: LabProjectStatus
  category: LabProjectCategory
  coverImageUrl: URL
  description: string
  leadId: ID
  leadName: string
  membersCount: number
  maxMembers: number
  contributionsCount: number
  progress: number
  startDate: ISODate
  endDate?: ISODate
  relatedChallengeIds: ID[]
  tags: Tag[]
  createdAt: ISODate
}

// ─── Open Call / Call for Contribution ──────────────────────────────────────

export type OpenCallStatus = 'active' | 'closed' | 'draft'

export interface OpenCall {
  id: ID
  title: string
  tagline: string
  status: OpenCallStatus
  labProjectId: ID
  coverImageUrl: URL
  description: string
  requirements: string[]
  deadline: ISODate
  submissionsCount: number
  maxSubmissions?: number
  createdAt: ISODate
}

// ─── Event ───────────────────────────────────────────────────────────────────

export type EventStatus = 'upcoming' | 'live' | 'past' | 'cancelled'
export type EventType = 'launch' | 'workshop' | 'community' | 'exhibition' | 'online' | 'pop-up'
export type EventFormat = 'in-person' | 'online' | 'hybrid'

export interface Event {
  id: ID
  slug: string
  title: string
  type: EventType
  status: EventStatus
  format: EventFormat
  coverImageUrl: URL
  description: string
  date: ISODate
  timeStart: string
  timeEnd: string
  location: string
  capacity: number
  registeredCount: number
  relatedProductIds: ID[]
  relatedChallengeIds: ID[]
  tags: Tag[]
  createdAt: ISODate
}

// ─── Wishlist ────────────────────────────────────────────────────────────────

export interface Wishlist {
  id: ID
  customerId: ID
  name: string
  productIds: ID[]
  createdAt: ISODate
  updatedAt: ISODate
}

// ─── Review ──────────────────────────────────────────────────────────────────

export type ReviewStatus = 'published' | 'pending' | 'flagged' | 'removed'

export interface Review {
  id: ID
  productId: ID
  customerId: ID
  customerName: string
  rating: 1 | 2 | 3 | 4 | 5
  title?: string
  body: string
  status: ReviewStatus
  verifiedPurchase: boolean
  helpfulCount: number
  createdAt: ISODate
}

// ─── Reward / Loyalty ────────────────────────────────────────────────────────

export type RewardType = 'discount' | 'early-access' | 'free-shipping' | 'gift' | 'badge'
export type RewardStatus = 'active' | 'redeemed' | 'expired'

export interface Reward {
  id: ID
  memberId: ID
  type: RewardType
  status: RewardStatus
  title: string
  description: string
  value?: number
  currency?: Currency
  code?: string
  expiresAt?: ISODate
  redeemedAt?: ISODate
  earnedAt: ISODate
}

// ─── Style Guide ─────────────────────────────────────────────────────────────

export type StyleGuideStatus = 'published' | 'draft' | 'archived'

export type StyleGuideSeason = 'spring' | 'summer' | 'autumn' | 'winter' | 'all-seasons'

export type StyleGuideOccasion =
  | 'daily' | 'travel' | 'mountain' | 'outdoor' | 'weekend' | 'city'

export type BottomType =
  | 'cargo' | 'wide-leg' | 'straight' | 'linen-pants' | 'denim' | 'shorts'

export type FootwearType =
  | 'white-sneakers' | 'black-sneakers' | 'brown-boots' | 'canvas-shoes' | 'trail-shoes'

export type AccessoryType =
  | 'cap' | 'tote-bag' | 'bracelet' | 'watch' | 'sunglasses'

export interface StyleGuidePalette {
  primary: string
  secondary: string[]
  accent: string[]
  neutral: string[]
}

export interface StyleGuideLook {
  id: ID
  image: URL
  title: string
  description: string
  notes?: string
}

export interface StyleGuide {
  id: ID
  name: string
  slug: string
  description: string
  collectionId?: ID
  collectionName?: string
  status: StyleGuideStatus
  thumbnailUrl?: URL
  palette: StyleGuidePalette
  matchingColors: string[]
  bottomColors: string[]
  bottomTypes: BottomType[]
  footwear: FootwearType[]
  accessories: AccessoryType[]
  seasons: StyleGuideSeason[]
  occasions: StyleGuideOccasion[]
  looks: StyleGuideLook[]
  designerNotes: string
  assignedProductIds: ID[]
  createdAt: ISODate
  updatedAt: ISODate
}

// ─── Notification ────────────────────────────────────────────────────────────

export type NotificationType =
  | 'contribution-approved' | 'contribution-featured' | 'contribution-rejected'
  | 'challenge-result' | 'challenge-joined' | 'challenge-reminder'
  | 'order-confirmed' | 'order-shipped' | 'order-delivered'
  | 'lab-project-update' | 'new-collection' | 'event-reminder'
  | 'level-up' | 'reward-earned' | 'mention' | 'system'

export interface Notification {
  id: ID
  recipientId: ID
  type: NotificationType
  title: string
  body: string
  read: boolean
  entityType?: string
  entityId?: ID
  actionUrl?: string
  createdAt: ISODate
}

// ─── Recommendation Hub ──────────────────────────────────────────────────────

export type RecommendationHubStatus = 'active' | 'draft' | 'archived'

export type RecommendationType =
  | 'complete-your-style' | 'explore-collection' | 'discover-story'
  | 'heritage-journey' | 'recommended-products' | 'new-arrivals'
  | 'community-favorites' | 'seasonal-picks' | 'editors-selection'
  | 'best-sellers' | 'recently-released' | 'you-may-also-like'
  | 'related-heritage' | 'related-stories' | 'related-challenges'
  | 'related-style-guides'

export type DisplayLocation =
  | 'website-home' | 'product-detail' | 'collection-page' | 'story-page'
  | 'heritage-page' | 'community-page' | 'community-lab' | 'qr-experience'
  | 'search-results' | 'future-mobile-app'

export type TriggerRule =
  | 'viewing-product' | 'viewing-collection' | 'viewing-story'
  | 'viewing-heritage' | 'viewing-challenge' | 'viewing-community-project'
  | 'viewing-qr-page' | 'viewing-category' | 'viewing-search-results'

export type RecommendationRule =
  | 'manual' | 'same-collection' | 'same-style-guide' | 'same-heritage-theme'
  | 'same-color-palette' | 'same-category' | 'same-tags' | 'newest'
  | 'most-popular' | 'editors-choice' | 'community-favorites' | 'best-sellers'
  | 'recently-updated' | 'ai-recommendations'

export type DisplayLayout = 'carousel' | 'grid' | 'editorial-cards' | 'compact-list'
export type DisplaySorting = 'random' | 'manual' | 'newest' | 'popularity' | 'custom'

export interface RecommendationHubAnalytics {
  impressions: number
  clicks: number
  ctr: number
  conversion: number
  purchases: number
  qrVisits: number
}

export interface RecommendationHub {
  id: ID
  name: string
  slug: string
  description: string
  thumbnailUrl?: URL
  status: RecommendationHubStatus
  visibility: 'public' | 'private'
  publicationDate?: ISODate
  recommendationTypes: RecommendationType[]
  displayLocations: DisplayLocation[]
  triggerRules: TriggerRule[]
  recommendationRules: RecommendationRule[]
  linkedProductIds: ID[]
  linkedCollectionIds: ID[]
  linkedStoryIds: ID[]
  linkedHeritageIds: ID[]
  linkedStyleGuideIds: ID[]
  linkedChallengeIds: ID[]
  linkedCommunityProjectIds: ID[]
  linkedEventIds: ID[]
  displayLayout: DisplayLayout
  numberOfItems: number
  cardSize: 'small' | 'medium' | 'large'
  displaySorting: DisplaySorting
  analytics: RecommendationHubAnalytics
  createdAt: ISODate
  updatedAt: ISODate
}

// ─── Product Passport ─────────────────────────────────────────────────────────

export type PassportStatus = 'active' | 'draft' | 'revoked'
export type AuthenticityStatus = 'verified' | 'pending' | 'unverified'

export interface PassportPrintPreset {
  label: string
  widthCm: number
  heightCm: number
  ppi: number
}

export interface PassportScanAnalytics {
  totalScans: number
  uniqueVisitors: number
  topCountry: string
  topDevice: string
  lastScannedAt?: ISODate
}

export interface PassportAuthenticity {
  serialNumber?: string
  edition?: string
  status: AuthenticityStatus
  verifiedAt?: ISODate
}

export interface ProductPassport {
  id: ID
  passportId: string
  productId: ID
  productName: string
  productSku: string
  productImageUrl: URL
  landingUrl: URL
  status: PassportStatus
  qrCodeUrl?: URL
  pngUrl?: URL
  svgUrl?: URL
  pdfUrl?: URL
  printPresets: PassportPrintPreset[]
  analytics: PassportScanAnalytics
  authenticity: PassportAuthenticity
  linkedStyleGuideId?: ID
  linkedRecommendationHubId?: ID
  createdAt: ISODate
  updatedAt: ISODate
}

// ─── Brand Production Center ──────────────────────────────────────────────────

export type ProductionAssetType =
  | 'internal-branding-print' | 'neck-print' | 'waist-print' | 'side-label'
  | 'woven-label' | 'care-label' | 'heat-transfer' | 'hang-tag' | 'qr-label'
  | 'packaging-card' | 'sticker' | 'shipping-insert' | 'thank-you-card' | 'brand-card'

export type ExportFormat = 'png' | 'svg' | 'pdf' | 'zip'

export interface PrintPreset {
  id: ID
  label: string
  widthMm: number
  heightMm: number
  resolution: number
  marginsMm: number
  safeAreaMm: number
  quietZoneMm: number
  isCustom: boolean
}

export interface ProductionAssetConfig {
  type: ProductionAssetType
  enabled: boolean
  printPresetId?: ID
  variables: string[]
}

export interface ProductionTemplate {
  id: ID
  name: string
  slug: string
  category: string
  description: string
  status: 'active' | 'draft' | 'archived'
  assets: ProductionAssetConfig[]
  variableMap: Record<string, string>
  createdAt: ISODate
  updatedAt: ISODate
}

export interface GeneratedAsset {
  id: ID
  productId: ID
  productName: string
  productSku: string
  templateId: ID
  templateName: string
  assetType: ProductionAssetType
  size: string
  productIdentifier: string
  status: 'ready' | 'generating' | 'error'
  formats: ExportFormat[]
  createdAt: ISODate
}

export interface BatchJob {
  id: ID
  name: string
  productIds: ID[]
  templateId: ID
  status: 'pending' | 'running' | 'complete' | 'error'
  progress: number
  totalAssets: number
  completedAssets: number
  exportFormat: ExportFormat
  createdAt: ISODate
  completedAt?: ISODate
}

// ─── Legacy Platform Entities ─────────────────────────────────────────────────

export type KeeperLevel = 'visitor' | 'customer' | 'keeper' | 'senior-keeper' | 'legacy-keeper' | 'guardian'
export type ArchiveStatus = 'upcoming' | 'active' | 'complete' | 'legendary'
export type VoteStatus = 'open' | 'closed' | 'counting'
export type LegacyRewardType = 'discount' | 'early-access' | 'exclusive-product' | 'badge' | 'physical'

export interface LegacyTimeline {
  id: ID
  archiveId: ID
  archiveName: string
  releaseDate: ISODate
  status: ArchiveStatus
  keeperCount: number
  productCount: number
  position: number
}

export interface Archive {
  id: ID
  name: string
  slug: string
  description: string
  coverImageUrl: URL
  collectionId?: ID
  collectionName?: string
  storyId?: ID
  status: ArchiveStatus
  releaseDate: ISODate
  keeperCount: number
  productIds: ID[]
  styleGuideId?: ID
  timelinePosition: number
  votingStatus: VoteStatus
  createdAt: ISODate
  updatedAt: ISODate
}

export interface Keeper {
  id: ID
  memberId: ID
  memberName: string
  memberAvatar?: URL
  level: KeeperLevel
  joinedAt: ISODate
  ownedProductIds: ID[]
  ownedArchiveIds: ID[]
  votes: number
  referralCode: string
  referredByKeeperId?: ID
  referralCount: number
  badges: string[]
  achievements: string[]
  rewardIds: ID[]
  legacyPoints: number
}

export interface Vote {
  id: ID
  keeperId: ID
  keeperName: string
  entityType: 'archive' | 'story' | 'graphic' | 'community-project'
  entityId: ID
  entityName: string
  choice: string
  weight: number
  castedAt: ISODate
}

export interface VotingSession {
  id: ID
  title: string
  description: string
  status: VoteStatus
  eligibleLevels: KeeperLevel[]
  options: { id: ID; label: string; votes: number; coverUrl?: URL }[]
  totalVotes: number
  opensAt: ISODate
  closesAt: ISODate
}

export interface LegacyReward {
  id: ID
  title: string
  type: LegacyRewardType
  description: string
  value?: number
  eligibleLevels: KeeperLevel[]
  expiresAt?: ISODate
  claimedCount: number
  totalAvailable?: number
  status: 'active' | 'expired' | 'depleted'
}

export interface Badge {
  id: ID
  name: string
  description: string
  iconUrl?: URL
  level: KeeperLevel
  earnedCount: number
  criteria: string
}

export interface Achievement {
  id: ID
  name: string
  description: string
  criteria: string
  points: number
  badgeId?: ID
  earnedCount: number
}

export interface Invitation {
  id: ID
  keeperId: ID
  keeperName: string
  referralCode: string
  referralUrl: string
  inviteeEmail?: string
  status: 'pending' | 'accepted' | 'expired'
  sentAt: ISODate
  acceptedAt?: ISODate
  convertedToKeeper: boolean
}
