export const COLLECTIONS_PAGE_CONFIG_KEY = 'website-builder:collections-page';

export const DEFAULT_COLLECTIONS_PAGE_CONFIG = {
  title: 'Collections',
  descriptions: [
    'Every collection has a story.',
    'Rooted in Amazigh heritage, research, and community.',
  ],
  sectionTitle: 'Explore our collections',
  collectionOrder: ['legacy', 'studio', 'essentials', 'community-lab'],
  visibleCollectionSlugs: ['legacy', 'studio', 'essentials', 'community-lab'],
  showTagline: true,
  showShortDescription: true,
  columns: 4,
};

export function normalizeCollectionsPageConfig(input = {}) {
  const descriptions = Array.isArray(input.descriptions)
    ? input.descriptions.slice(0, 2).map(value => String(value ?? '').trim())
    : DEFAULT_COLLECTIONS_PAGE_CONFIG.descriptions;
  const collectionOrder = Array.isArray(input.collectionOrder)
    ? [...new Set(input.collectionOrder.map(value => String(value).trim()).filter(Boolean))]
    : DEFAULT_COLLECTIONS_PAGE_CONFIG.collectionOrder;
  const visibleCollectionSlugs = Array.isArray(input.visibleCollectionSlugs)
    ? [...new Set(input.visibleCollectionSlugs.map(value => String(value).trim()).filter(Boolean))]
    : DEFAULT_COLLECTIONS_PAGE_CONFIG.visibleCollectionSlugs;

  return {
    title: String(input.title ?? DEFAULT_COLLECTIONS_PAGE_CONFIG.title).trim().slice(0, 100),
    descriptions,
    sectionTitle: String(input.sectionTitle ?? DEFAULT_COLLECTIONS_PAGE_CONFIG.sectionTitle).trim().slice(0, 140),
    collectionOrder,
    visibleCollectionSlugs,
    showTagline: input.showTagline === undefined ? DEFAULT_COLLECTIONS_PAGE_CONFIG.showTagline : Boolean(input.showTagline),
    showShortDescription: input.showShortDescription === undefined ? DEFAULT_COLLECTIONS_PAGE_CONFIG.showShortDescription : Boolean(input.showShortDescription),
    columns: Number(input.columns) === 1 ? 1 : 4,
  };
}