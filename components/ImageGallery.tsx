import cx from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

// ↯

export function ImageGallery(props: { images: string[]; className?: string }) {
  const [curr, setCurr] = useState(0)

  function setNext(inc: number = 1) {
    setCurr((curr) => {
      let next = curr + inc
      if (next > props.images.length - 1) {
        return 0
      } else if (next < 0) {
        return props.images.length - 1
      } else {
        return next
      }
    })
  }

  const image = props.images[curr]

  return (
    <div
      className={cx(
        'relative rounded-sm shadow-md overflow-hidden w-64 h-64',
        props.className,
      )}
    >
      <Image
        className="rounded-sm pointer-events-none select-none"
        src={image}
        width={256}
        height={256}
      />
      {false && props.images.length > 1 ? (
        <div className="absolute bottom-0 pt-6 bg-gradient-to-t from-black/10 to-transparent w-full">
          <div
            className="flex text-lg p-2 items-center justify-between"
            onClick={(e) => e.preventDefault()}
          >
            <div
              onClick={() => setNext(-1)}
              className={cx('cursor-pointer select-none')}
            >
              ←
            </div>
            <div
              onClick={() => setNext(1)}
              className={cx('cursor-pointer select-none')}
            >
              →
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
