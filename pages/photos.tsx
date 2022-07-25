import cx from 'classnames'
import type { NextPage } from 'next'
import { DownloadImage } from '../components/DownloadImage'
import { Nav } from '../components/Nav'
import Section from '../components/Section'

type PhotosPageProps = {
  items: Photo[]
}

const PhotosPage: NextPage<PhotosPageProps> = (props) => {
  return (
    <div className="h-screen">
      <Nav className="bg-berry-500 text-lemon-500" />
      <main className="cursor-lemon">
        <Section bg="rose" color="berry" rounded="br" height="content">
          <div className="px-8">
            <h1 className="text-3xl font-medium font-fairplex text-center uppercase">
              Our Photos
            </h1>
            <p className="text-center text-sm pt-2 lowercase">
              by{' '}
              <a
                className="border-b border-lemon-500 border-solid"
                href="https://www.wildwhim.com/"
                target="_blank"
                rel="noreferrer"
              >
                Wild Whim
              </a>
            </p>
          </div>
          <div
            className={cx(
              'grid place-items-center p-8 gap-10',
              'xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2',
              'items-start',
            )}
          >
            {props.items.map((item) => (
              <DownloadImage
                key={item.id}
                imageUrl={item.src.xlarge}
                downloadUrl={item.src.full}
              />
            ))}
          </div>
        </Section>
        <Section color="rose" rounded="bl" height="screen" />
        <div className="w-full h-10" />
      </main>
    </div>
  )
}

type Photo = {
  id: string
  isPrivate: boolean
  height: number
  width: number
  src: {
    thumb: string
    small: string
    medium: string
    large: string
    xlarge: string
    full: string
  }
}

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

export async function getServerSideProps() {
  const res = await fetch(
    'https://wildwhimphotography.pixieset.com/client/loadphotos/?cuk=sarahandjeremiah&cid=46818157&gs=highlights&fk=&page=1',
    {
      headers: {
        accept: '*/*',
        'x-requested-with': 'XMLHttpRequest',
      },
      body: null,
      method: 'GET',
    },
  )
  const data = await res.json()

  const images: ServerPhoto[] = JSON.parse(data.content)

  const items: Photo[] = images.map((image) => ({
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

  return {
    props: {
      items,
    },
  }
}

export default PhotosPage
