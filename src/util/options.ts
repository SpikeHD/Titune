interface Options {
  invidiousInstance: string
  shaders: boolean
  volume: number
  preferredCodec: 'av1' | 'avc1' | 'vp9' | 'opus' | 'mp4a'
  maxQuality: typeof qualityList[number]
  showNotices: boolean
  fullyHideSidebar: boolean
}

export const qualityList = [
  'AUDIO_QUALITY_ULTRALOW',
  'AUDIO_QUALITY_LOW',
  'AUDIO_QUALITY_MEDIUM',
  'AUDIO_QUALITY_HIGH'
]

const defaultOptions: Options = {
  invidiousInstance: 'https://iv.ggtyler.dev/',
  shaders: true,
  volume: 50,
  preferredCodec: 'opus',
  maxQuality: 'AUDIO_QUALITY_HIGH',
  showNotices: true,
  fullyHideSidebar: false
}

export function getOptions(): Options {
  const options = localStorage.getItem('options')
  return options ? JSON.parse(options) : defaultOptions
}

export function setOption<K extends keyof Options>(o: K, v: Options[K]) {
  const options = getOptions()
  options[o] = v
  localStorage.setItem('options', JSON.stringify(options))
}
