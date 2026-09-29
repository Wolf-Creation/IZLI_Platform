export const OFFICIAL_COLLECTIONS = [
  {
    name: 'Legacy', slug: 'legacy', type: 'LEGACY', universe: 'Heritage',
    tagline: 'Stories inherited. Reimagined.',
    shortDescription: 'Collections inspired by Amazigh heritage, reinterpreted for today and tomorrow.',
    description: 'Legacy is where IZLI looks to the heritage, stories, symbols, places and traditions that shape its creative language. Each collection translates elements of Amazigh heritage into contemporary forms, materials and expressions.',
    displayOrder: 1, isFeatured: true, isActive: true, status: 'active', season: 'Permanent',
  },
  {
    name: 'Studio', slug: 'studio', type: 'STUDIO', universe: 'Studio',
    tagline: 'Ideas in motion.',
    shortDescription: 'A space for experimentation, new ideas and contemporary expressions.',
    description: 'Studio is where IZLI experiments. New forms, materials, graphics and ideas take shape while remaining connected to the identity and creative language of IZLI.',
    displayOrder: 2, isFeatured: true, isActive: true, status: 'active', season: 'Permanent',
  },
  {
    name: 'Essentials', slug: 'essentials', type: 'ESSENTIALS', universe: 'Essentials',
    tagline: 'Timeless by nature.',
    shortDescription: 'Core IZLI pieces designed for everyday wear.',
    description: 'Essentials brings together the core pieces of IZLI. Designed with simplicity, quality and longevity in mind, these pieces carry the spirit of IZLI into everyday life.',
    displayOrder: 3, isFeatured: true, isActive: true, status: 'active', season: 'Permanent',
  },
  {
    name: 'Community Lab', slug: 'community-lab', type: 'COMMUNITY_LAB', universe: 'Community Lab',
    tagline: 'Made with, not for.',
    shortDescription: 'Collaborative projects shaped with the IZLI community.',
    description: 'Community Lab is the space where IZLI and its community create together. Ideas, experiments and projects emerge through participation, collaboration and shared experiences.',
    displayOrder: 4, isFeatured: true, isActive: true, status: 'active', season: 'Permanent',
  },
].map(collection => ({ ...collection, coverImage: null, heroImage: null }));