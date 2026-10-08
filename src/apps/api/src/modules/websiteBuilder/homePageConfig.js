export const HOME_PAGE_CONFIG_KEY = 'website-builder:home-page';

export const HOME_SECTION_DEFAULTS = {
  hero: { title: '', description: '' },
  'new-releases': { title: 'New releases', description: '' },
  tops: { title: 'Tops', description: 'Built for every day' },
  bottoms: { title: 'Bottoms', description: 'Made to move with you' },
  'keeper-circle': {
    title: 'KEEPER CIRCLE',
    description: 'Get First Access to what comes next, Unlock Exclusive Experiences, and Become part of the IZLI Community.',
  },
};

export const KEEPER_BENEFIT_DEFAULTS = [
  {
    eyebrow: 'FIRST ACCESS',
    titleLead: 'Before the release.',
    titleHighlight: 'Before everyone else.',
    description: 'Discover new pieces earlier, access limited drops, and secure your size before the collection reaches everyone else.',
    points: ['Discover First', 'Secure Your Size', 'Priority Access'],
  },
  {
    eyebrow: 'EXCLUSIVE EXPERIENCES',
    titleLead: 'As you rise,',
    titleHighlight: 'New doors open.',
    description: 'The circle opens onto the moments behind the collection. Meet the people, places, and stories that give each release its meaning.',
    points: ['Private Events', 'Members-Only Experiences', 'Status-Based Access'],
  },
  {
    eyebrow: 'IZLI COMMUNITY',
    titleLead: 'Grow within,',
    titleHighlight: 'Go further.',
    description: 'Every piece you choose, every story you share, and every moment you take part in helps shape your journey within the IZLI community. As you grow, your Keeper Status evolves — opening the way to deeper access and new experiences.',
    points: ['Grow Your Status', 'Share the Story', 'Carry the Pieces'],
  },
];

export const HOME_SECTION_TYPES = Object.keys(HOME_SECTION_DEFAULTS);

export const DEFAULT_HOME_PAGE_CONFIG = {
  sections: [
    { id: 'hero', type: 'hero', enabled: true, productIds: [], productCount: 3, ...HOME_SECTION_DEFAULTS.hero },
    { id: 'new-releases', type: 'new-releases', enabled: true, ...HOME_SECTION_DEFAULTS['new-releases'] },
    { id: 'tops', type: 'tops', enabled: true, ...HOME_SECTION_DEFAULTS.tops },
    { id: 'bottoms', type: 'bottoms', enabled: true, ...HOME_SECTION_DEFAULTS.bottoms },
    { id: 'keeper-circle', type: 'keeper-circle', enabled: true, ...HOME_SECTION_DEFAULTS['keeper-circle'] },
  ],
};

export function normalizeHomePageConfig(input = {}) {
  const seenIds = new Set();
  const sections = (Array.isArray(input.sections) ? input.sections : DEFAULT_HOME_PAGE_CONFIG.sections)
    .filter(section => section && HOME_SECTION_TYPES.includes(section.type))
    .slice(0, 30)
    .map((section, index) => {
      const defaults = HOME_SECTION_DEFAULTS[section.type];
      const baseId = String(section.id ?? `${section.type}-${index + 1}`).trim().slice(0, 80) || `${section.type}-${index + 1}`;
      let id = baseId;
      let suffix = 2;
      while (seenIds.has(id)) {
        id = `${baseId.slice(0, 70)}-${suffix}`;
        suffix += 1;
      }
      seenIds.add(id);

      const normalizedSection = {
        id,
        type: section.type,
        enabled: section.enabled === undefined ? true : Boolean(section.enabled),
        title: String(section.title ?? defaults.title).trim().slice(0, 140),
        description: String(section.description ?? defaults.description).trim().slice(0, 1000),
      };

      if (['hero', 'tops', 'bottoms'].includes(section.type)) {
        const productIds = Array.isArray(section.productIds)
          ? [...new Set(section.productIds.filter(productId => typeof productId === 'string').map(productId => productId.trim()).filter(Boolean))]
          : undefined;
        if (section.type !== 'hero') {
          return productIds === undefined ? normalizedSection : { ...normalizedSection, productIds };
        }

        const parsedProductCount = Number(section.productCount ?? 3);
        return {
          ...normalizedSection,
          backgroundImage: String(section.backgroundImage ?? '').trim().slice(0, 2000),
          overlayPosition: ['center', 'bottom', 'left', 'right'].includes(section.overlayPosition) ? section.overlayPosition : 'left',
          overlayOpacity: Number.isFinite(Number(section.overlayOpacity)) ? Math.min(100, Math.max(0, Number(section.overlayOpacity))) : 50,
          productIds: (productIds ?? []).slice(0, 3),
          productCount: Number.isInteger(parsedProductCount) ? Math.min(3, Math.max(1, parsedProductCount)) : 3,
        };
      }

      if (section.type === 'keeper-circle') {
        const benefits = Array.isArray(section.benefits) ? section.benefits : KEEPER_BENEFIT_DEFAULTS;
        return {
          ...normalizedSection,
          benefits: KEEPER_BENEFIT_DEFAULTS.map((defaults, index) => {
            const benefit = benefits[index] ?? {};
            const normalizeText = (value, fallback, maxLength) => String(value ?? fallback).trim().slice(0, maxLength);
            const points = Array.isArray(benefit.points) ? benefit.points : defaults.points;
            return {
              eyebrow: normalizeText(benefit.eyebrow, defaults.eyebrow, 100),
              titleLead: normalizeText(benefit.titleLead, defaults.titleLead, 120),
              titleHighlight: normalizeText(benefit.titleHighlight, defaults.titleHighlight, 120),
              description: normalizeText(benefit.description, defaults.description, 1000),
              points: defaults.points.map((point, pointIndex) => normalizeText(points[pointIndex], point, 120)),
            };
          }),
        };
      }

      return normalizedSection;
    });

  return { sections };
}