import { playlistVideos, shuffle } from './youtube'

/**
 * Turn playlist id into a numeric 'seed'
 */
export function seedFromPlaylistId(playlistId: string) {
  let seed = 0
  for (let i = 0; i < playlistId.length; i++) {
    seed += playlistId.charCodeAt(i)
  }
  return seed
}

/**
 * Get the current song and the time elapsed within it using a seed based on playlist ID and the current timestamp
 */
export async function getCurrentSong(playlistId: string) {
  const seed = seedFromPlaylistId(playlistId)
  const rawSongs = await playlistVideos(playlistId)
  const songs = shuffle(rawSongs, seed)
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