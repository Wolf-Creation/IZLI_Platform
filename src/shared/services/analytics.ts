export interface CommerceMetrics {
  totalRevenue: number
  revenueGrowth: number
  ordersCount: number
  ordersGrowth: number
  averageOrderValue: number
  aovGrowth: number
  conversionRate: number
  currency: string
}

export interface CommunityMetrics {
  totalMembers: number
  membersGrowth: number
  activeMembers: number
  contributionsCount: number
  contributionsGrowth: number
  challengeParticipation: number
  labProjectsActive: number
}

export interface ContentMetrics {
  storiesPublished: number
  storiesGrowth: number
  totalReadTime: number
  avgReadTime: number
  topStoryViews: number
}

export interface TopProduct {
  id: string
  name: string
  revenue: number
  unitsSold: number
  currency: string
}

export interface TopStory {
  id: string
  title: string
  views: number
  readTimeMinutes: number
}

export interface MemberGrowthPoint {
  month: string
  members: number
  newMembers: number
}

export async function getCommerceMetrics(): Promise<CommerceMetrics> {
  return Promise.resolve({
    totalRevenue: 48750,
    revenueGrowth: 22.4,
    ordersCount: 312,
    ordersGrowth: 18.1,
    averageOrderValue: 156.25,
    aovGrowth: 3.6,
    conversionRate: 3.2,
    currency: 'EUR',
  })
}

export async function getCommunityMetrics(): Promise<CommunityMetrics> {
  return Promise.resolve({
    totalMembers: 1847,
    membersGrowth: 34.8,
    activeMembers: 621,
    contributionsCount: 892,
    contributionsGrowth: 41.2,
    challengeParticipation: 73.5,
    labProjectsActive: 3,
  })
}

export async function getContentMetrics(): Promise<ContentMetrics> {
  return Promise.resolve({
    storiesPublished: 28,
    storiesGrowth: 12.5,
    totalReadTime: 4320,
    avgReadTime: 7.2,
    topStoryViews: 6840,
  })
}

export async function getTopProducts(): Promise<TopProduct[]> {
  return Promise.resolve([
    { id: 'prod-002', name: 'Woven Sahara Overshirt', revenue: 12480, unitsSold: 64, currency: 'EUR' },
    { id: 'prod-001', name: 'Tifinagh Frame Tee', revenue: 9868, unitsSold: 111, currency: 'EUR' },
    { id: 'prod-004', name: 'Berber Grid Track Jacket', revenue: 8575, unitsSold: 35, currency: 'EUR' },
    { id: 'prod-005', name: 'Medina Weave Trousers', revenue: 7260, unitsSold: 44, currency: 'EUR' },
    { id: 'prod-006', name: 'Community Pattern Tee — Vol. 1', revenue: 5550, unitsSold: 74, currency: 'EUR' },
  ])
}

export async function getTopStories(): Promise<TopStory[]> {
  return Promise.resolve([
    { id: 'story-002', title: 'Weavers of the Draa Valley', views: 6840, readTimeMinutes: 10 },
    { id: 'story-001', title: 'The Language of Tifinagh', views: 5230, readTimeMinutes: 7 },
    { id: 'story-003', title: 'Community Patterns Vol. 1 — Behind the Design', views: 3970, readTimeMinutes: 6 },
  ])
}

export async function getMemberGrowth(): Promise<MemberGrowthPoint[]> {
  return Promise.resolve([
    { month: '2024-12', members: 820, newMembers: 95 },
    { month: '2025-01', members: 970, newMembers: 150 },
    { month: '2025-02', members: 1120, newMembers: 150 },
    { month: '2025-03', members: 1310, newMembers: 190 },
    { month: '2025-04', members: 1520, newMembers: 210 },
    { month: '2025-05', members: 1710, newMembers: 190 },
    { month: '2025-06', members: 1847, newMembers: 137 },
  ])
}
