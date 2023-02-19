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
                'font-serif cursor-pointer transition text-white',
                isPlaying
                  ? 'text-2xl'
                  : 'text-lg group-hover:opacity-100 sm:opacity-0',
              )}
            >
              {isPlaying ? '⏸' : '▶'}
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
