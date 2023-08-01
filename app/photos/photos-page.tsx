'use client'

import cx from 'classnames'
import {
  AnimatePresence,
  motion,
  useIsomorphicLayoutEffect,
} from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { DownloadImage } from '../../components/DownloadImage'
import Layout from '../../components/Layout'
import { theme } from '../../tailwind.config.js'

type PhotosPageProps = {
  photos: Photo[]
}

const filters: {
  label: string
  type: Photo['type']
}[] = [
  {
    label: 'Wedding',
    type: 'wedding',
  },
  {
    label: 'Photo Booth',
    type: 'photobooth',
  },
  {
    label: 'Engagement',
    type: 'engagement',
  },
]

export default function PhotosPage(props: PhotosPageProps) {
  const {
    photos,
    selectedType,
    setSelectedType,
    setSelectedId,
    selectedItem,
    nextItemId,
    prevItemId,
  } = usePhotos(props.photos)

  useDisableBodyScroll(Boolean(selectedItem))

  return (
    <Layout
      title="Photos"
      navBackdropClassName="bg-blossom-400/50"
      navClassName="bg-blossom-500"
      className="bg-blossom-400 text-fuschia-500 cursor-fuschia selection:bg-blossom-200"
      themeColor={theme.extend.colors.blossom[400]}
      buttonClassName="bg-white"
    >
      <div>
        <p className="text-center text-sm pt-2 lowercase">
          Photos by{' '}
          <a
            className="border-b border-current border-solid"
            href="https://www.wildwhim.com/"
            target="_blank"
            rel="noreferrer"
          >
            Wild Whim
          </a>
        </p>
        <div className="mt-6 text-sm lowercase flex gap-5 w-full justify-center">
          {filters.map((filter) => (
            <button
              key={filter.type}
              className={cx(
                'lowercase underline-offset-4',
                filter.type === selectedType ? 'underline' : '',
              )}
              onClick={() => setSelectedType(filter.type)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div
          className={cx(
            'p-8',
            selectedType === 'photobooth'
              ? 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : 'masonry sm:masonry-sm md:masonry-md lg:masonry-lg',
          )}
        >
          {photos.map((item) => (
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
            <div className="fixed inset-0 z-10">
              <motion.div
                onClick={() => setSelectedId(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid text-fuschia-500 w-full h-full bg-fuschia-200/70 items-center justify-items-center"
              >
                <AnimatePresence>
                  <motion.img
                    onClick={(e) => {
                      setSelectedId(nextItemId!)
                      e.stopPropagation()
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0 } }}
                    exit={{ opacity: 0, transition: { delay: 0 } }}
                    transition={{ duration: 0.2 }}
                    key={selectedItem.id}
                    className="bg-fuschia-500 row-span-full col-span-full pointer-events-auto max-h-[90vh] max-w-[85vw]"
                    src={selectedItem.src.full}
                    style={{
                      aspectRatio: `${selectedItem.width} / ${selectedItem.height}`,
                    }}
                  />
                </AnimatePresence>
                <div
                  onClick={(e) => {
                    setSelectedId(prevItemId!)
                    e.stopPropagation()
                  }}
                  className="select-none cursor-pointer absolute text-2xl left-3 sm:left-4 top-[50%] w-8 h-8 text-center leading-8 bg-fuschia-50 rounded-full"
                >
                  ←
                </div>
                <div
                  onClick={(e) => {
                    setSelectedId(nextItemId!)
                    e.stopPropagation()
                  }}
                  className="select-none cursor-pointer absolute text-2xl right-3 sm:right-4 top-[50%] bg-fuschia-50 rounded-full w-8 h-8 text-center leading-8"
                >
                  →
                </div>
                <div className="select-none cursor-pointer absolute text-3xl top-3 right-3 sm:top-4 sm:right-4 h-8 w-8 rounded-full text-center bg-fuschia-50 leading-8">
                  ×
                </div>
                {/*
                <div className="select-none cursor-pointer absolute text-3xl bottom-3 left-3 sm:bottom-4 sm:left-4 bg-fuschia-50 rounded-full pl-3 pr-4 py-1 ">
                  <a
                    className="flex items-center gap-1"
                    href={'/api?url=https:' + selectedItem.src.full}
                    download={downloadFilename(selectedItem.src.full)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DownloadIcon />
                    <p className="inline text-base ml-1">Download</p>
                  </a>
                </div>
                  */}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}

function usePhotos(initialPhotos: Photo[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<
    'engagement' | 'photobooth' | 'wedding'
  >('wedding')

  // preload photos
  useEffect(() => {
    Promise.all(
      initialPhotos.map((item) => {
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
  }, [initialPhotos])

  const photos = useMemo(() => {
    setSelectedId(null)
    return initialPhotos.filter((item) => item.type === selectedType)
  }, [initialPhotos, selectedType])

  const selectedItem = useMemo(() => {
    if (selectedId) {
      return photos.find((item) => item.id === selectedId)!
    }
    return null
  }, [selectedId, photos])

  const nextItemId = useMemo(() => {
    if (selectedId) {
      let index = photos.findIndex((item) => item.id === selectedId)! + 1
      if (index >= photos.length) {
        return photos[0].id
      } else {
        return photos[index].id
      }
    }
    return null
  }, [selectedId, photos])

  const prevItemId = useMemo(() => {
    if (selectedId) {
      let index = photos.findIndex((item) => item.id === selectedId)! - 1
      if (index < 0) {
        return photos[photos.length - 1].id
      } else {
        return photos[index].id
      }
    }
    return null
  }, [selectedId, photos])

  return {
    photos,
    selectedItem,
    nextItemId,
    prevItemId,
    setSelectedId,
    selectedType,
    setSelectedType,
  }
}

export type Photo = {
  id: string
  type: 'engagement' | 'photobooth' | 'wedding'
  height: number
  width: number
  src: {
    large: string
    full: string
  }
}

const useDisableBodyScroll = (open: boolean) => {
  useIsomorphicLayoutEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])
}
