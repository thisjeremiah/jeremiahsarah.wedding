import type { Photo } from './photos-page'
import photoBoothPhotos from './photobooth-photos.json'

export function getAllPhotoBoothPhotos(): Photo[] {
  return photoBoothPhotos
    .map((image, i) => ({
      id: `photo-booth-${i}`,
      type: 'photobooth' as const,
      width: 960,
      height: 639,
      src: {
        large: image['crop'],
        full: image.download,
      },
    }))
    .reverse()
}
