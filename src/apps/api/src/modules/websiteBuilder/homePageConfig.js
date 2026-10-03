export const HOME_PAGE_CONFIG_KEY = 'website-builder:home-page';

export const HOME_SECTION_DEFAULTS = {
  hero: { title: '', description: '' },
  'new-releases': { title: 'New releases', description: '' },
  tops: { title: 'Tops', description: 'Built for every day' },
  bottoms: { title: 'Bottoms', description: 'Made to move with you' },
  'keeper-circle': { title: 'KEEPER CIRCLE', description: '' },
};

export const HOME_SECTION_TYPES = Object.keys(HOME_SECTION_DEFAULTS);

export const DEFAULT_HOME_PAGE_CONFIG = {
  sections: [
    { id: 'hero', type: 'hero', enabled: true, ...HOME_SECTION_DEFAULTS.hero },
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

      return {
        id,
        type: section.type,
        enabled: section.enabled === undefined ? true : Boolean(section.enabled),
        title: String(section.title ?? defaults.title).trim().slice(0, 140),
        description: String(section.description ?? defaults.description).trim().slice(0, 1000),
      };
    });

  return { sections };
}