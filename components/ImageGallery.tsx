import cx from 'classnames'
import { useState } from 'react'

// ↯

export function ImageGallery(props: { images: string[]; className?: string }) {
  const [curr, setCurr] = useState(0)

  const image = props.images[curr]

  return (
    <div
      className={cx(
        'relative rounded-xl shadow-md overflow-hidden',
        props.className,
      )}
    >
      <img
        className="w-full rounded-xl pointer-events-none select-none"
        src={image}
      />
      {props.images.length > 1 ? (
        <div className="absolute bottom-0 pb-3 pt-6 pl-2.5 bg-gradient-to-t from-black/10 to-transparent w-full">
          <div className="flex gap-2">
            {props.images.map((_, i) => (
              <div
                onClick={() => setCurr(i)}
                className={cx(
                  'w-3.5 h-3.5 bg-rose-500 rounded-full cursor-pointer',
                  'border-[0.09375rem] border-solid border-lemon-300',
                  'hover:bg-rose-600',
                  {
                    'bg-rose-800 hover:bg-rose-800': curr === i,
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
