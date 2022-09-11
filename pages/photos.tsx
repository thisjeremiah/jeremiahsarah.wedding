import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { DownloadIcon } from '../components/DownloadIcon'
import { downloadFilename, DownloadImage } from '../components/DownloadImage'
import Layout from '../components/Layout'
import Title from '../components/Title'

type PhotosPageProps = {
  items: Photo[]
}

const PhotosPage: NextPage<PhotosPageProps> = (props) => {
  const { setSelectedId, selectedItem, nextItemId, prevItemId } = usePhotos(
    props.items,
  )

  return (
    <Layout
      navBackdropClassName="bg-blossom-400/50"
      navClassName="bg-blossom-500"
      className="bg-blossom-400 text-fuschia-500 cursor-fuschia selection:bg-blossom-200"
    >
      <div className="">
        <Title>Photos</Title>
        <p className="text-center text-sm pt-2 lowercase">
          by{' '}
          <a
            className="border-b border-current border-solid"
            href="https://www.wildwhim.com/"
            target="_blank"
            rel="noreferrer"
          >
            Wild Whim
          </a>
        </p>
        <div
          className={cx(
            'masonry sm:masonry-sm md:masonry-md lg:masonry-lg p-8',
          )}
        >
          {props.items.map((item) => (
            <div key={item.id} onClick={() => setSelectedId(item.id)}>
              <DownloadImage
                className="mb-6"
                imageUrl={item.src.large}
                downloadUrl={item.src.full}
                width={item.width}
                height={item.height}
              />
            </div>
          ))}
        </div>
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0">
              <motion.div
                onClick={() => setSelectedId(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid w-screen h-screen bg-rose-600/80 items-center justify-items-center"
              >
                <AnimatePresence>
                  <motion.img
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0 } }}
                    exit={{ opacity: 0, transition: { delay: 0 } }}
                    transition={{ duration: 0.2 }}
                    key={selectedItem.id}
                    className="row-span-full col-span-full rounded-sm pointer-events-auto max-h-[90vh] max-w-[85vw]"
                    src={selectedItem.src.full}
                    style={{
                      aspectRatio: `${selectedItem.width} / ${selectedItem.height}`,
                    }}
                  />
                </AnimatePresence>
                <div
                  onClick={(e) => {
                    setSelectedId(nextItemId!)
                    e.stopPropagation()
                  }}
                  className="select-none text-rose-200 cursor-pointer absolute text-2xl left-4 top-[50%]"
                >
                  ←
                </div>
                <div
                  onClick={(e) => {
                    setSelectedId(prevItemId!)
                    e.stopPropagation()
                  }}
                  className="select-none text-rose-200 cursor-pointer absolute text-2xl right-4 top-[50%]"
                >
                  →
                </div>
                <div className="select-none text-rose-200 cursor-pointer absolute text-3xl top-4 right-4">
                  ×
                </div>
                <div className="select-none text-rose-200 cursor-pointer absolute text-3xl bottom-4 left-4">
                  <a
                    href={'/api?url=https:' + selectedItem.src.full}
                    download={downloadFilename(selectedItem.src.full)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DownloadIcon />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}

function usePhotos(items: Photo[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // preload photos
  useEffect(() => {
    Promise.all(
      items.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(img)
          img.onerror = img.onabort = () => reject()
          img.src = item.src.full
        })
      }),
    )
      .then(() => {})
      .catch(() => {})
  }, [items])

  const selectedItem = useMemo(() => {
    if (selectedId) {
      return items.find((item) => item.id === selectedId)!
    }
    return null
  }, [selectedId, items])

  const nextItemId = useMemo(() => {
    if (selectedId) {
      let index = items.findIndex((item) => item.id === selectedId)! + 1
      if (index >= items.length) {
        return items[0].id
      } else {
        return items[index].id
      }
    }
    return null
  }, [selectedId, items])

  const prevItemId = useMemo(() => {
    if (selectedId) {
      let index = items.findIndex((item) => item.id === selectedId)! - 1
      if (index < 0) {
        return items[items.length - 1].id
      } else {
        return items[index].id
      }
    }
    return null
  }, [selectedId, items])

  return { selectedItem, nextItemId, prevItemId, setSelectedId }
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

const rootUrl =
  'https://wildwhimphotography.pixieset.com/client/loadphotos/?cuk=sarahandjeremiah&cid=46818157'

const favoritesUrl = rootUrl + '&fk=20693267'

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
  })
  const data = await res.json()

  images.push(...JSON.parse(data.content))

  if (!data.isLastPage) {
    return getAllPhotos(page + 1, images)
  }

  return images
}

export async function getStaticProps() {
  const images = await getAllPhotos()

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
    revalidate: 10,
  }
}

export default PhotosPage
