// ─── Color Palette ───────────────────────────────────────────────────────────

export const INDIGO = '#1E2F44'
export const TEXT = '#2E2E2E'
export const TEXT_SEC = '#506681'
export const BORDER = '#D8D0C4'
export const CLAY = '#8C6B52'
export const SAGE = '#7D8470'
export const SAND = '#B7AA91'
export const BG = '#EDE8DF'
export const SURFACE = '#F5F1EA'
export const SURFACE_2 = '#EFE8DD'
export const CREAM = '#E7DFD2'

// Extended palette
export const SUCCESS = '#4A7A5A'
export const SUCCESS_BG = '#E6EDE8'
export const WARNING = '#8C6B52'
export const WARNING_BG = '#F5EDE3'
export const ERROR = '#A63D2F'
export const ERROR_BG = '#F5E6E3'
export const INFO = INDIGO
export const INFO_BG = '#E8EDF3'

// ─── Typography ───────────────────────────────────────────────────────────────

export const FONT_SERIF = "'Playfair Display', Georgia, serif"
export const FONT_SANS = "'Inter', system-ui, sans-serif"
export const FONT_MONO = "'JetBrains Mono', monospace"

export const TYPE_SCALE = {
  xs: '10px',
  sm: '12px',
  base: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '32px',
  '5xl': '40px',
  '6xl': '48px',
  '7xl': '56px',
  '8xl': '72px',
} as const

export const LINE_HEIGHT = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const

export const LETTER_SPACING = {
  tighter: '-0.02em',
  tight: '-0.01em',
  normal: '0',
  wide: '0.02em',
  wider: '0.05em',
  widest: '0.12em',
  caps: '0.08em',
} as const

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const SPACE = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  18: '72px',
  20: '80px',
  24: '88px',
} as const

// ─── Border Radius ───────────────────────────────────────────────────────────

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 24,
  pill: 999,
} as const

// ─── Elevation / Shadow ──────────────────────────────────────────────────────

export const SHADOW = {
  none: 'none',
  sm: '0 1px 3px rgba(30,47,68,0.06)',
  md: '0 4px 12px rgba(30,47,68,0.10)',
  lg: '0 8px 24px rgba(30,47,68,0.14)',
  xl: '0 16px 40px rgba(30,47,68,0.18)',
  inner: 'inset 0 1px 3px rgba(30,47,68,0.08)',
  card: '0 2px 8px rgba(30,47,68,0.08), 0 0 0 1px rgba(216,208,196,0.6)',
} as const

// ─── Animation / Transitions ─────────────────────────────────────────────────

export const DURATION = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const

export const EASING = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

export const TRANSITION = {
  fast: `all ${DURATION.fast} ${EASING.out}`,
  normal: `all ${DURATION.normal} ${EASING.out}`,
  slow: `all ${DURATION.slow} ${EASING.inOut}`,
} as const

// ─── Layout ──────────────────────────────────────────────────────────────────

export const LAYOUT = {
  sidebarWidth: 264,
  topbarHeight: 60,
  navbarHeight: 64,
  maxContentWidth: 1280,
  maxTextWidth: 760,
  gutter: 40,
  columnGap: 24,
  rowGap: 24,
} as const

// ─── Z-Index ─────────────────────────────────────────────────────────────────

export const Z = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  tooltip: 600,
  switcher: 9999,
} as const

// ─── Accessibility ────────────────────────────────────────────────────────────

export const FOCUS_RING = `0 0 0 2px ${INDIGO}40` as const

// ─── Icon sizes ───────────────────────────────────────────────────────────────

export const ICON_SIZE = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const
