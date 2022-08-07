import cx from 'classnames'
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
        'relative rounded-md shadow-md overflow-hidden',
        props.className,
      )}
    >
      <img
        className="w-full rounded-md pointer-events-none select-none"
        src={image}
      />
      {props.images.length > 1 ? (
        <div className="absolute bottom-0 pt-6 bg-gradient-to-t from-black/10 to-transparent w-full">
          <div
            className="flex gap-2.5 pl-2 py-2 items-center w-14"
            onClick={(e) => {
              e.preventDefault()
            }}
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
