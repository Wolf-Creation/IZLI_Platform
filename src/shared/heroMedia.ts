export function withHeroBackgroundRemoved(imageUrl: string): string {
  try {
    const url = new URL(imageUrl)
    if (!url.hostname.endsWith('cloudinary.com') || !url.pathname.includes('/image/upload/')) return imageUrl
    if (url.pathname.includes('e_background_removal')) return imageUrl

    url.pathname = url.pathname.replace('/image/upload/', '/image/upload/e_background_removal,f_png/')
    return url.toString()
  } catch {
    return imageUrl
  }
}
