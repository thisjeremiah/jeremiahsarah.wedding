import cx from 'classnames'
import { DownloadIcon } from './DownloadIcon'

export function DownloadImage(props: {
  imageUrl: string
  downloadUrl: string
  className?: string
  width: number
  height: number
}) {
  return (
    <div className={cx('relative group', props.className)}>
      <img
        className="w-full rounded-sm pointer-events-none bg-berry-200 select-none"
        src={props.imageUrl}
        width={props.width}
        height={props.height}
      />
      <div
        className={cx(
          'group-hover:opacity-100 opacity-0',
          'text-rose-300 absolute bottom-0 right-0 pr-2 pb-1.5',
          'transition-opacity',
        )}
      >
        <a
          className="hidden sm:inline"
          href={'/api?url=https:' + props.downloadUrl}
          download={downloadFilename(props.downloadUrl)}
          onClick={(e) => e.stopPropagation()}
        >
          <DownloadIcon />
        </a>
      </div>
    </div>
  )
}

export function downloadFilename(url: string) {
  let result = url.split('/')
  return result[result.length - 1]
}
