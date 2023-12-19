import { getOptions, qualityList } from './options'

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

/**
 * Get all of the audio sources for a given video
 */
export async function videoAudioSources(videoId: string) {
  const inst = getOptions().invidiousInstance
  // Ensure URL ends with / if it doesn't already
  const url = inst.endsWith('/') ? inst : inst + '/'
  const result = (await fetch(`${url}api/v1/videos/${videoId}`).then(r => r.json())).adaptiveFormats as VideoFormat[]

  return result.filter(r => r.type.startsWith('audio/'))
}

/**
 * Get the preferred audio source for a given video. If the preferred codec is not available, it will fall back to the first.
 */
export async function videoAudioSource(videoId: string) {
  const sources = await videoAudioSources(videoId)
  const { preferredCodec } = getOptions()

  // Find the preferred codec
  const codecPreferred = sources.filter(s => s.type.includes(preferredCodec))
  
  // Within the preferred codec, find the audio source with the highest quality (within the maxQuality option)
  const qualityPreferred = sourceWithClosestQuality(codecPreferred)

  // If the preferred codec is not available, fall back to the first
  return qualityPreferred || codecPreferred[0] || sources[0]
}

/**
 * Using the quality list, find the quality closest to the max quality, preferring lower before higher
 */
export function sourceWithClosestQuality(sources: VideoFormat[]) {
  const { maxQuality } = getOptions()

  // Find the quality closest to the max quality, preferring lower before higher
  const qualities = qualityList.filter(q => qualityList.indexOf(q) <= qualityList.indexOf(maxQuality)).sort((a, b) => qualityList.indexOf(a) - qualityList.indexOf(b))
  const source = sources.find(s => qualities.some(q => s.audioQuality.includes(q)))

  return source
}

export async function shuffledPlaylistVideos(playlistId: string) {
  const videos = await playlistVideos(playlistId)
  const now = Date.now() / 1000

  // Get the total length of the playlist in seconds
  const totalLength = videos.reduce((prev, curr) => prev + curr.lengthSeconds, 0)

  // Create a modified seed using the total length of the playlist / the current time
  // This makes it so that whenever the playlist is run through, it will be shuffled in a different way the next time
  const dynSeed = Math.floor(now / totalLength)

  return shuffle(videos, dynSeed)
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