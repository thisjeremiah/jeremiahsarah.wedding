'use client'

import cx from 'classnames'
import {
  AnimatePresence,
  motion,
  useIsomorphicLayoutEffect,
} from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { DownloadIcon } from '../../components/DownloadIcon'
import { downloadFilename, DownloadImage } from '../../components/DownloadImage'
import Layout from '../../components/Layout'
import { theme } from '../../tailwind.config.js'

type PhotosPageProps = {
  photos: Photo[]
}

export default function PhotosPage(props: PhotosPageProps) {
  const { setSelectedId, selectedItem, nextItemId, prevItemId } = usePhotos(
    props.photos,
  )

  useDisableBodyScroll(!!selectedItem)

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
          {props.photos.map((item) => (
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

export type Photo = {
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

const useDisableBodyScroll = (open: boolean) => {
  useIsomorphicLayoutEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])
}
