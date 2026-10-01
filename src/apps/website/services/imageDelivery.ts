export type ImagePreset =
  | 'productCard'
  | 'productCarousel'
  | 'productDetail'
  | 'productZoom'
  | 'thumbnail'
  | 'collectionCard'
  | 'collectionHero'
  | 'heroDesktop'
  | 'heroMobile'
  | 'story'
  | 'community'
  | 'avatar'

interface ImagePresetConfig {
  width: number
  height: number
  candidates: number[]
  sizes: string
  quality?: 'auto' | 'auto:best'
}

export interface ImageDimensions {
  width?: number
  height?: number
}

export interface ImageDeliveryProps {
  src: string
  srcSet?: string
  sizes?: string
  width: number
  height: number
  optimized: boolean
}

const IMAGE_PRESETS: Record<ImagePreset, ImagePresetConfig> = {
  productCard: {
    width: 600,
    height: 800,
    candidates: [320, 480, 600, 800],
    sizes: '(max-width: 560px) 50vw, (max-width: 900px) 50vw, (max-width: 1100px) 33vw, 25vw',
  },
  productCarousel: {
    width: 600,
    height: 800,
    candidates: [300, 450, 600],
    sizes: '300px',
  },
  productDetail: {
    width: 1200,
    height: 1500,
    candidates: [480, 640, 960, 1200, 1600],
    sizes: '(max-width: 860px) 100vw, (max-width: 1280px) 34vw, 30vw',
  },
  productZoom: {
    width: 2048,
    height: 2560,
    candidates: [960, 1200, 1600, 2048],
    sizes: '100vw',
  },
  thumbnail: {
    width: 240,
    height: 240,
    candidates: [96, 160, 240, 320],
    sizes: '48px',
  },
  collectionCard: {
    width: 1000,
    height: 1333,
    candidates: [320, 480, 640, 800, 1000, 1200, 1600],
    sizes: '(max-width: 720px) 50vw, (max-width: 1100px) 33vw, 30vw',
    quality: 'auto:best',
  },
  collectionHero: {
    width: 1920,
    height: 1080,
    candidates: [640, 960, 1280, 1600, 1920],
    sizes: '100vw',
  },
  heroDesktop: {
    width: 1920,
    height: 1080,
    candidates: [640, 960, 1280, 1600, 1920],
    sizes: '100vw',
  },
  heroMobile: {
    width: 1080,
    height: 1350,
    candidates: [480, 640, 800, 1080],
    sizes: '100vw',
  },
  story: {
    width: 1200,
    height: 900,
    candidates: [360, 640, 800, 1200],
    sizes: '(max-width: 720px) 100vw, 50vw',
  },
  community: {
    width: 800,
    height: 600,
    candidates: [280, 400, 600, 800],
    sizes: '(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw',
  },
  avatar: {
    width: 240,
    height: 240,
    candidates: [96, 160, 240, 320],
    sizes: '120px',
  },
}

const TRANSFORMATION_KEYS = new Set(['a', 'ar', 'b', 'bo', 'c', 'd', 'dpr', 'e', 'f', 'fl', 'g', 'h', 'if', 'l', 'o', 'pg', 'q', 'r', 't', 'u', 'w', 'x', 'y', 'z'])

function isTransformationSegment(segment: string) {
  return segment.split(',').every(transformation => {
    const separator = transformation.indexOf('_')
    return separator > 0 && TRANSFORMATION_KEYS.has(transformation.slice(0, separator))
  })
}

export function isCloudinaryImageUrl(source: string) {
  try {
    const url = new URL(source)
    return url.hostname === 'res.cloudinary.com' && url.pathname.includes('/image/upload/')
  } catch {
    return false
  }
}

export function getCloudinaryImageUrl(source: string, width: number, quality: 'auto' | 'auto:best' = 'auto') {
  if (!isCloudinaryImageUrl(source)) return source

  const url = new URL(source)
  const uploadMarker = '/image/upload/'
  const uploadIndex = url.pathname.indexOf(uploadMarker)
  if (uploadIndex < 0) return source

  const uploadPrefix = url.pathname.slice(0, uploadIndex + uploadMarker.length)
  const imagePath = url.pathname.slice(uploadIndex + uploadMarker.length).split('/')
  while (imagePath.length > 0 && isTransformationSegment(imagePath[0]) && !/^v\d+$/.test(imagePath[0])) {
    imagePath.shift()
  }

  url.pathname = `${uploadPrefix}f_auto,q_${quality},w_${width},c_limit/${imagePath.join('/')}`
  return url.toString()
}

export function getImageDeliveryProps(source: string, presetName: ImagePreset, dimensions?: ImageDimensions): ImageDeliveryProps {
  const preset = IMAGE_PRESETS[presetName]
  const optimized = isCloudinaryImageUrl(source)

  if (!optimized) {
    return {
      src: source,
      width: dimensions?.width || preset.width,
      height: dimensions?.height || preset.height,
      optimized: false,
    }
  }

  return {
    src: getCloudinaryImageUrl(source, preset.width, preset.quality),
    srcSet: preset.candidates.map(width => `${getCloudinaryImageUrl(source, width, preset.quality)} ${width}w`).join(', '),
    sizes: preset.sizes,
    width: dimensions?.width || preset.width,
    height: dimensions?.height || preset.height,
    optimized: true,
  }
}
