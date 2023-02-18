import { NextApiRequest, NextApiResponse } from 'next'
import SpotifyWebApi from 'spotify-web-api-node'

const SPOTIFY_CLIENT_ID = String(process.env.SPOTIFY_CLIENT_ID)
const SPOTIFY_CLIENT_SECRET = String(process.env.SPOTIFY_CLIENT_SECRET)
const SPOTIFY_REFRESH_TOKEN = String(process.env.SPOTIFY_REFRESH_TOKEN)

const SPOTIFY_PLAYLIST_ID = '5BUAHADpsveOZ6SeKzNmbA'

const REDIRECT_URL = 'http://www.example.com/callback'

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: REDIRECT_URL,
  refreshToken: SPOTIFY_REFRESH_TOKEN,
})

const api = {
  async init() {
    const result = await spotifyApi.refreshAccessToken()
    spotifyApi.setAccessToken(result.body['access_token'])
  },
  async getPlaylistTracks() {
    const data = await spotifyApi.getPlaylistTracks(SPOTIFY_PLAYLIST_ID)
    return data.body?.items.map((item) => item.track) ?? []
  },
  async searchTracks(search: string) {
    const data = await spotifyApi.searchTracks(search)
    return data.body?.tracks?.items ?? []
  },
  async addTracksToPlaylist(tracks: string[]) {
    await spotifyApi.addTracksToPlaylist(SPOTIFY_PLAYLIST_ID, tracks, {
      position: 0,
    })
    return {}
  },
}

export default async function endpoint(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await api.init()

  switch (req.query.action) {
    case 'getPlaylistTracks':
      return res.status(200).json(await api.getPlaylistTracks())
    case 'searchTracks':
      return res
        .status(200)
        .json(await api.searchTracks(req.body.search as string))
    case 'addTracksToPlaylist':
      return res
        .status(200)
        .json(await api.addTracksToPlaylist(req.body.tracks as string[]))
    default:
      return res.status(500).json({})
  }
}
