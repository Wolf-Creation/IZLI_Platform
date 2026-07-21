import type { CommunityMember, Contribution } from '../../entities'

const MEMBERS: CommunityMember[] = [
  {
    id: 'mem-001',
    customerId: 'cust-001',
    displayName: 'Amayas Berber',
    email: 'amayas@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&auto=format',
    location: 'Montréal, QC',
    level: 4,
    status: 'active',
    contributionsCount: 18,
    featuredContributions: 3,
    challengesParticipated: 6,
    labProjectsJoined: 2,
    joinedAt: '2024-03-15T10:00:00Z',
    lastActiveAt: '2025-06-01T15:00:00Z',
    badges: ['Early Adopter', 'Pattern Maker', 'Heritage Scholar'],
  },
  {
    id: 'mem-002',
    customerId: 'cust-002',
    displayName: 'Tamazight Kader',
    email: 'kader@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    location: 'Paris, France',
    level: 3,
    status: 'active',
    contributionsCount: 9,
    featuredContributions: 1,
    challengesParticipated: 4,
    labProjectsJoined: 1,
    joinedAt: '2024-06-01T10:00:00Z',
    lastActiveAt: '2025-05-28T12:00:00Z',
    badges: ['Textile Expert', 'Community Builder'],
  },
  {
    id: 'mem-003',
    displayName: 'Nadia Oulhadj',
    email: 'nadia@example.com',
    location: 'London, UK',
    level: 2,
    status: 'active',
    contributionsCount: 5,
    featuredContributions: 0,
    challengesParticipated: 2,
    labProjectsJoined: 0,
    joinedAt: '2024-10-01T10:00:00Z',
    lastActiveAt: '2025-05-15T09:00:00Z',
    badges: ['New Member'],
  },
  {
    id: 'mem-004',
    customerId: 'cust-003',
    displayName: 'Syphax Bellal',
    email: 'syphax@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&auto=format',
    location: 'Amsterdam, NL',
    level: 5,
    status: 'active',
    contributionsCount: 34,
    featuredContributions: 7,
    challengesParticipated: 10,
    labProjectsJoined: 3,
    joinedAt: '2023-12-01T10:00:00Z',
    lastActiveAt: '2025-06-03T18:00:00Z',
    badges: ['Master Contributor', 'Pattern Maker', 'Lab Pioneer', 'Heritage Scholar', 'Challenge Champion'],
  },
]

const CONTRIBUTIONS: Contribution[] = [
  {
    id: 'contrib-001',
    title: 'Ancestral Zellij Grid — Blue Variant',
    type: 'pattern',
    status: 'featured',
    memberId: 'mem-001',
    memberName: 'Amayas Berber',
    challengeId: 'chal-001',
    challengeName: 'Zellij Reimagined',
    description: 'A reinterpretation of the classic Zellij tile grid from Fez, using a restricted palette of indigo and natural white. Suitable for screen print on medium-weight cotton.',
    mediaUrls: ['https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&h=800&fit=crop&auto=format'],
    coverImageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&h=800&fit=crop&auto=format',
    votes: 142,
    createdAt: '2025-03-10T10:00:00Z',
    reviewedAt: '2025-03-20T14:00:00Z',
  },
  {
    id: 'contrib-002',
    title: 'Amazigh Carpet Border — Digitized',
    type: 'textile',
    status: 'approved',
    memberId: 'mem-004',
    memberName: 'Syphax Bellal',
    description: 'High-resolution digital scan and vector trace of a 1940s Amazigh carpet border found in a private collection in Amsterdam. Includes metadata on region and estimated production decade.',
    mediaUrls: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop&auto=format'],
    coverImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop&auto=format',
    votes: 87,
    createdAt: '2025-04-01T10:00:00Z',
    reviewedAt: '2025-04-08T10:00:00Z',
  },
  {
    id: 'contrib-003',
    title: 'Tifinagh Letter Study — Photography Series',
    type: 'photography',
    status: 'pending',
    memberId: 'mem-002',
    memberName: 'Tamazight Kader',
    description: 'A 12-image documentary photography series capturing Tifinagh inscriptions on rock faces in the Tadrart Acacus, Libya. Shot in golden hour light to emphasize texture.',
    mediaUrls: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop&auto=format'],
    coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop&auto=format',
    votes: 54,
    createdAt: '2025-05-12T10:00:00Z',
  },
  {
    id: 'contrib-004',
    title: 'Saharan Indigo Dyeing — Process Archive',
    type: 'craft',
    status: 'under-review',
    memberId: 'mem-003',
    memberName: 'Nadia Oulhadj',
    description: 'Documentation of traditional indigo dyeing techniques practiced by Tuareg craftspeople in the Agadez region. Includes step-by-step photographs and notes on plant sources.',
    mediaUrls: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&auto=format'],
    coverImageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&auto=format',
    votes: 31,
    createdAt: '2025-05-25T10:00:00Z',
  },
]

export async function getMembers(filters?: { level?: number; status?: string; search?: string }): Promise<CommunityMember[]> {
  let results = [...MEMBERS]
  if (filters?.level !== undefined) results = results.filter(m => m.level === filters.level)
  if (filters?.status) results = results.filter(m => m.status === filters.status)
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(m => m.displayName.toLowerCase().includes(q) || m.email.toLowerCase().includes(q))
  }
  return Promise.resolve(results)
}

export async function getMember(id: string): Promise<CommunityMember | null> {
  return Promise.resolve(MEMBERS.find(m => m.id === id) ?? null)
}

export async function getContributions(filters?: { status?: string; type?: string }): Promise<Contribution[]> {
  let results = [...CONTRIBUTIONS]
  if (filters?.status) results = results.filter(c => c.status === filters.status)
  if (filters?.type) results = results.filter(c => c.type === filters.type)
  return Promise.resolve(results)
}

export async function getContribution(id: string): Promise<Contribution | null> {
  return Promise.resolve(CONTRIBUTIONS.find(c => c.id === id) ?? null)
}

export async function moderateContribution(id: string, status: string, notes?: string): Promise<Contribution | null> {
  const idx = CONTRIBUTIONS.findIndex(c => c.id === id)
  if (idx === -1) return Promise.resolve(null)
  CONTRIBUTIONS[idx] = {
    ...CONTRIBUTIONS[idx],
    status: status as Contribution['status'],
    reviewNotes: notes,
    reviewedAt: new Date().toISOString(),
  }
  return Promise.resolve(CONTRIBUTIONS[idx])
}
