import cx from 'classnames'
import Image from 'next/image'
import { ProgressRing } from './ProgressRing'

export function Song({
  track,
  onRequestTrack,
  showRequestStatus,
  isRequested,
  variant,
  onPlayToggle,
  isPlaying,
}: {
  track: SpotifyApi.TrackObjectFull
  onRequestTrack?(trackUri: string): void
  showRequestStatus?: boolean
  isRequested?: boolean
  isPlaying?: boolean
  onPlayToggle?(track: SpotifyApi.TrackObjectFull): void
  variant?: boolean
}) {
  const image = track.album.images[1]

  return (
    <div
      className={cx(
        variant ? 'bg-cobalt-600' : 'bg-white/20',
        'flex justify-between items-center p-2 gap-4 rounded w-full',
      )}
    >
      <div className="flex gap-4">
        <div
          onClick={() => {
            onPlayToggle?.(track)
          }}
          className="group flex relative items-center justify-center select-none shrink-0"
        >
          <Image
            className="rounded opacity-90"
            src={image.url}
            width={50}
            height={50}
            alt={track.album.name}
          />
          <div className="h-full flex items-center justify-center w-full absolute">
            <button
              className={cx(
                'cursor-pointer transition text-white',
                isPlaying ? '' : 'group-hover:opacity-100 sm:opacity-0',
              )}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          </div>
          {isPlaying ? (
            <div className="h-full flex items-center justify-center w-full absolute">
              <ProgressRing radius={20} stroke={3} />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col items-start justify-start">
          <div
            className={cx(
              variant ? 'text-white/90' : 'text-white/80',
              'text-base select-none text-left',
            )}
          >
            {track.name}
          </div>
          <div
            className={cx(
              variant ? 'text-white/90' : 'text-white/80',
              'text-sm select-none text-left',
            )}
          >
            {track.artists.map((artist) => artist.name).join(', ')}
          </div>
        </div>
      </div>
      {showRequestStatus && (
        <div>
          {!isRequested ? (
            <button
              onClick={() => onRequestTrack?.(track.uri)}
              className="rounded-full bg-white/40 w-5 h-5 flex items-center justify-center text-white/90 hover:text-white text-lg mr-2 hover:bg-white/60 transition"
            >
              +
            </button>
          ) : (
            <div className="rounded-full w-5 h-5 flex items-center justify-center text-white text-lg mr-2 transition select-none">
              ✓
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PauseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 select-none"
    >
      <path
        fillRule="evenodd"
        d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 select-none"
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
        clipRule="evenodd"
      />
    </svg>
  )
}
