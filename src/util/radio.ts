import { shuffledPlaylistVideos } from './youtube'

/**
 * Get the current song and the time elapsed within it using a seed based on playlist ID and the current timestamp
 */
export async function getCurrentSong(playlistId: string) {
  const songs = await shuffledPlaylistVideos(playlistId)
  const now = Date.now()

  // Get the total length of all songs
  let totalLength = 0
  for (const song of songs) {
    totalLength += song.lengthSeconds
  }

  // Get the current time elapsed
  const elapsed = Math.floor((now / 1000) % totalLength)

  // Get the current song
  let currentLength = 0
  let song: Video | undefined

  for (const s of songs) {
    currentLength += s.lengthSeconds
    if (elapsed < currentLength) {
      song = s
      break
    }
  }

  // Get the elapsed time in the song
  const elapsedInSong = elapsed - (currentLength - song!.lengthSeconds)

  return { song, elapsed: elapsedInSong }
}

/**
 * We may want to get the next song, previous song, or maybe a song played 4 songs ago.
 * 
 * For example, getting the next song would be offset = 1, previous song would be offset = -1, and a song played 4 songs ago would be offset = -4.
 * Automatically wraps around the playlist if necessary.
 */
export async function getSongRelative(playlistId: string, offset: number) {
  const songs = await shuffledPlaylistVideos(playlistId)
  const current = await getCurrentSong(playlistId)

  // Find the index of the current song
  let idx = songs.findIndex(s => s.videoId === current.song?.videoId)

  // Add the offset. Wrap around if necessary
  idx += offset
  idx %= songs.length

  return songs[idx]
}
  
