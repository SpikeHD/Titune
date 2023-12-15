import { setOption } from './options';
/**
 * Set volume
 */
export function setVolume(volume) {
    const audio = document.getElementById('radio-audio');
    const volumeBar = document.querySelector('#volume-bar');
    const volumeBarLines = volumeBar.querySelectorAll('.volume-bar-line');
    const volumeNumber = document.querySelector('#volume-number');
    if (volume < 0)
        volume = 0;
    if (volume > 100)
        volume = 100;
    volume > 0 ? volumeBar.classList.remove('muted') : volumeBar.classList.add('muted');
    audio.volume = volume / 100;
    // Find closest multiple of of however many lines there are
    const closest = Math.round(volume / (100 / volumeBarLines.length)) * (100 / volumeBarLines.length);
    // Remove all classes
    volumeBarLines.forEach(line => line.classList.remove('active'));
    // Add classes to the closest multiple of the volume bar lines
    for (let i = 0; i < closest / (100 / volumeBarLines.length); i++) {
        volumeBarLines[i].classList.add('active');
    }
    // Set the volume number
    volumeNumber.textContent = `${volume}%`;
    // Set the volume in options
    setOption('volume', volume);
}
/**
 * Create a single-use click listener for the volume bar. Clicking it will trigger the audio element to play
 */
export function createTempVolumeListener() {
    const click = () => {
        const audio = document.getElementById('radio-audio');
        audio.play();
        document.removeEventListener('click', click);
    };
    document.addEventListener('click', click);
}
// Event listener for dragging/clicking on the volume bar
document.addEventListener('DOMContentLoaded', () => {
    const volumeBar = document.querySelector('#volume-bar');
    volumeBar.addEventListener('click', e => {
        const evt = e;
        const volume = Math.floor((evt.offsetX / volumeBar.clientWidth) * 100);
        setVolume(volume);
    });
    volumeBar.addEventListener('mousedown', (e) => {
        const evt = e;
        const volume = Math.floor((evt.offsetX / volumeBar.clientWidth) * 100);
        setVolume(volume);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    });
    const mouseMove = (e) => {
        const evt = e;
        // target needs to be the volumeBar
        if (evt.target !== volumeBar)
            return;
        const volume = Math.floor((evt.offsetX / volumeBar.clientWidth) * 100);
        setVolume(volume);
    };
    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };
});
