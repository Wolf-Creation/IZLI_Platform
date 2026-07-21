// Backward-compatible re-export.
// The canonical source of truth is src/shared/theme/tokens.ts.
// All new code should import from there (or from src/shared/theme).
// Existing website and admin files that import from '../../tokens' or '../tokens'
// continue to work without modification.

export {
  INDIGO,
  TEXT,
  TEXT_SEC,
  BORDER,
  CLAY,
  SAGE,
  SAND,
  BG,
  SURFACE,
  SURFACE_2,
  CREAM,
  FONT_SERIF,
  FONT_SANS,
  FONT_MONO,
  RADIUS,
} from './shared/theme/tokens'
