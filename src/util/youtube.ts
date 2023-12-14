import { getOptions } from './options'
import { seedFromPlaylistId } from './radio'

const cachedPlaylistVideos: Video[] = []

export function playlistFromLink(link: string) {
  const playlistId = link.match(/(?<=list=)[a-zA-Z0-9_-]+/)?.[0]
  return playlistId
}

export async function playlistVideos(playlistId: string) {
  // Check if we have a cached version of the playlist
  if (cachedPlaylistVideos.length > 0) {
    return cachedPlaylistVideos
  }

  const inst = getOptions().invidiousInstance
  // Ensure URL ends with / if it doesn't already
  const url = inst.endsWith('/') ? inst : inst + '/'
  const result = (await fetch(`${url}api/v1/playlists/${playlistId}`).then(r => r.json())) as Playlist

  // Cache the playlist
  cachedPlaylistVideos.push(...result.videos)

  return result.videos
}

export async function shuffledPlaylistVideos(playlistId: string) {
  const videos = await playlistVideos(playlistId)
  const seed = seedFromPlaylistId(playlistId)
  return shuffle(videos, seed)
}

/**
 * Fisher-Yates shuffle algorithm using the seed
 */
export function shuffle<T>(array: T[], seed: number) {
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((seed + i) % (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }

  return shuffled
}