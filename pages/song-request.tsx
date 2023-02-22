import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query'
import Layout from '../components/Layout'
import { RequestSongForm } from '../components/RequestSongForm'
import { SongList } from '../components/SongList'
import { getPlaylistTracks } from '../utils/spotifyApi'
import { theme } from '../tailwind.config.js'

const audio: HTMLAudioElement =
  typeof window === 'undefined' ? (null as any) : new Audio()

const SongRequest: NextPage = () => {
  const { data, refetch } = useQuery('getPlaylistTracks', getPlaylistTracks, {
    refetchOnWindowFocus: true,
    refetchInterval: 60_000,
    refetchOnMount: 'always',
  })
  const playlistTracks: SpotifyApi.TrackObjectFull[] = data ?? []
  const [playingTrackUri, setPlayingTrackUri] = useState<string | undefined>()

  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        setPlayingTrackUri(undefined)
      }
    }
  }, [])

  const onPlayToggle = (track: SpotifyApi.TrackObjectFull) => {
    if (playingTrackUri === track.uri) {
      // is playing
      audio.pause()
      audio.src = ''
      setPlayingTrackUri(undefined)
    } else {
      // is not playing
      audio.pause()
      audio.src = track.preview_url!
      audio.play()
      setPlayingTrackUri(track.uri)
    }
  }

  return (
    <Layout
      title="Song Requests"
      className="bg-cobalt-500 text-white cursor-cobalt selection:bg-lemon-700"
      navClassName="bg-cobalt-600"
      navBackdropClassName="bg-cobalt-400/50"
      themeColor={theme.extend.colors.cobalt[500]}
      buttonClassName="text-cobalt-500"
    >
      <div className="w-full flex justify-center md:h-[calc(100vh-17rem)]">
        <div className="w-full max-w-[60rem] pb-20 sm:pb-8">
          <div className="flex items-center justify-center text-center w-full lowercase text-base pt-8 sm:pt-3 text-white">
            <p className="w-[calc(100vw-8rem)]">
              Request a song to play on the dance floor!
            </p>
          </div>
          <div className="w-full h-full flex-col md:flex-row flex gap-10 justify-evenly p-8">
            <div className="flex-1">
              <RequestSongForm
                onPlayToggle={onPlayToggle}
                playingTrackUri={playingTrackUri}
                requestedTrackUris={playlistTracks.map((track) => track.uri)}
                refetchPlaylistTracks={refetch}
              />
            </div>
            <div className="flex-1 h-[calc(100%-2rem)]">
              <div className="flex justify-between items-baseline text-white w-full">
                <div className="font-serif tracking-wide text-lg pb-2 tracking-wide">
                  The Playlist
                </div>
                <div className="text-base font-sans lowercase">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://open.spotify.com/playlist/5BUAHADpsveOZ6SeKzNmbA?si=a38148380c624675"
                  >
                    {'Listen on Spotify'}&nbsp;↗
                  </a>
                </div>
              </div>
              <div className="border-2 border-white/30 md:h-full rounded-xl h-[75vh]">
                <div className="overflow-y-scroll h-full p-3 gradient-mask-b-0">
                  <SongList
                    onPlayToggle={onPlayToggle}
                    playingTrackUri={playingTrackUri}
                    tracks={playlistTracks}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const client = new QueryClient()

  await client.prefetchQuery('getPlaylistTracks', getPlaylistTracks)

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
    revalidate: 10,
  }
}

export default function SongRequestWrapper(pageProps: any) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState} />
      <SongRequest />
    </QueryClientProvider>
  )
}
