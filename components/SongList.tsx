import { Song } from './Song'

export function SongList(props: {
  tracks: SpotifyApi.TrackObjectFull[]
  onRequestTrack?(trackUri: string): void
  showRequestStatus?: boolean
  requestedTrackUris?: string[]
  variant?: boolean
}) {
  return (
    <div className="w-full flex flex-col gap-2 pb-2">
      {props.tracks.map((track) => (
        <Song
          variant={props.variant}
          key={track.id}
          track={track}
          onRequestTrack={props.onRequestTrack}
          showRequestStatus={props.showRequestStatus}
          isRequested={props.requestedTrackUris?.includes(track.uri)}
        />
      ))}
    </div>
  )
}
