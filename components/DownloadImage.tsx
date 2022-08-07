import cx from 'classnames'
import { DownloadIcon } from './DownloadIcon'

export function DownloadImage(props: {
  imageUrl: string
  downloadUrl: string
  className?: string
}) {
  return (
    <div className={cx('relative group', props.className)}>
      <img
        className="w-full rounded-md pointer-events-none"
        src={props.imageUrl}
      />
      <div
        className={cx(
          'group-hover:opacity-100 opacity-0',
          'text-rose-500 absolute bottom-0 right-0 pr-2 pb-1.5',
          'transition-opacity',
        )}
      >
        <a
          href={'/api?url=https:' + props.downloadUrl}
          download={downloadFilename(props.downloadUrl)}
        >
          <DownloadIcon />
        </a>
      </div>
    </div>
  )
}

function downloadFilename(url: string) {
  let result = url.split('/')
  return result[result.length - 1]
}
