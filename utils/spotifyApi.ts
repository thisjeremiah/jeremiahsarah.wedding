export async function getPlaylistTracks(): Promise<
  SpotifyApi.TrackObjectFull[]
> {
  return request('getPlaylistTracks', {})
}

export async function searchTracks(
  search: string,
): Promise<SpotifyApi.TrackObjectFull[]> {
  return request('searchTracks', { search })
}

export async function addTracksToPlaylist(tracks: string[]) {
  return request('addTracksToPlaylist', { tracks })
}

async function request(action: string, body: Object) {
  const result = await fetch(`${rootURL}/api/spotify?action=${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return result.json()
}

const rootURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://jeremiahsarah.wedding'
