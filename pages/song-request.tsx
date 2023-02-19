import type { NextPage } from 'next'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Layout from '../components/Layout'
import { RequestSongForm } from '../components/RequestSongForm'
import { SongList } from '../components/SongList'
import { getPlaylistTracks } from '../utils/spotifyApi'

const queryClient = new QueryClient()

const SongRequest: NextPage = () => {
  const { data, refetch } = useQuery('getPlaylistTracks', getPlaylistTracks)
  const playlistTracks: SpotifyApi.TrackObjectFull[] = data ?? []

  return (
    <Layout
      title="Song Requests"
      className="bg-cobalt-500 text-white cursor-cobalt selection:bg-lemon-700"
      navClassName="bg-cobalt-600"
      navBackdropClassName="bg-cobalt-400/50"
      htmlClassName="bg-cobalt-500"
      buttonClassName="text-cobalt-500"
    >
      <div className="w-full flex justify-center md:h-[calc(100vh-17rem)]">
        <div className="w-full max-w-[60rem] pb-8">
          <p className="text-center w-full lowercase text-base pt-3 text-white">
            Request a song to play on the dance floor!
          </p>
          <div className="w-full h-full flex-col md:flex-row flex gap-10 justify-evenly p-8">
            <div className="flex-1">
              <RequestSongForm
                requestedTrackUris={playlistTracks.map((track) => track.uri)}
                refetchPlaylistTracks={refetch}
              />
            </div>
            <div className="flex-1 h-[calc(100%-2rem)]">
              <div className="text-center font-serif text-xl pb-2 text-white tracking-wide">
                The Playlist
              </div>
              <div className="border-2 border-white/30 md:h-full rounded-xl h-[75vh]">
                <div className="overflow-y-scroll h-full p-3 gradient-mask-b-0">
                  <SongList tracks={playlistTracks} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function SongRequestWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <SongRequest />
    </QueryClientProvider>
  )
}
