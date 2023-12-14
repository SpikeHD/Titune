import { getCurrentSong } from './util/radio'
import { playlistVideos } from './util/youtube'

/**
 * We will have two URL params, the "name" and the "id". Name is used for embedding, ID is used for getting the playlist.
 * 
 * The name will not matter, as its just for people reading the URL to identify the playlist (especially for embeding in sites and stuff).
 * The playlist ID does matter. Obviously.
 */
const playlistId = new URLSearchParams(window.location.search).get('id')!
const name = new URLSearchParams(window.location.search).get('name')!

document.addEventListener('DOMContentLoaded', async () => {
  // Every second, update currently-playing and time-elapsed
  const currentlyPlaying = document.getElementById('currently-playing')!
  const timeElapsed = document.getElementById('time-elapsed')!

  // Ensure we call this at least once, to cache the playlist
  await playlistVideos(playlistId)

  setInterval(async () => {
    const { song, elapsed } = await getCurrentSong(playlistId)
    currentlyPlaying.textContent = song?.title ?? 'Unknown'
    timeElapsed.textContent = `${Math.floor(elapsed / 60)}:${Math.floor(elapsed % 60).toString().padStart(2, '0')}`
  }, 100)
})