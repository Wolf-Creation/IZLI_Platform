export interface AutomationStep {
  name: string
  description: string
  engine: string
  method: string
}

export interface AutomationDefinition {
  id: string
  name: string
  description: string
  trigger: string
  isActive: boolean
  steps: AutomationStep[]
}

export const AUTOMATION_DEFINITIONS: AutomationDefinition[] = [
  {
    id: 'product-published-flow',
    name: 'Product Published Flow',
    description: 'Triggered when a product is published. Generates passport, QR, production assets, and updates search.',
    trigger: 'product.published',
    isActive: true,
    steps: [
      { name: 'Generate Product Passport', description: 'Create and activate product passport', engine: 'QREngine', method: 'generateQR' },
      { name: 'Generate Product Identifier', description: 'Assign unique IZLI identifier', engine: 'ProductionEngine', method: 'generateAsset' },
      { name: 'Generate QR Code', description: 'Create scannable QR for passport', engine: 'QREngine', method: 'generateQR' },
      { name: 'Generate Production Assets', description: 'Queue initial production asset generation', engine: 'ProductionEngine', method: 'generateAsset' },
      { name: 'Generate Product Page', description: 'Build product landing page for QR experience', engine: 'ContentEngine', method: 'publishStory' },
      { name: 'Update Recommendation Hub', description: 'Add product to relevant recommendation hubs', engine: 'RecommendationEngine', method: 'updateHub' },
      { name: 'Update Search Index', description: 'Index product in global search', engine: 'SearchEngine', method: 'index' },
      { name: 'Notify Admin', description: 'Send admin notification of successful publish', engine: 'NotificationEngine', method: 'send' },
    ],
  },
  {
    id: 'purchase-completed-flow',
    name: 'Purchase Completed Flow',
    description: 'Triggered when a purchase is completed. Creates keeper, grants badge and reward, enables voting.',
    trigger: 'purchase.completed',
    isActive: true,
    steps: [
      { name: 'Create Keeper', description: 'Register buyer as archive keeper', engine: 'LegacyEngine', method: 'createKeeper' },
      { name: 'Unlock Keeper Circle', description: 'Grant access to the Keeper Circle', engine: 'LegacyEngine', method: 'levelUpKeeper' },
      { name: 'Grant Badge', description: 'Award first purchase badge', engine: 'LegacyEngine', method: 'grantBadge' },
      { name: 'Grant Reward', description: 'Issue welcome reward', engine: 'LegacyEngine', method: 'grantReward' },
      { name: 'Enable Voting', description: 'Enable voting access for eligible sessions', engine: 'LegacyEngine', method: 'getVotingSession' },
    ],
  },
  {
    id: 'archive-released-flow',
    name: 'Archive Released Flow',
    description: 'Triggered when an archive is released. Notifies keepers and opens voting.',
    trigger: 'archive.released',
    isActive: true,
    steps: [
      { name: 'Open Voting Session', description: 'Create voting session for archive theme', engine: 'LegacyEngine', method: 'getVotingSession' },
      { name: 'Notify Eligible Keepers', description: 'Send release notification to all eligible keepers', engine: 'NotificationEngine', method: 'sendBulk' },
      { name: 'Update Legacy Timeline', description: 'Add archive to legacy timeline', engine: 'LegacyEngine', method: 'getArchive' },
      { name: 'Update Search Index', description: 'Index archive in global search', engine: 'SearchEngine', method: 'index' },
    ],
  },
  {
    id: 'challenge-completed-flow',
    name: 'Challenge Completed Flow',
    description: 'Triggered when a challenge is completed by a member. Awards points and badge.',
    trigger: 'challenge.completed',
    isActive: true,
    steps: [
      { name: 'Unlock Achievement', description: 'Award challenge completion achievement', engine: 'LegacyEngine', method: 'grantBadge' },
      { name: 'Award Points', description: 'Credit legacy points to member', engine: 'LegacyEngine', method: 'levelUpKeeper' },
      { name: 'Notify Member', description: 'Send congratulations notification', engine: 'NotificationEngine', method: 'send' },
    ],
  },
  {
    id: 'story-published-flow',
    name: 'Story Published Flow',
    description: 'Triggered when a story is published. Distributes to channels and updates search.',
    trigger: 'story.published',
    isActive: true,
    steps: [
      { name: 'Index Story', description: 'Add story to global search index', engine: 'SearchEngine', method: 'index' },
      { name: 'Distribute to Channels', description: 'Push to website and notification channels', engine: 'NotificationEngine', method: 'sendBulk' },
      { name: 'Update Recommendations', description: 'Link story to related recommendation hubs', engine: 'RecommendationEngine', method: 'updateHub' },
    ],
  },
  {
    id: 'qr-scanned-flow',
    name: 'QR Scanned Flow',
    description: 'Triggered when a product QR code is scanned. Records analytics and triggers recommendations.',
    trigger: 'qr.scanned',
    isActive: true,
    steps: [
      { name: 'Record Scan', description: 'Log scan event with device and location data', engine: 'QREngine', method: 'recordScan' },
      { name: 'Track Analytics', description: 'Update QR analytics dashboards', engine: 'AnalyticsEngine', method: 'track' },
      { name: 'Surface Recommendations', description: 'Prepare contextual recommendations for landing page', engine: 'RecommendationEngine', method: 'getRecommendations' },
    ],
  },
]

export function getAutomation(id: string): AutomationDefinition | undefined {
  return AUTOMATION_DEFINITIONS.find(a => a.id === id)
}

export function getActiveAutomations(): AutomationDefinition[] {
  return AUTOMATION_DEFINITIONS.filter(a => a.isActive)
}
