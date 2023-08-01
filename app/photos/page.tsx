import { getAllPhotoBoothPhotos } from './get-photobooth-photos'
import PhotosPage, { Photo } from './photos-page'

export default async function Page() {
  const photos = await getPhotos()

  return <PhotosPage photos={photos} />
}

const engagementArgs = 'cuk=sarahandjeremiah&cid=46818157&fk=20693267'
const weddingArgs = 'cuk=sarahjeremiah&cid=60298401&fk=26956988'

export async function getPhotos(): Promise<Photo[]> {
  const engagementImages = await getAllPhotos(engagementArgs)
  const engagementPhotos = serverPhotosToPhotos(engagementImages, 'engagement')

  const weddingImages = await getAllPhotos(weddingArgs)
  const weddingPhotos = serverPhotosToPhotos(weddingImages, 'wedding')

  const photoBoothPhotos = getAllPhotoBoothPhotos()

  return [...engagementPhotos, ...photoBoothPhotos, ...weddingPhotos]
}

const rootUrl = 'https://wildwhimphotography.pixieset.com/client/loadphotos/?'

type ServerPhoto = {
  id: string
  idhash: string
  name: string
  isPrivate: boolean
  height: string
  width: number
  maxHeight: number
  maxWidth: number
  pathThumb: string
  pathSmall: string
  pathMedium: string
  pathLarge: string
  pathXlarge: string
  pathXxlarge: string
}

function serverPhotosToPhotos(
  photos: ServerPhoto[],
  type: Photo['type'],
): Photo[] {
  return photos.map((photo) => ({
    id: photo.id,
    type: type,
    height: Number(photo.height),
    width: Number(photo.width),
    src: {
      large: photo.pathLarge,
      full: photo.pathXxlarge,
    },
  }))
}

async function getAllPhotos(
  args: string,
  page: number = 1,
  images: ServerPhoto[] = [],
): Promise<ServerPhoto[]> {
  const res = await fetch(rootUrl + `${args}&page=${page}`, {
    headers: {
      accept: '*/*',
      'x-requested-with': 'XMLHttpRequest',
    },
    body: null,
    method: 'GET',
    next: { revalidate: 10 },
  })

  const data = await res.json()

  images.push(...JSON.parse(data.content))

  if (!data.isLastPage) {
    return getAllPhotos(args, page + 1, images)
  }

  return images
}
