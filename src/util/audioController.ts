import { getPlaylistId } from './meta'
import { createNotice } from '../frontend/notices'
import { getOptions } from './options'
import { getSongRelative } from './radio'
import { videoAudioSource } from '../data/youtube'

export async function setSongAndTime(song: Video, time: number) {
  // Get the audio element
  const audio = document.getElementById('radio-audio') as HTMLAudioElement
  const src = await videoAudioSource(song.videoId)

  audio.src = src.url
  audio.currentTime = time

  audio.onerror = (e) => {
    console.error(e)
    createNotice('An error occurred while trying to play the song. Check DevTools. Is it DRM protected?', 'error')
  }

  // Whenever we set the song, we should also preload the next song
  const nextSong = await getSongRelative(getPlaylistId(), 1)
  const nextAudio = await videoAudioSource(nextSong.videoId)
  await preloadSong(nextAudio)
}

/**
 * Set the volume and stuff
 */
export async function initAudioController() {
  const audio = document.getElementById('radio-audio') as HTMLAudioElement
  const { volume } = getOptions()

  audio.volume = volume / 100
}

/**
 * Preload a given song
 */
export async function preloadSong(song: VideoFormat) {
  console.log('Caching next song: ', song.url)

  // Create a disabled audio tag, set the src, and then remove it when it's loaded
  const audio = document.createElement('audio')
  audio.src = song.url
  audio.preload = 'metadata'

  const inst = document.body.appendChild(audio)

  inst.onloadeddata = () => {
    inst.remove()
  }

  inst.onerror = (e) => { 
    console.error(e)
    createNotice('There was an error preloading the next song. It may or may not load.', 'error')
  }
}