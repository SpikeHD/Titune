import { initAudioController, setSongAndTime } from './util/audioController'
import { openModal } from './util/dialogs'
import { getPlaylistId, getRadioName } from './util/meta'
import { getCurrentSong } from './util/radio'
import { createTempVolumeListener, setVolume } from './util/volume'
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
  // Create dialog event listeners
  const addButton = document.getElementById('add-icon')!

  addButton.addEventListener('click', () => {
    openModal('add-dialog')
  })

  // Every second, update currently-playing and time-elapsed
  const currentlyPlaying = document.getElementById('currently-playing')!
  const timeElapsed = document.getElementById('time-elapsed')!
  const songLength = document.getElementById('duration')!
  const cover = document.getElementById('cover')!
  const playlistId = getPlaylistId()
  let identifier = ''

  initAudioController()

  // in order to prompt the user to interact with the page, allowing us to play(), we set volume to 0
  setVolume(0)
  createTempVolumeListener()

  // Ensure we call this at least once, to cache the playlist
  await playlistVideos(playlistId)

  setInterval(async () => {
    const { song, elapsed } = await getCurrentSong(playlistId)

    // If the song changes, set the new song and timestamp
    if (!identifier.includes(song?.title ?? 'Unknown') && song) {
      const highestWidthThumb = song.videoThumbnails.reduce((prev, curr) => curr.width > prev.width ? curr : prev).url
      cover.setAttribute('src', highestWidthThumb)

      // Also set the body background to the cover
      const bgCover = document.getElementById('bg-cover')!
      bgCover.style.backgroundImage = `url(${highestWidthThumb})`

      setSongAndTime(song, elapsed)
    }

    // Prevents rapid DOM updates
    if (`${song?.title ?? 'Unknown'}${elapsed}` === identifier) {
      return
    }

    currentlyPlaying.textContent = song?.title ?? 'Unknown'
    timeElapsed.textContent = `${Math.floor(elapsed / 60)}:${Math.floor(elapsed % 60).toString().padStart(2, '0')}`
    songLength.textContent = `${Math.floor((song?.lengthSeconds ?? 0) / 60)}:${Math.floor((song?.lengthSeconds ?? 0) % 60).toString().padStart(2, '0')}`

    // Set the progress bar inners width to reflect the percentage of the song that has elapsed
    const progressBarInner = document.getElementById('progress-bar-fill')!
    const songPct = (elapsed / (song?.lengthSeconds ?? 1)) * 100

    progressBarInner.style.width = `${songPct}%`

    identifier = `${song?.title ?? 'Unknown'}${elapsed}`
  }, 200)
})

