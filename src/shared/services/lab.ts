import type { LabProject, OpenCall } from '../../entities'

const LAB_PROJECTS: LabProject[] = [
  {
    id: 'lab-001',
    slug: 'tifinagh-digital-archive',
    title: 'Tifinagh Digital Archive',
    tagline: 'Building the world\'s most comprehensive open-access Tifinagh glyph library',
    status: 'active',
    category: 'archive',
    coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=700&fit=crop&auto=format',
    description: 'A collaborative effort to photograph, digitize, and catalog Tifinagh inscriptions from across North Africa. The resulting open-access library will serve researchers, designers, and educators worldwide.',
    leadId: 'mem-004',
    leadName: 'Syphax Bellal',
    membersCount: 28,
    maxMembers: 50,
    contributionsCount: 143,
    progress: 58,
    startDate: '2024-09-01T00:00:00Z',
    relatedChallengeIds: [],
    tags: [{ id: 'tag-001', slug: 'tifinagh', label: 'Tifinagh' }, { id: 'tag-017', slug: 'archive', label: 'Archive' }],
    createdAt: '2024-08-15T10:00:00Z',
  },
  {
    id: 'lab-002',
    slug: 'natural-dye-research',
    title: 'North African Natural Dye Research',
    tagline: 'Reviving traditional plant-based dyeing methods for contemporary textile production',
    status: 'active',
    category: 'research',
    coverImageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=700&fit=crop&auto=format',
    description: 'Working with botanists, chemists, and traditional dye masters to document and test natural dye sources used historically by Amazigh craftspeople. Results will inform IZLI\'s future material sourcing.',
    leadId: 'mem-001',
    leadName: 'Amayas Berber',
    membersCount: 15,
    maxMembers: 25,
    contributionsCount: 61,
    progress: 35,
    startDate: '2025-01-01T00:00:00Z',
    relatedChallengeIds: [],
    tags: [{ id: 'tag-018', slug: 'natural-dye', label: 'Natural Dye' }, { id: 'tag-013', slug: 'artisans', label: 'Artisans' }],
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'lab-003',
    slug: 'berber-weave-pattern-library',
    title: 'Berber Weave Pattern Library',
    tagline: 'Creating a freely available library of traditional Berber carpet and textile patterns',
    status: 'paused',
    category: 'design',
    coverImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=700&fit=crop&auto=format',
    description: 'Collecting, vectorizing, and cataloging geometric patterns from historic Berber textiles. The library will be released under a Creative Commons license for use by the global design community.',
    leadId: 'mem-002',
    leadName: 'Tamazight Kader',
    membersCount: 9,
    maxMembers: 20,
    contributionsCount: 38,
    progress: 20,
    startDate: '2025-02-01T00:00:00Z',
    relatedChallengeIds: ['chal-001'],
    tags: [{ id: 'tag-007', slug: 'berber', label: 'Berber' }, { id: 'tag-003', slug: 'woven', label: 'Woven' }],
    createdAt: '2025-01-15T10:00:00Z',
  },
]

const OPEN_CALLS: OpenCall[] = [
  {
    id: 'oc-001',
    title: 'Tifinagh Archive — Field Researchers',
    tagline: 'Join our team documenting inscriptions across North Africa',
    status: 'active',
    labProjectId: 'lab-001',
    coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=700&fit=crop&auto=format',
    description: 'We are looking for community members based in Morocco, Algeria, Libya, Mali, Niger, or Mauritania who can assist in on-the-ground documentation of Tifinagh inscriptions. Training and materials provided.',
    requirements: [
      'Must be based in or able to travel to North Africa or the Sahel',
      'Camera or smartphone capable of high-resolution photography',
      'Basic GPS skills for location logging',
      'Willingness to complete our 2-hour training module',
    ],
    deadline: '2025-08-31T23:59:59Z',
    submissionsCount: 22,
    maxSubmissions: 30,
    createdAt: '2025-04-01T10:00:00Z',
  },
  {
    id: 'oc-002',
    title: 'Natural Dye Research — Botanist Collaborators',
    tagline: 'Help us identify and test traditional dye plant species',
    status: 'active',
    labProjectId: 'lab-002',
    coverImageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=700&fit=crop&auto=format',
    description: 'We are seeking contributors with botanical knowledge or access to traditional dye plants in the Maghreb region. Contribute plant samples, identification expertise, or dyeing experiments.',
    requirements: [
      'Background in botany, ecology, or traditional crafts preferred',
      'Access to or knowledge of dye plants in Algeria, Morocco, Tunisia, or Libya',
      'Ability to photograph and document plant specimens',
      'Basic written documentation skills (any language)',
    ],
    deadline: '2025-09-30T23:59:59Z',
    submissionsCount: 11,
    createdAt: '2025-03-15T10:00:00Z',
  },
]

export async function getLabProjects(filters?: { status?: string }): Promise<LabProject[]> {
  let results = [...LAB_PROJECTS]
  if (filters?.status) results = results.filter(p => p.status === filters.status)
  return Promise.resolve(results)
}

export async function getLabProject(id: string): Promise<LabProject | null> {
  return Promise.resolve(LAB_PROJECTS.find(p => p.id === id) ?? null)
}

export async function getOpenCalls(): Promise<OpenCall[]> {
  return Promise.resolve([...OPEN_CALLS])
}

export async function getOpenCall(id: string): Promise<OpenCall | null> {
  return Promise.resolve(OPEN_CALLS.find(o => o.id === id) ?? null)
}
