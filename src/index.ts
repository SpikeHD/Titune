import { getPlaylistId, getRadioName } from './util/meta'
import { getCurrentSong } from './util/radio'
import { playlistVideos } from './util/youtube'

// Change the meta tags to reflect the playlist, if there is one
if (getPlaylistId() && getRadioName()) {
  const name = getRadioName()
  const titles = document.querySelectorAll('meta[name*="title"]')
  const descriptions = document.querySelectorAll('meta[name*="description"]')

  for (const title of titles) {
    title.setAttribute('content', 'Titune')
  }

  for (const description of descriptions) {
    description.setAttribute('content', `Listen along to "${name}" Radio`)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Every second, update currently-playing and time-elapsed
  const currentlyPlaying = document.getElementById('currently-playing')!
  const timeElapsed = document.getElementById('time-elapsed')!
  const playlistId = getPlaylistId()
  let identifier = ''

  // Ensure we call this at least once, to cache the playlist
  await playlistVideos(playlistId)

  setInterval(async () => {
    const { song, elapsed } = await getCurrentSong(playlistId)

    // Prevents rapid DOM updates
    if (`${song?.title ?? 'Unknown'}${elapsed}` === identifier) {
      return
    }

    currentlyPlaying.textContent = song?.title ?? 'Unknown'
    timeElapsed.textContent = `${Math.floor(elapsed / 60)}:${Math.floor(elapsed % 60).toString().padStart(2, '0')}`

    identifier = `${song?.title ?? 'Unknown'}${elapsed}`
  }, 200)
})