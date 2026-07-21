export interface BrandSettings {
  name: string
  tagline: string
  logoUrl: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  currency: string
  timezone: string
  locale: string
}

export interface SiteSettings {
  domain: string
  metaTitle: string
  metaDescription: string
  socialLinks: Record<string, string>
  analyticsId?: string
  maintenanceMode: boolean
}

export interface CommerceSettings {
  taxRate: number
  shippingFreeThreshold: number
  defaultShippingCost: number
  supportedCurrencies: string[]
  supportedCountries: string[]
  returnsWindowDays: number
}

export interface CommunitySettings {
  memberLevels: number
  contributionModerationRequired: boolean
  challengeSubmissionLimit: number
  labProjectMaxMembers: number
  pointsPerContribution: number
  pointsPerChallenge: number
}

export interface AppSettings {
  brand: BrandSettings
  site: SiteSettings
  commerce: CommerceSettings
  community: CommunitySettings
}

let SETTINGS: AppSettings = {
  brand: {
    name: 'IZLI',
    tagline: 'Amazigh Heritage Menswear',
    logoUrl: '/logo.svg',
    primaryColor: '#1A1A1A',
    secondaryColor: '#C9A84C',
    accentColor: '#2D5A8E',
    currency: 'EUR',
    timezone: 'Europe/Paris',
    locale: 'en-GB',
  },
  site: {
    domain: 'izli.com',
    metaTitle: 'IZLI — Amazigh Heritage Menswear',
    metaDescription: 'Contemporary menswear rooted in Amazigh heritage. Crafted with intention, designed for the future.',
    socialLinks: {
      instagram: 'https://instagram.com/izliofficial',
      tiktok: 'https://tiktok.com/@izliofficial',
    },
    maintenanceMode: false,
  },
  commerce: {
    taxRate: 20,
    shippingFreeThreshold: 200,
    defaultShippingCost: 8,
    supportedCurrencies: ['EUR', 'GBP', 'USD', 'MAD'],
    supportedCountries: ['FR', 'GB', 'DE', 'NL', 'BE', 'ES', 'IT', 'CA', 'US', 'MA', 'DZ', 'TN'],
    returnsWindowDays: 30,
  },
  community: {
    memberLevels: 5,
    contributionModerationRequired: true,
    challengeSubmissionLimit: 3,
    labProjectMaxMembers: 50,
    pointsPerContribution: 10,
    pointsPerChallenge: 25,
  },
}

export async function getSettings(): Promise<AppSettings> {
  return Promise.resolve({ ...SETTINGS })
}

export async function updateSettings(section: string, data: Record<string, unknown>): Promise<AppSettings> {
  SETTINGS = {
    ...SETTINGS,
    [section]: {
      ...(SETTINGS[section as keyof AppSettings] as unknown as Record<string, unknown>),
      ...data,
    },
  }
  return Promise.resolve({ ...SETTINGS })
}

export async function resetSettings(section: string): Promise<AppSettings> {
  // In a real app this would reset to defaults from a config file; here we just return current
  console.warn(`resetSettings called for section: ${section}`)
  return Promise.resolve({ ...SETTINGS })
}
