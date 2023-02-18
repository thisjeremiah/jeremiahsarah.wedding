import { useState } from 'react'
import { searchTracks, addTracksToPlaylist } from '../utils/spotifyApi'
import { SongList } from './SongList'

export function RequestSongForm(props: {
  refetchPlaylistTracks(): Promise<any>
  requestedTrackUris?: string[]
}) {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([])
  const [search, setSearch] = useState('')

  const onRequestTrack = async (uri: string) => {
    await addTracksToPlaylist([uri])
    await props.refetchPlaylistTracks()
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const search = event.target.search.value
    const result = await searchTracks(search)
    setTracks(result)
    return result
  }

  const clearSearch = () => {
    setSearch('')
    setTracks([])
  }

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit}
        className="text-left flex flex-col w-full pb-4"
      >
        <label htmlFor="name" className="lowercase block mb-2">
          Type in your favorite artist or song:
        </label>
        <div className="w-full relative">
          <input
            name="search"
            className="px-2 bg-white/90 w-full text-cobalt-500 rounded py-1 selection:bg-lemon-500"
            value={search}
            onChange={(evt) => {
              if (!evt.currentTarget.value.length) {
                clearSearch()
              } else {
                setSearch(evt.currentTarget.value)
              }
            }}
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute h-full right-0 pr-2 text-cobalt-500 text-lg"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="submit"
          className="self-center flex items-center mt-3 gap-2 lowercase rounded-full text-slate-100 px-6 py-1 text-base bg-lemon-700 w-fit select-none"
        >
          Search
        </button>
      </form>
      {tracks.length ? (
        <>
          <div className="lowercase text-left pb-2">Search Results:</div>
          <div className="border-2 border-white/30 h-[20rem] md:h-[calc(100%-9.6rem)] rounded-xl">
            <div className="h-full overflow-y-scroll p-2 gradient-mask-b-0">
              <SongList
                tracks={tracks}
                showRequestStatus
                onRequestTrack={onRequestTrack}
                requestedTrackUris={props.requestedTrackUris}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

// <div className="overflow-y-scroll h-full p-2 gradient-mask-b-0">
