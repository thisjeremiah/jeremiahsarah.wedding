import PhotosPage, { Photo } from './photos-page'

export default async function Page() {
  const photos = await getPhotos()

  return <PhotosPage photos={photos} />
}

export async function getPhotos(): Promise<Photo[]> {
  const images = await getAllPhotos()

  return images.map((image) => ({
    id: image.id,
    isPrivate: image.isPrivate,
    height: Number(image.height),
    width: Number(image.width),
    src: {
      thumb: image.pathThumb,
      small: image.pathSmall,
      medium: image.pathSmall,
      large: image.pathLarge,
      xlarge: image.pathXlarge,
      full: image.pathXxlarge,
    },
  }))
}

const rootUrl =
  'https://wildwhimphotography.pixieset.com/client/loadphotos/?cuk=sarahandjeremiah&cid=46818157'

const favoritesUrl = rootUrl + '&fk=20693267'

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

async function getAllPhotos(
  page: number = 1,
  images: ServerPhoto[] = [],
): Promise<ServerPhoto[]> {
  const res = await fetch(favoritesUrl + `&page=${page}`, {
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
    return getAllPhotos(page + 1, images)
  }

  return images
}
