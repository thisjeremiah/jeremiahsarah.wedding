import cx from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

// ↯

export function ImageGallery(props: {
  disabled?: boolean
  images: string[]
  className?: string
}) {
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
    <div className="relative overflow-hidden">
      <div
        className={cx(
          'rounded-sm w-fit flex overflow-hidden',
          props.disabled ? 'bg-terracotta-600' : 'bg-terracotta-700',
        )}
      >
        <Image
          alt=""
          className={cx(
            'pointer-events-none select-none',
            props.disabled && 'opacity-70 grayscale contrast-75',
          )}
          src={image}
          width={256}
          height={256}
        />
      </div>
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
