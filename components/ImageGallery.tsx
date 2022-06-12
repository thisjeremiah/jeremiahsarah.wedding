import cx from 'classnames'
import { useState } from 'react'

export function ImageGallery(props: { images: string[]; className?: string }) {
  const [curr, setCurr] = useState(0)

  const image = props.images[curr]

  return (
    <div className={cx('relative', props.className)}>
      <img className="w-full rounded-xl pointer-events-none" src={image} />
      {props.images.length > 1 ? (
        <div className="absolute bottom-0 pb-4 pl-2.5">
          <div className="flex gap-2">
            {props.images.map((_, i) => (
              <div
                onClick={() => setCurr(i)}
                className={cx(
                  'w-3 h-3 bg-rose-600 rounded-full cursor-pointer',
                  'hover:bg-opacity-75',
                  {
                    'bg-rose-800': curr === i,
                  },
                )}
                key={i}
              ></div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
