export function activateVolumeFade() {
  // When the #volume element is hovered, show it all for a few seconds, then fade it out
  const volume = document.querySelector('#volume')!
  
  const show = () => {
    volume.classList.remove('hide')
  }

  const fade = () => {
    volume.classList.add('hide')
  }

  // Hide the volume bar by default
  fade()

  volume.addEventListener('mouseenter', show)
  volume.addEventListener('mouseleave', fade)
}