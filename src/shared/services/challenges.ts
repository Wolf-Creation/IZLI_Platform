import type { Challenge, Submission } from '../../entities'

const CHALLENGES: Challenge[] = [
  {
    id: 'chal-001',
    slug: 'zellij-reimagined',
    title: 'Zellij Reimagined',
    tagline: 'Reinterpret the ancient Moroccan tile art for contemporary garment design',
    status: 'closed',
    level: 'open',
    coverImageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&h=700&fit=crop&auto=format',
    description: 'Zellij is one of the most intricate and beautiful art forms in North African culture. We invite you to study its geometry and reimagine it as a textile pattern suitable for print or embroidery on IZLI garments.',
    guidelines: 'Submit a vector or high-resolution raster file. Include a brief artist statement explaining your interpretation. Patterns must be original and inspired by—not copied from—existing Zellij designs.',
    startDate: '2025-02-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    submissionsCount: 214,
    participantsCount: 189,
    maxParticipants: 500,
    winnersCount: 3,
    relatedProductIds: ['prod-006'],
    tags: [{ id: 'tag-010', slug: 'zellij', label: 'Zellij' }, { id: 'tag-014', slug: 'design', label: 'Design' }],
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'chal-002',
    slug: 'atlas-photography',
    title: 'Atlas Photography Challenge',
    tagline: 'Document the visual culture of the Atlas Mountain communities',
    status: 'active',
    level: 'member',
    coverImageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=700&fit=crop&auto=format',
    description: 'We are building a visual archive of contemporary Amazigh culture in the Atlas Mountain communities. Submit documentary photographs that capture craft, daily life, architecture, or landscape in these regions.',
    guidelines: 'Submit up to 5 photographs per entry. Images must be original and taken by the submitting member. Geolocation metadata appreciated. RAW files preferred but not required.',
    startDate: '2025-05-01T00:00:00Z',
    endDate: '2025-07-31T23:59:59Z',
    submissionsCount: 67,
    participantsCount: 58,
    winnersCount: 5,
    relatedProductIds: [],
    tags: [{ id: 'tag-015', slug: 'photography', label: 'Photography' }, { id: 'tag-002', slug: 'heritage', label: 'Heritage' }],
    createdAt: '2025-04-15T10:00:00Z',
  },
  {
    id: 'chal-003',
    slug: 'ss26-pattern-open-call',
    title: 'SS26 Pattern Open Call',
    tagline: 'Design the signature print for IZLI\'s Spring/Summer 2026 collection',
    status: 'upcoming',
    level: 'advanced',
    coverImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=700&fit=crop&auto=format',
    description: 'We are opening our SS26 collection development to the community. The winning pattern will be produced on a limited-edition garment with the designer credited on the label.',
    guidelines: 'Pattern must be inspired by Amazigh visual traditions. Repeat tile must be between 20cm and 40cm. Submit as vector (AI, EPS, or SVG). Colorways: maximum 4 colors from the IZLI palette.',
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-11-30T23:59:59Z',
    submissionsCount: 0,
    participantsCount: 0,
    maxParticipants: 200,
    winnersCount: 1,
    relatedProductIds: [],
    tags: [{ id: 'tag-014', slug: 'design', label: 'Design' }, { id: 'tag-016', slug: 'ss26', label: 'SS26' }],
    createdAt: '2025-06-01T10:00:00Z',
  },
]

const SUBMISSIONS: Submission[] = [
  {
    id: 'sub-001',
    challengeId: 'chal-001',
    memberId: 'mem-001',
    memberName: 'Amayas Berber',
    title: 'Ancestral Zellij Grid — Blue Variant',
    description: 'A geometric reinterpretation using traditional Fez proportions, with indigo and natural white as the primary palette.',
    mediaUrls: ['https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&h=800&fit=crop&auto=format'],
    coverImageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&h=800&fit=crop&auto=format',
    status: 'winner',
    votes: 342,
    judgeScore: 9.2,
    judgeNotes: 'Exceptional faithfulness to source geometry with a confident modern reduction in palette.',
    rank: 1,
    submittedAt: '2025-03-15T14:00:00Z',
    reviewedAt: '2025-04-10T10:00:00Z',
  },
  {
    id: 'sub-002',
    challengeId: 'chal-001',
    memberId: 'mem-004',
    memberName: 'Syphax Bellal',
    title: 'Eight-Point Star Lattice',
    description: 'The eight-pointed star is the most iconic unit in Zellij work. I isolated it and built an infinite lattice using only two colors, optimized for screen printing.',
    mediaUrls: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop&auto=format'],
    coverImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop&auto=format',
    status: 'shortlisted',
    votes: 287,
    judgeScore: 8.7,
    rank: 2,
    submittedAt: '2025-03-20T10:00:00Z',
    reviewedAt: '2025-04-10T10:00:00Z',
  },
  {
    id: 'sub-003',
    challengeId: 'chal-002',
    memberId: 'mem-002',
    memberName: 'Tamazight Kader',
    title: 'Market Day in Ait Benhaddou',
    description: 'A series of 5 photographs documenting the weekly market in Ait Benhaddou, focusing on craft goods and textile traders.',
    mediaUrls: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop&auto=format'],
    coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop&auto=format',
    status: 'submitted',
    votes: 43,
    submittedAt: '2025-05-28T16:00:00Z',
  },
  {
    id: 'sub-004',
    challengeId: 'chal-002',
    memberId: 'mem-003',
    memberName: 'Nadia Oulhadj',
    title: 'High Atlas Weaver Portraits',
    description: 'Portraits of three generations of weavers in a family workshop near Azilal, capturing the passing of craft knowledge.',
    mediaUrls: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=600&fit=crop&auto=format'],
    coverImageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=600&fit=crop&auto=format',
    status: 'submitted',
    votes: 29,
    submittedAt: '2025-06-01T11:00:00Z',
  },
]

export async function getChallenges(filters?: { status?: string }): Promise<Challenge[]> {
  let results = [...CHALLENGES]
  if (filters?.status) results = results.filter(c => c.status === filters.status)
  return Promise.resolve(results)
}

export async function getChallenge(id: string): Promise<Challenge | null> {
  return Promise.resolve(CHALLENGES.find(c => c.id === id) ?? null)
}

export async function getSubmissions(challengeId: string): Promise<Submission[]> {
  return Promise.resolve(SUBMISSIONS.filter(s => s.challengeId === challengeId))
}

export async function getSubmission(id: string): Promise<Submission | null> {
  return Promise.resolve(SUBMISSIONS.find(s => s.id === id) ?? null)
}

export async function moderateSubmission(id: string, status: string): Promise<Submission | null> {
  const idx = SUBMISSIONS.findIndex(s => s.id === id)
  if (idx === -1) return Promise.resolve(null)
  SUBMISSIONS[idx] = {
    ...SUBMISSIONS[idx],
    status: status as Submission['status'],
    reviewedAt: new Date().toISOString(),
  }
  return Promise.resolve(SUBMISSIONS[idx])
}
