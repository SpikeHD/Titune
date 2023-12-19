import { getPlaylistId } from './meta';
import { getOptions } from './options';
import { getSongRelative } from './radio';
import { videoAudioSource } from './youtube';
export async function setSongAndTime(song, time) {
    // Get the audio element
    const audio = document.getElementById('radio-audio');
    const src = await videoAudioSource(song.videoId);
    audio.src = src.url;
    audio.currentTime = time;
    audio.onloadeddata = () => {
        audio.play();
    };
    // Whenever we set the song, we should also preload the next song
    const nextSong = await getSongRelative(getPlaylistId(), 1);
    const nextAudio = await videoAudioSource(nextSong.videoId);
    await preloadSong(nextAudio);
}
/**
 * Set the volume and stuff
 */
export async function initAudioController() {
    const audio = document.getElementById('radio-audio');
    const { volume } = getOptions();
    audio.volume = volume / 100;
}
/**
 * Preload a given song
 */
export async function preloadSong(song) {
    console.log('Caching next song: ', song.url);
    // Create a disabled audio tag, set the src, and then remove it when it's loaded
    const audio = document.createElement('audio');
    audio.src = song.url;
    audio.preload = 'metadata';
    const inst = document.body.appendChild(audio);
    inst.onloadeddata = () => {
        inst.remove();
    };
}
