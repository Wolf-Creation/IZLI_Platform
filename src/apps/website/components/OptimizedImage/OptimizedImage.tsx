import { useEffect, useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react'
import { getImageDeliveryProps, type ImageDimensions, type ImagePreset } from '../../services/imageDelivery'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'width' | 'height' | 'loading' | 'fetchPriority'> {
  src: string
  preset: ImagePreset
  dimensions?: ImageDimensions
  priority?: boolean
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function OptimizedImage({
  src,
  preset,
  dimensions,
  priority = false,
  loading,
  fetchPriority,
  decoding = 'async',
  onError,
  ...imageProps
}: OptimizedImageProps) {
  const [useOriginal, setUseOriginal] = useState(false)
  const delivery = getImageDeliveryProps(src, preset, dimensions)

  useEffect(() => {
    setUseOriginal(false)
  }, [src])

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (!useOriginal && delivery.optimized) {
      setUseOriginal(true)
    }
    onError?.(event)
  }

  return (
    <img
      {...imageProps}
      src={useOriginal ? src : delivery.src}
      srcSet={useOriginal ? undefined : delivery.srcSet}
      sizes={useOriginal ? undefined : delivery.sizes}
      width={delivery.width}
      height={delivery.height}
      loading={priority ? 'eager' : loading ?? 'lazy'}
      fetchPriority={priority ? 'high' : fetchPriority}
      decoding={decoding}
      onError={handleError}
    />
  )
}
