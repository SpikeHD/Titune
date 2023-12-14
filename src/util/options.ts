interface Options {
  invidiousInstance: string
  shaders: boolean
  volume: number
}

const defaultOptions: Options = {
  invidiousInstance: 'https://vid.puffyan.us/',
  shaders: true,
  volume: 100
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