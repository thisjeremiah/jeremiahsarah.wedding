import { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import SpotifyWebApi from 'spotify-web-api-node'

const SPOTIFY_CLIENT_ID = String(process.env.SPOTIFY_CLIENT_ID)
const SPOTIFY_CLIENT_SECRET = String(process.env.SPOTIFY_CLIENT_SECRET)
const SPOTIFY_REFRESH_TOKEN = String(process.env.SPOTIFY_REFRESH_TOKEN)

// https://open.spotify.com/playlist/5BUAHADpsveOZ6SeKzNmbA?si=e96b6149e5d4478c

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://www.example.com/callback',
  refreshToken: SPOTIFY_REFRESH_TOKEN,
})

const SPOTIFY_PLAYLIST_ID = '5BUAHADpsveOZ6SeKzNmbA'

export default async function redirect(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await spotifyApi.refreshAccessToken()

  spotifyApi.setAccessToken(result.body['access_token'])

  const data = await spotifyApi.searchTracks('track:Heat artist:Mitski')

  const tracks = data.body.tracks.items.map((track: any) => track.uri)

  console.log(tracks)

  await spotifyApi.addTracksToPlaylist(SPOTIFY_PLAYLIST_ID, tracks)

  console.log('Added tracks to playlist!')

  res.status(200).json({})
}
